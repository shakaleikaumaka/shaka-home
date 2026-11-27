/* agent-gift-rail.js v1.0 — 🤖 agent gift rail (27 Nov 2026, Shaka: "replace the flower button with the x402 on
   coinbase, tempo, and hedera fully wired, and show it as 'agent gift rail'").
   One small pill top-right (where the passport flower sat) → the three-rail card:
     · Coinbase · Base — USDC EIP-3009, gas-free for the giver, settled by PayAI → osoartist.eth (0x2596…c934)
     · Tempo · OUSD — the SAME Base USDC signature, settled via our gift-rail proxy → Tempo's x402 facilitator
       → paid out as OUSD on Tempo mainnet to the same ʻohana address (chain 4217)
     · Hedera · HBAR — agents settle x402 on hedera:mainnet via the AMNT facilitator (live, keyless like PayAI);
       humans send HBAR by hand to the ʻohana's Hedera account 0.0.11347291
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
  '@media (max-width:520px){#agr-pill{font-size:11px;padding:6px 10px}}'
  ].join('\n');
  document.head.appendChild(css);

  var wrap=document.createElement('div'); wrap.id='agr-wrap';
  wrap.innerHTML='<button id="agr-pill" aria-haspopup="dialog" aria-label="agent gift rail — x402 on coinbase, tempo, and hedera">🤖 agent gift rail</button><button id="agr-x" title="tuck away" aria-label="tuck away">✕</button>';
  var mini=document.createElement('button'); mini.id='agr-mini'; mini.title='agent gift rail'; mini.setAttribute('aria-label','agent gift rail — show the button'); mini.textContent='🤖';
  var ovl=document.createElement('div'); ovl.id='agr-ovl';

  /* ── NO COVERED TEXT probes (same law as x402-tip.js v2.0 / frames core) ── */
  var TEXT_TAGS={A:1,P:1,SPAN:1,LI:1,H1:1,H2:1,H3:1,H4:1,H5:1,H6:1,BUTTON:1,LABEL:1,TD:1,TH:1,SUMMARY:1,FIGCAPTION:1,BLOCKQUOTE:1,Q:1,CITE:1};
  function ownEl(a){ return wrap.contains(a)||mini.contains(a)||ovl.contains(a); }
  function isBubble(a){ try{ return !!(a.matches&&a.matches('[class*="bubble"],[class*="caption"],[class*="speech"],[class*="balloon"],.cap,.kaaak,blockquote,figcaption,q,cite')); }catch(e){ return false; } }
  function ownTextLen(a){ var n=0,c=a.childNodes; for(var i=0;i<c.length;i++) if(c[i].nodeType===3) n+=(c[i].nodeValue||'').replace(/\s+/g,' ').trim().length; return n; }
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
          if(a.id==='oso-frames'||(a.closest&&a.closest('#oso-frames'))) break;      // the frame is family — it folds itself
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
  function rectProbe(r,mode){
    var S=12,h=r.height||32,ys=[r.top,r.top+h/2-S/2,r.top+h-S];
    for(var yy=r.top+18;yy<r.top+h-S-2;yy+=16) ys.push(yy);
    for(var i=0;i<ys.length;i++){
      for(var x=r.left;x<=r.right-S+1;x+=22) if(patchAt(x,ys[i],mode)) return true;
      if(patchAt(Math.max(r.left,r.right-S),ys[i],mode)) return true;
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
    window.AgentGiftRail={open:openCard,close:closeCard,version:'1.0'};
    apply(); scheduleProbe(900); scheduleProbe(2600);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
