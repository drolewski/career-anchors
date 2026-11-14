# Preserving the legacy production release

The production application is frozen independently of the public source repository. Its responsibilities have moved to https://aptido.io.

## Automatic builds

The owner disconnected `drolewski/career-anchors` in **Vercel → Project Settings → Git → Connected Git Repository** on 2026-11-14. Disconnecting Git preserves the existing project, domains, deployment, and runtime configuration.

The repository also contains:

```json
"git": {
  "deploymentEnabled": false
}
```

This disables automatic Git deployments on all branches if the repository is reconnected. See [Vercel's Git configuration reference](https://vercel.com/docs/project-configuration/git-configuration).

GitHub Actions performs validation only and has no deployment credentials or deploy step. Do not remove these safeguards as part of routine source cleanup.

## Existing production

The last observed production GitHub deployment before cleanup was `6083419044`, associated with commit `1d83a2a1d2ce6065df8e03fe72f6328fd8e82de5` (2026-08-25).

Source changes in this cleanup, including endpoint authorization, do not patch that deployed version. Existing environment variables and the daily keep-alive cron are left alone so the running application is not interrupted.

Manual deployments (`vercel`, redeploy from the dashboard, or deploy hooks) can still create a release independently of Git integration. They require an intentional operational decision; this repository's CI does not invoke them.

## Exploring a new deployment

Use a separate Vercel project and a separate database containing only synthetic data. Review the database limitations in `SECURITY.md` before enabling persistence. The legacy health check requires server-side `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `CRON_SECRET`; the last is checked against the request's Bearer authorization header.

Do not modify the original project's domains, environment variables, aliases, or deployment while preparing or publishing this repository.
