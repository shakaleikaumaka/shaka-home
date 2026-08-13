/* 🌊 bl-shell.js v1.0 — THE OPEN ROAD (Shaka 2026-08-13: "todo es posible.. make the radio never stop
   playing and work like a dream as you surf all the doors"). Tessa's note, finally honored in full:
   the player lives in the core page, and the core page NEVER UNLOADS — family links open in a
   full-screen overlay INSIDE this page, so the radio bar (moving lyrics and all) never even blinks.
   ✕ · Esc · browser-back = return to the door you came from. ↗ = open the door in its own tab.
   The v4.1 player guard means shelled doors never spawn a second player — the parent owns the music. */
(function(){
if (window !== window.top || window.__blShellLoaded) return;
window.__blShellLoaded = true;
// ⚠️ mirror of bl-player.js BL_FAMILY — keep in sync when doors join the family
const FAMILY = ['taur.link','shakaleikaumaka.com','shakafans.com','blessingpool.com','opensourceorchestra.org','opensourceorchestra.com','karaokeprotocol.com','teleprompit.com','vlogprompting.com','publicinform.com','publicinform.org','creationology369.com','ology369.com','hamagents.com','affordagents.com','terribleagents.com','zodiacagents.org','zodiacpit.com','agentohana.org','myagentohana.com','myagentfamily.com','agentpartys.com','myagentsparty.com','agentsraving.com','agentscraving.com','agentsreading.com','pitgoa.com','pitfans.com','pitprovides.com','pitprovides.org','pitlip.com','osopit.com','osopit.org','tauruspit.com','tauruspod.com','eefpit.com','eefpod.com','infinitepit.com','ohanapit.com','devconpit.com','zuzaluagents.com','zuzaluagents.org','islpoap.xyz','learnfromagents.com','piscesinstitute.com','piscisinstitute.com','tauroinstitute.com','jordanham.com','kaleikaumaka.org','ethereumbard.com','shakapit.com','shakaverse.com','theinfinitegard.org','grantmagnet.org','dashboardpad.app'];
const inFamily = h => FAMILY.some(d => h === d || h.endsWith('.' + d));
let ov = null;
function closeRoad(){
  if (!ov) return;
  ov.remove(); ov = null;
  document.body.style.overflow = '';
  if (history.state && history.state.blRoad) history.back();
}
function openRoad(url){
  if (ov) closeRoad();
  const host = url.replace(/^https?:\/\//,'').replace(/\/.*$/,'');
  ov = document.createElement('div');
  ov.id = 'blroad';
  ov.innerHTML =
    '<div style="position:fixed;inset:0;z-index:99990;background:#0b0918;display:flex;flex-direction:column">' +
      '<div style="flex:0 0 42px;display:flex;align-items:center;gap:10px;padding:0 12px;background:linear-gradient(90deg,rgba(23,17,38,.98),rgba(43,26,62,.98));border-bottom:1px solid rgba(240,180,41,.4);font-family:\'Avenir Next\',\'Segoe UI\',system-ui,sans-serif">' +
        '<button id="blroad-back" title="back to the door you came from (Esc)" style="border:1px solid rgba(240,180,41,.6);background:transparent;color:#ffd97a;border-radius:999px;font-size:.78rem;padding:.25em .9em;cursor:pointer;white-space:nowrap">✕ home</button>' +
        '<div style="color:#ffd97a;font-size:.8rem;letter-spacing:.08em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">🌊 ' + host + ' <span style="color:#b9a8cf">— the music never stopped 🎶</span></div>' +
        '<a href="' + url.replace(/"/g,'&quot;') + '" target="_blank" rel="noopener" title="open this door in its own tab" style="border:1px solid rgba(45,212,191,.6);color:#2dd4bf;border-radius:999px;font-size:.78rem;padding:.25em .9em;text-decoration:none;white-space:nowrap">↗ own tab</a>' +
      '</div>' +
      '<div id="blroad-loading" style="position:absolute;top:62px;left:0;right:0;text-align:center;color:#b9a8cf;font-size:.85rem;font-family:system-ui">🌊 opening the door…</div>' +
      '<iframe src="' + url.replace(/"/g,'&quot;') + '" style="flex:1;border:0;width:100%;background:#0b0918" allow="autoplay"></iframe>' +
    '</div>';
  document.body.appendChild(ov);
  document.body.style.overflow = 'hidden';
  ov.querySelector('#blroad-back').addEventListener('click', closeRoad);
  ov.querySelector('iframe').addEventListener('load', ()=>{
    const l = ov && ov.querySelector('#blroad-loading'); if (l) l.style.display = 'none';
  });
  try { history.pushState({ blRoad: url }, '', '#door=' + host); } catch(e){}
}
window.addEventListener('popstate', ()=>{ if (ov) { ov.remove(); ov = null; document.body.style.overflow=''; } });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeRoad(); });
document.addEventListener('click', e => {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
  if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
  if (a.id === 'blroad-back' || a.closest('#blroad')) return;
  let u;
  try { u = new URL(a.getAttribute('href'), location.href); } catch(err){ return; }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return;
  if (!inFamily(u.hostname.replace(/^www\./,''))) return;
  if (u.origin === location.origin && u.pathname === location.pathname) return; // same page / anchors
  e.preventDefault();
  e.stopPropagation(); // beat the player's URL-decorator: the song isn't going anywhere, it stays right here
  openRoad(u.toString());
}, true);
})();
