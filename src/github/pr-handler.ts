import { calculateRisk } from "../security/risk-engine.js";
import { sanitizeDiff } from "../security/sanitizer.js";

export async function handlePR(context: any) {

  const pr = context.payload.pull_request;

  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const pull_number = pr.number;

  // 1. Get changed files
  const filesResponse = await context.octokit.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });

  const files = filesResponse.data;

  // 2. Build diff
  let diffText = "";

  for (const file of files) {
    diffText += `
FILE: ${file.filename}

PATCH:
${file.patch || ""}
-------------------
`;
  }

  // 3. Sanitize
  const safeDiff = sanitizeDiff(diffText);

  // 4. Risk engine
  const risk = calculateRisk(files);

  // 5. Comment on PR
  await context.octokit.issues.createComment({
    owner,
    repo,
    issue_number: pull_number,
    body: `
# AI Security Layer

Risk Score: **${risk.score}/10**

---

## Diff Preview
\`\`\`
${safeDiff.slice(0, 2500)}
\`\`\`
    `,
  });
}