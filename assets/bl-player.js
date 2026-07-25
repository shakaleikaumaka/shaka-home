/* 🦋 bl-player.js v2 — two tracks, everywhere. One line: <script src="https://shaka-home-cbhjr5ziii-ffieyo32.taur.link/assets/bl-player.js"></script>
   Track 1: Butterflies and Love (I Open Sourced My Whole Universe) · Track 2: A Planet We Share As One — both recorded with Ethereum Singapore.
   v1 (single-track) preserved at bl-player-v1.js for the Esmeralda P.I.T. */
(function(){
if (document.getElementById('miniplayer')) return;
const TRACKS = [
  { title: 'Butterflies and Love', sub: 'demo recorded with Ethereum Singapore for Aya Miyaguchi 🦋',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/i-open-sourced-my-whole-universe.mp3' },
  { title: 'A Planet We Share As One', sub: 'recorded with Ethereum Singapore 🌍',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/a-planet-we-share-as-one.mp3' }
];
const wrap = document.createElement('div');
wrap.innerHTML = `
<div id="miniplayer" style="position:fixed;bottom:20px;right:20px;z-index:99999;display:flex;align-items:center;gap:12px;background:linear-gradient(150deg,rgba(240,180,41,.16),rgba(23,17,38,.92));border:1px solid #f0b429;border-radius:999px;padding:10px 20px 10px 12px;backdrop-filter:blur(8px);box-shadow:0 8px 40px rgba(240,180,41,.25);font-family:'Avenir Next','Segoe UI',system-ui,sans-serif">
  <button id="songbtn" style="width:44px;height:44px;border-radius:50%;border:none;background:#f0b429;color:#241a02;font-size:1.15rem;cursor:pointer;animation:blpulse 2s infinite">▶</button>
  <div style="line-height:1.3">
    <div id="songstatus" style="font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:#ffd97a">tap to play — ${TRACKS[0].title}</div>
    <div id="songsub" style="font-size:.82rem;color:#b9a8cf">${TRACKS[0].sub}</div>
  </div>
  <button id="trackbtn" title="switch track" style="width:30px;height:30px;border-radius:50%;border:1px solid #f0b429;background:transparent;color:#ffd97a;font-size:.72rem;cursor:pointer;letter-spacing:.05em">1·2</button>
</div>
<audio id="thesong" preload="auto"></audio>
<style>@keyframes blpulse{0%,100%{box-shadow:0 0 0 0 rgba(240,180,41,.5)}50%{box-shadow:0 0 0 12px rgba(240,180,41,0)}}@keyframes bleq{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}.blbars{display:inline-flex;gap:2.5px;align-items:flex-end;height:14px;margin-right:2px}.blbars i{width:3px;background:#f0b429;border-radius:2px;animation:bleq .9s ease-in-out infinite}.blbars i:nth-child(2){animation-delay:.2s}.blbars i:nth-child(3){animation-delay:.4s}</style>`;
document.body.appendChild(wrap);
const song = document.getElementById('thesong');
const btn = document.getElementById('songbtn');
const status = document.getElementById('songstatus');
const sub = document.getElementById('songsub');
const trackBtn = document.getElementById('trackbtn');
const KEY = 'bl_song';
let playing = false;
let ti = 0; // track index
const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('bl_song') : null;
function fmt(t){ const m = Math.floor(t/60), s = Math.floor(t%60); return m + ':' + String(s).padStart(2,'0'); }
function saveState(){ try { localStorage.setItem(KEY, JSON.stringify({ track: ti, t: song.currentTime || 0, playing: playing, at: Date.now() })); } catch(e){} }
function loadState(){ try { const d = JSON.parse(localStorage.getItem(KEY) || 'null'); return d && typeof d.t === 'number' ? d : null; } catch(e){ return null; } }
function setTrack(i, keepTime){
  ti = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
  song.src = TRACKS[ti].src;
  sub.textContent = TRACKS[ti].sub;
  trackBtn.textContent = (ti + 1) + '·' + TRACKS.length;
  trackBtn.title = 'switch track — next: ' + TRACKS[(ti + 1) % TRACKS.length].title;
  if (!keepTime) { try { song.currentTime = 0; } catch(e){} }
}
function label(){
  const st = loadState();
  return (st && st.t > 1 && st.track === ti) ? 'resume at ' + fmt(st.t) + ' — ' + TRACKS[ti].title : 'tap to play — ' + TRACKS[ti].title;
}
function setPlaying(on, broadcast){
  playing = on;
  btn.textContent = on ? '❚❚' : '▶';
  btn.style.animation = on ? 'none' : 'blpulse 2s infinite';
  status.innerHTML = on ? '<span class="blbars"><i></i><i></i><i></i></span> now playing — ' + TRACKS[ti].title : label();
  saveState();
  if (broadcast && bc) bc.postMessage({ type:'state', playing:on, t:song.currentTime, track:ti });
}
function toggleSong(){
  if(playing){ song.pause(); setPlaying(false, true); }
  else { song.play().then(()=>setPlaying(true, true)).catch(()=>{}); }
}
btn.addEventListener('click', toggleSong);
trackBtn.addEventListener('click', ()=>{
  const wasPlaying = playing;
  setTrack(ti + 1);
  if (wasPlaying) { song.play().then(()=>setPlaying(true, true)).catch(()=>{}); }
  else setPlaying(false, true);
});
song.addEventListener('ended', ()=>{
  // auto-advance to the next track
  setTrack(ti + 1);
  song.play().then(()=>setPlaying(true, true)).catch(()=>setPlaying(false, true));
});
setInterval(()=>{ if(playing) saveState(); }, 2000);
if (bc) bc.onmessage = (ev) => {
  const d = ev.data || {};
  if (d.type === 'state' && !playing && typeof d.t === 'number') {
    if (typeof d.track === 'number' && d.track !== ti) setTrack(d.track, true);
    try { song.currentTime = d.t; } catch(e){}
    saveState(); setPlaying(false, false);
  }
};
window.addEventListener('load', ()=>{
  const q = new URLSearchParams(location.search);
  const urlT = parseFloat(q.get('bl_t'));
  const urlTrk = parseInt(q.get('bl_trk'), 10);
  const st = loadState();
  const startTrack = (!isNaN(urlTrk) && urlTrk >= 0 && urlTrk < TRACKS.length) ? urlTrk : (st && typeof st.track === 'number' ? st.track : 0);
  setTrack(startTrack, true);
  const startT = (!isNaN(urlT) && urlT > 1) ? urlT : (st && st.t > 1 && st.track === ti ? st.t : 0);
  if (startT > 1) { try { song.currentTime = startT; } catch(e){} }
  setPlaying(false, false);
  song.play().then(()=>setPlaying(true, true)).catch(()=>{});
});
window.addEventListener('beforeunload', saveState);
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#')) return;
  a.addEventListener('click', e => {
    saveState();
    let url = a.href;
    try {
      const u = new URL(url, location.href);
      if ((u.hostname.endsWith('taur.link') || u.hostname.endsWith('shakaleikaumaka.com')) && song.currentTime > 1) {
        u.searchParams.set('bl_t', song.currentTime.toFixed(1));
        u.searchParams.set('bl_trk', String(ti));
        url = u.toString();
      }
    } catch(err){}
    const w = window.open(url, '_blank', 'noopener');
    if (!w) location.href = url;
    e.preventDefault();
  });
});
})();
