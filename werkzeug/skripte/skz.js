const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await p.addInitScript(()=>{localStorage.setItem('meisterlabor-tour','1');localStorage.setItem('meisterlabor-tips','{"fach":1,"home":1,"uben":1}')});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/'+process.argv[2]);await p.waitForTimeout(500);
for(const [f,m] of [['reha',0],['beha',4],['mikp',2],['zib',4]]){await p.evaluate(([f,m])=>{modSel[f]=m;go(f)},[f,m]);await p.waitForTimeout(400);
 const els=await p.$$('.skz');let i=0;for(const e of els){await e.screenshot({path:`skz-${f}-${i++}.png`})}}
await b.close()})();
