/* ===== Version 9: übrige Punkte aus dem UI-Audit =====
   Antworten merken, Formelzeichen an den Reglern, Glossar und Formelsammlung, Schrittleiste folgt dem Lesen,
   Rückweg aus Im Betrieb, Lernstand am Handy, Kontraste, aria-pressed, Startseite, Reglerwerte behalten. */
(()=>{
const q=s=>document.querySelector(s);
const LG=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}},LS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const SG=k=>{try{return JSON.parse(sessionStorage.getItem(k)||'{}')||{}}catch(e){return {}}},SS=(k,v)=>{try{sessionStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const sub=s=>esc(s).replace(/([A-Za-zσλμϑΔεṁ])_([A-Za-z0-9äöü]+)/g,'$1<sub>$2</sub>');

/* ---------- 1 Antworten in Situationsaufgaben und Im Betrieb merken (auf diesem Gerät) ---------- */
const AK='meisterlabor-antw';
const akey=ta=>{const tas=[...q('#view').querySelectorAll('.q textarea')];return CASES[fIdx].t+'|'+tas.indexOf(ta)};
document.addEventListener('input',e=>{const ta=e.target;if(tab!=='fall'||!ta.matches||!ta.matches('#view .q textarea'))return;const o=LG(AK),k=akey(ta);if(ta.value.trim())o[k]=ta.value;else delete o[k];LS(AK,o);
 const n=ta.nextElementSibling;if(n&&n.classList.contains('ansv'))n.textContent='Gespeichert auf diesem Gerät.'});
function restoreAnswers(){if(tab!=='fall')return;const o=LG(AK);q('#view').querySelectorAll('.q textarea').forEach(ta=>{if(ta.dataset.rs)return;ta.dataset.rs=1;const v=o[akey(ta)];if(v)ta.value=v;
 const n=document.createElement('p');n.className='sub ansv';n.textContent=v?'Deine gespeicherte Antwort.':'Wird auf diesem Gerät gespeichert.';ta.after(n)})}
new MutationObserver(()=>restoreAnswers()).observe(q('#view'),{childList:true,subtree:true});

/* ---------- 7 Rückweg aus Im Betrieb ---------- */
let FROMIB=false;
document.addEventListener('click',e=>{if(tab==='betrieb'&&e.target.closest&&e.target.closest('#view .ibc .btn, #view .panel .btn'))FROMIB=true},true);
const fall9=fall;fall=function(v){fall9(v);if(FROMIB){const b=el('<button type="button" class="chip bkib">‹ Zurück zu Im Betrieb</button>','bkw');b.firstChild.onclick=()=>{go('betrieb');scrollTo(0,0)};v.prepend(b)}
 const s=q('#fsel');if(s)s.addEventListener('change',()=>{try{history.replaceState(history.state,'','#pruefungsaufgaben/'+(fIdx+1))}catch(e){}})};
const go9=go;go=function(t){if(t!=='fall')FROMIB=false;go9(t)};

/* ---------- 2 Formelzeichen an den Reglern ---------- */
const SYM={'Saugerdurchmesser':'Saugerdurchmesser d','Zahl der Sauger':'Zahl der Sauger n','Schnittgeschwindigkeit vc':'Schnittgeschwindigkeit v_c','Schnitttiefe ap':'Schnitttiefe a_p','Zahnvorschub fz':'Zahnvorschub f_z',
 'Länge der Schnittlinie':'Länge der Schnittlinie l','Blechdicke':'Blechdicke s','Zugfestigkeit Rm':'Zugfestigkeit R_m','Schichtdicke':'Schichtdicke s','Taktzeit':'Taktzeit t_T','Nutzungsdauer':'Nutzungsdauer n','Laufzeit':'Laufzeit t',
 'variable Kosten kv':'variable Kosten k_v','Stückzahl':'Stückzahl m','Zeit je Einheit':'Zeit je Einheit t_e','Bestellmenge':'Bestellmenge x','Rüstzeit':'Rüstzeit t_r','Grundzeit je Stück':'Grundzeit je Stück t_g','Zeit je Stück':'Zeit je Stück t_e',
 'Mittelwert':'Mittelwert x̄','Leitungslänge':'Leitungslänge l','Querschnitt':'Querschnitt A','Strom':'Strom I','Wirkleistung':'Wirkleistung P','Kondensatorleistung':'Kondensatorleistung Q_C','Strom in der Schleife':'Strom in der Schleife I','Verstärkung KP':'Verstärkung K_P',
 'Schwere der Verletzung':'Schwere der Verletzung S','Aufenthalt im Gefahrenbereich':'Aufenthalt im Gefahrenbereich F','Gefahr vermeiden':'Gefahr vermeiden P','Produktstrom':'Produktstrom ṁ','Eintritt Produkt':'Eintritt Produkt ϑ_ein','Austritt Kühlwasser':'Austritt Kühlwasser ϑ_aus',
 'Förderstrom':'Förderstrom Q','Leichtsieder im Zulauf':'Leichtsieder im Zulauf x_F','Reinheit Destillat':'Reinheit Destillat x_D','Leichtsieder im Sumpf':'Leichtsieder im Sumpf x_B','Gehalt der Lauge':'Gehalt der Lauge w',
 'Reaktionstemperatur':'Reaktionstemperatur ϑ','Reaktionszeit':'Reaktionszeit t','Fülldruck bei 20 °C':'Fülldruck p_1 bei 20 °C','Temperatur':'Temperatur ϑ','Exponent (Kühlung)':'Exponent n (Kühlung)','Dicke der Dämmung':'Dicke der Dämmung d','Temperatur innen':'Temperatur innen ϑ_i',
 'Emissionsgrad der Oberfläche':'Emissionsgrad der Oberfläche ε','Obere Temperatur':'Obere Temperatur T_o','Untere Temperatur':'Untere Temperatur T_u','Vorlauftemperatur':'Vorlauftemperatur ϑ_V','Druck im Verdampfer':'Druck im Verdampfer p','Verdampfte Menge':'Verdampfte Menge m',
 'Edukt je Charge':'Edukt je Charge m','Ansatzmasse':'Ansatzmasse m','Kühlmitteltemperatur':'Kühlmitteltemperatur ϑ_K','Schussgewicht':'Schussgewicht m','Zykluszeit':'Zykluszeit t_Z','Massetemperatur':'Massetemperatur ϑ_M','Wanddicke':'Wanddicke s','Werkzeugtemperatur':'Werkzeugtemperatur ϑ_W',
 'Projizierte Fläche je Kavität':'Projizierte Fläche je Kavität A','Werkzeuginnendruck':'Werkzeuginnendruck p_i','Kavitäten':'Kavitäten n','Schneckendrehzahl':'Schneckendrehzahl n','Abzugsgeschwindigkeit':'Abzugsgeschwindigkeit v','Heiztemperatur':'Heiztemperatur ϑ','Heizzeit':'Heizzeit t',
 'Weg':'Weg s','Höchstgeschwindigkeit':'Höchstgeschwindigkeit v_max','Beschleunigung':'Beschleunigung a','Lastschwerpunktabstand':'Lastschwerpunktabstand c','Hubhöhe':'Hubhöhe h','Kartonhöhe':'Kartonhöhe h','Masse der Ladung':'Masse der Ladung m',
 'Gleitreibbeiwert':'Gleitreibbeiwert μ_Gleit','Zurrgurte':'Zurrgurte n','Zurrwinkel':'Zurrwinkel α'};
/* Name und Formelzeichen trennen: das Zeichen steht vorn und fett, der Name klein daneben */
const SYMX=/^(.*?)\s+((?:Δ[A-Za-z]|x̄|[A-Za-zσλμϑεṁα])(?:_[A-Za-z0-9äöü]+)?|DN)(\s.*)?$/;
function symLabels(sp){sp.querySelectorAll('.rgl').forEach(l=>{if(l.dataset.sym)return;l.dataset.sym=1;const t=l.textContent.trim(),n=SYM[t]||t.replace(/\b(v|a|f|R|k|K)(c|p|z|m|v|P)\b/,'$1_$2'),m=n.match(SYMX);
 if(!m||/^(Auslösefaktor|cos)/.test(n)){l.innerHTML='<span class="rgn2">'+sub(n)+'</span>';return}
 l.innerHTML='<span class="rgs">'+sub(m[2])+'</span><span class="rgn2">'+sub(m[1]+(m[3]||''))+'</span>';l.title=n.replace(/_/g,'')})}

/* ---------- 15 Reglerwerte behalten, solange die App offen ist ---------- */
const RVK='meisterlabor-regler';
function keepValues(sp,key){const S=SG(RVK)[key];const rs=[...sp.querySelectorAll('input[type=range]')];
 if(S)rs.forEach(r=>{const v=S[r.id];if(v!=null&&String(v)!==r.value){r.value=v;r.dispatchEvent(new Event('input'))}});
 const snap=()=>{const o=SG(RVK);o[key]=Object.fromEntries(rs.map(r=>[r.id,r.value]));SS(RVK,o)};
 sp.addEventListener('input',e=>{if(e.target.type==='range')snap()});sp.addEventListener('change',e=>{if(e.target.classList.contains('rgn'))setTimeout(snap,0)});
 const w=sp.querySelector('.mm [data-a=w]');if(w)w.addEventListener('click',()=>{const o=SG(RVK);delete o[key];SS(RVK,o)})}

/* ---------- 5 Schrittleiste folgt dem Lesen ---------- */
let STO=null;
function stepTrack(){const rf=q('#rfs');if(!rf)return;rf.classList.add('trk');const T={v:'#pred',a:'#ein',r:'#sim',u:'#ueb'};
 const bs=[...rf.querySelectorAll('button')].filter(b=>q(T[b.dataset.s]));
 const set=b=>{rf.querySelectorAll('button').forEach(x=>{x.classList.toggle('cur',x===b);if(x===b)x.setAttribute('aria-current','step');else x.removeAttribute('aria-current')})};
 let lock=0;bs.forEach(b=>b.addEventListener('click',()=>{set(b);lock=Date.now()}));
 const upd=()=>{if(Date.now()-lock<900||!rf.isConnected)return;const y=innerHeight*.4;let c=bs[0];bs.forEach(b=>{const t=q(T[b.dataset.s]);if(t&&t.getBoundingClientRect().top<y)c=b});set(c)};
 if(STO)removeEventListener('scroll',STO);STO=()=>requestAnimationFrame(upd);addEventListener('scroll',STO,{passive:true});upd()}

/* ---------- Themenseite: Formelzeichen, Werte, Schrittleiste ---------- */
const fach9=fach;fach=function(f){fach9(f);const sp=q('#sim');if(sp){symLabels(sp);keepValues(sp,f+':'+modSel[f])}stepTrack()};

/* ---------- 10 Auswahlfragen: gewählte Antwort für Bildschirmleser ---------- */
const mcq9=mcqHTML;mcqHTML=function(){const w=mcq9.apply(this,arguments);w.querySelectorAll('.opt').forEach(b=>{b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>b.setAttribute('aria-pressed','true'))});return w};

/* ---------- 8 Lernstand-Tabelle: Richtig und Falsch in einer Spalte ---------- */
const stand9=stand;stand=function(v){stand9(v);v.querySelectorAll('.dtw table, table').forEach(t=>{const h=t.rows[0];if(!h||!h.cells[1]||h.cells[1].textContent!=='Richtig'||!h.cells[2]||h.cells[2].textContent!=='Falsch')return;
 [...t.rows].forEach((r,i)=>{if(r.cells.length<4)return;r.cells[1].innerHTML=i?'<span class="rr">'+r.cells[1].textContent+'</span> / <span class="rw">'+r.cells[2].textContent+'</span>':'Richtig / Falsch';r.cells[2].remove()})})};

/* ---------- 11 Startseite: nächster Schritt zuerst, Fachrichtung eingeklappt ---------- */
const chosen=()=>{try{return !!localStorage.getItem('meisterlabor-fr')||new URLSearchParams(location.search).has('fr')}catch(e){return false}};
const home9=home;home=function(v){home9(v);if(!chosen())return;const fr=v.querySelector('.frs'),p=fr&&fr.closest('.panel');if(!p)return;
 const h=p.querySelector('h2'),rest=[...p.children].filter(x=>x!==h);p.classList.add('frp2');
 const b=el('<button type="button" class="frt" aria-expanded="false"><span aria-hidden="true">🎓</span> Fachrichtung: <b>'+'Lernlabor Betrieb'+'</b> <span class="frta">ändern ▾</span></button>','').firstChild;
 rest.forEach(x=>x.hidden=true);h.replaceWith(b);b.onclick=()=>{const o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(o));rest.forEach(x=>x.hidden=!o);b.querySelector('.frta').textContent=o?'zuklappen ▴':'ändern ▾'};
 const nx=v.querySelector('.nxt');if(nx){const fv=v.querySelector('.favp');(fv||nx).after(p)}};

/* ---------- 4 Glossar und Formelsammlung ---------- */
Object.assign(TL,{glossar:'📖 Glossar',formeln:'📐 Formelsammlung'});
const draw9=draw;draw=function(){if(tab==='glossar'||tab==='formeln'){const v=q('#view');v.innerHTML='';(tab==='glossar'?glossar:formeln)(v);return}draw9()};
const openT=(f,i)=>{modSel[f]=i;go(f);scrollTo(0,0)};
const filt=(p,ph)=>{const i=el('<input type="search" class="nsf" placeholder="'+ph+'" aria-label="'+ph+'" autocomplete="off">','').firstChild;i.oninput=()=>{const t=i.value.trim().toLowerCase();p.querySelectorAll('[data-s]').forEach(x=>x.hidden=!!t&&!x.dataset.s.includes(t));p.querySelectorAll('.nsg').forEach(g=>g.hidden=![...g.querySelectorAll('[data-s]')].some(x=>!x.hidden))};return i};
function formeln(v){const p=el('<h2>📐 Formelsammlung</h2><p class="sub">Alle Grundgleichungen aus den Themen von '+'Lernlabor Betrieb'+', geordnet wie im Menü Lernen. Tippe auf ein Thema, um es zu öffnen.</p>','panel nsl fsm');
 p.append(filt(p,'Formel oder Thema suchen …'));
 FACH.forEach(f=>GRP[f].forEach(g=>{const it=g[1].map(i=>{const m=D[f].modules[i];if(m.wip)return'';const GL=m.fo||m.pts.filter(x=>x.includes('='));if(!GL.length)return'';
   return '<div class="fsi" data-s="'+esc((m.t+' '+GL.join(' ')).toLowerCase())+'"><button type="button" class="lk" data-f="'+f+'" data-i="'+i+'">'+esc(m.t)+'</button><ul>'+GL.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>'}).join('');
  if(it)p.append(el('<h3>'+esc(D[f].kurz)+' · '+esc(g[0])+'</h3>'+it,'nsg'))}));
 p.querySelectorAll('.lk').forEach(b=>b.onclick=()=>openT(b.dataset.f,+b.dataset.i));v.append(p)}
function glossar(v){const A=[];FACH.forEach(f=>D[f].modules.forEach((m,i)=>{if(m.wip)return;const s=(m.intro||'').split(/(?<=[.!?])\s/)[0];A.push([m.t,s,f,i])}));
 A.sort((a,b)=>a[0].localeCompare(b[0],'de'));const p=el('<h2>📖 Glossar</h2><p class="sub">Alle Themen von A bis Z mit einem Satz zur Einordnung. Tippe auf einen Begriff, um das Thema zu öffnen.</p>','panel nsl gls');
 p.append(filt(p,'Begriff suchen …'));const L={};A.forEach(a=>{const k=a[0][0].toUpperCase();(L[k]=L[k]||[]).push(a)});
 Object.keys(L).forEach(k=>p.append(el('<h3>'+k+'</h3>'+L[k].map(a=>'<div class="gli" data-s="'+esc((a[0]+' '+a[1]).toLowerCase())+'"><button type="button" class="lk" data-f="'+a[2]+'" data-i="'+a[3]+'">'+esc(a[0])+'</button><p>'+esc(a[1])+'</p></div>').join(''),'nsg')));
 p.querySelectorAll('.lk').forEach(b=>b.onclick=()=>openT(b.dataset.f,+b.dataset.i));v.append(p)}
/* Menü Lernen: Abschnitt „Nachschlagen“ */
const nav9=nav;nav=function(){nav9.apply(this,arguments);const b1=q('#fs [data-g="1"]');if(!b1)return;
 if(tab==='glossar'||tab==='formeln')b1.setAttribute('aria-pressed','true');
 b1.addEventListener('click',()=>{const m=q('#nm');if(m.hidden||m.querySelector('.nmns'))return;const h=el('<h3 class="nmns">Nachschlagen</h3>','').firstChild;m.append(h);
  ['glossar','formeln'].forEach(k=>{const l=TL[k],sp=l.indexOf(' '),x=document.createElement('button');x.type='button';x.setAttribute('role','menuitem');x.dataset.k=k;x.setAttribute('aria-current',String(tab===k));x.innerHTML='<span class="mi">'+l.slice(0,sp)+'</span><span>'+l.slice(sp+1)+'</span>';x.onclick=()=>{nmClose();go(k);scrollTo(0,0)};m.append(x)});
  /* „Weiter mit …“ wie im Lernlabor: klein und zweizeilig rechts neben Glossar und Formelsammlung */
  const w=m.querySelector('.nmw');if(w){const n=document.createElement('div');n.className='nmn';const l=document.createElement('div');m.querySelectorAll('[data-k="glossar"],[data-k="formeln"]').forEach(x=>l.append(x));const t=w.querySelector('span:last-child').textContent.replace(/^Weiter mit /,'');w.innerHTML='<small>↩ Weiter mit</small>'+esc(t);w.setAttribute('aria-label','Weiter mit '+t);n.append(l,w);m.append(n)}})};
/* Suche findet auch Glossar und Formelsammlung nicht doppelt: nichts zu tun. Start mit Adresse: */
if(/^#(glossar|formelsammlung)$/.test(location.hash)){const h=location.hash;go(h==='#glossar'?'glossar':'formeln')}else nav();
if(FACH.includes(tab)){const sp=q('#sim');if(sp){symLabels(sp);keepValues(sp,tab+':'+modSel[tab])}stepTrack()}
if(tab==='fall'&&/^#pruefungsaufgaben/.test(location.hash))restoreAnswers();
if(tab==='home'&&!q('#view .frt')&&chosen()){const y=scrollY;go('home');scrollTo(0,y)}
})();
