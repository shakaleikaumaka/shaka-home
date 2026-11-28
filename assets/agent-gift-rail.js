/* agent-gift-rail.js v1.3 — 🤖 agent gift rail (27 Nov 2026, Shaka: "replace the flower button with the x402 on
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
   v1.2 (28 Nov 2026 — Shaka: "pressing the wallet button on the x402 gift rail doesn't work" on his phone; "super easy,
   like OpenSea, wallet to wallet"): the dead-end "send with MetaMask" is now the ʻohana wallet connect picker (owh block below):
   detected wallets first (EIP-6963) → on a phone the wallet APP opens by universal link and the card reopens INSIDE it →
   desktop QR → copy → sign-up hook. The money flow (PayAI · Base · USDC · EIP-3009 → osoartist.eth) is unchanged — but the
   wallet now signs the typed data ITSELF (OWH.authorize): no ethers.js, no cdnjs, 506 KB less on a phone.
   Keep in sync with x402-tip.js v2.1 + frames/src/pieces/gift.js (the owh block is byte-identical in all three). */
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
/* owh:begin — ʻohana wallet connect v1.0 · GPL-3.0-or-later · minified by tools/inject-owh.py from owh.js (readable source: Open-Source-Orchestra/frames → src/lib/owh.js). Edit THAT file, never this copy. */
var OWH=function(){var e=window,t=document,n=e.navigator||{},o=n.userAgent||"",i=/iPad|iPhone|iPod/.test(o)||"MacIntel"===n.platform&&n.maxTouchPoints>1,a=/Android/i.test(o),r="osogift",s="https://frames.opensourceorchestra.org/lib/";try{var d=t.currentScript;d&&d.src&&/\/lib\/owh(\.min)?\.js(\?|$)/.test(d.src)&&(s=d.src.replace(/[^\/]*(\?.*)?$/,""))}catch(e){}var l=s+"owh-qr.min.js",h=s+"owh-signup.min.js";function c(e){return e?e.isCoinbaseWallet||e.isCoinbaseBrowser?"Coinbase Wallet":e.isPhantom?"Phantom":e.isTrust||e.isTrustWallet?"Trust Wallet":e.isRainbow?"Rainbow":e.isRabby?"Rabby":e.isMetaMask?"MetaMask":"your wallet":""}function p(){return{mobile:i||a,ios:i,android:a,injected:!!e.ethereum,wallet:c(e.ethereum)}}function u(e){return String(Math.round(1e6*e))}function f(t){var n=function(t,n,o){try{var i=new URL(e.location.href);return i.searchParams.set(r,t+":"+n+":"+(o||"")+":go"),i.toString()}catch(t){return e.location.href}}(t.surface,t.usd,t.rail),o=n.replace(/^https?:\/\//,"");return{url:n,metamask:"https://link.metamask.io/dapp/"+o,coinbase:"https://go.cb-w.com/dapp?cb_url="+encodeURIComponent(n),phantom:"https://phantom.com/ul/browse/"+encodeURIComponent(n)+"?ref="+encodeURIComponent(e.location.origin),trust:a?"https://link.trustwallet.com/open_url?coin_id="+t.chain+"&url="+encodeURIComponent(n):"https://link.trustwallet.com/send?asset=c"+t.chain+"_t"+t.usdc+"&address="+t.payTo+"&amount="+t.usd,eip681:"ethereum:"+t.usdc+"@"+t.chain+"/transfer?address="+t.payTo+"&uint256="+u(t.usd)}}var w={chainId:"0x2105",chainName:"Base",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:["https://mainnet.base.org"],blockExplorerUrls:["https://basescan.org"]};function m(){var t,n=new Uint8Array(32),o="0x";for((e.crypto||e.msCrypto).getRandomValues(n),t=0;t<32;t++)o+=(n[t]<16?"0":"")+n[t].toString(16);return o}function y(e,n,o){var i,a=t.createElement(e);for(i in n||{})!0===n[i]?a.setAttribute(i,""):!1!==n[i]&&null!=n[i]&&a.setAttribute(i,n[i]);return(o||[]).forEach(function(e){null!=e&&a.appendChild("string"==typeof e?t.createTextNode(e):e)}),a}return{version:"1.0",env:p,links:f,pending:function(t){try{var n=new URL(e.location.href),o=n.searchParams.get(r);if(!o)return null;var i=o.split(":");if(i[0]!==t)return null;n.searchParams.delete(r),e.history.replaceState(e.history.state,"",n.pathname+n.search+n.hash);var a=parseFloat(i[1]),s=a>=.001&&a<=1e3;return s||(a=.01),{usd:a,rail:i[2]||"",go:s&&"go"===i[3]&&a<=10}}catch(e){return null}},connect:function(o){!function(){if(!t.getElementById("owh-css")){var e="box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;",n=[];o(".owh",e+"display:block;margin:12px 0 0;color:#f5efe6;text-align:left"),o(".owh *",e),o(".owh .owh-h","margin:14px 0 4px;font:700 14px/1.4 system-ui,-apple-system,sans-serif;color:#f5efe6"),o(".owh .owh-p","margin:0 0 10px;font:12.5px/1.5 system-ui,-apple-system,sans-serif;color:#9d97c9"),o(".owh .owh-go","display:block;width:100%;min-height:50px;border:none;border-radius:12px;padding:12px;background:linear-gradient(90deg,#0052ff,#7c4ba8);color:#fff;font:700 15px system-ui,-apple-system,sans-serif;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:rgba(127,216,164,.28)"),o(".owh .owh-go:disabled,.owh .owh-det:disabled","opacity:.5;cursor:wait"),o(".owh .owh-more","display:block;margin:6px auto 0;min-height:44px;padding:8px 12px;background:none;border:none;color:#9d97c9;font:13px system-ui,-apple-system,sans-serif;text-decoration:underline;cursor:pointer;touch-action:manipulation"),o(".owh .owh-list,.owh .owh-grid","display:grid;gap:8px"),o(".owh .owh-grid","grid-template-columns:1fr 1fr"),o(".owh .owh-b","display:flex;align-items:center;gap:10px;width:100%;min-height:50px;padding:8px 12px;border-radius:12px;background:#0b0710;border:1px solid #4a3565;color:#f5efe6;text-align:left;text-decoration:none;font:600 14px/1.25 system-ui,-apple-system,sans-serif;touch-action:manipulation;-webkit-tap-highlight-color:rgba(127,216,164,.28);cursor:pointer"),o(".owh .owh-b:active,.owh .owh-b:focus-visible","border-color:#7fd8a4;outline:none"),o(".owh .owh-wide","grid-column:1/-1"),o(".owh .owh-i","font-size:20px;line-height:1;flex:none"),o(".owh .owh-b img","width:28px;height:28px;border-radius:7px;flex:none"),o(".owh .owh-b small","display:block;margin-top:2px;font:400 11px/1.3 system-ui,-apple-system,sans-serif;color:#9d97c9"),o(".owh .owh-row","display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"),o(".owh .owh-c","background:#1c1230;color:#7fd8a4;border:1px solid #7fd8a4;border-radius:10px;padding:10px 14px;min-height:44px;font:600 13px system-ui,-apple-system,sans-serif;cursor:pointer;touch-action:manipulation"),o(".owh .owh-n","margin-top:10px;font:13px/1.5 system-ui,-apple-system,sans-serif;color:#cdbce8;word-break:break-word"),o(".owh .owh-n:empty","display:none"),o(".owh .owh-addr","margin-top:10px;background:#0b0710;border:1px solid #4a3565;border-radius:10px;padding:8px 10px;font:12px ui-monospace,monospace;word-break:break-all;color:#cfc6e8"),o(".owh .owh-qr","margin:12px auto 0;width:208px;max-width:100%;padding:10px;background:#fff;border-radius:12px;line-height:0;color:#111;font:13px system-ui,sans-serif"),o(".owh .owh-qr svg","display:block;width:100%;height:auto"),o(".owh .owh-cap","margin:6px 0 0;text-align:center;font:11.5px/1.4 system-ui,-apple-system,sans-serif;color:#9d97c9"),o(".owh [hidden]","display:none!important"),t.head.appendChild(y("style",{id:"owh-css"},[n.join("\n")]))}function o(e,t){n.push(e+"{"+t+"}","#oso-frames "+e+"{"+t+"}")}}();var i=p(),a=o.t||function(e,t){return t},r=[],s=!1,d=!1,u=!1,w=!1,m=!1,b=y("div",{class:"owh"}),g=y("button",{type:"button",class:"owh-go",hidden:!0}),v=y("div",{class:"owh-list",hidden:!0}),x=y("button",{type:"button",class:"owh-more","aria-expanded":"false",hidden:!0},[a("owh.another","use another wallet ▾")]),C=y("div",{class:"owh-pick",hidden:!0}),k=y("div",{class:"owh-n",role:"status","aria-live":"polite"}),T=y("div",{class:"owh-grid"}),E={},S=y("button",{type:"button",class:"owh-c"},[a("owh.copy","📋 copy address")]),_=y("button",{type:"button",class:"owh-c","aria-expanded":"false"},[a("owh.qr","▦ show QR")]),R=y("div",{class:"owh-row"},[S,_]),q=y("div",{class:"owh-addr",hidden:!0},[o.payTo]),A=y("div",{class:"owh-qr",hidden:!0}),P=y("div",{class:"owh-cap",hidden:!0},[a("owh.qrcap","scan with MetaMask · Coinbase Wallet · Trust · Rainbow — USDC on Base, amount filled in")]),I=y("button",{type:"button",class:"owh-more",hidden:!0},[a("owh.qraddr","address only (any wallet)")]);function U(e){k.textContent=e||""}function M(){return{surface:o.surface,usd:o.usd(),rail:o.rail?o.rail():"",usdc:o.usdc,payTo:o.payTo,chain:o.chain}}function L(){var t=r.slice();return e.ethereum&&!t.some(function(t){return t.provider===e.ethereum})&&t.push({info:{name:c(e.ethereum),icon:""},provider:e.ethereum}),t}function D(e){return U(""),o.send(e.provider,e.info)}i.mobile?(C.appendChild(y("div",{class:"owh-h"},[a("owh.title","👛 open the gift in your wallet app")])),C.appendChild(y("div",{class:"owh-p"},[a("owh.sub","tap your wallet — it opens with the gift ready and you confirm inside it. nothing leaves until you do.")])),[["metamask","🦊","MetaMask",1],["coinbase","🔵","Coinbase Wallet",1],["phantom","👻","Phantom",1],["trust","🛡️","Trust Wallet",i.android?1:0],["eip681","👛",a("owh.other","another wallet"),0]].forEach(function(e,n){var o=e[3]?a("owh.gasfree","gas-free · opens the gift inside it"):a("owh.prefilled","USDC send, amount filled in"),i=y("a",{class:"owh-b"+(4===n?" owh-wide":""),rel:"noopener","data-w":e[0]},[y("span",{class:"owh-i","aria-hidden":"true"},[e[1]]),y("span",{},[e[2],y("small",{},[o])])]);i.addEventListener("click",function(){u=!1,setTimeout(function(){u||"visible"!==t.visibilityState||(U(a("owh.nothing","nothing opened? that wallet app may not be installed — pick another, or copy the address below 🌺")),q.hidden=!1)},1800)}),E[e[0]]=i,T.appendChild(i)}),C.appendChild(T),t.addEventListener("visibilitychange",function(){"hidden"===t.visibilityState&&(u=!0)}),e.addEventListener("pagehide",function(){u=!0})):(C.appendChild(y("div",{class:"owh-h"},[a("owh.dtitle","📱 scan with your phone’s wallet")])),C.appendChild(y("div",{class:"owh-p"},[a("owh.dsub","no browser wallet found — open MetaMask, Coinbase Wallet, Trust or Rainbow on your phone and scan; or install a browser wallet and reload.")])));var W=null,B=0;function H(){if(W&&(W.remove(),W=null),!1!==o.hook&&0!==b.getClientRects().length&&!C.hidden){var i,r=e.OWH_SIGNUP;if(!r)return i=H,e.__owhHookP||(e.__owhHookP=new Promise(function(e){var n=t.createElement("script");n.src=h,n.async=!0,n.onload=n.onerror=function(){e()},t.head.appendChild(n)})),void e.__owhHookP.then(function(){e.OWH_SIGNUP&&i()});if(r.href||"function"==typeof r.open){var s=n.connection;"function"!=typeof r.warm||B||s&&(s.saveData||/(^|-)2g$/.test(s.effectiveType||""))||(B=setTimeout(function(){if(B=0,b.getClientRects().length&&!C.hidden)try{r.warm()}catch(e){}},2500));var d=[y("span",{class:"owh-i","aria-hidden":"true"},["✨"]),y("span",{},[r.label||a("owh.signup","no wallet yet? sign up in 10 s"),y("small",{},[r.sub||a("owh.signupsub","email or passkey — no app needed")])])];r.href?W=y("a",{class:"owh-b",href:r.href,rel:"noopener",style:"margin-top:8px"},d):(W=y("button",{type:"button",class:"owh-b",style:"margin-top:8px"},d)).addEventListener("click",function(){r.open({usd:o.usd(),payTo:o.payTo,usdc:o.usdc,chain:o.chain,say:U,use:function(e,t){D({provider:e,info:t||{name:"your new wallet",icon:""}})}})}),C.appendChild(W)}}}function O(){!function(n,o){function i(){n.textContent="(QR unavailable — copy the address instead)"}function a(){try{var t=e.__owhQR(0,"M");t.addData(o),t.make(),n.innerHTML=t.createSvgTag({cellSize:4,margin:0,scalable:!0});var a=n.firstChild;a&&a.setAttribute&&(a.setAttribute("role","img"),a.setAttribute("aria-label","QR code: pay USDC on Base to the ʻohana wallet"))}catch(e){i()}}if(e.__owhQR)return a();n.textContent="…";var r=y("script",{src:l,async:!0});r.onload=a,r.onerror=i,t.head.appendChild(r)}(A,m?o.payTo:f(M()).eip681)}function z(e){if(A.hidden=P.hidden=I.hidden=!(w=null==e?!w:e),_.setAttribute("aria-expanded",w?"true":"false"),w){O();try{A.scrollIntoView({block:"nearest",behavior:"smooth"})}catch(e){}}}function N(){var e=L();v.textContent="",1===e.length?(g.hidden=!1,g.textContent=a("owh.sendwith","👛 send USDC with")+" "+e[0].info.name,v.hidden=!0,x.hidden=!1,C.hidden=!s):e.length>1?(g.hidden=!0,v.hidden=!1,x.hidden=!1,C.hidden=!s,e.forEach(function(e){var t=e.info.icon&&/^data:image\//.test(e.info.icon)?y("img",{src:e.info.icon,alt:""}):y("span",{class:"owh-i","aria-hidden":"true"},["👛"]),n=y("button",{type:"button",class:"owh-b owh-det",disabled:d},[t,y("span",{},[e.info.name,y("small",{},[a("owh.detected","detected in this browser · gas-free")])])]);n.addEventListener("click",function(){D(e)}),v.appendChild(n)})):(g.hidden=!0,v.hidden=!0,x.hidden=!0,C.hidden=!1),x.setAttribute("aria-expanded",s?"true":"false"),x.textContent=s?a("owh.fewer","hide other wallets ▴"):a("owh.another","use another wallet ▾"),g.disabled=d,Array.prototype.forEach.call(v.querySelectorAll("button"),function(e){e.disabled=d});var t,n=f(M());for(t in E)E[t].setAttribute("href",n[t]);H();var o=b.getClientRects().length>0;i.mobile||C.hidden||w||!o?w&&o&&O():z(!0)}C.appendChild(R),C.appendChild(q),C.appendChild(A),C.appendChild(P),C.appendChild(I),_.addEventListener("click",function(){z()}),I.addEventListener("click",function(){I.textContent=(m=!m)?a("owh.qrfull","USDC amount filled in"):a("owh.qraddr","address only (any wallet)"),O()}),S.addEventListener("click",function(){q.hidden=!1,function(e,o){function i(){var n=y("textarea",{readonly:!0,style:"position:fixed;left:-9999px;top:0;opacity:0"});n.value=e,t.body.appendChild(n),n.select();try{t.execCommand("copy"),o()}catch(e){}t.body.removeChild(n)}n.clipboard&&n.clipboard.writeText?n.clipboard.writeText(e).then(o,i):i()}(o.payTo,function(){S.textContent=a("owh.copied","✅ copied — mahalo!"),setTimeout(function(){S.textContent=a("owh.copy","📋 copy address")},2500)})}),x.addEventListener("click",function(){s=!s,N()}),g.addEventListener("click",function(){var e=L();e[0]&&D(e[0])}),b.appendChild(g),b.appendChild(v),b.appendChild(x),b.appendChild(C),b.appendChild(k),e.addEventListener("eip6963:announceProvider",function(e){var t=e&&e.detail;t&&t.info&&t.provider&&"function"==typeof t.provider.request&&(r.some(function(e){return e.provider===t.provider||e.info.uuid===t.info.uuid})||(r.push({info:{uuid:t.info.uuid,name:String(t.info.name||"wallet").slice(0,40),icon:String(t.info.icon||"")},provider:t.provider}),N()))});try{e.dispatchEvent(new e.CustomEvent("eip6963:requestProvider"))}catch(e){}if(N(),e.IntersectionObserver)try{new e.IntersectionObserver(function(e){for(var t=0;t<e.length;t++)if(e[t].isIntersecting)return void N()}).observe(b)}catch(e){}return{el:b,refresh:N,say:U,wallets:L,setBusy:function(e){d=!!e,N()},autostart:function(e){var t=Date.now();!function n(){var o=L();return o.length?(N(),void(e&&e.go&&1===o.length?D(o[0]):U(a("owh.hereyouare","🌺 aloha — you are in your wallet; choose it below to send the gift")))):Date.now()-t<3500?setTimeout(n,120):(s=!0,void N())}()}}},authorize:async function(e,t){var n=t.step||function(){};n("connect");var o=await e.request({method:"eth_requestAccounts"}),i=o&&o[0];if(!i)throw new Error("the wallet gave no account");if(Number(await e.request({method:"eth_chainId"}))!==t.chain){n("switch");try{await e.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x"+t.chain.toString(16)}]})}catch(t){if(t&&4001===t.code)throw t;await e.request({method:"wallet_addEthereumChain",params:[w]})}}var a={from:i,to:t.payTo,value:u(t.usd),validAfter:"0",validBefore:String(Math.floor(Date.now()/1e3)+300),nonce:m()};n("sign");var r={types:{EIP712Domain:[{name:"name",type:"string"},{name:"version",type:"string"},{name:"chainId",type:"uint256"},{name:"verifyingContract",type:"address"}],TransferWithAuthorization:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"value",type:"uint256"},{name:"validAfter",type:"uint256"},{name:"validBefore",type:"uint256"},{name:"nonce",type:"bytes32"}]},primaryType:"TransferWithAuthorization",domain:{name:"USD Coin",version:"2",chainId:t.chain,verifyingContract:t.usdc},message:a};return{from:i,signature:await e.request({method:"eth_signTypedData_v4",params:[i,JSON.stringify(r)]}),authorization:a}},nameOf:c,esc:function(e){return String(null==e?"":e).replace(/[&<>"']/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[e]})},txOf:function(e){return"string"==typeof e&&/^0x[0-9a-fA-F]{64}$/.test(e)?e:null}}}();
/* owh:end */

  var css=document.createElement('style');
  css.textContent=[
  '#agr-wrap{position:fixed;top:calc(14px + env(safe-area-inset-top,0px));right:14px;z-index:9998;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:system-ui,-apple-system,sans-serif}',
  '#agr-pill{background:linear-gradient(90deg,#0a4fd6,#7c4ba8);color:#fff;border:1px solid rgba(127,216,164,.45);border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.45);white-space:nowrap;opacity:.94;letter-spacing:.02em}',
  '#agr-pill:hover{opacity:1;filter:brightness(1.12)}',
  '#agr-x{background:rgba(20,14,30,.85);color:#cfc6e8;border:1px solid #7c4ba8;border-radius:50%;width:22px;height:22px;line-height:1;font-size:11px;cursor:pointer;padding:0}',
  '#agr-mini{position:fixed;top:calc(14px + env(safe-area-inset-top,0px));right:14px;z-index:9998;width:28px;height:28px;border-radius:50%;background:rgba(20,14,30,.9);border:1px solid #7c4ba8;font-size:14px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;opacity:.75;padding:0}',
  '#agr-ovl{position:fixed;inset:0;z-index:100003;background:rgba(6,3,10,.74);display:none;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,sans-serif}',
  '#agr-card{box-sizing:border-box;background:#120a1c;border:1px solid #7c4ba8;border-radius:18px;max-width:430px;width:100%;padding:22px;color:#f5efe6;box-shadow:0 10px 50px rgba(0,0,0,.6);max-height:88vh;max-height:calc(100dvh - 32px);overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}',
  '#agr-card h3{margin:0 0 6px;font-size:18px;padding-right:34px}',
  '#agr-card .agr-sub{color:#9d97c9;font-size:13px;line-height:1.5;margin-bottom:12px}',
  '#agr-card .agr-sub a,#agr-st a{color:#7fd8a4}',
  '.agr-rails{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}',
  '.agr-rail{background:#0b0710;border:1px solid #4a3565;color:#f5efe6;border-radius:10px;padding:8px 12px;font-size:13px;cursor:pointer;font-weight:600}',
  '.agr-rail.sel{border-color:#7fd8a4;color:#7fd8a4}',
  '#agr-card button,#agr-card a{touch-action:manipulation;-webkit-tap-highlight-color:rgba(127,216,164,.28)}',
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
  +'<text x="289" y="49" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="700" font-size="10" fill="#4a3565">every drop — mahalo 🌺</text>'
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
  var RAIL='coinbase', amt=0.01, ui=null;
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
      +'<div id="agr-wallet"></div>'
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
    if(ui) ui.refresh();
    Array.prototype.forEach.call(ovl.querySelectorAll('.agr-rail'),function(b){ b.classList.toggle('sel', b.getAttribute('data-r')===RAIL); });
  }

  function openCard(){ cardOpen=true; ovl.style.display='flex'; syncRail(); say('');
    if(ui){ ui.say(''); ui.refresh(); }
    try{ document.getElementById('agr-close').focus(); }catch(e){}
  }
  function closeCard(){ cardOpen=false; ovl.style.display='none'; }
  function say(m){ var st=document.getElementById('agr-st'); if(st) st.innerHTML=m||''; }

  async function sendCoinbaseOrTempo(wp,info){
    try{
      if(!wp) return;
      if(!(amt>0)){ say('⚠️ pick an amount above zero'); return; }
      if(ui) ui.setBusy(true);
      var isTempo=(RAIL==='tempo');
      var payTo=isTempo?TEMPO_DEPOSIT:PAYTO;
      var A=await OWH.authorize(wp,{usd:amt,payTo:payTo,usdc:USDC,chain:BASE_CHAIN,step:function(w){
        say(w==='connect'?('🦊 connecting '+((info&&info.name)||'your wallet')+'…'):w==='switch'?'🌉 switching to Base…':'✍️ sign the aloha (EIP-3009 — gas-free for you)…'); }});
      var payload={x402Version:1,scheme:'exact',network:'base',payload:{signature:A.signature,authorization:A.authorization}};
      var extra=isTempo?{name:'USD Coin',version:'2',tempoSettlement:PAYTO}:{name:'USD Coin',version:'2'};
      var req={scheme:'exact',network:'base',maxAmountRequired:A.authorization.value,resource:RESOURCE,description:'agent gift rail 🤖 — every drop keeps a door open',mimeType:'application/json',payTo:payTo,maxTimeoutSeconds:300,asset:USDC,extra:extra};
      var base=isTempo?(PROXY+'/tempo'):PAYAI;
      say(isTempo?'🌊 verifying through the gift-rail proxy…':'🌊 verifying with the facilitator…');
      var vr=await fetch(base+'/verify',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({x402Version:1,paymentPayload:payload,paymentRequirements:req})});
      var vj=await vr.json().catch(function(){return {}});
      if(vj.pending){ say('🗝️ the Tempo rail’s last key is being cut — pick <b>Coinbase · Base</b> for now, it’s fully live 🌺'); return; }
      if(!vj.isValid){ say('⚠️ the facilitator did not bless it: '+OWH.esc(vj.invalidReason||vj.message||'unknown')+' — nothing left your wallet'); return; }
      say('🌊 settling… (seconds)');
      var sr=await fetch(base+'/settle',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({x402Version:1,paymentPayload:payload,paymentRequirements:req})});
      var sj=await sr.json().catch(function(){return {}});
      if(sj.success){
        var tx=OWH.txOf(sj.transaction||sj.txHash);                 // network data: only a 64-hex hash may reach markup or the event
        say('🌊🤙 <b>ALOHA RECEIVED.</b> mahalo nui!'
          +(isTempo?'<br>✦ paid out as <b>OUSD on Tempo</b> to the ʻohana — Base receipt: ':'<br>✦ recorded on-chain: ')
          +(tx?('<a href="https://basescan.org/tx/'+tx+'" target="_blank" rel="noopener">'+tx.slice(0,14)+'…'+tx.slice(-8)+'</a> ✦'):''));
        try{ window.dispatchEvent(new CustomEvent('x402:gift',{detail:{tx:tx||null,amount:amt,rail:RAIL}})); }catch(e){}
      } else {
        say('⚠️ settlement hiccup: '+OWH.esc(sj.error||sj.errorReason||sj.message||'unknown')+' — nothing left your wallet without success');
      }
    }catch(e){
      if(e && e.code===4001){ say('🦊 declined for now — the aloha waits patiently 🌺'); }
      else if(/insufficient/i.test(String(e&&e.message||e))){ say('⚠️ not enough USDC on Base in this wallet'); }
      else { say('⚠️ hiccup: '+OWH.esc((e&&e.message)||e)); }
    }finally{ if(ui) ui.setBusy(false); }
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
        b.classList.add('sel'); amt=parseFloat(b.getAttribute('data-v')); $('agr-custom').value=''; if(ui) ui.refresh(); };
    });
    $('agr-custom').oninput=function(){ var v=parseFloat(this.value);
      if(v>0){ amt=v; Array.prototype.forEach.call(ovl.querySelectorAll('.agr-amt'),function(x){x.classList.remove('sel')}); if(ui) ui.refresh(); } };
    ui=OWH.connect({ surface:'agr', usdc:USDC, payTo:PAYTO, chain:BASE_CHAIN,
      usd:function(){ return amt; }, rail:function(){ return RAIL; }, send:sendCoinbaseOrTempo });
    $('agr-wallet').appendChild(ui.el);
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
    window.AgentGiftRail={open:openCard,close:closeCard,version:'1.3'};
    apply(); scheduleProbe(900); scheduleProbe(2600);
    /* the way back: a wallet app opened this page from our link → the card opens by itself with the chosen amount (+ starts, ≤ $10) */
    var P=OWH.pending('agr');
    if(P){
      RAIL=(P.rail==='tempo'||P.rail==='hedera')?P.rail:'coinbase'; amt=P.usd;
      var hit=false; Array.prototype.forEach.call(ovl.querySelectorAll('.agr-amt'),function(x){ var m=Math.abs(parseFloat(x.getAttribute('data-v'))-P.usd)<1e-9; x.classList.toggle('sel',m); if(m) hit=true; });
      $('agr-custom').value=hit?'':String(P.usd);
      openCard(); if(RAIL!=='hedera') ui.autostart(P);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
