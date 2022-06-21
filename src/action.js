const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const githubToken = core.getInput("GITHUB_TOKEN");
  const octoKit = github.getOctokit(githubToken);

  const { context = {} } = github;
  const { pull_request } = context.payload;

  console.log("context", pull_request.repository.owner);

  await octoKit.issues.createComment({
    owner: pull_request.repository.owner.login,
    repo: pull_request.name,
    issue_number: pull_request.number,
    body: "Thank yout for submit a new Pull Request! we will try to review it as soon as we can",
  });
}

run();
