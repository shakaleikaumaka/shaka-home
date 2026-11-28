/* x402-tip.js v2.1 — 🤖 agent pennies of aloha x402 · "temple" (27 Nov 2026) · wallet connect (28 Nov 2026)
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
   v2.1 (28 Nov 2026 — Shaka on his phone: "pressing the wallet button on the x402 gift rail doesn't work … super easy, like OpenSea, wallet to
   wallet"): the dead-end "send with MetaMask" is now the ʻohana wallet connect picker (owh block below) — detected wallets first (EIP-6963) →
   on a phone the wallet APP opens by universal link and this card reopens INSIDE it → desktop QR → copy → sign-up hook; the wallet signs the
   EIP-3009 typed data ITSELF (no ethers.js, no cdnjs: 506 KB less); facilitator replies are escaped/validated (PAʻA SITE-2). Money flow unchanged.
   Keep the card + flow in sync with the frames piece: frames/src/pieces/gift.js + agent-gift-rail.js (the owh block is byte-identical in all three). */
(function(){
  if(window.__x402tip) return; window.__x402tip=1;
  var FACILITATOR='https://facilitator.payai.network';
  var USDC='0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  var PAYTO='0x25965899f4600b3AA5362ee4f34be95E5E62c934';
  var BASE_CHAIN=8453;
  var RESOURCE='https://shakaleikaumaka.com/x402-bless.json';
  var LSK='x402_mini';
/* owh:begin — ʻohana wallet connect v1.0 · GPL-3.0-or-later · minified by tools/inject-owh.py from owh.js (readable source: Open-Source-Orchestra/frames → src/lib/owh.js). Edit THAT file, never this copy. */
var OWH=function(){var e=window,t=document,n=e.navigator||{},o=n.userAgent||"",a=/iPad|iPhone|iPod/.test(o)||"MacIntel"===n.platform&&n.maxTouchPoints>1,i=/Android/i.test(o),r="osogift",s="https://frames.opensourceorchestra.org/lib/";try{var d=t.currentScript;d&&d.src&&/\/lib\/owh(\.min)?\.js(\?|$)/.test(d.src)&&(s=d.src.replace(/[^\/]*(\?.*)?$/,""))}catch(e){}var l=s+"owh-qr.min.js",h=s+"owh-signup.min.js";function c(e){return e?e.isCoinbaseWallet||e.isCoinbaseBrowser?"Coinbase Wallet":e.isPhantom?"Phantom":e.isTrust||e.isTrustWallet?"Trust Wallet":e.isRainbow?"Rainbow":e.isRabby?"Rabby":e.isMetaMask?"MetaMask":"your wallet":""}function p(){return{mobile:a||i,ios:a,android:i,injected:!!e.ethereum,wallet:c(e.ethereum)}}function u(e){return String(Math.round(1e6*e))}function f(t){var n=function(t,n,o){try{var a=new URL(e.location.href);return a.searchParams.set(r,t+":"+n+":"+(o||"")+":go"),a.toString()}catch(t){return e.location.href}}(t.surface,t.usd,t.rail),o=n.replace(/^https?:\/\//,"");return{url:n,metamask:"https://link.metamask.io/dapp/"+o,coinbase:"https://go.cb-w.com/dapp?cb_url="+encodeURIComponent(n),phantom:"https://phantom.com/ul/browse/"+encodeURIComponent(n)+"?ref="+encodeURIComponent(e.location.origin),trust:i?"https://link.trustwallet.com/open_url?coin_id="+t.chain+"&url="+encodeURIComponent(n):"https://link.trustwallet.com/send?asset=c"+t.chain+"_t"+t.usdc+"&address="+t.payTo+"&amount="+t.usd,eip681:"ethereum:"+t.usdc+"@"+t.chain+"/transfer?address="+t.payTo+"&uint256="+u(t.usd)}}var w={chainId:"0x2105",chainName:"Base",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:["https://mainnet.base.org"],blockExplorerUrls:["https://basescan.org"]};function m(){var t,n=new Uint8Array(32),o="0x";for((e.crypto||e.msCrypto).getRandomValues(n),t=0;t<32;t++)o+=(n[t]<16?"0":"")+n[t].toString(16);return o}function y(e,n,o){var a,i=t.createElement(e);for(a in n||{})!0===n[a]?i.setAttribute(a,""):!1!==n[a]&&null!=n[a]&&i.setAttribute(a,n[a]);return(o||[]).forEach(function(e){null!=e&&i.appendChild("string"==typeof e?t.createTextNode(e):e)}),i}return{version:"1.0",env:p,links:f,pending:function(t){try{var n=new URL(e.location.href),o=n.searchParams.get(r);if(!o)return null;var a=o.split(":");if(a[0]!==t)return null;n.searchParams.delete(r),e.history.replaceState(e.history.state,"",n.pathname+n.search+n.hash);var i=parseFloat(a[1]),s=i>=.001&&i<=1e3;return s||(i=.01),{usd:i,rail:a[2]||"",go:s&&"go"===a[3]&&i<=10}}catch(e){return null}},connect:function(o){!function(){if(!t.getElementById("owh-css")){var e="box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;",n=[];o(".owh",e+"display:block;margin:12px 0 0;color:#f5efe6;text-align:left"),o(".owh *",e),o(".owh .owh-h","margin:14px 0 4px;font:700 14px/1.4 system-ui,-apple-system,sans-serif;color:#f5efe6"),o(".owh .owh-p","margin:0 0 10px;font:12.5px/1.5 system-ui,-apple-system,sans-serif;color:#9d97c9"),o(".owh .owh-go","display:block;width:100%;min-height:50px;border:none;border-radius:12px;padding:12px;background:linear-gradient(90deg,#0052ff,#7c4ba8);color:#fff;font:700 15px system-ui,-apple-system,sans-serif;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:rgba(127,216,164,.28)"),o(".owh .owh-go:disabled,.owh .owh-det:disabled","opacity:.5;cursor:wait"),o(".owh .owh-more","display:block;margin:6px auto 0;min-height:44px;padding:8px 12px;background:none;border:none;color:#9d97c9;font:13px system-ui,-apple-system,sans-serif;text-decoration:underline;cursor:pointer;touch-action:manipulation"),o(".owh .owh-list,.owh .owh-grid","display:grid;gap:8px"),o(".owh .owh-grid","grid-template-columns:1fr 1fr"),o(".owh .owh-b","display:flex;align-items:center;gap:10px;width:100%;min-height:50px;padding:8px 12px;border-radius:12px;background:#0b0710;border:1px solid #4a3565;color:#f5efe6;text-align:left;text-decoration:none;font:600 14px/1.25 system-ui,-apple-system,sans-serif;touch-action:manipulation;-webkit-tap-highlight-color:rgba(127,216,164,.28);cursor:pointer"),o(".owh .owh-b:active,.owh .owh-b:focus-visible","border-color:#7fd8a4;outline:none"),o(".owh .owh-wide","grid-column:1/-1"),o(".owh .owh-i","font-size:20px;line-height:1;flex:none"),o(".owh .owh-b img","width:28px;height:28px;border-radius:7px;flex:none"),o(".owh .owh-b small","display:block;margin-top:2px;font:400 11px/1.3 system-ui,-apple-system,sans-serif;color:#9d97c9"),o(".owh .owh-row","display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"),o(".owh .owh-c","background:#1c1230;color:#7fd8a4;border:1px solid #7fd8a4;border-radius:10px;padding:10px 14px;min-height:44px;font:600 13px system-ui,-apple-system,sans-serif;cursor:pointer;touch-action:manipulation"),o(".owh .owh-n","margin-top:10px;font:13px/1.5 system-ui,-apple-system,sans-serif;color:#cdbce8;word-break:break-word"),o(".owh .owh-n:empty","display:none"),o(".owh .owh-addr","margin-top:10px;background:#0b0710;border:1px solid #4a3565;border-radius:10px;padding:8px 10px;font:12px ui-monospace,monospace;word-break:break-all;color:#cfc6e8"),o(".owh .owh-qr","margin:12px auto 0;width:208px;max-width:100%;padding:10px;background:#fff;border-radius:12px;line-height:0;color:#111;font:13px system-ui,sans-serif"),o(".owh .owh-qr svg","display:block;width:100%;height:auto"),o(".owh .owh-cap","margin:6px 0 0;text-align:center;font:11.5px/1.4 system-ui,-apple-system,sans-serif;color:#9d97c9"),o(".owh [hidden]","display:none!important"),t.head.appendChild(y("style",{id:"owh-css"},[n.join("\n")]))}function o(e,t){n.push(e+"{"+t+"}","#oso-frames "+e+"{"+t+"}")}}();var a=p(),i=o.t||function(e,t){return t},r=[],s=!1,d=!1,u=!1,w=!1,m=!1,b=y("div",{class:"owh"}),g=y("button",{type:"button",class:"owh-go",hidden:!0}),v=y("div",{class:"owh-list",hidden:!0}),x=y("button",{type:"button",class:"owh-more","aria-expanded":"false",hidden:!0},[i("owh.another","use another wallet ▾")]),C=y("div",{class:"owh-pick",hidden:!0}),k=y("div",{class:"owh-n",role:"status","aria-live":"polite"}),T=y("div",{class:"owh-grid"}),E={},S=y("button",{type:"button",class:"owh-c"},[i("owh.copy","📋 copy address")]),_=y("button",{type:"button",class:"owh-c","aria-expanded":"false"},[i("owh.qr","▦ show QR")]),R=y("div",{class:"owh-row"},[S,_]),q=y("div",{class:"owh-addr",hidden:!0},[o.payTo]),A=y("div",{class:"owh-qr",hidden:!0}),P=y("div",{class:"owh-cap",hidden:!0},[i("owh.qrcap","scan with MetaMask · Coinbase Wallet · Trust · Rainbow — USDC on Base, amount filled in")]),U=y("button",{type:"button",class:"owh-more",hidden:!0},[i("owh.qraddr","address only (any wallet)")]);function I(e){k.textContent=e||""}function M(){return{surface:o.surface,usd:o.usd(),rail:o.rail?o.rail():"",usdc:o.usdc,payTo:o.payTo,chain:o.chain}}function L(){var t=r.slice();return e.ethereum&&!t.some(function(t){return t.provider===e.ethereum})&&t.push({info:{name:c(e.ethereum),icon:""},provider:e.ethereum}),t}function D(e){return I(""),o.send(e.provider,e.info)}a.mobile?(C.appendChild(y("div",{class:"owh-h"},[i("owh.title","👛 open the gift in your wallet app")])),C.appendChild(y("div",{class:"owh-p"},[i("owh.sub","tap your wallet — it opens with the gift ready and you confirm inside it. nothing leaves until you do.")])),[["metamask","🦊","MetaMask",1],["coinbase","🔵","Coinbase Wallet",1],["phantom","👻","Phantom",1],["trust","🛡️","Trust Wallet",a.android?1:0],["eip681","👛",i("owh.other","another wallet"),0]].forEach(function(e,n){var o=e[3]?i("owh.gasfree","gas-free · opens the gift inside it"):i("owh.prefilled","USDC send, amount filled in"),a=y("a",{class:"owh-b"+(4===n?" owh-wide":""),rel:"noopener","data-w":e[0]},[y("span",{class:"owh-i","aria-hidden":"true"},[e[1]]),y("span",{},[e[2],y("small",{},[o])])]);a.addEventListener("click",function(){u=!1,setTimeout(function(){u||"visible"!==t.visibilityState||(I(i("owh.nothing","nothing opened? that wallet app may not be installed — pick another, or copy the address below 🌺")),q.hidden=!1)},1800)}),E[e[0]]=a,T.appendChild(a)}),C.appendChild(T),t.addEventListener("visibilitychange",function(){"hidden"===t.visibilityState&&(u=!0)}),e.addEventListener("pagehide",function(){u=!0})):(C.appendChild(y("div",{class:"owh-h"},[i("owh.dtitle","📱 scan with your phone’s wallet")])),C.appendChild(y("div",{class:"owh-p"},[i("owh.dsub","no browser wallet found — open MetaMask, Coinbase Wallet, Trust or Rainbow on your phone and scan; or install a browser wallet and reload.")])));var W=null,B=0;function H(){if(W&&(W.remove(),W=null),0!==b.getClientRects().length&&!C.hidden){var a,r=e.OWH_SIGNUP;if(!r)return a=H,e.__owhHookP||(e.__owhHookP=new Promise(function(e){var n=t.createElement("script");n.src=h,n.async=!0,n.onload=n.onerror=function(){e()},t.head.appendChild(n)})),void e.__owhHookP.then(function(){e.OWH_SIGNUP&&a()});if(r.href||"function"==typeof r.open){var s=n.connection;"function"!=typeof r.warm||B||s&&(s.saveData||/(^|-)2g$/.test(s.effectiveType||""))||(B=setTimeout(function(){if(B=0,b.getClientRects().length&&!C.hidden)try{r.warm()}catch(e){}},2500));var d=[y("span",{class:"owh-i","aria-hidden":"true"},["✨"]),y("span",{},[r.label||i("owh.signup","no wallet yet? sign up in 10 s"),y("small",{},[r.sub||i("owh.signupsub","email or passkey — no app needed")])])];r.href?W=y("a",{class:"owh-b",href:r.href,rel:"noopener",style:"margin-top:8px"},d):(W=y("button",{type:"button",class:"owh-b",style:"margin-top:8px"},d)).addEventListener("click",function(){r.open({usd:o.usd(),payTo:o.payTo,usdc:o.usdc,chain:o.chain,say:I,use:function(e,t){D({provider:e,info:t||{name:"your new wallet",icon:""}})}})}),C.appendChild(W)}}}function z(){!function(n,o){function a(){n.textContent="(QR unavailable — copy the address instead)"}function i(){try{var t=e.__owhQR(0,"M");t.addData(o),t.make(),n.innerHTML=t.createSvgTag({cellSize:4,margin:0,scalable:!0});var i=n.firstChild;i&&i.setAttribute&&(i.setAttribute("role","img"),i.setAttribute("aria-label","QR code: pay USDC on Base to the ʻohana wallet"))}catch(e){a()}}if(e.__owhQR)return i();n.textContent="…";var r=y("script",{src:l,async:!0});r.onload=i,r.onerror=a,t.head.appendChild(r)}(A,m?o.payTo:f(M()).eip681)}function N(e){if(A.hidden=P.hidden=U.hidden=!(w=null==e?!w:e),_.setAttribute("aria-expanded",w?"true":"false"),w){z();try{A.scrollIntoView({block:"nearest",behavior:"smooth"})}catch(e){}}}function O(){var e=L();v.textContent="",1===e.length?(g.hidden=!1,g.textContent=i("owh.sendwith","👛 send USDC with")+" "+e[0].info.name,v.hidden=!0,x.hidden=!1,C.hidden=!s):e.length>1?(g.hidden=!0,v.hidden=!1,x.hidden=!1,C.hidden=!s,e.forEach(function(e){var t=e.info.icon&&/^data:image\//.test(e.info.icon)?y("img",{src:e.info.icon,alt:""}):y("span",{class:"owh-i","aria-hidden":"true"},["👛"]),n=y("button",{type:"button",class:"owh-b owh-det",disabled:d},[t,y("span",{},[e.info.name,y("small",{},[i("owh.detected","detected in this browser · gas-free")])])]);n.addEventListener("click",function(){D(e)}),v.appendChild(n)})):(g.hidden=!0,v.hidden=!0,x.hidden=!0,C.hidden=!1),x.setAttribute("aria-expanded",s?"true":"false"),x.textContent=s?i("owh.fewer","hide other wallets ▴"):i("owh.another","use another wallet ▾"),g.disabled=d,Array.prototype.forEach.call(v.querySelectorAll("button"),function(e){e.disabled=d});var t,n=f(M());for(t in E)E[t].setAttribute("href",n[t]);H(),a.mobile||C.hidden||w?w&&z():N(!0)}C.appendChild(R),C.appendChild(q),C.appendChild(A),C.appendChild(P),C.appendChild(U),_.addEventListener("click",function(){N()}),U.addEventListener("click",function(){U.textContent=(m=!m)?i("owh.qrfull","USDC amount filled in"):i("owh.qraddr","address only (any wallet)"),z()}),S.addEventListener("click",function(){q.hidden=!1,function(e,o){function a(){var n=y("textarea",{readonly:!0,style:"position:fixed;left:-9999px;top:0;opacity:0"});n.value=e,t.body.appendChild(n),n.select();try{t.execCommand("copy"),o()}catch(e){}t.body.removeChild(n)}n.clipboard&&n.clipboard.writeText?n.clipboard.writeText(e).then(o,a):a()}(o.payTo,function(){S.textContent=i("owh.copied","✅ copied — mahalo!"),setTimeout(function(){S.textContent=i("owh.copy","📋 copy address")},2500)})}),x.addEventListener("click",function(){s=!s,O()}),g.addEventListener("click",function(){var e=L();e[0]&&D(e[0])}),b.appendChild(g),b.appendChild(v),b.appendChild(x),b.appendChild(C),b.appendChild(k),e.addEventListener("eip6963:announceProvider",function(e){var t=e&&e.detail;t&&t.info&&t.provider&&"function"==typeof t.provider.request&&(r.some(function(e){return e.provider===t.provider||e.info.uuid===t.info.uuid})||(r.push({info:{uuid:t.info.uuid,name:String(t.info.name||"wallet").slice(0,40),icon:String(t.info.icon||"")},provider:t.provider}),O()))});try{e.dispatchEvent(new e.CustomEvent("eip6963:requestProvider"))}catch(e){}return O(),{el:b,refresh:O,say:I,wallets:L,setBusy:function(e){d=!!e,O()},autostart:function(e){var t=Date.now();!function n(){var o=L();return o.length?(O(),void(e&&e.go&&1===o.length?D(o[0]):I(i("owh.hereyouare","🌺 aloha — you are in your wallet; choose it below to send the gift")))):Date.now()-t<3500?setTimeout(n,120):(s=!0,void O())}()}}},authorize:async function(e,t){var n=t.step||function(){};n("connect");var o=await e.request({method:"eth_requestAccounts"}),a=o&&o[0];if(!a)throw new Error("the wallet gave no account");if(Number(await e.request({method:"eth_chainId"}))!==t.chain){n("switch");try{await e.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x"+t.chain.toString(16)}]})}catch(t){if(t&&4001===t.code)throw t;await e.request({method:"wallet_addEthereumChain",params:[w]})}}var i={from:a,to:t.payTo,value:u(t.usd),validAfter:"0",validBefore:String(Math.floor(Date.now()/1e3)+300),nonce:m()};n("sign");var r={types:{EIP712Domain:[{name:"name",type:"string"},{name:"version",type:"string"},{name:"chainId",type:"uint256"},{name:"verifyingContract",type:"address"}],TransferWithAuthorization:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"value",type:"uint256"},{name:"validAfter",type:"uint256"},{name:"validBefore",type:"uint256"},{name:"nonce",type:"bytes32"}]},primaryType:"TransferWithAuthorization",domain:{name:"USD Coin",version:"2",chainId:t.chain,verifyingContract:t.usdc},message:i};return{from:a,signature:await e.request({method:"eth_signTypedData_v4",params:[a,JSON.stringify(r)]}),authorization:i}},nameOf:c,esc:function(e){return String(null==e?"":e).replace(/[&<>"']/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[e]})},txOf:function(e){return"string"==typeof e&&/^0x[0-9a-fA-F]{64}$/.test(e)?e:null}}}();
/* owh:end */

  var css=document.createElement('style');
  css.textContent=[
  '#x4-wrap{position:fixed;top:calc(74px + env(safe-area-inset-top,0px));right:10px;z-index:9998;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:system-ui,-apple-system,sans-serif}',
  '#x4-pill{background:linear-gradient(90deg,#0052ff,#7c4ba8);color:#fff;border:none;border-radius:999px;padding:8px 13px;font-size:12.5px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.45);white-space:nowrap;opacity:.92}',
  '#x4-pill:hover{opacity:1;filter:brightness(1.1)}',
  '#x4-x{background:rgba(20,14,30,.85);color:#cfc6e8;border:1px solid #7c4ba8;border-radius:50%;width:24px;height:24px;line-height:1;font-size:12px;cursor:pointer;padding:0}',
  '#x4-mini{position:fixed;top:calc(74px + env(safe-area-inset-top,0px));right:10px;z-index:9998;height:26px;border-radius:999px;background:rgba(20,14,30,.9);border:1px solid #7c4ba8;font-size:12px;line-height:1;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;opacity:.7;padding:0 7px}',
  '#x4-ovl{position:fixed;inset:0;z-index:100002;background:rgba(6,3,10,.72);display:none;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,sans-serif}',
  '#x4-card{box-sizing:border-box;background:#120a1c;border:1px solid #7c4ba8;border-radius:18px;max-width:420px;width:100%;padding:22px;color:#f5efe6;box-shadow:0 10px 50px rgba(0,0,0,.6);max-height:88vh;max-height:calc(100dvh - 32px);overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}',
  '#x4-card h3{margin:0 0 8px;font-size:18px;padding-right:34px}',
  '#x4-card .x4-sub{color:#9d97c9;font-size:13px;line-height:1.5;margin-bottom:14px}',
  '.x4-amts{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}',
  '.x4-amt{background:#0b0710;border:1px solid #4a3565;color:#f5efe6;border-radius:10px;padding:8px 14px;font-size:14px;cursor:pointer}',
  '.x4-amt.sel{border-color:#7fd8a4;color:#7fd8a4}',
  '#x4-custom{background:#0b0710;border:1px solid #4a3565;color:#f5efe6;border-radius:10px;padding:8px 10px;font-size:14px;width:90px}',
  '#x4-card button,#x4-card a{touch-action:manipulation;-webkit-tap-highlight-color:rgba(127,216,164,.28)}',
  '#x4-st{color:#9d97c9;font-size:13px;line-height:1.5;margin-top:12px;word-break:break-word}',
  '#x4-st a{color:#7fd8a4}',
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
    +'<div id="x4-wallet"></div>'
    +'<div id="x4-st"></div>'
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
    var st=$('x4-st'), ui=null;
    function say(m){ st.innerHTML=m; }
    var amt=0.01;

    try{ visitorFolded=(localStorage.getItem(LSK)==='1'); }catch(e){}
    $('x4-x').onclick=function(){ visitorFolded=true; try{localStorage.setItem(LSK,'1');}catch(e){} apply(); };
    mini.onclick=function(){                          // a tap on the dot: the visitor asks for the pill
      if(visitorFolded){ visitorFolded=false; try{localStorage.setItem(LSK,'0');}catch(e){} }
      pinnedOpen=true; showPill(); };

    function openCard(){ cardOpen=true; ovl.style.display='flex'; say('');
      if(ui){ ui.say(''); ui.refresh(); }
      try{ $('x4-close').focus(); }catch(e){}
    }
    function closeCard(){ cardOpen=false; ovl.style.display='none'; }
    window.OSOX402={open:openCard,close:closeCard,version:'2.1'};   // the frame's 🌊 piece may reuse this card
    $('x4-pill').onclick=openCard;
    $('x4-close').onclick=closeCard;
    ovl.addEventListener('click',function(e){ if(e.target===ovl) closeCard(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&cardOpen) closeCard(); });

    Array.prototype.forEach.call(ovl.querySelectorAll('.x4-amt'),function(b){
      b.onclick=function(){ Array.prototype.forEach.call(ovl.querySelectorAll('.x4-amt'),function(x){x.classList.remove('sel')});
        b.classList.add('sel'); amt=parseFloat(b.getAttribute('data-v')); $('x4-custom').value=''; if(ui) ui.refresh(); };
    });
    $('x4-custom').oninput=function(){ var v=parseFloat(this.value);
      if(v>0){ amt=v; Array.prototype.forEach.call(ovl.querySelectorAll('.x4-amt'),function(x){x.classList.remove('sel')}); if(ui) ui.refresh(); } };

    async function sendWith(wp,info){
      try{
        if(!wp) return;
        if(!(amt>0)){ say('⚠️ pick an amount above zero'); return; }
        if(ui) ui.setBusy(true);
        var A=await OWH.authorize(wp,{usd:amt,payTo:PAYTO,usdc:USDC,chain:BASE_CHAIN,step:function(w){
          say(w==='connect'?('🦊 connecting '+((info&&info.name)||'your wallet')+'…'):w==='switch'?'🌉 switching to Base…':'✍️ sign the aloha (EIP-3009 — gas-free for you)…'); }});
        var payload={x402Version:1,scheme:'exact',network:'base',payload:{signature:A.signature,authorization:A.authorization}};
        var req={scheme:'exact',network:'base',maxAmountRequired:A.authorization.value,resource:RESOURCE,description:'pennies of aloha 🤙 — every drop keeps a door open',mimeType:'application/json',payTo:PAYTO,maxTimeoutSeconds:300,asset:USDC,extra:{name:'USD Coin',version:'2'}};
        say('🌊 verifying with the facilitator…');
        var vr=await fetch(FACILITATOR+'/verify',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({x402Version:1,paymentPayload:payload,paymentRequirements:req})});
        var vj=await vr.json();
        if(!vj.isValid){ say('⚠️ the facilitator did not bless it: '+OWH.esc(vj.invalidReason||'unknown')+' — nothing left your wallet'); return; }
        say('🌊 settling on Base… (seconds)');
        var sr=await fetch(FACILITATOR+'/settle',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({x402Version:1,paymentPayload:payload,paymentRequirements:req})});
        var sj=await sr.json();
        if(sj.success){
          var tx=OWH.txOf(sj.transaction);                // network data: only a 64-hex hash may reach markup or the event
          say('🌊🤙 <b>ALOHA RECEIVED.</b> mahalo nui!'+(tx?('<br>✦ recorded on-chain: <a href="https://basescan.org/tx/'+tx+'" target="_blank" rel="noopener">'+tx.slice(0,14)+'…'+tx.slice(-8)+'</a> ✦'):''));
          try{ window.dispatchEvent(new CustomEvent('x402:gift',{detail:{tx:tx,amount:amt}})); }catch(e){}
        } else {
          say('⚠️ settlement hiccup: '+OWH.esc(sj.error||sj.errorReason||'unknown')+' — nothing left your wallet without success');
        }
      }catch(e){
        if(e && e.code===4001){ say('🦊 declined for now — the aloha waits patiently 🌺'); }
        else if(/insufficient/i.test(String(e&&e.message||e))){ say('⚠️ not enough USDC on Base in this wallet'); }
        else { say('⚠️ hiccup: '+OWH.esc((e&&e.message)||e)); }
      }finally{ if(ui) ui.setBusy(false); }
    }
    ui=OWH.connect({ surface:'x4', usdc:USDC, payTo:PAYTO, chain:BASE_CHAIN, usd:function(){ return amt; }, send:sendWith });
    $('x4-wallet').appendChild(ui.el);

    apply();                                          // first law check…
    scheduleProbe(900);                               // …and again for late page widgets
    scheduleProbe(2600);
    var P=OWH.pending('x4');                          // a wallet app opened this page from our link → the card opens by itself (starts ≤ $10)
    if(P){
      amt=P.usd; var hit=false;
      Array.prototype.forEach.call(ovl.querySelectorAll('.x4-amt'),function(x){ var m=Math.abs(parseFloat(x.getAttribute('data-v'))-P.usd)<1e-9; x.classList.toggle('sel',m); if(m) hit=true; });
      $('x4-custom').value=hit?'':String(P.usd);
      openCard(); ui.autostart(P);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
