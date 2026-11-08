// Prüft die App im Browser: keine JS-Fehler, jede Themenseite vollständig, keine Überbreite (Handy 390 px, Laptop 1366 px).
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const root=path.join(__dirname,'..');let bad=0;const fail=m=>{bad++;console.log('FEHLER',m)};
 const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 if(!/const V='meisterlabor-v\d+'/.test(sw))fail('sw.js ohne Versionsname');
 if(/const DOZENT=true/.test(html))fail('Dozentenversion im Repo');
 const b=await chromium.launch();
 for(const w of [390,1366]){const p=await b.newPage({viewport:{width:w,height:900}});
  p.on('pageerror',e=>fail(w+' '+e.message));
  await p.addInitScript(()=>{try{localStorage.setItem('meisterlabor-tour','1')}catch(e){}});
  await p.goto('file://'+path.join(root,'index.html'));await p.waitForTimeout(500);
  const r=await p.evaluate(async()=>{const out=[],z=()=>new Promise(r=>setTimeout(r,20));
   for(const t of ['home','uben','fall','oral','sim','stand']){go(t);await z()}
   for(const f of FACH)for(let m=0;m<D[f].modules.length;m++){modSel[f]=m;go(f);await z();
    const v=document.querySelector('#view');for(const s of ['#rfs','#mbx','#ueb'])if(!v.querySelector(s))out.push('fehlt '+s+' in '+D[f].modules[m].t);
    if(document.documentElement.scrollWidth>innerWidth+1)out.push('zu breit: '+D[f].modules[m].t)}
   for(const n of Object.keys(ML5.X)){const X=ML5.X[n];if(X.ein)for(const s of X.ein){for(const k of [0,.5,1]){const o=s.f(k,0);if(/NaN|undefined/.test(o))out.push('Szene kaputt: '+n+' '+s.t.slice(0,30))}}}
   go('home');return out});
  r.forEach(x=>fail(w+' '+x));await p.close()}
 await b.close();console.log(bad?bad+' Fehler':'alles grün');process.exit(bad?1:0)})();
