import { NextResponse } from 'next/server';

/**
 * Creates a Retell web call and returns a short-lived access token for the browser SDK.
 * Set RETELL_API_KEY and RETELL_AGENT_ID in the environment (never expose the API key client-side).
 */
export async function POST() {
  const apiKey = process.env.RETELL_API_KEY;
  const agentId = process.env.RETELL_AGENT_ID;

  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: 'Voice demo is not configured. Add RETELL_API_KEY and RETELL_AGENT_ID to the server environment.' },
      { status: 503 }
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
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Could not start voice session.', detail: raw.slice(0, 500) },
        { status: res.status >= 400 && res.status < 600 ? res.status : 502 }
      );
    }

    let data: { access_token?: string };
    try {
      data = JSON.parse(raw) as { access_token?: string };
    } catch {
      return NextResponse.json({ error: 'Unexpected response from voice service.' }, { status: 502 });
    }

    if (!data.access_token) {
      return NextResponse.json({ error: 'Voice service did not return an access token.' }, { status: 502 });
    }

    return NextResponse.json({ access_token: data.access_token });
  } catch {
    return NextResponse.json({ error: 'Network error contacting voice service.' }, { status: 502 });
  }
}
