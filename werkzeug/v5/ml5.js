/* ===== Version 5: Lernlabor-Stil. Markenfarbe, Startseite „Dein nächster Schritt“, Themenseite mit Schrittleiste,
   „Vermute zuerst“, „Kurz erklärt“ (animierte Erklärszenen wie im Lernlabor), Skizze, Merkbox, Üben, Nachschlagen. ===== */
const ML5=(()=>{
/* ---------- Markenfarbe ---------- */
const BRN={bordeaux:'Bordeaux',kupfer:'Kupfer',koenigsblau:'Königsblau'};
let brand='bordeaux';
try{const q=new URLSearchParams(location.search).get('farbe')||(window.ML5PREV&&localStorage.getItem('meisterlabor-farbe'));if(q&&BRN[q])brand=q}catch(e){}
document.documentElement.dataset.brand=brand;
/* Nur in der Vorschau: Umschalter für die drei Farben */
if(window.ML5PREV){const w=document.createElement('div');w.className='brsw';w.innerHTML='<b>Farbe:</b>'+Object.keys(BRN).map(k=>'<button type="button" data-b="'+k+'" aria-pressed="'+(k===brand)+'">'+BRN[k]+'</button>').join('');
 w.querySelectorAll('button').forEach(b=>b.onclick=()=>{brand=b.dataset.b;document.documentElement.dataset.brand=brand;try{localStorage.setItem('meisterlabor-farbe',brand)}catch(e){}w.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b))});document.body.append(w)}
setAcc=function(f){document.documentElement.style.setProperty('--acc',f&&D[f]?D[f].col:'var(--brand)')};
setAcc(FACH.includes(tab)?tab:null);

const lsG=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}};
const lsS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const RFK='meisterlabor-rf',PK='meisterlabor-pred',LK='meisterlabor-last';

/* ---------- Zeichenhelfer für die Erklärszenen (Bild 480 × 270) ---------- */
const F=n=>(+n).toFixed(1),cl=x=>Math.max(0,Math.min(1,x)),ez=x=>{x=cl(x);return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2},ph=(k,a,b)=>ez((k-a)/(b-a));
const T=(x,y,s,c='ein2',a='start',st='')=>`<text x="${F(x)}" y="${F(y)}" class="${c}" text-anchor="${a}"${st?` style="${st}"`:''}>${s}</text>`;
const RC=(x,y,w,h,f='var(--card)',s='var(--line)',r=10,sw=1.5,ex='')=>`<rect x="${F(x)}" y="${F(y)}" width="${F(Math.max(0,w))}" height="${F(Math.max(0,h))}" rx="${r}" fill="${f}" stroke="${s}" stroke-width="${sw}"${ex}/>`;
const OP=(o,s)=>o<=.01?'':o>=.99?s:`<g opacity="${o.toFixed(2)}">${s}</g>`;
const POP=(x,y,p,s)=>p<=.01?'':`<g transform="translate(${F(x)} ${F(y)}) scale(${ez(p).toFixed(3)}) translate(${F(-x)} ${F(-y)})">${s}</g>`;
const AR=(x1,y1,x2,y2,c='var(--ink)',w=2,da)=>{const a=Math.atan2(y2-y1,x2-x1),L=10,bx=x2-L*Math.cos(a),by=y2-L*Math.sin(a),px=Math.sin(a)*5.5,py=-Math.cos(a)*5.5;
 return `<path d="M${F(x1)} ${F(y1)}L${F(bx)} ${F(by)}" stroke="${c}" stroke-width="${w}" fill="none"${da?' stroke-dasharray="6 5"':''}/><path d="M${F(x2)} ${F(y2)}L${F(bx+px)} ${F(by+py)}L${F(bx-px)} ${F(by-py)}Z" fill="${c}"/>`};
const ARp=(x1,y1,x2,y2,p,c,w,da)=>p<=.03?'':AR(x1,y1,x1+(x2-x1)*ez(p),y1+(y2-y1)*ez(p),c,w,da);
const OK=(x,y,r=13)=>`<circle cx="${F(x)}" cy="${F(y)}" r="${r}" fill="var(--ok)"/><path d="M${F(x-r*.45)} ${F(y)}l${F(r*.32)} ${F(r*.38)} ${F(r*.62)}-${F(r*.75)}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
const NO=(x,y,r=13)=>`<circle cx="${F(x)}" cy="${F(y)}" r="${r}" fill="var(--red)"/><path d="M${F(x-r*.38)} ${F(y-r*.38)}l${F(r*.76)} ${F(r*.76)}M${F(x+r*.38)} ${F(y-r*.38)}l-${F(r*.76)} ${F(r*.76)}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
const PER=(x,y,c,s=1)=>`<g transform="translate(${F(x)} ${F(y)}) scale(${s})"><circle cx="0" cy="-64" r="13" fill="${c}"/><path d="M-21 0V-30a21 21 0 0 1 42 0V0Z" fill="${c}"/></g>`;
const DOC=(x,y,w,h,o={})=>{let s=`<path d="M${F(x)} ${F(y)}h${F(w-16)}l16 16v${F(h-16)}h${F(-w)}Z" fill="var(--card)" stroke="var(--ink)" stroke-width="1.5"/><path d="M${F(x+w-16)} ${F(y)}v16h16" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`;
 const n=o.n==null?4:o.n;for(let i=0;i<n;i++)s+=`<path d="M${F(x+10)} ${F(y+22+i*11)}h${F((w-24)*(i%3===2?.55:1))}" stroke="var(--line)" stroke-width="3" stroke-linecap="round"/>`;
 if(o.sig)s+=`<path d="M${F(x+12)} ${F(y+h-14)}c6-14 12 4 17-4s9-10 13 0 7 4 13-6" fill="none" stroke="var(--flow)" stroke-width="2.2" stroke-linecap="round"/>`;return s};
const ENV=(x,y,w,h)=>RC(x,y,w,h,'var(--card)','var(--ink)',4)+`<path d="M${F(x)} ${F(y)}L${F(x+w/2)} ${F(y+h*.55)}L${F(x+w)} ${F(y)}" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`;
const CTX=document.createElement('canvas').getContext('2d');
const TW=(s,fs=19)=>{try{CTX.font='600 '+fs+'px "Schibsted Grotesk",system-ui,sans-serif';return CTX.measureText(String(s)).width}catch(e){return String(s).length*fs*.54}};
/* Formel in einer Zeile mit echtem Bruchstrich: Teile sind Text oder {n,d} */
const FORM=(x,y,parts,a='start',c='einf',fs=19)=>{const W=parts.map(p=>typeof p==='string'?TW(p,fs):Math.max(TW(p.n,fs),TW(p.d,fs))+12),tot=W.reduce((s,w)=>s+w,0);let cx=a==='middle'?x-tot/2:x,s='';
 parts.forEach((p,i)=>{if(typeof p==='string')s+=T(cx,y,p,c,'start','white-space:pre');else{const m=cx+W[i]/2;s+=T(m,y-9,p.n,c,'middle')+`<path d="M${F(cx+1)} ${F(y-3)}h${F(W[i]-2)}" stroke="var(--ink)" stroke-width="1.6"/>`+T(m,y+17,p.d,c,'middle')}cx+=W[i]});return s};
const GEAR=(x,y,r,c)=>{let s='';for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=`<rect x="${F(-6)}" y="${F(-r-9)}" width="12" height="14" rx="2" fill="${c}" transform="translate(${F(x)} ${F(y)}) rotate(${F(a*180/Math.PI)})"/>`}
 return s+`<circle cx="${F(x)}" cy="${F(y)}" r="${r}" fill="${c}"/><circle cx="${F(x)}" cy="${F(y)}" r="${F(r*.38)}" fill="var(--bg)"/>`};
const BUB=(x,y,w,h,c='var(--line)',tail=1,sw=1.5)=>`<path d="M${F(x+12)} ${F(y)}h${F(w-24)}a12 12 0 0 1 12 12v${F(h-24)}a12 12 0 0 1-12 12H${F(x+(tail>0?44:w-28))}l${tail>0?-16:16} 14v-14H${F(x+12)}a12 12 0 0 1-12-12v${F(-(h-24))}a12 12 0 0 1 12-12Z" fill="var(--card)" stroke="${c}" stroke-width="${sw}"/>`;

/* ---------- Inhalte der Mustermodule: Vermutung [Frage, Optionen, richtig, Auflösung], Erklärszenen ---------- */
const X={};
X['Arbeitsvertrag & Kündigung']={
 v:['Ein Chef schickt einem Mitarbeiter die Kündigung als Foto des unterschriebenen Briefs per WhatsApp. Ist die Kündigung wirksam?',
  ['Ja, die Unterschrift ist ja zu sehen.','Ja, sobald er die Nachricht gelesen hat.','Nein, das unterschriebene Original muss ihm zugehen.','Nur mit Lesebestätigung.'],2,
  'Die Kündigung braucht die Schriftform (§ 623 BGB): Das Original mit eigenhändiger Unterschrift muss beim Mitarbeiter ankommen. Foto, Scan, E-Mail oder Fax reichen nicht.'],
 ein:[
 {d:11,t:'Ein Arbeitsvertrag gilt auch per Handschlag. Der Arbeitgeber muss die wichtigsten Bedingungen aber nachweisen (Nachweisgesetz), seit 2025 auch in Textform.',
  f:k=>{const a=ph(k,.05,.3),b=ph(k,.45,.75);
   return T(152,36,'Vertrag per Handschlag','ein1','middle')+
    (a>0?`<path d="M98 182L${F(98+(150-98)*a)} ${F(182-14*a)}" stroke="var(--acc)" stroke-width="9" stroke-linecap="round"/><path d="M207 182L${F(207-(207-154)*a)} ${F(182-14*a)}" stroke="var(--flow)" stroke-width="9" stroke-linecap="round"/>`:'')+
    PER(80,212,'var(--acc)')+PER(225,212,'var(--flow)')+POP(152,128,ph(k,.28,.4),OK(152,128))+
    T(80,240,'Arbeitgeber','ein2','middle')+T(225,240,'Arbeitnehmer','ein2','middle')+
    OP(b,`<g transform="translate(${F(120*(1-b))} 0)">`+DOC(330,62,110,140,{n:7,sig:0})+T(385,232,'Nachweis','ein1','middle')+T(385,256,'(Nachweisgesetz)','ein2','middle')+'</g>')}},
 {d:12,t:'Die Kündigung braucht die Schriftform: ein Brief im Original mit eigenhändiger Unterschrift (§ 623 BGB). E-Mail, WhatsApp und Fax reichen nicht.',
  f:k=>{const X0=[20,135,250,365],L=['Brief','E-Mail','WhatsApp','Fax'];let s=T(240,34,'Kündigung nur schriftlich','ein1','middle');
   X0.forEach((x,i)=>{const p=ph(k,.03+i*.1,.16+i*.1),cx=x+50;let ic='';
    if(i===0)ic=DOC(cx-30,70,60,82,{n:4,sig:1});
    if(i===1)ic=ENV(cx-34,88,68,46)+T(cx,166,'@','ein1','middle');
    if(i===2)ic=RC(cx-22,68,44,86,'var(--card)','var(--ink)',8)+RC(cx-15,86,30,20,'color-mix(in srgb,var(--ok) 35%,var(--card))','none',6,0)+RC(cx-15,112,24,16,'var(--line)','none',6,0);
    if(i===3)ic=`<path d="M${cx-20} 104V78h40v26" fill="var(--card)" stroke="var(--ink)" stroke-width="1.5"/>`+RC(cx-36,102,72,44,'var(--line)','var(--ink)',6)+RC(cx-26,112,26,10,'var(--card)','none',3,0);
    s+=OP(p,RC(x,50,100,140,'var(--card)',i?'var(--line)':'var(--ok)',12,i?1.5:2.5)+ic+T(cx,216,L[i],'ein2','middle'));
    s+=POP(x+88,58,ph(k,.5+i*.09,.6+i*.09),i?NO(x+88,58):OK(x+88,58))});
   return s+OP(ph(k,.85,.95),T(240,250,'eigenhändig unterschrieben','ein3','middle'))}},
 {d:12,t:'Die Frist läuft erst ab dem Zugang beim Mitarbeiter, nicht ab dem Datum im Brief. Sicher sind die Übergabe vor Zeugen oder das Einwurf-Einschreiben.',
  f:k=>{const a=ph(k,.08,.45),b=ph(k,.52,.85),lx=60+270*a,ly=150-46*Math.sin(Math.PI*a);
   let s=T(240,34,'Die Frist startet mit dem Zugang','ein1','middle')+`<path d="M20 200H460" stroke="var(--ink)" stroke-width="2"/>`;
   for(let i=0;i<12;i++)s+=`<path d="M${30+i*38} 194v12" stroke="var(--mute)" stroke-width="1.5"/>`;
   s+=`<circle cx="60" cy="200" r="5" fill="var(--mute)"/>`+T(20,228,'Datum im Brief','ein2');
   s+=`<path d="M330 172V200" stroke="var(--ink)" stroke-width="4"/>`+RC(304,134,52,38,'var(--amber)','var(--ink)',8)+`<path d="M314 146h32" stroke="var(--ink)" stroke-width="3"/>`;
   if(a<1)s+=ENV(lx-24,ly-16,48,32);
   if(a>=1)s+=`<circle cx="330" cy="200" r="7" fill="var(--acc)"/>`+T(330,228,'Zugang','ein3','middle');
   s+=ARp(338,200,462,200,b,'var(--acc)',5)+OP(b,T(400,256,'Frist läuft','ein3','middle'))+POP(60,170,ph(k,.75,.85),NO(60,170,11));
   return s}},
 {d:14,t:'Fristen: In der Probezeit 2 Wochen, sonst 4 Wochen zum 15. oder zum Monatsende. Kündigt der Arbeitgeber, wird die Frist mit der Betriebszugehörigkeit länger, bis 7 Monate.',
  f:k=>{const R=[['Probezeit',.46,'2 Wochen',0],['Grundfrist',.92,'4 Wochen',0],['ab 2 Jahren',1,'1 Monat',1],['ab 5 Jahren',2,'2 Monate',1],['ab 10 Jahren',4,'4 Monate',1],['ab 20 Jahren',7,'7 Monate',1]];
   let s=T(20,30,'Kündigungsfristen (§ 622 BGB)','ein1')+`<path d="M140 44V230" stroke="var(--ink)" stroke-width="1.5"/>`;
   R.forEach((r,i)=>{const y=48+i*30,p=ph(k,.05+i*.11,.2+i*.11),w=r[1]*34*p;
    s+=T(132,y+16,r[0],'ein2','end','font-size:16px')+RC(140,y,w,20,r[3]?'var(--acc)':'var(--amber)','none',4,0)+OP(p,T(148+r[1]*34,y+16,r[2],'ein3','start','font-size:16px'))});
   return s+OP(ph(k,.75,.88),RC(140,238,16,14,'var(--acc)','none',3,0)+T(162,251,'gilt nur, wenn der Arbeitgeber kündigt','ein2','start','font-size:16px'))}},
 {d:14,t:'Nach 6 Monaten in einem Betrieb mit mehr als 10 Arbeitnehmern gilt Kündigungsschutz. Dann braucht die Kündigung einen Grund in der Person, im Verhalten oder im Betrieb.',
  f:k=>{const a=ph(k,.03,.2),b=ph(k,.15,.32),c=ph(k,.38,.5);let s=T(240,32,'Kündigungsschutzgesetz','ein1','middle');
   s+=OP(a,RC(20,52,180,62)+T(110,80,'über 6 Monate','ein3','middle')+T(110,104,'im Betrieb','ein2','middle'))+OP(b,T(110,132,'und','ein2','middle')+RC(20,142,180,62)+T(110,170,'mehr als 10','ein3','middle')+T(110,194,'Arbeitnehmer','ein2','middle'));
   s+=ARp(206,128,244,128,c,'var(--ink)',2.5);
   s+=OP(c,`<path d="M274 92l28 10v26c0 22-14 36-28 42-14-6-28-20-28-42v-26Z" fill="color-mix(in srgb,var(--acc) 22%,var(--card))" stroke="var(--acc)" stroke-width="2.5"/>`+T(274,136,'§','ein1','middle'));
   s+=OP(ph(k,.5,.6),T(318,62,'Grund nötig:','ein2'));
   [['👤','Person'],['⚠️','Verhalten'],['🏭','Betrieb']].forEach((g,i)=>{s+=OP(ph(k,.58+i*.1,.68+i*.1),RC(316,72+i*50,150,42)+T(330,100+i*50,g[0],'ein2','start','font-size:18px')+T(362,100+i*50,g[1],'ein3'))});
   return s+OP(ph(k,.88,.97),T(391,240,'Verhalten: meist erst','ein2','middle','font-size:15px')+T(391,258,'nach Abmahnung','ein2','middle','font-size:15px'))}},
 {d:12,t:'Vor jeder Kündigung muss der Betriebsrat angehört werden, sonst ist sie unwirksam. Der Mitarbeiter kann innerhalb von 3 Wochen nach Zugang klagen.',
  f:k=>{let s=T(240,32,'Reihenfolge einhalten','ein1','middle');const B=[15,175,335];
   B.forEach((x,i)=>{const p=ph(k,.04+i*.22,.18+i*.22);let ic='';
    if(i===0)ic=PER(x+38,152,'var(--acc)',.55)+PER(x+65,146,'var(--acc)',.62)+PER(x+92,152,'var(--acc)',.55);
    if(i===1)ic=DOC(x+35,72,60,82,{n:4,sig:1});
    if(i===2){for(let j=0;j<21;j++){const r=Math.floor(j/7),c=j%7,on=j<21*ph(k,.6,.9);ic+=RC(x+13+c*15,80+r*17,12,13,on?'var(--acc)':'var(--card)','var(--line)',2,1)}ic+=T(x+65,160,'21 Tage','ein3','middle')}
    s+=OP(p,RC(x,58,130,120)+ic+T(x+65,206,['Betriebsrat','Kündigung','3 Wochen'][i],'ein3','middle')+T(x+65,230,['anhören','zustellen','Klagefrist'][i],'ein2','middle'));
    if(i<2)s+=ARp(x+134,118,x+170,118,ph(k,.16+i*.22,.24+i*.22),'var(--ink)',2.5)});
   return s+OP(ph(k,.9,.98),T(80,258,'sonst unwirksam','ein3','middle','fill:var(--red)'))}}]};

X['Kostenrechnung & Kalkulation']={
 v:['Ein Bauteil braucht 200 € Material und 100 € Fertigungslohn. Wo liegt der Listenpreis für den Kunden ungefähr?',
  ['bei 300 €','bei etwa 330 €','bei etwa 750 €','bei genau 600 €'],2,
  'Auf Material und Lohn kommen Gemeinkosten, Verwaltung, Vertrieb, Gewinn, Skonto und Rabatt. Im Erklärvideo werden aus 300 € Einzelkosten 748,30 € Listenpreis. Die genauen Zuschlagssätze hängen vom Betrieb ab.'],
 ein:[
 {d:12,t:'Einzelkosten lassen sich dem Produkt direkt zuordnen, etwa Material und Lohn. Gemeinkosten nicht, etwa Miete, Strom oder das Meistergehalt.',
  f:k=>{const a=ph(k,.05,.35),b=ph(k,.45,.75);
   let s=GEAR(240,140,30,'color-mix(in srgb,var(--acc) 70%,var(--card))')+T(240,206,'Bauteil','ein3','middle');
   s+=OP(a,T(92,40,'Einzelkosten','ein1','middle')+RC(20,62,145,44,'var(--card)','var(--acc)',10,2)+T(92,90,'Material 200 €','ein3','middle')+RC(20,142,145,44,'var(--card)','var(--acc)',10,2)+T(92,170,'Lohn 100 €','ein3','middle')+T(92,226,'direkt zuzuordnen','ein2','middle'));
   s+=ARp(168,84,204,124,a,'var(--acc)',2.5)+ARp(168,164,204,150,a,'var(--acc)',2.5);
   s+=OP(b,T(388,40,'Gemeinkosten','ein1','middle')+['Miete','Strom','Meister'].map((n,i)=>RC(330,58+i*42,116,32,'var(--card)','var(--mute)',16,1.5,' stroke-dasharray="5 4"')+T(388,80+i*42,n,'ein3','middle')).join('')+T(388,226,'nur über Zuschläge','ein2','middle'));
   s+=ARp(326,116,282,136,b,'var(--mute)',2,1);
   return s}},
 {d:12,t:'Gemeinkosten verteilt man mit Zuschlagssätzen. Beispiel: 50 000 € Materialgemeinkosten auf 200 000 € Material sind 25 %.',
  f:k=>T(240,36,'Zuschlagssatz','ein1','middle')+OP(ph(k,.05,.25),FORM(240,112,['Zuschlagssatz = ',{n:'Gemeinkosten',d:'Einzelkosten'},' · 100 %'],'middle'))+
   OP(ph(k,.45,.65),FORM(240,196,['MGK-Satz = ',{n:'50 000 €',d:'200 000 €'},' · 100 % = 25 %'],'middle'))+OP(ph(k,.7,.85),T(240,252,'MGK: Materialgemeinkosten, aus dem BAB','ein2','middle','font-size:16px'))},
 {d:13,t:'Material: 200 € plus 25 % ergibt 250 €. Fertigung: 100 € Lohn plus 150 % ergibt 250 €. Zusammen sind das 500 € Herstellkosten.',
  f:k=>{const S=.28,base=222,col=(x,segs,p,lab,tot)=>{let y=base,s='';segs.forEach((g,i)=>{const h=g[0]*S*cl(p*segs.length-i);if(h<=0)return;y-=h;s+=RC(x,y,72,h,g[1],'var(--card)',3,1);if(g[2]&&h>20)s+=T(x+36,y+h/2+6,g[2],'einw','middle');if(g[3]&&h>3)s+=OP(cl(p*segs.length-i),T(x+80,y+h/2+6,g[3],'ein2','start','font-size:16px'))});
    return s+T(x+36,248,lab,'ein3','middle',lab.length>10?'font-size:15px':'')+OP(ph(p,.9,1),T(x+36,y-10,tot,'ein1','middle'))};
   const A='var(--acc)',L='color-mix(in srgb,var(--acc) 40%,var(--card))';
   return col(30,[[200,A,'200 €'],[50,L,'','+ 50 €']],ph(k,.04,.34),'Material','250 €')+col(190,[[100,A,'100 €'],[150,L,'','+ 150 €']],ph(k,.36,.66),'Fertigung','250 €')+
    ARp(340,150,368,150,ph(k,.68,.75),'var(--ink)',2.5)+col(380,[[250,A,'250 €'],[250,A,'250 €']],ph(k,.74,.96),'Herstellkosten','500 €')}},
 {d:12,t:'Auf die Herstellkosten kommen 20 % für Verwaltung und Vertrieb: 600 € Selbstkosten. Mit 10 % Gewinn auf die Selbstkosten ergibt sich der Barverkaufspreis von 660 €.',
  f:k=>{const S=.25,base=210,col=(x,segs,p,l1,l2,tot)=>{let y=base,s='';segs.forEach((g,i)=>{const q=cl(p*segs.length-i),h=g[0]*S*q;if(h<=0)return;y-=h;s+=RC(x,y,70,h,g[1],'var(--card)',3,1);if(g[2]&&h>20)s+=T(x+35,y+h/2+6,g[2],'einw','middle');if(g[3])s+=OP(q,T(x+76,y+h/2+6,g[3],'ein3','start','font-size:16px'))});
    return s+T(x+35,236,l1,'ein3','middle')+(l2?T(x+35,258,l2,'ein3','middle'):'')+OP(ph(p,.85,1),T(x+35,y-10,tot,'ein1','middle'))};
   const A='var(--acc)',L='color-mix(in srgb,var(--acc) 40%,var(--card))',G='var(--amber)';
   return col(30,[[500,A,'500 €']],ph(k,.03,.2),'Herstell-','kosten','500 €')+col(185,[[500,A,'500 €'],[100,L,'','+20 %']],ph(k,.22,.5),'Selbst-','kosten','600 €')+col(340,[[500,A,'500 €'],[100,L],[60,G,'','+10 %']],ph(k,.55,.9),'Barverkaufs-','preis','660 €')}},
 {d:14,t:'Skonto und Rabatt rechnet man im Hundert: 660 € sind 98 % des Zielverkaufspreises, also 673,47 €. Das sind 90 % des Listenpreises: 748,30 €.',
  f:k=>{const a=ph(k,.03,.2),b=ph(k,.22,.42),c=ph(k,.5,.68),d=ph(k,.7,.9),A='var(--acc)',G='var(--amber)';
   return OP(a,T(30,36,'Zielverkaufspreis = 100 %','ein2','start','font-size:17px')+T(450,36,'2 % Skonto','ein2','end','font-size:17px')+RC(30,44,412*a,30,A,'none',4,0)+RC(442,44,8*a,30,G,'none',2,0)+OP(a,T(40,65,'660 € = 98 %','einw')))+
    OP(b,FORM(240,118,['Zielverkaufspreis = ',{n:'660 €',d:'0,98'},' = 673,47 €'],'middle'))+
    OP(c,T(30,164,'Listenpreis = 100 %','ein2','start','font-size:17px')+T(450,164,'10 % Rabatt','ein2','end','font-size:17px')+RC(30,172,378*c,30,A,'none',4,0)+RC(408,172,42*c,30,G,'none',2,0)+OP(c,T(40,193,'673,47 € = 90 %','einw')))+
    OP(d,FORM(240,240,['Listenpreis = ',{n:'673,47 €',d:'0,90'},' = 748,30 €'],'middle'))}},
 {d:11,t:'Merke: Jeder Zuschlag hat seine eigene Basis. Verwaltung und Vertrieb rechnest Du auf die Herstellkosten, den Gewinn auf die Selbstkosten.',
  f:k=>{let s=T(240,32,'Jeder Zuschlag hat seine Basis','ein1','middle')+T(24,66,'Zuschlag','ein2')+T(272,66,'Basis','ein2');
   [['Materialgemeinkosten','Material'],['Fertigungsgemeinkosten','Fertigungslöhne'],['Verwaltung, Vertrieb','Herstellkosten'],['Gewinn','Selbstkosten']].forEach((r,i)=>{const p=ph(k,.08+i*.18,.24+i*.18),y=82+i*44;
    s+=OP(p,RC(14,y,452,36,'var(--card)','var(--line)',8)+T(24,y+24,r[0],'ein3','start','font-size:16px')+AR(232,y+18,262,y+18,'var(--acc)',2.5)+T(272,y+24,r[1],'ein3','start','font-size:16px;fill:var(--acc)'))});
   return s}}]};

X['Planung & Projektmanagement']={
 v:['Für einen Umbau laufen zwei Stränge parallel: Teile bestellen (5 Tage) sowie Demontage und Fundament (zusammen 4 Tage). Danach wird montiert. Wann kann die Montage frühestens beginnen?',
  ['nach 4 Tagen','nach 5 Tagen','nach 9 Tagen','nach 4,5 Tagen'],1,
  'Die Montage braucht beide Vorgänger. Sie wartet auf den längeren Strang, also auf die Teile nach 5 Tagen. Der kürzere Strang hat 1 Tag Puffer.'],
 ein:[
 {d:11,t:'Jedes Projekt steckt im magischen Dreieck aus Zeit, Kosten und Qualität. Soll es schneller gehen, steigen meist die Kosten oder die Qualität leidet.',
  f:k=>{const m=ph(k,.4,.8),Z=[110+50*m,222-8*m],K=[370+40*m,222+8*m],Q=[240,60];
   return `<path d="M${Q[0]} ${Q[1]}L${F(Z[0])} ${F(Z[1])}L${F(K[0])} ${F(K[1])}Z" fill="color-mix(in srgb,var(--acc) 18%,var(--card))" stroke="var(--acc)" stroke-width="3" stroke-linejoin="round"/>`+
    [Q,Z,K].map(p=>`<circle cx="${F(p[0])}" cy="${F(p[1])}" r="7" fill="var(--acc)"/>`).join('')+
    T(240,44,'Qualität','ein1','middle')+T(Z[0],254,'Zeit','ein1','middle')+T(K[0]-10,254,'Kosten','ein1','middle')+T(242,170,'Projektziel','ein2','middle')+
    OP(m,ARp(110,222,Z[0]-8,Z[1],m,'var(--mute)',2)+T(60,200,'kürzer','ein2','middle')+T(452,206,'teurer','ein2','middle'))}},
 {d:11,t:'Der Projektstrukturplan zerlegt das Projekt in Arbeitspakete. Beispiel: Eine Maschine wird umgebaut, mit den fünf Paketen A bis E.',
  f:k=>{const P=['A  Demontage, 2 Tage','B  Teile bestellen, 5 Tage','C  Fundament, 2 Tage','D  Montage, 2 Tage','E  Probelauf, 1 Tag'];
   let s=OP(ph(k,0,.15),RC(14,104,136,62,'color-mix(in srgb,var(--acc) 18%,var(--card))','var(--acc)',10,2)+T(82,131,'Maschine','ein1','middle')+T(82,155,'umbauen','ein1','middle'));
   const L=ph(k,.12,.25);if(L>0)s+=`<path d="M150 135H170M170 ${F(135-(135-48)*L)}V${F(135+(228-135)*L)}" stroke="var(--ink)" stroke-width="1.8" fill="none"/>`;
   P.forEach((p,i)=>{const y=30+i*45,q=ph(k,.2+i*.13,.32+i*.13);s+=OP(q,`<path d="M170 ${y+18}H186" stroke="var(--ink)" stroke-width="1.8"/>`+RC(186,y,280,36,'var(--card)','var(--line)',8)+T(198,y+24,p,'ein3','start','font-size:17px'))});
   return s}},
 {d:12,t:'Im Balkenplan liegt jedes Paket als Balken auf der Zeitachse. Die Übergabe am Ende ist ein Meilenstein: ein Zeitpunkt ohne Dauer.',
  f:k=>{const x0=60,u=44,V=[['A',0,2],['B',0,5],['C',2,4],['D',5,7],['E',7,8]];let s=`<path d="M${x0} 212H${x0+8*u+20}" stroke="var(--ink)" stroke-width="1.8"/>`;
   for(let i=0;i<=8;i++)s+=`<path d="M${x0+i*u} 207v10" stroke="var(--ink)" stroke-width="1.5"/>`+T(x0+i*u,234,i,'ein2','middle','font-size:16px');
   s+=T(x0+4*u,258,'Zeit t in Tagen','ein2','middle','font-size:16px');
   V.forEach((v,i)=>{const y=26+i*32,p=ph(k,.05+i*.12,.18+i*.12);s+=T(30,y+18,v[0],'ein1','middle')+RC(x0+v[1]*u,y,(v[2]-v[1])*u*p,22,'var(--acc)','none',5,0)});
   const m=ph(k,.75,.85);s+=POP(x0+8*u,190,m,`<path d="M${x0+8*u} 178l12 12-12 12-12-12Z" fill="var(--red)"/>`)+OP(m,T(x0+8*u-18,196,'Meilenstein Übergabe','ein3','end','font-size:16px'));
   return s}},
 {d:13,t:'Im Netzplan rechnest Du vorwärts: frühestes Ende ist frühester Anfang plus Dauer. Die Montage D wartet auf den späteren Vorgänger, die Teile B an Tag 5.',
  f:k=>NET(k,1)},
 {d:13,t:'Dann rückwärts: spätester Anfang ist spätestes Ende minus Dauer. Der Gesamtpuffer ist SAZ minus FAZ. Demontage und Fundament haben je 1 Tag Puffer.',
  f:k=>NET(k,2)},
 {d:11,t:'Der kritische Weg hat keinen Puffer: B, D, E. Er ist der längste Weg und bestimmt die Projektdauer von 8 Tagen. Jede Verzögerung dort verschiebt das Ende.',
  f:k=>NET(k,3)}]};
/* Netzplan für die Szenen 4 bis 6: Knoten [Name, Dauer, FAZ, FEZ, SAZ, SEZ, x, y] */
function NET(k,st){const N={A:['A',2,0,2,1,3,20,32],B:['B',5,0,5,0,5,20,168],C:['C',2,2,4,3,5,150,32],D:['D',2,5,7,5,7,270,100],E:['E',1,7,8,7,8,390,100]},crit=st===3?ph(k,.15,.5):0,isC=n=>'BDE'.includes(n);
 const red=n=>crit>0&&isC(n);let s='';
 const ed=[['A','C',100,71,150,71],['C','D',230,71,270,124],['B','D',100,207,270,156],['D','E',350,139,390,139]];
 ed.forEach(e=>{const c=crit>0&&isC(e[0])&&isC(e[1]);s+=AR(e[2],e[3],e[4],e[5],c?'var(--red)':'var(--ink)',c?2+2*crit:2)});
 const ord1=['A','B','C','D','E'],ord2=['E','D','C','B','A'];
 Object.values(N).forEach(n=>{const[x,y]=[n[6],n[7]],i1=ord1.indexOf(n[0]),i2=ord2.indexOf(n[0]);
  const f1=st>1?1:ph(k,.08+i1*.15,.2+i1*.15),f2=st>2?1:st===2?ph(k,.08+i2*.13,.2+i2*.13):0;
  s+=RC(x,y,80,78,'var(--card)',red(n[0])?'var(--red)':'var(--ink)',6,red(n[0])?2.5+1.5*crit:1.5)+`<path d="M${x} ${y+26}h80M${x} ${y+52}h80M${x+40} ${y+26}v52" stroke="var(--line)" stroke-width="1.5"/>`;
  s+=T(x+12,y+20,n[0],'ein1','start','font-size:19px')+T(x+70,y+20,n[1]+' T.','ein2','end','font-size:16px');
  s+=OP(f1,T(x+20,y+46,n[2],'ein3','middle')+T(x+60,y+46,n[3],'ein3','middle'));
  s+=OP(f2,T(x+20,y+72,n[4],'ein3','middle','fill:var(--acc)')+T(x+60,y+72,n[5],'ein3','middle','fill:var(--acc)'))});
 if(st===1)s+=T(262,30,'FEZ = FAZ + Dauer','einf')+T(262,56,'Mitte: FAZ | FEZ','ein2','start','font-size:16px');
 if(st===2){s+=T(262,30,'SAZ = SEZ − Dauer','einf')+T(262,56,'unten: SAZ | SEZ','ein2','start','font-size:16px')+OP(ph(k,.72,.85),T(262,82,'GP = SAZ − FAZ','einf'));
  const g=ph(k,.8,.95);s+=POP(60,134,g,RC(26,120,68,26,'var(--amber)','none',13,0)+T(60,139,'GP 1','ein3','middle','font-size:15px'))+POP(190,134,g,RC(156,120,68,26,'var(--amber)','none',13,0)+T(190,139,'GP 1','ein3','middle','font-size:15px'))}
 if(st===3)s+=OP(crit,T(262,30,'kritischer Weg','ein1','start','fill:var(--red)')+T(262,56,'B → D → E: 8 Tage','ein3'));
 return s}

X['Kommunikation & Feedback']={
 v:['Du sagst zu einem Mitarbeiter: „Die Maschine ist schon wieder dreckig.“ Was kommt bei ihm wahrscheinlich an?',
  ['Nur die Information über die Maschine','Ein Vorwurf gegen ihn persönlich','Ein Lob für seine Arbeit','Gar nichts, weil es keine Frage ist'],1,
  'Oft hört der Mitarbeiter vor allem mit dem Beziehungsohr und fühlt sich angegriffen. Das Video zeigt, warum: Jede Nachricht hat vier Seiten.'],
 ein:[
 {d:12,t:'Kommunikation läuft vom Sender zum Empfänger. Der Sender verschlüsselt seine Gedanken in Worte, der Empfänger entschlüsselt sie. Lärm in der Halle kann stören.',
  f:k=>{const a=ph(k,.1,.85),bx=105+(300-105)*a,n=ph(k,.35,.5)*(1-ph(k,.75,.85)),j=n>0?Math.sin(k*90)*5*n:0;
   return PER(70,210,'var(--acc)')+PER(410,210,'var(--flow)')+T(70,240,'Sender','ein3','middle')+T(410,240,'Empfänger','ein3','middle')+
    T(70,60,'kodieren','ein2','middle')+T(410,60,'dekodieren','ein2','middle')+
    OP(n,`<path d="M226 176l14-24 6 14 14-24" fill="none" stroke="var(--amber)" stroke-width="4" stroke-linejoin="round"/>`+T(243,204,'Lärm','ein3','middle','fill:var(--amber)'))+
    `<g transform="translate(${F(bx)} ${F(100+j)})">`+BUB(0,0,76,46,'var(--acc)',1,2)+T(38,30,'Wort','ein3','middle','font-size:16px')+'</g>'}},
 {d:12,t:'Nach Schulz von Thun hat jede Nachricht vier Seiten. Beispiel: „Die Maschine ist schon wieder dreckig.“',
  f:k=>{const C=[['Sachinhalt','#3b82f6'],['Selbstoffenbarung','#16a34a'],['Beziehung','#eab308'],['Appell','#dc2626']];
   let s=OP(ph(k,0,.15),BUB(30,22,420,64,'var(--acc)',1,2)+T(240,61,'„Die Maschine ist schon wieder dreckig.“','ein3','middle'));
   C.forEach((c,i)=>{const x=60+(i%2)*184,y=120+Math.floor(i/2)*66,p=ph(k,.3+i*.13,.42+i*.13);s+=POP(x+90,y+30,p,RC(x,y,176,58,`color-mix(in srgb,${c[1]} 22%,var(--card))`,c[1],8,2)+T(x+88,y+36,c[0],'ein3','middle',i===1?'font-size:16px':''))});
   return s}},
 {d:14,t:'Jede Seite sagt etwas anderes: die Sache, Deinen Ärger, Deine Sicht auf den Mitarbeiter und eine Aufforderung.',
  f:k=>{const C=[['Sachinhalt','#3b82f6',['Die Maschine','ist verschmutzt.']],['Selbstoffenbarung','#16a34a',['Ich ärgere mich.']],['Beziehung','#eab308',['Du hältst dich nicht','an Absprachen.']],['Appell','#dc2626',['Mach sie sauber!']]];
   let s='';C.forEach((c,i)=>{const x=12+(i%2)*232,y=18+Math.floor(i/2)*124,p=ph(k,.05+i*.2,.2+i*.2);
    s+=RC(x,y,224,114,`color-mix(in srgb,${c[1]} ${p>0?16:8}%,var(--card))`,c[1],10,2)+T(x+14,y+30,c[0],'ein3','start',`fill:${c[1]}`)+OP(p,c[2].map((l,j)=>T(x+14,y+64+j*26,l,'ein2','start','font-size:17px;fill:var(--ink)')).join(''))});
   return s}},
 {d:12,t:'Der Empfänger hört mit vier Ohren. Hört der Mitarbeiter nur mit dem Beziehungsohr, versteht er: „Der hält mich für schlampig.“ So entstehen Missverständnisse.',
  f:k=>{const h=ph(k,.35,.5),E=[['Sachohr','#3b82f6'],['Selbstoffenbarungsohr','#16a34a'],['Beziehungsohr','#eab308'],['Appellohr','#dc2626']];
   let s=PER(110,250,'var(--flow)',.95);
   E.forEach((e,i)=>{const on=i===2,o=on?1:1-.6*h,y=40+i*52;s+=OP(o*ph(k,.03+i*.06,.12+i*.06),RC(236,y,230,40,`color-mix(in srgb,${e[1]} ${on?10+18*h:10}%,var(--card))`,e[1],20,on?2+2*h:1.5)+T(254,y+27,'👂','ein2','start','font-size:17px')+T(282,y+27,e[0],'ein3','start',i===1?'font-size:15px':'font-size:17px'))});
   s+=OP(ph(k,.55,.7),`<ellipse cx="110" cy="70" rx="96" ry="46" fill="var(--card)" stroke="#eab308" stroke-width="2"/><circle cx="118" cy="128" r="7" fill="var(--card)" stroke="#eab308" stroke-width="2"/><circle cx="112" cy="146" r="4" fill="var(--card)" stroke="#eab308" stroke-width="2"/>`+T(110,64,'Der hält mich','ein3','middle','font-size:17px')+T(110,88,'für schlampig.','ein3','middle','font-size:17px'));
   return s}},
 {d:13,t:'Besser ist eine Ich-Botschaft: sagen, was Du siehst, was es für Dich bedeutet und was Du Dir wünschst. Sie beschuldigt nicht und senkt den Widerstand.',
  f:k=>{const a=ph(k,.03,.2),b=ph(k,.4,.6);
   return OP(a,T(30,26,'Du-Botschaft','ein3')+BUB(24,36,432,54,'var(--red)',1,2)+T(44,70,'„Du bist immer schlampig!“','ein2','start','fill:var(--ink)'))+POP(430,40,ph(k,.22,.3),NO(430,40))+
    OP(b,T(30,128,'Ich-Botschaft','ein3')+BUB(24,138,432,104,'var(--ok)',1,2)+T(44,170,'„Ich sehe Späne an der Maschine.','ein2','start','font-size:17px;fill:var(--ink)')+T(44,196,'Ich mache mir Sorgen um die Sicherheit.','ein2','start','font-size:17px;fill:var(--ink)')+T(44,222,'Bitte reinige sie nach der Schicht.“','ein2','start','font-size:17px;fill:var(--ink)'))+POP(430,142,ph(k,.62,.7),OK(430,142))}},
 {d:12,t:'Gutes Feedback ist konkret, zeitnah und beschreibend. Kritik gibst Du unter vier Augen. Der Mitarbeiter darf Stellung nehmen, Du hörst aktiv zu.',
  f:k=>{let s=T(30,34,'Gutes Feedback','ein1');['konkret und zeitnah','beschreibend statt wertend','zum Verhalten, nicht zur Person','Kritik unter vier Augen','Mitarbeiter darf Stellung nehmen','aktiv zuhören und nachfragen'].forEach((t,i)=>{const p=ph(k,.05+i*.14,.15+i*.14),y=66+i*34;s+=POP(44,y,p,OK(44,y,11))+OP(p,T(66,y+6,t,'ein3','start','font-size:17px'))});return s}}]};

/* ---------- Neue Skizzen der Mustermodule (480 breit, Schrift wie in den Erklärvideos) ---------- */
X['Arbeitsvertrag & Kündigung'].skz=[[()=>{const R=[['Probezeit',.46,'2 Wochen',0],['Grundfrist',.92,'4 Wochen',0],['ab 2 Jahren',1,'1 Monat',1],['ab 5 Jahren',2,'2 Monate',1],['ab 8 Jahren',3,'3 Monate',1],['ab 10 Jahren',4,'4 Monate',1],['ab 12 Jahren',5,'5 Monate',1],['ab 15 Jahren',6,'6 Monate',1],['ab 20 Jahren',7,'7 Monate',1]],x0=124,u=36;
 let s=T(8,18,'Betriebszugehörigkeit','ein2','start','font-size:15px')+RC(196,7,14,14,'var(--amber)','none',3,0)+T(215,19,'beide Seiten','ein2','start','font-size:15px')+RC(326,7,14,14,'var(--acc)','none',3,0)+T(345,19,'nur Arbeitgeber','ein2','start','font-size:15px');
 R.forEach((r,i)=>{const y=34+i*23;s+=T(x0-8,y+13,r[0],'ein2','end','font-size:14px;fill:var(--ink)')+RC(x0,y,r[1]*u,16,r[3]?'var(--acc)':'var(--amber)','none',3,0)+T(x0+r[1]*u+6,y+13,r[2],'ein3','start','font-size:14px')});
 s+=`<path d="M${x0} 30V246H${x0+7*u+14}" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`;for(let i=0;i<=7;i++)s+=`<path d="M${x0+i*u} 246v6" stroke="var(--ink)" stroke-width="1.5"/>`+T(x0+i*u,268,i,'ein2','middle','font-size:14px');
 return '<svg class="mlsk" viewBox="0 0 480 300" role="img" aria-label="Kündigungsfristen nach § 622 BGB">'+s+T(x0+3.5*u,292,'Kündigungsfrist in Monaten','ein2','middle','font-size:15px')+'</svg>'},'Kündigungsfristen nach § 622 BGB. Die verlängerten Fristen gelten nur, wenn der Arbeitgeber kündigt.']];
X['Kostenrechnung & Kalkulation'].skz=[[()=>{const A='var(--acc)',L='color-mix(in srgb,var(--acc) 40%,var(--card))',G='var(--amber)',S=.58,x0=20;
 const R=[['Materialkosten','200 € + 25 %','250 €',[[0,200,A],[200,250,L]]],['Fertigungskosten','100 € + 150 %','250 €',[[250,350,A],[350,500,L]]],['Herstellkosten','MK + FK','500 €',[[0,500,A]]],['Selbstkosten','HK + 20 %','600 €',[[0,500,A],[500,600,L]]],['Barverkaufspreis','SK + 10 %','660 €',[[0,600,A],[600,660,G]]],['Zielverkaufspreis','BVP = 98 %','673,47 €',[[0,660,A],[660,673.47,G]]],['Listenpreis','ZVP = 90 %','748,30 €',[[0,673.47,A],[673.47,748.3,G]]]];
 let s='';R.forEach((r,i)=>{const y=8+i*44;s+=T(x0,y+15,r[0],'ein3','start','font-size:15px')+T(186,y+15,r[1],'ein2','start','font-size:14px')+T(462,y+15,r[2],'ein3','end','font-size:15px');
  r[3].forEach(g=>{s+=RC(x0+g[0]*S,y+22,(g[1]-g[0])*S,14,g[2],'none',2,0)})});
 return '<svg class="mlsk" viewBox="0 0 480 318" role="img" aria-label="Zuschlagskalkulation als Treppe">'+s+'</svg>'},'Zuschlagskalkulation mit den Zahlen aus dem Erklärvideo. Dunkel: Basis, hell: Gemeinkostenzuschlag, gelb: Gewinn, Skonto und Rabatt.']];
X['Planung & Projektmanagement'].skz=[[()=>{const s=NET(1,3)+RC(26,120,68,26,'var(--amber)','none',13,0)+T(60,139,'GP 1','ein3','middle','font-size:15px')+RC(156,120,68,26,'var(--amber)','none',13,0)+T(190,139,'GP 1','ein3','middle','font-size:15px')+
  T(292,206,'oben: Vorgang, Dauer','ein2','start','font-size:15px')+T(292,228,'Mitte: FAZ | FEZ','ein2','start','font-size:15px')+T(292,250,'unten: SAZ | SEZ','ein2','start','font-size:15px');
 return '<svg class="mlsk" viewBox="0 0 480 270" role="img" aria-label="Netzplan mit kritischem Weg">'+s+'</svg>'},'Netzplan zum Umbau aus dem Erklärvideo. Rot: kritischer Weg ohne Puffer. Gelb: Gesamtpuffer GP.'],
 [()=>'<svg class="mlsk" viewBox="0 0 480 270" role="img" aria-label="Balkenplan">'+X['Planung & Projektmanagement'].ein[2].f(1)+'</svg>','Balkenplan (Gantt) zum selben Projekt. Der Meilenstein hat keine Dauer.']];
X['Kommunikation & Feedback'].skz=[[()=>{const C={s:'#3b82f6',o:'#16a34a',b:'#eab308',a:'#dc2626'};
 let s=`<rect x="170" y="74" width="140" height="140" fill="var(--card)" stroke="var(--line)"/>`+T(240,150,'Nachricht','ein3','middle')+
  `<path d="M170 74H310" stroke="${C.s}" stroke-width="8"/><path d="M170 74V214" stroke="${C.o}" stroke-width="8"/><path d="M170 214H310" stroke="${C.b}" stroke-width="8"/><path d="M310 74V214" stroke="${C.a}" stroke-width="8"/>`;
 s+=T(240,34,'Sachinhalt','ein3','middle',`fill:${C.s}`)+T(240,56,'Worüber informiere ich?','ein2','middle','font-size:15px');
 s+=T(240,244,'Beziehung','ein3','middle',`fill:#b88a00`)+T(240,264,'Was halte ich von dir?','ein2','middle','font-size:15px');
 s+=T(160,128,'Selbst-','ein3','end',`fill:${C.o}`)+T(160,150,'offenbarung','ein3','end',`fill:${C.o}`)+T(160,174,'Was gebe ich','ein2','end','font-size:15px')+T(160,194,'von mir preis?','ein2','end','font-size:15px');
 s+=T(322,138,'Appell','ein3','start',`fill:${C.a}`)+T(322,162,'Was soll der','ein2','start','font-size:15px')+T(322,182,'andere tun?','ein2','start','font-size:15px');
 return '<svg class="mlsk" viewBox="0 0 480 270" role="img" aria-label="Vier Seiten einer Nachricht">'+s+'</svg>'},'Vier Seiten einer Nachricht nach Schulz von Thun. Der Empfänger hört mit vier Ohren und wählt, welche Seite er betont.']];

/* ---------- Kurz erklärt: Abspielen wie im Lernlabor ---------- */
let einP=null;
function einShow(n,S,onEnd){const w=$('#ein');if(einP)einP.stop();einP=null;if(!w)return;w.innerHTML='';w.hidden=!S;if(!S)return;
 const tot=S.reduce((a,x)=>a+x.d,0),mm=s=>Math.floor(s/60)+':'+String(Math.round(s%60)).padStart(2,'0');
 const b=document.createElement('button');b.type='button';b.className='einb';b.innerHTML='<span class="einpl" aria-hidden="true">▶</span><span aria-hidden="true">🎬</span> Kurz erklärt <span class="einz">'+mm(tot)+' min</span>';w.appendChild(b);
 b.onclick=()=>{b.remove();einP=einPlay(w,S,n,onEnd)}}
function einPlay(w,S,n,onEnd){const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,SPK=typeof speechSynthesis!=='undefined'&&typeof SpeechSynthesisUtterance!=='undefined';
 const p=document.createElement('div');p.className='panel einp';
 p.innerHTML=`<div class="einh"><b><span aria-hidden="true">🎬</span> Kurz erklärt: ${esc(n)}</b><span class="einn"></span><button type="button" class="einx" aria-label="Schließen">✕</button></div><svg class="einsv" viewBox="0 0 480 270" role="img" aria-label="Erklärbild zu ${esc(n)}"></svg><div class="einbar">${S.map(()=>'<i><b></b></i>').join('')}</div><p class="einc" aria-live="polite"></p><div class="einctl"><button type="button" data-a="v" aria-label="Zurück">⏮</button><button type="button" class="einpp" data-a="p">⏸ Pause</button><button type="button" data-a="w" aria-label="Weiter">⏭</button>${SPK?'<button type="button" data-a="s" aria-pressed="false">🔇 Ton aus</button>':''}<button type="button" class="eingo" data-a="g" hidden>Zur Merkbox ↓</button></div>`;
 w.appendChild(p);const sv=p.querySelector('.einsv'),cap=p.querySelector('.einc'),num=p.querySelector('.einn'),seg=[...p.querySelectorAll('.einbar b')],pp=p.querySelector('[data-a=p]'),go=p.querySelector('[data-a=g]');
 let i=0,el=0,run=!RM,snd=false,last=0,raf=0,end=false;
 const hush=()=>{if(SPK)try{speechSynthesis.cancel()}catch(e){}};
 const say=()=>{hush();if(!snd)return;try{const u=new SpeechSynthesisUtterance(S[i].s||S[i].t);u.lang='de-DE';const v=speechSynthesis.getVoices().find(x=>/^de/i.test(x.lang));if(v)u.voice=v;u.rate=.95;speechSynthesis.speak(u)}catch(e){}};
 const btn=()=>{pp.textContent=end?'↻ Nochmal':run?'⏸ Pause':'▶ Weiter';go.hidden=!end};
 const draw=()=>{const k=RM?1:Math.min(1,el/S[i].d);sv.innerHTML=S[i].f(k,performance.now()/1000);seg.forEach((s,j)=>s.style.width=(j<i?100:j>i?0:k*100)+'%')};
 const to=j=>{i=Math.max(0,Math.min(S.length-1,j));el=0;end=false;cap.textContent=S[i].t;num.textContent=(i+1)+' / '+S.length;if(i===S.length-1&&onEnd)onEnd();say();btn();draw()};
 const tick=ts=>{raf=0;if(!p.isConnected)return;if(!p.offsetParent){run=false;hush();btn();return}
  const dt=last?Math.min(.1,(ts-last)/1000):0;last=ts;
  if(run){el+=dt;if(el>=S[i].d&&!(snd&&SPK&&speechSynthesis.speaking)){if(i<S.length-1)to(i+1);else{el=S[i].d;run=false;end=true;btn()}}}
  draw();if(run||!RM)loop()};
 const loop=()=>{if(!raf){raf=requestAnimationFrame(tick)}};
 p.querySelector('.einx').onclick=()=>{stop();einShow(n,S,onEnd)};
 p.querySelector('.einctl').onclick=e=>{const a=e.target.closest('button');if(!a)return;const c=a.dataset.a;last=0;
  if(c==='v')to(i-(el<1.5?1:0));else if(c==='w'){if(i<S.length-1)to(i+1)}
  else if(c==='p'){if(end){to(0);run=true}else{run=!run;if(!run)hush();else if(snd&&!(SPK&&speechSynthesis.speaking))say()}}
  else if(c==='s'){snd=!snd;a.setAttribute('aria-pressed',snd);a.textContent=snd?'🔊 Ton an':'🔇 Ton aus';if(snd)say();else hush()}
  else if(c==='g'){const t=$('#mbx');stop();einShow(n,S,onEnd);if(t)t.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});return}
  btn();loop()};
 function stop(){if(raf)cancelAnimationFrame(raf);raf=0;run=false;hush()}
 to(0);loop();return{stop,seek:(j,k)=>{run=false;i=j;to(j);el=k*S[j].d;draw();btn()}}}

/* ---------- Schrittleiste ---------- */
function rfPaint(key){const o=lsG(RFK)[key]||{},bs=[...document.querySelectorAll('#rfs button')];let cur=bs.find(b=>!o[b.dataset.s]);bs.forEach(b=>{b.classList.toggle('ok',!!o[b.dataset.s]);b.classList.toggle('on',b===cur)})}
function rfMark(key,s){const o=lsG(RFK);o[key]=o[key]||{};if(o[key][s])return;o[key][s]=1;lsS(RFK,o);rfPaint(key)}

/* ---------- Vermute zuerst ---------- */
function predBox(key,V){const w=document.createElement('div');w.id='pred';
 const show=open=>{const c=lsG(PK)[key];w.innerHTML='<p><b>🔮 Vermute zuerst:</b> '+esc(V[0])+'</p>';
  if(c==null){if(!open){const b=document.createElement('button');b.type='button';b.className='predx';b.textContent='Vermutung wählen';b.onclick=()=>show(true);w.append(b);return}
   const o=document.createElement('div');o.className='predo';V[1].forEach((t,i)=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.onclick=()=>{const P=lsG(PK);P[key]=i;lsS(PK,P);rfMark(key,'v');show()};o.append(b)});w.append(o);return}
  const ok=c===V[2],r=document.createElement('div');r.className='prr '+(ok?'ok':'no');
  r.innerHTML='<p style="margin:2px 0">Deine Vermutung: <b>'+esc(V[1][c])+'</b></p><p style="margin:6px 0 2px">'+(ok?'<b class="r">✓ Gut vermutet.</b> ':'<b class="w">Nicht ganz.</b> Richtig ist: <b>'+esc(V[1][V[2]])+'</b> ')+esc(V[3])+'</p>';
  const n=document.createElement('button');n.type='button';n.className='prn';n.textContent='Neu vermuten';n.onclick=()=>{const P=lsG(PK);delete P[key];lsS(PK,P);show(true)};r.append(n);w.append(r)};
 show();return w}

/* ---------- Themenseite ---------- */
fach=function(f){const v=$('#view'),d=D[f],ms=d.modules,m=modSel[f],mod=ms[m],gi=grpOf(f,m),G=GRP[f],key=f+':'+m,Q=X[mod.t]||{},E=ERK[mod.t];
 if(einP){einP.stop();einP=null}
 try{localStorage.setItem(LK,JSON.stringify([f,m]))}catch(e){}
 const hd=el('<div class="thk"><p class="crumb"><button type="button" class="crb" aria-expanded="false">'+esc(d.kurz)+' › '+esc(G[gi][0])+' ▾</button></p><button type="button" class="btn sec thw" aria-expanded="false">Thema wechseln ▾</button></div><h2 id="tht">'+esc(mod.t)+'</h2>','');hd.id='thd';
 const mn=el(G.map(g=>'<h4>'+esc(g[0])+'</h4><div>'+g[1].map(j=>'<button type="button" data-i="'+j+'" aria-current="'+(j===m)+'">'+esc(ms[j].t)+'</button>').join('')+'</div>').join(''),'panel thm');mn.hidden=true;
 const tg=()=>{mn.hidden=!mn.hidden;hd.querySelectorAll('[aria-expanded]').forEach(b=>b.setAttribute('aria-expanded',!mn.hidden))};
 hd.querySelector('.crb').onclick=tg;hd.querySelector('.thw').onclick=tg;
 mn.querySelectorAll('button').forEach(b=>b.onclick=()=>{modSel[f]=+b.dataset.i;draw();scrollTo(0,0)});
 const msb=el(G[gi][1].map(i=>'<button type="button" data-i="'+i+'" aria-pressed="'+(i===m)+'">'+esc(ms[i].t)+'</button>').join(''),'seg');msb.id='ms5';
 msb.querySelectorAll('button').forEach(b=>b.onclick=()=>{modSel[f]=+b.dataset.i;draw()});
 const ds=el(esc(mod.intro),'sub tdesc cl'),mr=document.createElement('button');mr.type='button';mr.className='tmore';mr.textContent='mehr ▾';
 mr.onclick=()=>{const c=ds.classList.toggle('cl');mr.textContent=c?'mehr ▾':'weniger ▴'};
 v.append(hd,mn,msb,ds,mr);requestAnimationFrame(()=>{if(ds.scrollHeight<=ds.clientHeight+2&&ds.classList.contains('cl'))mr.hidden=true});
 const st=[];if(Q.v)st.push(['v','Vermuten','#pred']);if(Q.ein)st.push(['a','Ansehen','#ein']);st.push(['m','Merken','#mbx'],['u','Üben','#ueb']);
 const rf=el(st.map((s,i)=>'<button type="button" data-s="'+s[0]+'"><span class="n"><b>'+(i+1)+'</b></span><span class="t">'+s[1]+'</span></button>').join(''),'');rf.id='rfs';
 rf.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>{const t=$(st[i][2]);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})});v.append(rf);
 if(Q.v||Q.ein){const u=el('','');u.id='uir';if(Q.v)u.append(predBox(key,Q.v));if(Q.ein){const e=el('','');e.id='ein';u.append(e)}v.append(u);if(Q.ein)einShow(mod.t,Q.ein,()=>rfMark(key,'a'))}
 const wrap=el('','grid'),left=el('',''),right=el('','side');
 const SK=Q.skz?Q.skz.map(z=>[z[0](),z[1]]):(mod.viz||[]).map(k=>[VIZ[k](),'']);
 SK.forEach((z,i)=>{const g=z[0];const pn=el(i?'':'<h2>✏️ Skizze</h2>','panel skz'),bx=el('','skb');if(typeof g==='string')bx.innerHTML=g;else bx.append(g);if(z[1])bx.append(el(esc(z[1]),'sub skc'));pn.append(bx);left.append(pn)});
 const mbx=el('<h2>📌 Merkbox</h2><ul>'+mod.pts.map(p=>'<li>'+esc(p)+'</li>').join('')+'</ul>','panel box');mbx.id='mbx';{const rb=KI.readBtn(mod.t+'. '+mod.pts.join(' '),'w');if(rb)mbx.append(rb)}
 SK.length?right.append(mbx):left.append(mbx);
 wrap.append(left);if(right.childNodes.length)wrap.append(right);else wrap.style.gridTemplateColumns='minmax(0,1fr)';v.append(wrap);
 try{const io=new IntersectionObserver(es=>{if(es.some(x=>x.isIntersecting)){rfMark(key,'m');io.disconnect()}},{threshold:.6});io.observe(mbx)}catch(e){}
 const ub=el('<h2>✏️ Üben</h2><p class="sub">Erst die Check-Fragen, dann die Rechenaufgaben mit Zufallswerten.</p>','panel');ub.id='ueb';const g=el('','ubg');
 mod.mcq.forEach((q,j)=>g.append(mcqHTML({f,m,j,q},ok=>{if(ok)rfMark(key,'u')})));ub.append(g);
 const cs=C.filter(x=>x.f===f&&x.m===m);
 if(cs.length){ub.append(el('<h2 style="margin-top:16px">🧮 Rechenaufgaben</h2><p class="sub">Zufallswerte, jedes Mal neu. Komma oder Punkt als Dezimalzeichen.</p>',''));
  cs.forEach(c=>{const h=document.createElement('div');const run=()=>{h.innerHTML='<span class="tag">'+esc(c.name)+'</span>';h.append(calcHTML(c,ok=>{if(ok)rfMark(key,'u')}));const b=document.createElement('button');b.className='btn sec';b.textContent='Neue Zahlen';b.onclick=run;h.append(b)};run();ub.append(h)})}
 const ut=el('<button type="button" class="btn">✏️ Gemischt üben in '+esc(d.kurz)+'</button>','ubt');ut.firstChild.onclick=()=>{uF=f;go('uben');scrollTo(0,0)};ub.append(ut);v.append(ub);
 if(E){const ns=el('<h2>Nachschlagen</h2>','panel nsl');
  ns.innerHTML+='<details><summary>💡 Verstehen</summary><p>'+esc(E[0])+'</p></details>'+(E[1]?'<details><summary>🏭 Im Betrieb</summary><p>'+esc(E[1])+'</p></details>':'')+'<details><summary>⚠️ Typische Fehler</summary><ul>'+E[2].map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></details>';
  const kd=el('<summary>🤖 Dazu die KI fragen</summary><p class="sub">Nur im Claude-Artifact verfügbar.</p>','');const kdd=document.createElement('details');kdd.innerHTML=kd.innerHTML;const kb=el('<button class="btn sec">KI-Tutor öffnen</button>','');kb.firstChild.onclick=()=>{kiPre={f,m};go('kitutor')};kdd.append(kb);ns.append(kdd);v.append(ns)}
 rfPaint(key)};

/* ---------- Startseite: „Dein nächster Schritt“ wie im Lernlabor ---------- */
const home5=home;
home=function(v){home5(v);
 const ps=[...v.querySelectorAll(':scope>.panel')],find=t=>ps.find(p=>p.textContent.includes(t));
 const wl=find('Willkommen'),so=find('So nutzt'),ne=find('Neu in Version');
 let warn=so&&so.querySelector('.warn');if(warn){warn=warn.cloneNode(true);warn.className='rstand'}
 [wl,so,ne].forEach(p=>p&&p.remove());
 let L=null;try{L=JSON.parse(localStorage.getItem(LK))}catch(e){}
 const lf=L&&D[L[0]]&&D[L[0]].modules[L[1]]?L:['reha',0],lm=D[lf[0]].modules[lf[1]];
 const nx=el('<h2><span aria-hidden="true">👉</span> Dein nächster Schritt</h2><p>'+(L?'Weiter mit':'Neu hier? Starte mit')+' <b>'+esc(lm.t)+'</b> <span class="sub">('+esc(D[lf[0]].kurz)+')</span></p><button type="button" class="btn">'+(L?'Weiterlernen →':'Erstes Thema öffnen →')+'</button><hr><button type="button" class="lk" data-k="uben">✏️ Gemischt üben <small>(alle Fächer)</small></button><button type="button" class="lk" data-k="sim">⏱ Prüfungssimulation <small>(90 Minuten)</small></button>','panel nxt');
 nx.querySelector('.btn').onclick=()=>{modSel[lf[0]]=lf[1];go(lf[0]);scrollTo(0,0)};nx.querySelectorAll('.lk').forEach(b=>b.onclick=()=>{go(b.dataset.k);scrollTo(0,0)});
 v.prepend(nx);
 v.querySelectorAll('.ftile').forEach(t=>{const f=t.dataset.f;if(f&&D[f]&&!t.querySelector('.fz')){const s=document.createElement('small');s.className='fz';s.textContent=D[f].modules.length+' Module';t.append(s)}});
 const hh=v.querySelector('.hh');if(hh)hh.textContent='Fächer';
 if(warn)v.append(warn);
};

{const vf=document.querySelector('#view+p.sub');if(vf){vf.className='ftr';vf.removeAttribute('style');vf.innerHTML='🔒 Dein Lernstand bleibt auf Deinem Gerät · keine Konten · kein Tracking<br>© 2026 Dr. rer. nat. Markus Baum · Version 5 · Eigene Aufgaben, keine Nachbildung von IHK-Prüfungen · Weitergabe nur mit Erlaubnis'}}
/* Menüband wie im Lernlabor: Start · Lernen · Üben & Prüfen · Ich */
const nav5=nav;
nav=function(){nav5();const bs=document.querySelectorAll('#fs button');if(bs[1]&&!FACH.includes(tab)){const s=bs[1].querySelectorAll('span');if(s[1])s[1].textContent='Lernen'}if(bs[2]){const s=bs[2].querySelectorAll('span');if(s[1])s[1].textContent='Üben & Prüfen'}};

/* ---------- Bausteine für weitere Erklärszenen und Skizzen: jede Funktion liefert k=>SVG (Bild 480 × 270) ---------- */
const FS={ein1:21,ein2:18,ein3:17,einf:19,einw:16};
/* Schriftgröße so weit verkleinern, dass der Text in die Breite passt */
const FIT=(s,max,fs)=>{let f=fs;while(f>12&&TW(s,f)>max)f-=.5;return f};
const TX=(x,y,s,max,c='ein2',a='start',fs,st='')=>{fs=fs||FS[c]||18;const f=FIT(String(s).replace(/<[^>]+>/g,''),max,fs);if(window.ML5SMALL&&f<fs*.82)ML5SMALL.push(f.toFixed(1)+'/'+fs+' '+s);return T(x,y,s,c,a,(f!==FS[c]?'font-size:'+f+'px;':'')+st)};
/* Text, der nicht gut passt, auf zwei Zeilen umbrechen: liefert [SVG, Zeilen] */
const WRL=(s,max,fs)=>{s=String(s);if(FIT(s,max,fs)>=fs*.9||s.indexOf(' ')<0)return [s];const w=s.split(' ');let b=1,bd=1e9;for(let i=1;i<w.length;i++){const d=Math.max(TW(w.slice(0,i).join(' '),fs),TW(w.slice(i).join(' '),fs));if(d<bd){bd=d;b=i}}return [w.slice(0,b).join(' '),w.slice(b).join(' ')]};
/* Stapel aus Emoji, Zeile 1, Zeile 2 mittig in einem Kasten */
const STK=(cx,y,h,w,em,l1,l2)=>{const A=l1?WRL(l1,w,17):[],B=l2?WRL(l2,w,15):[],E=em?36:0,Hh=E+A.length*22+B.length*19-(A.length||B.length?4:0);let t=y+(h-Hh)/2,s='';
 if(em){s+=T(cx,t+28,em,'ein2','middle','font-size:28px');t+=E}A.forEach(l=>{s+=TX(cx,t+16,l,w,'ein3','middle');t+=22});B.forEach(l=>{s+=TX(cx,t+15,l,w,'ein2','middle',15);t+=19});return s};
const TITLE=t=>TX(240,34,t,450,'ein1','middle');
/* Phase für das i-te von n Elementen zwischen a und b */
const STG=(k,n,i,a=.06,b=.85)=>{const w=(b-a)/n;return ph(k,a+i*w,a+i*w+Math.max(.08,w*.9))};
const MK=(m,x,y)=>m==='ok'?OK(x,y,12):m==='no'?NO(x,y,12):m==null?'':/^[0-9§A-Z]{1,3}$/.test(m)?`<circle cx="${F(x)}" cy="${F(y)}" r="13" fill="var(--acc)"/>`+TX(x,y+6,m,22,'einw','middle',15,'font-weight:700'):T(x,y+7,m,'ein2','middle','font-size:20px');
const COLS={a:'var(--acc)',g:'var(--ok)',r:'var(--red)',y:'var(--amber)',b:'var(--flow)',m:'var(--mute)'};
const CC=c=>COLS[c]||c||'var(--line)';
/* Liste: items [Text, Zeichen ('ok'|'no'|Zahl|Emoji), Zusatz] */
const LIST=(ti,it,o={})=>k=>{const n=it.length,y0=o.y0||52,h=Math.min(o.h||46,(250-y0)/n);let s=ti?TITLE(ti):'';
 it.forEach((r,i)=>{const y=y0+i*h,p=STG(k,n,i,o.a||.05,o.b||.85),hi=o.hi===i,two=r[2]&&h>=40;
  s+=OP(p,RC(20,y,440,h-6,hi?'color-mix(in srgb,var(--acc) 14%,var(--card))':'var(--card)',hi?'var(--acc)':r[3]?CC(r[3]):'var(--line)',10,hi?2:1.5)+MK(r[1],46,y+(h-6)/2)+
   (two?TX(70,y+(h-6)/2-3,r[0],380,'ein3')+TX(70,y+(h-6)/2+17,r[2],380,'ein2','start',15):TX(70,y+(h-6)/2+6,r[0],380,'ein3')))});
 return s+(o.note?OP(ph(k,.86,.96),TX(240,262,o.note,450,'ein2','middle',15)):'')};
/* Karten: [Emoji, Zeile 1, Zeile 2, Farbe] */
const CARDS=(ti,cs,o={})=>k=>{const n=cs.length,cols=o.cols||(n<=4?n:Math.ceil(n/2)),rows=Math.ceil(n/cols),gx=10,y0=o.y0||50,H=(o.note?226:254)-y0,
 w=(452-gx*(cols-1))/cols,h=(H-gx*(rows-1))/rows;let s=ti?TITLE(ti):'';
 cs.forEach((c,i)=>{const x=14+(i%cols)*(w+gx),y=y0+Math.floor(i/cols)*(h+gx),p=STG(k,n,i,o.a||.05,o.b||.8),cx=x+w/2,big=h>=96;
  const bx=RC(x,y,w,h,o.fill?`color-mix(in srgb,${CC(c[3])} 12%,var(--card))`:'var(--card)',CC(c[3]),12,c[3]?2.2:1.5);
  const em=c[0]&&!big?T(x+22,y+h/2+8,c[0],'ein2','middle','font-size:22px'):'',tx=c[0]?x+42+(w-46)/2:cx,tw=c[0]?w-50:w-14,ty=y+h/2+(c[2]?-3:6);
  s+=POP(cx,y+h/2,p,bx+(big?STK(cx,y,h,w-14,c[0],c[1],c[2]):em+TX(tx,ty,c[1],tw,'ein3','middle')+(c[2]?TX(tx,ty+21,c[2],tw,'ein2','middle',15):'')))});
 return s+(o.note?OP(ph(k,.84,.95),TX(240,258,o.note,450,'ein2','middle',16)):'')};
/* Balken: [Beschriftung, Wert, Text am Balken, Farbe] */
const BARS=(ti,rs,o={})=>k=>{const n=rs.length,lx=o.lx||150,mx=o.max||Math.max(...rs.map(r=>r[1])),y0=o.y0||52,h=Math.min(o.h||40,((o.note?232:252)-y0)/n),W=o.W||(452-lx-110);
 let s=(ti?TITLE(ti):'')+`<path d="M${lx} ${y0-4}V${F(y0+n*h-6)}" stroke="var(--ink)" stroke-width="1.5"/>`;
 rs.forEach((r,i)=>{const y=y0+i*h,p=STG(k,n,i,.05,.8),bw=r[1]/mx*W*p;
  s+=TX(lx-8,y+h/2+3,r[0],lx-20,'ein2','end',16)+RC(lx,y+3,bw,h-12,CC(r[3]||'a'),'none',4,0)+OP(p,TX(lx+bw+8,y+h/2+3,r[2],452-lx-bw-8,'ein3','start',16))});
 return s+(o.note?OP(ph(k,.84,.95),TX(240,258,o.note,450,'ein2','middle',16)):'')};
/* Ablauf: Kästen mit Pfeilen [Emoji, Zeile 1, Zeile 2, Farbe] */
const FLOW=(ti,st,o={})=>k=>{const n=st.length,g=26,w=(452-g*(n-1))/n,y=o.y||70,h=o.h||124;let s=ti?TITLE(ti):'';
 st.forEach((c,i)=>{const x=14+i*(w+g),p=STG(k,n,i,.04,.82),cx=x+w/2;
  s+=OP(p,RC(x,y,w,h,'var(--card)',CC(c[3]),12,c[3]?2.2:1.5)+STK(cx,y,h,w-12,c[0],c[1],c[2]));
  if(i<n-1)s+=ARp(x+w+3,y+h/2,x+w+g-3,y+h/2,STG(k,n,i+.6,.04,.82),'var(--ink)',2.2)});
 return s+(o.note?OP(ph(k,.84,.95),TX(240,o.ny||(y+h+42),o.note,450,'ein3','middle')):'')+(o.note2?OP(ph(k,.88,.98),TX(240,(o.ny||(y+h+42))+24,o.note2,450,'ein2','middle',16)):'')};
/* Gegenüberstellung: zwei Spalten {h:Kopf, c:Farbe, l:[Zeilen], m:Zeichen} */
const VS=(ti,A,B,o={})=>k=>{let s=ti?TITLE(ti):'';const y0=o.y0||52;
 [A,B].forEach((c,j)=>{const x=j?246:14,w=220,p=ph(k,.05+j*.35,.2+j*.35),c0=CC(c.c),n=c.l.length,lh=Math.min(36,(o.note?168:192)/Math.max(1,n));
  let t=RC(x,y0,w,40,`color-mix(in srgb,${c0} 18%,var(--card))`,c0,10,2)+TX(x+w/2,y0+27,c.h,w-16,'ein3','middle');
  c.l.forEach((l,i)=>{const q=ph(k,.12+j*.35+i*.05,.2+j*.35+i*.05);t+=OP(q,(c.m?MK(c.m,x+16,y0+60+i*lh):`<circle cx="${x+12}" cy="${F(y0+59+i*lh)}" r="4" fill="${c0}"/>`)+TX(x+(c.m?34:24),y0+65+i*lh,l,w-(c.m?36:26),'ein2','start',16))});
  s+=OP(p,t)});
 return s+(o.mid?OP(ph(k,.35,.45),T(240,y0+28,o.mid,'ein3','middle')):'')+(o.note?OP(ph(k,.84,.95),TX(240,258,o.note,450,'ein3','middle')):'')};
/* Treppe: [Zeile 1, Zeile 2], hi = hervorgehobene Stufe */
const STAIRS=(ti,st,o={})=>k=>{const n=st.length,w=440/n,base=o.base||236,dh=(base-(o.top||70))/n;let s=ti?TITLE(ti):'';
 st.forEach((c,i)=>{const x=20+i*w,h=(i+1)*dh,p=STG(k,n,i,.05,.8),hi=o.hi===i;
  const A=WRL(c[0],w-6,16);let ly=base-h-(c[1]?24:8);s+=OP(p,RC(x+2,base-h,w-4,h,hi?'var(--acc)':`color-mix(in srgb,var(--acc) ${14+i*12}%,var(--card))`,'var(--acc)',6,1.5)+A.slice().reverse().map((l,j)=>TX(x+w/2,ly-j*20,l,w-6,'ein3','middle',16)).join('')+(c[1]?TX(x+w/2,base-h-6,c[1],w-6,'ein2','middle',14):''))});
 return s+(o.lo?OP(ph(k,.1,.2),TX(24,base+24,o.lo,o.up?200:430,'ein2','start',15)):'')+(o.up?OP(ph(k,.7,.8),TX(456,base+24,o.up,220,'ein2','end',15)):'')};
/* Zeitstrahl: ticks [[Anteil, Text]], spans [[a,b,Text,Farbe,Zeile]], marks [[Anteil,Text,Farbe]] */
const TL=(ti,o)=>k=>{const x0=30,x1=450,y=o.y||170,X=a=>x0+(x1-x0)*a;let s=(ti?TITLE(ti):'')+`<path d="M${x0} ${y}H${x1}" stroke="var(--ink)" stroke-width="2"/>`;
 (o.ticks||[]).forEach((t,i)=>{s+=`<path d="M${F(X(t[0]))} ${y-6}v12" stroke="var(--mute)" stroke-width="1.5"/>`+TX(X(t[0]),y+26,t[1],90,'ein2','middle',15)});
 (o.spans||[]).forEach((c,i)=>{const p=STG(k,o.spans.length,i,.08,.75),r=c[4]||0,yy=y-30-r*40;s+=RC(X(c[0]),yy,(X(c[1])-X(c[0]))*p,22,CC(c[3]||'a'),'none',5,0)+OP(p,TX((X(c[0])+X(c[1]))/2,yy-8,c[2],Math.max(110,X(c[1])-X(c[0])+40),'ein3','middle',16))});
 (o.marks||[]).forEach((m,i)=>{const p=ph(k,.5+i*.12,.62+i*.12);s+=POP(X(m[0]),y,p,`<circle cx="${F(X(m[0]))}" cy="${y}" r="8" fill="${CC(m[2]||'r')}"/>`)+OP(p,TX(X(m[0]),y+(m[3]?-18:50),m[1],160,'ein3','middle',16))});
 return s+(o.note?OP(ph(k,.85,.95),TX(240,258,o.note,450,'ein2','middle',16)):'')};
/* Große Aussage: Zeilen [Text, Klasse, Größe] */
const BIG=(ti,ls,o={})=>k=>{let s=ti?TITLE(ti):'',y=o.y0||100;ls.forEach((l,i)=>{const p=STG(k,ls.length,i,.05,.7),fs=l[2]||(l[1]==='ein1'?40:20);s+=POP(240,y-fs/3,p,TX(240,y,l[0],440,l[1]||'ein1','middle',fs,l[3]||''));y+=fs+(l[4]||16)});return s};
/* Kreislauf: n Stationen auf einem Kreis */
const CYC=(ti,it,o={})=>k=>{const n=it.length,cx=240,cy=o.cy||152,R=o.r||84,w=o.w||128,P=it.map((c,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+R*Math.cos(a)*(o.sx||1.9),cy+R*Math.sin(a)*(o.sy||1.05)]});let s=ti?TITLE(ti):'';
 /* gerade Pfeile von Kastenrand zu Kastenrand */
 const cut=(dx,dy)=>Math.min(Math.abs(dx)>1e-6?(w/2+5)/Math.abs(dx):1e9,Math.abs(dy)>1e-6?29/Math.abs(dy):1e9);
 P.forEach((a,i)=>{const b=P[(i+1)%n],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,t1=cut(ux,uy),t2=cut(-ux,-uy);
  if(L-t1-t2>8)s+=ARp(a[0]+ux*t1,a[1]+uy*t1,b[0]-ux*t2,b[1]-uy*t2,STG(k,n,i+.5,.05,.85),'var(--mute)',2.2)});
 it.forEach((c,i)=>{const [x,y]=P[i],p=STG(k,n,i,.05,.85);
  s+=POP(x,y,p,RC(x-w/2,y-24,w,48,c[2]?`color-mix(in srgb,${CC(c[2])} 16%,var(--card))`:'var(--card)',CC(c[2]||'a'),12,2)+TX(x,y+(c[1]?-3:6),c[0],w-10,'ein3','middle')+(c[1]?TX(x,y+16,c[1],w-10,'ein2','middle',14):''))});
 return s+(o.mid?OP(ph(k,.6,.8),TX(cx,cy+6,o.mid,150,'ein1','middle',20)):'')};
/* Statische Skizze aus einem Baustein */
const SKZ=(f,lab)=>()=>'<svg class="mlsk" viewBox="0 0 480 270" role="img" aria-label="'+esc(lab)+'">'+f(1)+'</svg>';
const H={F,cl,ez,ph,T,RC,OP,POP,AR,ARp,OK,NO,PER,DOC,ENV,TW,FORM,GEAR,BUB,FIT,TX,WRL,STK,TITLE,STG,MK,CC,LIST,CARDS,BARS,FLOW,VS,STAIRS,TL,BIG,CYC,SKZ};
go(tab);
return {X,H,brand,einShow,seek:(j,k)=>einP&&einP.seek(j,k)}})();
