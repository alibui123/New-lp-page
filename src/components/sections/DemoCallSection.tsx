'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { Room, Track } from 'livekit-client';

type CallUiStatus = 'idle' | 'connecting' | 'live';

export type TranscriptRole = 'agent' | 'user';

export type TranscriptLine = { role: TranscriptRole; content: string };

const USER_LABEL = 'You';
const AGENT_LABEL = process.env.NEXT_PUBLIC_RETELL_AGENT_NAME?.trim() || 'Sara';
/** Shown in subtitles for agent lines — product branding for plumbing agencies. */
const AGENT_DISPLAY = 'Finova Plumbing Solutions';

/** Inlined at build time. If this is already an absolute URL, no JSON fetch needed. */
const RETELL_TOKEN_URL =
  process.env.NEXT_PUBLIC_RETELL_TOKEN_URL?.trim() || '/api/retell/web-call';

/** Prefer non-relative build-time URL, else `public/voice-token-endpoint.json` (editable on Hostinger). */
async function resolveRetellTokenUrl(): Promise<string> {
  if (typeof window === 'undefined') return RETELL_TOKEN_URL;

  const fromEnv = RETELL_TOKEN_URL.trim();
  if (/^https?:\/\//i.test(fromEnv)) {
    return fromEnv.replace(/\/+$/, '');
  }

  try {
    const res = await fetch(`/voice-token-endpoint.json?${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const j = (await res.json()) as { tokenUrl?: unknown };
      if (typeof j.tokenUrl === 'string') {
        const u = j.tokenUrl.trim().replace(/\/+$/, '');
        if (u.length > 0 && /^https?:\/\//i.test(u)) return u;
      }
    }
  } catch {
    /* missing or invalid */
  }
  return RETELL_TOKEN_URL;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getRetellRoom(client: RetellWebClient): Room | undefined {
  return (client as unknown as { room?: Room }).room;
}

function computeRmsTimeDomain(analyser: AnalyserNode, scratch: Float32Array): number {
  analyser.getFloatTimeDomainData(scratch);
  let sum = 0;
  for (let i = 0; i < scratch.length; i++) {
    const v = scratch[i];
    sum += v * v;
  }
  return Math.sqrt(sum / scratch.length);
}

function parseTranscriptString(s: string): TranscriptLine[] {
  const lines = s.split(/\n/).map((l) => l.trim()).filter(Boolean);
  const out: TranscriptLine[] = [];
  const rules: [RegExp, TranscriptRole][] = [
    [/^User:\s*/i, 'user'],
    [/^Agent:\s*/i, 'agent'],
    [new RegExp(`^${escapeRegExp(AGENT_LABEL)}:\\s*`, 'i'), 'agent'],
    [/^Finova Plumbing Solutions:\s*/i, 'agent'],
  ];
  for (const line of lines) {
    let role: TranscriptRole | null = null;
    let text = line;
    for (const [re, r] of rules) {
      if (re.test(line)) {
        role = r;
        text = line.replace(re, '').trim();
        break;
      }
    }
    if (role && text) out.push({ role, content: text });
  }
  return out;
}

function utterancesFromArray(arr: unknown): TranscriptLine[] {
  if (!Array.isArray(arr)) return [];
  const out: TranscriptLine[] = [];
  for (const item of arr) {
    if (!item || typeof item !== 'object') continue;
    const u = item as Record<string, unknown>;
    const role = u.role;
    const content = u.content;
    if (typeof content !== 'string' || !content.trim()) continue;
    if (role === 'user') out.push({ role: 'user', content: content.trim() });
    else if (role === 'agent' || role === 'transfer_target') out.push({ role: 'agent', content: content.trim() });
  }
  return out;
}

function extractTranscriptLines(evt: unknown): TranscriptLine[] {
  if (!evt || typeof evt !== 'object') return [];
  const o = evt as Record<string, unknown>;

  if (Array.isArray(o.transcript_object)) return utterancesFromArray(o.transcript_object);
  if (Array.isArray(o.live_transcript)) return utterancesFromArray(o.live_transcript);

  if (Array.isArray(o.transcript)) {
    const first = o.transcript[0];
    if (first && typeof first === 'object' && 'role' in (first as object)) {
      return utterancesFromArray(o.transcript);
    }
  }

  if (typeof o.transcript === 'string' && o.transcript.trim()) {
    return parseTranscriptString(o.transcript);
  }

  if (Array.isArray(o.transcript_with_tool_calls)) {
    const raw = utterancesFromArray(o.transcript_with_tool_calls);
    if (raw.length) return raw;
  }

  return [];
}

type UserAudioNodes = {
  ctx: AudioContext;
  source: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;
};

function renderOceanWaves(
  ctx2d: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  smoothA: number,
  smoothU: number,
  mode: 'idle' | 'connecting' | 'live',
  speechEnvelope: number
) {
  const se = Math.max(0, Math.min(1, speechEnvelope));
  const rawEnergy = Math.min(1, (smoothA + smoothU) * 2.35);
  const userLift = smoothU * (1.32 + (1 - se) * 0.52);

  const breath = 0.007 * Math.sin(t * 0.42);
  const idleExtra = mode === 'idle' ? 0.009 : 0;
  const ambientFrac = 0.034 + breath + idleExtra + (mode === 'connecting' ? 0.006 : 0);
  const swellBoost = se * (0.088 + rawEnergy * 0.12) + (mode === 'connecting' ? 0.016 : 0);
  const swellPx = h * (ambientFrac + swellBoost);

  const baseline = h * 0.5;

  const sampleSurface = (x: number, layer: number) => {
    const nx = x / Math.max(w, 1);
    const slow = Math.sin(nx * Math.PI * 2.02 + t * (0.68 + layer * 0.09));
    const mid = Math.sin(nx * Math.PI * 5.1 + t * (1.15 + layer * 0.16)) * 0.5;
    const rip = Math.sin(nx * Math.PI * 10.2 + t * (1.75 + layer * 0.1)) * 0.34;
    const sparkle = Math.sin(nx * Math.PI * 17 + t * 2.2 + layer * 0.35) * 0.16;
    const agentHump = smoothA * Math.sin(nx * Math.PI * 14.5 + t * 2.95) * (0.62 + se * 0.55);
    const userHump = userLift * Math.sin(nx * Math.PI * 12.2 - t * 2.35) * (2.05 + se * 0.72);
    const mix = slow * 0.36 + mid * 0.3 + rip * 0.22 + sparkle * 0.12 + (agentHump + userHump) * 0.48;
    return baseline + swellPx * mix;
  };

  const skyGrad = ctx2d.createLinearGradient(0, 0, w, h * 0.55);
  skyGrad.addColorStop(0, 'rgba(10,26,52,0.96)');
  skyGrad.addColorStop(0.35, 'rgba(5,16,38,0.9)');
  skyGrad.addColorStop(0.65, 'rgba(7,22,46,0.74)');
  skyGrad.addColorStop(1, 'rgba(2,8,20,0.38)');
  ctx2d.fillStyle = skyGrad;
  ctx2d.fillRect(0, 0, w, h);

  const calmBoost = (1 - se) * 0.1;
  const layers: { layer: number; fillK: number }[] = [
    { layer: 2, fillK: 0.68 },
    { layer: 1, fillK: 0.86 },
    { layer: 0, fillK: 1 },
  ];

  const steps = Math.min(96, Math.max(36, Math.ceil(w / 7)));

  for (const { layer, fillK } of layers) {
    ctx2d.beginPath();
    ctx2d.moveTo(0, h + 2);
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * w;
      const y = sampleSurface(x, layer);
      if (s === 0) ctx2d.lineTo(0, y);
      else ctx2d.lineTo(x, y);
    }
    ctx2d.lineTo(w, h + 2);
    ctx2d.closePath();

    const fillG = ctx2d.createLinearGradient(0, baseline - swellPx * 7, 0, h);
    const a0 = (0.12 + se * 0.12 + calmBoost) * fillK;
    const a1 = (0.1 + se * 0.1 + calmBoost * 0.9) * fillK;
    const a2 = (0.08 + se * 0.08 + calmBoost * 0.8) * fillK;
    fillG.addColorStop(0, `rgba(140,248,255,${0.26 * a0})`);
    fillG.addColorStop(0.2, `rgba(33,210,237,${0.42 * a1})`);
    fillG.addColorStop(0.45, `rgba(45,190,205,${0.32 * a1})`);
    fillG.addColorStop(0.72, `rgba(59,130,246,${0.26 * a2})`);
    fillG.addColorStop(0.92, `rgba(130,100,210,${0.14 + se * 0.09})`);
    fillG.addColorStop(1, `rgba(5,8,22,${0.42 + se * 0.1})`);
    ctx2d.fillStyle = fillG;
    ctx2d.fill();
  }

  const traceCrest = (offset: number, alphaM: number) => {
    ctx2d.beginPath();
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * w;
      const y = sampleSurface(x, 0) + offset;
      if (s === 0) ctx2d.moveTo(x, y);
      else ctx2d.lineTo(x, y);
    }
    const crest = ctx2d.createLinearGradient(0, baseline - swellPx * 9, w, baseline + swellPx * 3);
    crest.addColorStop(0, `rgba(255,252,255,${(0.52 + calmBoost * 0.3) * alphaM})`);
    crest.addColorStop(0.25, `rgba(190,250,255,${0.48 * alphaM})`);
    crest.addColorStop(0.5, `rgba(33,210,237,${0.58 * alphaM})`);
    crest.addColorStop(0.78, `rgba(192,131,252,${0.44 * alphaM})`);
    crest.addColorStop(1, `rgba(33,210,237,${0.3 * alphaM})`);
    ctx2d.strokeStyle = crest;
    ctx2d.lineWidth = 1.15 + se * 2.1 + rawEnergy * 1.35 + calmBoost * 0.4;
    ctx2d.lineJoin = 'round';
    ctx2d.lineCap = 'round';
    ctx2d.stroke();
  };

  const crestGlow = 0.34 + se * 0.28 + (1 - se) * 0.12;
  ctx2d.globalAlpha = crestGlow;
  traceCrest(2.2, 0.62);
  ctx2d.globalAlpha = 1;
  traceCrest(0, 1);

  if (se > 0.08 || mode === 'connecting') {
    ctx2d.save();
    ctx2d.globalCompositeOperation = 'screen';
    const glint = ctx2d.createRadialGradient(w * 0.18, h * 0.28, 0, w * 0.22, h * 0.42, w * 0.52);
    glint.addColorStop(0, `rgba(200,245,255,${0.06 + se * 0.06})`);
    glint.addColorStop(0.35, `rgba(33,210,237,${0.05 + smoothA * 0.09})`);
    glint.addColorStop(1, 'transparent');
    ctx2d.fillStyle = glint;
    ctx2d.fillRect(0, 0, w, h);
    ctx2d.restore();
  }

  if (se > 0.1 || mode === 'connecting') {
    ctx2d.save();
    ctx2d.globalCompositeOperation = 'lighter';
    const moon = ctx2d.createRadialGradient(w * 0.78, h * 0.18, 0, w * 0.78, h * 0.3, w * 0.4);
    moon.addColorStop(0, `rgba(231,247,255,${0.04 + se * 0.08})`);
    moon.addColorStop(0.45, `rgba(192,131,252,${0.03 + smoothU * 0.09})`);
    moon.addColorStop(1, 'transparent');
    ctx2d.fillStyle = moon;
    ctx2d.fillRect(0, 0, w, h);
    ctx2d.restore();
  }
}

export function DemoCallSection() {
  const clientRef = useRef<RetellWebClient | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const userAudioRef = useRef<UserAudioNodes | null>(null);
  const rafRef = useRef<number | null>(null);
  const scratchRef = useRef<Float32Array | null>(null);

  const [status, setStatus] = useState<CallUiStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);

  const stopUserAudio = useCallback(() => {
    const nodes = userAudioRef.current;
    if (nodes) {
      try {
        nodes.source.disconnect();
        nodes.analyser.disconnect();
        void nodes.ctx.close();
      } catch {
        /* ignore */
      }
      userAudioRef.current = null;
    }
    scratchRef.current = null;
  }, []);

  const stopRaf = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const stopCall = useCallback(() => {
    stopRaf();
    stopUserAudio();
    clientRef.current?.stopCall();
    clientRef.current = null;
    setStatus('idle');
    setTranscript([]);
  }, [stopRaf, stopUserAudio]);

  useEffect(() => {
    return () => {
      stopRaf();
      stopUserAudio();
      clientRef.current?.stopCall();
      clientRef.current = null;
    };
  }, [stopRaf, stopUserAudio]);

  const attachUserAnalyser = useCallback((client: RetellWebClient) => {
    stopUserAudio();
    const room = getRetellRoom(client);
    if (!room) return;

    const tryAttach = (attempt: number) => {
      const pub = room.localParticipant.getTrackPublication(Track.Source.Microphone);
      const mediaTrack = pub?.track?.mediaStreamTrack;
      if (!mediaTrack || mediaTrack.readyState === 'ended') {
        if (attempt < 45) requestAnimationFrame(() => tryAttach(attempt + 1));
        return;
      }

      try {
        const ctx = new AudioContext();
        const stream = new MediaStream([mediaTrack]);
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.72;
        source.connect(analyser);
        scratchRef.current = new Float32Array(analyser.fftSize);
        userAudioRef.current = { ctx, source, analyser };
      } catch {
        stopUserAudio();
      }
    };

    tryAttach(0);
  }, [stopUserAudio]);

  const runVisualizer = useCallback(
    (mode: 'connecting' | 'live') => {
      stopRaf();
      const canvas = canvasRef.current;
      if (!canvas) return () => {};

      const ctx2d = canvas.getContext('2d', { alpha: true, desynchronized: true });
      if (!ctx2d) return () => {};

      let t0 = performance.now();
      let smoothA = 0;
      let smoothU = 0;
      let speechEnvelope = 0;
      let displayT = 0;
      let lastFrame = 0;
      const FRAME_MS = 1000 / 36;

      const resize = () => {
        const wrap = canvasWrapRef.current;
        if (!wrap || !canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resize();
      const ro = new ResizeObserver(resize);
      if (canvasWrapRef.current) ro.observe(canvasWrapRef.current);

      const draw = (now: number) => {
        const wrap = canvasWrapRef.current;
        if (!wrap || document.hidden) {
          rafRef.current = requestAnimationFrame(draw);
          return;
        }

        if (now - lastFrame < FRAME_MS) {
          rafRef.current = requestAnimationFrame(draw);
          return;
        }
        lastFrame = now;

        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        const targetT = (now - t0) / 1000;
        displayT += (targetT - displayT) * 0.16;
        const client = clientRef.current;

        let rawA = 0;
        let rawU = 0;

        if (mode === 'live' && client) {
          rawA = client.analyzerComponent?.calculateVolume?.() ?? 0;
          const ua = userAudioRef.current?.analyser;
          const scratch = scratchRef.current;
          if (ua && scratch) rawU = computeRmsTimeDomain(ua, scratch);
        } else if (mode === 'connecting') {
          rawA = 0.1 + Math.sin(targetT * 2.8) * 0.06;
          rawU = 0.08 + Math.cos(targetT * 2.1) * 0.05;
        }

        smoothA = smoothA * 0.88 + rawA * 0.12;
        smoothU = smoothU * 0.88 + rawU * 0.12;

        const instantEnv =
          mode === 'connecting' ? 0.32 + Math.sin(targetT * 2.4) * 0.12 : Math.min(1, Math.max(smoothA, smoothU) * 4.2);
        const follow = instantEnv > speechEnvelope ? 0.2 : 0.068;
        speechEnvelope += (instantEnv - speechEnvelope) * follow;
        speechEnvelope = Math.max(0, Math.min(1, speechEnvelope));

        ctx2d.clearRect(0, 0, w, h);
        renderOceanWaves(ctx2d, w, h, displayT, smoothA, smoothU, mode, speechEnvelope);

        rafRef.current = requestAnimationFrame(draw);
      };

      rafRef.current = requestAnimationFrame(draw);

      return () => {
        ro.disconnect();
        stopRaf();
      };
    },
    [stopRaf]
  );

  useEffect(() => {
    if (status !== 'idle') return;

    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!canvas || !wrap) return;

    const ctx2d = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx2d) return;

    let idleRaf = 0;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const ww = wrap.clientWidth;
      const hh = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(ww * dpr));
      canvas.height = Math.max(1, Math.floor(hh * dpr));
      canvas.style.width = `${ww}px`;
      canvas.style.height = `${hh}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let last = 0;
    let displayT = 0;
    const tick = (now: number) => {
      if (document.hidden) {
        idleRaf = requestAnimationFrame(tick);
        return;
      }
      if (now - last < 1000 / 24) {
        idleRaf = requestAnimationFrame(tick);
        return;
      }
      last = now;
      const ww = wrap.clientWidth;
      const hh = wrap.clientHeight;
      const targetT = (now - t0) / 1000;
      displayT += (targetT - displayT) * 0.14;
      ctx2d.clearRect(0, 0, ww, hh);
      renderOceanWaves(ctx2d, ww, hh, displayT, 0, 0, 'idle', 0);
      idleRaf = requestAnimationFrame(tick);
    };

    idleRaf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(idleRaf);
      ro.disconnect();
    };
  }, [status]);

  useEffect(() => {
    if (status === 'connecting') {
      const cleanup = runVisualizer('connecting');
      return cleanup;
    }
    if (status === 'live') {
      const cleanup = runVisualizer('live');
      return cleanup;
    }
    return undefined;
  }, [status, runVisualizer]);

  const startCall = useCallback(async () => {
    setErrorMessage(null);
    setTranscript([]);
    setStatus('connecting');

    try {
      const tokenUrl = await resolveRetellTokenUrl();
      const host = typeof window !== 'undefined' ? window.location.hostname : '';
      const isLocal = host === 'localhost' || host === '127.0.0.1';
      if (!isLocal && (tokenUrl === '/api/retell/web-call' || tokenUrl.startsWith('/api/'))) {
        setErrorMessage(
          'Voice demo is not wired for this static host. Put your Cloudflare Worker URL in voice-token-endpoint.json (tokenUrl), upload that file to the site root, then refresh — or rebuild with NEXT_PUBLIC_RETELL_TOKEN_URL in .env. See env.example.'
        );
        setStatus('idle');
        return;
      }

      const res = await fetch(tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = (await res.json()) as { access_token?: string; error?: string; detail?: string };

      if (!res.ok) {
        const msg = data.error || 'Could not start the demo call.';
        setErrorMessage(data.detail ? `${msg} ${data.detail}` : msg);
        setStatus('idle');
        return;
      }

      if (!data.access_token) {
        setErrorMessage('Invalid response from server.');
        setStatus('idle');
        return;
      }

      const client = new RetellWebClient();
      clientRef.current = client;

      client.on('call_started', () => {
        void client.startAudioPlayback().catch(() => {});
        window.setTimeout(() => attachUserAnalyser(client), 300);
        setStatus('live');
      });

      client.on('call_ready', () => {
        attachUserAnalyser(client);
      });

      client.on('call_ended', () => {
        stopRaf();
        stopUserAudio();
        setStatus('idle');
        if (clientRef.current === client) clientRef.current = null;
      });

      client.on('update', (evt: unknown) => {
        const lines = extractTranscriptLines(evt);
        if (lines.length) setTranscript(lines);
      });

      client.on('error', () => {
        setErrorMessage('The call ended unexpectedly. Please try again.');
        stopRaf();
        stopUserAudio();
        setStatus('idle');
        if (clientRef.current === client) clientRef.current = null;
      });

      await client.startCall({
        accessToken: data.access_token,
        emitRawAudioSamples: true,
      });
    } catch {
      setErrorMessage('Something went wrong starting the call. Check your connection and try again.');
      stopRaf();
      stopUserAudio();
      setStatus('idle');
      clientRef.current = null;
    }
  }, [attachUserAnalyser, stopRaf, stopUserAudio]);

  const subtitleLines = transcript.slice(-2);

  return (
    <section className="chapter" id="demo" aria-labelledby="demo-heading">
      <div className="container">
        <div className="demo-call-inner">
          <span className="chapter-label fade-up">For plumbing agencies</span>
          <h2 id="demo-heading" className="ch-h2 fade-up d1" style={{ marginTop: '12px' }}>
            Hear how
            <br />
            <span style={{ color: 'var(--water)' }}>Finova answers the line.</span>
          </h2>
          <p className="ch-body fade-up d2" style={{ maxWidth: '640px', marginTop: '16px' }}>
            Talk with the Finova Plumbing Solutions voice agent—the same tone and flow your callers would get after you plug Finova into dispatch. Allow the
            microphone when prompted; the session stays on this page until you end it.
          </p>

          <div className="demo-ocean-stage fade-up d3">
            <div ref={canvasWrapRef} className="demo-ocean-canvas-wrap">
              <canvas ref={canvasRef} className="demo-ocean-canvas" aria-hidden />
              {status === 'connecting' ? (
                <div className="demo-ocean-connecting" role="status" aria-live="assertive">
                  <span className="demo-ocean-connecting-ring" aria-hidden="true" />
                  <span className="demo-ocean-connecting-text">Connecting your line…</span>
                </div>
              ) : null}
              <div className="demo-ocean-sub-shade" aria-live="polite">
                {subtitleLines.length === 0 ? (
                  <span className="demo-ocean-sub-faint" aria-hidden="true" />
                ) : (
                  subtitleLines.map((line, idx) => {
                    const isFresh = idx === subtitleLines.length - 1;
                    return (
                      <p
                        key={`${line.role}-${idx}-${line.content.slice(0, 48)}`}
                        className={`demo-ocean-sub-line ${isFresh ? 'demo-ocean-sub-line--fresh' : 'demo-ocean-sub-line--ghost'}`}
                      >
                        <span className="demo-ocean-sub-speaker">{line.role === 'user' ? USER_LABEL : AGENT_DISPLAY}</span>
                        <span className="demo-ocean-sub-words">{line.content}</span>
                      </p>
                    );
                  })
                )}
              </div>
            </div>

            {errorMessage ? (
              <p className="demo-ocean-error" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <div className="demo-ocean-ledge">
              <div className="demo-ocean-ledge-copy">
                <span className="demo-ocean-ledge-brand">Finova Plumbing Solutions</span>
                <span className="demo-ocean-ledge-sep" aria-hidden>
                  ·
                </span>
                <span className="demo-ocean-ledge-tag">Dispatch voice agent</span>
              </div>
              <div className="demo-ocean-ledge-actions">
                {status === 'live' ? (
                  <button type="button" className="btn-ghost" onClick={stopCall}>
                    End session
                  </button>
                ) : (
                  <button type="button" className="btn-primary" onClick={startCall} disabled={status === 'connecting'}>
                    {status === 'connecting' ? 'Connecting…' : 'Begin conversation'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
