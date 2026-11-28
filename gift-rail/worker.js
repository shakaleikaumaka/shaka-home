// 🤖 agent gift rail — x402 proxy for the browser cards (v1.1 · 28 Nov 2026)
// SPDX-License-Identifier: AGPL-3.0-or-later · Built by Open Source Orchestra: Shaka Lei Kaumaka & the AI ʻohana (https://opensourceorchestra.org)
//
// TWO LANES
//  1) /tempo/*  (v1.0, 27 Nov) — forwards verify/settle to Tempo's x402 facilitator with the API key kept server-side.
//  2) /base/*   (v1.1, 28 Nov) — the BROWSER-SAFE DOOR to the PayAI facilitator.
//     WHY: facilitator.payai.network is a server-to-server API. It answers the CORS preflight (OPTIONS /verify, /settle)
//     with HTTP 404 and no Access-Control-Allow-* headers, so every wallet-signed gift died AFTER the wallet signed:
//     Safari "Load failed" / Chrome "Failed to fetch" (a friend's iPhone, live repro 28 Nov 2026 09:25Z —
//     /workspace/gift-hiccup-2026-11-28/). Every harness had MOCKED the facilitator, which hides CORS.
//     WHAT: same request/response shapes as PayAI's /verify and /settle (x402 v1 · "exact" · EIP-3009), CORS on, and the request is
//     PINNED: one payee (osoartist.eth), USDC on Base, $0.001–$1000, authorization.to == payTo, value == maxAmountRequired.
//     The upstream body is REBUILT from validated fields (nothing the visitor typed passes through), the reply is filtered to known
//     string/boolean fields. A signed authorization names its own payee — this door can never redirect money; it only relays.
//     Kill switch: set BASE_PAUSED=1 (wrangler secret/var) → every /base call answers proxy_paused and the cards say so honestly.
//
// Contract for hosts (x402-tip.js · agent-gift-rail.js · frames gift.js · blessingpool.com · the Fountain):
//   POST https://gift-rail.opensourceorchestra.org/base/verify   body {x402Version:1, paymentPayload, paymentRequirements}
//   POST https://gift-rail.opensourceorchestra.org/base/settle   (same body)   → always JSON, CORS *, never throws on .json()
//   verify → {isValid, invalidReason?, invalidMessage?, payer?}      settle → {success, errorReason?, errorMessage?, transaction?, network?, payer?}
//   proxy-level refusals use the same shapes with reason "proxy_*" (proxy_pin_*, proxy_bad_json, proxy_too_large, proxy_rate_limited,
//   proxy_paused, proxy_upstream_unreachable). settle retries PayAI "settlement_pending" up to 4× server-side (idempotent).

const TEMPO = 'https://api.tempo.xyz/v1/x402';
const PAYAI = 'https://facilitator.payai.network';
const USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';          // Circle USDC on Base
const PAYTO = '0x25965899f4600b3AA5362ee4f34be95E5E62c934';         // osoartist.eth — the ONE address (23 Nov 2026 law)
const MIN_UNITS = 1000n;                                              // $0.001  (USDC has 6 decimals)
const MAX_UNITS = 1000000000n;                                        // $1000
const MAX_BODY = 8 * 1024;
const VERSION = '1.1';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Max-Age': '86400',
  'X-Content-Type-Options': 'nosniff',
};
const VERIFY_KEYS = ['isValid', 'invalidReason', 'invalidMessage', 'payer'];
const SETTLE_KEYS = ['success', 'errorReason', 'errorMessage', 'transaction', 'network', 'payer'];

function j(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...CORS } });
}
const lc = (s) => String(s == null ? '' : s).toLowerCase();
const clip = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, n);
const HEX40 = /^0x[0-9a-fA-F]{40}$/, HEX64 = /^0x[0-9a-fA-F]{64}$/, SIG = /^0x[0-9a-fA-F]{130,2048}$/, DIGITS = /^\d{1,20}$/;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// refuse(op, reason, status) → the x402 response shape for that op, so clients' `await r.json()` never throws
function refuse(op, reason, status = 400, message) {
  return op === 'verify'
    ? j({ isValid: false, invalidReason: reason, invalidMessage: message || reason }, status)
    : j({ success: false, errorReason: reason, errorMessage: message || reason, transaction: '', network: 'base' }, status);
}

// → { up } the upstream body rebuilt from validated fields, or { bad: 'proxy_pin_<field>' }
export function pinBase(body, nowSec) {
  const pp = body && body.paymentPayload, pr = body && body.paymentRequirements;
  if (!pp || typeof pp !== 'object' || !pr || typeof pr !== 'object') return { bad: 'proxy_pin_shape' };
  if (body.x402Version !== 1 || pp.x402Version !== 1) return { bad: 'proxy_pin_version' };
  if (pp.scheme !== 'exact' || pr.scheme !== 'exact') return { bad: 'proxy_pin_scheme' };
  if (pp.network !== 'base' || pr.network !== 'base') return { bad: 'proxy_pin_network' };
  if (lc(pr.asset) !== lc(USDC)) return { bad: 'proxy_pin_asset' };
  if (lc(pr.payTo) !== lc(PAYTO)) return { bad: 'proxy_pin_payTo' };
  const inner = pp.payload, a = inner && inner.authorization;
  if (!inner || typeof inner !== 'object' || !a || typeof a !== 'object') return { bad: 'proxy_pin_shape' };
  if (!HEX40.test(String(a.from || ''))) return { bad: 'proxy_pin_from' };
  if (lc(a.to) !== lc(PAYTO)) return { bad: 'proxy_pin_to' };
  const value = String(a.value == null ? '' : a.value);
  if (!/^[1-9]\d{0,17}$/.test(value)) return { bad: 'proxy_pin_value' };
  const units = BigInt(value);
  if (units < MIN_UNITS || units > MAX_UNITS) return { bad: 'proxy_pin_amount' };
  if (String(pr.maxAmountRequired == null ? '' : pr.maxAmountRequired) !== value) return { bad: 'proxy_pin_amount_match' };
  const after = String(a.validAfter == null ? '' : a.validAfter), before = String(a.validBefore == null ? '' : a.validBefore);
  if (!DIGITS.test(after) || !DIGITS.test(before)) return { bad: 'proxy_pin_validity' };
  if (Number(before) > nowSec + 3600 || Number(before) < nowSec - 3600) return { bad: 'proxy_pin_validity' };
  if (!HEX64.test(String(a.nonce || ''))) return { bad: 'proxy_pin_nonce' };
  if (!SIG.test(String(inner.signature || ''))) return { bad: 'proxy_pin_signature' };
  const resource = /^https:\/\/[^\s]{4,190}$/.test(String(pr.resource || '')) ? String(pr.resource) : 'https://shakaleikaumaka.com/x402-bless.json';
  return {
    units,
    up: {
      x402Version: 1,
      paymentPayload: { x402Version: 1, scheme: 'exact', network: 'base', payload: { signature: inner.signature, authorization: { from: a.from, to: PAYTO, value, validAfter: after, validBefore: before, nonce: a.nonce } } },
      paymentRequirements: { scheme: 'exact', network: 'base', maxAmountRequired: value, resource, description: clip(pr.description, 160) || 'ʻohana gift 🌺', mimeType: 'application/json', payTo: PAYTO, maxTimeoutSeconds: 300, asset: USDC, extra: { name: 'USD Coin', version: '2' } },
    },
  };
}

function pick(o, keys) {
  const out = {};
  for (const k of keys) {
    const v = o && o[k];
    if (typeof v === 'boolean') out[k] = v;
    else if (typeof v === 'string') out[k] = v.slice(0, 300);
  }
  return out;
}

async function callPayAI(path, body) {
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 25000);
  try {
    const r = await fetch(PAYAI + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), redirect: 'manual', signal: ctl.signal });
    const text = await r.text();
    let json = null; try { json = JSON.parse(text); } catch (e) { json = null; }
    return { status: r.status, json };
  } finally { clearTimeout(timer); }
}

async function baseLane(request, env, op, ctx) {
  const t0 = Date.now(), log = (o) => { try { console.log(JSON.stringify({ lane: 'base', op, ms: Date.now() - t0, ...o })); } catch (e) { /* logging never breaks a gift */ } };
  if (request.method !== 'POST') return j({ error: 'POST only', hint: 'x402 v1 body {x402Version,paymentPayload,paymentRequirements}' }, 405);
  if (env.BASE_PAUSED) { log({ ok: false, reason: 'proxy_paused' }); return refuse(op, 'proxy_paused', 503, 'the gift rail is resting — please send by hand to osoartist.eth'); }
  if (env.GIFT_LIMITER) {
    let ok = true; try { ok = (await env.GIFT_LIMITER.limit({ key: 'base:' + (request.headers.get('cf-connecting-ip') || 'x') })).success; } catch (e) { ok = true; }
    if (!ok) { log({ ok: false, reason: 'proxy_rate_limited' }); return refuse(op, 'proxy_rate_limited', 429, 'a little too fast — try again in a minute'); }
  }
  const text = await request.text();
  if (text.length > MAX_BODY) { log({ ok: false, reason: 'proxy_too_large' }); return refuse(op, 'proxy_too_large', 413); }
  let body; try { body = JSON.parse(text); } catch (e) { log({ ok: false, reason: 'proxy_bad_json' }); return refuse(op, 'proxy_bad_json', 400); }
  const pin = pinBase(body, Math.floor(Date.now() / 1000));
  if (pin.bad) { log({ ok: false, reason: pin.bad }); return refuse(op, pin.bad, 400); }
  try {
    let res = await callPayAI('/' + op, pin.up);
    if (op === 'settle') {                                       // PayAI: settlement_pending = unresolved, re-submit the identical body (idempotent)
      for (let i = 0; i < 3 && res.json && res.json.success !== true && /settlement_pending/.test(String(res.json.errorReason || '')); i++) { await sleep(2500); res = await callPayAI('/settle', pin.up); }
    }
    if (!res.json || typeof res.json !== 'object') { log({ ok: false, reason: 'proxy_upstream_bad_reply', status: res.status }); return refuse(op, 'proxy_upstream_bad_reply', 502); }
    const out = pick(res.json, op === 'verify' ? VERIFY_KEYS : SETTLE_KEYS);
    if (op === 'verify' && typeof out.isValid !== 'boolean') out.isValid = false;
    if (op === 'settle' && typeof out.success !== 'boolean') out.success = false;
    if (op === 'settle' && out.transaction && !HEX64.test(out.transaction)) out.transaction = '';   // only a 64-hex hash may reach a link (PAʻA SITE-2)
    log({ ok: op === 'verify' ? out.isValid : out.success, reason: out.invalidReason || out.errorReason || '', units: String(pin.units), upstream: res.status });
    return j(out, 200);
  } catch (e) {
    log({ ok: false, reason: 'proxy_upstream_unreachable', err: clip(e && e.name, 40) });
    return refuse(op, 'proxy_upstream_unreachable', 502, 'the facilitator did not answer — nothing left your wallet');
  }
}

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      env = env || {};
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

      if (url.pathname === '/health') {
        return j({ ok: true, lane: 'agent gift rail — Tempo + Base proxy', version: VERSION, tempoKey: !!env.TEMPO_API_KEY, base: { open: !env.BASE_PAUSED, payTo: PAYTO, asset: USDC, network: 'base' }, time: new Date().toISOString() });
      }
      if (url.pathname === '/base/verify') return await baseLane(request, env, 'verify', ctx);
      if (url.pathname === '/base/settle') return await baseLane(request, env, 'settle', ctx);

      // public passthrough of Tempo's supported kinds (deposit address lives there)
      if (url.pathname === '/tempo/supported' && request.method === 'GET') {
        const r = await fetch(TEMPO + '/supported');
        return new Response(r.body, { status: r.status, headers: { 'content-type': 'application/json', ...CORS } });
      }
      if ((url.pathname === '/tempo/verify' || url.pathname === '/tempo/settle') && request.method === 'POST') {
        if (!env.TEMPO_API_KEY) return j({ pending: true, note: 'the Tempo rail’s last key is being cut 🗝️ (TEMPO_API_KEY not set yet)' });
        const body = await request.text();
        // never forward absurdly large bodies
        if (body.length > 64 * 1024) return j({ isValid: false, invalidReason: 'payload_too_large' }, 413);
        const upstream = await fetch(TEMPO + url.pathname.slice(6), {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'tempo-api-key': env.TEMPO_API_KEY },
          body,
        });
        return new Response(upstream.body, { status: upstream.status, headers: { 'content-type': 'application/json', ...CORS } });
      }
      return j({ error: 'not found', lanes: ['/health', '/base/verify', '/base/settle', '/tempo/supported', '/tempo/verify', '/tempo/settle'] }, 404);
    } catch (e) {
      // Workers must never 1101: a JSON 502 with CORS, so a card can say something honest
      return j({ error: 'gift rail hiccup', detail: clip(e && e.message, 120) }, 502);
    }
  },
};
