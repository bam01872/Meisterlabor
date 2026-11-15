const {chromium}=require('playwright');
// node gif.js file fach mod outdir dark -> outdir/g-<i>-<j>.png (ganzes Videofeld mit Untertitel)
(async()=>{const [,,file,f,m,od,dark]=process.argv;require('fs').mkdirSync(od,{recursive:true});const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:900},colorScheme:dark==='1'?'dark':'light',deviceScaleFactor:1});
await p.addInitScript(()=>{localStorage.setItem('meisterlabor-tour','1');localStorage.setItem('meisterlabor-tips','{"fach":1,"home":1,"uben":1}')});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/'+file);await p.evaluate(()=>{const n=document.querySelector('#nw');if(n)n.style.display='none'});await p.waitForTimeout(400);
await p.evaluate(([f,m])=>{modSel[f]=+m;go(f)},[f,m]);await p.waitForTimeout(300);await p.click('#ein .einb');await p.waitForTimeout(150);
const n=await p.evaluate(([f,m])=>ML5.X[D[f].modules[+m].t].ein.length,[f,m]);const KS=[.12,.3,.5,.7,.9,1];
for(let i=0;i<n;i++)for(let j=0;j<KS.length;j++){await p.evaluate(([i,k])=>ML5.seek(i,k),[i,KS[j]]);await p.waitForTimeout(50);const e=await p.$('#ein .einp');await e.screenshot({path:`${od}/g-${i}-${j}.png`})}
await b.close()})();
