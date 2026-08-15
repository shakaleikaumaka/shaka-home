/* x402-tip.js v1.1 — 🤖💰 agent aloha x402 (Shaka canon 2026-08-15: circle button below the 🧲 magnet, top-right; frees the bottom-left lane so Devcon tickets never overlap on mobile)
   Self-contained x402 tip lane for any ʻohana door (fleet injectable, bl-player style).
   MetaMask → Base (0x2105) → USDC EIP-3009 transferWithAuthorization (gas-free for payer)
   → PayAI facilitator (facilitator.payai.network) verify + settle → agent-launch wallet.
   Corner Law: radio bar owns the floor (~12px). Chat pills own bottom-RIGHT 88px.
   This pill lives bottom-LEFT 88px, z 99997. ✕ → tiny 💸 note (localStorage x402_mini). */
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
  '#x4-pill{width:44px;height:44px;border-radius:50%;background:rgba(20,18,45,.85);border:1px solid rgba(124,75,168,.55);color:#fff;font-size:15px;line-height:1;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4);opacity:.65;transition:opacity .3s;display:flex;align-items:center;justify-content:center;padding:0}',
  '#x4-pill:hover{opacity:1}',
  '#x4-x{background:rgba(20,14,30,.85);color:#cfc6e8;border:1px solid #7c4ba8;border-radius:50%;width:24px;height:24px;line-height:1;font-size:12px;cursor:pointer;padding:0}',
  '#x4-mini{position:fixed;top:calc(74px + env(safe-area-inset-top,0px));right:10px;z-index:9998;width:26px;height:26px;border-radius:50%;background:rgba(20,14,30,.9);border:1px solid #7c4ba8;font-size:13px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;opacity:.6}',
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
  '@media (max-width:520px){#x4-pill{width:40px;height:40px;font-size:14px}}'
  ].join('\n');
  document.head.appendChild(css);

  var wrap=document.createElement('div'); wrap.id='x4-wrap';
  wrap.innerHTML='<button id="x4-pill" title="agent aloha x402 — pennies of aloha, human or agent" aria-label="agent aloha x402">🤖💰</button><button id="x4-x" title="tuck away">✕</button>';
  var mini=document.createElement('button'); mini.id='x4-mini'; mini.title='agent aloha x402'; mini.textContent='💰';
  var ovl=document.createElement('div'); ovl.id='x4-ovl';
  ovl.innerHTML='<div id="x4-cardwrap"><div id="x4-card">'
    +'<button id="x4-close" title="close">✕</button>'
    +'<h3>🤖💰 agent aloha x402</h3>'
    +'<div class="x4-sub">USDC on <b>Base</b> straight to the ʻohana’s agent-launch wallet — gas-free for you (EIP-3009 signature, the pool settles it via <a href="https://facilitator.payai.network" target="_blank" rel="noopener" style="color:#7fd8a4">PayAI</a>). agents: <a href="/x402-bless.json" style="color:#7fd8a4">/x402-bless.json</a> 🤖</div>'
    +'<div class="x4-amts">'
    +'<button class="x4-amt sel" data-v="0.01">1¢</button>'
    +'<button class="x4-amt" data-v="0.10">10¢</button>'
    +'<button class="x4-amt" data-v="1">$1</button>'
    +'<input id="x4-custom" type="number" min="0.001" step="0.001" placeholder="custom $">'
    +'</div>'
    +'<button id="x4-send">🦊 send with MetaMask</button>'
    +'<div id="x4-st"></div>'
    +'<div id="x4-fb"><div class="x4-sub" style="margin-bottom:6px">no fox? no worries — send <b>USDC on Base</b> by hand to the ʻohana wallet:</div>'
    +'<div class="x4-addr">'+PAYTO+'</div>'
    +'<button id="x4-copy">📋 copy address</button></div>'
    +'</div></div>';

  function boot(){
    document.body.appendChild(wrap); document.body.appendChild(mini); document.body.appendChild(ovl);
    var $=function(id){return document.getElementById(id)};
    var st=$('x4-st'), fb=$('x4-fb');
    function say(m){ st.innerHTML=m; }
    var amt=0.01;

    function setMini(on){ try{localStorage.setItem(LSK,on?'1':'0');}catch(e){}
      wrap.style.display=on?'none':'flex'; mini.style.display=on?'flex':'none'; }
    var m0='0'; try{m0=localStorage.getItem(LSK)||'0';}catch(e){}
    setMini(m0==='1');
    $('x4-x').onclick=function(){ setMini(true); };
    mini.onclick=function(){ setMini(false); };

    function ensureEthers(){
      if(window.ethers) return Promise.resolve();
      if(!window.__x4ethersP){ window.__x4ethersP=new Promise(function(res,rej){
        var s=document.createElement('script'); s.src=ETHERS_URL; s.onload=res; s.onerror=function(){rej(new Error('could not load ethers from cdnjs'))}; document.head.appendChild(s); }); }
      return window.__x4ethersP;
    }

    function openCard(){ ovl.style.display='flex'; say(''); fb.style.display='none';
      if(!window.ethereum){ say('🦊 no wallet detected in this browser.'); fb.style.display='block'; }
      ensureEthers().catch(function(){});
    }
    function closeCard(){ ovl.style.display='none'; }
    $('x4-pill').onclick=openCard;
    $('x4-close').onclick=closeCard;
    ovl.addEventListener('click',function(e){ if(e.target===ovl) closeCard(); });

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
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
