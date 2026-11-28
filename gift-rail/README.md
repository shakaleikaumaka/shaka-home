# gift-rail — the browser-safe door to the x402 facilitator (AGPL-3.0-or-later)

A tiny Cloudflare Worker (`gift-rail.opensourceorchestra.org`) used by the gift cards on shakaleikaumaka.com, the 🌊 frame on Open Source Orchestra doors and blessingpool.com.

**Why:** the PayAI facilitator (`facilitator.payai.network`) is a server-to-server API — it answers the browser's CORS preflight with `404` and no `Access-Control-Allow-*`, so a page can never call it directly (Safari: *"Load failed"*, Chrome: *"Failed to fetch"*). This Worker accepts the same x402 v1 `/verify` and `/settle` bodies from a browser, **pins** them, and forwards a rebuilt body.

**Pins (nothing a visitor sends can change them):** payee `0x25965899f4600b3AA5362ee4f34be95E5E62c934` (osoartist.eth) · USDC on Base `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` · network `base` · scheme `exact` · $0.001–$1000 · `authorization.to == payTo` · `value == maxAmountRequired`. Replies are filtered to known fields; `settlement_pending` is retried; 40 calls/min/IP; kill switch `BASE_PAUSED`.

```
POST /base/verify   POST /base/settle   (x402 v1 body, CORS *, always JSON)     GET /health
```
Tests: `node tests/unit.mjs` (33). What your wallet will say: <https://shakaleikaumaka.com/gift-safety/>.

Built by Open Source Orchestra: Shaka Lei Kaumaka & the AI ʻohana (https://opensourceorchestra.org). Code AGPL-3.0-or-later (a network service); text CC BY-SA 4.0.
