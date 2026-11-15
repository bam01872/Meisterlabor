/* ===== Version 10: Tutorial wie im Lernlabor =====
   Ich → Tutorial: sechs kurze Kapitel mit kleinen Übungen, Adresse #tutorial/n.
   Beim ersten Öffnen nur die Kurzeinführung (4 Karten), die auf das Tutorial verweist.
   Dazu FN-01 aus dem Lernlabor: „=“ und „≈“ nicht vom Wert trennen. */
(()=>{
const q=s=>document.querySelector(s);
const LG=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:v}catch(e){return d}},LS=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const nf=(x,d)=>x.toLocaleString('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d});
let TUK=0;
const seen=()=>{try{return JSON.parse(LG('meisterlabor-tut','[]'))||[]}catch(e){return []}};
const cnt=f=>D[f].modules.length+' Themen';

/* ---------- Kapitel ---------- */
const K=[
 {i:'🧭',t:'Navigation',z:'Vier Reiter, und so kommst Du immer zurück.',
  p:[['📱','Die <b>vier Reiter</b> stehen am Handy unten, am Laptop oben: Start, Lernen, Üben & Prüfen und Ich.'],
     ['↩️','Die <b>Zurück-Taste</b> des Handys oder Browsers führt zur vorigen Ansicht. Jedes Thema hat eine eigene Adresse, die Du teilen oder als QR-Code zeigen kannst.'],
     ['🏠','Die <b>Startseite</b> zeigt Deinen nächsten Kurstag und Deinen nächsten Schritt. Unter Lernen steht „↩ Weiter mit …“ mit dem Thema, bei dem Du aufgehört hast.']],
  d:'mb'},
 {i:'📚',t:'Fächer und Themen',z:'Vier Fächer, jedes Thema in drei Schritten.',
  p:[['🗂️','Im Thema tippst Du auf <b>„Thema wechseln ▾“</b>. Dann wählst Du in zwei Wischleisten erst das Gebiet, dann das Thema.'],
     ['👣','Jedes Thema hat drei <b>Schritte</b>: Vermuten, Ansehen, Üben. Die Leiste oben zeigt, wo Du gerade liest, und springt beim Antippen hin.'],
     ['📎','Unten im Thema liegt <b>Nachschlagen</b>: das Wichtigste, Grundgleichungen, „Verstehen und typische Fehler“ und Deine eigene Notiz. Glossar und Formelsammlung findest Du unter Lernen.']],
  d:'sl'},
 {i:'🎬',t:'Erklärvideos',z:'„Kurz erklärt“: jedes Thema in gut einer Minute.',
  p:[['▶️','Der Knopf <b>„🎬 Kurz erklärt“</b> steht im Thema unter der Vermutung. Die Länge steht daneben.'],
     ['🔇','Der <b>Ton</b> ist aus, der Text läuft mit. So geht es auch im Zug. Mit „🔇 Ton aus“ schaltest Du das Vorlesen ein.'],
     ['💡','Am besten erst <b>vermuten</b>, dann das Video ansehen. Danach weißt Du, ob Deine Vermutung stimmte, und behältst es besser.'],
     ['✏️','Unter dem Video steht die <b>Skizze</b>: das wichtigste Bild zum Thema, zum schnellen Nachschlagen vor der Prüfung.']],
  d:'pl'},
 {i:'✏️',t:'Üben',z:'Wissensfragen und Rechnen mit immer neuen Zahlen.',
  p:[['🎲','Rechenaufgaben kommen mit <b>neuen Werten</b>. Ergebnis eintippen, dann „Antwort prüfen“. Komma ist erlaubt, kleine Rundungsfehler zählen als richtig.'],
     ['💡','<b>Hilfe</b> zeigt erst einen Tipp, dann den Ansatz. Nach dem zweiten Versuch siehst Du den <b>Lösungsweg</b> Schritt für Schritt, mit Einheiten.'],
     ['🔁','„Gleiche Art, neue Zahlen“ übt dieselbe Aufgabe noch einmal. Fach und Typ wählst Du oben im Üben.']],
  d:'ub'},
 {i:'🎓',t:'Aufgaben für die Prüfung',z:'Alles unter Üben & Prüfen. Tippe auf „Ansehen“, um es auszuprobieren.',d:'ty'},
 {i:'📈',t:'Ich und Lerntipps',z:'Dein Stand, Deine Termine, Deine Daten.',
  p:[['📈','<b>Lernstand</b> zeigt, wie viele Themen Du bearbeitet hast und wie sicher Du bist.'],
     ['📅','<b>Meine Kurstermine</b> zeigt alle Unterrichtstage. Mit „In den Kalender“ übernimmst Du sie ins Handy.'],
     ['📤','<b>Lernfortschritt senden</b> erzeugt eine kleine Datei für Deinen Dozenten, nur wenn Du es willst.'],
     ['🎨','Unter <b>Sonstiges</b> wählst Du hell, dunkel oder wie das Gerät.'],
     ['🔒','Alles bleibt <b>auf Deinem Gerät</b>, ohne Konto und ohne Anmeldung.']],
  d:'tip'}];

/* ---------- Mini-Übungen ---------- */
const MB=[['🏠','Start','Dein nächster Kurstag, Dein nächster Schritt und die vier Fächer.'],
 ['📚','Lernen','Die vier Fächer, dazu Glossar, Formelsammlung und „↩ Weiter mit …“. Im Thema heißt dieser Reiter wie das Fach.',FACH.map(f=>D[f].icon+' '+D[f].name)],
 ['🎓','Üben & Prüfen','',['✏️ Üben','🎓 Prüfungsaufgaben','🗣️ Mündliche Prüfung','⏱️ Prüfungssimulation']],
 ['👤','Ich','',['📈 Lernstand','📤 Lernfortschritt senden','📅 Meine Kurstermine','🧭 Tutorial','⚙️ Sonstiges']]];
const SLX=[['Vermuten','Erst raten, dann nachsehen. Eine Frage, vier Antworten, keine Note.'],['Ansehen','Das Erklärvideo „Kurz erklärt“ und die Skizze zum Thema.'],['Üben','Check-Fragen und Rechenaufgaben zum Thema, gleich mit Lösungsweg.']];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
function demo(d,box){
 if(d==='mb'){box.innerHTML=`<h4>Probier es aus: tippe auf einen Reiter</h4><div class="tumb" role="group" aria-label="Menüband zum Ausprobieren">${MB.map((m,j)=>`<button type="button" data-j="${j}" aria-pressed="false"><span aria-hidden="true">${m[0]}</span>${m[1]}</button>`).join('')}</div><div class="tumbl" aria-live="polite"><span class="sub">Hier erscheint, was hinter dem Reiter steckt.</span></div>
  <h4 style="margin-top:12px">So kommst Du zurück</h4><div class="tuweg"><span>🤝 Konflikte lösen</span><b>→</b><span>✏️ Üben</span><b>→</b><span>↩️ Zurück-Taste</span></div><p class="sub" style="margin:6px 0 0">Die Zurück-Taste führt Dich wieder ins Thema, auch nach dem Üben.</p>`;
  const l=box.querySelector('.tumbl');box.querySelectorAll('.tumb button').forEach(b=>b.onclick=()=>{box.querySelectorAll('.tumb button').forEach(x=>x.setAttribute('aria-pressed',x===b));const m=MB[+b.dataset.j];l.innerHTML=`<b>${m[0]} ${m[1]}</b>${m[2]?`<p style="margin:4px 0 0">${m[2]}</p>`:''}${m[3]?`<ul>${m[3].map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}`});return}
 if(d==='sl'){box.innerHTML=`<h4>Die Schrittleiste im Thema: tippe einen Schritt an</h4><div class="tusl" role="group" aria-label="Schritte">${SLX.map((s,j)=>`<button type="button" data-j="${j}" aria-pressed="${!j}">${j+1} ${s[0]}</button>`).join('')}</div><p class="tumbl" aria-live="polite" style="min-height:0">${SLX[0][1]}</p>
  <h4 style="margin-top:12px">Die Fächer</h4><div class="tufa">${FACH.map(f=>`<button type="button" data-f="${f}"><span>${D[f].icon} ${esc(D[f].kurz)}</span><span class="tucn">${cnt(f)}</span></button>`).join('')}</div><p class="sub" style="margin:0">Ein Tipp öffnet das Fach, mit der Zurück-Taste kommst Du wieder hierher.</p>`;
  const l=box.querySelector('.tumbl');box.querySelectorAll('.tusl button').forEach(b=>b.onclick=()=>{box.querySelectorAll('.tusl button').forEach(x=>x.setAttribute('aria-pressed',x===b));l.textContent=SLX[+b.dataset.j][1]});
  box.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{go(b.dataset.f);scrollTo(0,0)});return}
 if(d==='pl'){box.innerHTML=`<h4>Die Knöpfe im Video</h4><div class="tupl" aria-hidden="true"><span>⏮</span><span>⏸ Pause</span><span>⏭</span><span>🔇 Ton aus</span><span>✕</span></div>
  <dl class="tuple"><dt>⏮ ⏭</dt><dd>eine Szene zurück oder weiter</dd><dt>⏸ Pause</dt><dd>anhalten, in Ruhe das Bild ansehen</dd><dt>🔇 Ton aus</dt><dd>Vorlesen ein- oder ausschalten</dd><dt>✕</dt><dd>Video schließen</dd></dl>`;return}
 if(d==='ub'){let p,kv,hi=0,tr=0;const neu=()=>{p=40+5*Math.floor(Math.random()*11);kv=p-(8+2*Math.floor(Math.random()*8));hi=0;tr=0;draw()};
  const draw=()=>{const db=p-kv;box.innerHTML=`<h4>Mini-Aufgabe: probier es aus</h4><p class="tuq">Ein Teil wird für ${p} € verkauft. Die variablen Kosten betragen ${kv} € je Stück. Wie hoch ist der Deckungsbeitrag je Stück?</p>
   <div class="tuin"><input inputmode="decimal" placeholder="Antwort" aria-label="Antwort in Euro" autocomplete="off"><b>€</b><button type="button" class="btn tuck">Antwort prüfen</button></div><div class="tufb" aria-live="polite" hidden></div>
   <div class="tugo" style="margin-top:10px"><button type="button" class="chip tuhi">💡 Hilfe</button><button type="button" class="chip tulb">Lösungsweg</button><button type="button" class="chip tunw">🎲 Neue Werte</button></div><div class="tulw" hidden></div>`;
   const inp=box.querySelector('input'),fb=box.querySelector('.tufb'),lw=box.querySelector('.tulw');
   const chk=()=>{const v=parseFloat(inp.value.replace(/\s|€/g,'').replace(',','.'));fb.hidden=false;if(!isFinite(v)){fb.className='tufb no';fb.textContent='Bitte eine Zahl eingeben, z. B. 18 oder 18,50.';return}tr++;
    if(Math.abs(v-db)<.01){fb.className='tufb ok';fb.textContent='✓ Richtig! Genau so prüft die App Deine Ergebnisse.'}else{fb.className='tufb no';fb.textContent=tr<2?'Noch nicht. Versuch es nochmal oder tippe auf „💡 Hilfe“.':'Noch nicht. Schau Dir den Lösungsweg an, danach klappt es mit „🎲 Neue Werte“.'}};
   box.querySelector('.tuck').onclick=chk;inp.onkeydown=e=>{if(e.key==='Enter')chk()};
   box.querySelector('.tuhi').onclick=()=>{hi++;lw.hidden=false;lw.innerHTML=hi<2?'<p><b>Tipp:</b> Der Deckungsbeitrag ist das, was ein Stück zur Deckung der Fixkosten beiträgt.</p><p class="sub">Tippe nochmal auf „💡 Hilfe“ für den Ansatz.</p>':'<p><b>Ansatz:</b> Deckungsbeitrag je Stück = Verkaufspreis − variable Kosten je Stück</p>'};
   box.querySelector('.tulb').onclick=()=>{lw.hidden=false;lw.innerHTML=`<p><b>Lösungsweg</b></p><p>db = p − k<sub>v</sub></p><p>db = ${p} € − ${kv} €</p><p>db = ${db} €</p>`};
   box.querySelector('.tunw').onclick=neu};neu();return}
 if(d==='ty'){const T=[['✏️','Üben','Wissensfragen und Rechenaufgaben zu allen vier Fächern, mit Hilfe und Lösungsweg. Der Grundstein für alles andere.','uben'],
   ['🎓','Prüfungsaufgaben','Situationen aus dem Betrieb mit mehreren Teilaufgaben, wie in der schriftlichen Prüfung. Du schreibst Deine Antwort und hakst sie mit dem Erwartungshorizont ab.','fall'],
   ['🗣️','Mündliche Prüfung','Fragen wie in der mündlichen Ergänzungsprüfung. Erst laut antworten, dann die Antwort anzeigen. Geht auch zu zweit.','oral'],
   ['⏱️','Prüfungssimulation','Wie die IHK-Klausur: Fallaufgaben mit Rechenteil, auf 100 Punkte bewertet. Lang in 90 Minuten oder kurz in 30 Minuten. Am besten erst, wenn die Themen sitzen.','sim']];
  box.className='';box.innerHTML=`<div class="tuty">${T.map((t,j)=>`<div><div class="tutyh"><h4>${t[0]} ${t[1]}</h4><button type="button" class="chip" data-j="${j}" aria-label="${t[1]} ansehen">Ansehen ›</button></div><p>${t[2]}</p></div>`).join('')}</div>
   <div class="tudemo"><h4>Ein guter Weg zur Prüfung</h4><div class="tuwg"><span>📚 Thema</span><b>→</b><span>✏️ Üben</span><b>→</b><span>🎓 Prüfungsaufgaben</span><b>→</b><span>🗣️ Mündlich</span><b>→</b><span>⏱️ Simulation</span></div><p class="sub" style="margin:8px 0 0">Ein Vorschlag, keine Pflicht. Mit der Zurück-Taste kommst Du jederzeit wieder ins Tutorial.</p></div>`;
  box.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{go(T[+b.dataset.j][3]);scrollTo(0,0)});return}
 if(d==='tip'){box.innerHTML=`<h4>So holst Du am meisten heraus</h4><ul class="tupt"><li><span>⏰</span><span><b>Lieber oft und kurz:</b> An vier Tagen je 15 Minuten bringt mehr als zwei Stunden am Abend vor dem Kurstag.</span></li><li><span>🔮</span><span><b>Erst vermuten, dann ansehen:</b> Wer vorher rät, merkt sich das Ergebnis besser, auch wenn die Vermutung falsch war.</span></li><li><span>📖</span><span><b>Das Thema vor dem Kurstag lesen:</b> Dann kannst Du im Unterricht gezielt fragen.</span></li><li><span>📝</span><span><b>Mit Papier und Taschenrechner rechnen</b>, wie in der Prüfung.</span></li><li><span>📲</span><span><b>Auf den Home-Bildschirm legen:</b> Dann startet Lernlabor Betrieb wie eine App.</span></li></ul>`;return}}

const GO=[[['🏠 Zur Startseite',()=>{go('home');scrollTo(0,0)}]],
 [['Beispiel: Konflikte lösen ›',()=>{const i=D.zib.modules.findIndex(m=>m.t==='Konflikte lösen');if(i>=0)modSel.zib=i;go('zib');scrollTo(0,0)}]],
 [['🎬 Video im Thema ansehen ›',()=>{const i=D.mikp.modules.findIndex(m=>m.t==='Statistik & Qualitätswerkzeuge');if(i>=0)modSel.mikp=i;go('mikp');setTimeout(()=>{const b=q('.einb');if(b){b.scrollIntoView({block:'center'});b.click()}},250)}]],
 [['✏️ Zum Üben ›',()=>{go('uben');scrollTo(0,0)}]],
 [],
 [['📈 Zum Lernstand ›',()=>{go('stand');scrollTo(0,0)}]]];

function tutView(v){const k=TUK,c=K[k],s=seen();if(!s.includes(k)){s.push(k);LS('meisterlabor-tut',JSON.stringify(s))}
 v.innerHTML=`<div id="tut"><div class="panel"><div class="tuh"><div><h2>🧭 Tutorial</h2><p class="sub" style="margin:0">Freiwillig: sechs kurze Kapitel, je etwa eine Minute. Spring hin und her, wie Du magst, oder entdecke die App einfach selbst.</p></div></div>
 <div class="tunav" role="tablist" aria-label="Kapitel">${K.map((x,j)=>`<button type="button" role="tab" data-k="${j}" aria-current="${j===k}" aria-selected="${j===k}" class="${s.includes(j)&&j!==k?'dn':''}"><i>${s.includes(j)&&j!==k?'✓':j+1}</i>${x.t}</button>`).join('')}</div>
 <div class="tuk" role="tabpanel"><h3>${c.i} ${c.t}</h3><p class="tuz">${c.z}</p>
 ${c.p?`<ul class="tupt">${c.p.map(x=>`<li><span aria-hidden="true">${x[0]}</span><span>${x[1]}</span></li>`).join('')}</ul>`:''}
 <div class="${c.d==='ty'?'':'tudemo'}" id="tudm"></div>
 ${GO[k].length?`<div class="tugo">${GO[k].map((g,j)=>`<button type="button" class="btn sec" data-go="${j}">${g[0]}</button>`).join('')}</div>`:''}
 <div class="tubt"><button type="button" class="btn sec" id="tupv"${k?'':' disabled'}>‹ Zurück</button><span class="sub">${k+1} von ${K.length}</span><button type="button" class="btn" id="tunx">${k<K.length-1?'Weiter ›':'Fertig ✓'}</button></div></div></div></div>`;
 const box=v.querySelector('#tut');demo(c.d,box.querySelector('#tudm'));
 const to=j=>{TUK=j;try{history.replaceState(history.state,'','#tutorial/'+(j+1))}catch(e){}tutView(v);const p=box.querySelector('.tuk');const t=v.querySelector('#tut');if(t&&t.getBoundingClientRect().top<0)t.scrollIntoView({block:'start'})};
 v.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>to(+b.dataset.k));
 v.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>GO[k][+b.dataset.go][1]());
 v.querySelector('#tupv').onclick=()=>{if(k)to(k-1)};v.querySelector('#tunx').onclick=()=>{if(k<K.length-1)to(k+1);else{go('home');scrollTo(0,0)}};
 const a=v.querySelector('.tunav [aria-current="true"]'),n=v.querySelector('.tunav');if(a&&n){const ar=a.getBoundingClientRect(),nr=n.getBoundingClientRect();if(ar.right>nr.right||ar.left<nr.left)n.scrollLeft+=ar.left-nr.left-8}}

/* Läuft vor ll-bedienung.js, damit #tutorial/n beim Laden schon hierher führt.
   Ansicht „tour“ = Tutorial (Menü Ich → Tutorial, Adresse #tutorial/n) */
const goT=go;go=function(t){if(t!=='tour')return goT.apply(this,arguments);
 const m=(location.hash||'').match(/^#tutorial\/(\d+)/);if(m)TUK=Math.max(0,Math.min(K.length-1,+m[1]-1));
 KI.stop();tab='tour';setAcc(null);nav();draw();if(window.llSync)llSync()};
const drawT=draw;draw=function(){if(tab==='tour'){const v=q('#view');v.innerHTML='';tutView(v);return}drawT()};
window.tutOpen=k=>{TUK=Math.max(0,Math.min(K.length-1,k|0));go('tour');scrollTo(0,0)};

/* Was ist neu (Ich → Sonstiges) */
setTimeout(()=>{const drawN=draw;draw=function(){drawN();if(tab!=='sonst')return;const d=q('#view .vneu');if(d&&!d.querySelector('.v10')){const s=d.querySelector('summary');s.insertAdjacentHTML('afterend','<div class="v10"><h3>🆕 Neu in Version 10</h3><ul><li>Tutorial unter 👤 Ich › 🧭 Tutorial: sechs kurze Kapitel mit kleinen Übungen, wie im Lernlabor.</li><li>Beim ersten Öffnen eine Kurzeinführung in vier Karten, die auf das Tutorial verweist.</li></ul><h3>Version 9</h3><ul><li>Alle 49 Themen haben jetzt Vermuten, ein Erklärvideo „Kurz erklärt“ und eine Skizze.</li></ul><h3>Version 8</h3><ul><li>Bedienung und Gestaltung wie im Lernlabor: Thema wechseln, Schrittleiste, Nachschlagen, Üben mit Hilfe und Lösungsweg, eigene Adresse je Thema.</li></ul></div>')}}},0);

/* FN-01: Größe, „=“ und Wert nicht trennen (geschütztes Leerzeichen um = und ≈ in sichtbaren Texten) */
(()=>{const RX=/ ([=≈]) /g,SKIP='SCRIPT,STYLE,TEXTAREA,INPUT,OPTION,svg,text,tspan';
 const fix=root=>{if(!root||root.nodeType!==1&&root.nodeType!==3)return;if(root.nodeType===3){if(root.nodeValue.indexOf(' = ')>-1||root.nodeValue.indexOf(' ≈ ')>-1){const p=root.parentElement;if(p&&!p.closest(SKIP))root.nodeValue=root.nodeValue.replace(RX,' $1 ')}return}
  if(root.closest&&root.closest(SKIP))return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const L=[];while(n=w.nextNode())if(n.nodeValue.indexOf(' = ')>-1||n.nodeValue.indexOf(' ≈ ')>-1)L.push(n);L.forEach(fix)};
 fix(document.body);let qq=new Set(),t=0;
 new MutationObserver(ms=>{ms.forEach(x=>x.addedNodes.forEach(a=>qq.add(a)));if(!t)t=requestAnimationFrame(()=>{t=0;const a=[...qq];qq.clear();a.forEach(fix)})}).observe(document.body,{childList:true,subtree:true})})();

})();
