# TOOLS.md

The ledger of Trust Boundary crossings. One row per external service this
repository depends on. Read by the agent on every task, so keep it short: a
service not in use does not belong here.

Never put a credential in this file. A key, token, or password anywhere in
the repository is graded as a security failure regardless of the rest.

Each crossing statement answers three questions in one first-person sentence:
what crosses, to whom, and who is accountable.

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| Cloudflare Workers + D1 | Every entry a user types; request metadata (IP, timestamp) that Cloudflare logs by default | Cloudflare dashboard login; wrangler token inside the Codespace | "User entries leave the browser and are stored on D1 under Cloudflare's free-tier terms, in a region I did not choose. I am accountable." | Medium: `wrangler d1 export`, rewrite one Worker for another host |
| GitHub + Codespaces | Source, commit history, devcontainer | GitHub account (SSO) | My source code and repository history cross to GitHub, which hosts the repository and Codespace, and I am accountable for what I commit and store there.  |Medium: clone or export the repository and recreate the development environment on another host |
| GitHub Copilot | Everything in the repository, as context for suggestions | GitHub account | Parts of my code and repository context cross to GitHub Copilot to generate suggestions, and I'm accountable for reviewing and testing any suggestion I accept. |Low: disable Copilot and write or review the code without its suggestions |
| wrangler (npm) | Worker code, configuration, deployment commands, and D1 operations sent through the Cloudflare CLI | Cloudflare login token stored in the Codespace | My Worker code, configuration, and deployment requests pass through wrangler to Cloudflare, and I am accountable for reviewing what the CLI deploys and sends. |Low: remove the package and use another deployment method or Cloudflare interface |
## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
