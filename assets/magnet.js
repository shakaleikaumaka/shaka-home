/* magnet.js v1.0 — the blessing magnet 🧲 for every PIT door
   Renders a small 🔄🧲 circle fixed top-right (top:10px right:10px, z:9997),
   same visual style as the front-door #cmag. Click → blessingpool.com.
   If the page already has the full front-door magnet (#cmag), do nothing. */
(function(){
  if(document.getElementById('cmag')||document.getElementById('cmag-lite'))return;
  function boot(){
    if(document.getElementById('cmag')||document.getElementById('cmag-lite'))return;
    var st=document.createElement('style');
    st.textContent='#cmag-lite{position:fixed;top:10px;right:10px;z-index:9997;width:40px;height:40px;border-radius:50%;background:rgba(20,18,45,.85);border:1px solid rgba(124,211,255,.4);display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1;letter-spacing:-1px;white-space:nowrap;overflow:hidden;cursor:pointer;opacity:.55;transition:opacity .3s;user-select:none;padding:0}#cmag-lite:hover{opacity:1}';
    document.head.appendChild(st);
    var m=document.createElement('div');
    m.id='cmag-lite';
    m.title='the blessing magnet 🧲 — give & receive 🌊';
    m.textContent='🔄🧲';
    m.addEventListener('click',function(){window.open('https://blessingpool.com','_blank','noopener')});
    document.body.appendChild(m);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
