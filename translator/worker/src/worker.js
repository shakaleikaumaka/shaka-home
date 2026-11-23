// oso-translator — the live translation bell behind shakaleikaumaka.com/translator
// GPL-3.0-or-later · Built by Open Source Orchestra: Shaka Lei Kaumaka & the AI ʻohana (https://opensourceorchestra.org)
//
// POST /            {text, from, to, engine?}  → {text, engine, ms}
// GET  /?q=&from=&to=                           (same, for testing)
// GET  /langs                                   → the language list
// Engines, in order unless ?engine= pins one:
//   llm  = OpenRouter chat model (Dharma-aware; best for Thai teaching talks)
//   ai   = Cloudflare Workers AI @cf/meta/m2m100-1.2b (100 languages, zero data retention)
//   gtx  = Google's public translate endpoint (last resort)
// No logs of the words. Nothing is stored. Machine translation may mishear — bow to the teacher, not the screen.

const MAX_CHARS = 1200;
const LLM_MODEL = 'deepseek/deepseek-v4.1-flash';
const LLM_TIMEOUT_MS = 7000;
const AI_TIMEOUT_MS = 6000;

// m2m100 language codes (ISO-639-1/2) → English name
export const LANGS = {
  af:'Afrikaans', am:'Amharic', ar:'Arabic', ast:'Asturian', az:'Azerbaijani', ba:'Bashkir', be:'Belarusian', bg:'Bulgarian', bn:'Bengali', br:'Breton', bs:'Bosnian',
  ca:'Catalan', ceb:'Cebuano', cs:'Czech', cy:'Welsh', da:'Danish', de:'German', el:'Greek', en:'English', es:'Spanish', et:'Estonian', fa:'Persian', ff:'Fulah', fi:'Finnish', fr:'French', fy:'Western Frisian',
  ga:'Irish', gd:'Scottish Gaelic', gl:'Galician', gu:'Gujarati', ha:'Hausa', he:'Hebrew', hi:'Hindi', hr:'Croatian', ht:'Haitian Creole', hu:'Hungarian', hy:'Armenian',
  id:'Indonesian', ig:'Igbo', ilo:'Ilocano', is:'Icelandic', it:'Italian', ja:'Japanese', jv:'Javanese', ka:'Georgian', kk:'Kazakh', km:'Khmer', kn:'Kannada', ko:'Korean',
  lb:'Luxembourgish', lg:'Ganda', ln:'Lingala', lo:'Lao', lt:'Lithuanian', lv:'Latvian', mg:'Malagasy', mk:'Macedonian', ml:'Malayalam', mn:'Mongolian', mr:'Marathi', ms:'Malay', my:'Burmese',
  ne:'Nepali', nl:'Dutch', no:'Norwegian', ns:'Northern Sotho', oc:'Occitan', or:'Odia', pa:'Punjabi', pl:'Polish', ps:'Pashto', pt:'Portuguese', ro:'Romanian', ru:'Russian',
  sd:'Sindhi', si:'Sinhala', sk:'Slovak', sl:'Slovenian', so:'Somali', sq:'Albanian', sr:'Serbian', ss:'Swati', su:'Sundanese', sv:'Swedish', sw:'Swahili',
  ta:'Tamil', th:'Thai', tl:'Tagalog', tn:'Tswana', tr:'Turkish', uk:'Ukrainian', ur:'Urdu', uz:'Uzbek', vi:'Vietnamese', wo:'Wolof', xh:'Xhosa', yi:'Yiddish', yo:'Yoruba', zh:'Chinese', zu:'Zulu',
  haw:'Hawaiian (ʻŌlelo Hawaiʻi)' // not in m2m100 → llm/gtx only
};

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
  'access-control-max-age': '86400',
};

function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS, ...extra } });
}

function withTimeout(ms) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort('timeout'), ms);
  return { signal: c.signal, done: () => clearTimeout(t) };
}

async function viaLLM(text, from, to, env) {
  if (!env.OPENROUTER_KEY) throw new Error('llm: no key');
  const fromName = LANGS[from] || from, toName = LANGS[to] || to;
  const sys = `You are a live interpreter for a spoken teaching (often a Buddhist Dharma talk by a Thai monk, but it may be any talk). Translate the speaker's words from ${fromName} to ${toName}.
Rules: output ONLY the translation, no quotes, no notes, no preface. Keep the speaker's meaning, warmth and rhythm; short sentences are fine. Keep Pali/Sanskrit Dharma terms (dukkha, metta, sati, nibbana, anicca, anatta, sila, samadhi, panna, Dhamma, Sangha) as they are, adding a 1–2 word gloss in parentheses the first time only if helpful. The input is a speech-recognition fragment: it may be cut mid-sentence or mishear a word — translate what is most likely meant, never invent extra content. If the input is empty or noise, output an empty string.`;
  const t = withTimeout(LLM_TIMEOUT_MS);
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST', signal: t.signal,
      headers: { 'authorization': `Bearer ${env.OPENROUTER_KEY}`, 'content-type': 'application/json', 'http-referer': 'https://shakaleikaumaka.com/translator/', 'x-title': 'Open Source Orchestra live translator' },
      body: JSON.stringify({ model: LLM_MODEL, temperature: 0.2, max_tokens: 600, messages: [{ role: 'system', content: sys }, { role: 'user', content: text }] })
    });
    if (!r.ok) throw new Error('llm http ' + r.status);
    const j = await r.json();
    const out = (j.choices?.[0]?.message?.content || '').trim();
    if (!out) throw new Error('llm empty');
    return out;
  } finally { t.done(); }
}

async function viaAI(text, from, to, env) {
  if (!env.AI) throw new Error('ai: no binding');
  if (!(from in LANGS) || !(to in LANGS) || from === 'haw' || to === 'haw') throw new Error('ai: unsupported lang');
  const run = env.AI.run('@cf/meta/m2m100-1.2b', { text, source_lang: from, target_lang: to });
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('ai timeout')), AI_TIMEOUT_MS));
  const j = await Promise.race([run, timeout]);
  const out = (j?.translated_text || '').trim();
  if (!out) throw new Error('ai empty');
  return out;
}

async function viaGTX(text, from, to) {
  const t = withTimeout(5000);
  try {
    const u = new URL('https://translate.googleapis.com/translate_a/single');
    u.searchParams.set('client', 'gtx'); u.searchParams.set('sl', from === 'zh' ? 'zh-CN' : from); u.searchParams.set('tl', to === 'zh' ? 'zh-CN' : to);
    u.searchParams.set('dt', 't'); u.searchParams.set('q', text);
    const r = await fetch(u, { signal: t.signal, headers: { 'user-agent': 'Mozilla/5.0 (oso-translator)' } });
    if (!r.ok) throw new Error('gtx http ' + r.status);
    const j = await r.json();
    const out = (j?.[0] || []).map(x => x?.[0] || '').join('').trim();
    if (!out) throw new Error('gtx empty');
    return out;
  } finally { t.done(); }
}


async function lessonCard(transcript, from, to, env) {
  if (!env.OPENROUTER_KEY) throw new Error('llm: no key');
  const fromName = LANGS[from] || from, toName = LANGS[to] || to;
  const sys = `You receive the transcript of a spoken teaching (often a Buddhist Dharma talk, original language ${fromName}, with machine translation to ${toName}). Write a lesson card as strict JSON with keys:
"title" (≤ 8 words, in ${toName}), "title_src" (same title in ${fromName}),
"description" (2–4 sentences in ${toName}, warm, faithful, no invention),
"highlights" (array of 3–7 objects {"src": "...", "tr": "..."} — the most luminous lines, src = the speaker's own words in ${fromName} as transcribed, tr = that line in ${toName}),
"terms" (array of up to 6 {"term": "...", "gloss": "..."} Pali/Dharma terms that appeared, gloss in ${toName}),
"practice" (one sentence in ${toName}: what a listener could practice this week, drawn only from the talk).
Output JSON only.`;
  const t = withTimeout(25000);
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST', signal: t.signal,
      headers: { 'authorization': `Bearer ${env.OPENROUTER_KEY}`, 'content-type': 'application/json', 'http-referer': 'https://shakaleikaumaka.com/translator/', 'x-title': 'Open Source Orchestra live translator' },
      body: JSON.stringify({ model: LLM_MODEL, temperature: 0.3, max_tokens: 1800, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: sys }, { role: 'user', content: transcript }] })
    });
    if (!r.ok) throw new Error('llm http ' + r.status);
    const j = await r.json();
    let raw = (j.choices?.[0]?.message?.content || '').trim().replace(/^```json\s*|```$/g, '');
    return JSON.parse(raw);
  } finally { t.done(); }
}

const ENGINES = { llm: viaLLM, ai: viaAI, gtx: viaGTX };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    if (url.pathname === '/langs') return json({ langs: LANGS, engines: Object.keys(ENGINES) }, 200, { 'cache-control': 'public, max-age=3600' });
    if (url.pathname === '/health') return json({ ok: true, ai: !!env.AI, llm: !!env.OPENROUTER_KEY });
    if (url.pathname === '/lesson' && request.method === 'POST') {
      let b = {}; try { b = await request.json(); } catch { return json({ error: 'bad json' }, 400); }
      const lines = Array.isArray(b.lines) ? b.lines : [];
      const from = String(b.from || 'th').toLowerCase().split('-')[0], to = String(b.to || 'en').toLowerCase().split('-')[0];
      const transcript = lines.slice(-400).map((l, i) => `${i + 1}. [${l.t || ''}] ${String(l.src || '').slice(0, 500)}\n   → ${String(l.tr || '').slice(0, 500)}`).join('\n');
      if (transcript.length < 20) return json({ error: 'transcript too short' }, 400);
      if (transcript.length > 60000) return json({ error: 'transcript too long' }, 413);
      const t0 = Date.now();
      try { const card = await lessonCard(transcript, from, to, env); return json({ card, engine: 'llm', ms: Date.now() - t0 }); }
      catch (e) { return json({ error: 'lesson failed', detail: String(e?.message || e) }, 502); }
    }
    if (url.pathname !== '/') return json({ error: 'not found' }, 404);

    let text = '', from = 'th', to = 'en', engine = '';
    if (request.method === 'POST') {
      let b = {};
      try { b = await request.json(); } catch { return json({ error: 'bad json' }, 400); }
      text = String(b.text || ''); from = String(b.from || from); to = String(b.to || to); engine = String(b.engine || '');
    } else {
      text = url.searchParams.get('q') || ''; from = url.searchParams.get('from') || from; to = url.searchParams.get('to') || to; engine = url.searchParams.get('engine') || '';
    }
    text = text.replace(/\s+/g, ' ').trim();
    from = from.toLowerCase().split('-')[0]; to = to.toLowerCase().split('-')[0];
    if (!text) return json({ text: '', engine: 'none', ms: 0 });
    if (text.length > MAX_CHARS) return json({ error: `text too long (max ${MAX_CHARS})` }, 413);
    if (!/^[a-z]{2,3}$/.test(from) || !/^[a-z]{2,3}$/.test(to)) return json({ error: 'bad language code' }, 400);
    if (from === to) return json({ text, engine: 'same', ms: 0 });

    const order = engine && ENGINES[engine] ? [engine] : ['llm', 'ai', 'gtx'];
    const t0 = Date.now(); const errors = [];
    for (const name of order) {
      try {
        const out = await ENGINES[name](text, from, to, env);
        return json({ text: out, engine: name, ms: Date.now() - t0 });
      } catch (e) { errors.push(`${name}: ${e?.message || e}`); }
    }
    return json({ error: 'all engines failed', detail: errors, ms: Date.now() - t0 }, 502);
  }
};
