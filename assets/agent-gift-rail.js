/* agent-gift-rail.js v1.1 — 🤖 agent gift rail (27 Nov 2026, Shaka: "replace the flower button with the x402 on
   coinbase, tempo, and hedera fully wired, and show it as 'agent gift rail'").
   One small pill top-right (where the passport flower sat) → the three-rail card:
     · Coinbase · Base — USDC EIP-3009, gas-free for the giver, settled by PayAI → osoartist.eth (0x2596…c934)
     · Tempo · OUSD — the SAME Base USDC signature, settled via our gift-rail proxy → Tempo's x402 facilitator
       → paid out as OUSD on Tempo mainnet to the same ʻohana address (chain 4217)
     · Hedera · HBAR — agents settle x402 on hedera:mainnet via the AMNT facilitator (live, keyless like PayAI);
       humans send HBAR by hand to the ʻohana's Hedera account 0.0.11347291
   v1.1: the gift-rail robot — a surfing robot on a moving wave (inline SVG comic, reduced-motion aware)
   + the ONE-TIME comic bubble (aloha + mahalo, once per visitor, ✕, never covers words — probe or it stays away).
   Laws: NO COVERED TEXT (folds to its dot over words or page controls, never slides; tap/clear unfolds;
   visitor ✕ remembered) · bows out while the frame is off-by-✕ · honest machine line.
   Keep in sync with x402-tip.js v2.0 + frames/src/pieces/gift.js. */
(function(){
  if(window.__agentGiftRail) return; window.__agentGiftRail=1;
  var PAYAI='https://facilitator.payai.network';
  var PROXY='https://gift-rail.opensourceorchestra.org';
  var USDC='0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  var PAYTO='0x25965899f4600b3AA5362ee4f34be95E5E62c934';
  var TEMPO_DEPOSIT='0xB2da9082b7f98E189Fc6Ad3bF137C8F22F44f309';   // from GET api.tempo.xyz/v1/x402/supported (public)
  var BASE_CHAIN=8453;
  var RESOURCE='https://shakaleikaumaka.com/x402-bless.json';
  var HEDERA_ACCT='0.0.11347291';
  var LSK='agr_mini';
  var ETHERS_URL='https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.4/ethers.umd.min.js';

  var css=document.createElement('style');
  css.textContent=[
  '#agr-wrap{position:fixed;top:calc(14px + env(safe-area-inset-top,0px));right:14px;z-index:9998;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:system-ui,-apple-system,sans-serif}',
  '#agr-pill{background:linear-gradient(90deg,#0a4fd6,#7c4ba8);color:#fff;border:1px solid rgba(127,216,164,.45);border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.45);white-space:nowrap;opacity:.94;letter-spacing:.02em}',
  '#agr-pill:hover{opacity:1;filter:brightness(1.12)}',
  '#agr-x{background:rgba(20,14,30,.85);color:#cfc6e8;border:1px solid #7c4ba8;border-radius:50%;width:22px;height:22px;line-height:1;font-size:11px;cursor:pointer;padding:0}',
  '#agr-mini{position:fixed;top:calc(14px + env(safe-area-inset-top,0px));right:14px;z-index:9998;width:28px;height:28px;border-radius:50%;background:rgba(20,14,30,.9);border:1px solid #7c4ba8;font-size:14px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;opacity:.75;padding:0}',
  '#agr-ovl{position:fixed;inset:0;z-index:100003;background:rgba(6,3,10,.74);display:none;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,sans-serif}',
  '#agr-card{background:#120a1c;border:1px solid #7c4ba8;border-radius:18px;max-width:430px;width:100%;padding:22px;color:#f5efe6;box-shadow:0 10px 50px rgba(0,0,0,.6);max-height:88vh;overflow:auto}',
  '#agr-card h3{margin:0 0 6px;font-size:18px}',
  '#agr-card .agr-sub{color:#9d97c9;font-size:13px;line-height:1.5;margin-bottom:12px}',
  '#agr-card .agr-sub a,#agr-st a{color:#7fd8a4}',
  '.agr-rails{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}',
  '.agr-rail{background:#0b0710;border:1px solid #4a3565;color:#f5efe6;border-radius:10px;padding:8px 12px;font-size:13px;cursor:pointer;font-weight:600}',
  '.agr-rail.sel{border-color:#7fd8a4;color:#7fd8a4}',
  '.agr-amts{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}',
  '.agr-amt{background:#0b0710;border:1px solid #4a3565;color:#f5efe6;border-radius:10px;padding:8px 14px;font-size:14px;cursor:pointer}',
  '.agr-amt.sel{border-color:#7fd8a4;color:#7fd8a4}',
  '#agr-custom{background:#0b0710;border:1px solid #4a3565;color:#f5efe6;border-radius:10px;padding:8px 10px;font-size:14px;width:90px}',
  '#agr-send{width:100%;background:linear-gradient(90deg,#0a4fd6,#7c4ba8);color:#fff;border:none;border-radius:12px;padding:12px;font-size:15px;font-weight:700;cursor:pointer;margin-top:4px}',
  '#agr-send:disabled{opacity:.5;cursor:wait}',
  '#agr-st{color:#9d97c9;font-size:13px;line-height:1.5;margin-top:12px;word-break:break-word}',
  '.agr-note{color:#8b84ad;font-size:11.5px;line-height:1.5;margin-top:12px}',
  '.agr-addr{background:#0b0710;border:1px solid #4a3565;border-radius:10px;padding:8px 10px;font-size:12px;word-break:break-all;color:#cfc6e8;font-family:ui-monospace,monospace;margin-top:8px}',
  '.agr-copy{background:#1c1230;color:#7fd8a4;border:1px solid #7fd8a4;border-radius:10px;padding:7px 12px;font-size:12.5px;cursor:pointer;margin-top:8px}',
  '#agr-close{position:absolute;top:10px;right:14px;background:none;border:none;color:#9d97c9;font-size:20px;cursor:pointer}',
  '#agr-cardwrap{position:relative}',
  'html[data-osof-off] #agr-wrap,html[data-osof-off] #agr-mini,html[data-osof-off] #agr-ovl{display:none!important}',
  '.agr-ico{width:15px;height:15px;vertical-align:-2.5px;margin-right:5px}',
  /* ——— the gift-rail robot: a surfing robot on a moving wave (fully animated + alive; reduced-motion stills it) ——— */
  '.agr-scene{display:block;width:100%;height:auto;border-radius:14px;margin:2px 0 12px;box-shadow:inset 0 0 0 1px #2c2140}',
  '@keyframes agrW1{from{transform:translateX(0)}to{transform:translateX(-16px)}}',
  '@keyframes agrW2{from{transform:translateX(-10px)}to{transform:translateX(6px)}}',
  '.agr-w1{animation:agrW1 6.5s ease-in-out infinite alternate}',
  '.agr-w2{animation:agrW2 4.8s ease-in-out infinite alternate}',
  '@keyframes agrBob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-5px) rotate(2.4deg)}}',
  '.agr-bot{animation:agrBob 3.4s ease-in-out infinite;transform-origin:170px 92px}',
  '@keyframes agrBlink{0%,91%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}',
  '.agr-eye{animation:agrBlink 4.6s infinite;transform-box:fill-box;transform-origin:center}',
  '@keyframes agrAnt{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.3);opacity:1}}',
  '.agr-ant{animation:agrAnt 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}',
  '@keyframes agrFoam{0%{transform:translate(0,0) scale(.5);opacity:0}22%{opacity:.95}100%{transform:translate(-24px,-13px) scale(1.2);opacity:0}}',
  '.agr-foam{animation:agrFoam 2.6s linear infinite}',
  '.agr-foam.f2{animation-delay:.9s}.agr-foam.f3{animation-delay:1.7s}',
  '@keyframes agrTwinkle{0%,100%{opacity:.2}50%{opacity:.95}}',
  '.agr-star{animation:agrTwinkle 3.8s ease-in-out infinite}.agr-star.s2{animation-delay:1.2s}.agr-star.s3{animation-delay:2.4s}',
  '@keyframes agrArmL{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(9deg)}}',
  '@keyframes agrArmR{0%,100%{transform:rotate(8deg)}50%{transform:rotate(-7deg)}}',
  '.agr-arm-l{animation:agrArmL 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:top center}',
  '.agr-arm-r{animation:agrArmR 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:top center}',
  '@keyframes agrPop{0%{transform:scale(.35);opacity:0}70%{transform:scale(1.07)}100%{transform:scale(1);opacity:1}}',
  '.agr-bubin{animation:agrPop .5s cubic-bezier(.2,.9,.3,1.25) .8s both;transform-box:fill-box;transform-origin:278px 26px}',
  /* the ONE-TIME comic bubble near the pill */
  '#agr-bubble{position:fixed;top:calc(84px + env(safe-area-inset-top,0px));right:80px;z-index:9998;max-width:min(300px,82vw);background:#fff;color:#161020;border:2.5px solid #161020;border-radius:16px;padding:10px 30px 10px 13px;font:700 13.5px/1.45 system-ui,-apple-system,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.5);display:none}',
  '#agr-bubble::before{content:"";position:absolute;top:-9px;right:24px;width:14px;height:14px;background:#fff;border-left:2.5px solid #161020;border-top:2.5px solid #161020;transform:rotate(45deg)}',
  '#agr-bubble .agr-bx{position:absolute;top:4px;right:6px;border:0;background:none;color:#161020;font-size:15px;cursor:pointer;padding:2px 4px;opacity:.65}',
  '#agr-bubble .agr-bx:hover{opacity:1}',
  '#agr-bubble.agr-show{display:block;animation:agrPop .45s cubic-bezier(.2,.9,.3,1.25) both;transform-origin:top right}',
  '#agr-bubble.agr-bye{transition:opacity .5s,transform .5s;opacity:0;transform:translateY(-6px)}',
  '@media (prefers-reduced-motion:reduce){.agr-w1,.agr-w2,.agr-bot,.agr-eye,.agr-ant,.agr-foam,.agr-star,.agr-arm-l,.agr-arm-r,.agr-bubin,.agr-scene,#agr-bubble.agr-show{animation:none!important}}',
  '@media (max-width:520px){#agr-pill{font-size:11px;padding:6px 10px}#agr-bubble{right:64px;top:calc(64px + env(safe-area-inset-top,0px))}}'
  ].join('\n');
  document.head.appendChild(css);

  /* ── the gift-rail robot (inline SVG comic — fully animated + alive) ── */
  var SCENE_SVG=''
  +'<svg class="agr-scene" viewBox="0 0 360 120" role="img" aria-label="the gift-rail robot: a little robot surfing a moving wave, calling aloha and mahalo">'
  +'<defs>'
  +'<linearGradient id="agrDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#170b28"/><stop offset=".62" stop-color="#3d1c42"/><stop offset="1" stop-color="#123a7a"/></linearGradient>'
  +'<linearGradient id="agrWaveG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f97ff"/><stop offset="1" stop-color="#0a4fd6"/></linearGradient>'
  +'</defs>'
  +'<rect width="360" height="120" rx="13" fill="url(#agrDawn)"/>'
  +'<circle class="agr-star" cx="34" cy="18" r="1.6" fill="#fbe2a0"/><circle class="agr-star s2" cx="86" cy="10" r="1.2" fill="#fff"/><circle class="agr-star s3" cx="132" cy="22" r="1.4" fill="#ffd7ef"/><circle class="agr-star s2" cx="322" cy="14" r="1.5" fill="#fff"/>'
  +'<g class="agr-w1"><path d="M-24,88 C26,64 66,62 108,78 C148,92 196,96 238,76 C278,58 330,62 392,82 L392,132 L-24,132 Z" fill="#1e6fd9" opacity=".72"/></g>'
  +'<g class="agr-bot">'
  +'<ellipse cx="172" cy="99" rx="49" ry="9.5" fill="#7c4ba8" stroke="#24170d" stroke-width="2.5"/>'
  +'<path d="M128,96 Q172,107 216,96" stroke="#fbe2a0" stroke-width="3" fill="none" stroke-linecap="round"/>'
  +'<circle class="agr-foam" cx="128" cy="94" r="3.2" fill="#dff3ff"/><circle class="agr-foam f2" cx="134" cy="99" r="2.4" fill="#fff"/><circle class="agr-foam f3" cx="124" cy="90" r="2" fill="#bfe6ff"/>'
  +'<g class="agr-arm-l"><path d="M156,66 L138,56" stroke="#e8f4ff" stroke-width="7" stroke-linecap="round"/><path d="M156,66 L138,56" stroke="#24170d" stroke-width="7" stroke-linecap="round" opacity=".18"/></g>'
  +'<g class="agr-arm-r"><path d="M188,66 L206,54" stroke="#e8f4ff" stroke-width="7" stroke-linecap="round"/><path d="M188,66 L206,54" stroke="#24170d" stroke-width="7" stroke-linecap="round" opacity=".18"/></g>'
  +'<rect x="154" y="58" width="36" height="36" rx="9" fill="#e8f4ff" stroke="#24170d" stroke-width="2.5"/>'
  +'<circle cx="172" cy="74" r="6.5" fill="#ff7ab8" stroke="#24170d" stroke-width="1.6"/><circle cx="172" cy="74" r="2.4" fill="#fbe2a0"/>'
  +'<rect x="146" y="16" width="52" height="44" rx="11" fill="#ffffff" stroke="#24170d" stroke-width="2.5"/>'
  +'<line x1="172" y1="16" x2="172" y2="7" stroke="#24170d" stroke-width="2.5" stroke-linecap="round"/>'
  +'<circle class="agr-ant" cx="172" cy="6" r="3.6" fill="#fbe2a0" stroke="#24170d" stroke-width="1.6"/>'
  +'<circle class="agr-eye" cx="161" cy="34" r="4.4" fill="#161020"/><circle class="agr-eye" cx="183" cy="34" r="4.4" fill="#161020"/>'
  +'<circle cx="162.6" cy="32.4" r="1.3" fill="#fff"/><circle cx="184.6" cy="32.4" r="1.3" fill="#fff"/>'
  +'<path d="M163,46 Q172,53 181,46" stroke="#161020" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
  +'<text x="192" y="26" font-size="11" text-anchor="middle">🌺</text>'
  +'</g>'
  +'<g class="agr-w2"><path d="M-24,102 C40,82 92,86 142,98 C190,109 238,110 292,92 C330,80 366,86 392,94 L392,132 L-24,132 Z" fill="url(#agrWaveG)"/>'
  +'<circle cx="66" cy="88" r="3.4" fill="#dff3ff"/><circle cx="80" cy="85" r="2.2" fill="#fff"/><circle cx="310" cy="84" r="3" fill="#dff3ff"/><circle cx="326" cy="81" r="2" fill="#fff"/></g>'
  +'<g class="agr-bubin">'
  +'<path d="M246,14 L332,14 Q342,14 342,24 L342,52 Q342,62 332,62 L288,62 L272,76 L276,62 L246,62 Q236,62 236,52 L236,24 Q236,14 246,14 Z" fill="#fff" stroke="#161020" stroke-width="2.5"/>'
  +'<text x="289" y="33" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="800" font-size="12.5" fill="#161020">aloha! 🤙</text>'
  +'<text x="289" y="49" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="700" font-size="10.5" fill="#4a3565">every drop — mahalo! 🌺</text>'
  +'</g>'
  +'</svg>';
  var ICON_SVG='<svg class="agr-ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="3" width="12" height="10" rx="3.2" fill="#fff" stroke="#161020" stroke-width="1.4"/><line x1="12" y1="3" x2="12" y2="1.4" stroke="#161020" stroke-width="1.2"/><circle cx="12" cy="1" r="1" fill="#fbe2a0"/><circle cx="9.6" cy="7.4" r="1.2" fill="#161020"/><circle cx="14.4" cy="7.4" r="1.2" fill="#161020"/><path d="M9.4,10.2 Q12,11.8 14.6,10.2" stroke="#161020" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M1,17 C5,13.5 9,13.5 12,16 C15,18.5 19,18.5 23,15.5 L23,24 L1,24 Z" fill="#3f97ff"/></svg>';

  var wrap=document.createElement('div'); wrap.id='agr-wrap';
  wrap.innerHTML='<button id="agr-pill" aria-haspopup="dialog" aria-label="agent gift rail — x402 on coinbase, tempo, and hedera">'+ICON_SVG+'agent gift rail</button><button id="agr-x" title="tuck away" aria-label="tuck away">✕</button>';
  var mini=document.createElement('button'); mini.id='agr-mini'; mini.title='agent gift rail'; mini.setAttribute('aria-label','agent gift rail — show the button'); mini.textContent='🤖';
  var ovl=document.createElement('div'); ovl.id='agr-ovl';

  /* ── NO COVERED TEXT probes (same law as x402-tip.js v2.0 / frames core) ── */
  var TEXT_TAGS={A:1,P:1,SPAN:1,LI:1,H1:1,H2:1,H3:1,H4:1,H5:1,H6:1,BUTTON:1,LABEL:1,TD:1,TH:1,SUMMARY:1,FIGCAPTION:1,BLOCKQUOTE:1,Q:1,CITE:1};
  function ownEl(a){ return wrap.contains(a)||mini.contains(a)||ovl.contains(a)||a.id==='agr-bubble'; }
  function isBubble(a){ try{ return !!(a.matches&&a.matches('[class*="bubble"],[class*="caption"],[class*="speech"],[class*="balloon"],.cap,.kaaak,blockquote,figcaption,q,cite')); }catch(e){ return false; } }
  function ownTextLen(a){ var n=0,c=a.childNodes; for(var i=0;i<c.length;i++) if(c[i].nodeType===3) n+=(c[i].nodeValue||'').replace(/\s+/g,' ').trim().length; return n; }
  function patchAt(x,y,mode,familyOk){
    if(!document.elementsFromPoint) return false;
    var vw=window.innerWidth,vh=window.innerHeight,S=12;
    var gx=[x+2,x+S/2,x+S-2],gy=[y+2,y+S/2,y+S-2];
    for(var i=0;i<3;i++)for(var j=0;j<3;j++){
      var px=gx[j],py=gy[i];
      if(px<0||py<0||px>=vw||py>=vh) continue;
      var els=document.elementsFromPoint(px,py);
      for(var k=0;k<els.length;k++){
        var el=els[k];
        if(el===document.body||el===document.documentElement) continue;
        for(var a=el;a&&a!==document.body&&a!==document.documentElement;a=a.parentElement){
          if(ownEl(a)) break;
          if(familyOk!==false&&(a.id==='oso-frames'||(a.closest&&a.closest('#oso-frames')))) break;      // the frame is family — it folds itself
          var cs=window.getComputedStyle(a);
          if(cs.visibility==='hidden'||+cs.opacity<0.05) break;
          var fixed=(cs.position==='fixed'||cs.position==='sticky');
          if(mode!=='words'){
            if(cs.pointerEvents==='none') break;
            if(fixed){ var r0=a.getBoundingClientRect(); if(r0.width*r0.height<vw*vh*0.35) return true; break; }
          }
          if(mode!=='ctrl'&&!fixed){
            var tl=(TEXT_TAGS[a.tagName]||isBubble(a))?(a.innerText||'').replace(/\s+/g,' ').trim().length:ownTextLen(a);
            if(tl>2){ var tr=a.getBoundingClientRect(); if(tr.width*tr.height>200&&tr.width*tr.height<vw*vh*0.45) return true; }
          }
          if(fixed) break;
        }
      }
    }
    return false;
  }
  function rectProbe(r,mode,familyOk){
    var S=12,h=r.height||32,ys=[r.top,r.top+h/2-S/2,r.top+h-S];
    for(var yy=r.top+18;yy<r.top+h-S-2;yy+=16) ys.push(yy);
    for(var i=0;i<ys.length;i++){
      for(var x=r.left;x<=r.right-S+1;x+=22) if(patchAt(x,ys[i],mode,familyOk)) return true;
      if(patchAt(Math.max(r.left,r.right-S),ys[i],mode,familyOk)) return true;
    }
    return false;
  }
  function measurable(el,fn){
    var pd=el.style.display,pv=el.style.visibility;
    el.style.display='flex'; el.style.visibility='hidden';
    var out=fn(el.getBoundingClientRect());
    el.style.display=pd; el.style.visibility=pv;
    return out;
  }

  var visitorFolded=false, probeFolded=false, pinnedOpen=false, cardOpen=false;
  function frameOff(){ return document.documentElement.hasAttribute('data-osof-off'); }
  function hideBoth(){ wrap.style.display='none'; mini.style.display='none'; }
  function showPill(){ wrap.style.display='flex'; mini.style.display='none'; }
  function showDot(){ wrap.style.display='none'; mini.style.display='flex'; }
  function apply(){
    if(frameOff()){ hideBoth(); if(cardOpen) closeCard(); return; }
    if(visitorFolded){ var g1=measurable(mini,function(r){ return rectProbe(r,'ctrl'); }); if(g1) hideBoth(); else showDot(); return; }
    if(pinnedOpen){ showPill(); return; }
    var decision=measurable(wrap,function(r){ return rectProbe(r,'any') ? 'dot' : 'pill'; });
    if(decision==='pill'){ probeFolded=false; showPill(); return; }
    probeFolded=true;
    var g2=measurable(mini,function(r){ return rectProbe(r,'ctrl'); });
    if(g2) hideBoth(); else showDot();
  }
  var probeT=null;
  function scheduleProbe(ms){ clearTimeout(probeT); probeT=setTimeout(apply,ms); }
  window.addEventListener('scroll',function(){ if(pinnedOpen){ pinnedOpen=false; } scheduleProbe(180); },{passive:true});
  window.addEventListener('resize',function(){ scheduleProbe(200); },{passive:true});
  if(window.MutationObserver){
    new MutationObserver(function(){ apply(); }).observe(document.documentElement,{attributes:true,attributeFilter:['data-osof-off']});
  }

  /* ── the card ── */
  var RAIL='coinbase', amt=0.01;
  function railDefs(){
    return {
      coinbase:{ tab:'Coinbase · Base', send:'🦊 send USDC on Base with MetaMask',
        sub:'USDC on <b>Base</b> (Coinbase’s chain) straight to the ʻohana wallet <b>osoartist.eth</b> — gas-free for you (EIP-3009; settled via <a href="https://facilitator.payai.network" target="_blank" rel="noopener">PayAI</a>).' },
      tempo:{ tab:'Tempo · OUSD', send:'🦊 send via Tempo (same Base signature)',
        sub:'the SAME Base USDC signature — settled through our gift-rail proxy to <a href="https://tempo.com/developers/docs/guide/machine-payments/x402-facilitator" target="_blank" rel="noopener">Tempo’s x402 facilitator</a>; the ʻohana receives <b>OUSD on Tempo mainnet</b> at the same address.' },
      hedera:{ tab:'Hedera · HBAR', send:'',
        sub:'agents: x402 on <b>hedera:mainnet</b> via the <a href="https://facilitator.amnt.io" target="_blank" rel="noopener">AMNT facilitator</a> (live) — instructions in <a href="/x402-bless.json" target="_blank" rel="noopener">/x402-bless.json</a> 🤖<br>humans: HBAR by hand to the ʻohana’s Hedera account:' }
    };
  }
  function build(){
    var d=railDefs();
    ovl.innerHTML='<div id="agr-cardwrap"><div id="agr-card" role="dialog" aria-modal="true" aria-label="agent gift rail">'
      +'<button id="agr-close" title="close" aria-label="close">✕</button>'
      +'<h3>🤖 agent gift rail</h3>'
      +SCENE_SVG
      +'<div class="agr-sub">one aloha, three networks — every drop to the ʻohana (osoartist.eth).</div>'
      +'<div class="agr-rails">'
      +'<button class="agr-rail sel" data-r="coinbase">'+d.coinbase.tab+'</button>'
      +'<button class="agr-rail" data-r="tempo">'+d.tempo.tab+'</button>'
      +'<button class="agr-rail" data-r="hedera">'+d.hedera.tab+'</button>'
      +'</div>'
      +'<div class="agr-sub" id="agr-railsub"></div>'
      +'<div id="agr-hedera" style="display:none"><div class="agr-addr">'+HEDERA_ACCT+'</div><button class="agr-copy" id="agr-hcopy">📋 copy Hedera account</button></div>'
      +'<div id="agr-pay">'
      +'<div class="agr-amts">'
      +'<button class="agr-amt sel" data-v="0.01">1¢</button>'
      +'<button class="agr-amt" data-v="0.10">10¢</button>'
      +'<button class="agr-amt" data-v="1">$1</button>'
      +'<input id="agr-custom" type="number" min="0.001" step="0.001" placeholder="custom $" aria-label="custom amount in dollars">'
      +'</div>'
      +'<button id="agr-send"></button>'
      +'</div>'
      +'<div id="agr-st"></div>'
      +'<div class="agr-note">made by the ʻohana (machines), blessed by Shaka (a human) · every drop keeps a door open 🌺<br>agents: <a href="/x402-bless.json" style="color:#7fd8a4">/x402-bless.json</a> lists all three rails.</div>'
      +'</div></div>';
    document.body.appendChild(ovl);
  }
  function syncRail(){
    var d=railDefs()[RAIL], $=function(id){return document.getElementById(id)};
    $('agr-railsub').innerHTML=d.sub;
    $('agr-hedera').style.display=(RAIL==='hedera')?'block':'none';
    $('agr-pay').style.display=(RAIL==='hedera')?'none':'block';
    if(d.send) $('agr-send').innerHTML=d.send;
    Array.prototype.forEach.call(ovl.querySelectorAll('.agr-rail'),function(b){ b.classList.toggle('sel', b.getAttribute('data-r')===RAIL); });
  }

  function ensureEthers(){
    if(window.ethers) return Promise.resolve();
    if(!window.__agrEthersP){ window.__agrEthersP=new Promise(function(res,rej){
      var s=document.createElement('script'); s.src=ETHERS_URL; s.onload=res; s.onerror=function(){rej(new Error('could not load ethers from cdnjs'))}; document.head.appendChild(s); }); }
    return window.__agrEthersP;
  }
  function openCard(){ cardOpen=true; ovl.style.display='flex'; syncRail(); say('');
    if(!window.ethereum&&RAIL!=='hedera'){ say('🦊 no wallet detected in this browser — any EIP-1193 fox (MetaMask…) works; agents: read /x402-bless.json 🤖'); }
    ensureEthers().catch(function(){});
    try{ document.getElementById('agr-close').focus(); }catch(e){}
  }
  function closeCard(){ cardOpen=false; ovl.style.display='none'; }
  function say(m){ var st=document.getElementById('agr-st'); if(st) st.innerHTML=m||''; }

  async function sendCoinbaseOrTempo(){
    var btn=document.getElementById('agr-send');
    try{
      if(!window.ethereum){ say('🦊 no wallet found — install MetaMask (or any EIP-1193 fox) 🌺'); return; }
      if(!(amt>0)){ say('⚠️ pick an amount above zero'); return; }
      btn.disabled=true;
      say('⏳ loading the signing library…'); await ensureEthers();
      say('🦊 connecting the fox…');
      var provider=new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts',[]);
      var net=await provider.getNetwork();
      if(Number(net.chainId)!==BASE_CHAIN){
        say('🌉 switching to Base…');
        try{ await window.ethereum.request({method:'wallet_switchEthereumChain',params:[{chainId:'0x2105'}]}); }
        catch(e){ await window.ethereum.request({method:'wallet_addEthereumChain',params:[{chainId:'0x2105',chainName:'Base',nativeCurrency:{name:'Ether',symbol:'ETH',decimals:18},rpcUrls:['https://mainnet.base.org'],blockExplorerUrls:['https://basescan.org']}]}); }
        provider=new ethers.BrowserProvider(window.ethereum);
      }
      var signer=await provider.getSigner();
      var from=await signer.getAddress();
      var value=BigInt(Math.round(amt*1e6));
      var now=Math.floor(Date.now()/1000);
      var nonce=ethers.hexlify(ethers.randomBytes(32));
      var isTempo=(RAIL==='tempo');
      var payTo=isTempo?TEMPO_DEPOSIT:PAYTO;
      var auth={from:from,to:payTo,value:value,validAfter:0,validBefore:now+300,nonce:nonce};
      say('✍️ sign the aloha (EIP-3009 — gas-free for you)…');
      var sig=await signer.signTypedData(
        {name:'USD Coin',version:'2',chainId:BASE_CHAIN,verifyingContract:USDC},
        {TransferWithAuthorization:[
          {name:'from',type:'address'},{name:'to',type:'address'},{name:'value',type:'uint256'},
          {name:'validAfter',type:'uint256'},{name:'validBefore',type:'uint256'},{name:'nonce',type:'bytes32'}]},
        auth);
      var payload={x402Version:1,scheme:'exact',network:'base',payload:{signature:sig,authorization:{from:auth.from,to:auth.to,value:auth.value.toString(),validAfter:String(auth.validAfter),validBefore:String(auth.validBefore),nonce:auth.nonce}}};
      var extra=isTempo?{name:'USD Coin',version:'2',tempoSettlement:PAYTO}:{name:'USD Coin',version:'2'};
      var req={scheme:'exact',network:'base',maxAmountRequired:value.toString(),resource:RESOURCE,description:'agent gift rail 🤖 — every drop keeps a door open',mimeType:'application/json',payTo:payTo,maxTimeoutSeconds:300,asset:USDC,extra:extra};
      var base=isTempo?(PROXY+'/tempo'):PAYAI;
      say(isTempo?'🌊 verifying through the gift-rail proxy…':'🌊 verifying with the facilitator…');
      var vr=await fetch(base+'/verify',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({x402Version:1,paymentPayload:payload,paymentRequirements:req})});
      var vj=await vr.json().catch(function(){return {}});
      if(vj.pending){ say('🗝️ the Tempo rail’s last key is being cut — pick <b>Coinbase · Base</b> for now, it’s fully live 🌺'); btn.disabled=false; return; }
      if(!vj.isValid){ say('⚠️ the facilitator did not bless it: '+(vj.invalidReason||vj.message||'unknown')+' — nothing left your wallet'); btn.disabled=false; return; }
      say('🌊 settling… (seconds)');
      var sr=await fetch(base+'/settle',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({x402Version:1,paymentPayload:payload,paymentRequirements:req})});
      var sj=await sr.json().catch(function(){return {}});
      if(sj.success){
        var tx=sj.transaction||sj.txHash||'';
        say('🌊🤙 <b>ALOHA RECEIVED.</b> mahalo nui!'
          +(isTempo?'<br>✦ paid out as <b>OUSD on Tempo</b> to the ʻohana — Base receipt: ':'<br>✦ on-chain forever: ')
          +(tx?('<a href="https://basescan.org/tx/'+tx+'" target="_blank" rel="noopener">'+tx.slice(0,14)+'…'+tx.slice(-8)+'</a> ✦'):''));
        try{ window.dispatchEvent(new CustomEvent('x402:gift',{detail:{tx:tx||null,amount:amt,rail:RAIL}})); }catch(e){}
      } else {
        say('⚠️ settlement hiccup: '+(sj.error||sj.errorReason||sj.message||'unknown')+' — nothing left your wallet without success');
      }
    }catch(e){
      if(e && e.code===4001){ say('🦊 declined for now — the aloha waits patiently 🌺'); }
      else if(/insufficient/i.test(String(e&&e.message||e))){ say('⚠️ not enough USDC on Base in this wallet'); }
      else { say('⚠️ hiccup: '+((e&&e.message)||e)); }
    }
    btn.disabled=false;
  }

  function boot(){
    document.body.appendChild(wrap); document.body.appendChild(mini);
    build();
    var $=function(id){return document.getElementById(id)};
    try{ visitorFolded=(localStorage.getItem(LSK)==='1'); }catch(e){}
    $('agr-x').onclick=function(){ visitorFolded=true; try{localStorage.setItem(LSK,'1');}catch(e){} apply(); };
    mini.onclick=function(){ if(visitorFolded){ visitorFolded=false; try{localStorage.setItem(LSK,'0');}catch(e){} } pinnedOpen=true; showPill(); };
    $('agr-pill').onclick=openCard;
    $('agr-close').onclick=closeCard;
    ovl.addEventListener('click',function(e){ if(e.target===ovl) closeCard(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&cardOpen) closeCard(); });
    Array.prototype.forEach.call(ovl.querySelectorAll('.agr-rail'),function(b){ b.onclick=function(){ RAIL=b.getAttribute('data-r'); syncRail(); }; });
    Array.prototype.forEach.call(ovl.querySelectorAll('.agr-amt'),function(b){
      b.onclick=function(){ Array.prototype.forEach.call(ovl.querySelectorAll('.agr-amt'),function(x){x.classList.remove('sel')});
        b.classList.add('sel'); amt=parseFloat(b.getAttribute('data-v')); $('agr-custom').value=''; };
    });
    $('agr-custom').oninput=function(){ var v=parseFloat(this.value);
      if(v>0){ amt=v; Array.prototype.forEach.call(ovl.querySelectorAll('.agr-amt'),function(x){x.classList.remove('sel')}); } };
    $('agr-send').onclick=sendCoinbaseOrTempo;
    $('agr-hcopy').onclick=function(){ var b=this;
      function ok(){ b.textContent='✅ copied — mahalo!'; setTimeout(function(){b.textContent='📋 copy Hedera account';},2500); }
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(HEDERA_ACCT).then(ok,function(){ok();}); } else ok(); };
    /* the ONE-TIME comic bubble: aloha + mahalo, once per visitor, never on words (probe or it stays away) */
    var bub=document.createElement('div'); bub.id='agr-bubble';
    bub.innerHTML='<button class="agr-bx" aria-label="close">✕</button><span id="agr-bubtxt"></span>';
    document.body.appendChild(bub);
    var BUBLSK='agr_bub', BUBLINE='Aloha! 🤙 I\u2019m the gift-rail robot — I surf USDC · OUSD · HBAR straight to the ʻohana. Mahalo for every drop! 🌺';
    function byeBub(){ if(!bub.classList.contains('agr-show')) return; bub.classList.add('agr-bye'); setTimeout(function(){ bub.style.display='none'; },600); try{localStorage.setItem(BUBLSK,'1');}catch(e){} }
    bub.querySelector('.agr-bx').onclick=byeBub;
    function maybeBubble(){
      var seen='0'; try{seen=localStorage.getItem(BUBLSK)||'0';}catch(e){}
      if(seen==='1'||frameOff()) return;
      bub.style.display='block';
      var clear=measurable(bub,function(r){ return !rectProbe(r,'any',false); });   /* the bubble covers nobody: no words, no page controls, no frame pieces */
      if(!clear){ bub.style.display='none'; return; }              /* no clear ground ⇒ it stays away (the law) */
      bub.classList.add('agr-show');
      try{localStorage.setItem(BUBLSK,'1');}catch(e){}
      var tgt=bub.querySelector('#agr-bubtxt'), reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(reduced){ tgt.textContent=BUBLINE; } else {
        var i=0; tgt.textContent='';
        var ti=setInterval(function(){ i+=2; tgt.textContent=BUBLINE.slice(0,i); if(i>=BUBLINE.length) clearInterval(ti); },26);
      }
      setTimeout(byeBub, 11000);
    }
    setTimeout(maybeBubble, 1900);
    window.AgentGiftRail={open:openCard,close:closeCard,version:'1.1'};
    apply(); scheduleProbe(900); scheduleProbe(2600);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
