const {chromium}=require('playwright');
// node frames.js file.html dark(0/1) width k  -> frames/<fach>-<i>.png (whole video panel)
(async()=>{const [,,file,dark,w,kk,pref]=process.argv;const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w||390,height:900},colorScheme:dark==='1'?'dark':'light',deviceScaleFactor:+(process.env.DSF||1)});
await p.addInitScript(()=>{localStorage.setItem('meisterlabor-tour','1');localStorage.setItem('meisterlabor-tips','{"fach":1,"home":1,"uben":1}')});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
await p.goto('file://'+process.cwd()+'/'+file);await p.evaluate(()=>{document.querySelector('#nw').style.display='none'});await p.waitForTimeout(500);
for(const [f,m] of [['reha',0],['beha',4],['mikp',2],['zib',4]]){await p.evaluate(([f,m])=>{modSel[f]=m;go(f)},[f,m]);await p.waitForTimeout(300);
 await p.click('#ein .einb');await p.waitForTimeout(200);
 const KS=kk.split(',').map(Number);for(let i=0;i<6;i++)for(let j=0;j<KS.length;j++){await p.evaluate(([i,k])=>ML5.seek(i,k),[i,KS[j]]);await p.waitForTimeout(80);
  const e=await p.$((pref==='svg')?'#ein .einsv':'#ein .einp');await e.screenshot({path:KS.length>1?`frames/g-${f}-${i}-${j}.png`:`frames/${f}-${i}.png`})}}
await b.close()})();
