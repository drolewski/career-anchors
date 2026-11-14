# Publication review — 2026-11-14

## Scope

Reviewed the tracked source tree and all fetched Git branches/tags (51 historical commits before this cleanup). The repository remains private until the owner chooses to publish it. No history rewrite was needed for credentials.

## Findings and changes

- Gitleaks found no secrets in the fetched history or prepared source tree. An exact-value comparison also found no local `.env` values in historical Git objects. These checks reduce risk; they are not proof that every possible secret format is detectable.
- The local `.env` was already untracked and remains local. Broadened ignore patterns to cover environment variants, Vercel state, and common private-key files. The example environment now contains empty values only.
- The owner explicitly chose to retain the academic PDFs, including their existing author/academic identifying information. They are not anonymized, and their historical copies remain.
- Replaced template documentation with project scope, setup, architecture, end-of-maintenance status, and the transition to aptido.io. Removed the obsolete personal TODO.
- Removed the unsafe database-policy setup example and full survey-payload logging. Documented the historical anonymous row-access design instead of presenting it as a production setup.
- Added fail-closed authorization and method checks to the legacy health endpoint; internal database errors are no longer returned verbatim.
- Fixed existing lint failures (state initialization, effect dependencies, chart component placement, unused declarations, and server globals).
- Updated dependency resolutions within the existing version ranges. `npm audit` reported zero known vulnerabilities after the update (14 before it).
- Added validation-only GitHub Actions and a focused test of the endpoint's authorization boundary.

## Validation

- Clean installation from the lockfile.
- `npm run lint`: passed.
- `npm test`: passed; unauthorized and unsupported health-check requests do not query a database.
- `npm run build` with empty Supabase client configuration: passed. The existing large-bundle warning remains.
- `git diff --check`: passed.
- No production database calls, migrations, credential rotations, or deployment were performed. This review does not claim a complete browser end-to-end test or a live database security audit.

## Publication boundaries

Vercel Git integration was disconnected by the owner, and automatic Git deployments are also disabled in repository configuration. Existing production retains its original code, dependencies, runtime settings, and cron behavior.

No open-source license was selected on behalf of the owner. The absence of a license is stated in the README. Publishing the repository and granting reuse rights are separate decisions.
