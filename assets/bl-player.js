/* 📻 bl-player.js v6.0 — OSO FLOW RADIO (THE HYBRID, Shaka canon 2026-08-13): ONE radio jukebox for every door.
   "lets focus on having only one radio jukebox.. call it OSO Flow Radio and include the hybrid best features of both..
    with aloha love and color this can keep growing like a garden.. no harm done :)))"
   Hybrid of THE CONTINUUM (v5.x jukebox: lyrics bubble, download panel, follow-you) + OSO FLOW v1 (per-song emoji,
   moving words, ✕ close + 🎵 note). Artist names are links home. Download page: shakaleikaumaka.com/radio/
   v6.0: distinct emoji per song · marquee now-playing · ✕/🎵 close-reopen · artist links in bar · share in download panel.
   ——— v5.0 — THE CONTINUUM (Tess's dream, Shaka canon 2026-08-13): the song crosses doors with you.
   Carry bl_t/bl_trk across the whole family; first-gesture resume (tap anywhere, the song continues).
   FOCUS DOORS (theshellpit / spectoragent / spectorgadget / esmeraldapit) stay silent by design.
   v4.5 — one window, two tracks, sing-along everywhere. One line: <script src="https://shaka-home-cbhjr5ziii-ffieyo32.taur.link/assets/bl-player.js"></script>
   Track 1: Butterflies and Love · Track 2: A Planet We Share As One — both recorded with Ethereum Singapore.
   v4.5: perfectionist canon (Shaka, Jul 27 2026) — text column capped with ellipsis so the bar never touches the manifesto paper; sub line drops ≤1100px.
   v4.4/v4.3: desktop haircuts. v4.2: mobile compact + stack canon.
   v4.1: iframe guard (shaka-shell parent owns the music). v4: pop-out jukebox REMOVED; third button is SING-ALONG lyrics.
   v3: same-tab navigation. v1 (single-track) preserved at bl-player-v1.js. */
(function(){
if (document.getElementById('miniplayer')) return;
if (window !== window.top) return; // v4.1: inside the shaka-shell overlay, the PARENT owns the music — no player here
// v5.0 continuum: family suffixes (carry the song) + focus doors (never auto-resume)
const BL_FAMILY = ['taur.link','shakaleikaumaka.com','shakafans.com','blessingpool.com','opensourceorchestra.org','opensourceorchestra.com','karaokeprotocol.com','teleprompit.com','vlogprompting.com','publicinform.com','publicinform.org','creationology369.com','ology369.com','hamagents.com','affordagents.com','terribleagents.com','zodiacagents.org','zodiacpit.com','agentohana.org','myagentohana.com','myagentfamily.com','agentpartys.com','myagentsparty.com','agentsraving.com','agentscraving.com','agentsreading.com','pitgoa.com','pitfans.com','pitprovides.com','pitprovides.org','pitlip.com','osopit.com','osopit.org','tauruspit.com','tauruspod.com','eefpit.com','eefpod.com','infinitepit.com','ohanapit.com','devconpit.com','zuzaluagents.com','zuzaluagents.org','islpoap.xyz','learnfromagents.com','piscesinstitute.com','piscisinstitute.com','tauroinstitute.com','jordanham.com','kaleikaumaka.org','ethereumbard.com','shakapit.com','shakaverse.com','blessingpool.com','theinfinitegard.org','grantmagnet.org','dashboardpad.app'];
const BL_FOCUS = ['theshellpit.com','spectoragent.com','spectorgadget.com','esmeraldapit.com','edgecitypit.org','edgepit.org','privatepit.com','privateinform.com','privateinform.org'];
const BL_HOST = location.hostname.replace(/^www\./,'');
const blInFamily = h => BL_FAMILY.some(d => h === d || h.endsWith('.'+d));
const blIsFocus  = h => BL_FOCUS.some(d => h === d || h.endsWith('.'+d));
const TRACKS = [
  { title: 'Butterflies and Love', sub: 'demo recorded with Ethereum Singapore for Aya Miyaguchi 🦋',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/i-open-sourced-my-whole-universe.mp3',
    chords: 'G–Em–C–D', icon: '🦋',
    lyrics: `<p><strong>Hey Solana</strong><br>We can be your (blockchain)<br>(soy boy) big brother<br>We don't need to fight a war<br>for users and developers<br>We build apps that bridge us all together<br>Competition can be over<br>Because Ethereum<br>Is a positive Sum<br>Built by and for everyone</p>
<p><strong>Hey Bitcoin</strong><br>Lucky you were never called a shitcoin (altcoin)<br>you were the first to inspire<br>Our Ethereum co-creator<br>His magazine wasn't<br>just an ordinary page turner<br>Even though we don't<br>Know your founder<br>Vitalik found inspiration<br>From your magical ledger</p>
<p><strong>We should only wage war<br>with butterflies and love<br>The infinite garden isn't just a place for fun<br>Decentralized<br>Permission-less<br>and open-sourced<br>Even with the layer one as our shield,<br>and the layer two as our sword<br>All we need to wage in a war<br>Is butterflies and love</strong><br>Because Ethereum is a positive sum<br>Built by and for everyone</p>
<p><strong>Hey Ethereum</strong><br>I still love you most of all<br>You are the world computer<br>Built by all my brothers and sisters<br>Together we don't have to fight a war<br>All we need is butterflies and love<br>To pollinate the infinite-garden<br>Which grows strong and tall<br>And make us all look small<br>In the infinite garden</p>
<p><strong>Hey Aya 🌸</strong><br>Don't let the arrows pointed at ya<br>Ever pierce your lovely heart<br>From the start<br>you were the heart beat<br>Of the ethereum foundation<br>You taught us the power of subtraction<br>and your very first reaction<br>Was that you didn't want a title<br>That's why we have such fertile soil<br>For us all to grow equal<br>In the infinite garden</p>` },
  { title: 'A Planet We Share As One', sub: 'recorded with Ethereum Singapore 🌍',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/a-planet-we-share-as-one.mp3',
    chords: 'C–G–D–D', icon: '🌍',
    lyrics: `<p><strong>You know I had a frustration</strong><br>That I come from the nation<br>That dropped an atomic bomb<br><strong>On a planet we share as one</strong></p>
<p><strong>And I have a frustration</strong><br>They also tested those fucking bombs<br>In our ocean<br>And now you see with all the plastic<br>It's choking our reefs, you see<br><strong>Protection of creation<br>Must be a collaboration<br>Of every nation<br>For a planet we share as one</strong></p>
<p><strong>You know I had a frustration</strong><br>That two bordering nations<br>Have to fight for the greed<br>Of one fucking man's manipulations<br>Why does war have to be a typical situation<br>Can't we see a better resolution<br><strong>For a planet we share as one</strong></p>
<p><strong>It doesn't matter if you count up<br>To Web 1, 2 or 3</strong><br>We all can evolve<br>Like we evolve our technology<br>And now we see — like an experiment<br>With a Zuzalu pop-up city<br>We can build and dogfood<br>Our own technology<br>So we can see<br><strong>How we can be free</strong></p>
<p><strong>We can build it up like a layer one</strong><br>The world computer called Ethereum<br><strong>For a planet we share as one 🌍</strong></p>` },
  { title: 'Ginger Game', sub: 'Matteo Tambussi 🎻🇮🇹 — Open Source Orchestra co-founder',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--ginger-game.mp3',
    chords: 'lyrics on the way', icon: '🫚',
    lyrics: `<p><strong>Ginger Game — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Matteo is the great Italian brother who started it all: on 2022-06-17 he submitted the FIRST music DIP in Devcon history — "Music Sessions | Open Mic Stage" for Devcon Bogotá — and co-founded the Open Source Orchestra tradition at ETH Prague 2022.</p>
<p><em>"You don't join the Open Source Orchestra. You notice you were always in it."</em></p>
<p>Every voice is a node. None of this would be possible without you, brother.</p>` },
  { title: 'Luogoper', sub: 'Matteo Tambussi 🎻🇮🇹 — from Turin with aloha',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--luogoper.mp3',
    chords: 'lyrics on the way', icon: '📍',
    lyrics: `<p><strong>Luogoper — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Musician, linguistics passionate, web3 OG — from the EEA survey days to ethlocal.co and SpaghettETH, Matteo has been weaving music into Ethereum since before it was cool.</p>
<p><em>"Music as sanctuary. Sounds of consensus. Owned by no one."</em></p>
<p>Gifted to the ʻohana with love — every song free to carry home. CC0 🌺</p>` },
  { title: 'Tanta Paura', sub: 'Matteo Tambussi 🎻🇮🇹 — Open Source Orchestra co-founder',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--tanta-paura.mp3',
    chords: 'sing along 🎤', icon: '🌊',
    lyrics: `<p><strong>Tanta Paura — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Non è la disumanità che mi spaventa <br>Né l'avverata fantascienza<br>Quanto il dovere rinunciare, fino in fondo<br>A ciò in cui io mi riconosco,fIn cui sono più capace</p>
<p>Ho così tante paure, <br>Ho sempre nuove paure</p>
<p>E  Faccio fatica a sbarazzarmi del tuo amore di coniglio<br>Ci han detto che l’integrità si ottiene solo con un figlio <br>Ma un figlio è un atto criminale,<br>è un tradimento della specie<br>Quando a riscrivere l'amore tutti vanno col macete, <br> <br>E con le lame taglieranno tutti i ponti col passato,<br>garantiranno il futuro, un futuro inviolato</p>
<p>Ho così tanta paura<br>Di essere solo con la mia paura</p>
<p>E mi sforzo<br>A livello intuitivo<br>Di capire qual è il luogo<br>Qual è il momento conclusivo<br>Dov’è sepolta l’altra metà del mio cuore<br>Dove ho le mie virtù<br>Dimmi ora se ce l’hai tu<br>Dimmi ora se ce l’hai tu</p>
<p>Sono Pacifico e avverto serenità</p>
<p>Rit 2<br>e ti penso, come il vento respiro nelle valli<br>sopra i mari, di un desiderio conclusivo<br>a cui sarò per sempre fedele <br>Senza perdermi in tanta paura<br>Senza perdermi in tanta paura</p>` },
  { title: 'Gioia Perfetta', sub: 'Matteo Tambussi 🎻🇮🇹 — from Turin with aloha',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--gioia-perfetta.mp3',
    chords: 'lyrics on the way', icon: '✨',
    lyrics: `<p><strong>Gioia Perfetta — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>"Perfect joy" — the newest gift from the brother who started it all. Lyrics on their way; let the music speak first.</p>
<p><em>"You don't join the Open Source Orchestra. You notice you were always in it."</em></p>` },
  { title: '3MILY', sub: 'Matteo Tambussi 🎻🇮🇹',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--3mily.mp3',
    chords: 'sing along 🎤', icon: '🌷',
    lyrics: `<p><strong>3MILY — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Ci incontriamo in volo<br>e in volo ci lasciamo<br>tu alla tua missione<br>ed io all’Uragano<br>che raffredda la mente<br>dopo una calda estate<br>e il pianeta in fiamme</p>
<p>chissà se troveremo<br>ognuno per sè<br>felicità, era una vasca piena<br>dove potevo guardarti affogare<br>accarezzando una canzone <br>semplice come te</p>
<p>3mily 3mily<br>cosa fai 3mily</p>
<p>incontrerai qualcuno<br>o qualcuno ti incontrerà<br>digli di no, tu non ci credi alla slealtà<br>dei corpi sensuali orbitanti<br>travolti dalla gravità<br>di una altra cometa.</p>
<p>3mily 3mily<br>dove sei 3milydormi qui 3mily</p>` },
  { title: 'Burnout', sub: 'Matteo Tambussi 🎻🇮🇹',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--burnout.mp3',
    chords: 'sing along 🎤', icon: '🔥',
    lyrics: `<p><strong>Burnout — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Mi piacciono le farfalle <br>Mi piacciono colorate<br>Mi perdo nelle trame<br>Delle loro traversate</p>
<p>e questa emozione che graffia il corso del vento<br>Fa scorta di pace prima del riarmamento</p>
<p>Oggi non posso fare altro che cedere<br>che dare ragione all'irragionevole</p>
<p>I mantra osceni degli motivatori alla conquista<br>Getto la spugna e vado in spiaggia</p>
<p>ma sulla sabbia un inatteso batticuore<br>mi spinge sul ciglio un abisso interiore</p>
<p>Tutti i volti rubati a persone migliori<br>Non mi aiuteranno <br>Mi sento esposto e in preda all'affanno</p>
<p>Cade ogni tipo di fede <br>Anche quella che avevo in te<br>Non mi resta che cedere, eccedere</p>
<p>E quando tocco il fondo una convinzione!<br>Un'idea senza soggetto, misura o sapore!</p>
<p>si fa strada in me<br>e mi porta con sé<br>per aria |  per i sentieri antichi<br>nell’aria | che collegano i pianeti</p>
<p>Mi piaccion le farfalle, mi piacciono colorate<br>Mi piaccion le farfalle, mi piacciono colorate<br>Mi piaccion le farfalle, mi piacciono colorate</p>` },
  { title: 'Island', sub: 'Matteo Tambussi 🎻🇮🇹',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--island.mp3',
    chords: 'sing along 🎤', icon: '🏝️',
    lyrics: `<p><strong>Island — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>oh life<br>you got me rowing<br>under the sun<br>no way I can find my island</p>
<p>fine line<br>between the blue<br>ocean and soul<br>tears won’t let me see my island</p>
<p>low lives<br>my family<br>the only ones I know<br>go, go with the flow<br>miles and miles away from the skyline</p>
<p>you rock and rollers<br>take the oars<br>you castaway lovers<br>feel the roar of Life<br>life on an island<br>searching for islands<br>sailing by the stars<br>never be lost</p>
<p>all mine<br>nothing to lose, under this sun<br>just nowhere to run<br>we’ll never stop chasing our Islands</p>
<p>you rock and rollers<br>take the oars<br>you exiled looters feel the roar<br>of Life<br>life on an Island<br>searchin for islands<br>sailing by the stars<br>never be lost<br>never grow old</p>` },
  { title: 'Cioccolato Fondente', sub: 'Matteo Tambussi 🎻🇮🇹',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--cioccolato-fondente.mp3',
    chords: 'lyrics on the way', icon: '🍫',
    lyrics: `<p><strong>Cioccolato Fondente — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Lyrics on their way from Turin — let the music speak first. 🎻</p>
<p><em>"You don't join the Open Source Orchestra. You notice you were always in it."</em></p>` },
  { title: 'La Canzone del Tuono', sub: 'Matteo Tambussi 🎻🇮🇹',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--la-canzone-del-tuono.mp3',
    chords: 'lyrics on the way', icon: '⛈️',
    lyrics: `<p><strong>La Canzone del Tuono — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Lyrics on their way from Turin — let the music speak first. 🎻</p>
<p><em>"You don't join the Open Source Orchestra. You notice you were always in it."</em></p>` },
  { title: 'Be My Friend', sub: 'Matteo Tambussi 🎻🇮🇹',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--be-my-friend.mp3',
    chords: 'lyrics on the way', icon: '🤝',
    lyrics: `<p><strong>Be My Friend — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Lyrics on their way from Turin — let the music speak first. 🎻</p>
<p><em>"You don't join the Open Source Orchestra. You notice you were always in it."</em></p>` },
  { title: 'Pharmacist Wife (Mv. 2)', sub: 'Matteo T & Marek K 🎻',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--pharmacist-wife-mv2.mp3',
    chords: 'lyrics on the way', icon: '💊',
    lyrics: `<p><strong>Pharmacist Wife (Mv. 2) — Matteo T &amp; Marek K — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Lyrics on their way from Turin — let the music speak first. 🎻</p>
<p><em>"You don't join the Open Source Orchestra. You notice you were always in it."</em></p>` },
  { title: 'Plato (ORCHI Rework)', sub: 'Matteo Tambussi 🎻🇮🇹',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--plato-orchi-rework.mp3',
    chords: 'lyrics on the way', icon: '🏛️',
    lyrics: `<p><strong>Plato (ORCHI Rework) — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Lyrics on their way from Turin — let the music speak first. 🎻</p>
<p><em>"You don't join the Open Source Orchestra. You notice you were always in it."</em></p>` },
  { title: 'Pollo', sub: 'Matteo Tambussi 🎻🇮🇹',
    src: 'https://shaka-anthem-gzdk4epeah-ffieyo32.taur.link/assets/matteo-tambussi--pollo.mp3',
    chords: 'lyrics on the way', icon: '🐔',
    lyrics: `<p><strong>Pollo — Matteo Tambussi 🎻🇮🇹</strong></p>
<p>Lyrics on their way from Turin — let the music speak first. 🎻</p>
<p><em>"You don't join the Open Source Orchestra. You notice you were always in it."</em></p>` }
];
/* v5.2: artist links — Matteo's songs point home to his linktree */
TRACKS.forEach(t => { if (/Tambussi|Marek/.test(t.sub)) t.artistUrl = 'https://linktr.ee/matteotambussi'; else t.artistUrl = 'https://shakaleikaumaka.com'; });
TRACKS.forEach(t => { t.artistName = /Tambussi|Marek/.test(t.sub) ? 'Matteo Tambussi' : 'Shaka Lei Kaumaka'; });
const wrap = document.createElement('div');
wrap.innerHTML = `
<div id="miniplayer" style="position:fixed;bottom:14px;right:14px;z-index:99999;display:flex;align-items:center;gap:7px;background:linear-gradient(150deg,rgba(240,180,41,.16),rgba(23,17,38,.92));border:1px solid #f0b429;border-radius:999px;padding:6px 12px 6px 7px;backdrop-filter:blur(8px);box-shadow:0 8px 40px rgba(240,180,41,.25);font-family:'Avenir Next','Segoe UI',system-ui,sans-serif">
  <button id="songbtn" style="width:32px;height:32px;border-radius:50%;border:none;background:#f0b429;color:#241a02;font-size:.85rem;cursor:pointer;animation:blpulse 2s infinite">▶</button>
  <div style="line-height:1.25">
    <div id="songstatus" style="font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:#ffd97a">tap to play — ${TRACKS[0].title}</div>
    <div id="songsub" style="font-size:.64rem;color:#b9a8cf">${TRACKS[0].sub}</div>
  </div>
  <button id="trackbtn" title="switch track" style="width:24px;height:24px;border-radius:50%;border:1px solid #f0b429;background:transparent;color:#ffd97a;font-size:.56rem;cursor:pointer;letter-spacing:.05em">1·2</button>
  <button id="lyricsbtn" title="sing along — lyrics for the song playing" style="width:24px;height:24px;border-radius:50%;border:1px solid #2dd4bf;background:transparent;color:#2dd4bf;font-size:.66rem;cursor:pointer">🦋</button>
  <button id="dlbtn" title="take the music — free downloads · CC0" style="width:24px;height:24px;border-radius:50%;border:1px solid #f0b429;background:transparent;color:#ffd97a;font-size:.72rem;cursor:pointer;flex-shrink:0;line-height:1">⬇</button>
  <button id="blclose" title="rest the music — a tiny 🎵 stays to wake it" style="width:24px;height:24px;border-radius:50%;border:1px solid rgba(255,126,156,.6);background:transparent;color:#ff7e9c;font-size:.62rem;cursor:pointer;flex-shrink:0;line-height:1">✕</button>
</div>
<button id="blnote" title="wake the music 🎻" style="display:none;position:fixed;right:14px;bottom:14px;z-index:99999;width:34px;height:34px;border-radius:999px;border:1px solid rgba(240,180,41,.5);background:linear-gradient(150deg,rgba(240,180,41,.16),rgba(23,17,38,.92));color:#ffd97a;font-size:15px;cursor:pointer;box-shadow:0 3px 12px rgba(11,9,24,.4);opacity:.85">🎵</button>
<div id="bldownload" style="display:none;position:fixed;bottom:68px;right:14px;z-index:99998;width:min(340px,86vw);max-height:52vh;overflow-y:auto;background:linear-gradient(160deg,rgba(23,17,38,.97),rgba(13,10,20,.97));border:1px solid rgba(240,180,41,.4);border-radius:16px;padding:18px 20px;box-shadow:0 12px 50px rgba(0,0,0,.6);font-family:'Avenir Next','Segoe UI',system-ui,sans-serif">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px">
    <div style="font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:#ffd97a">⬇ take the music · CC0</div>
    <button id="blshare" title="share the radio everywhere" style="border:1px solid rgba(240,180,41,.5);background:transparent;color:#ffd97a;border-radius:999px;font-size:.72rem;padding:.2em .7em;cursor:pointer">📣</button>
  </div>
  <div style="font-size:.72rem;margin-bottom:8px"><a href="https://shakaleikaumaka.com/radio/" target="_blank" rel="noopener" style="color:#2dd4bf;text-decoration:none">📻 every mp3 on one page — the radio home →</a></div>
  <div id="bldlbody" style="font-size:.86rem;line-height:1.5;color:#b9a8cf"></div>
  <div style="font-size:.68rem;color:rgba(185,168,207,.7);margin-top:12px;font-style:italic">every song is a public good — free to keep, free to share 🌺</div>
</div>
<div id="blyrics" style="display:none;position:fixed;bottom:68px;right:14px;z-index:99998;width:min(340px,86vw);max-height:52vh;overflow-y:auto;background:linear-gradient(160deg,rgba(23,17,38,.97),rgba(13,10,20,.97));border:1px solid rgba(45,212,191,.4);border-radius:16px;padding:18px 20px;box-shadow:0 12px 50px rgba(0,0,0,.6);font-family:'Avenir Next','Segoe UI',system-ui,sans-serif">
  <div id="blyricshead" style="font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;margin-bottom:10px"></div>
  <div id="blyricsbody" style="font-size:.9rem;line-height:1.6;color:#b9a8cf"></div>
</div>
<audio id="thesong" preload="auto"></audio>
<style>@keyframes blscroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.blmarq{display:inline-flex;white-space:nowrap;animation:blscroll 9s linear infinite}
#blnote:hover{opacity:1}
#miniplayer a{color:#b9a8cf;text-decoration:none;border-bottom:1px dotted rgba(45,212,191,.5)}
#miniplayer a:hover{color:#2dd4bf}
@keyframes blpulse{0%,100%{box-shadow:0 0 0 0 rgba(240,180,41,.5)}50%{box-shadow:0 0 0 12px rgba(240,180,41,0)}}@keyframes bleq{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}.blbars{display:inline-flex;gap:2.5px;align-items:flex-end;height:14px;margin-right:2px}.blbars i{width:3px;background:#f0b429;border-radius:2px;animation:bleq .9s ease-in-out infinite}.blbars i:nth-child(2){animation-delay:.2s}.blbars i:nth-child(3){animation-delay:.4s}#blyricsbody p{margin:0 0 14px}#blyricsbody strong{color:#f3ead8}
/* v4.5 perfectionist canon (Shaka, Jul 27 2026): cap the text column so the bar can NEVER grow wide enough to touch the manifesto paper */
#miniplayer > div{max-width:200px}
#songstatus,#songsub{white-space:nowrap !important;overflow:hidden !important;text-overflow:ellipsis !important;max-width:200px}
@media (max-width:1100px){
  /* narrower windows: drop the sub line entirely, tighter cap */
  #miniplayer > div > div:last-child{display:none !important}
  #miniplayer > div{max-width:160px}
  #songstatus{max-width:160px !important}
}
@media (max-width:640px){
  /* v4.2 mobile canon (Shaka, Jul 27 2026): shrink so jukebox + Devcon ticket sit side by side */
  #miniplayer{bottom:12px !important;right:12px !important;left:auto !important;padding:6px 10px 6px 7px !important;gap:7px !important;border-radius:999px !important}
  #miniplayer > div > div:last-child{display:none !important}
  #songbtn{width:30px !important;height:30px !important;font-size:.8rem !important;flex-shrink:0}
  #songstatus{font-size:.58rem !important;letter-spacing:.05em !important;white-space:nowrap;max-width:106px;overflow:hidden;text-overflow:ellipsis}
  #trackbtn,#lyricsbtn,#dlbtn,#blclose{width:24px !important;height:24px !important;font-size:.56rem !important;flex-shrink:0}
  #blyrics,#bldownload{bottom:82px !important;right:12px !important}
}
@media (max-width:400px){
  /* very narrow phones: ticket floats ABOVE the jukebox (stacked), so the bar gets a little room back */
  #songstatus{max-width:140px}
}
</style>`;
document.body.appendChild(wrap);
const song = document.getElementById('thesong');
const btn = document.getElementById('songbtn');
const status = document.getElementById('songstatus');
const sub = document.getElementById('songsub');
const trackBtn = document.getElementById('trackbtn');
const lyricsBtn = document.getElementById('lyricsbtn');
const dlBtn = document.getElementById('dlbtn');
const closeBtn = document.getElementById('blclose');
const noteBtn = document.getElementById('blnote');
const CLOSED_KEY = 'bl_closed';
function blIsClosed(){ try { return localStorage.getItem(CLOSED_KEY) === '1'; } catch(e){ return false; } }
function blSetClosed(v){ try { v ? localStorage.setItem(CLOSED_KEY,'1') : localStorage.removeItem(CLOSED_KEY); } catch(e){} }
function blShowClosed(closed){
  document.getElementById('miniplayer').style.display = closed ? 'none' : 'flex';
  noteBtn.style.display = closed ? 'block' : 'none';
}
closeBtn.addEventListener('click', ()=>{
  if (playing) { song.pause(); setPlaying(false, true); }
  toggleLyrics(false); toggleDownloads(false);
  blSetClosed(true); blShowClosed(true);
});
noteBtn.addEventListener('click', ()=>{ blSetClosed(false); blShowClosed(false); });
const dlBox = document.getElementById('bldownload');
const dlBody = document.getElementById('bldlbody');
let dlOpen = false;
function escH(x){ return String(x).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function renderDownloads(){
  dlBody.innerHTML = TRACKS.map((t,i) =>
    '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid rgba(240,196,100,.12)">' +
    '<span style="color:#f3ead8">' + t.icon + ' ' + escH(t.title) + (t.artistUrl ? ' <a href="' + t.artistUrl + '" target="_blank" rel="noopener" style="color:#2dd4bf;text-decoration:none;font-size:.72rem">↗ artist</a>' : '') + '</span>' +
    '<a href="' + t.src + '" download style="color:#ffd97a;text-decoration:none;font-size:.74rem;border:1px solid rgba(240,180,41,.5);border-radius:999px;padding:.2em .8em;white-space:nowrap">⬇ mp3</a>' +
    '</div>').join('');
}
function toggleDownloads(force){
  dlOpen = (typeof force === 'boolean') ? force : !dlOpen;
  if (dlOpen) renderDownloads();
  dlBox.style.display = dlOpen ? 'block' : 'none';
  dlBtn.style.background = dlOpen ? '#f0b429' : 'transparent';
  dlBtn.style.color = dlOpen ? '#241a02' : '#ffd97a';
  if (dlOpen) toggleLyrics(false);
}
dlBtn.addEventListener('click', () => toggleDownloads());
document.getElementById('blshare').addEventListener('click', ()=>{
  const t = TRACKS[ti];
  const text = '📻 OSO FLOW RADIO — "' + t.title + '" by ' + t.artistName + ' · CC0 music from Shaka × the AI ʻohana 🌺';
  const url = 'https://shakaleikaumaka.com/radio/';
  if (navigator.share) { navigator.share({ title: t.title, text: text, url: url }).catch(()=>{}); return; }
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url), '_blank', 'noopener');
});
const lyricsBox = document.getElementById('blyrics');
const lyricsHead = document.getElementById('blyricshead');
const lyricsBody = document.getElementById('blyricsbody');
const KEY = 'bl_song';
let playing = false;
let ti = 0;
let lyricsOpen = false;
const q = new URLSearchParams(location.search);
const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('bl_song') : null;
function fmt(t){ const m = Math.floor(t/60), s = Math.floor(t%60); return m + ':' + String(s).padStart(2,'0'); }
function saveState(){ try { localStorage.setItem(KEY, JSON.stringify({ track: ti, t: song.currentTime || 0, playing: playing, at: Date.now() })); } catch(e){} }
function loadState(){ try { const d = JSON.parse(localStorage.getItem(KEY) || 'null'); return d && typeof d.t === 'number' ? d : null; } catch(e){ return null; } }
function renderLyrics(){
  lyricsHead.textContent = TRACKS[ti].icon + ' ' + TRACKS[ti].title + ' · ' + TRACKS[ti].chords;
  lyricsBody.innerHTML = TRACKS[ti].lyrics + (TRACKS[ti].artistUrl ? '<p style="margin-top:6px"><a href="' + TRACKS[ti].artistUrl + '" target="_blank" rel="noopener" style="color:#2dd4bf">🎻 more from this artist → linktr.ee</a></p>' : '');
}
function toggleLyrics(force){
  lyricsOpen = (typeof force === 'boolean') ? force : !lyricsOpen;
  if (lyricsOpen) renderLyrics();
  lyricsBox.style.display = lyricsOpen ? 'block' : 'none';
  if (lyricsOpen && typeof dlBox !== 'undefined') { dlOpen = false; dlBox.style.display = 'none'; dlBtn.style.background = 'transparent'; dlBtn.style.color = '#ffd97a'; }
  lyricsBtn.style.background = lyricsOpen ? '#2dd4bf' : 'transparent';
  lyricsBtn.style.color = lyricsOpen ? '#0d0a14' : '#2dd4bf';
}
lyricsBtn.addEventListener('click', ()=>toggleLyrics());
function setTrack(i, keepTime){
  ti = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
  song.src = TRACKS[ti].src;
  sub.innerHTML = TRACKS[ti].artistUrl
    ? '<a href="' + TRACKS[ti].artistUrl + '" target="_blank" rel="noopener">' + escH(TRACKS[ti].sub) + '</a>'
    : escH(TRACKS[ti].sub);
  trackBtn.textContent = (ti + 1) + '·' + TRACKS.length;
  trackBtn.title = 'switch track — next: ' + TRACKS[(ti + 1) % TRACKS.length].title;
  lyricsBtn.textContent = TRACKS[ti].icon;
  if (lyricsOpen) renderLyrics();
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
  if (on) {
    const t = TRACKS[ti].icon + ' ' + TRACKS[ti].title + ' · ' + TRACKS[ti].artistName + '   🌺   ';
    status.innerHTML = '<span class="blbars"><i></i><i></i><i></i></span><span style="display:inline-block;max-width:150px;overflow:hidden;vertical-align:bottom"><span class="blmarq"><span>' + escH(t) + '</span><span>' + escH(t) + '</span></span></span>';
  } else status.innerHTML = label();
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
  const urlT = parseFloat(q.get('bl_t'));
  const urlTrk = parseInt(q.get('bl_trk'), 10);
  const st = loadState();
  const startTrack = (!isNaN(urlTrk) && urlTrk >= 0 && urlTrk < TRACKS.length) ? urlTrk : (st && typeof st.track === 'number' ? st.track : 0);
  setTrack(startTrack, true);
  const startT = (!isNaN(urlT) && urlT > 1) ? urlT : (st && st.t > 1 && st.track === ti ? st.t : 0);
  if (startT > 1) { try { song.currentTime = startT; } catch(e){} }
  setPlaying(false, false);
  if (blIsClosed()) blShowClosed(true);
  // v5.0 continuum: if the song was playing when the visitor left the last door, offer the seamless resume
  const stWasPlaying = (q.get('bl_play') === '1') || (st && st.playing);
  if (stWasPlaying && !blIsFocus(BL_HOST)) {
    status.innerHTML = '▶ the song follows you — tap anywhere to continue';
    btn.style.animation = 'blpulse 1.2s infinite';
    const resumeOnce = () => {
      document.removeEventListener('pointerdown', resumeOnce);
      song.play().then(()=>setPlaying(true, true)).catch(()=>setPlaying(false, true));
    };
    document.addEventListener('pointerdown', resumeOnce, { once:false });
  }
});
window.addEventListener('beforeunload', saveState);
// v4.2: public API — songbook carousels can play a track directly
window.blPlay = function(i){
  if (typeof i === 'number') setTrack(i);
  song.play().then(()=>setPlaying(true, true)).catch(()=>{});
};
// same-tab navigation — position rides the URL
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#')) return;
  a.addEventListener('click', e => {
    if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    saveState();
    let url = a.href;
    try {
      const u = new URL(url, location.href);
      if (blInFamily(u.hostname) && song.currentTime > 1) {
        u.searchParams.set('bl_t', song.currentTime.toFixed(1));
        u.searchParams.set('bl_trk', String(ti));
        if (playing) u.searchParams.set('bl_play', '1');
        url = u.toString();
      }
    } catch(err){}
    if (url !== a.href) { e.preventDefault(); location.href = url; }
  });
});
})();
