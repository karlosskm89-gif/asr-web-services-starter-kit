# ASR Mail Relay Service

A tiny Node/Express relay that accepts JSON via HTTPS and forwards the message through Titan SMTP.

## Modes of use
- Local testing: run with MailDev (`MAIL_MODE=dev`).
- Production (Render or SMTP-blocked hosts): your apps call this relay (`MAIL_MODE=api`).
- Direct SMTP: use `MAIL_MODE=smtp` if your host allows SMTP outbound.

## Running the relay
1. Copy `.env.example` to `.env` and fill in your values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the service:
   ```bash
   npm start
   ```

It will listen on `http://localhost:4000/send`.

## Example request
POST `/send`
```json
{
  "from": "ASR Web Services <no-reply@asrweb.ie>",
  "to": "you@asrweb.ie",
  "subject": "Contact form message",
  "html": "<p>Hello Karl, new inquiry...</p>"
}
```
Headers:
```
Authorization: Bearer <MAIL_WEBHOOK_TOKEN>
Content-Type: application/json
```

## Deployment options
- **Fly.io** — free tier, allows SMTP outbound ✅
- **Railway.app** — limited hours but SMTP usually allowed ✅
- **Cloudflare Tunnel or ngrok** — expose your relay from home temporarily ✅

Later you can host it on your own ASR Utilities server.
