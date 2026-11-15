const {chromium}=require('playwright');
// node rf.js file fach mods(comma) outdir -> outdir/<m>-<i>.png und outdir/<m>-s<j>.png
(async()=>{const [,,file,f,ms,od]=process.argv;const fs=require('fs');fs.mkdirSync(od,{recursive:true});const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:900},deviceScaleFactor:+(process.env.DSF||1),colorScheme:process.env.DARK?'dark':'light'});
await p.addInitScript(()=>{localStorage.setItem('meisterlabor-tour','1');localStorage.setItem('meisterlabor-tips','{"fach":1,"home":1,"uben":1}')});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/'+file);await p.evaluate(()=>{const n=document.querySelector('#nw');if(n)n.style.display='none'});await p.waitForTimeout(400);
for(const m of ms.split(',').map(Number)){await p.evaluate(([f,m])=>{modSel[f]=m;go(f)},[f,m]);await p.waitForTimeout(250);
 const sk=await p.$$('.skz');let j=0;for(const e of sk)await e.screenshot({path:`${od}/${m}-s${j++}.png`});
 await p.click('#ein .einb');await p.waitForTimeout(150);
 const n=await p.evaluate(([f,m])=>ML5.X[D[f].modules[m].t].ein.length,[f,m]);
 for(let i=0;i<n;i++){await p.evaluate(i=>ML5.seek(i,1),i);await p.waitForTimeout(60);const e=await p.$('#ein .einsv');await e.screenshot({path:`${od}/${m}-${i}.png`})}}
await b.close()})();
