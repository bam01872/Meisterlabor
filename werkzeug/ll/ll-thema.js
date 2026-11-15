/* ===== Lernlabor Betrieb, Version 8: Themenseite wie im Lernlabor (aus Lernlabor Betrieb übernommen, ohne Regler) ===== */
(()=>{const X=ML5.X;
const RFK='meisterlabor-rf',AK='meisterlabor-auf';
const lsG=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}},lsS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const FAVK='meisterlabor-fav',NOTK='meisterlabor-notiz';
const favs=()=>{const a=lsG(FAVK);return Array.isArray(a)?a:[]};
function paintRF(key){const o=lsG(RFK)[key]||{},bs=[...document.querySelectorAll('#rfs button')];let cur=bs.find(b=>!o[b.dataset.s]);bs.forEach(b=>{b.classList.toggle('ok',!!o[b.dataset.s]);b.classList.toggle('on',b===cur)})}

const fach0=fach;
fach=function(f){fach0(f);const m=modSel[f],mod=D[f].modules[m],Q=X[mod.t]||{},key=f+':'+m,v=$('#view');
 /* Einleitung wie im Lernlabor: Blocksatz, am Handy zwei Zeilen mit „…“, Tippen oder mehr/weniger klappt auf */
 {const ds=v.querySelector('.tdesc'),mr=v.querySelector('.tmore');if(ds&&mr){const dt=document.createElement('span');dt.className='tdots';dt.setAttribute('aria-hidden','true');ds.after(dt);
  const lab=()=>{const c=ds.classList.contains('cl');mr.textContent=c?'mehr ▾':'weniger ▴';mr.setAttribute('aria-expanded',String(!c))};
  const chk=()=>{const c=ds.classList.contains('cl'),ov=c&&ds.scrollHeight>ds.clientHeight+2;ds.classList.toggle('ov',ov);mr.hidden=c?!ov:false;lab()};
  mr.onclick=()=>{ds.classList.toggle('cl');chk()};ds.onclick=()=>{if(innerWidth<900){ds.classList.toggle('cl');chk()}};ds.title='Tippen zum Ein- und Ausklappen';requestAnimationFrame(chk)}}
 if(mod.wip){const ub=$('#ueb');if(ub)ub.remove();const mb=$('#mbx h2');if(mb)mb.textContent='🗺️ Geplant';
  const b=el('<p><b>🚧 Dieses Thema ist geplant</b> (Arbeitspaket '+esc(mod.wip)+'). In '+esc(D[f].name)+' schon fertig:</p><div class="wipl"></div>','panel wip');
  D[f].modules.forEach((x,i)=>{if(!x.wip){const c=el('<button type="button" class="chip">'+esc(x.t)+'</button>','');c.firstChild.onclick=()=>{modSel[f]=i;go(f);scrollTo(0,0)};b.querySelector('.wipl').append(c.firstChild)}});
  const rf=$('#rfs');if(rf)rf.remove();const ds=v.querySelector('.tmore');(ds||v.firstChild).after(b)}
 let simP=null,allBox=null,openUeb=()=>{};if(Q.sim){const p=simP=simPanel(key,Q.sim,{ueben:()=>openUeb(),all:h=>{if(allBox)allBox.innerHTML=h}}),ub=$('#ueb');ub?ub.before(p):v.append(p);
  const rf=$('#rfs');if(rf){const bs=[...rf.querySelectorAll('button')],ia=bs.findIndex(b=>b.dataset.s==='u')-1;const nb=el('<button type="button" data-s="r"><span class="n"><b></b></span><span class="t">Ausprobieren</span></button>','').firstChild;
   nb.onclick=()=>p.scrollIntoView({behavior:'smooth',block:'start'});(ia>=0?bs[ia]:bs[bs.length-1]).after(nb);rf.querySelectorAll('button').forEach((b,i)=>b.querySelector('.n b').textContent=i+1)}
  paintRF(key)}
 /* Thema wechseln wie im Lernlabor: zwei Wischleisten (Gebiete, Themen) statt einer langen Liste */
 {const mn=v.querySelector('.thm'),G=GRP[f],ms=D[f].modules;if(mn&&G){let gs=Math.max(0,G.findIndex(g=>g[1].includes(m)));
  mn.classList.add('wls');const W=(k,l)=>'<div class="wlw"><button type="button" class="wla l" aria-label="zurück" tabindex="-1">‹</button><div class="wl" data-k="'+k+'" role="group" aria-label="'+l+'"></div><button type="button" class="wla r" aria-label="weiter" tabindex="-1">›</button></div>';
  mn.innerHTML=W('g','Gebiet wählen')+W('t','Thema wählen');
  const bg=mn.querySelector('[data-k=g]'),bt=mn.querySelector('[data-k=t]');
  const arr=w=>{const l=w.querySelector('.wl'),mx=l.scrollWidth-l.clientWidth;w.classList.toggle('ml',l.scrollLeft>4);w.classList.toggle('mr',l.scrollLeft<mx-4)};
  const mid=l=>{const c=l.querySelector('[aria-pressed=true],[aria-current=true]')||l.firstChild;if(c)l.scrollLeft=c.offsetLeft-(l.clientWidth-c.offsetWidth)/2;arr(l.parentNode)};
  const topics=()=>{bt.innerHTML=G[gs][1].map(j=>'<button type="button" data-i="'+j+'" aria-current="'+(j===m)+'">'+esc(ms[j].t)+'</button>').join('');
   bt.querySelectorAll('button').forEach(b=>b.onclick=()=>{modSel[f]=+b.dataset.i;go(f);scrollTo(0,0)});bt.scrollLeft=0;mid(bt)};
  bg.innerHTML=G.map((g,i)=>'<button type="button" data-g="'+i+'" aria-pressed="'+(i===gs)+'">'+esc(g[0])+'</button>').join('');
  bg.querySelectorAll('button').forEach(b=>b.onclick=()=>{gs=+b.dataset.g;bg.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));topics()});
  mn.querySelectorAll('.wlw').forEach(w=>{const l=w.querySelector('.wl');l.addEventListener('scroll',()=>arr(w),{passive:true});
   w.querySelector('.wla.l').onclick=()=>l.scrollBy({left:-l.clientWidth*.7,behavior:'smooth'});w.querySelector('.wla.r').onclick=()=>l.scrollBy({left:l.clientWidth*.7,behavior:'smooth'})});
  topics();const op=()=>{const t=v.querySelector('#thd .thw');if(t)t.textContent='Thema wechseln '+(mn.hidden?'▾':'▴');if(!mn.hidden)requestAnimationFrame(()=>{mid(bg);mid(bt)})};
  v.querySelectorAll('#thd .crb,#thd .thw').forEach(b=>b.addEventListener('click',op));
  document.onkeydown=e=>{if(e.key==='Escape'&&mn.isConnected&&!mn.hidden){const t=v.querySelector('#thd .crb');t&&t.click()}}}}
 /* Üben steht am Schluss der Themenseite und ist eingeklappt */
 {const ub=$('#ueb');if(ub&&!mod.wip){v.append(ub);const h=ub.querySelector('h2'),nq=mod.mcq.length,nc=C.filter(x=>x.f===f&&x.m===m).length;
  const bd=document.createElement('div');bd.className='uebb';while(h.nextSibling)bd.append(h.nextSibling);bd.hidden=true;
  const bt=document.createElement('button');bt.type='button';bt.className='uebk';bt.setAttribute('aria-expanded','false');
  bt.innerHTML='<span class="uebt">✏️ Üben</span><span class="uebz">'+nq+' Check-Fragen'+(nc?' · '+nc+' Rechenaufgabe'+(nc>1?'n':''):'')+'</span><span class="ueba" aria-hidden="true">▾</span>';
  const set=o=>{bd.hidden=!o;bt.setAttribute('aria-expanded',String(o));bt.querySelector('.ueba').textContent=o?'▴':'▾'};
  bt.onclick=()=>set(bd.hidden);h.replaceWith(bt);ub.append(bd);
  const rb=v.querySelector('#rfs [data-s=u]');if(rb)rb.addEventListener('click',()=>set(true));
  openUeb=()=>{set(true);ub.scrollIntoView({behavior:'smooth',block:'start'})}}}
 /* Schrittleiste wie im Lernlabor: ohne „Merken“, vier Schritte in einer Zeile */
 {const rf=$('#rfs');if(rf){const mb=rf.querySelector('[data-s=m]');if(mb)mb.remove();rf.querySelectorAll('button').forEach((b,i)=>b.querySelector('.n b').textContent=i+1);paintRF(key)}}
 /* Nachschlagen wie im Lernlabor: alles eingeklappt, dazu „Alle Werte“ und „Meine Notiz“ */
 if(!mod.wip){const E=ERK[mod.t],GL=mod.fo||mod.pts.filter(x=>x.includes('=')),WI=mod.fo?mod.pts:mod.pts.filter(x=>!GL.includes(x)),ul=a=>'<ul>'+a.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
  const mb=$('#mbx'),gr=mb&&mb.closest('.grid');if(mb){const sd=mb.parentNode;mb.remove();if(sd.classList.contains('side')&&!sd.childNodes.length){sd.remove();if(gr)gr.style.gridTemplateColumns='minmax(0,1fr)'}}
  let ns=v.querySelector('.nsl');if(!ns){ns=el('','panel nsl');v.append(ns)}
  const D1=(sm,h)=>'<details><summary>'+sm+'</summary>'+h+'</details>';
  ns.innerHTML='<h2>Nachschlagen</h2>'+(simP&&simP._fix?D1('📏 Rechenweg und Hintergrund','<p>'+esc(simP._fix)+'</p>'):'')+(simP?D1('🗃️ Alle Werte','<div class="allw"></div>'):'')+(WI.length?D1('📌 Wichtiges','<div class="wib">'+ul(WI)+'</div>'):'')+(GL.length?D1('📜 Grundgleichungen',ul(GL)):'')+(E?D1('💡 Verstehen und typische Fehler','<p>'+esc(E[0])+'</p>'+(E[1]?'<p><b>🏭 Im Betrieb:</b> '+esc(E[1])+'</p>':'')+(E[2]?'<p><b>Typische Fehler:</b></p>'+ul(E[2]):'')):'')+D1('📝 Meine Notiz','<textarea class="ntz" rows="4" aria-label="Meine Notiz zu diesem Thema" placeholder="Deine Notiz zu diesem Thema. Sie bleibt auf Deinem Gerät."></textarea><p class="sub ntzs" aria-live="polite"></p>');
  {const rb=KI.readBtn(mod.t+'. '+mod.pts.join(' '),'w'),wb=ns.querySelector('.wib');if(rb&&wb)wb.append(rb)}
  allBox=ns.querySelector('.allw');if(allBox&&simP)allBox.innerHTML=simP._all();
  const ta=ns.querySelector('.ntz'),nst=ns.querySelector('.ntzs'),N=lsG(NOTK);ta.value=N[key]||'';if(ta.value){const sm=ta.closest('details').querySelector('summary');sm.insertAdjacentHTML('beforeend','<span class="ntzm">vorhanden</span>')}
  let tm=0;ta.oninput=()=>{clearTimeout(tm);tm=setTimeout(()=>{const o=lsG(NOTK);if(ta.value.trim())o[key]=ta.value;else delete o[key];lsS(NOTK,o);nst.textContent='Gespeichert auf diesem Gerät.'},400)};
  const ub=$('#ueb');if(ub)v.append(ub)}};
/* Einheiten mit echtem Bruchstrich (m/s wird zu m über s), nur im Text, nicht in Zeichnungen und Eingabefeldern */
{const NU=['m³','m²','cm³','cm²','mm²','mm','cm','km','µm','m','kg','mg','g','t','ml','l','kJ','MJ','J','kWh','MWh','Wh','kW','MW','W','kN','Nm','N','€','ct','kmol','mol','Stück','Teile','U','kvar','K','mbar','bar','Pa','A','h','min','s','1','Mbit','kbit','Liter','Behälter'],
 DE=['m³','m²','cm³','cm²','mm²','mm','cm','m','kmol','mol','kg','g','t','ml','l','s²','s','min','h','a','d','K','kWh','MWh','kW','Stück','Jahr','Tag','Woche','Monat','Schicht','Teil','Zahn','U','km','mbar','10 min'],
 W='A-Za-zÄÖÜäöüßµΩ0-9_',rq=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),
 RE=new RegExp('(^|[^'+W+'/€²³])('+NU.map(rq).join('|')+')/('+DE.map(rq).join('|')+'|\\([^()/]{1,16}\\))(?![/²³'+W+'])','g'),
 SKIP=/^(svg|input|textarea|select|option|script|style|code)$/i;
 const walk=root=>{if(!root)return;const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{if(n.nodeValue.indexOf('/')<0)return NodeFilter.FILTER_REJECT;for(let e=n.parentNode;e&&e!==root.parentNode;e=e.parentNode){if(e.nodeType===1&&(SKIP.test(e.nodeName)||e.classList.contains('fru')||e.isContentEditable))return NodeFilter.FILTER_REJECT}return NodeFilter.FILTER_ACCEPT}}),L=[];
  while(tw.nextNode())L.push(tw.currentNode);
  L.forEach(n=>{const t=n.nodeValue;RE.lastIndex=0;if(!RE.test(t))return;RE.lastIndex=0;const fr=document.createDocumentFragment();let last=0,m;
   while((m=RE.exec(t))){const st=m.index+m[1].length;fr.append(t.slice(last,st));const sp=document.createElement('span');sp.className='fr fru';const a=document.createElement('span'),b=document.createElement('span');a.textContent=m[2];b.textContent=m[3].replace(/^\((.*)\)$/,'$1');sp.append(a,b);sp.setAttribute('aria-label',m[2]+' pro '+b.textContent);fr.append(sp);last=m.index+m[0].length}
   fr.append(t.slice(last));n.parentNode.replaceChild(fr,n)})};
 /* dasselbe in Zeichnungen: Zähler und Nenner als kleine Zeilen übereinander, Bruchstrich als Linie */
 const NS='http://www.w3.org/2000/svg',svgFr=root=>{root.querySelectorAll('svg text').forEach(t=>{if(t.children.length||t.hasAttribute('data-fru'))return;const s=t.textContent;if(s.indexOf('/')<0)return;RE.lastIndex=0;if(!RE.test(s))return;RE.lastIndex=0;
   const seg=[];let last=0,m;while((m=RE.exec(s))){const st=m.index+m[1].length;seg.push(s.slice(last,st),[m[2],m[3].replace(/^\((.*)\)$/,'$1')]);last=m.index+m[0].length}seg.push(s.slice(last));
   const cs=getComputedStyle(t),fs=parseFloat(cs.fontSize)||12,sm=fs*.74,x0=parseFloat(t.getAttribute('x'))||0,y0=parseFloat(t.getAttribute('y'))||0,an=cs.textAnchor||t.getAttribute('text-anchor')||'start';
   const meas=(str,size)=>{if(!str)return 0;t.textContent='';const p=document.createElementNS(NS,'tspan');p.textContent=str;if(size)p.setAttribute('font-size',size);p.setAttribute('xml:space','preserve');p.style.whiteSpace='pre';t.append(p);let w=0;try{w=p.getComputedTextLength()}catch(e){}return w};
   const sp=meas('a b')-meas('ab'),parts=seg.map(g=>typeof g==='string'?{s:g,w:meas(g)+((/\s$/.test(g)?sp:0))+((/^\s/.test(g)?sp:0))}:{n:g[0],d:g[1],wn:meas(g[0],sm),wd:meas(g[1],sm)});
   let W=0;parts.forEach(p=>{if(p.n){p.w=Math.max(p.wn,p.wd)+fs*.24}W+=p.w});
   let x=an==='middle'?x0-W/2:an==='end'?x0-W:x0;t.textContent='';t.setAttribute('data-fru','1');t.setAttribute('text-anchor','start');t.style.textAnchor='start';
   const mk=(str,xx,yy,size)=>{const p=document.createElementNS(NS,'tspan');const um=/^(.*?[A-Za-zητσβμ])_([A-Za-z0-9]+)(.*)$/.exec(str);if(um){p.append(um[1]);const u=document.createElementNS(NS,'tspan');u.setAttribute('baseline-shift','sub');u.setAttribute('font-size','.7em');u.textContent=um[2];p.append(u,um[3])}else p.textContent=str;p.setAttribute('x',xx.toFixed(2));p.setAttribute('y',yy.toFixed(2));if(size)p.setAttribute('font-size',size.toFixed(2));p.style.whiteSpace='pre';t.append(p)};
   const g=t.parentNode;parts.forEach(p=>{if(p.n){const c=x+p.w/2;mk(p.n,c-p.wn/2,y0-fs*.42,sm);mk(p.d,c-p.wd/2,y0+fs*.36,sm);
     const l=document.createElementNS(NS,'line');l.setAttribute('x1',(x+fs*.06).toFixed(2));l.setAttribute('x2',(x+p.w-fs*.06).toFixed(2));l.setAttribute('y1',(y0-fs*.3).toFixed(2));l.setAttribute('y2',(y0-fs*.3).toFixed(2));l.setAttribute('stroke',cs.fill&&cs.fill!=='none'?cs.fill:'currentColor');l.setAttribute('stroke-width',Math.max(.8,fs*.075).toFixed(2));if(t.hasAttribute('transform'))l.setAttribute('transform',t.getAttribute('transform'));l.setAttribute('class','frl');g.insertBefore(l,t.nextSibling)}
    else if(p.s){mk(p.s.replace(/^\s+/,''),x+(/^\s/.test(p.s)?sp:0),y0)}x+=p.w})})};
 const vw=document.getElementById('view');let q=0;const run=()=>{q=0;walk(vw);svgFr(vw)};
 new MutationObserver(()=>{if(!q)q=requestAnimationFrame(run)}).observe(vw,{childList:true,subtree:true,characterData:true});window.frUnits=walk}
go(tab);
})();
