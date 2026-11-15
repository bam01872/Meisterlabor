const {chromium}=require('playwright');
// node small.js file fach mods -> zu stark verkleinerte Texte je Szene
(async()=>{const [,,file,f,ms]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:900}});
await p.addInitScript(()=>{window.ML5SMALL=[];localStorage.setItem('meisterlabor-tour','1')});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/'+file);await p.waitForTimeout(400);
const r=await p.evaluate(([f,ms])=>{const out=[];for(const m of ms){const Q=ML5.X[D[f].modules[m].t];if(!Q){out.push(m+' fehlt');continue}
 Q.ein.forEach((s,i)=>{ML5SMALL.length=0;const v=s.f(1,0);if(/NaN|undefined/.test(v))out.push(m+'.'+i+' NaN');if(s.t.length>155)out.push(m+'.'+i+' Text '+s.t.length);ML5SMALL.forEach(x=>out.push(m+'.'+i+' '+x))});
 (Q.skz||[]).forEach((z,i)=>{ML5SMALL.length=0;z[0]();ML5SMALL.forEach(x=>out.push(m+'.s'+i+' '+x))})}return out},[f,ms.split(',').map(Number)]);
console.log(r.join('\n')||'ok');await b.close()})();
