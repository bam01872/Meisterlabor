/* ===== Version 9, Paket D: Methoden, Information, Kommunikation, Planung, 10 Module mit Vermutung, Erklärvideo und Skizze ===== */
(()=>{const {F,ph,T,RC,OP,POP,ARp,OK,NO,FORM,TX,TITLE,STG,CC,LIST,CARDS,BARS,FLOW,VS,STAIRS,TL,CYC,BIG,SKZ,DOC,PER,GEAR}=ML5.H,X=ML5.X;
const S=(d,t,f)=>({d,t,f});
const MIX=(c,p)=>`color-mix(in srgb,${CC(c)} ${p}%,var(--card))`;
const LN=(d,c='var(--ink)',w=2,x='')=>`<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" ${x}/>`;
/* Rechenszene: Titel, Ausgangslage, bis zu drei Formelzeilen, Schluss (Schluss nur bei höchstens zwei Zeilen) */
const CALC=(ti,lage,rows,fazit)=>k=>{let s=TITLE(ti)+OP(ph(k,.04,.18),TX(240,78,lage,450,'ein2','middle'));
 rows.forEach((r,i)=>{s+=OP(ph(k,.2+i*.2,.34+i*.2),FORM(240,140+i*52,r,'middle'))});
 return s+(fazit?OP(ph(k,.84,.95),TX(240,258,fazit,450,'ein3','middle')):'')};
/* Vierfeld: Spaltenköpfe, Zeilenköpfe, Felder [Kopf, Zusatz, Farbe] */
const Q4=(ti,cols,rows,C)=>k=>{const x0=104,y0=64,w=178,h=90;let s=TITLE(ti)+OP(ph(k,0,.12),cols.map((c,i)=>TX(x0+w/2+i*w,56,c,w-10,'ein2','middle',15)).join('')+rows.map((r,i)=>TX(x0-10,y0+h/2+6+i*h,r,90,'ein2','end',15)).join(''));
 C.forEach((c,i)=>{const x=x0+(i%2)*w,y=y0+Math.floor(i/2)*h;s+=POP(x+w/2,y+h/2,STG(k,4,i,.1,.85),RC(x+3,y+3,w-6,h-6,MIX(c[2],16),CC(c[2]),12,2)+TX(x+w/2,y+40,c[0],w-20,'ein3','middle',18)+TX(x+w/2,y+64,c[1],w-20,'ein2','middle',15))});
 return s};

/* ---------- Datenerfassung & EDV-Systeme ---------- */
const de2=CALC('Gesamtanlageneffektivität (OEE)','Verfügbarkeit 90 %, Leistung 90 %, Qualität 90 %',[['OEE = Verfügbarkeit · Leistung · Qualität'],['OEE = 0,9 · 0,9 · 0,9 ≈ 0,73 = 73 %']],'Drei kleine Verluste ergeben einen großen.');
X['Datenerfassung & EDV-Systeme']={
 v:['Eine Anlage lief 90 % der geplanten Zeit, mit 90 % der Sollgeschwindigkeit, und 90 % der Teile waren gut. Wie hoch ist die OEE ungefähr?',
  ['90 %','rund 73 %','270 %','rund 81 %'],1,
  'Die OEE multipliziert die drei Faktoren: 0,9 · 0,9 · 0,9 ergibt rund 0,73. Jeder Verlust für sich wirkt klein, zusammen fehlt mehr als ein Viertel.'],
 ein:[
 S(13,'Daten fließen in Ebenen. Das ERP plant das ganze Unternehmen, das MES steuert die Fertigung in Echtzeit, und an der Maschine werden die Daten erfasst.',
  LIST('Vom Büro bis zur Maschine',[['ERP','📊','Aufträge, Material, Finanzen im ganzen Betrieb'],['MES und PPS','🏭','Fertigung planen und in Echtzeit steuern'],['BDE und MDE','⚙️','Daten am Arbeitsplatz und an der Maschine erfassen']],{h:58,y0:60})),
 S(13,'Die Betriebsdatenerfassung sammelt drei Arten von Daten: zum Auftrag, zur Maschine und zum Personal.',
  CARDS('Was die BDE erfasst',[['📦','Auftrag','Stückzahl, Zeiten','b'],['⚙️','Maschine','Laufzeit, Störungen','g'],['👷','Personal','Anwesenheit, Zeiten','y']],{note:'Daraus entstehen Kennzahlen wie Ausschussquote und Auslastung.'})),
 S(12,'Stammdaten ändern sich selten, etwa Artikel oder Kunden. Bewegungsdaten entstehen ständig neu, etwa Aufträge und Buchungen.',
  VS('Zwei Arten von Daten',{h:'Stammdaten',c:'b',l:['Artikel, Kunden','Stücklisten','ändern sich selten']},{h:'Bewegungsdaten',c:'y',l:['Aufträge','Buchungen','entstehen täglich']})),
 S(14,'Die Gesamtanlageneffektivität multipliziert Verfügbarkeit, Leistung und Qualität. Je 90 Prozent ergeben nur rund 73 Prozent.',de2),
 S(13,'In der Tabellenkalkulation wandert ein relativer Bezug beim Kopieren mit. Mit Dollarzeichen bleibt der Bezug fest, etwa auf einen Stundensatz.',
  VS('Bezüge beim Kopieren',{h:'relativ',c:'b',l:['=A1*B1','nach unten kopiert:','=A2*B2']},{h:'absolut',c:'g',l:['=A1*$B$1','nach unten kopiert:','=A2*$B$1']},{note:'Mit $ bleibt der Bezug fest.'})),
 S(13,'Für Datensicherung gilt die 3-2-1-Regel: drei Kopien, auf zwei verschiedenen Medien, eine davon außer Haus.',
  CARDS('3-2-1-Regel',[['📄','3 Kopien','Original und zwei Sicherungen','b'],['💽','2 Medien','z. B. Server und Band','g'],['🏠','1 extern','außer Haus oder Cloud','y']]))],
 skz:[[SKZ(de2,'OEE berechnen'),'Die OEE ist das Produkt aus Verfügbarkeit, Leistung und Qualität.']]};

/* ---------- Statistik & Qualitätswerkzeuge ---------- */
const MED=k=>{const V=[10,11,11,12,31];let s=TITLE('Median: der mittlere Wert')+OP(ph(k,0,.1),TX(240,84,'Messwerte sortiert, in g',300,'ein2','middle',15));
 V.forEach((v,i)=>{const x=40+i*84,mid=i===2,p=STG(k,5,i,.05,.45);s+=POP(x+35,130,p,RC(x,104,70,52,mid?MIX('a',22):'var(--card)',mid?'var(--acc)':'var(--line)',10,mid?2.5:1.5)+TX(x+35,138,String(v),60,'ein1','middle',24))});
 return s+OP(ph(k,.55,.68),TX(240,200,'Median = 11 g',300,'ein3','middle',20))+OP(ph(k,.75,.88),TX(240,236,'Mittelwert = 15 g: vom Ausreißer 31 g verzerrt',440,'ein2','middle',16))};
const PAR=k=>{const V=[['Kratzer',40],['Maß',25],['Grat',15],['Farbe',12],['Rest',8]],x0=70,y1=226,bw=60,g=14;let s=TITLE('Pareto-Diagramm'),c=0,pts=[];
 s+=LN(`M${x0-6} 56V${y1}H${x0+5*(bw+g)+4}`,'var(--ink)',1.5)+OP(ph(k,.62,.72),LN(`M${x0-6} ${F(y1-.8*168)}H${x0+5*(bw+g)}`,'var(--red)',1.5,'stroke-dasharray="5 4"')+TX(x0+5*(bw+g)+8,y1-.8*168+5,'80 %',50,'ein2','start',15,'fill:var(--red)'));
 V.forEach((v,i)=>{const x=x0+i*(bw+g),h=v[1]/50*130,p=STG(k,5,i,.05,.55);c+=v[1];pts.push([x+bw/2,y1-c/100*168]);
  s+=RC(x,y1-h*p,bw,h*p,i<2?CC('a'):MIX('a',35),'none',4,0)+OP(p,TX(x+bw/2,y1-h-6,v[1]+' %',bw,'ein2','middle',15)+TX(x+bw/2,y1+20,v[0],bw+10,'ein2','middle',15))});
 s+=OP(ph(k,.6,.8),LN('M'+pts.map(p=>F(p[0])+' '+F(p[1])).join('L'),'var(--flow)',2.5)+pts.map(p=>`<circle cx="${F(p[0])}" cy="${F(p[1])}" r="4" fill="var(--flow)"/>`).join(''));
 return s+OP(ph(k,.86,.96),TX(240,262,'Zwei Fehlerarten machen zwei Drittel aus.',450,'ein3','middle',16))};
X['Statistik & Qualitätswerkzeuge']={
 v:['Fünf Teile wiegen 10, 11, 11, 12 und 31 g. Welcher Wert beschreibt die typische Masse am besten?',
  ['der Mittelwert 15 g','der Median 11 g','die Spannweite 21 g','der größte Wert 31 g'],1,
  'Der Ausreißer 31 g zieht den Mittelwert auf 15 g, obwohl vier von fünf Teilen um 11 g wiegen. Der Median, der mittlere Wert der sortierten Reihe, bleibt davon unberührt.'],
 ein:[
 S(13,'Der Mittelwert ist die Summe aller Werte durch ihre Anzahl. Hier 75 Gramm durch 5, also 15 Gramm.',
  CALC('Arithmetisches Mittel','Messwerte: 10, 11, 11, 12, 31 g',[['x̄ = ',{n:'Summe der Werte',d:'Anzahl'}],['x̄ = ',{n:'75 g',d:'5'},' = 15 g']],'Der Ausreißer zieht den Mittelwert hoch.')),
 S(13,'Der Median ist der mittlere Wert der sortierten Reihe. Bei fünf Werten ist es der dritte: 11 Gramm. Ausreißer stören ihn nicht.',MED),
 S(12,'Die Spannweite ist der größte minus der kleinste Wert. Sie zeigt schnell, wie stark die Werte streuen.',
  CALC('Spannweite','größter Wert 31 g, kleinster Wert 10 g',[['R = größter Wert − kleinster Wert'],['R = 31 g − 10 g = 21 g']],'Ein einziger Ausreißer macht sie groß.')),
 S(13,'Jedes Diagramm hat seine Aufgabe. Säulen vergleichen, Linien zeigen einen Verlauf, der Kreis zeigt Anteile und das Histogramm eine Verteilung.',
  CARDS('Welches Diagramm wofür?',[['📊','Säulen','Werte vergleichen','b'],['📈','Linie','Verlauf über die Zeit','g'],['🥧','Kreis','Anteile am Ganzen','y'],['📶','Histogramm','Verteilung in Klassen','a']],{cols:2})),
 S(14,'Das Pareto-Diagramm sortiert Ursachen nach Häufigkeit. Die Summenlinie zeigt: Wenige Ursachen machen den Großteil aus. Dort fängst Du an.',PAR),
 S(13,'Die Fehlerquote setzt fehlerhafte Teile ins Verhältnis zu den geprüften. 50 von 2000 sind 2,5 Prozent.',
  CALC('Fehlerquote','2000 Teile geprüft, 50 fehlerhaft',[['Quote = ',{n:'fehlerhafte Teile',d:'geprüfte Teile'},' · 100 %'],['Quote = ',{n:'50',d:'2000'},' · 100 % = 2,5 %']],''))],
 skz:[[SKZ(PAR,'Pareto-Diagramm'),'Säulen nach Häufigkeit sortiert, dazu die Summenlinie. Die ersten Säulen sind die wenigen Wichtigen.']]};

/* ---------- Technische Unterlagen & Präsentation ---------- */
const tu1=CARDS('Maßstab: Zeichnung zu Wirklichkeit',[['🔍','1 : 2','verkleinert','b'],['📏','1 : 1','Originalgröße','g'],['🔎','2 : 1','vergrößert','y']],{note:'Die erste Zahl gehört zur Zeichnung.'});
X['Technische Unterlagen & Präsentation']={
 v:['Auf einer Zeichnung im Maßstab 1 : 5 misst eine Kante 20 mm. Wie lang ist sie in Wirklichkeit?',
  ['4 mm','20 mm','100 mm','25 mm'],2,
  'Bei 1 : 5 ist die Zeichnung fünfmal kleiner als das Teil. Also 20 mm · 5 = 100 mm.'],
 ein:[
 S(13,'Technische Zeichnungen gibt es in mehreren Arten: vom ganzen Erzeugnis bis zum einzelnen Teil, dazu Schalt- und Anordnungspläne.',
  LIST('Zeichnungsarten',[['Gesamtzeichnung','1','das ganze Erzeugnis'],['Gruppenzeichnung','2','eine Baugruppe'],['Einzelteilzeichnung','3','ein Teil mit allen Maßen'],['Schaltplan, Anordnungsplan','4','Elektrik, Aufstellung']])),
 S(13,'Der Maßstab vergleicht Zeichnung und Wirklichkeit. 1 zu 2 verkleinert, 2 zu 1 vergrößert, 1 zu 1 ist Originalgröße.',tu1),
 S(13,'Bei einer Verkleinerung nimmst Du das Zeichnungsmaß mal die Maßstabszahl. 20 Millimeter im Maßstab 1 zu 5 sind 100 Millimeter.',
  CALC('Maßstab rechnen','Maßstab 1 : 5, Zeichnungsmaß 20 mm',[['Wirklichkeit = Zeichnungsmaß · 5'],['Wirklichkeit = 20 mm · 5 = 100 mm']],'Bei 2 : 1 teilst Du durch 2.')),
 S(13,'Die Stückliste sagt, was gebraucht wird. Der Arbeitsplan sagt, wie gefertigt wird: Arbeitsgänge, Maschinen und Vorgabezeiten.',
  VS('Zwei Unterlagen',{h:'Stückliste',c:'b',l:['Was wird gebraucht?','Teile und Menge','Benennung, Werkstoff']},{h:'Arbeitsplan',c:'g',l:['Wie wird gefertigt?','Arbeitsgänge','Maschine, Vorgabezeit']})),
 S(13,'Eine Präsentation hat drei Teile. In der Einleitung nennst Du Ziel und Ablauf, im Hauptteil den Inhalt, im Schluss die Zusammenfassung und was jetzt zu tun ist.',
  FLOW('Aufbau einer Präsentation',[['👋','Einleitung','Ziel, Ablauf','b'],['📋','Hauptteil','Inhalt, Beispiele','a'],['🏁','Schluss','Fazit, nächster Schritt','g']])),
 S(12,'Gute Folien haben eine Kernaussage, wenig Text und große Schrift. Ein Diagramm sagt mehr als eine Tabelle voller Zahlen.',
  LIST('Gute Folien',[['eine Kernaussage je Folie','ok'],['wenig Text, große Schrift','ok'],['Diagramm statt Zahlenwüste','ok'],['ganze Sätze vorlesen','no','lieber frei sprechen']]))],
 skz:[[SKZ(tu1,'Maßstäbe'),'Verkleinerung, Originalgröße und Vergrößerung. Die erste Zahl steht für die Zeichnung.']]};

/* ---------- Informationsfluss & Dokumentation ---------- */
const OV=(x,y,rx,t,c='var(--ink)')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="22" fill="var(--card)" stroke="${c}" stroke-width="2"/>`+TX(x,y+6,t,2*rx-12,'ein3','middle',15);
const RE=(x,y,w,t,c='var(--ink)')=>RC(x-w/2,y-22,w,44,'var(--card)',c,4,2)+TX(x,y+6,t,w-10,'ein3','middle',15);
const DI=(x,y,t,c='var(--ink)')=>`<path d="M${x-46} ${y}L${x} ${y-32}L${x+46} ${y}L${x} ${y+32}Z" fill="var(--card)" stroke="${c}" stroke-width="2"/>`+TX(x,y+6,t,60,'ein3','middle',15);
const DC=(x,y,t,c='var(--ink)')=>`<path d="M${x-48} ${y-24}H${x+48}V${y+16}Q${x+24} ${y+4} ${x} ${y+16}T${x-48} ${y+16}Z" fill="var(--card)" stroke="${c}" stroke-width="2"/>`+TX(x,y+2,t,86,'ein3','middle',15);
const SYM=k=>{let s=TITLE('Symbole im Flussdiagramm');const L=[[66,'Start, Ende'],[180,'Tätigkeit'],[298,'Entscheidung'],[414,'Dokument']];
 const G=[OV(66,130,52,'Start'),RE(180,130,100,'Teil prüfen'),DI(298,130,'i. O.?'),DC(414,130,'Protokoll')];
 G.forEach((g,i)=>{const p=STG(k,4,i,.05,.8);s+=POP(L[i][0],130,p,g)+OP(p,TX(L[i][0],196,L[i][1],112,'ein3','middle',16,'fill:var(--acc)'))});
 return s+OP(ph(k,.86,.96),TX(240,246,'Pfeile zeigen die Reihenfolge.',450,'ein2','middle',16))};
const FLX=k=>{let s=TITLE('Beispiel: Wareneingang prüfen');const A=(a,b,c,d,p)=>ARp(a,b,c,d,p,'var(--ink)',2);
 s+=POP(56,96,ph(k,.02,.12),OV(56,96,44,'Start'))+A(102,96,126,96,ph(k,.1,.18))+POP(178,96,ph(k,.15,.25),RE(178,96,100,'Teil prüfen'))+A(230,96,254,96,ph(k,.24,.32));
 s+=POP(302,96,ph(k,.3,.4),DI(302,96,'i. O.?'))+A(350,96,374,96,ph(k,.42,.5))+OP(ph(k,.42,.5),TX(362,84,'ja',30,'ein2','middle',14));
 s+=POP(422,96,ph(k,.48,.56),RE(422,96,92,'Lager',`var(--ok)`))+A(302,130,302,180,ph(k,.58,.66))+OP(ph(k,.58,.66),TX(320,160,'nein',40,'ein2','start',14));
 s+=POP(302,204,ph(k,.64,.72),RE(302,204,104,'Sperrlager','var(--red)'))+A(356,204,376,204,ph(k,.74,.8))+A(422,120,422,180,ph(k,.74,.8))+POP(422,204,ph(k,.8,.88),OV(422,204,42,'Ende'));
 return s};
X['Informationsfluss & Dokumentation']={
 v:['Welches Symbol steht im Flussdiagramm für eine Entscheidung mit Ja oder Nein?',
  ['Rechteck','Raute','Oval','Kreis'],1,
  'Die Raute steht für eine Entscheidung. Aus ihr führen zwei Pfeile heraus, einer für Ja und einer für Nein. Das Oval markiert Start und Ende, das Rechteck eine Tätigkeit.'],
 ein:[
 S(13,'Ein Flussdiagramm hat feste Symbole: Oval für Start und Ende, Rechteck für eine Tätigkeit, Raute für eine Entscheidung und ein Blatt mit Welle für ein Dokument.',SYM),
 S(14,'So sieht ein einfacher Ablauf aus: Ein Teil wird geprüft. Ist es in Ordnung, kommt es ins Lager, sonst ins Sperrlager.',FLX),
 S(13,'Bei der Bringschuld muss der Sender liefern, bei der Holschuld der Empfänger sich die Information besorgen. Kläre, was wofür gilt.',
  VS('Wer muss sich kümmern?',{h:'Bringschuld',c:'b',l:['Sender liefert','z. B. Sicherheits-','hinweise an alle']},{h:'Holschuld',c:'g',l:['Empfänger besorgt','z. B. Schichtplan','im Intranet']},{note:'Unklare Zuständigkeit: Information geht verloren.'})),
 S(13,'Dokumentiert wird, was nachgewiesen werden muss: Arbeitsanweisungen, Prüfprotokolle, das Schichtbuch und Unterweisungen.',
  CARDS('Was dokumentiert wird',[['📘','Arbeitsanweisung','so wird gearbeitet','b'],['✅','Prüfprotokoll','so wurde geprüft','g'],['📓','Schichtbuch','was war los?','y'],['✍️','Unterweisung','wer wurde wann unterwiesen','a']],{cols:2})),
 S(14,'Unterlagen müssen unterschiedlich lange aufbewahrt werden: Arbeitszeitnachweise 2 Jahre, das Verbandbuch 5, Buchungsbelege 8 und Jahresabschlüsse 10 Jahre.',
  BARS('Aufbewahrungsfristen',[['Arbeitszeit',2,'2 Jahre','b'],['Verbandbuch',5,'5 Jahre','g'],['Belege',8,'8 Jahre','y'],['Abschlüsse',10,'10 Jahre','a']],{max:10,lx:140,W:200,h:44,y0:60,note:'Die Frist beginnt meist am Jahresende.'})),
 S(13,'Eine gute Besprechung hat eine Einladung mit Ziel und Tagesordnung, einen festen Zeitrahmen und ein Protokoll mit Verantwortlichen.',
  LIST('Besprechung',[['Einladung mit Ziel und Tagesordnung','1'],['fester Zeitrahmen','2'],['Moderation, alle kommen zu Wort','3'],['Protokoll: wer, was, bis wann','4']]))],
 skz:[[SKZ(FLX,'Flussdiagramm Wareneingang'),'Ein Ablauf mit Start, Tätigkeit, Entscheidung und zwei Wegen.']]};

/* ---------- Kreativ- & Entscheidungstechniken ---------- */
const kr1=Q4('SWOT-Analyse',['positiv','negativ'],['innen','außen'],[['Stärken','was wir gut können','g'],['Schwächen','wo wir hinterher sind','r'],['Chancen','was der Markt bietet','b'],['Risiken','was uns droht','y']]);
const MM=k=>{let s=TITLE('Mindmap');const B=[[96,84,'Platz'],[384,84,'Kosten'],[70,160,'Wege'],[410,160,'Lärm'],[120,236,'Strom'],[360,236,'Sicherheit']];
 B.forEach((b,i)=>{const p=STG(k,6,i,.15,.85),mx=(240+b[0])/2;s+=OP(p,LN(`M240 160Q${F(mx)} ${F(b[1])} ${F(b[0]+(b[0]<240?44:-44))} ${b[1]}`,'var(--flow)',2.5)+RC(b[0]-48,b[1]-17,96,34,MIX('b',14),'var(--flow)',17,2)+TX(b[0],b[1]+6,b[2],86,'ein3','middle',15))});
 return s+POP(240,160,ph(k,.02,.14),`<ellipse cx="240" cy="160" rx="72" ry="30" fill="${MIX('a',22)}" stroke="var(--acc)" stroke-width="2.5"/>`+TX(240,166,'neue Halle',130,'ein3','middle',17))};
X['Kreativ- & Entscheidungstechniken']={
 v:['Beim Brainstorming sagt ein Kollege zu einer Idee: „Das klappt doch nie!“ Was machst Du als Moderator?',
  ['Du gibst ihm recht.','Du erinnerst an die Regel: keine Kritik in der Ideenphase.','Du beendest die Sitzung.','Du streichst die Idee sofort.'],1,
  'In der Ideenphase gilt: keine Kritik, Menge vor Güte. Bewertet wird erst danach. Sonst trauen sich die Leute nicht mehr, ungewöhnliche Ideen zu nennen.'],
 ein:[
 S(13,'Beim Brainstorming gelten vier Regeln: keine Kritik, Menge vor Güte, Ideen anderer aufgreifen und frei denken. Bewertet wird erst danach.',
  LIST('Regeln fürs Brainstorming',[['keine Kritik in der Ideenphase','ok'],['Menge vor Güte','ok'],['Ideen anderer aufgreifen','ok'],['erst danach bewerten','ok']])),
 S(14,'Bei der Methode 6-3-5 schreiben sechs Leute je drei Ideen in fünf Minuten und geben das Blatt weiter. Nach sechs Runden liegen 108 Ideen vor.',
  CALC('Methode 6-3-5','6 Teilnehmer, je 3 Ideen, 6 Runden zu 5 Minuten',[['Ideen = 6 · 3 · 6'],['Ideen = 108 in 30 Minuten']],'Jeder baut auf den Ideen der anderen auf.')),
 S(12,'Eine Mindmap ordnet Gedanken. Das Thema steht in der Mitte, die Teilthemen gehen als Äste davon ab.',MM),
 S(14,'Die SWOT-Analyse schaut nach innen auf Stärken und Schwächen und nach außen auf Chancen und Risiken.',kr1),
 S(14,'Bei der Nutzwertanalyse gewichtest Du die Kriterien und vergibst Punkte. Gewicht mal Punkte, dann addieren. Hier gewinnt Maschine B.',
  CALC('Nutzwertanalyse','Gewicht Preis 40 %, Leistung 60 %',[['Punkte: A 8 und 6, B 5 und 9'],['NW A = 0,4 · 8 + 0,6 · 6 = 6,8'],['NW B = 0,4 · 5 + 0,6 · 9 = 7,4']],''))],
 skz:[[SKZ(kr1,'SWOT-Analyse'),'Stärken und Schwächen liegen im Betrieb, Chancen und Risiken kommen von außen.']]};

/* ---------- Moderation & Zeitmanagement ---------- */
const mz1=Q4('Eisenhower-Matrix',['dringend','nicht dringend'],['wichtig','nicht wichtig'],[['sofort tun','selbst erledigen','r'],['planen','Termin setzen','g'],['delegieren','abgeben','y'],['streichen','Papierkorb','m']]);
X['Moderation & Zeitmanagement']={
 v:['Wie verhält sich ein Moderator in einer Problemlösungsrunde?',
  ['Er bringt seine eigene Lösung durch.','Er steuert den Ablauf und bleibt beim Inhalt neutral.','Er entscheidet am Ende allein.','Er schreibt nur das Protokoll.'],1,
  'Der Moderator ist für den Weg zuständig, nicht für das Ergebnis. Er sorgt dafür, dass alle zu Wort kommen, macht Beiträge sichtbar und sichert die Ergebnisse.'],
 ein:[
 S(13,'Der Moderator steuert den Ablauf, nicht den Inhalt. Er macht Beiträge sichtbar, bezieht alle ein und sichert Ergebnisse. Seine Meinung hält er zurück.',
  VS('Rolle des Moderators',{h:'macht',c:'g',l:['Ablauf steuern','visualisieren','alle beteiligen','Ergebnis sichern']},{h:'macht nicht',c:'r',l:['eigene Lösung','durchsetzen','Beiträge bewerten','allein entscheiden']})),
 S(14,'Eine Moderation läuft in sechs Schritten: einsteigen, Themen sammeln, auswählen, bearbeiten, Maßnahmen planen und abschließen.',
  LIST('Moderationszyklus',[['Einstieg','1'],['Themen sammeln','2'],['Themen auswählen','3'],['Themen bearbeiten','4'],['Maßnahmen: wer, was, bis wann','5'],['Abschluss, Rückblick','6']],{y0:48})),
 S(14,'Mit der ALPEN-Methode planst Du Deinen Tag: Aufgaben notieren, Länge schätzen, Puffer einplanen, Entscheidungen treffen, nachkontrollieren.',
  LIST('ALPEN-Methode',[['Aufgaben notieren','A'],['Länge schätzen','L'],['Pufferzeiten einplanen','P','nur etwa 60 % verplanen'],['Entscheidungen treffen','E','Prioritäten, delegieren'],['Nachkontrolle','N','Was ist liegen geblieben?']],{y0:48})),
 S(14,'Die Eisenhower-Matrix sortiert Aufgaben nach wichtig und dringend. Wichtiges, das nicht dringend ist, planst Du fest ein, bevor es dringend wird.',mz1),
 S(12,'Das Pareto-Prinzip: Mit rund 20 Prozent des Aufwands erreichst Du oft 80 Prozent des Ergebnisses. Fang mit dem Wichtigsten an.',
  BARS('Pareto-Prinzip',[['Aufwand',20,'20 %','a'],['Ergebnis',80,'80 %','g']],{max:80,lx:120,W:240,h:60,y0:80,note:'Das Wichtigste zuerst.'})),
 S(12,'Zeitdiebe kosten jeden Tag Stunden: ständige Unterbrechungen, fehlende Planung, unklare Aufträge und zu viele Besprechungen.',
  CARDS('Zeitdiebe',[['📞','Unterbrechungen','Telefon, Zuruf','r'],['🗓️','keine Planung','alles ist dringend','y'],['❓','unklare Aufträge','Nacharbeit','y'],['🪑','Besprechungen','zu viele, zu lang','r']],{cols:2}))],
 skz:[[SKZ(mz1,'Eisenhower-Matrix'),'Vier Felder nach wichtig und dringend: sofort tun, planen, delegieren, streichen.']]};

/* ---------- Qualitätsmanagement ---------- */
const qm1=STAIRS('Zehnerregel der Fehlerkosten',[['Entwicklung','10 €'],['Fertigung','100 €'],['Prüfung','1000 €'],['beim Kunden','10 000 €']],{top:84,hi:3,lo:'Je Stufe etwa zehnmal teurer.'});
X['Qualitätsmanagement']={
 v:['Ein Fehler kostet in der Entwicklung 10 €. Was kostet er nach der Zehnerregel ungefähr, wenn ihn erst der Kunde findet?',
  ['20 €','100 €','10 000 €','1000 €'],2,
  'Je Stufe steigen die Kosten etwa um den Faktor 10: Entwicklung 10 €, Fertigung 100 €, Endprüfung 1000 €, beim Kunden 10 000 €. Darum lohnt Vorbeugen.'],
 ein:[
 S(12,'Qualität heißt: Das Produkt erfüllt die Anforderungen des Kunden. Nicht das Teuerste ist am besten, sondern das, was passt.',
  BIG('Was ist Qualität?',[['Anforderungen','ein1',34],['des Kunden erfüllen','ein3',22],['nicht mehr, nicht weniger','ein2',17]],{y0:110})),
 S(14,'Die ISO 9001 beschreibt ein Qualitätsmanagementsystem. Zertifiziert wird das System, nicht das Produkt. Das Zertifikat gilt drei Jahre, mit jährlichen Überwachungsaudits.',
  LIST('Audits',[['internes Audit','1','der Betrieb prüft sich selbst'],['Kundenaudit','2','der Kunde prüft Dich'],['Zertifizierungsaudit','3','unabhängige Stelle, Zertifikat 3 Jahre'],['Überwachungsaudit','🔁','jedes Jahr']])),
 S(13,'Die Zehnerregel: Je später ein Fehler entdeckt wird, desto teurer. Von Stufe zu Stufe etwa zehnmal.',qm1),
 S(13,'Qualitätskosten haben drei Teile: Verhütung, Prüfung und Fehler. Wer in Verhütung investiert, spart meist bei den Fehlerkosten.',
  CARDS('Qualitätskosten',[['🛡️','Verhütung','Schulung, FMEA','g'],['🔬','Prüfung','Messen, Prüfen','b'],['💥','Fehler','Ausschuss, Reklamation','r']],{note:'Vorbeugen ist billiger als Fehler beheben.'})),
 S(14,'Bei der FMEA bewertest Du jeden möglichen Fehler nach Bedeutung, Auftreten und Entdeckung, je 1 bis 10. Das Produkt ist die Risikoprioritätszahl.',
  CALC('Risikoprioritätszahl (FMEA)','Bedeutung 8, Auftreten 4, Entdeckung 5',[['RPZ = B · A · E'],['RPZ = 8 · 4 · 5 = 160']],'Hohe RPZ: dort zuerst Maßnahmen.')),
 S(12,'Total Quality Management heißt: Qualität ist Aufgabe aller, in allen Bereichen, und wird ständig verbessert.',
  CARDS('TQM',[['👥','alle','jeder ist beteiligt','b'],['🏭','überall','in allen Bereichen','g'],['🔁','ständig','immer verbessern','y']]))],
 skz:[[SKZ(qm1,'Zehnerregel'),'Fehlerkosten steigen von Stufe zu Stufe etwa um den Faktor 10.']]};

/* ---------- Agiles Projektmanagement ---------- */
const ag1=CYC('Scrum-Ablauf',[['Planning','Was schaffen wir?','a'],['Sprint','bis 1 Monat','b'],['Review','Ergebnis zeigen','g'],['Retro','besser werden','y']],{cy:160,sy:.9});
const KAN=k=>{let s=TITLE('Kanban-Board');const C=[['Zu tun',''],['In Arbeit','max. 3'],['Fertig','']],xs=[16,166,316];
 C.forEach((c,i)=>{s+=RC(xs[i],52,148,174,'var(--card)','var(--line)',10,1.5)+TX(xs[i]+74,76,c[0],136,'ein3','middle',16)+(c[1]?TX(xs[i]+74,96,c[1],136,'ein2','middle',14,'fill:var(--red)'):'')});
 const card=(x,y,t,c)=>RC(x,y,128,30,MIX(c,18),CC(c),6,1.5)+TX(x+64,y+20,t,118,'ein2','middle',14);
 [['Aufgabe E',0,0],['Aufgabe F',0,1],['Aufgabe B',1,0],['Aufgabe C',1,1],['Aufgabe A',2,0]].forEach((c,i)=>{s+=OP(STG(k,5,i,.03,.4),card(xs[c[1]]+10,106+c[2]*38,c[0],c[1]===2?'g':c[1]===1?'b':'m'))});
 const m=ph(k,.5,.75),x=xs[1]+10+(xs[2]-xs[1])*m,y=106+2*38+(144-182)*m;
 s+=OP(ph(k,.42,.5),card(x,y,'Aufgabe D','b'));
 return s+OP(ph(k,.82,.94),TX(240,254,'Erst fertig machen, dann Neues ziehen.',450,'ein2','middle',16))};
X['Agiles Projektmanagement']={
 v:['Im Daily Scrum stimmt sich das Team jeden Tag ab. Wie lange dauert es höchstens?',
  ['15 Minuten','eine Stunde','einen halben Tag','so lange wie nötig'],0,
  'Das Daily Scrum ist auf 15 Minuten begrenzt. Das Team klärt kurz, was seit gestern geschafft wurde, was heute ansteht und was im Weg steht. Lange Diskussionen kommen danach.'],
 ein:[
 S(13,'Klassisch wird alles vorab geplant und dann abgearbeitet. Agil wird in kurzen Zyklen gearbeitet, und der Plan darf sich ändern.',
  VS('Klassisch oder agil?',{h:'klassisch',c:'b',l:['alles vorab planen','Phasen nacheinander','gut bei klarem Ziel']},{h:'agil',c:'g',l:['kurze Zyklen','früh Ergebnisse zeigen','gut bei unklarem Ziel']})),
 S(14,'Ein Sprint dauert höchstens einen Monat. Er beginnt mit dem Planning und endet mit dem Review des Ergebnisses und der Retrospektive zur Zusammenarbeit.',ag1),
 S(13,'Scrum kennt drei Rollen. Der Product Owner verantwortet den Nutzen, der Scrum Master den Ablauf, das Team liefert das Ergebnis.',
  CARDS('Rollen in Scrum',[['🎯','Product Owner','Nutzen, Backlog','a'],['🧹','Scrum Master','räumt Hindernisse weg','b'],['👥','Team','organisiert sich selbst','g']])),
 S(13,'Das Product Backlog sammelt alle Anforderungen nach Priorität. Für jeden Sprint wird ein Teil ausgewählt. Am Ende steht ein nutzbares Ergebnis.',
  LIST('Artefakte',[['Product Backlog','📚','alle Anforderungen, nach Priorität'],['Sprint Backlog','📋','Auswahl für diesen Sprint'],['Inkrement','📦','nutzbares Ergebnis'],['Definition of Done','ok','wann ist etwas wirklich fertig?']])),
 S(14,'Kanban macht Arbeit sichtbar. Jede Spalte ist ein Zustand. Die Grenze für laufende Arbeit sorgt dafür, dass erst fertig gemacht wird.',KAN),
 S(13,'Das agile Manifest setzt vier Schwerpunkte. Das Rechte ist nicht unwichtig, das Linke aber wichtiger.',
  LIST('Agiles Manifest',[['Menschen und Zusammenarbeit','ok','vor Prozessen und Werkzeugen'],['funktionierende Produkte','ok','vor umfassender Dokumentation'],['Zusammenarbeit mit dem Kunden','ok','vor Vertragsverhandlung'],['auf Veränderung reagieren','ok','vor dem Befolgen eines Plans']]))],
 skz:[[SKZ(ag1,'Scrum-Ablauf'),'Ein Sprint im Kreis: planen, umsetzen, Ergebnis zeigen, Zusammenarbeit verbessern.']]};

/* ---------- Problemlösung: 5-Why & Analysemethoden ---------- */
const FISH=k=>{let s=TITLE('Ishikawa-Diagramm (6 M)');const T6=[['Mensch',100],['Maschine',210],['Material',320]],B6=[['Methode',100],['Messung',210],['Mitwelt',320]];
 s+=OP(ph(k,0,.12),LN('M24 150H368','var(--ink)',3)+RC(370,128,98,44,MIX('r',18),'var(--red)',10,2)+TX(419,156,'Ausschuss',90,'ein3','middle',16));
 T6.concat(B6).forEach((b,i)=>{const up=i<3,p=STG(k,6,i,.12,.85),y=up?72:228;
  s+=OP(p,LN(`M${b[1]-44} ${y}L${b[1]} 150`,'var(--flow)',2.2)+TX(b[1]-44,up?62:250,b[0],100,'ein3','middle',16))});
 return s};
X['Problemlösung: 5-Why & Analysemethoden']={
 v:['Eine Maschine steht, weil eine Sicherung ausgelöst hat. Was ist nach der 5-Why-Methode der richtige nächste Schritt?',
  ['Sicherung tauschen, fertig.','Fragen, warum die Sicherung ausgelöst hat.','Den Bediener abmahnen.','Eine neue Maschine bestellen.'],1,
  'Die Sicherung ist nur das Symptom. Fragst Du weiter „Warum?“, kommst Du über den überlasteten Motor und das schwergängige Lager zur eigentlichen Ursache, etwa einem fehlenden Schmierplan.'],
 ein:[
 S(15,'Bei 5-Why fragst Du so lange „Warum?“, bis Du bei der eigentlichen Ursache bist. Hier ist es nicht die Sicherung, sondern der fehlende Schmierplan.',
  LIST('5-Why: Maschine steht',[['Warum? Sicherung hat ausgelöst.','1'],['Warum? Motor war überlastet.','2'],['Warum? Lager lief schwer.','3'],['Warum? Es wurde nicht geschmiert.','4'],['Warum? Kein Schmierplan: die Ursache.','5']],{y0:48,hi:4})),
 S(14,'Das Ishikawa-Diagramm ordnet mögliche Ursachen nach sechs M: Mensch, Maschine, Material, Methode, Messung und Mitwelt.',FISH),
 S(13,'Mit 5W2H beschreibst Du ein Problem oder eine Maßnahme vollständig: was, warum, wer, wo, wann, wie und wie viel.',
  CARDS('5W2H',[['','Was?','','b'],['','Warum?','','b'],['','Wer?','','b'],['','Wo?','','b'],['','Wann?','','b'],['','Wie?','','g'],['','Wie viel?','','g']],{cols:4,note:'fünf W, zwei H (how, how much)'})),
 S(15,'Bei Reklamationen hilft der 8D-Report. Acht Schritte führen vom Team über die Sofortmaßnahme und die Ursache bis zur Vorbeugung.',
  CARDS('8D-Report',[['','D1','Team bilden','b'],['','D2','Problem beschreiben','b'],['','D3','sofort handeln','r'],['','D4','Ursache finden','y'],['','D5','Abhilfe wählen','y'],['','D6','umsetzen','g'],['','D7','vorbeugen','g'],['','D8','Team würdigen','a']],{cols:4})),
 S(13,'Unterscheide drei Maßnahmen: Die Sofortmaßnahme begrenzt den Schaden, die Korrektur beseitigt die Ursache, die Vorbeugung verhindert ähnliche Fehler anderswo.',
  CARDS('Drei Maßnahmen',[['🧯','sofort','Schaden begrenzen','r'],['🔧','Korrektur','Ursache beseitigen','y'],['🛡️','Vorbeugung','anderswo verhindern','g']])),
 S(13,'Der PDCA-Zyklus sichert die Lösung: planen, ausprobieren, Wirkung prüfen, dann als Standard festschreiben oder nachsteuern.',
  CYC('PDCA-Zyklus',[['Plan','planen','a'],['Do','umsetzen','b'],['Check','prüfen','y'],['Act','Standard','g']],{cy:160,sy:.9}))],
 skz:[[SKZ(FISH,'Ishikawa-Diagramm'),'Die sechs M als Gräten: Mensch, Maschine, Material, Methode, Messung, Mitwelt.']]};

/* ---------- Statistik vertieft & Diagramme lesen ---------- */
const NORM=k=>{const cx=240,sg=60,yb=226,H=150,f=x=>yb-H*Math.exp(-(((x-cx)/sg)**2)/2);let s=TITLE('Normalverteilung');
 const area=(a,b)=>{let d=`M${a} ${yb}`;for(let x=a;x<=b;x+=4)d+=`L${x} ${F(f(x))}`;return d+`L${b} ${yb}Z`};
 [[3,10,'±3σ: 99,7 %'],[2,20,'±2σ: 95,4 %'],[1,34,'±1σ: 68,3 %']].forEach((b,i)=>{const p=ph(k,.2+i*.18,.34+i*.18);
  s+=OP(p,`<path d="${area(cx-b[0]*sg,cx+b[0]*sg)}" fill="${MIX('a',b[1])}"/>`+`<rect x="20" y="${F(110-i*24)}" width="14" height="14" rx="3" fill="${MIX('a',b[1])}" stroke="var(--acc)"/>`+TX(40,F(122-i*24),b[2],120,'ein2','start',15))});
 let d='M40 '+F(f(40));for(let x=44;x<=440;x+=4)d+=`L${x} ${F(f(x))}`;
 s+=LN(`M30 ${yb}H450`,'var(--ink)',1.5)+OP(ph(k,0,.15),LN(d,'var(--acc)',3));
 ['−3σ','−2σ','−1σ','x̄','+1σ','+2σ','+3σ'].forEach((t,i)=>{const x=cx+(i-3)*sg;s+=OP(ph(k,.1,.2),LN(`M${x} ${yb}v6`,'var(--mute)',1.5)+TX(x,yb+22,t,50,'ein2','middle',14))});
 return s};
const RK=k=>{let s=TITLE('Qualitätsregelkarte');const V=[0,.4,-.3,.6,-.5,.2,.9,-.2,.5,1.4],y=v=>150-v*70/1.15;
 s+=LN('M40 150H400','var(--ok)',2)+LN('M40 80H400','var(--red)',2,'stroke-dasharray="6 4"')+LN('M40 220H400','var(--red)',2,'stroke-dasharray="6 4"')+
  TX(408,85,'OEG',60,'ein2','start',15,'fill:var(--red)')+TX(408,155,'x̄',60,'ein2','start',15)+TX(408,225,'UEG',60,'ein2','start',15,'fill:var(--red)');
 const P=V.map((v,i)=>[56+i*37,y(v)]);
 s+=LN('M'+P.map(p=>F(p[0])+' '+F(p[1])).join('L'),'var(--flow)',2,`opacity="${F(ph(k,.05,.7))}"`);
 P.forEach((p,i)=>{const out=i===9;s+=POP(p[0],p[1],STG(k,10,i,.05,.75),`<circle cx="${F(p[0])}" cy="${F(p[1])}" r="${out?7:5}" fill="${out?'var(--red)':'var(--flow)'}"/>`)});
 return s+OP(ph(k,.82,.94),TX(240,254,'Punkt außerhalb der Grenzen: eingreifen.',450,'ein3','middle',16))};
const BOX=k=>{const X0=v=>40+v*4;let s=TITLE('Boxplot');const q1=X0(40),md=X0(50),q3=X0(65),mn=X0(20),mx=X0(80),ou=X0(95);
 s+=OP(ph(k,.05,.25),RC(q1,112,q3-q1,56,MIX('a',18),'var(--acc)',4,2)+LN(`M${md} 112v56`,'var(--acc)',3));
 s+=OP(ph(k,.25,.45),LN(`M${mn} 140H${q1}M${q3} 140H${mx}M${mn} 126v28M${mx} 126v28`,'var(--ink)',2));
 s+=POP(ou,140,ph(k,.45,.55),`<circle cx="${ou}" cy="140" r="6" fill="var(--red)"/>`);
 s+=OP(ph(k,.55,.7),LN(`M${q1} 92v-8H${q3}v8`,'var(--mute)',1.5)+TX((q1+q3)/2,74,'mittlere 50 % der Werte',220,'ein2','middle',15)+TX(q1,104,'Q1',30,'ein2','middle',14)+TX(q3,104,'Q3',30,'ein2','middle',14));
 s+=OP(ph(k,.7,.85),TX(mn,190,'Min',50,'ein2','middle',14)+TX(md,190,'Median',70,'ein2','middle',14)+TX(mx,190,'Max',50,'ein2','middle',14)+TX(ou,190,'Ausreißer',80,'ein2','middle',14,'fill:var(--red)'));
 return s+OP(ph(k,.88,.97),TX(240,240,'Die Box zeigt, wo die meisten Werte liegen.',450,'ein3','middle',16))};
X['Statistik vertieft & Diagramme lesen']={
 v:['Ein Prozess ist normalverteilt. Wie viel Prozent der Werte liegen ungefähr innerhalb von ±3σ um den Mittelwert?',
  ['68 %','95 %','99,7 %','100 %'],2,
  'Innerhalb von ±1σ liegen etwa 68,3 %, bei ±2σ etwa 95,4 % und bei ±3σ etwa 99,7 % der Werte. Darum liegen die Eingriffsgrenzen einer Regelkarte meist bei ±3σ.'],
 ein:[
 S(13,'Drei Lagemaße solltest Du kennen: den Mittelwert, den Median als mittleren Wert und den Modus als häufigsten Wert.',
  CARDS('Lagemaße',[['➗','Mittelwert','Summe durch Anzahl','b'],['🎯','Median','mittlerer Wert','g'],['🔁','Modus','häufigster Wert','y']],{note:'Der Median ist robust gegen Ausreißer.'})),
 S(14,'Viele Messwerte folgen der Glockenkurve. Innerhalb von einer Standardabweichung um den Mittelwert liegen rund 68 Prozent, bei drei fast alle.',NORM),
 S(14,'Die Regelkarte überwacht einen Prozess. Liegt ein Wert außerhalb der Eingriffsgrenzen, meist ±3σ, musst Du eingreifen.',RK),
 S(14,'Der Boxplot zeigt Quartile. In der Box liegen die mittleren 50 Prozent der Werte, der Strich darin ist der Median. Einzelne Punkte sind Ausreißer.',BOX),
 S(14,'Wähle das Diagramm nach der Frage: Verlauf als Linie, Vergleich als Säulen, Anteile als Kreis, Verteilung als Histogramm, Zusammenhang als Streudiagramm.',
  LIST('Diagramm nach Frage wählen',[['Verlauf über die Zeit','📈','Liniendiagramm'],['Vergleich von Gruppen','📊','Säulen oder Balken'],['Anteile am Ganzen','🥧','Kreis, nur wenige Teile'],['Verteilung','📶','Histogramm'],['Zusammenhang zweier Größen','🔹','Streudiagramm']],{y0:48})),
 S(12,'Korrelation ist nicht Kausalität. Eisverkauf und Sonnenbrand steigen gemeinsam, aber das Eis ist nicht schuld. Die Ursache ist die Sonne.',
  BIG('Korrelation ist nicht Kausalität',[['Eis ↑ und Sonnenbrand ↑','ein3',22],['Ursache: die Sonne','ein3',22,'fill:var(--acc)'],['Zusammenhang beweist keine Ursache.','ein2',17]],{y0:108}))],
 skz:[[SKZ(NORM,'Normalverteilung'),'Glockenkurve mit den Bereichen ±1σ, ±2σ und ±3σ.']]};

if(typeof tab!=='undefined'&&FACH.includes(tab))go(tab)})();
