import { Probot } from "probot";
import { handlePR } from "./github/pr-handler.js";

export default (app: Probot) => {

  // Trigger when PR is created
  app.on("pull_request.opened", async (context) => {
    await handlePR(context);
  });

  // Trigger when new commits are pushed to PR
  app.on("pull_request.synchronize", async (context) => {
    await handlePR(context);
  });

};