# 🚀 Hostinger Static Hosting Deployment Guide

This project is configured for **static export** on Hostinger (or any static hosting provider).

## ✅ Pre-Deployment Checklist

### 1. Build the Project
```bash
npm run build
```
This generates the static site in the `out/` folder.

### 2. Test Locally (Optional)
```bash
npx serve out
```
Then open http://localhost:3000 to verify the site works.

### 3. Prepare Cloudflare Worker for Voice (Retell Integration)
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages
- Create a new Worker and paste the code from `cloudflare-worker/retell-token-worker.js`
- Add the following **Secrets** in Worker Settings:
  - `RETELL_API_KEY` (from your Retell dashboard)
  - `RETELL_AGENT_ID` (from your Retell dashboard)
- Deploy and copy your Worker URL (e.g., `https://retell-token-worker.YOUR-ACCOUNT.workers.dev`)

## 📤 Deployment to Hostinger

### Option A: Auto Build (Recommended)
1. Connect your Git repository to Hostinger via their Git integration
2. Hostinger will automatically run `npm run build` on push
3. Static files from `out/` will be deployed automatically

### Option B: Manual Upload
1. Run `npm run build` locally
2. FTP/SCP the contents of `out/` folder to your Hostinger account:
   - Upload to `public_html/` (or your site's root directory)
   - Ensure `index.html` is at the root

## 🎤 Voice Demo Configuration (Post-Deployment)

**After uploading to Hostinger:**

1. Edit `public/voice-token-endpoint.json` on the server (via File Manager):
   ```json
   {
     "tokenUrl": "https://retell-token-worker.YOUR-ACCOUNT.workers.dev"
   }
   ```
   Replace `YOUR-ACCOUNT` with your Cloudflare account ID.

2. Save and test the voice demo on your live site.

**OR** (if you prefer to set it at build time):
```bash
NEXT_PUBLIC_RETELL_TOKEN_URL=https://retell-token-worker.YOUR-ACCOUNT.workers.dev npm run build
```

## ⚠️ Important Notes

### What WON'T Work on Static Hosting
- ❌ API routes (`/api/*`) — these require a Node.js server
  - The `/api/retell/web-call` endpoint is **disabled** on Hostinger
  - Use the Cloudflare Worker instead (see above)
- ❌ Dynamic server rendering
- ❌ Server-side redirects or rewrites
- ❌ Cookies set server-side

### What WILL Work
- ✅ All static pages (HTML,CSS, JS)
- ✅ Client-side interactivity (React, Lenis, animations)
- ✅ Cloudflare Worker integration for voice tokens
- ✅ External API calls from the browser
- ✅ JSON configuration files (like `voice-token-endpoint.json`)

## 🔧 Troubleshooting

### Voice demo not working?
1. Check browser console (F12 → Console tab) for errors
2. Verify Cloudflare Worker URL in `voice-token-endpoint.json`
3. Ensure Worker has the correct `RETELL_API_KEY` and `RETELL_AGENT_ID` secrets
4. Check Cloudflare dashboard for Worker logs

### Site not loading?
1. Ensure `out/index.html` exists after build
2. Check Hostinger file permissions (should be 644 for files, 755 for folders)
3. Clear browser cache (or do a hard refresh: Ctrl+Shift+R)

### Build fails?
1. Run `npm ci --omit=dev` to install exact dependency versions
2. Delete `node_modules/.cache` and retry
3. Check for TypeScript errors: `npm run lint`

## 📝 File Structure After Build

```
out/
├── index.html           (homepage)
├── offer/
│   └── [[...slug]]/
│       └── page.html    (offer page)
├── terms/
│   └── [[...slug]]/
│       └── page.html    (T&C page)
├── voice-token-endpoint.json  (editable on server)
├── public/              (assets)
│   ├── assets/
│   ├── gradient-bg.js
│   ├── offer-animations.js
│   └── script.js
└── _next/              (Next.js internals)
```

Upload everything in `out/` to your Hostinger public directory.

## 🎯 Next Steps

1. ✅ Build locally: `npm run build`
2. ✅ Test locally: `npx serve out`
3. ✅ Set up Cloudflare Worker with Retell secrets
4. ✅ Upload `out/` folder to Hostinger
5. ✅ Update `voice-token-endpoint.json` on the server
6. ✅ Test live site and voice demo

---

**Questions?** Check the [Next.js Static Export docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
