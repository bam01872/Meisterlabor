const {chromium}=require('playwright');
(async()=>{const [,,url,out,w,h,dark,actions]=process.argv;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:+w,height:+h},deviceScaleFactor:1,colorScheme:dark==='1'?'dark':'light'});
await p.addInitScript(()=>{try{localStorage.setItem('ll_tour','1');localStorage.setItem('meisterlabor-tour','1');localStorage.setItem('meisterlabor-tips','{"fach":1,"home":1,"uben":1,"fall":1,"oral":1,"sim":1}')}catch(e){}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto(url);await p.waitForTimeout(800);
if(actions){await p.evaluate(actions);await p.waitForTimeout(1200);}
await p.screenshot({path:out,fullPage:true});await b.close()})();
