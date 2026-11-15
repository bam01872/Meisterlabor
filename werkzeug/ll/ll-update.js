/* ===== Version 14: Neue Version wie im Lernlabor =====
   Der Service Worker (sw.js, aus werkzeug/sw-vorlage.js) hat je Version einen eigenen Cache-Namen.
   Ist eine neue Version aktiv geworden, erscheint unten der Hinweis mit „Jetzt laden“.
   Während „Prüfung üben“ mit laufender Zeit wartet der Hinweis, bis die Zeit vorbei ist. */
(()=>{const css=document.createElement('style');css.textContent='#upd{position:fixed;left:12px;right:12px;bottom:calc(88px + env(safe-area-inset-bottom));z-index:950;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 14px;background:var(--card);color:var(--ink);border:2px solid var(--brand,var(--acc));border-radius:14px;padding:10px 14px;box-shadow:var(--sh);max-width:560px;margin:0 auto;font-weight:600}#upd .btn{margin:0}@media(min-width:900px){#upd{bottom:24px}}@media print{#upd{display:none!important}}.vnr{font-weight:700;margin:4px 0}.vneu summary{cursor:pointer;font-weight:700;line-height:44px}.vneu h3{font-size:15px;margin:10px 0 4px}';document.head.append(css)})();
let UPD=false,UPDT=null;
function upShow(){if(typeof simTimer!=='undefined'&&simTimer){UPD=true;if(!UPDT)UPDT=setInterval(()=>{if(!simTimer){clearInterval(UPDT);UPDT=null;upShow()}},5000);return}
 UPD=false;if(document.getElementById('upd'))return;const e=document.createElement('div');e.id='upd';e.setAttribute('role','status');e.innerHTML='<span>Eine neue Version von Lernlabor Betrieb ist da.</span> <button type="button" class="btn" id="updb">Jetzt laden</button>';document.body.appendChild(e);document.getElementById('updb').onclick=()=>location.reload()}
window.llUpdate=upShow;
