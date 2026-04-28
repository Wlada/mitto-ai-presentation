# Deployment — Render.com + Cloudflare DNS

> Public live URL: <https://presentation.vladimirbujanovic.com>
>
> Single Express service serves both `/api/*` and the built Angular static
> bundle. Free tier on Render (Frankfurt region), DNS through Cloudflare on
> the user's existing `vladimirbujanovic.com` domain.

---

## At a glance

```
┌────────────┐  CNAME   ┌──────────────────────────────────┐
│ Cloudflare ├─────────►│ mitto-ai-presentation.onrender.com │
│   DNS      │          │  └─ Express (port 10000 internal) │
└────────────┘          │     ├─ /api/health                 │
                        │     ├─ /api/feedback (POST/GET)    │
                        │     └─ static: apps/web/dist/...   │
                        └──────────────────────────────────┘
```

- **Code lives on:** `demo-finished` branch (auto-deploys on push)
- **Build:** `npm ci && npm run build` (~3-5 min)
- **Runtime:** `npm start` → `node server/dist/index.js`
- **Cold start:** ~30 s after 15 min idle (free tier sleep). Mitigated by
  the pre-show warm-up step.

---

## Prerequisites

- A Render account (signed in)
- A GitHub account with the repo pushed (Render needs a git source)
- Cloudflare DNS access for `vladimirbujanovic.com`
- Local `npm test && npm run build` passes on `demo-finished`

---

## Step 0 — Push the repo to GitHub (one-time)

Render pulls from GitHub; the repo must be there before the next steps.

```bash
# If you have the gh CLI:
gh repo create mitto-ai-presentation --private --source=. --push --remote=origin
git push origin --all                # push both main and demo-finished

# If you don't have gh: create the repo manually on github.com, then:
git remote add origin git@github.com:<your-username>/mitto-ai-presentation.git
git push -u origin main
git push origin demo-finished
```

Private repo is fine — Render integrates with GitHub OAuth and accesses
private repos with your permission.

---

## Step 1 — First deploy on Render

The repo already has `render.yaml` at the root, which Render reads as a
**Blueprint** (Infrastructure as Code).

1. In Render dashboard: **New +** → **Blueprint**
2. Connect your GitHub account; pick the `mitto-ai-presentation` repo
3. Render reads `render.yaml` and shows the planned services
4. Confirm:
   - Service: `mitto-ai-presentation`
   - Branch: `demo-finished`
   - Region: Frankfurt
   - Plan: Free
   - Build: `npm ci && npm run build`
   - Start: `npm start`
   - Health check: `/api/health`
5. Click **Apply** — first build runs (~3-5 min)
6. When build is green, the service URL is
   `https://mitto-ai-presentation.onrender.com`

### Verify the bare service

```bash
curl https://mitto-ai-presentation.onrender.com/api/health
# {"status":"ok","uptime":12.345}

curl -I https://mitto-ai-presentation.onrender.com/
# HTTP/1.1 200 OK    ← serves the Angular index.html

curl -I https://mitto-ai-presentation.onrender.com/slides/8
# HTTP/1.1 200 OK    ← SPA fallback works (deep link)
```

Open the URL in a browser, navigate slides, click "Try the demo feature"
on slide 6, submit a Q&A entry, see it in the list. If all that works,
you're ready for the custom domain.

---

## Step 2 — Custom domain (`presentation.vladimirbujanovic.com`)

### 2a. Tell Render about the domain

In Render dashboard for the service → **Settings** → **Custom Domains** →
**Add Custom Domain** → enter `presentation.vladimirbujanovic.com`.

Render shows what to set in DNS: a CNAME pointing to
`mitto-ai-presentation.onrender.com`.

### 2b. Add the CNAME at Cloudflare

1. Cloudflare dashboard → `vladimirbujanovic.com` → **DNS** → **Records**
2. Click **Add record**:
   - Type: **CNAME**
   - Name: `presentation`
   - Target: `mitto-ai-presentation.onrender.com`
   - **Proxy status: DNS only (grey cloud)** — important for the initial
     SSL cert issuance
3. Save

### 2c. Wait for verification

Back in Render's Custom Domains tab:
- Status will move from "Pending verification" to "Verified" (~3-5 min)
- Render issues a Let's Encrypt cert automatically

### 2d. (Optional) Turn Cloudflare proxy ON

After Render shows "Verified" with a valid cert, you can:

1. In Cloudflare DNS, switch the CNAME proxy to **Proxied (orange cloud)**
2. In Cloudflare → SSL/TLS → set encryption mode to **Full** (NOT Flexible
   — Full reuses Render's cert)

Cloudflare proxy gives you their CDN + DDoS protection. Skipping it (grey
cloud) is simpler and works fine for a low-traffic demo.

### 2e. Verify the live URL

```bash
curl https://presentation.vladimirbujanovic.com/api/health
# {"status":"ok","uptime":...}
```

---

## Step 3 — CORS and the env

The `render.yaml` already sets `CORS_ORIGIN=https://presentation.vladimirbujanovic.com`.

If you change the subdomain later, update `CORS_ORIGIN` in Render dashboard
→ **Environment** → edit value → Save → Render redeploys automatically.

For multiple origins (e.g. add `staging.vladimirbujanovic.com`), set:

```
CORS_ORIGIN=https://presentation.vladimirbujanovic.com,https://staging.vladimirbujanovic.com
```

The Express app splits on `,`.

---

## Daily workflow — redeploy after a change

```bash
# Make code changes on demo-finished
npm run preshow         # local sanity: tests, build, e2e
git add -A
git commit -m "feat: ..."
git push origin demo-finished
# Render auto-deploys on push (~3-5 min). Watch progress in dashboard.
```

If you want to avoid auto-deploy on push (e.g. mid-rehearsal), Render
dashboard → **Settings** → **Deploys** → **Suspend Auto-Deploy**.

---

## Cold start mitigation

Render free tier sleeps the service after 15 min idle. First request after
sleep takes ~30 s while the container spins up.

**Pre-show warm-up** (built into `npm run preshow`):

```bash
curl -sf https://presentation.vladimirbujanovic.com/api/health
```

If the demo will be longer than 15 min and you're worried about an idle
period mid-talk, run a small uptime monitor (e.g. UptimeRobot free tier
pings every 5 min). Or accept the 30 s cold start as the cost of free
tier.

---

## Troubleshooting

### Build fails on first deploy
- Check the build log in Render dashboard. Most common: `npm ci` fails
  because `package-lock.json` is out of sync. Fix locally with
  `npm install`, commit `package-lock.json`, push.

### `/feedback` returns blank page
- Open browser devtools → Network. If the document loads but there are
  no JS chunks, `STATIC_DIR` is wrong. Verify in Render dashboard →
  Environment → `STATIC_DIR` is
  `/opt/render/project/src/apps/web/dist/web/browser`.

### `/api/feedback` returns 404
- Express isn't seeing the route. Check Render logs for the line
  "server listening on http://localhost:..." — if missing, server
  crashed at boot. Most common cause: a TS path or import error
  introduced just before push.

### CORS errors in browser console
- Frontend and backend are same-origin in production, so CORS shouldn't
  apply at all for `/api/*` calls from the page itself. If you see a
  CORS error, the request is being made cross-origin (likely a typo or
  hardcoded URL somewhere).

### Cert is invalid in browser
- Cloudflare proxy is ON but SSL/TLS mode is "Flexible" — Cloudflare
  expects to talk HTTP to the origin and Render only speaks HTTPS.
  Switch SSL/TLS mode to **Full**.

### Render keeps spinning down even with traffic
- Free tier has a hard sleep policy after 15 min idle. There's no way
  around it on free. Options: paid tier ($7/mo, no sleep), or external
  uptime pinger.

---

## Rollback

To roll back a bad deploy:

```bash
git checkout demo-finished
git revert <bad-commit-sha>
git push origin demo-finished
# Render redeploys the reverted state.
```

Or in Render dashboard → **Deploys** tab → select an earlier successful
deploy → **Rollback to this deploy**.
