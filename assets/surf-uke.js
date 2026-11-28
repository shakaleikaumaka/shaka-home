/* SPDX-License-Identifier: GPL-3.0-or-later
   Built by Open Source Orchestra: Shaka Lei Kaumaka & the AI ʻohana (https://opensourceorchestra.org)
   surf-uke.js — the surf agent's three small behaviours (the scene itself is pure HTML + CSS, no script needed):
   1 · sleeps when scrolled off-screen · 2 · tap/click = one ukulele chord, synthesised in your browser (nothing downloaded, only on your tap)
   3 · the gift button: the Universe Fountain when it exists (OSOFountain.open), otherwise the link to the Funding Pool. */
(function () {
  'use strict';
  var fig = document.getElementById('surf-agent');
  if (!fig || fig.getAttribute('data-sfa')) return;
  fig.setAttribute('data-sfa', '1');

  /* 1 · sleep when off-screen */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { fig.classList.toggle('sfa-off', !e.isIntersecting); });
    }, { rootMargin: '120px' }).observe(fig);
  }

  /* 2 · tap the surf → a chord */
  var tap = fig.querySelector('.sfa-tap');
  var hint = fig.querySelector('[data-sfa-hint]');
  var NAMES = ['C', 'Am', 'F', 'G7'];
  var CHORDS = [[392.00, 261.63, 329.63, 523.25],   /* C   0003 (re-entrant G C E C) */
                [440.00, 261.63, 329.63, 440.00],   /* Am  2000 */
                [440.00, 261.63, 349.23, 440.00],   /* F   2010 */
                [392.00, 293.66, 349.23, 493.88]];  /* G7  0212 */
  var ac = null, master = null, bank = {}, step = 0, hitT = 0;

  function pluck(freq) {                               /* Karplus–Strong: a plucked nylon string */
    var key = freq.toFixed(2);
    if (bank[key]) return bank[key];
    var sr = ac.sampleRate, n = Math.floor(sr * 1.9), L = Math.max(2, Math.round(sr / freq));
    var buf = ac.createBuffer(1, n, sr), out = buf.getChannelData(0), ring = new Float32Array(L), prev = 0, i, p = 0, peak = 0;
    for (i = 0; i < L; i++) { prev = prev * 0.55 + (Math.random() * 2 - 1) * 0.45; ring[i] = prev; }
    for (i = 0; i < n; i++) {
      var q = (p + 1) % L, v = 0.4975 * (ring[p] + ring[q]);
      ring[p] = v; out[i] = v; p = q;
      var a = v < 0 ? -v : v; if (a > peak) peak = a;
    }
    if (peak > 0) for (i = 0; i < n; i++) out[i] /= peak;
    return (bank[key] = buf);
  }

  function strum() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ac) {
      ac = new AC();
      var comp = ac.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 4;
      var body = ac.createBiquadFilter(); body.type = 'peaking'; body.frequency.value = 320; body.gain.value = 4; body.Q.value = 1.1;
      var lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 5200;
      master = ac.createGain(); master.gain.value = 0.5;
      master.connect(body); body.connect(lp); lp.connect(comp); comp.connect(ac.destination);
    }
    if (ac.state === 'suspended' && ac.resume) ac.resume();
    var t = ac.currentTime + 0.03, idx = step++ % CHORDS.length, chord = CHORDS[idx];
    chord.forEach(function (f, i) {
      var src = ac.createBufferSource(), g = ac.createGain(), t0 = t + i * 0.026 + Math.random() * 0.004;
      src.buffer = pluck(f);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.3 - i * 0.02, t0 + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0008, t0 + 1.8);
      src.connect(g); g.connect(master); src.start(t0); src.stop(t0 + 1.9);
    });
    if (hint) hint.textContent = '🎶 ' + NAMES[idx] + ' · tap again for the next chord';
  }

  function hit() {
    fig.classList.remove('sfa-hit'); void fig.offsetWidth; fig.classList.add('sfa-hit');
    clearTimeout(hitT); hitT = setTimeout(function () { fig.classList.remove('sfa-hit'); }, 1400);
  }

  if (tap) tap.addEventListener('click', function () { hit(); try { strum(); } catch (e) { /* silent: the animation still plays */ } });
  window.addEventListener('x402:gift', function () { hit(); });   /* a gift landed on the rail → the surfer cheers */

  /* 3 · the gift button → ONE gift screen (contract: /shared/fountain/LAUNCHER.md)
     (1) window.OSOFountain already loaded → open it · (2) else lazy-load frames.opensourceorchestra.org/lib/fountain.js — only on a tap, 4 s at most
     (a 404 fails fast) · (3) else the link simply goes on to the Funding Pool, Lane A "a gift to Shaka" (card · Stripe · PayPal · Venmo · the any-chain tip jar).
     The listener sits on window-capture so it runs before bl-shell's document-capture handler (which would open the link in its "road" overlay). */
  var ofnDead = false;
  function ofnLoad() {
    return new Promise(function (res, rej) {
      if (window.OSOFountain) return res(window.OSOFountain);
      var s = document.createElement('script'), t = setTimeout(function () { rej(new Error('timeout')); }, 4000);
      s.src = 'https://frames.opensourceorchestra.org/lib/fountain.js'; s.async = true;
      s.onload = function () { clearTimeout(t); window.OSOFountain ? res(window.OSOFountain) : rej(new Error('missing')); };
      s.onerror = function () { clearTimeout(t); rej(new Error('load')); };
      document.head.appendChild(s);
    });
  }
  /* the way back from a wallet app: the Fountain's "open in MetaMask / Coinbase / Phantom" reopens THIS page as ?osogift=surf:<usd>:c<chainId>:go
     inside the wallet's browser → hand it straight back (the Fountain reads + cleans the URL itself; a failed load does nothing). LAUNCHER.md §RETURN */
  if (/[?&]osogift=surf:/.test(location.search)) ofnLoad().then(function (F) { F.open({ surface: 'surf', pending: true }); }).catch(function () {});

  window.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('[data-ohana-gift]') : null;
    if (!a || !fig.contains(a) || a.__sfaGo || (ofnDead && !window.OSOFountain)) return;   // known-absent Fountain → the link behaves normally, no delay
    e.preventDefault(); e.stopPropagation();
    a.classList.add('sfa-busy');
    ofnLoad().then(function (F) { a.classList.remove('sfa-busy'); F.open({ surface: 'surf', from: a }); })
      .catch(function () { ofnDead = true; a.classList.remove('sfa-busy'); a.__sfaGo = 1; a.click(); a.__sfaGo = 0; });
  }, true);
})();
