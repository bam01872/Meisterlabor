/* ===== Version 8: Bedienung wie im Lernlabor v310 =====
   Adressen je Ansicht (Zurück, Neuladen, Teilen, QR-Code), eine Zeichnung statt zwei, Regler einzeilig,
   Kacheln zu dritt, Rechenaufgaben mit Rückfrage, Tendenz, Hilfe und Lösungsweg nach dem 2. Versuch,
   Menüs Lernen / Üben & Prüfen / Ich, heller Standard, Skizzenschrift am Handy (MOB-01). */
(()=>{
const q=s=>document.querySelector(s);
const LG=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:v}catch(e){return d}},LS=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const toast=t=>{let o=q('#lltoast');if(!o){o=document.createElement('div');o.id='lltoast';o.setAttribute('role','status');document.body.append(o)}o.textContent=t;o.classList.add('on');clearTimeout(o._t);o._t=setTimeout(()=>o.classList.remove('on'),2600)};

/* ---------- Darstellung: startet hell, Dunkel wählbar unter Ich → Sonstiges ---------- */
const TK='meisterlabor-ansicht';
const thApply=()=>{const m=LG(TK,'hell'),r=document.documentElement;if(m==='geraet')r.removeAttribute('data-theme');else r.setAttribute('data-theme',m==='dunkel'?'dark':'light')};
thApply();
const accL=setAcc;setAcc=function(f){accL(f);document.documentElement.classList.toggle('accb',!(f&&D[f]))};setAcc(FACH.includes(tab)?tab:null);

/* ---------- Adressen: #thema/<name>, #ueben, #im-betrieb … ---------- */
const slug=t=>t.toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const SL={},SN={};FACH.forEach(f=>D[f].modules.forEach((m,i)=>{let s=slug(m.t);if(SL[s])s=f+'-'+s;SL[s]=[f,i];SN[f+':'+i]=s}));
const RN={uben:'ueben',betrieb:'im-betrieb',fall:'pruefungsaufgaben',glossar:'glossar',formeln:'formelsammlung',oral:'muendlich',sim:'simulation',stand:'lernstand',kurs:'kurstermine',sonst:'sonstiges',doz:'dozent'};
const RT=Object.fromEntries(Object.entries(RN).map(([a,b])=>[b,a]));
let ROUT=false;
const route=()=>FACH.includes(tab)?'thema/'+SN[tab+':'+modSel[tab]]:tab==='fall'?'pruefungsaufgaben/'+(fIdx+1):tab==='stand'&&KMV?'kurstermine':(RN[tab]||'');
const link=r=>location.origin+location.pathname+(r?'#'+r:'');
function sync(){if(ROUT)return;const r=route(),want=r?'#'+r:'';if(location.hash===want||(!want&&!location.hash))return;
 try{history.replaceState(Object.assign({},history.state,{y:scrollY}),'');history.pushState({y:0},'',want||location.pathname+location.search)}catch(e){}}
function openRoute(h){h=decodeURIComponent((h||'').replace(/^#/,''));const [a,...b]=h.split('/'),r=b.join('/');
 if(a==='thema'&&SL[r]){modSel[SL[r][0]]=SL[r][1];go(SL[r][0])}
 else if(a==='pruefungsaufgaben'){const n=parseInt(r,10);if(n>=1&&n<=CASES.length)fIdx=n-1;go('fall')}
 else if(RT[a]&&(a!=='dozent'||DOZENT))go(RT[a]);else go('home')}
window.llSync=sync;window.llRoute=route;
addEventListener('popstate',e=>{ROUT=true;try{openRoute(location.hash)}finally{ROUT=false}const y=e.state&&e.state.y||0;requestAnimationFrame(()=>scrollTo(0,y))});

/* ---------- Ich: Lernstand, Lernfortschritt senden, Meine Kurstermine, Tutorial, Sonstiges ---------- */
let KMV=false;
Object.assign(TL,{stand:'📈 Lernstand',kurs:'📅 Meine Kurstermine',tour:'🧭 Tutorial',sonst:'⚙️ Sonstiges'});
const goL=go;go=function(t){if(t==='kurs'){KMV=true;ROUT=true;try{goL('stand')}finally{ROUT=false}const k=q('#kmp');if(k)k.scrollIntoView({block:'start'});sync();return}
 KMV=false;goL(t);if(t!=='tour'&&t!=='send')sync()};
const drawL=draw;draw=function(){if(tab==='sonst'){const v=q('#view');v.innerHTML='';sonst(v);return}drawL()};
function sonst(v){const m=LG(TK,'hell');
 const p=el('<h2>⚙️ Sonstiges</h2><h3>Darstellung</h3><div class="seg" role="group" aria-label="Darstellung">'+[['hell','☀️ Hell'],['dunkel','🌙 Dunkel'],['geraet','📱 Wie das Gerät']].map(x=>'<button type="button" data-m="'+x[0]+'" aria-pressed="'+(x[0]===m)+'">'+x[1]+'</button>').join('')+'</div><p class="sub">Lernlabor Betrieb startet hell. „Wie das Gerät“ folgt der Einstellung Deines Handys oder Laptops.</p><h3 id="vers">Version</h3><p class="vnr">🆕 Version '+APPV+' vom '+APPD+'</p><details class="vneu"><summary>Was ist neu</summary>'+NEU+'</details><p class="sub">Neue Versionen lädt Lernlabor Betrieb von selbst. Ist eine da, erscheint unten der Hinweis „Jetzt laden“.</p>','panel');
 p.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{LS(TK,b.dataset.m);thApply();p.querySelectorAll('[data-m]').forEach(x=>x.setAttribute('aria-pressed',x===b))});v.append(p)}

/* ---------- Menüs: Lernen (mit „Weiter mit …“), Üben & Prüfen, Ich ---------- */
const lastTopic=()=>{let L=null;try{L=JSON.parse(LG('meisterlabor-last','null'))}catch(e){}return L&&D[L[0]]&&D[L[0]].modules[L[1]]?L:null};
const navL=nav;nav=function(){navL.apply(this,arguments);
 const bs=q('#fs').querySelectorAll('button');
 bs.forEach(b=>{const g=+b.dataset.g;if(g===1&&!FACH.includes(tab))b.lastChild.textContent='Lernen';
  if(g)b.addEventListener('click',()=>{const m=q('#nm');if(m.hidden)return;const h=m.querySelector('h3');
   if(g===1){h.textContent='Lernen';const L=lastTopic();if(L&&!(tab===L[0]&&modSel[L[0]]===L[1])){const w=document.createElement('button');w.type='button';w.setAttribute('role','menuitem');w.className='nmw';w.innerHTML='<span class="mi">↩</span><span>Weiter mit '+esc(D[L[0]].modules[L[1]].t)+'</span>';w.onclick=()=>{nmClose();modSel[L[0]]=L[1];go(L[0]);scrollTo(0,0)};h.after(w)}}
   if(g===2)h.textContent='Üben & Prüfen';
   if(g===3){h.textContent='Ich';if(!m.querySelector('[data-k=kurs]')){const sd=m.querySelector('[data-k=send]');const mk=k=>{const l=TL[k],sp=l.indexOf(' '),x=document.createElement('button');x.type='button';x.setAttribute('role','menuitem');x.dataset.k=k;x.setAttribute('aria-current',String(tab===k));x.innerHTML='<span class="mi">'+l.slice(0,sp)+'</span><span>'+l.slice(sp+1)+'</span>';x.onclick=()=>{nmClose();go(k);if(k!=='kurs')scrollTo(0,0)};return x};
    if(sd)sd.after(mk('kurs'));m.append(mk('sonst'))}}})});
 if(tab==='sonst'){const b=q('#fs [data-g="3"]');if(b)b.setAttribute('aria-pressed','true')}};

/* ---------- Teilen und QR-Code ---------- */
function share(t,u){if(navigator.share&&matchMedia('(pointer:coarse)').matches){navigator.share({title:'Lernlabor Betrieb: '+t,url:u}).catch(()=>{});return}
 const done=()=>toast('Link kopiert: '+t);if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).then(done,()=>qrShow(t,u));else qrShow(t,u)}
function qrShow(t,u){let d=q('#qrd');if(!d){d=document.createElement('dialog');d.id='qrd';document.body.appendChild(d)}
 let svg='';try{const x=qrcode(0,'M');x.addData(u);x.make();svg=x.createSvgTag({cellSize:8,margin:2,scalable:true})}catch(e){svg='<p>QR-Code konnte nicht erstellt werden.</p>'}
 d.innerHTML='<h2>'+esc(t)+'</h2><div class="qrb">'+svg+'</div><p class="sub">Mit der Handy-Kamera scannen. Der Link öffnet genau dieses Thema.</p><input class="qru" readonly value="'+esc(u)+'" aria-label="Link"><p class="qrbtn"><button type="button" class="btn" id="qrc">Link kopieren</button> <button type="button" class="btn sec" id="qrx">Schließen</button></p>';
 d.querySelector('#qrx').onclick=()=>d.close();d.querySelector('#qrc').onclick=()=>{const i=d.querySelector('.qru');i.select();(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast('Link kopiert'),()=>{try{document.execCommand('copy');toast('Link kopiert')}catch(e){}})};
 d.onclick=e=>{if(e.target===d)d.close()};d.showModal?d.showModal():d.setAttribute('open','')}

/* ---------- Themenseite ---------- */
/* Themen, in denen die Skizze dieselbe (20) oder fast dieselbe (15) Zeichnung ist wie unter „Werte einstellen“:
   nur noch die bewegte Zeichnung, der Erklärsatz der Skizze steht darunter. Prinzipskizzen (30 Themen) bleiben. */
const ONE=new Set(['Amortisation & Rentabilität','Plankosten & Abweichungen','Leitungen bemessen & Spannungsfall','Thermische Trennverfahren','Stöchiometrie & Stoffbilanz','Gasgesetze','Wärmeleitung & Dämmung','Kreisprozesse & Wirkungsgrad','Kältemaschine & Wärmepumpe','Temperieren & Kühlen von Werkzeugen','Trocknen, Fördern & Dosieren','Spritzgießen: Zyklus & Einstellung','Werkzeug- & Formenbau','Extrusion & Blasformen','Positionierantriebe & Servotechnik','Beschaffung & Bestandsmanagement','Flurförderzeuge & Fördertechnik','Ladeeinheiten & Verpackung','Logistikkosten & Lagerkennzahlen','Fuhrpark oder Spedition',
 'Ladungssicherung','Deckungsbeitrag & Gewinnschwelle','Transformator & Blindleistungskompensation','Konvektion & Strahlung','Reaktionswärme & Enthalpie','Kautschuk: Mischung & Vulkanisation','FMEA: Risiken bewerten','Personalbedarf ermitteln','Zustandsänderungen','Sieden & Kondensieren','Wärme & Energiebilanz','Reaktionstechnik: Umsatz & Ausbeute','Systematische Fehlersuche & Diagnose']);
const fachL=fach;fach=function(f){fachL(f);const v=q('#view'),m=modSel[f],mod=D[f].modules[m],sp=q('#sim');
 /* eine Zeichnung */
 if(sp&&ONE.has(mod.t)){const sk=v.querySelector('.skz');if(sk){const c=sk.querySelector('.skc'),g=sk.closest('.grid');sk.remove();
  if(c){c.classList.add('simcap');sp.querySelector('.simsv').after(c)}
  if(g&&!g.querySelector('.panel'))g.remove()}}
 /* Schrittleiste: „Probieren“ am Handy, aktueller Schritt für Bildschirmleser */
 const rf=q('#rfs');if(rf){const r=rf.querySelector('[data-s=r] .t');if(r)r.innerHTML='<span class="tsx">Ausprobieren</span><span class="tsy">Probieren</span>';stepCur()}
 /* Mehr: Teilen und QR-Code, Menü bleibt im Bild */
 if(sp){const mm=sp.querySelector('.mm'),mo=sp.querySelector('.more');if(mm){const u=link(route());
  const a=el('<button type="button" data-a="t">🔗 Teilen</button><button type="button" data-a="q">▦ QR-Code</button>','');
  a.querySelector('[data-a=t]').onclick=()=>{mo.open=false;share(mod.t,u)};a.querySelector('[data-a=q]').onclick=()=>{mo.open=false;qrShow(mod.t,u)};mm.prepend(...a.childNodes)}
  if(mo){mo.addEventListener('toggle',()=>{sp.classList.toggle('mmo',mo.open);if(!mo.open)return;mm.style.left='0';mm.style.right='auto';const r=mm.getBoundingClientRect();if(r.right>innerWidth-8){mm.style.left='auto';mm.style.right='0';const r2=mm.getBoundingClientRect();if(r2.left<8){mm.style.right='auto';mm.style.left=(8-mo.getBoundingClientRect().left)+'px'}}});
   mo.addEventListener('keydown',e=>{if(e.key==='Escape'&&mo.open){mo.open=false;mo.querySelector('summary').focus()}})}
  /* Regler: Beschriftung, Regler und Zahl in einer Zeile */
  sp.querySelectorAll('.rg2').forEach(r=>{r.classList.add('rg1');const l=r.querySelector('.rgl');if(l)l.title=l.textContent})}
 /* Üben: „Neue Zahlen“ wie im Lernlabor */
 v.querySelectorAll('#ueb .btn.sec').forEach(b=>{if(b.textContent==='Neue Zahlen')b.textContent='🔁 Gleiche Art, neue Zahlen'})};
document.addEventListener('click',e=>{const o=q('#sim .more[open]');if(o&&!o.contains(e.target))o.open=false});
function stepCur(){const rf=q('#rfs');if(!rf)return;rf.querySelectorAll('button').forEach(b=>{if(b.classList.contains('on'))b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')})}
new MutationObserver(ms=>{if(ms.some(x=>x.target.closest&&x.target.closest('#rfs')))stepCur()}).observe(q('#view'),{subtree:true,attributes:true,attributeFilter:['class']});

/* ---------- Rechenaufgaben wie im Lernlabor ---------- */
const nzz=x=>String(x).replace('.',',');
function hint(u,a,un){if(!isFinite(u)||!isFinite(a)||a===0)return'Prüfe Formel und eingesetzte Werte.';
 if(u===0)return'Du hast 0 eingegeben. Prüfe, ob das Ergebnis wirklich null sein kann.';
 if(Math.abs(u+a)<=.02*Math.abs(a))return'Das Vorzeichen ist falsch (Richtung, Zu- oder Abnahme prüfen).';
 const r=Math.abs(u/a),lg=Math.log10(r),k=Math.round(lg);
 if(k!==0&&Math.abs(lg-k)<.03)return'Dein Wert ist etwa um den Faktor '+Math.pow(10,Math.abs(k)).toLocaleString('de-DE')+' '+(k>0?'zu groß':'zu klein')+'. Prüfe die Einheiten und Umrechnungen.';
 const near=x=>Math.abs(r/x-1)<.03;
 if(near(2)||near(.5))return'Faktor 2: Hast Du einen Wert doppelt oder nur halb gerechnet? Prüfe jeden Faktor in der Formel.';
 if(near(4)||near(.25))return'Faktor 4: Prüfe, ob Du einen Wert quadrieren musst oder doppelt geteilt hast.';
 if(near(Math.sqrt(3))||near(1/Math.sqrt(3)))return'Faktor √3: Stern und Dreieck oder Außenleiter- und Strangspannung verwechselt?';
 if(near(9.81)||near(1/9.81))return'Faktor 9,81: Masse und Gewichtskraft verwechselt (F = m · g)?';
 if(near(3.6)||near(1/3.6))return'Faktor 3,6: km/h und m/s oder kWh und MJ verwechselt?';
 if(near(60)||near(1/60)||near(3600)||near(1/3600))return'Zeiteinheit prüfen: Sekunden, Minuten und Stunden umrechnen.';
 if(near(100)||near(.01))return'Faktor 100: Prozent als Zahl eingesetzt (25 % = 0,25)?';
 if(a!==1&&Math.abs(u*a-1)<.03)return'Du hast den Kehrwert berechnet. Prüfe, ob Du richtig geteilt hast.';
 if(Math.abs(u-a)/Math.abs(a)<.1)return'Fast richtig. Runde erst am Ende und rechne mit mindestens 4 Stellen weiter.';
 return r>1?'Dein Wert ist deutlich zu groß. Prüfe Formel und eingesetzte Werte.':'Dein Wert ist deutlich zu klein. Prüfe Formel und eingesetzte Werte.'}
const calcL=calcHTML;calcHTML=function(c,onDone,mod){const w=calcL(c,onDone,mod);if(mod==='sim')return w;
 const t=w.t,row=w.querySelector('.row'),bs=row.querySelectorAll('button'),pb=bs[0],lb=bs[1],inp=w.querySelector('input'),fb=w.querySelector('.fb'),sol=w.querySelector('.sol');
 pb.textContent='Antwort prüfen';let fails=0,solved=false;
 const lock=()=>{lb.disabled=true;lb.classList.add('plock');lb.textContent='🔒 Lösungsweg nach dem 2. Versuch'},unlock=()=>{lb.disabled=false;lb.classList.remove('plock');lb.textContent='Lösungsweg'};
 /* Hilfe: Schritt für Schritt aus dem Lösungsweg, ohne das Ergebnis */
 const st=(t.sol||[]).slice(0,-1);let hs=0;const hb=document.createElement('button');hb.type='button';hb.className='btn sec hlpb';hb.textContent='💡 Hilfe';
 const hl=document.createElement('div');hl.className='sol hlp';hl.hidden=true;
 const pbx=document.createElement('div');pbx.className='pb';fb.after(pbx);if(st.length){pbx.append(hb);pbx.after(hl)}pbx.append(lb);
 hb.onclick=()=>{if(hs>=st.length)return;const d=document.createElement('div');d.textContent=st[hs++];hl.append(d);hl.hidden=false;hb.textContent=hs<st.length?'💡 Nächster Schritt':'💡 Hilfe';if(hs>=st.length)hb.disabled=true};
 inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();pb.click()}});
 /* „1.250“: nachfragen statt still zu deuten */
 w.addEventListener('click',e=>{if(e.target!==pb||t.dt)return;const v=inp.value.trim().replace(/\s/g,'');const m=v.match(/^(-?)(\d{1,3})\.(\d{3})$/);
  if(m){e.stopPropagation();fb.style.color='var(--red)';fb.textContent='Meinst Du '+nzz(parseFloat(v))+' oder '+v.replace('.','')+'? Bitte schreib Dezimalzahlen mit Komma ('+nzz(parseFloat(v))+') und große Zahlen ohne Punkt ('+v.replace('.','')+').'}},true);
 w.addEventListener('click',e=>{if(e.target!==pb||solved)return;const tx=fb.textContent;
  if(/^Richtig/.test(tx)){solved=true;unlock();fb.prepend('✓ ');return}
  if(!/^Nicht ganz/.test(tx))return;fails++;
  let u=NaN;if(!t.dt){let s=inp.value.trim();s=s.indexOf(',')>=0?s.replace(/\./g,'').replace(',','.'):s;u=parseFloat(s)}
  fb.textContent='✗ Noch nicht. '+(t.dt?'Prüfe Startdatum, Fristbeginn und Feiertage.':hint(u,t.a,t.u));
  if(fails===1&&!w.querySelector('.wlr')){const mt=D[c.f]&&D[c.f].modules[c.m],E=mt&&typeof ERK!=='undefined'&&ERK[mt.t];if(E&&E[2]&&E[2].length){const wl=document.createElement('div');wl.className='wlr';wl.innerHTML='<p class="wlh"><b>Woran lag es?</b> Tippe an, was passiert sein könnte.</p>'+E[2].map(x=>'<button type="button" class="chip" aria-pressed="false">'+esc(x).replace(/([A-Za-zσλμϑΔεηṁ])_([A-Za-z0-9äöü]+)/g,'$1<sub>$2</sub>')+'</button>').join('')+'<p class="sub wlt" hidden>Gut erkannt. Rechne mit diesem Punkt im Kopf noch einmal.</p>';wl.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{wl.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));wl.querySelector('.wlt').hidden=false});fb.after(wl)}}
  if(fails===1){sol.hidden=true;lock()}else{sol.hidden=true;unlock();fb.textContent+=' Jetzt kannst Du den Lösungsweg ansehen.'}});
 return w};

/* ---------- MOB-01: Skizzenschrift am Handy (aus dem Lernlabor, für alle Zeichnungen der Themenseite) ---------- */
const MIN=11,CAP=2,GP=2,hit=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>-GP&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>-GP;
const hit0=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>.5&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>.5;
const sym=t=>{const x=t.textContent.trim();return x.length<=2&&!/[A-Za-zÄÖÜäöü]/.test(x)};
function boost(s){if(innerWidth>700)return;const vb=s.viewBox&&s.viewBox.baseVal;if(!vb||!vb.width)return;
 const S=s.getBoundingClientRect(),cm=s.getScreenCTM(),k=cm?Math.hypot(cm.a,cm.b):0;if(!k||!S.width)return;
 const T=[...s.querySelectorAll('text')].filter(t=>t.textContent.trim());if(!T.length||T.length>150)return;
 T.forEach(t=>{if(t.dataset.fb!=null){t.style.fontSize=t.dataset.fb;delete t.dataset.fb}});
 const fs0=T.map(t=>parseFloat(getComputedStyle(t).fontSize)||12);
 const sz=(t,v)=>{if(t.dataset.fb==null)t.dataset.fb=t.style.fontSize;t.style.fontSize=v},un=t=>{if(t.dataset.fb!=null){t.style.fontSize=t.dataset.fb;delete t.dataset.fb}};
 let f=fs0.map((x,i)=>x*k<MIN&&!sym(T[i])&&!T[i].querySelector('.fru,[data-fru]')&&!T[i].hasAttribute('data-fru')?Math.min(MIN/k,x*CAP)/x:1);if(f.every(x=>x===1))return;
 const P=T.map((_,i)=>i),fd=i=>P[i]===i?i:(P[i]=fd(P[i])),fw=T.map(t=>getComputedStyle(t).fontWeight),ax=T.map(t=>parseFloat(t.getAttribute('x'))),ay=T.map(t=>parseFloat(t.getAttribute('y')));
 for(let i=0;i<T.length;i++)for(let j=i+1;j<T.length;j++)if(fs0[i]===fs0[j]&&fw[i]===fw[j]&&(Math.abs(ay[i]-ay[j])<1||Math.abs(ax[i]-ax[j])<1))P[fd(i)]=fd(j);
 const eq=()=>{const m={};f.forEach((x,i)=>{const r=fd(i);m[r]=Math.min(m[r]??9,x)});f=f.map((_,i)=>m[fd(i)])};eq();
 const ia=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
 const rc=()=>T.map(t=>t.getBoundingClientRect());const R0=rc(),old=new Set();
 const ov0={};for(let i=0;i<T.length;i++)for(let j=i+1;j<T.length;j++)if(hit0(R0[i],R0[j])){old.add(i*4096+j);ov0[i*4096+j]=ia(R0[i],R0[j])}
 const A=S.width*S.height,B=[...s.querySelectorAll('rect,circle,ellipse,polygon,path,image,use')].map(e=>e.getBoundingClientRect()).filter(r=>r.width>2&&r.height>2&&r.width*r.height<A*.12&&r.width<S.width*.45&&r.height<S.height*.45);
 const ins=(r,b)=>r.left>=b.left-.5&&r.right<=b.right+.5&&r.top>=b.top-.5&&r.bottom<=b.bottom+.5;
 const box=R0.map(r=>{let m=null;for(const b of B)if(ins(r,b)&&(!m||b.width*b.height<m.width*m.height))m=b;return m});
 const pts=[];for(const e of s.querySelectorAll('path,line,polyline,polygon,rect,circle,ellipse')){if(e.closest('defs,pattern,clipPath,mask,marker,symbol'))continue;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)<.25)continue;
  const st=cs.stroke&&cs.stroke!=='none'&&parseFloat(cs.strokeWidth)>0&&parseFloat(cs.strokeOpacity)>.25,fl=cs.fill&&cs.fill!=='none'&&parseFloat(cs.fillOpacity)>.25;if(!st&&!fl)continue;
  const r=e.getBoundingClientRect();if(r.width>=S.width*.9&&r.height>=S.height*.9)continue;if(fl&&!st&&r.width*r.height<A*.12&&r.width<S.width*.45&&r.height<S.height*.45)continue;
  let L=0;try{L=e.getTotalLength()}catch(x){continue}if(!L||!isFinite(L))continue;const em=e.getScreenCTM();if(!em)continue;const n=Math.min(400,Math.ceil(L*k/3)),hw=st?parseFloat(cs.strokeWidth)*k/2:0;
  for(let j=0;j<=n;j++){const p=e.getPointAtLength(L*j/n);pts.push(em.a*p.x+em.c*p.y+em.e,em.b*p.x+em.d*p.y+em.f,hw)}}
 const inR=(x,y,r,m)=>x>r.left-m&&x<r.right+m&&y>r.top-m&&y<r.bottom+m;
 const lin=(r,i)=>{const o=R0[i];for(let j=0;j<pts.length;j+=3){const x=pts[j],y=pts[j+1],h=pts[j+2];if(inR(x,y,r,.5+h)&&!inR(x,y,o,1.5+h))return true}return false};
 const pd=R0.map((r,i)=>{const b=box[i];return b?Math.max(0,Math.min(3,r.left-b.left,b.right-r.right)):0});
 const ob=R0.map((r,i)=>B.filter(b=>b!==box[i]&&!ins(b,r)&&hit(r,b)).map(b=>[b,ia(r,b)]));
 for(let it=0;it<4;it++){T.forEach((t,i)=>{if(f[i]>1)sz(t,(fs0[i]*f[i])+'px');else un(t)});const R=rc(),bad=new Set();
  for(let i=0;i<T.length;i++){if(f[i]===1)continue;const r=R[i];if(r.left<S.left-1||r.right>S.right+1||r.top<S.top-1||r.bottom>S.bottom+1){bad.add(i);continue}
   if(box[i]){const b=box[i],p=pd[i];if(r.left<b.left+p||r.right>b.right-p||r.top<b.top+p*.5||r.bottom>b.bottom-p*.5){bad.add(i);continue}}
   if(ob[i].some(([b,a])=>ia(r,b)>a*1.3+6)){bad.add(i);continue}
   if(lin(r,i)){bad.add(i);continue}
   for(const b of B){if(b===box[i]||ob[i].some(x=>x[0]===b)||ins(b,R0[i]))continue;if(Math.min(r.right,b.right)-Math.max(r.left,b.left)>1&&Math.min(r.bottom,b.bottom)-Math.max(r.top,b.top)>1&&!ins(b,r)){bad.add(i);break}}}
  for(let i=0;i<T.length;i++)for(let j=i+1;j<T.length;j++){if(f[i]===1&&f[j]===1)continue;const kk=i*4096+j;if(old.has(kk)?ia(R[i],R[j])>ov0[kk]*1.05+.5:hit(R[i],R[j])){bad.add(i);bad.add(j)}}
  if(!bad.size)break;bad.forEach(i=>{f[i]=it<3?1+(f[i]-1)/2:1;if(f[i]<1.04)f[i]=1});eq();if(it===3)T.forEach((t,i)=>{if(f[i]>1)sz(t,(fs0[i]*f[i])+'px');else un(t)})}}
let BQ=new Set(),BF=0;const bq=s=>{BQ.add(s);if(!BF)BF=requestAnimationFrame(()=>requestAnimationFrame(()=>{BF=0;const a=[...BQ];BQ.clear();a.forEach(x=>{if(x.isConnected){try{boost(x)}catch(e){}try{if(window.llFitSvg)llFitSvg(x)}catch(e){}}})}))};
const SVQ='.skb svg.mlsk,.simsv svg';
new MutationObserver(ms=>{if(innerWidth>700)return;for(const m of ms)for(const n of m.addedNodes){if(n.nodeType!==1)continue;
 if(n.matches(SVQ))bq(n);else if(n.querySelector&&n.querySelector('svg'))n.querySelectorAll(SVQ).forEach(bq)}}).observe(q('#view'),{childList:true,subtree:true});
let RW=innerWidth;addEventListener('resize',()=>{if(innerWidth===RW)return;RW=innerWidth;document.querySelectorAll('#view '+SVQ.split(',').join(',#view ')).forEach(bq)});

/* ---------- Kopf: „Suchen …“ am Handy, Link „Zum Inhalt springen“ ---------- */
const sq=q('#q');const ph=()=>{if(sq)sq.placeholder=innerWidth<480?'Suchen …':'Thema oder Formel …'};ph();addEventListener('resize',ph);
{const a=document.createElement('a');a.className='skipl';a.href='#';a.textContent='Zum Inhalt springen';a.onclick=e=>{e.preventDefault();const h=q('#view h2,#view h3');if(h){if(!h.hasAttribute('tabindex'))h.setAttribute('tabindex','-1');h.scrollIntoView({block:'start'});h.focus({preventScroll:true})}};document.body.prepend(a)}

/* ---------- Start: Adresse aus dem Link öffnen ---------- */
if(location.hash&&!/^#(glossar|formelsammlung)$/.test(location.hash)){ROUT=true;try{openRoute(location.hash)}finally{ROUT=false}}else nav();
})();
