const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let errs=0;
for(const w of [390,1366]){const p=await b.newPage({viewport:{width:w,height:900}});
p.on('pageerror',e=>{errs++;console.log('ERR',w,e.message)});
await p.addInitScript(()=>{localStorage.setItem('meisterlabor-tour','1')});
await p.goto('file://'+process.cwd()+'/'+process.argv[2]);await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{const out=[];for(const t of ['home','uben','fall','oral','sim','stand']){go(t);await new Promise(r=>setTimeout(r,50))}
 for(const f of FACH)for(let m=0;m<D[f].modules.length;m++){modSel[f]=m;go(f);await new Promise(r=>setTimeout(r,20));
  const v=document.querySelector('#view');if(!v.querySelector('#rfs')||!v.querySelector('#mbx')||!v.querySelector('#ueb'))out.push('fehlt '+f+m);
  if(document.documentElement.scrollWidth>innerWidth+1)out.push('breit '+f+m+' '+document.documentElement.scrollWidth)}
 go('home');return out});
console.log(w,r.length?r:'ok');await p.close()}
console.log('Fehler:',errs);await b.close()})();
