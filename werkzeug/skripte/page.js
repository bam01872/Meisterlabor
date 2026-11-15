const {chromium}=require('playwright');
// node page.js file out width dark brand fach mod action fullH
(async()=>{const [,,file,out,w,dark,brand,f,m,act,H]=process.argv;const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+w<600?844:900},colorScheme:dark==='1'?'dark':'light',deviceScaleFactor:+(process.env.DSF||1)});
await p.addInitScript(()=>{localStorage.setItem('meisterlabor-tour','1');localStorage.setItem('meisterlabor-tips','{"fach":1,"home":1,"uben":1,"fall":1,"oral":1,"sim":1,"stand":1}')});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/'+file+(brand&&brand!=='-'?'?farbe='+brand:''));await p.waitForTimeout(500);
if(f&&f!=='-'){await p.evaluate(([f,m])=>{modSel[f]=+m;go(f)},[f,m]);await p.waitForTimeout(400)}
if(act&&act!=='-'){await p.evaluate(act);await p.waitForTimeout(900)}
if(H&&H!=='-'){await p.screenshot({path:out,clip:{x:0,y:0,width:+w,height:+H},fullPage:true})}else await p.screenshot({path:out,fullPage:true});
await b.close()})();
