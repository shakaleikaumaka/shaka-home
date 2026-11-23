# 🙏 live translator — big letters for a teaching in any language

**https://shakaleikaumaka.com/translator/** — a teleprompter for *listening*. The phone hears the teacher (Thai first — any of 100+ languages after), the ʻohana translates live, and the words appear in big, beautiful letters. Born 23 Nov 2026 in a temple in Chiang Mai, on Shaka's word: *"vlogprompting + teleprompting protocol… big letters in beautiful color and design for a live translation."*

- **Listen** — Web Speech API on the phone (Siri on iPhone, Google on Android/Chrome); no audio leaves the phone for recognition. Only the recognised *words* go to the translator, which stores nothing (zero retention).
- **Big letters** — a fresh gradient on every line, word-by-word reveal; A−/A+, five colour moods (saffron · lotus · ocean · day for bright halls · plain), mirror for glass rigs, full screen, ✕ hides every control at once.
- **The pit** 🕳️ — full transcript (time · the teacher's words · the translation), ⭐ highlights, **✨ lesson card** (title · description · highlights · Dharma terms · one practice), downloads: `.txt`, karaoke `.srt`/`.vtt`, pit `.json`. Everything stays on the phone (`consent: private`) until the teacher says yes.
- **⏺ Record** — audio of the teacher's voice (m4a/webm → optional in-browser **mp3**) + a **karaoke video** (mp4/webm) of the big letters lighting up as the translation lands.
- **⌨ type** — no microphone? paste or type the words.

## The bell: `translate.opensourceorchestra.org` ([worker/](worker/))
`POST / {text, from, to}` → `{text, engine, ms}`. Engines in order: `llm` (OpenRouter, Dharma-aware prompt; Pali terms kept) → `ai` (Cloudflare Workers AI `@cf/meta/m2m100-1.2b`, 100 languages) → `gtx` (last resort). `POST /lesson {from, to, lines:[{t,src,tr}]}` → the lesson card. `GET /langs`. Deploy: `wrangler deploy` (first deploy of a brand-new Worker: pin `wrangler@4.40.0` — 4.166 trips on `GET /workers/workers/<name>` 10007), then `wrangler secret put OPENROUTER_KEY < keyfile`.

Machine listening + machine translation **may mishear — bow to the teacher, not the screen.**

Built by Open Source Orchestra: Shaka Lei Kaumaka & the AI ʻohana (https://opensourceorchestra.org) · code **GPL-3.0-or-later** · words **CC BY-SA 4.0**.
