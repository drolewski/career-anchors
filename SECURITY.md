# Security

This is a historical, unmaintained application. No version receives scheduled security fixes or a response-time commitment. Do not use it as a production-ready template for collecting personal data.

## Credentials

- `.env` and `.env.*` are ignored, except for the empty `.env.example` template. Vercel state and common private-key files are ignored as well.
- All `VITE_*` values are included in browser assets. Only a Supabase public/anonymous key may be used there; never a service-role key.
- Server-only credentials belong in the hosting provider's environment settings. The legacy health check also requires `CRON_SECRET` and a matching Bearer authorization header.
- Removing a leaked credential from a file does not revoke it or remove it from Git history. Revoke/rotate any exposed secret and then clean affected history before publishing.

## Historical database design

The old client reads individual `schein_responses` rows and aggregates them in the browser. The historical schema allowed anonymous reads and inserts. Rows include demographics and optional free text, so an anonymous key must not be treated as a data-access boundary. That SQL setup example has been removed from the current source.

A new production integration would need server-side aggregation, appropriate access policies, input validation, abuse controls, and a data-retention policy. Local storage submission flags and the UI anti-bot interaction are not server-side protections. Use synthetic data when exploring the optional integration.

The repository cleanup does not migrate or audit the live database, rotate production credentials, or deploy application changes. Historical code and documentation remain in Git history.

## Reporting

Do not put credentials, database exports, or participant information in public issues. Use GitHub's private vulnerability reporting if enabled; otherwise contact the owner privately through an established channel before sharing sensitive details. There is no guaranteed maintenance or response window.
