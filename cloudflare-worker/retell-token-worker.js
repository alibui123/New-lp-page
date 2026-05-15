/**
 * Finova — Retell web-call token proxy (Cloudflare Workers, free tier)
 *
 * Why: `next export` / static Hostinger has NO /api routes. The browser cannot hold
 * RETELL_API_KEY. This worker stores the key as a Worker secret and forwards create-web-call.
 *
 * Setup (dashboard, zero bill if within free quotas):
 * 1. Cloudflare dashboard → Workers & Pages → Create → Create Worker → paste this file’s code.
 * 2. Settings → Variables → add Secrets: RETELL_API_KEY, RETELL_AGENT_ID (same values as local .env).
 * 3. Save and deploy. Copy the worker URL (e.g. https://retell-token.your-account.workers.dev).
 * 4. EITHER add to project `.env` before `npm run dist`:
 *      NEXT_PUBLIC_RETELL_TOKEN_URL=https://retell-token.your-account.workers.dev
 *    OR leave that unset and instead edit `public/voice-token-endpoint.json` (copied to site root
 *    as `voice-token-endpoint.json`) on the host: `"tokenUrl": "https://...workers.dev"` — no rebuild.
 *
 * Security: This URL is public; anyone could request tokens. Retell tokens are short-lived;
 * add Cloudflare Rate limiting / Turnstile later if you see abuse.
 */

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors() });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...cors() },
      });
    }

    const apiKey = env.RETELL_API_KEY;
    const agentId = env.RETELL_AGENT_ID;
    if (!apiKey || !agentId) {
      return new Response(
        JSON.stringify({ error: 'Worker is not configured (missing RETELL_API_KEY or RETELL_AGENT_ID secrets).' }),
        { status: 503, headers: { 'Content-Type': 'application/json', ...cors() } }
      );
    }

    try {
      const res = await fetch('https://api.retellai.com/v2/create-web-call', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agent_id: agentId }),
      });

      const raw = await res.text();

      return new Response(raw, {
        status: res.status,
        headers: {
          'Content-Type': 'application/json',
          ...cors(),
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Network error contacting Retell.', detail: String(e) }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...cors() },
      });
    }
  },
};
