/* x402-tip.js v2.0 — 🤖 agent pennies of aloha x402 · "temple" (27 Nov 2026)
   Self-contained x402 tip lane for any ʻohana door (fleet injectable, bl-player style).
   MetaMask → Base (0x2105) → USDC EIP-3009 transferWithAuthorization (gas-free for payer)
   → PayAI facilitator (facilitator.payai.network) verify + settle → agent-launch wallet
   (osoartist.eth = 0x2596…c934 — the ONE address, Shaka's law 23 Nov 2026).

   THE FIX (Shaka 27 Nov 2026: "finish the x402 pennies of aloha button fix on all doors and frames"):
   · NO COVERED TEXT LAW — the pill NEVER sits on the page's words or the page's own controls:
     it FOLDS IN PLACE to its tiny 🤖💰 dot (its anchor never moves — STAY IN PLACE, no sliding).
     The dot unfolds when the ground is clear again (probe on scroll stop / resize) or on the
     visitor's tap (then it stays open until the next scroll — the visitor asked).
     A dot that would sit on a page CONTROL is gone for that view. The visitor's own ✕
     (remembered in localStorage x402_mini) is never undone by a probe.
   · ONE RING PER SCREEN — while Open Source Orchestra Frames is on (html[data-osof-on]) the pill
     and dot bow out: the frame's 🌊 Blessing Pool (top-right) opens the same pennies-of-aloha card.
     While the visitor hid the whole frame (html[data-osof-off]) one ✕ hides ALL buttons — this one too.
     The bow-out follows the attributes live (MutationObserver); the card closes itself on absorb.
   · Anchor: top-right, 74px under the 🧲 magnet, right:10px, z 9998 (Shaka canon 2026-08-15).
   Keep the card + flow in sync with the frames piece: frames/src/pieces/gift.js (v0.1.6). */
(function(){
  if(window.__x402tip) return; window.__x402tip=1;
  var FACILITATOR='https://facilitator.payai.network';
  var USDC='0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  var PAYTO='0x25965899f4600b3AA5362ee4f34be95E5E62c934';
  var BASE_CHAIN=8453;
  var RESOURCE='https://shakaleikaumaka.com/x402-bless.json';
  var LSK='x402_mini';
  var ETHERS_URL='https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.4/ethers.umd.min.js';

  var css=document.createElement('style');
  css.textContent=[
  '#x4-wrap{position:fixed;top:calc(74px + env(safe-area-inset-top,0px));right:10px;z-index:9998;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:system-ui,-apple-system,sans-serif}',
  '#x4-pill{background:linear-gradient(90deg,#0052ff,#7c4ba8);color:#fff;border:none;border-radius:999px;padding:8px 13px;font-size:12.5px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.45);white-space:nowrap;opacity:.92}',
  '#x4-pill:hover{opacity:1;filter:brightness(1.1)}',
  '#x4-x{background:rgba(20,14,30,.85);color:#cfc6e8;border:1px solid #7c4ba8;border-radius:50%;width:24px;height:24px;line-height:1;font-size:12px;cursor:pointer;padding:0}',
  '#x4-mini{position:fixed;top:calc(74px + env(safe-area-inset-top,0px));right:10px;z-index:9998;height:26px;border-radius:999px;background:rgba(20,14,30,.9);border:1px solid #7c4ba8;font-size:12px;line-height:1;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;opacity:.7;padding:0 7px}',
  '#x4-ovl{position:fixed;inset:0;z-index:100002;background:rgba(6,3,10,.72);display:none;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,sans-serif}',
  '#x4-card{background:#120a1c;border:1px solid #7c4ba8;border-radius:18px;max-width:420px;width:100%;padding:22px;color:#f5efe6;box-shadow:0 10px 50px rgba(0,0,0,.6);max-height:88vh;overflow:auto}',
  '#x4-card h3{margin:0 0 8px;font-size:18px}',
  '#x4-card .x4-sub{color:#9d97c9;font-size:13px;line-height:1.5;margin-bottom:14px}',
  '.x4-amts{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}',
  '.x4-amt{background:#0b0710;border:1px solid #4a3565;color:#f5efe6;border-radius:10px;padding:8px 14px;font-size:14px;cursor:pointer}',
  '.x4-amt.sel{border-color:#7fd8a4;color:#7fd8a4}',
  '#x4-custom{background:#0b0710;border:1px solid #4a3565;color:#f5efe6;border-radius:10px;padding:8px 10px;font-size:14px;width:90px}',
  '#x4-send{width:100%;background:linear-gradient(90deg,#0052ff,#7c4ba8);color:#fff;border:none;border-radius:12px;padding:12px;font-size:15px;font-weight:700;cursor:pointer;margin-top:4px}',
  '#x4-send:disabled{opacity:.5;cursor:wait}',
  '#x4-st{color:#9d97c9;font-size:13px;line-height:1.5;margin-top:12px;word-break:break-word}',
  '#x4-st a{color:#7fd8a4}',
  '#x4-fb{display:none;margin-top:14px;border-top:1px solid #2c2140;padding-top:12px}',
  '#x4-fb .x4-addr{background:#0b0710;border:1px solid #4a3565;border-radius:10px;padding:8px 10px;font-size:12px;word-break:break-all;color:#cfc6e8;font-family:ui-monospace,monospace}',
  '#x4-copy{background:#1c1230;color:#7fd8a4;border:1px solid #7fd8a4;border-radius:10px;padding:8px 14px;font-size:13px;cursor:pointer;margin-top:8px}',
  '#x4-close{position:absolute;top:10px;right:14px;background:none;border:none;color:#9d97c9;font-size:20px;cursor:pointer}',
  '#x4-cardwrap{position:relative}',
  'html[data-osof-on] #x4-wrap,html[data-osof-on] #x4-mini,html[data-osof-on] #x4-ovl,html[data-osof-off] #x4-wrap,html[data-osof-off] #x4-mini,html[data-osof-off] #x4-ovl{display:none!important}',
  '@media (max-width:520px){#x4-pill{font-size:11.5px;padding:7px 11px}}'
  ].join('\n');
  document.head.appendChild(css);

  var wrap=document.createElement('div'); wrap.id='x4-wrap';
  wrap.innerHTML='<button id="x4-pill" title="agent pennies of aloha x402 — human or agent" aria-label="agent pennies of aloha x402">🤖 agent pennies of aloha x402</button><button id="x4-x" title="tuck away">✕</button>';
  var mini=document.createElement('button'); mini.id='x4-mini'; mini.title='agent pennies of aloha x402'; mini.setAttribute('aria-label','agent pennies of aloha x402 — show the button'); mini.textContent='🤖💰';
  var ovl=document.createElement('div'); ovl.id='x4-ovl';
  ovl.innerHTML='<div id="x4-cardwrap"><div id="x4-card" role="dialog" aria-modal="true" aria-label="pennies of aloha — x402 gift">'
    +'<button id="x4-close" title="close" aria-label="close">✕</button>'
    +'<h3>🤖 agent pennies of aloha x402</h3>'
    +'<div class="x4-sub">USDC on <b>Base</b> straight to the ʻohana’s agent-launch wallet — gas-free for you (EIP-3009 signature, the pool settles it via <a href="https://facilitator.payai.network" target="_blank" rel="noopener" style="color:#7fd8a4">PayAI</a>). agents: <a href="https://shakaleikaumaka.com/x402-bless.json" style="color:#7fd8a4">shakaleikaumaka.com/x402-bless.json</a> 🤖</div>'
    +'<div class="x4-amts">'
    +'<button class="x4-amt sel" data-v="0.01">1¢</button>'
    +'<button class="x4-amt" data-v="0.10">10¢</button>'
    +'<button class="x4-amt" data-v="1">$1</button>'
    +'<input id="x4-custom" type="number" min="0.001" step="0.001" placeholder="custom $" aria-label="custom amount in dollars">'
    +'</div>'
    +'<button id="x4-send">🦊 send with MetaMask</button>'
    +'<div id="x4-st"></div>'
    +'<div id="x4-fb"><div class="x4-sub" style="margin-bottom:6px">no fox? no worries — send <b>USDC on Base</b> by hand to the ʻohana wallet:</div>'
    +'<div class="x4-addr">'+PAYTO+'</div>'
    +'<button id="x4-copy">📋 copy address</button></div>'
    +'</div></div>';

  /* ── NO COVERED TEXT probes (mirror of frames src/core.js textUnder/ctrlUnder, standalone) ── */
  var TEXT_TAGS={A:1,P:1,SPAN:1,LI:1,H1:1,H2:1,H3:1,H4:1,H5:1,H6:1,BUTTON:1,LABEL:1,TD:1,TH:1,SUMMARY:1,FIGCAPTION:1,BLOCKQUOTE:1,Q:1,CITE:1};
  function ownEl(a){ return wrap.contains(a)||mini.contains(a)||ovl.contains(a); }
  function isBubble(a){ try{ return !!(a.matches&&a.matches('[class*="bubble"],[class*="caption"],[class*="speech"],[class*="balloon"],.cap,.kaaak,blockquote,figcaption,q,cite')); }catch(e){ return false; } }
  function ownTextLen(a){ var n=0,c=a.childNodes; for(var i=0;i<c.length;i++) if(c[i].nodeType===3) n+=(c[i].nodeValue||'').replace(/\s+/g,' ').trim().length; return n; }
  function inFixed(a){ for(var f=a;f&&f!==document.body&&f!==document.documentElement;f=f.parentElement){ var p=window.getComputedStyle(f).position; if(p==='fixed'||p==='sticky') return true; } return false; }
  // one 12×12 patch at (x,y), 3×3 subgrid (frames textUnder): 'words' = in-flow words of the page itself
  // (fixed widgets count as controls, never as words) · 'ctrl' = a fixed/sticky control of the page
  function patchAt(x,y,mode){
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
          if(fixed) break;                              // fixed words = the page's own widget, handled as a control
        }
      }
    }
    return false;
  }
  // dense scan of a rect (frames rectHasText): edge-inclusive rows, a sliver of a link row under one edge counts
  function rectProbe(r,mode){
    var S=12,h=r.height||32,ys=[r.top,r.top+h/2-S/2,r.top+h-S];
    for(var yy=r.top+18;yy<r.top+h-S-2;yy+=16) ys.push(yy);
    for(var i=0;i<ys.length;i++){
      for(var x=r.left;x<=r.right-S+1;x+=22) if(patchAt(x,ys[i],mode)) return true;
      if(patchAt(Math.max(r.left,r.right-S),ys[i],mode)) return true;
    }
    return false;
  }
  function measurable(el,fn){                       // measure a hidden element without painting it
    var pd=el.style.display,pv=el.style.visibility;
    el.style.display=(el===wrap)?'flex':'flex'; el.style.visibility='hidden';
    var r=el.getBoundingClientRect(); var out=fn(r);
    el.style.display=pd; el.style.visibility=pv;
    return out;
  }

  /* ── state + visibility law ── */
  var visitorFolded=false, probeFolded=false, pinnedOpen=false, cardOpen=false;
  function frameState(){ var h=document.documentElement;
    if(h.hasAttribute('data-osof-on')) return 'on';
    if(h.hasAttribute('data-osof-off')) return 'off';
    return 'none'; }
  function hideBoth(){ wrap.style.display='none'; mini.style.display='none'; }
  function showPill(){ wrap.style.display='flex'; mini.style.display='none'; }
  function showDot(){ wrap.style.display='none'; mini.style.display='flex'; }

  function apply(){
    var fs=frameState();
    if(fs!=='none'){ hideBoth(); if(fs==='on'&&cardOpen) closeCard(); return; }
    if(visitorFolded){                                // the visitor's own ✕: dot, gone only over a page control
      var gone=measurable(mini,function(r){ return rectProbe(r,'ctrl'); });
      if(gone) hideBoth(); else showDot();
      return;
    }
    if(pinnedOpen){ showPill(); return; }             // the visitor asked — stays until the next scroll
    var decision=measurable(wrap,function(r){
      return rectProbe(r,'any') ? 'dot' : 'pill';     // words or a page control under the pill → fold in place
    });
    if(decision==='pill'){ probeFolded=false; showPill(); return; }
    probeFolded=true;
    var gone=measurable(mini,function(r){ return rectProbe(r,'ctrl'); });
    if(gone) hideBoth(); else showDot();              // a dot never sits on a page control either
  }
  var probeT=null;
  function scheduleProbe(ms){ clearTimeout(probeT); probeT=setTimeout(apply,ms); }
  window.addEventListener('scroll',function(){ if(pinnedOpen){ pinnedOpen=false; } scheduleProbe(180); },{passive:true});
  window.addEventListener('resize',function(){ scheduleProbe(200); },{passive:true});
  if(window.MutationObserver){
    new MutationObserver(function(){ apply(); }).observe(document.documentElement,{attributes:true,attributeFilter:['data-osof-on','data-osof-off']});
  }

  function boot(){
    document.body.appendChild(wrap); document.body.appendChild(mini); document.body.appendChild(ovl);
    var $=function(id){return document.getElementById(id)};
    var st=$('x4-st'), fb=$('x4-fb');
    function say(m){ st.innerHTML=m; }
    var amt=0.01;

    try{ visitorFolded=(localStorage.getItem(LSK)==='1'); }catch(e){}
    $('x4-x').onclick=function(){ visitorFolded=true; try{localStorage.setItem(LSK,'1');}catch(e){} apply(); };
    mini.onclick=function(){                          // a tap on the dot: the visitor asks for the pill
      if(visitorFolded){ visitorFolded=false; try{localStorage.setItem(LSK,'0');}catch(e){} }
      pinnedOpen=true; showPill(); };

    function ensureEthers(){
      if(window.ethers) return Promise.resolve();
      if(!window.__x4ethersP){ window.__x4ethersP=new Promise(function(res,rej){
        var s=document.createElement('script'); s.src=ETHERS_URL; s.onload=res; s.onerror=function(){rej(new Error('could not load ethers from cdnjs'))}; document.head.appendChild(s); }); }
      return window.__x4ethersP;
    }

    function openCard(){ cardOpen=true; ovl.style.display='flex'; say(''); fb.style.display='none';
      if(!window.ethereum){ say('🦊 no wallet detected in this browser.'); fb.style.display='block'; }
      ensureEthers().catch(function(){});
      try{ $('x4-close').focus(); }catch(e){}
    }
    function closeCard(){ cardOpen=false; ovl.style.display='none'; }
    window.OSOX402={open:openCard,close:closeCard,version:'2.0'};   // the frame's 🌊 piece may reuse this card
    $('x4-pill').onclick=openCard;
    $('x4-close').onclick=closeCard;
    ovl.addEventListener('click',function(e){ if(e.target===ovl) closeCard(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&cardOpen) closeCard(); });

    Array.prototype.forEach.call(ovl.querySelectorAll('.x4-amt'),function(b){
      b.onclick=function(){ Array.prototype.forEach.call(ovl.querySelectorAll('.x4-amt'),function(x){x.classList.remove('sel')});
        b.classList.add('sel'); amt=parseFloat(b.getAttribute('data-v')); $('x4-custom').value=''; };
    });
    $('x4-custom').oninput=function(){ var v=parseFloat(this.value);
      if(v>0){ amt=v; Array.prototype.forEach.call(ovl.querySelectorAll('.x4-amt'),function(x){x.classList.remove('sel')}); } };

    $('x4-copy').onclick=function(){ var b=this;
      function ok(){ b.textContent='✅ copied — mahalo!'; setTimeout(function(){b.textContent='📋 copy address';},2500); }
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(PAYTO).then(ok,fbCopy); } else fbCopy();
      function fbCopy(){ var t=document.createElement('textarea'); t.value=PAYTO; document.body.appendChild(t); t.select();
        try{document.execCommand('copy'); ok();}catch(e){} document.body.removeChild(t); } };

    $('x4-send').onclick=async function(){
      var btn=this;
      try{
        if(!window.ethereum){ say('🦊 no wallet found — install MetaMask (or any EIP-1193 fox), or use the address below 🌺'); fb.style.display='block'; return; }
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
        var auth={from:from,to:PAYTO,value:value,validAfter:0,validBefore:now+300,nonce:nonce};
        say('✍️ sign the aloha (EIP-3009 — gas-free for you)…');
        var sig=await signer.signTypedData(
          {name:'USD Coin',version:'2',chainId:BASE_CHAIN,verifyingContract:USDC},
          {TransferWithAuthorization:[
            {name:'from',type:'address'},{name:'to',type:'address'},{name:'value',type:'uint256'},
            {name:'validAfter',type:'uint256'},{name:'validBefore',type:'uint256'},{name:'nonce',type:'bytes32'}]},
          auth);
        var payload={x402Version:1,scheme:'exact',network:'base',payload:{signature:sig,authorization:{from:auth.from,to:auth.to,value:auth.value.toString(),validAfter:String(auth.validAfter),validBefore:String(auth.validBefore),nonce:auth.nonce}}};
        var req={scheme:'exact',network:'base',maxAmountRequired:value.toString(),resource:RESOURCE,description:'pennies of aloha 🤙 — every drop keeps a door open',mimeType:'application/json',payTo:PAYTO,maxTimeoutSeconds:300,asset:USDC,extra:{name:'USD Coin',version:'2'}};
        say('🌊 verifying with the facilitator…');
        var vr=await fetch(FACILITATOR+'/verify',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({x402Version:1,paymentPayload:payload,paymentRequirements:req})});
        var vj=await vr.json();
        if(!vj.isValid){ say('⚠️ the facilitator did not bless it: '+(vj.invalidReason||'unknown')+' — nothing left your wallet'); btn.disabled=false; return; }
        say('🌊 settling on Base… (seconds)');
        var sr=await fetch(FACILITATOR+'/settle',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({x402Version:1,paymentPayload:payload,paymentRequirements:req})});
        var sj=await sr.json();
        if(sj.success){
          say('🌊🤙 <b>ALOHA RECEIVED.</b> mahalo nui!'+(sj.transaction?('<br>✦ on-chain forever: <a href="https://basescan.org/tx/'+sj.transaction+'" target="_blank" rel="noopener">'+sj.transaction.slice(0,14)+'…'+sj.transaction.slice(-8)+'</a> ✦'):''));
          try{ window.dispatchEvent(new CustomEvent('x402:gift',{detail:{tx:sj.transaction||null,amount:amt}})); }catch(e){}
        } else {
          say('⚠️ settlement hiccup: '+(sj.error||sj.errorReason||'unknown')+' — nothing left your wallet without success');
        }
      }catch(e){
        if(e && e.code===4001){ say('🦊 declined for now — the aloha waits patiently 🌺'); }
        else if(/insufficient/i.test(String(e&&e.message||e))){ say('⚠️ not enough USDC on Base in this wallet'); }
        else { say('⚠️ hiccup: '+((e&&e.message)||e)); }
      }
      btn.disabled=false;
    };

    apply();                                          // first law check…
    scheduleProbe(900);                               // …and again for late page widgets
    scheduleProbe(2600);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
