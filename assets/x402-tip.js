/* x402-tip.js v2.7 — 🤖 agent gifts of aloha x402 (called "pennies of aloha" until 28 Nov 2026) · "temple" (27 Nov 2026) · wallet connect (28 Nov 2026) · 🪙 plain transfer (28 Nov 2026)
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
  var FACILITATOR='https://gift-rail.opensourceorchestra.org/base';      /* the gift rail's Base lane: CORS-enabled, pins payee/asset/amount; PayAI itself is server-to-server (browsers get 404, no CORS → "Load failed") */
  var USDC='0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  var PAYTO='0x25965899f4600b3AA5362ee4f34be95E5E62c934';
  var BASE_CHAIN=8453;
  var RESOURCE='https://shakaleikaumaka.com/x402-bless.json';
  var LSK='x402_mini';
/* owh:begin — ʻohana wallet connect v1.0 · GPL-3.0-or-later · minified by tools/inject-owh.py from owh.js (readable source: Open-Source-Orchestra/frames → src/lib/owh.js). Edit THAT file, never this copy. */
var OWH=function(){var e=window,t=document,n=e.navigator||{},a=n.userAgent||"",o=/iPad|iPhone|iPod/.test(a)||"MacIntel"===n.platform&&n.maxTouchPoints>1,i=/Android/i.test(a),r="osogift",s="https://frames.opensourceorchestra.org/lib/";try{var l=t.currentScript;l&&l.src&&/\/lib\/owh(\.min)?\.js(\?|$)/.test(l.src)&&(s=l.src.replace(/[^\/]*(\?.*)?$/,""))}catch(e){}var d=s+"owh-qr.min.js",h=s+"owh-signup.min.js";function c(e){return e?e.isCoinbaseWallet||e.isCoinbaseBrowser?"Coinbase Wallet":e.isPhantom?"Phantom":e.isTrust||e.isTrustWallet?"Trust Wallet":e.isRainbow?"Rainbow":e.isRabby?"Rabby":e.isMetaMask?"MetaMask":"your wallet":""}function p(){return{mobile:o||i,ios:o,android:i,injected:!!e.ethereum,wallet:c(e.ethereum)}}function u(e){return String(Math.round(1e6*e))}function f(t){var n=function(t,n,a){try{var o=new URL(e.location.href);return o.searchParams.set(r,t+":"+n+":"+(a||"")+":go"),o.toString()}catch(t){return e.location.href}}(t.surface,t.usd,t.rail),a=n.replace(/^https?:\/\//,"");return{url:n,metamask:"https://link.metamask.io/dapp/"+a,coinbase:"https://go.cb-w.com/dapp?cb_url="+encodeURIComponent(n),phantom:"https://phantom.com/ul/browse/"+encodeURIComponent(n)+"?ref="+encodeURIComponent(e.location.origin),trust:i?"https://link.trustwallet.com/open_url?coin_id="+t.chain+"&url="+encodeURIComponent(n):"https://link.trustwallet.com/send?asset=c"+t.chain+"_t"+t.usdc+"&address="+t.payTo+"&amount="+t.usd,eip681:"ethereum:"+t.usdc+"@"+t.chain+"/transfer?address="+t.payTo+"&uint256="+u(t.usd)}}var w={chainId:"0x2105",chainName:"Base",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:["https://mainnet.base.org"],blockExplorerUrls:["https://basescan.org"]};function m(){var t,n=new Uint8Array(32),a="0x";for((e.crypto||e.msCrypto).getRandomValues(n),t=0;t<32;t++)a+=(n[t]<16?"0":"")+n[t].toString(16);return a}async function y(e,t,n){n("connect");var a=await e.request({method:"eth_requestAccounts"}),o=a&&a[0];if(!o)throw new Error("the wallet gave no account");if(Number(await e.request({method:"eth_chainId"}))!==t.chain){n("switch");try{await e.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x"+t.chain.toString(16)}]})}catch(t){if(t&&4001===t.code)throw t;await e.request({method:"wallet_addEthereumChain",params:[w]})}}return o}function g(e){return("0".repeat(64)+String(e).replace(/^0x/,"").toLowerCase()).slice(-64)}var b=function(e){return new Promise(function(t){setTimeout(t,e)})};async function v(e,t){var n=t.step||function(){},a=await y(e,t,n),o=Number(u(t.usd));n("check");try{var i=parseInt(await e.request({method:"eth_call",params:[{to:t.usdc,data:"0x70a08231"+g(a)},"latest"]}),16);if(i>=0&&i<o){var r=new Error("you have "+(i/1e6).toFixed(2)+" USDC on Base in this wallet — pick a smaller gift");throw r.owh="balance",r}}catch(e){if(e&&"balance"===e.owh)throw e}n("send");var s=await e.request({method:"eth_sendTransaction",params:[{from:a,to:t.usdc,data:"0xa9059cbb"+g(t.payTo)+g(o.toString(16)),value:"0x0"}]});if(!/^0x[0-9a-fA-F]{64}$/.test(s||""))throw new Error("the wallet returned no transaction hash");n("wait");for(var l=null,d=0;d<30&&null===l;d++){await b(k.poll);try{var h=await e.request({method:"eth_getTransactionReceipt",params:[s]});h&&(l="0x1"===h.status||1===h.status)}catch(e){}}if(!1===l)throw new Error("the transaction failed on-chain — nothing was transferred");return{from:a,hash:s,confirmed:!0===l}}function x(e){return"string"==typeof e&&/^0x[0-9a-fA-F]{64}$/.test(e)?e:null}var C={invalid_exact_evm_insufficient_balance:"not enough USDC on Base in this wallet",proxy_paused:"the gift rail is resting 🌺 — copy the address below and send by hand",proxy_rate_limited:"a little too fast — try again in a minute",settlement_pending:"⏳ still settling — it may still land (check BaseScan in a minute)",proxy_upstream_unreachable:"the gift rail could not reach the payment network — try again in a moment",proxy_upstream_bad_reply:"the gift rail could not reach the payment network — try again in a moment"},k={verify:2e4,settle:6e4,poll:2e3};function T(e,n,a){var o,i=t.createElement(e);for(o in n||{})!0===n[o]?i.setAttribute(o,""):!1!==n[o]&&null!=n[o]&&i.setAttribute(o,n[o]);return(a||[]).forEach(function(e){null!=e&&i.appendChild("string"==typeof e?t.createTextNode(e):e)}),i}return{version:"1.0",DEFAULT_USD:10,env:p,links:f,pending:function(t){try{var n=new URL(e.location.href),a=n.searchParams.get(r);if(!a)return null;var o=a.split(":");if(o[0]!==t)return null;n.searchParams.delete(r),e.history.replaceState(e.history.state,"",n.pathname+n.search+n.hash);var i=parseFloat(o[1]),s=i>=.001&&i<=1e3;return s||(i=10),{usd:i,rail:o[2]||"",go:s&&"go"===o[3]&&i<=10}}catch(e){return null}},connect:function(a){!function(){if(!t.getElementById("owh-css")){var e="box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;",n=[];a(".owh",e+"display:block;margin:12px 0 0;color:#f5efe6;text-align:left"),a(".owh *",e),a(".owh .owh-h","margin:14px 0 4px;font:700 14px/1.4 system-ui,-apple-system,sans-serif;color:#f5efe6"),a(".owh .owh-p","margin:0 0 10px;font:12.5px/1.5 system-ui,-apple-system,sans-serif;color:#9d97c9"),a(".owh .owh-go","display:block;width:100%;min-height:50px;border:none;border-radius:12px;padding:12px;background:linear-gradient(90deg,#0052ff,#7c4ba8);color:#fff;font:700 15px system-ui,-apple-system,sans-serif;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:rgba(127,216,164,.28)"),a(".owh .owh-go:disabled,.owh .owh-det:disabled","opacity:.5;cursor:wait"),a(".owh .owh-more","display:block;margin:6px auto 0;min-height:44px;padding:8px 12px;background:none;border:none;color:#9d97c9;font:13px system-ui,-apple-system,sans-serif;text-decoration:underline;cursor:pointer;touch-action:manipulation"),a(".owh .owh-list,.owh .owh-grid","display:grid;gap:8px"),a(".owh .owh-grid","grid-template-columns:1fr 1fr"),a(".owh .owh-b","display:flex;align-items:center;gap:10px;width:100%;min-height:50px;padding:8px 12px;border-radius:12px;background:#0b0710;border:1px solid #4a3565;color:#f5efe6;text-align:left;text-decoration:none;font:600 14px/1.25 system-ui,-apple-system,sans-serif;touch-action:manipulation;-webkit-tap-highlight-color:rgba(127,216,164,.28);cursor:pointer"),a(".owh .owh-b:active,.owh .owh-b:focus-visible","border-color:#7fd8a4;outline:none"),a(".owh .owh-wide","grid-column:1/-1"),a(".owh .owh-i","font-size:20px;line-height:1;flex:none"),a(".owh .owh-b img","width:28px;height:28px;border-radius:7px;flex:none"),a(".owh .owh-b small","display:block;margin-top:2px;font:400 11px/1.3 system-ui,-apple-system,sans-serif;color:#9d97c9"),a(".owh .owh-row","display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"),a(".owh .owh-c","background:#1c1230;color:#7fd8a4;border:1px solid #7fd8a4;border-radius:10px;padding:10px 14px;min-height:44px;font:600 13px system-ui,-apple-system,sans-serif;cursor:pointer;touch-action:manipulation"),a(".owh .owh-n","margin-top:10px;font:13px/1.5 system-ui,-apple-system,sans-serif;color:#cdbce8;word-break:break-word"),a(".owh .owh-n:empty","display:none"),a(".owh .owh-addr","margin-top:10px;background:#0b0710;border:1px solid #4a3565;border-radius:10px;padding:8px 10px;font:12px ui-monospace,monospace;word-break:break-all;color:#cfc6e8"),a(".owh .owh-qr","margin:12px auto 0;width:208px;max-width:100%;padding:10px;background:#fff;border-radius:12px;line-height:0;color:#111;font:13px system-ui,sans-serif"),a(".owh .owh-qr svg","display:block;width:100%;height:auto"),a(".owh .owh-cap","margin:6px 0 0;text-align:center;font:11.5px/1.4 system-ui,-apple-system,sans-serif;color:#9d97c9"),a(".owh .owh-ex","margin-top:12px;font:12.5px/1.55 system-ui,-apple-system,sans-serif;color:#9d97c9"),a(".owh .owh-ex a","color:#7fd8a4"),a(".owh [hidden]","display:none!important"),t.head.appendChild(T("style",{id:"owh-css"},[n.join("\n")]))}function a(e,t){n.push(e+"{"+t+"}","#oso-frames "+e+"{"+t+"}")}}();var o=p(),i=a.t||function(e,t){return t},r=[],s=!1,l=!1,u=!1,w=!1,m=!1,y=T("div",{class:"owh"}),g=T("button",{type:"button",class:"owh-go",hidden:!0}),b=T("span",{},[i("owh.plain","plain transfer")]),C=T("small",{},[i("owh.plainsub","a normal wallet send — no signature screens, no warnings, a fraction of a cent of gas")]);b.appendChild(C);var k=T("button",{type:"button",class:"owh-b owh-plain",hidden:!0,style:"margin-top:8px"},[T("span",{class:"owh-i","aria-hidden":"true"},["🪙"]),b]),_=!1,E=T("div",{class:"owh-list",hidden:!0}),S=T("button",{type:"button",class:"owh-more","aria-expanded":"false",hidden:!0},[i("owh.another","use another wallet ▾")]),U=T("div",{class:"owh-pick",hidden:!0}),A=T("div",{class:"owh-n",role:"status","aria-live":"polite"}),q=T("div",{class:"owh-grid"}),P={},R=T("button",{type:"button",class:"owh-c"},[i("owh.copy","📋 copy address")]),D=T("button",{type:"button",class:"owh-c","aria-expanded":"false"},[i("owh.qr","▦ show QR")]),I=T("div",{class:"owh-row"},[R,D]),L=T("div",{class:"owh-addr",hidden:!0},[a.payTo]),B=T("div",{class:"owh-qr",hidden:!0}),M=T("div",{class:"owh-cap",hidden:!0},[i("owh.qrcap","scan with MetaMask · Coinbase Wallet · Trust · Rainbow — USDC on Base, amount filled in")]),W=T("button",{type:"button",class:"owh-more",hidden:!0},[i("owh.qraddr","address only (any wallet)")]),N=a.payTo.slice(0,6)+"…"+a.payTo.slice(-4),O=[i("owh.explain","Your wallet may call this a “high-risk approval” or say the recipient is an “untrusted EOA”. That is the wallet’s generic caution for any gasless USDC payment to an address it hasn’t seen. This signature sends exactly the amount you chose, once, to "+(a.payToName?a.payToName+" ("+N+")":N)+", and expires in 5 minutes — check the amount and address in the message.")];a.safetyUrl&&O.push(" ",T("a",{href:a.safetyUrl,target:"_blank",rel:"noopener"},[i("owh.safety","what will my wallet say? ↗")]));var j=T("div",{class:"owh-ex"},O);function H(e){A.textContent=e||""}function z(){return{surface:a.surface,usd:a.usd(),rail:a.rail?a.rail():"",usdc:a.usdc,payTo:a.payTo,chain:a.chain}}function $(){var t=r.slice();return e.ethereum&&!t.some(function(t){return t.provider===e.ethereum})&&t.push({info:{name:c(e.ethereum),icon:""},provider:e.ethereum}),t}var F=null;function Q(e){return F=e,H(""),a.send(e.provider,e.info)}async function V(e){if((e=e||F||$()[0])&&!l){_=!1,l=!0,Z(),H("");var n=e.info&&e.info.name||"your wallet";try{var o=await v(e.provider,{usd:a.usd(),payTo:a.payTo,usdc:a.usdc,chain:a.chain,step:function(e){H("connect"===e?"🔌 connecting "+n+"…":"switch"===e?"🌉 switching to Base…":"check"===e?"🔎 checking your USDC…":"send"===e?i("owh.confirmplain","✍️ confirm the gift in your wallet — it is a normal send"):"⏳ sent — waiting for Base to confirm…")}});if(function(e,n){A.textContent=e;var o=x(n);o&&(A.appendChild(t.createTextNode(" ")),A.appendChild(T("a",{href:(a.explorerTx||"https://basescan.org/tx/")+o,target:"_blank",rel:"noopener",style:"color:#7fd8a4"},[o.slice(0,14)+"…"+o.slice(-8)])))}(o.confirmed?"🌊🤙 ALOHA RECEIVED. mahalo nui! ✦ recorded on-chain:":"⏳ sent — Base is still confirming; it should land within a minute:",o.hash),"function"==typeof a.onPlain)try{a.onPlain({tx:x(o.hash),amount:a.usd(),confirmed:o.confirmed,route:"plain"})}catch(e){}}catch(e){var r=String(e&&e.message||e);H(e&&4001===e.code?"🌺 declined for now — the aloha waits patiently":e&&"balance"===e.owh?"⚠️ "+r:/insufficient funds|gas required exceeds|exceeds the balance/i.test(r)?"⚠️ not enough ETH on Base for the network fee (a fraction of a cent) — try the gas-free button above, or add a little ETH on Base":"⚠️ "+r.slice(0,160)+" — nothing was sent unless your wallet shows it")}l=!1,Z()}}k.addEventListener("click",function(){if($().length>1&&!F)return _=!_,void Z();V()}),o.mobile?(U.appendChild(T("div",{class:"owh-h"},[i("owh.title","👛 open the gift in your wallet app")])),U.appendChild(T("div",{class:"owh-p"},[i("owh.sub","tap your wallet — it opens with the gift ready and you confirm inside it. nothing leaves until you do.")])),[["metamask","🦊","MetaMask",1],["coinbase","🔵","Coinbase Wallet",1],["phantom","👻","Phantom",1],["trust","🛡️","Trust Wallet",o.android?1:0],["eip681","👛",i("owh.other","another wallet"),0]].forEach(function(e,n){var a=e[3]?i("owh.gasfree","gas-free · opens the gift inside it"):i("owh.prefilled","USDC send, amount filled in"),o=T("a",{class:"owh-b"+(4===n?" owh-wide":""),rel:"noopener","data-w":e[0]},[T("span",{class:"owh-i","aria-hidden":"true"},[e[1]]),T("span",{},[e[2],T("small",{},[a])])]);o.addEventListener("click",function(){u=!1,setTimeout(function(){u||"visible"!==t.visibilityState||(H(i("owh.nothing","nothing opened? that wallet app may not be installed — pick another, or copy the address below 🌺")),L.hidden=!1)},1800)}),P[e[0]]=o,q.appendChild(o)}),U.appendChild(q),t.addEventListener("visibilitychange",function(){"hidden"===t.visibilityState&&(u=!0)}),e.addEventListener("pagehide",function(){u=!0})):(U.appendChild(T("div",{class:"owh-h"},[i("owh.dtitle","📱 scan with your phone’s wallet")])),U.appendChild(T("div",{class:"owh-p"},[i("owh.dsub","no browser wallet found — open MetaMask, Coinbase Wallet, Trust or Rainbow on your phone and scan; or install a browser wallet and reload.")])));var G=null,J=0;function Y(){if(G&&(G.remove(),G=null),!1!==a.hook&&0!==y.getClientRects().length&&!U.hidden){var o,r=e.OWH_SIGNUP;if(!r)return o=Y,e.__owhHookP||(e.__owhHookP=new Promise(function(e){var n=t.createElement("script");n.src=h,n.async=!0,n.onload=n.onerror=function(){e()},t.head.appendChild(n)})),void e.__owhHookP.then(function(){e.OWH_SIGNUP&&o()});if(r.href||"function"==typeof r.open){var s=n.connection;"function"!=typeof r.warm||J||s&&(s.saveData||/(^|-)2g$/.test(s.effectiveType||""))||(J=setTimeout(function(){if(J=0,y.getClientRects().length&&!U.hidden)try{r.warm()}catch(e){}},2500));var l=[T("span",{class:"owh-i","aria-hidden":"true"},["✨"]),T("span",{},[r.label||i("owh.signup","no wallet yet? sign up in 10 s"),T("small",{},[r.sub||i("owh.signupsub","email or passkey — no app needed")])])];r.href?G=T("a",{class:"owh-b",href:r.href,rel:"noopener",style:"margin-top:8px"},l):(G=T("button",{type:"button",class:"owh-b",style:"margin-top:8px"},l)).addEventListener("click",function(){r.open({usd:a.usd(),payTo:a.payTo,usdc:a.usdc,chain:a.chain,say:H,use:function(e,t){Q({provider:e,info:t||{name:"your new wallet",icon:""}})}})}),U.appendChild(G)}}}function K(){!function(n,a){function o(){n.textContent="(QR unavailable — copy the address instead)"}function i(){try{var t=e.__owhQR(0,"M");t.addData(a),t.make(),n.innerHTML=t.createSvgTag({cellSize:4,margin:0,scalable:!0});var i=n.firstChild;i&&i.setAttribute&&(i.setAttribute("role","img"),i.setAttribute("aria-label","QR code: pay USDC on Base to the ʻohana wallet"))}catch(e){o()}}if(e.__owhQR)return i();n.textContent="…";var r=T("script",{src:d,async:!0});r.onload=i,r.onerror=o,t.head.appendChild(r)}(B,m?a.payTo:f(z()).eip681)}function X(e){if(B.hidden=M.hidden=W.hidden=!(w=null==e?!w:e),D.setAttribute("aria-expanded",w?"true":"false"),w){K();try{B.scrollIntoView({block:"nearest",behavior:"smooth"})}catch(e){}}}function Z(){var e=$();E.textContent="",1===e.length?(g.hidden=!1,g.textContent=i("owh.sendwith","👛 send USDC with")+" "+e[0].info.name,E.hidden=!0,S.hidden=!1,U.hidden=!s):e.length>1?(g.hidden=!0,E.hidden=!1,S.hidden=!1,U.hidden=!s,e.forEach(function(e){var t=e.info.icon&&/^data:image\//.test(e.info.icon)?T("img",{src:e.info.icon,alt:""}):T("span",{class:"owh-i","aria-hidden":"true"},["👛"]),n=T("button",{type:"button",class:"owh-b owh-det",disabled:l},[t,T("span",{},[e.info.name,T("small",{},[_?i("owh.plainwith","🪙 plain transfer — a normal send"):i("owh.detected","detected in this browser · gas-free")])])]);n.addEventListener("click",function(){_?V(e):Q(e)}),E.appendChild(n)})):(g.hidden=!0,E.hidden=!0,S.hidden=!0,U.hidden=!1),S.setAttribute("aria-expanded",s?"true":"false"),S.textContent=s?i("owh.fewer","hide other wallets ▴"):i("owh.another","use another wallet ▾"),k.hidden=!(e.length>=1&&("function"==typeof a.plain?a.plain():!1!==a.plain)),k.disabled=l,b.firstChild.nodeValue=_?i("owh.plainback","↩ gas-free instead"):i("owh.plain","plain transfer"),C.hidden=_,g.disabled=l,Array.prototype.forEach.call(E.querySelectorAll("button"),function(e){e.disabled=l});var t,n=f(z());for(t in P)P[t].setAttribute("href",n[t]);Y();var r=y.getClientRects().length>0;o.mobile||U.hidden||w||!r?w&&r&&K():X(!0)}U.appendChild(I),U.appendChild(L),U.appendChild(B),U.appendChild(M),U.appendChild(W),D.addEventListener("click",function(){X()}),W.addEventListener("click",function(){W.textContent=(m=!m)?i("owh.qrfull","USDC amount filled in"):i("owh.qraddr","address only (any wallet)"),K()}),R.addEventListener("click",function(){L.hidden=!1,function(e,a){function o(){var n=T("textarea",{readonly:!0,style:"position:fixed;left:-9999px;top:0;opacity:0"});n.value=e,t.body.appendChild(n),n.select();try{t.execCommand("copy"),a()}catch(e){}t.body.removeChild(n)}n.clipboard&&n.clipboard.writeText?n.clipboard.writeText(e).then(a,o):o()}(a.payTo,function(){R.textContent=i("owh.copied","✅ copied — mahalo!"),setTimeout(function(){R.textContent=i("owh.copy","📋 copy address")},2500)})}),S.addEventListener("click",function(){s=!s,Z()}),g.addEventListener("click",function(){var e=$();e[0]&&Q(e[0])}),y.appendChild(g),y.appendChild(E),y.appendChild(k),y.appendChild(S),y.appendChild(U),y.appendChild(j),y.appendChild(A),e.addEventListener("eip6963:announceProvider",function(e){var t=e&&e.detail;t&&t.info&&t.provider&&"function"==typeof t.provider.request&&(r.some(function(e){return e.provider===t.provider||e.info.uuid===t.info.uuid})||(r.push({info:{uuid:t.info.uuid,name:String(t.info.name||"wallet").slice(0,40),icon:String(t.info.icon||"")},provider:t.provider}),Z()))});try{e.dispatchEvent(new e.CustomEvent("eip6963:requestProvider"))}catch(e){}if(Z(),e.IntersectionObserver)try{new e.IntersectionObserver(function(e){for(var t=0;t<e.length;t++)if(e[t].isIntersecting)return void Z()}).observe(y)}catch(e){}return{el:y,refresh:Z,say:H,fallback:function(){s=!0,Z(),L.hidden=!1;try{L.scrollIntoView({block:"nearest",behavior:"smooth"})}catch(e){}},wallets:$,setBusy:function(e){l=!!e,Z()},autostart:function(e){var t=Date.now();!function n(){var a=$();return a.length?(Z(),void(e&&e.go&&1===a.length?Q(a[0]):H(i("owh.hereyouare","🌺 aloha — you are in your wallet; choose it below to send the gift")))):Date.now()-t<3500?setTimeout(n,120):(s=!0,void Z())}()}}},authorize:async function(e,t){var n=t.step||function(){},a=await y(e,t,n),o={from:a,to:t.payTo,value:u(t.usd),validAfter:"0",validBefore:String(Math.floor(Date.now()/1e3)+300),nonce:m()};n("sign");var i={types:{EIP712Domain:[{name:"name",type:"string"},{name:"version",type:"string"},{name:"chainId",type:"uint256"},{name:"verifyingContract",type:"address"}],TransferWithAuthorization:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"value",type:"uint256"},{name:"validAfter",type:"uint256"},{name:"validBefore",type:"uint256"},{name:"nonce",type:"bytes32"}]},primaryType:"TransferWithAuthorization",domain:{name:"USD Coin",version:"2",chainId:t.chain,verifyingContract:t.usdc},message:o};return{from:a,signature:await e.request({method:"eth_signTypedData_v4",params:[a,JSON.stringify(i)]}),authorization:o}},nameOf:c,esc:function(e){return String(null==e?"":e).replace(/[&<>"']/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[e]})},txOf:x,post:async function(e,t,n){var a="function"==typeof AbortController?new AbortController:null,o=a&&setTimeout(function(){a.abort()},/\/settle$/.test(t)?k.settle:k.verify);try{var i=await fetch(e+t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n),signal:a?a.signal:void 0}),r=null;try{r=await i.json()}catch(e){}return clearTimeout(o),{net:!1,status:i.status,json:r&&"object"==typeof r?r:{}}}catch(e){return clearTimeout(o),{net:!0,timeout:!(!a||!a.signal.aborted),status:0,json:null}}},why:function(e){return e=String(e||""),C[e]?C[e]:/valid_?before|expired/i.test(e)?"that took too long — tap again":/^proxy_(pin_|bad_json|too_large)/.test(e)?"something looked off with that request":/free_tier/.test(e)?"the gift rail is resting 🌺 — copy the address below and send by hand":"the gift rail did not accept it"+(e?" ("+e+")":"")},rest:function(e){return/^proxy_(paused|rate_limited|upstream)|free_tier/.test(String(e||""))},NET:"⚠️ couldn’t reach the gift rail — nothing left your wallet. Try again in a moment, or copy the address below and send USDC on Base by hand to osoartist.eth",SLOW:"⚠️ the gift rail is slow right now — nothing left your wallet. Try again in a moment, or copy the address below and send USDC on Base by hand to osoartist.eth",NETSETTLE:"⚠️ lost the connection at the very last step — it may or may not have gone through: check your wallet / BaseScan before tapping again, or copy the address below and send by hand",timeouts:k,transfer:v}}();
/* owh:end */

  var css=document.createElement('style');
  css.textContent=[
  '#x4-wrap{position:fixed;top:calc(74px + env(safe-area-inset-top,0px));right:10px;z-index:9998;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:system-ui,-apple-system,sans-serif}',
  '#x4-pill{background:linear-gradient(90deg,#0052ff,#7c4ba8);color:#fff;border:none;border-radius:999px;padding:8px 13px;font-size:12.5px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.45);white-space:nowrap;opacity:.92}',
  '#x4-pill:hover{opacity:1;filter:brightness(1.1)}',
  '#x4-x{background:rgba(20,14,30,.85);color:#cfc6e8;border:1px solid #7c4ba8;border-radius:50%;width:24px;height:24px;line-height:1;font-size:12px;cursor:pointer;padding:0}',
  '#x4-mini{position:fixed;top:calc(74px + env(safe-area-inset-top,0px));right:10px;z-index:9998;height:26px;border-radius:999px;background:rgba(20,14,30,.9);border:1px solid #7c4ba8;font-size:12px;line-height:1;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;opacity:.7;padding:0 7px}',
  '#x4-ovl{position:fixed;inset:0;z-index:2147483000;background:rgba(6,3,10,.72);display:none;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,sans-serif}',
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
  wrap.innerHTML='<button id="x4-pill" title="agent gifts of aloha x402 — human or agent" aria-label="agent gifts of aloha x402">🤖 agent gifts of aloha x402</button><button id="x4-x" title="tuck away">✕</button>';
  var mini=document.createElement('button'); mini.id='x4-mini'; mini.title='agent gifts of aloha x402'; mini.setAttribute('aria-label','agent gifts of aloha x402 — show the button'); mini.textContent='🤖💰';
  var ovl=document.createElement('div'); ovl.id='x4-ovl';
  ovl.innerHTML='<div id="x4-cardwrap"><div id="x4-card" role="dialog" aria-modal="true" aria-label="gifts of aloha — x402 gift">'
    +'<button id="x4-close" title="close" aria-label="close">✕</button>'
    +'<h3>🤖 agent gifts of aloha x402</h3>'
    +'<div class="x4-sub">USDC on <b>Base</b> straight to the ʻohana’s agent-launch wallet — gas-free for you (EIP-3009 signature, the pool settles it via <a href="https://facilitator.payai.network" target="_blank" rel="noopener" style="color:#7fd8a4">PayAI</a>), or a plain transfer from your own wallet. agents: <a href="https://shakaleikaumaka.com/x402-bless.json" style="color:#7fd8a4">shakaleikaumaka.com/x402-bless.json</a> 🤖</div>'
    +'<div class="x4-amts">'
    +'<button class="x4-amt" data-v="1">$1</button>'
    +'<button class="x4-amt sel" data-v="10">$10</button>'
    +'<button class="x4-amt" data-v="100">$100</button>'
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
    var DEFAULT_USD=10;   /* the preselected chip ($1 · $10 · $100 + custom) — Shaka 28 Nov 2026; "default $1" = flip this and the `sel` chip in the card */
    var amt=DEFAULT_USD;

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
    window.OSOX402={open:openCard,close:closeCard,version:'2.6'};   // the frame's 🌊 piece may reuse this card
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
        var req={scheme:'exact',network:'base',maxAmountRequired:A.authorization.value,resource:RESOURCE,description:'gifts of aloha 🤙 — every drop keeps a door open',mimeType:'application/json',payTo:PAYTO,maxTimeoutSeconds:300,asset:USDC,extra:{name:'USD Coin',version:'2'}};
        var body={x402Version:1,paymentPayload:payload,paymentRequirements:req};
        say('🌊 verifying with the gift rail…');
        var V=await OWH.post(FACILITATOR,'/verify',body);
        if(V.net){ say(V.timeout?OWH.SLOW:OWH.NET); ui.fallback(); return; }
        var vj=V.json;
        if(!vj.isValid){ var vc=vj.invalidReason||vj.invalidMessage||''; say('⚠️ '+OWH.esc(OWH.why(vc))+' — nothing left your wallet'); if(OWH.rest(vc)) ui.fallback(); return; }
        say('🌊 settling on Base… (seconds)');
        var S=await OWH.post(FACILITATOR,'/settle',body);
        if(S.net){ say(OWH.NETSETTLE); ui.fallback(); return; }
        var sj=S.json;
        if(sj.success){
          var tx=OWH.txOf(sj.transaction);                // network data: only a 64-hex hash may reach markup or the event
          say('🌊🤙 <b>ALOHA RECEIVED.</b> mahalo nui!'+(tx?('<br>✦ recorded on-chain: <a href="https://basescan.org/tx/'+tx+'" target="_blank" rel="noopener">'+tx.slice(0,14)+'…'+tx.slice(-8)+'</a> ✦'):''));
          try{ window.dispatchEvent(new CustomEvent('x402:gift',{detail:{tx:tx,amount:amt}})); }catch(e){}
        } else {
          var sc=sj.errorReason||sj.errorMessage||sj.error||'';
          say(/settlement_pending/.test(sc) ? OWH.esc(OWH.why(sc)) : '⚠️ '+OWH.esc(OWH.why(sc))+' — nothing left your wallet without success'); if(OWH.rest(sc)) ui.fallback();
        }
      }catch(e){
        if(e && e.code===4001){ say('🦊 declined for now — the aloha waits patiently 🌺'); }
        else if(/insufficient/i.test(String(e&&e.message||e))){ say('⚠️ not enough USDC on Base in this wallet'); }
        else { say('⚠️ hiccup: '+OWH.esc((e&&e.message)||e)); }
      }finally{ if(ui) ui.setBusy(false); }
    }
    ui=OWH.connect({ surface:'x4', usdc:USDC, payTo:PAYTO, payToName:'osoartist.eth', safetyUrl:'https://shakaleikaumaka.com/gift-safety/', chain:BASE_CHAIN, usd:function(){ return amt; }, send:sendWith,
      onPlain:function(e){ try{ window.dispatchEvent(new CustomEvent('x402:gift',{detail:{tx:e.tx,amount:e.amount,route:'plain'}})); }catch(x){} } });   // the 🪙 plain transfer is a gift too
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
