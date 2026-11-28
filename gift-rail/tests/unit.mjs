// oso-gift-rail v1.1 unit tests — the Base lane's pins, the rebuilt upstream body, CORS, kill switch, pending retries.
// The facilitator is MOCKED here on purpose (unit level); the REAL cross-origin proof is tests/live-cors.mjs (un-mocked preflight).
import assert from 'node:assert/strict';
import worker, { pinBase } from '../worker.js';

const PAYTO = '0x25965899f4600b3AA5362ee4f34be95E5E62c934', USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const now = Math.floor(Date.now() / 1000);
function good(over = {}) {
  const auth = { from: '0x1111111111111111111111111111111111111111', to: PAYTO, value: '10000', validAfter: '0', validBefore: String(now + 300), nonce: '0x' + 'ab'.repeat(32) };
  return {
    x402Version: 1,
    paymentPayload: { x402Version: 1, scheme: 'exact', network: 'base', payload: { signature: '0x' + 'cd'.repeat(65), authorization: auth } },
    paymentRequirements: { scheme: 'exact', network: 'base', maxAmountRequired: '10000', resource: 'https://shakaleikaumaka.com/x402-bless.json', description: 'agent gift rail 🤖', mimeType: 'application/json', payTo: PAYTO, maxTimeoutSeconds: 300, asset: USDC, extra: { name: 'USD Coin', version: '2' } },
    ...over,
  };
}
const clone = (o) => JSON.parse(JSON.stringify(o));
let calls = [], queue = [];
globalThis.fetch = async (url, init) => { calls.push({ url: String(url), init }); const next = queue.shift(); if (next instanceof Error) throw next; return next || new Response(JSON.stringify({ isValid: true, payer: '0x1111111111111111111111111111111111111111' }), { status: 200 }); };
const post = (path, body, env = {}, headers = {}) => worker.fetch(new Request('https://gift-rail.opensourceorchestra.org' + path, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) }), env, {});
let n = 0; const t = async (name, fn) => { calls = []; queue = []; try { await fn(); n++; console.log('✓', name); } catch (e) { console.log('✗', name, '\n  ', e.message); process.exitCode = 1; } };

await t('OPTIONS preflight → 204 + CORS + Max-Age (what the browser needs and PayAI never gave)', async () => {
  const r = await worker.fetch(new Request('https://gift-rail.opensourceorchestra.org/base/verify', { method: 'OPTIONS', headers: { origin: 'https://shakaleikaumaka.com', 'access-control-request-method': 'POST', 'access-control-request-headers': 'content-type' } }), {}, {});
  assert.equal(r.status, 204); assert.equal(r.headers.get('access-control-allow-origin'), '*');
  assert.match(r.headers.get('access-control-allow-headers'), /content-type/i); assert.match(r.headers.get('access-control-allow-methods'), /POST/); assert.equal(r.headers.get('access-control-max-age'), '86400');
});
await t('valid verify → rebuilt upstream body, filtered reply, CORS', async () => {
  queue.push(new Response(JSON.stringify({ isValid: true, payer: '0xabc', secret: 'x', html: '<img src=x onerror=1>' }), { status: 200 }));
  const r = await post('/base/verify', good()); const j = await r.json();
  assert.equal(r.status, 200); assert.equal(j.isValid, true); assert.equal(j.secret, undefined); assert.equal(j.html, undefined); assert.equal(r.headers.get('access-control-allow-origin'), '*');
  assert.equal(calls.length, 1); assert.equal(calls[0].url, 'https://facilitator.payai.network/verify');
  const up = JSON.parse(calls[0].init.body); assert.equal(up.paymentRequirements.payTo, PAYTO); assert.equal(up.paymentRequirements.asset, USDC); assert.equal(up.paymentPayload.payload.authorization.to, PAYTO);
  assert.equal(calls[0].init.headers.authorization, undefined);
});
await t('unknown fields from the visitor never reach the facilitator', async () => {
  const b = good(); b.paymentRequirements.evil = 'x'; b.paymentPayload.payload.authorization.evil = 'y'; b.extra = { hostile: 1 };
  await post('/base/verify', b); const up = JSON.parse(calls[0].init.body);
  assert.equal(JSON.stringify(up).includes('evil'), false); assert.equal(JSON.stringify(up).includes('hostile'), false);
});
for (const [name, mut, reason] of [
  ['wrong payTo (money cannot be redirected)', (b) => { b.paymentRequirements.payTo = '0x2222222222222222222222222222222222222222'; }, 'proxy_pin_payTo'],
  ['authorization.to ≠ payTo', (b) => { b.paymentPayload.payload.authorization.to = '0x2222222222222222222222222222222222222222'; }, 'proxy_pin_to'],
  ['wrong asset', (b) => { b.paymentRequirements.asset = '0x2222222222222222222222222222222222222222'; }, 'proxy_pin_asset'],
  ['wrong network', (b) => { b.paymentRequirements.network = 'polygon'; }, 'proxy_pin_network'],
  ['wrong scheme', (b) => { b.paymentPayload.scheme = 'upto'; }, 'proxy_pin_scheme'],
  ['wrong version', (b) => { b.x402Version = 2; }, 'proxy_pin_version'],
  ['dust amount (< $0.001)', (b) => { b.paymentPayload.payload.authorization.value = '999'; b.paymentRequirements.maxAmountRequired = '999'; }, 'proxy_pin_amount'],
  ['absurd amount (> $1000)', (b) => { b.paymentPayload.payload.authorization.value = '1000000001'; b.paymentRequirements.maxAmountRequired = '1000000001'; }, 'proxy_pin_amount'],
  ['value ≠ maxAmountRequired', (b) => { b.paymentRequirements.maxAmountRequired = '20000'; }, 'proxy_pin_amount_match'],
  ['non-numeric value', (b) => { b.paymentPayload.payload.authorization.value = '1e4'; }, 'proxy_pin_value'],
  ['bad from', (b) => { b.paymentPayload.payload.authorization.from = '0x12'; }, 'proxy_pin_from'],
  ['bad nonce', (b) => { b.paymentPayload.payload.authorization.nonce = '0x12'; }, 'proxy_pin_nonce'],
  ['bad signature', (b) => { b.paymentPayload.payload.signature = 'nope'; }, 'proxy_pin_signature'],
  ['validBefore a week away', (b) => { b.paymentPayload.payload.authorization.validBefore = String(now + 7 * 86400); }, 'proxy_pin_validity'],
  ['missing authorization', (b) => { delete b.paymentPayload.payload.authorization; }, 'proxy_pin_shape'],
]) {
  await t('refuses: ' + name, async () => {
    const b = clone(good()); mut(b); const r = await post('/base/verify', b); const j = await r.json();
    assert.equal(r.status, 400); assert.equal(j.isValid, false); assert.equal(j.invalidReason, reason); assert.equal(calls.length, 0, 'facilitator must not be called');
    const s = await (await post('/base/settle', b)).json(); assert.equal(s.success, false); assert.equal(s.errorReason, reason); assert.equal(calls.length, 0);
  });
}
await t('smart-wallet length signatures (ERC-1271) are allowed', async () => { const b = good(); b.paymentPayload.payload.signature = '0x' + 'ef'.repeat(300); const r = await post('/base/verify', b); assert.equal(r.status, 200); assert.equal(calls.length, 1); });
await t('bad JSON → 400 in the verify shape', async () => { const r = await post('/base/verify', '{nope'); const j = await r.json(); assert.equal(r.status, 400); assert.equal(j.invalidReason, 'proxy_bad_json'); });
await t('oversize body → 413', async () => { const r = await post('/base/verify', JSON.stringify({ pad: 'x'.repeat(9000) })); assert.equal(r.status, 413); assert.equal((await r.json()).invalidReason, 'proxy_too_large'); });
await t('GET /base/verify → 405 JSON', async () => { const r = await worker.fetch(new Request('https://x/base/verify'), {}, {}); assert.equal(r.status, 405); await r.json(); });
await t('facilitator returns HTML → JSON 502 (clients never see a SyntaxError)', async () => { queue.push(new Response('<html>oops</html>', { status: 502 })); const r = await post('/base/verify', good()); const j = await r.json(); assert.equal(r.status, 502); assert.equal(j.invalidReason, 'proxy_upstream_bad_reply'); });
await t('facilitator unreachable → JSON 502, honest message', async () => { queue.push(new Error('boom')); const r = await post('/base/settle', good()); const j = await r.json(); assert.equal(r.status, 502); assert.equal(j.success, false); assert.equal(j.errorReason, 'proxy_upstream_unreachable'); assert.match(j.errorMessage, /nothing left your wallet/); });
await t('settle success: only a 64-hex transaction survives', async () => {
  queue.push(new Response(JSON.stringify({ success: true, transaction: '0x' + 'ab'.repeat(32), network: 'base', payer: '0x1' }), { status: 200 }));
  let j = await (await post('/base/settle', good())).json(); assert.equal(j.success, true); assert.equal(j.transaction, '0x' + 'ab'.repeat(32));
  queue.push(new Response(JSON.stringify({ success: true, transaction: '"><script>x</script>' }), { status: 200 }));
  j = await (await post('/base/settle', good())).json(); assert.equal(j.success, true); assert.equal(j.transaction, '');
});
await t('settle: settlement_pending is retried server-side (idempotent) until it lands', async () => {
  const p = () => new Response(JSON.stringify({ success: false, errorReason: 'settlement_pending' }), { status: 202 });
  queue.push(p(), p(), new Response(JSON.stringify({ success: true, transaction: '0x' + 'cd'.repeat(32) }), { status: 200 }));
  const t0 = Date.now(); const j = await (await post('/base/settle', good())).json();
  assert.equal(j.success, true); assert.equal(calls.length, 3); assert.ok(Date.now() - t0 >= 4800, 'slept between polls');
  assert.deepEqual(JSON.parse(calls[0].init.body), JSON.parse(calls[2].init.body), 'identical body on every poll');
});
await t('kill switch BASE_PAUSED → proxy_paused (503), facilitator untouched', async () => { const r = await post('/base/verify', good(), { BASE_PAUSED: '1' }); const j = await r.json(); assert.equal(r.status, 503); assert.equal(j.invalidReason, 'proxy_paused'); assert.equal(calls.length, 0); assert.equal(r.headers.get('access-control-allow-origin'), '*'); });
await t('rate limiter says no → 429 JSON with CORS', async () => { const r = await post('/base/verify', good(), { GIFT_LIMITER: { limit: async () => ({ success: false }) } }); assert.equal(r.status, 429); assert.equal((await r.json()).invalidReason, 'proxy_rate_limited'); assert.equal(calls.length, 0); });
await t('a broken limiter binding never blocks a gift (fails open)', async () => { const r = await post('/base/verify', good(), { GIFT_LIMITER: { limit: async () => { throw new Error('x'); } } }); assert.equal(r.status, 200); });
await t('/health is honest', async () => { const r = await worker.fetch(new Request('https://x/health'), {}, {}); const j = await r.json(); assert.equal(j.ok, true); assert.equal(j.version, '1.1'); assert.equal(j.base.open, true); assert.equal(j.base.payTo, PAYTO); });
await t('Tempo lane unchanged: no key → pending note', async () => { const r = await post('/tempo/verify', { any: 1 }); const j = await r.json(); assert.equal(j.pending, true); });
await t('unknown route → 404 JSON listing lanes', async () => { const r = await worker.fetch(new Request('https://x/nope'), {}, {}); assert.equal(r.status, 404); assert.ok((await r.json()).lanes.includes('/base/settle')); });
await t('pinBase exported helper agrees', async () => { assert.ok(pinBase(good(), now).up); assert.equal(pinBase({}, now).bad, 'proxy_pin_shape'); });
console.log(`\n${n} passed${process.exitCode ? ' — FAILURES ABOVE' : ' ✅'}`);
