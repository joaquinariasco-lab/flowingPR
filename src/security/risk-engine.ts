export function calculateRisk(files: any[]) {

  let score = 0;

  for (const file of files) {

    const name = file.filename.toLowerCase();
    const patch = file.patch || "";

    if (name.includes("auth")) score += 3;
    if (name.includes("payment")) score += 4;

    if (patch.includes("eval(")) score += 10;
    if (patch.includes("exec(")) score += 10;
    if (patch.includes("innerHTML")) score += 4;
    if (patch.includes("SELECT *")) score += 3;
  }

  return {
    score: Math.min(score, 10),
  };
}