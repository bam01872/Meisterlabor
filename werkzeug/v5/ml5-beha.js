/* ===== Version 8, Paket B: Betriebswirtschaftliches Handeln, 11 Module mit Vermutung, Erklärvideo und Skizze ===== */
(()=>{const {F,ph,T,RC,OP,POP,ARp,OK,NO,FORM,TX,TITLE,STG,CC,LIST,CARDS,BARS,FLOW,VS,STAIRS,TL,CYC,BIG,SKZ,DOC,PER,GEAR}=ML5.H,X=ML5.X;
const S=(d,t,f)=>({d,t,f});
/* Rechenszene: Titel, Ausgangslage, bis zu drei Formelzeilen, Schluss */
const CALC=(ti,lage,rows,fazit)=>k=>{let s=TITLE(ti)+OP(ph(k,.04,.18),TX(240,78,lage,450,'ein2','middle'));
 rows.forEach((r,i)=>{s+=OP(ph(k,.2+i*.2,.34+i*.2),FORM(240,140+i*52,r,'middle'))});
 return s+(fazit?OP(ph(k,.84,.95),TX(240,258,fazit,450,'ein3','middle')):'')};

/* ---------- 0 Wirtschaftliche Grundlagen & Kennzahlen ---------- */
const wg1=VS('Drei Kennzahlen, drei Fragen',{h:'Produktivität',c:'b',l:['Menge durch Menge','Stück je Stunde','Wie effizient?']},{h:'Rentabilität',c:'g',l:['Gewinn durch Kapital','in Prozent','Lohnt sich das Geld?']},{note:'Wirtschaftlichkeit: Ertrag durch Aufwand, ohne Einheit'});
X['Wirtschaftliche Grundlagen & Kennzahlen']={
 v:['Eine neue Maschine schafft 50 statt 40 Teile pro Stunde. Welche Kennzahl steigt damit sicher?',
  ['die Rentabilität','die Produktivität','die Wirtschaftlichkeit','der Gewinn'],1,
  'Mehr Stück je Stunde heißt höhere Produktivität, denn sie vergleicht Mengen. Ob Wirtschaftlichkeit und Rentabilität steigen, hängt von den Kosten der Maschine und vom eingesetzten Kapital ab.'],
 ein:[
 S(12,'Das ökonomische Prinzip hat zwei Formen. Beim Minimalprinzip ist das Ergebnis fest und der Einsatz soll klein sein. Beim Maximalprinzip ist es umgekehrt.',
  VS('Ökonomisches Prinzip',{h:'Minimalprinzip',c:'b',l:['Ergebnis fest','Einsatz so klein','wie möglich']},{h:'Maximalprinzip',c:'g',l:['Einsatz fest','Ergebnis so groß','wie möglich']},{note:'Beides zugleich geht nicht: kein „Maximum mit Minimum“'})),
 S(12,'Produziert wird mit Arbeit, Betriebsmitteln und Werkstoffen. Dazu kommt der dispositive Faktor: Leitung, Planung und Organisation, also auch Deine Arbeit als Meister.',
  CARDS('Produktionsfaktoren',[['👷','Arbeit','ausführend','b'],['⚙️','Betriebs-','mittel','b'],['🧱','Werkstoffe','Material','b'],['🧭','dispositiver','Faktor','a']],{note:'Die ersten drei heißen Elementarfaktoren.'})),
 S(14,'Die Produktivität vergleicht Mengen. 400 Teile in 8 Stunden ergeben 50 Teile je Stunde. Sie sagt nichts über Geld.',
  CALC('Produktivität','400 Teile in 8 Arbeitsstunden',[['Produktivität = ',{n:'Ausbringung',d:'Einsatz'}],['Produktivität = ',{n:'400 Teile',d:'8 h'},' = 50 ',{n:'Teile',d:'h'}]],'Mengen durch Mengen, kein Euro')),
 S(14,'Die Wirtschaftlichkeit vergleicht Werte. 120 000 € Ertrag bei 100 000 € Aufwand ergeben 1,2. Über 1 arbeitet der Betrieb wirtschaftlich.',
  CALC('Wirtschaftlichkeit','Ertrag 120 000 €, Aufwand 100 000 €',[['W = ',{n:'Ertrag',d:'Aufwand'}],['W = ',{n:'120 000 €',d:'100 000 €'},' = 1,2']],'größer als 1: wirtschaftlich')),
 S(14,'Die Rentabilität setzt den Gewinn ins Verhältnis zum Kapital. 20 000 € Gewinn auf 250 000 € Eigenkapital sind 8 Prozent.',
  CALC('Eigenkapitalrentabilität','Gewinn 20 000 €, Eigenkapital 250 000 €',[['R = ',{n:'Gewinn',d:'Eigenkapital'},' · 100 %'],['R = ',{n:'20 000 €',d:'250 000 €'},' · 100 % = 8 %']],'Vergleich: Was brächte das Geld auf der Bank?')),
 S(12,'Merke Dir die drei Fragen: Wie viel schaffen wir? Lohnt sich die Arbeit? Lohnt sich das Kapital?',wg1)],
 skz:[[SKZ(wg1,'Produktivität und Rentabilität im Vergleich'),'Produktivität rechnet mit Mengen, Rentabilität mit Gewinn und Kapital. Die Wirtschaftlichkeit liegt dazwischen: Ertrag durch Aufwand.']]};

/* ---------- 1 Unternehmensformen & Organisation ---------- */
const uf1=BARS('Mindestkapital',[['Einzelunt.',0,'kein Mindestkapital','m'],['UG',1,'ab 1 €','y'],['GmbH',25,'25 000 €','b'],['AG',50,'50 000 €','a']],{max:50,lx:120,h:44,y0:60,note:'Mit dem Kapital sinkt die persönliche Haftung.'});
X['Unternehmensformen & Organisation']={
 v:['Eine GmbH ist pleite und hat 80 000 € Schulden. Muss der Geschäftsführer-Gesellschafter mit seinem Privathaus zahlen?',
  ['Ja, immer.','Nein, gehaftet wird mit dem Gesellschaftsvermögen.','Ja, bis 25 000 €.','Nur, wenn es eine OHG wäre, ebenfalls nicht.'],1,
  'Die GmbH haftet nur mit ihrem eigenen Vermögen. Privat haftet er nur in Sonderfällen, zum Beispiel bei einer persönlichen Bürgschaft oder bei verspätetem Insolvenzantrag. Bei einer OHG wäre es anders: Dort haften alle Gesellschafter unbeschränkt.'],
 ein:[
 S(13,'Beim Einzelunternehmen und bei der OHG haften die Inhaber unbeschränkt, also auch mit dem Privatvermögen. Bei der KG gilt das nur für den Komplementär.',
  LIST('Wer haftet wie?',[['Einzelunternehmen: Inhaber','no','unbeschränkt, auch privat'],['OHG: alle Gesellschafter','no','unbeschränkt und gesamtschuldnerisch'],['KG: Komplementär','no','unbeschränkt'],['KG: Kommanditist','ok','nur bis zur Einlage']],{h:48})),
 S(13,'GmbH und AG sind Kapitalgesellschaften. Gehaftet wird mit dem Gesellschaftsvermögen. Dafür gibt es ein Mindestkapital.',uf1),
 S(13,'Die AG hat drei Organe: Der Vorstand führt, der Aufsichtsrat kontrolliert, die Hauptversammlung der Aktionäre entscheidet über Grundsätzliches.',
  FLOW('Organe der AG',[['🗳️','Hauptver-','sammlung','b'],['🔍','Aufsichts-','rat','y'],['🧭','Vorstand','führt','a']],{note:'wählt den Aufsichtsrat, der bestellt den Vorstand'})),
 S(13,'Die Aufbauorganisation zeigt, wer wem unterstellt ist. Im Einliniensystem hat jeder genau einen Vorgesetzten. Ein Stab berät, entscheidet aber nicht.',
  k=>{const B=(x,y,t,c)=>RC(x-56,y,112,38,`color-mix(in srgb,${CC(c)} 14%,var(--card))`,CC(c),10,2)+TX(x,y+25,t,104,'ein3','middle',16);
   let s=TITLE('Stab-Liniensystem')+POP(240,70,ph(k,.05,.2),B(240,54,'Werkleiter','a'));
   s+=OP(ph(k,.22,.4),`<path d="M240 92V120M120 120H360M120 120V140M240 120V140M360 120V140" stroke="var(--ink)" stroke-width="2" fill="none"/>`+B(120,140,'Meister A','b')+B(240,140,'Meister B','b')+B(360,140,'Meister C','b'));
   s+=OP(ph(k,.45,.62),`<path d="M296 73H340" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/>`+B(400,54,'Stab: QM','y'));
   return s+OP(ph(k,.7,.85),TX(240,226,'Linie: Weisung von oben',440,'ein3','middle'))+OP(ph(k,.78,.92),TX(240,254,'Stab: berät, ohne Weisungsrecht',440,'ein2','middle'))}),
 S(12,'Die Leitungsspanne ist die Zahl der direkt unterstellten Mitarbeiter. Ist sie zu groß, bleibt keine Zeit für Führung.',
  BIG('Leitungsspanne',[['Werkleiter → 3 Meister','ein3',20],['Meister → 12 Mitarbeiter','ein3',20],['je größer, desto weniger Zeit je Kopf','ein2',17]],{y0:110})),
 S(12,'Die Ablauforganisation regelt, was wann wo passiert. Fertigungsarten sind Werkstatt-, Fließ- und Gruppenfertigung.',
  CARDS('Fertigungsorganisation',[['🏭','Werkstatt','gleiche Maschinen zusammen','b'],['➡️','Fließ','Maschinen im Takt','g'],['👥','Gruppe','Team mit Verantwortung','a']]))],
 skz:[[SKZ(uf1,'Mindestkapital der Rechtsformen'),'Mindestkapital: Einzelunternehmen keines, UG ab 1 €, GmbH 25 000 €, AG 50 000 €. Bei OHG und Einzelunternehmen haften die Inhaber privat.']]};

/* ---------- 2 Organisationsentwicklung & KVP ---------- */
const kv1=CYC('PDCA-Zyklus',[['Plan','planen','b'],['Do','umsetzen','a'],['Check','prüfen','y'],['Act','festschreiben','g']],{mid:'KVP'});
X['Organisationsentwicklung & KVP']={
 v:['Ein Team hat eine bessere Rüstreihenfolge getestet, und sie spart 10 Minuten. Was ist der nächste Schritt nach PDCA?',
  ['Sofort das nächste Problem angehen','Als Standard festschreiben und schulen','Noch einmal von vorn planen','Die Prämie auszahlen'],1,
  'Nach Plan, Do und Check kommt Act: Was funktioniert, wird zum neuen Standard, zum Beispiel in der Arbeitsanweisung. Erst dann beginnt der nächste Kreis.'],
 ein:[
 S(12,'KVP heißt: kleine Verbesserungen, ständig und von allen. Kaizen ist das japanische Wort dafür.',
  STAIRS('Kleine Schritte statt großer Sprung',[['Schritt 1','5 min'],['Schritt 2','3 %'],['Schritt 3','weniger Fehler'],['Schritt 4','Standard']],{lo:'heute',up:'nach einem Jahr',top:104})),
 S(14,'Der PDCA-Zyklus macht daraus ein Verfahren: planen, im Kleinen ausprobieren, Wirkung prüfen und dann festschreiben.',kv1),
 S(13,'5S schafft Ordnung am Arbeitsplatz: sortieren, systematisch ordnen, säubern, standardisieren und dranbleiben.',
  LIST('5S am Arbeitsplatz',[['Sortieren','1','Unnötiges weg'],['Systematisieren','2','fester Platz für alles'],['Säubern','3','sauber heißt prüfbar'],['Standardisieren','4','Regeln sichtbar machen'],['Selbstdisziplin','5','dranbleiben']],{h:42})),
 S(13,'Lean sucht Verschwendung, auf Japanisch Muda. Sieben Arten sind klassisch, vom Warten bis zum Fehler.',
  CARDS('Sieben Arten der Verschwendung',[['📦','Über-','produktion','r'],['⏳','Wartezeit','','r'],['🚚','Transport','','r'],['🔧','Über-','bearbeitung','r'],['🏬','Bestände','','r'],['🚶','Bewegung','','r'],['❌','Fehler','','r']],{cols:4})),
 S(13,'Six Sigma verringert Schwankungen in Prozessen. Der Ablauf heißt DMAIC: definieren, messen, analysieren, verbessern, steuern.',
  LIST('DMAIC',[['Define: Problem und Ziel festlegen','D'],['Measure: Ist-Zustand messen','M'],['Analyze: Ursachen finden','A'],['Improve: Lösung umsetzen','I'],['Control: Ergebnis absichern','C']],{h:38,note:'Ziel: weniger Streuung, weniger Ausschuss'})),
 S(12,'Im betrieblichen Vorschlagswesen reichen Mitarbeiter Ideen ein. Gute Vorschläge werden bewertet und prämiert.',
  FLOW('Vorschlagswesen',[['💡','Idee','einreichen'],['🔍','Gutachter','bewertet'],['🏆','Prämie','und Umsetzung','g']]))],
 skz:[[SKZ(kv1,'PDCA-Zyklus'),'Der PDCA-Zyklus: planen, umsetzen, prüfen, festschreiben. Danach beginnt der Kreis mit dem nächsten Problem neu.']]};

/* ---------- 3 Entgeltmethoden ---------- */
const en1=VS('Zeitlohn oder Akkord?',{h:'Zeitlohn',c:'b',l:['Geld je Stunde','gleich bei jeder Menge','Qualität vor Tempo']},{h:'Akkordlohn',c:'a',l:['Geld je Stück','mehr Menge, mehr Geld','braucht feste Vorgaben']},{note:'Prämienlohn: Grundlohn plus Prämie für Ziele'});
X['Entgeltmethoden']={
 v:['Im Zeitakkord sind 6 Minuten je Stück vorgegeben. Ein Mitarbeiter schafft in einer Stunde 12 Stück. Wie hoch ist sein Leistungsgrad?',
  ['100 %','110 %','120 %','150 %'],2,
  '12 Stück mal 6 Minuten sind 72 Vorgabeminuten in 60 Minuten. 72 durch 60 ergibt 120 Prozent Leistungsgrad.'],
 ein:[
 S(12,'Im Zeitlohn zählt die Arbeitszeit. Das ist einfach und gut für die Qualität, setzt aber keinen Anreiz für mehr Menge.',en1),
 S(14,'Der Akkordrichtsatz ist der Stundenverdienst bei Normalleistung: Tariflohn plus Akkordzuschlag. Daraus folgt der Minutenfaktor.',
  CALC('Minutenfaktor','Tariflohn 18,00 € je Stunde, Akkordzuschlag 20 %',[['Akkordrichtsatz = 18,00 € · 1,2 = 21,60 €'],['Minutenfaktor = ',{n:'21,60 €',d:'60 min'},' = 0,36 ',{n:'€',d:'min'}]],'Geld je Vorgabeminute')),
 S(14,'Beim Zeitakkord wird jedes Stück mit seiner Vorgabezeit bezahlt. 12 Stück zu 6 Minuten sind 72 Minuten, also 25,92 € in dieser Stunde.',
  CALC('Verdienst im Zeitakkord','12 Stück in einer Stunde, Vorgabe 6 min je Stück',[['Verdienst = Menge · Vorgabezeit · Minutenfaktor'],['Verdienst = 12 · 6 min · 0,36 ',{n:'€',d:'min'},' = 25,92 €']],'Leistungsgrad: 72 min durch 60 min = 120 %')),
 S(12,'Der Prämienlohn zahlt einen Grundlohn und dazu eine Prämie, etwa für Qualität, Ersparnis oder Termintreue.',
  CARDS('Prämienarten',[['✅','Qualität','weniger Ausschuss','g'],['📦','Menge','mehr Ausbringung','b'],['💶','Ersparnis','Material, Energie','y'],['⏱️','Termintreue','pünktlich liefern','a']],{cols:2})),
 S(13,'Die Arbeitsbewertung legt fest, wie schwer eine Tätigkeit ist. Summarisch wird die Stelle als Ganzes eingestuft, analytisch nach einzelnen Anforderungen mit Punkten.',
  VS('Arbeitsbewertung',{h:'summarisch',c:'b',l:['Rangfolge','Lohngruppen','als Ganzes']},{h:'analytisch',c:'g',l:['Können, Verantwortung','Belastung, Umwelt','Punkte je Merkmal']})),
 S(11,'Die Leistungsbeurteilung bewertet dagegen den Menschen auf der Stelle: Menge, Qualität und Verhalten.',
  BIG('Stelle oder Mensch?',[['Arbeitsbewertung: die Stelle','ein3',20],['Leistungsbeurteilung: der Mensch','ein3',20]],{y0:120}))],
 skz:[[SKZ(en1,'Zeitlohn und Akkordlohn'),'Zeitlohn bezahlt die Stunde, Akkordlohn die Menge. Akkord braucht feste Vorgabezeiten und gleichbleibende Abläufe.']]};

/* ---------- 5 Break-even, Deckungsbeitrag & Entscheidungen ---------- */
const be1=k=>{const x0=60,y0=226,W=390,H=176,xm=1000,ym=60000,X=x=>x0+W*x/xm,Y=y=>y0-H*y/ym;
 const kf=15000,kv=20,p=50,xb=kf/(p-kv),a=ph(k,.05,.35),b=ph(k,.35,.65),c=ph(k,.65,.85);
 let s=`<path d="M${x0} ${y0-H-6}V${y0}H${x0+W+6}" stroke="var(--ink)" stroke-width="1.5" fill="none"/>`+T(x0+W,y0+20,'Menge','ein2','end','font-size:14px')+T(x0-6,y0-H-12,'€','ein2','end','font-size:14px');
 s+=OP(a,`<path d="M${X(0)} ${Y(kf)}H${X(xm)}" stroke="var(--mute)" stroke-width="2" stroke-dasharray="6 4"/>`+TX(X(0)+6,Y(kf)+20,'Fixkosten','ein2','start',15));
 s+=OP(a,`<path d="M${X(0)} ${Y(kf)}L${F(X(xm*a))} ${F(Y(kf+kv*xm*a))}" stroke="var(--red)" stroke-width="2.5"/>`)+OP(c,TX(X(150),Y(kf+kv*150)-10,'Kosten','ein2','start',15));
 s+=`<path d="M${X(0)} ${Y(0)}L${F(X(xm*b))} ${F(Y(p*xm*b))}" stroke="var(--ok)" stroke-width="2.5"/>`+OP(c,TX(X(950),Y(p*950)-8,'Erlös','ein2','end',15));
 s+=POP(X(xb),Y(p*xb),c,`<circle cx="${F(X(xb))}" cy="${F(Y(p*xb))}" r="7" fill="var(--acc)"/>`)+OP(c,`<path d="M${F(X(xb))} ${F(Y(p*xb))}V${y0}" stroke="var(--acc)" stroke-dasharray="4 3"/>`+TX(X(xb),y0+20,'500 Stück',100,'ein3','middle',15));
 return s};
X['Break-even, Deckungsbeitrag & Entscheidungen']={
 v:['Ein Kunde bietet 18 € je Stück. Die variablen Kosten liegen bei 15 €, die Vollkosten bei 22 €. Die Maschinen stehen sonst still. Solltest Du annehmen?',
  ['Nein, 18 € deckt die Kosten nicht.','Ja, jedes Stück bringt 3 € Deckungsbeitrag.','Nur ab 22 €.','Egal, der Gewinn bleibt gleich.'],1,
  'Bei freier Kapazität fallen die Fixkosten sowieso an. Jedes Stück bringt 18 € minus 15 € gleich 3 € Deckungsbeitrag und verringert so den Verlust. Langfristig müssen aber alle Kosten gedeckt sein.'],
 ein:[
 S(13,'Der Deckungsbeitrag ist, was ein Stück nach Abzug der variablen Kosten übrig lässt. Damit werden zuerst die Fixkosten gedeckt.',
  CALC('Deckungsbeitrag je Stück','Preis 50 €, variable Stückkosten 20 €',[['db = p − k',{n:'',d:''}].slice(0,1),['db = 50 € − 20 € = 30 €']],'30 € je Stück für die Fixkosten')),
 S(14,'Die Gewinnschwelle ist die Menge, bei der alle Fixkosten gedeckt sind. 15 000 € Fixkosten geteilt durch 30 € Deckungsbeitrag sind 500 Stück.',
  CALC('Break-even-Menge','Fixkosten 15 000 €, db 30 € je Stück',[['x = ',{n:'Fixkosten',d:'db'}],['x = ',{n:'15 000 €',d:'30 € je Stück'},' = 500 Stück']],'ab dem 501. Stück: Gewinn')),
 S(14,'Im Bild schneiden sich Erlös- und Kostengerade genau bei 500 Stück. Links davon entsteht Verlust, rechts Gewinn.',be1),
 S(13,'Die kurzfristige Preisuntergrenze sind die variablen Stückkosten. Langfristig muss der Preis die vollen Selbstkosten decken.',
  VS('Preisuntergrenze',{h:'kurzfristig',c:'y',l:['variable Stückkosten','bei freier Kapazität','Fixkosten laufen ja']},{h:'langfristig',c:'a',l:['Selbstkosten','alle Kosten gedeckt','sonst Substanzverlust']})),
 S(13,'Ist eine Maschine der Engpass, zählt der Deckungsbeitrag je Maschinenminute. Ein Produkt mit kleinerem Stückbeitrag kann dann besser sein.',
  BARS('Deckungsbeitrag je Engpassminute',[['A: 40 € in 8 min',5,'5 € je min','m'],['B: 24 € in 3 min',8,'8 € je min','g']],{max:8,lx:170,h:60,y0:84,note:'B zuerst fertigen, obwohl A mehr je Stück bringt'})),
 S(12,'Der Sicherheitsabstand zeigt, wie weit die Menge sinken darf, bevor Verlust entsteht.',
  CALC('Sicherheitsabstand','geplant 800 Stück, Gewinnschwelle 500 Stück',[['Abstand = 800 Stück − 500 Stück = 300 Stück'],['in Prozent: ',{n:'300 Stück',d:'800 Stück'},' · 100 % = 37,5 %']],''))],
 skz:[[SKZ(be1,'Break-even-Diagramm'),'Erlös- und Kostengerade mit Fixkosten 15 000 €, Preis 50 € und variablen Kosten 20 € je Stück. Der Schnittpunkt ist die Gewinnschwelle.']]};
/* Deckungsbeitrag-Zeile ohne leeren Bruch */
X['Break-even, Deckungsbeitrag & Entscheidungen'].ein[0]=S(13,'Der Deckungsbeitrag ist, was ein Stück nach Abzug der variablen Kosten übrig lässt. Damit werden zuerst die Fixkosten gedeckt.',
 CALC('Deckungsbeitrag je Stück','Preis 50 €, variable Stückkosten 20 €',[['db = Preis − variable Stückkosten'],['db = 50 € − 20 € = 30 €']],'30 € je Stück für die Fixkosten'));

/* ---------- 6 Markt & Volkswirtschaft ---------- */
const mk1=k=>{const x0=70,y0=224,W=360,H=170,a=ph(k,.05,.4),b=ph(k,.3,.65),c=ph(k,.7,.9);
 let s=`<path d="M${x0} ${y0-H-6}V${y0}H${x0+W+6}" stroke="var(--ink)" stroke-width="1.5" fill="none"/>`+T(x0+W,y0+20,'Menge','ein2','end','font-size:14px')+T(x0-8,y0-H+4,'Preis','ein2','end','font-size:14px');
 const L=(x1,y1,x2,y2,p,c)=>`<path d="M${x0+x1} ${y0-y1}L${F(x0+x1+(x2-x1)*p)} ${F(y0-y1-(y2-y1)*p)}" stroke="${c}" stroke-width="3"/>`;
 s+=L(20,160,340,20,a,'var(--flow)')+OP(a,TX(x0+340,y0-28,'Nachfrage','ein3','end',16));
 s+=L(20,20,340,160,b,'var(--ok)')+OP(b,TX(x0+330,y0-172,'Angebot','ein3','end',16));
 s+=POP(x0+180,y0-90,c,`<circle cx="${x0+180}" cy="${y0-90}" r="8" fill="var(--acc)"/>`)+OP(c,`<path d="M${x0} ${y0-90}H${x0+180}V${y0}" stroke="var(--acc)" stroke-dasharray="4 3" fill="none"/>`+TX(x0+6,y0-96,'Gleichgewicht',100,'ein2','start',14));
 return s};
X['Markt & Volkswirtschaft']={
 v:['Ein Hersteller hat als einziger Anbieter ein patentiertes Ersatzteil. Wie heißt diese Marktform?',
  ['Polypol','Oligopol','Angebotsmonopol','Nachfragemonopol'],2,
  'Ein einziger Anbieter heißt Angebotsmonopol. Er kann den Preis weitgehend selbst setzen, solange die Kunden das Teil brauchen.'],
 ein:[
 S(12,'Die Marktform hängt davon ab, wie viele Anbieter es gibt: einer, wenige oder viele.',
  CARDS('Marktformen (Anbieter)',[['1️⃣','Monopol','ein Anbieter','a'],['🔢','Oligopol','wenige Anbieter','y'],['👥','Polypol','viele Anbieter','g']],{note:'Je weniger Anbieter, desto mehr Preismacht.'})),
 S(14,'Im Polypol bildet sich der Preis am Markt. Wo Angebot und Nachfrage gleich groß sind, liegt der Gleichgewichtspreis.',mk1),
 S(13,'Steigt die Nachfrage, steigt der Preis. Steigt das Angebot, sinkt er. So lenkt der Preis knappe Güter dorthin, wo sie gebraucht werden.',
  LIST('Was passiert mit dem Preis?',[['mehr Nachfrage','⬆️','Preis steigt'],['weniger Nachfrage','⬇️','Preis sinkt'],['mehr Angebot','⬇️','Preis sinkt'],['weniger Angebot','⬆️','Preis steigt']],{h:46})),
 S(12,'Das Bruttoinlandsprodukt misst die Wirtschaftsleistung: den Wert aller Waren und Dienstleistungen, die in einem Jahr im Inland entstehen.',
  BIG('BIP',[['alle Waren und Dienstleistungen','ein3',20],['im Inland, in einem Jahr','ein3',20],['Rezession: 2 Quartale BIP sinkt','ein2',17]],{y0:110})),
 S(13,'Inflation heißt: Das Preisniveau steigt, und für einen Euro gibt es weniger. Gemessen wird sie mit dem Verbraucherpreisindex.',
  CALC('Inflationsrate','Preisindex steigt von 120 auf 123',[['Rate = ',{n:'123 − 120',d:'120'},' · 100 % = 2,5 %']],'Die Kaufkraft sinkt um gut 2 %.')),
 S(12,'In der sozialen Marktwirtschaft gilt Wettbewerb, ergänzt um sozialen Ausgleich. Der Staat setzt den Rahmen.',
  VS('Soziale Marktwirtschaft',{h:'Markt',c:'g',l:['Wettbewerb','Privateigentum','Preise am Markt']},{h:'Staat',c:'b',l:['Sozialversicherung','Kartellrecht','Steuern, Zinsen (EZB)']}))],
 skz:[[SKZ(mk1,'Angebot und Nachfrage'),'Nachfrage- und Angebotskurve. Im Schnittpunkt liegt der Gleichgewichtspreis, dort wird die größte Menge umgesetzt.']]};

/* ---------- 7 Beschaffung, Lager & Logistik ---------- */
const bl1=k=>{const x0=50,y0=220,W=400,H=160,Y=v=>y0-H*v/600,X=t=>x0+W*t/40,a=ph(k,.05,.9);
 let s=`<path d="M${x0} ${y0-H-8}V${y0}H${x0+W+6}" stroke="var(--ink)" stroke-width="1.5" fill="none"/>`+T(x0+W,y0+26,'Tage','ein2','end','font-size:14px');
 s+=`<path d="M${x0} ${F(Y(100))}H${x0+W}" stroke="var(--red)" stroke-dasharray="6 4"/>`+TX(x0+6,Y(100)+18,'Mindestbestand 100',200,'ein2','start',14);
 s+=`<path d="M${x0} ${F(Y(260))}H${x0+W}" stroke="var(--amber)" stroke-dasharray="6 4"/>`+TX(x0+6,Y(260)-8,'Meldebestand 260',200,'ein2','start',14);
 let d=`M${X(0)} ${F(Y(500))}`;const seg=[[0,500],[12,260],[20,100],[20,500],[32,260],[40,100]];seg.slice(1).forEach(p=>d+=`L${F(X(p[0]))} ${F(Y(p[1]))}`);
 s+=`<path d="${d}" stroke="var(--acc)" stroke-width="3" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${F(1-a)}"/>`;
 s+=OP(ph(k,.3,.45),`<circle cx="${X(12)}" cy="${F(Y(260))}" r="6" fill="var(--amber)"/>`+TX(X(12)-10,Y(260)+22,'bestellen',100,'ein3','end',15));
 s+=OP(ph(k,.5,.65),`<path d="M${X(12)} ${y0+8}H${X(20)}" stroke="var(--amber)" stroke-width="3"/>`+TX((X(12)+X(20))/2,y0+26,'8 Tage Lieferzeit',150,'ein2','middle',14));
 return s};
X['Beschaffung, Lager & Logistik']={
 v:['Ein Lager verbraucht 20 Teile am Tag. Die Lieferzeit beträgt 8 Tage, der Mindestbestand 100 Teile. Wann musst Du bestellen?',
  ['bei 100 Teilen','bei 160 Teilen','bei 260 Teilen','bei 300 Teilen'],2,
  'Meldebestand = Tagesverbrauch · Lieferzeit + Mindestbestand = 20 · 8 + 100 = 260 Teile. Dann reicht der Bestand genau, bis die Lieferung da ist, und der Puffer bleibt unberührt.'],
 ein:[
 S(13,'Der Beschaffungsprozess beginnt beim Bedarf und endet mit der Zahlung. Dazwischen liegen Angebotsvergleich, Bestellung und Prüfung der Ware.',
  LIST('Beschaffung Schritt für Schritt',[['Bedarf ermitteln','1'],['Angebote einholen und vergleichen','2'],['Bestellen','3'],['Ware annehmen und prüfen','4'],['Rechnung prüfen und zahlen','5']],{h:42})),
 S(13,'Die ABC-Analyse sortiert nach Wert. Wenige A-Teile machen den Großteil des Werts aus. Um die kümmert sich der Einkauf besonders.',
  BARS('ABC-Analyse',[['A-Teile',75,'15 % der Teile, 75 % Wert','a'],['B-Teile',20,'35 % der Teile, 20 % Wert','y'],['C-Teile',5,'50 % der Teile, 5 % Wert','m']],{max:75,lx:90,W:150,h:52,y0:68,note:'A genau planen, C einfach und günstig bestellen'})),
 S(14,'Der Meldebestand sagt, wann bestellt wird: Tagesverbrauch mal Lieferzeit plus Mindestbestand.',
  CALC('Meldebestand','20 Teile je Tag, 8 Tage Lieferzeit, Mindestbestand 100',[['MB = Tagesverbrauch · Lieferzeit + Mindestbestand'],['MB = 20 ',{n:'Teile',d:'Tag'},' · 8 Tage + 100 Teile = 260 Teile']],'')),
 S(14,'Im Bild sinkt der Bestand jeden Tag. Bei 260 Teilen wird bestellt. Nach 8 Tagen Lieferzeit kommt die Ware genau beim Mindestbestand an.',bl1),
 S(14,'Die Umschlagshäufigkeit zeigt, wie oft das Lager im Jahr leer und wieder voll wird. Daraus folgt die Lagerdauer.',
  CALC('Lagerkennzahlen','Jahresverbrauch 4800 Teile, Ø Lagerbestand 400 Teile',[['Umschlag = ',{n:'4800 Teile',d:'400 Teile'},' = 12'],['Lagerdauer = ',{n:'360 Tage',d:'12'},' = 30 Tage']],'je kürzer, desto weniger Kapital gebunden')),
 S(12,'Just-in-Time liefert genau dann, wenn es gebraucht wird. Kanban steuert den Nachschub mit Karten nach dem Holprinzip.',
  VS('Lager oder Just-in-Time?',{h:'Vorratslager',c:'y',l:['sicher lieferfähig','bindet Kapital','braucht Platz']},{h:'Just-in-Time',c:'g',l:['kaum Lager','abhängig vom Lieferanten','Störung stoppt alles']}))],
 skz:[[SKZ(bl1,'Lagerbestand mit Melde- und Mindestbestand'),'Lagerverlauf mit 20 Teilen Verbrauch je Tag und 8 Tagen Lieferzeit. Bestellt wird beim Meldebestand, nicht erst beim Mindestbestand.']]};

/* ---------- 8 Bilanz, Finanzierung & Investition ---------- */
const bi1=k=>{const a=ph(k,.05,.4),b=ph(k,.4,.75),c=ph(k,.8,.95);
 const B=(x,y,w,h,t,v,col)=>RC(x,y,w,h,`color-mix(in srgb,${CC(col)} 16%,var(--card))`,CC(col),8,2)+TX(x+w/2,y+h/2-2,t,w-12,'ein3','middle',16)+TX(x+w/2,y+h/2+18,v,w-12,'ein2','middle',14);
 let s=TITLE('Bilanz: Aktiva = Passiva')+OP(a,T(130,70,'Aktiva','ein1','middle','font-size:18px')+T(130,88,'Wofür ist das Geld?','ein2','middle','font-size:13px')+B(40,98,180,90,'Anlagevermögen','Maschinen, Gebäude','b')+B(40,192,180,60,'Umlaufvermögen','Vorräte, Bank','b'));
 s+=OP(b,T(350,70,'Passiva','ein1','middle','font-size:18px')+T(350,88,'Woher kommt es?','ein2','middle','font-size:13px')+B(260,98,180,70,'Eigenkapital','Inhaber','g')+B(260,172,180,80,'Fremdkapital','Kredite, Lieferanten','r'));
 return s+OP(c,T(240,178,'=','ein1','middle','font-size:28px'))};
X['Bilanz, Finanzierung & Investition']={
 v:['Eine Maschine kostet 60 000 €. Sie bringt jedes Jahr 9000 € Gewinn und wird mit 6000 € im Jahr abgeschrieben. Nach wie vielen Jahren ist sie bezahlt?',
  ['nach 4 Jahren','nach 6,7 Jahren','nach 10 Jahren','nach 15 Jahren'],0,
  'Der Rückfluss ist Gewinn plus Abschreibung, also 15 000 € im Jahr. 60 000 € geteilt durch 15 000 € ergibt 4 Jahre Amortisationsdauer.'],
 ein:[
 S(14,'Die Bilanz hat zwei Seiten. Aktiva zeigen, wofür das Geld steckt. Passiva zeigen, woher es kommt. Beide Summen sind immer gleich.',bi1),
 S(13,'Die Eigenkapitalquote zeigt, wie viel vom Kapital dem Unternehmen selbst gehört. Je höher, desto unabhängiger von Banken.',
  CALC('Eigenkapitalquote','Eigenkapital 300 000 €, Gesamtkapital 1 000 000 €',[['EK-Quote = ',{n:'Eigenkapital',d:'Gesamtkapital'},' · 100 %'],['EK-Quote = ',{n:'300 000 €',d:'1 000 000 €'},' · 100 % = 30 %']],'')),
 S(13,'Die Liquidität fragt: Können wir die kurzfristigen Schulden bezahlen? Beim 2. Grad zählen flüssige Mittel und Forderungen.',
  CALC('Liquidität 2. Grades','Bank 40 000 €, Forderungen 80 000 €, Schulden 100 000 €',[['L2 = ',{n:'40 000 € + 80 000 €',d:'100 000 €'},' · 100 % = 120 %']],'über 100 %: kurzfristig zahlungsfähig')),
 S(12,'Finanziert wird von innen, etwa aus Gewinn und Abschreibungen, oder von außen mit Kredit, Einlagen oder Leasing.',
  VS('Finanzierung',{h:'Innenfinanzierung',c:'g',l:['einbehaltener Gewinn','Abschreibungen','Rückstellungen']},{h:'Außenfinanzierung',c:'b',l:['Bankkredit','Einlagen','Leasing']})),
 S(13,'Die Abschreibung verteilt den Kaufpreis auf die Nutzungsdauer. Linear heißt: jedes Jahr der gleiche Betrag.',
  CALC('Lineare Abschreibung','Maschine 60 000 €, Nutzungsdauer 10 Jahre',[['AfA = ',{n:'60 000 €',d:'10 Jahre'},' = 6000 ',{n:'€',d:'Jahr'}]],'Aufwand, aber kein Geldabfluss')),
 S(14,'Die Amortisationsdauer zeigt, wann eine Investition ihr Geld zurückgebracht hat. Rückfluss ist Gewinn plus Abschreibung.',
  CALC('Amortisationsdauer','60 000 €, Gewinn 9000 € und AfA 6000 € je Jahr',[['t = ',{n:'Anschaffung',d:'Gewinn + AfA'}],['t = ',{n:'60 000 €',d:'15 000 € je Jahr'},' = 4 Jahre']],'je kürzer, desto kleiner das Risiko'))],
 skz:[[SKZ(bi1,'Aufbau der Bilanz'),'Aufbau der Bilanz: links Anlage- und Umlaufvermögen, rechts Eigen- und Fremdkapital. Beide Seiten haben dieselbe Summe.']]};

/* ---------- 9 Teilkosten, Kostenstellen & BAB ---------- */
const bab1=k=>{const C=['Material','Fertigung','Verwaltung','Vertrieb'],V=[[2000,6000,1500,500],[800,4200,600,400]],x0=118,cw=88,y0=64,rh=36;
 let s=TITLE('Betriebsabrechnungsbogen (Auszug)');
 s+=C.map((c,i)=>RC(x0+i*cw,y0,cw-4,30,'color-mix(in srgb,var(--acc) 16%,var(--card))','var(--acc)',6,1.5)+TX(x0+i*cw+(cw-4)/2,y0+20,c,cw-10,'ein3','middle',14)).join('');
 [['Hilfslöhne',0],['Energie',1]].forEach((r,j)=>{const y=y0+40+j*rh,p=ph(k,.1+j*.18,.28+j*.18);s+=TX(14,y+20,r[0],100,'ein3','start',15);
  V[j].forEach((v,i)=>{s+=OP(p,RC(x0+i*cw,y,cw-4,30,'var(--card)','var(--line)',6,1.2)+TX(x0+i*cw+cw-12,y+20,v+' €',cw-12,'ein2','end',14))})});
 const sum=[2800,10200,2100,900],y=y0+40+2*rh+6,p=ph(k,.5,.65);s+=OP(p,`<path d="M14 ${y-3}H${x0+4*cw-4}" stroke="var(--ink)" stroke-width="1.5"/>`+TX(14,y+20,'Summe',100,'ein3','start',15)+sum.map((v,i)=>TX(x0+i*cw+cw-12,y+20,v+' €',cw-12,'ein3','end',14)).join(''));
 const q=ph(k,.7,.85);s+=OP(q,TX(14,y+62,'Zuschlag',100,'ein3','start',15)+['auf FM','auf FL','auf HK','auf HK'].map((t,i)=>TX(x0+i*cw+(cw-4)/2,y+62,t,cw-8,'ein2','middle',14)).join(''));
 return s};
X['Teilkosten, Kostenstellen & BAB']={
 v:['Die Fertigung hat 10200 € Gemeinkosten. Die Fertigungslöhne betragen 6800 €. Wie hoch ist der Fertigungsgemeinkosten-Zuschlag?',
  ['66,7 %','100 %','150 %','166,7 %'],2,
  'Zuschlagssatz = Gemeinkosten durch Zuschlagsgrundlage mal 100 %, also 10200 € durch 6800 € mal 100 % = 150 %. Grundlage der Fertigung sind die Fertigungslöhne.'],
 ein:[
 S(12,'Die Kostenrechnung fragt dreimal: Welche Kosten sind entstanden, wo sind sie entstanden und wofür?',
  FLOW('Drei Stufen der Kostenrechnung',[['🏷️','Kostenarten','Welche?'],['🏭','Kostenstellen','Wo?'],['📦','Kostenträger','Wofür?','g']])),
 S(14,'Im Betriebsabrechnungsbogen werden die Gemeinkosten nach Schlüsseln auf die Kostenstellen verteilt. Unten stehen die Summen je Stelle.',bab1),
 S(14,'Aus der Summe einer Stelle und ihrer Zuschlagsgrundlage entsteht der Zuschlagssatz. In der Fertigung sind das die Fertigungslöhne.',
  CALC('Zuschlagssatz Fertigung','Gemeinkosten Fertigung 10200 €, Fertigungslöhne 6800 €',[['FGK-Zuschlag = ',{n:'Gemeinkosten',d:'Fertigungslöhne'},' · 100 %'],['FGK-Zuschlag = ',{n:'10200 €',d:'6800 €'},' · 100 % = 150 %']],'')),
 S(13,'Die Vollkostenrechnung verteilt alle Kosten auf die Produkte. Die Teilkostenrechnung rechnet nur mit variablen Kosten und fragt nach dem Deckungsbeitrag.',
  VS('Vollkosten oder Teilkosten?',{h:'Vollkosten',c:'b',l:['alle Kosten je Stück','für Angebotspreise','langfristig']},{h:'Teilkosten',c:'g',l:['nur variable Kosten','für Entscheidungen','kurzfristig']})),
 S(14,'Eigenfertigung oder Fremdbezug? Die kritische Menge ist erreicht, wenn beide gleich viel kosten. Darüber lohnt sich die eigene Fertigung.',
  CALC('Kritische Menge Make or Buy','Fixkosten 6000 €, variabel 8 €, Zukauf 11 € je Stück',[['x = ',{n:'Fixkosten',d:'Zukaufpreis − var. Kosten'}],['x = ',{n:'6000 €',d:'11 € − 8 €'},' = 2000 Stück']],'über 2000 Stück: selbst fertigen')),
 S(12,'Typische Fehler: Grundlagen verwechseln, Fixkosten wie variable Kosten behandeln oder beim Engpass nur auf den Stückbeitrag schauen.',
  LIST('Typische Fehler',[['Verwaltung auf Fertigungslöhne','no','richtig: auf Herstellkosten'],['Fixkosten je Stück als fest','no','sie sinken mit der Menge'],['Engpass: höchster Stückbeitrag','no','richtig: Beitrag je Engpassminute']],{h:56}))],
 skz:[[SKZ(bab1,'Auszug aus einem BAB'),'Auszug aus einem BAB mit zwei Gemeinkostenarten. Die Summen je Kostenstelle werden auf die jeweilige Zuschlagsgrundlage bezogen.']]};

/* ---------- 10 Konjunktur & Wirtschaftspolitik ---------- */
const kj1=k=>{const x0=40,y0=196,W=410,a=ph(k,.05,.85);let d='';for(let i=0;i<=100;i++){const t=i/100,x=x0+W*t,y=y0-30-t*40-48*Math.sin(t*2*Math.PI*1.05+.2);d+=(i?'L':'M')+F(x)+' '+F(y)}
 let s=`<path d="M${x0} ${y0+10}H${x0+W}" stroke="var(--ink)" stroke-width="1.5"/>`+T(x0+W,y0-2,'Zeit','ein2','end','font-size:14px');
 s+=`<path d="M${x0} ${y0-30}L${x0+W} ${y0-70}" stroke="var(--mute)" stroke-dasharray="6 4"/>`+OP(ph(k,.6,.75),TX(x0+W*.35,y0-26,'Trend',80,'ein2','middle',14));
 s+=`<path d="${d}" stroke="var(--acc)" stroke-width="3" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${F(1-a)}"/>`;
 [[.12,'Aufschwung'],[.32,'Boom'],[.56,'Abschwung'],[.8,'Rezession']].forEach((m,i)=>{const x=x0+W*m[0];s+=OP(ph(k,.15+i*.15,.3+i*.15),`<path d="M${F(x)} ${y0+4}v12" stroke="var(--ink)"/>`+TX(x,y0+34,m[1],96,'ein3','middle',15))});
 return TITLE('Konjunkturzyklus')+s};
X['Konjunktur & Wirtschaftspolitik']={
 v:['Die Europäische Zentralbank erhöht den Leitzins. Was ist die wahrscheinliche Folge für Deinen Betrieb?',
  ['Kredite werden billiger, mehr Investitionen.','Kredite werden teurer, Investitionen werden eher verschoben.','Die Löhne steigen sofort.','Nichts, das betrifft nur Banken.'],1,
  'Ein höherer Leitzins verteuert Kredite. Investitionen auf Pump werden unattraktiver, die Nachfrage kühlt ab und die Inflation soll sinken.'],
 ein:[
 S(14,'Die Wirtschaft wächst nicht gleichmäßig. Auf Aufschwung und Boom folgen Abschwung und Rezession, um einen langfristigen Trend herum.',kj1),
 S(13,'Frühindikatoren wie Auftragseingang und Geschäftsklima zeigen die Wende vorher. Die Arbeitslosenquote reagiert erst später.',
  VS('Indikatoren',{h:'Frühindikatoren',c:'g',l:['Auftragseingang','ifo-Geschäftsklima','Baugenehmigungen']},{h:'Spätindikatoren',c:'y',l:['Arbeitslosenquote','Preise','Steuereinnahmen']})),
 S(13,'Im Betrieb merkst Du die Phasen direkt: im Boom Überstunden und Fachkräftemangel, in der Rezession Kurzarbeit und Investitionsstopp.',
  VS('Im Betrieb',{h:'Boom',c:'a',l:['volle Auftragsbücher','Überstunden','Preise steigen']},{h:'Rezession',c:'b',l:['weniger Aufträge','Kurzarbeit','Investitionen warten']})),
 S(13,'Das Stabilitätsgesetz nennt vier Ziele, das magische Viereck. Magisch, weil man nie alle gleichzeitig erreicht.',
  CARDS('Magisches Viereck',[['💶','stabile Preise','','a'],['👷','hohe Beschäftigung','','a'],['🌍','Außenhandel im','Gleichgewicht','a'],['📈','stetiges','Wachstum','a']],{cols:2})),
 S(13,'Der Staat steuert mit Steuern und Ausgaben, die Zentralbank mit dem Leitzins. Höhere Zinsen bremsen, niedrigere beleben.',
  VS('Wirtschaftspolitik',{h:'Fiskalpolitik',c:'b',l:['Staat','Steuern senken','Konjunkturprogramme']},{h:'Geldpolitik',c:'g',l:['Zentralbank (EZB)','Leitzins','Inflation bremsen']})),
 S(12,'Bei vorübergehendem Arbeitsausfall hilft das Kurzarbeitergeld der Agentur für Arbeit. Der Betriebsrat bestimmt mit.',
  FLOW('Kurzarbeit',[['📉','Aufträge','brechen ein'],['🤝','Betriebsrat','stimmt zu'],['📨','Anzeige','bei der Agentur'],['💶','Geld von','der Agentur','g']],{h:120,note:'Kurzarbeitergeld ersetzt einen Teil des Lohnausfalls.'}))],
 skz:[[SKZ(kj1,'Konjunkturzyklus'),'Der Konjunkturzyklus mit Aufschwung, Boom, Abschwung und Rezession um einen steigenden Wachstumstrend.']]};

/* ---------- 11 Change Management & Prozessoptimierung ---------- */
const cm1=k=>{const x0=40,y0=210,W=400,a=ph(k,.05,.9);let d='';const f=t=>t<.2?0:t<.45?-60*Math.sin((t-.2)/.25*Math.PI/2):t<.75?-60+100*((t-.45)/.3):40+20*((t-.75)/.25);
 for(let i=0;i<=80;i++){const t=i/80;d+=(i?'L':'M')+F(x0+W*t)+' '+F(y0-80-f(t))}
 let s=TITLE('Leistung im Veränderungsprozess')+`<path d="M${x0} ${y0-80}H${x0+W}" stroke="var(--mute)" stroke-dasharray="6 4"/>`+`<path d="${d}" stroke="var(--acc)" stroke-width="3" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${F(1-a)}"/>`;
 [[.1,'Ankündigung',0,-12,'middle'],[.45,'Tal: Unsicherheit',0,30,'middle'],[.6,'Ausprobieren',14,10,'start'],[.9,'neues Niveau',0,-14,'middle']].forEach((m,i)=>{const x=x0+W*m[0],y=y0-80-f(m[0]);s+=OP(ph(k,.15+i*.2,.3+i*.2),TX(x+m[2],y+m[3],m[1],150,'ein3',m[4],15))});
 return s};
X['Change Management & Prozessoptimierung']={
 v:['In Deiner Abteilung soll ein neues Schichtmodell kommen. Wann informierst Du das Team am besten?',
  ['erst wenn alles feststeht','früh, mit den Gründen, und mit Mitsprache, wo es geht','gar nicht, das macht die Personalabteilung','nur die Schichtführer'],1,
  'Frühe, ehrliche Information mit den Gründen und echter Beteiligung baut Widerstand ab. Der Betriebsrat ist bei Arbeitszeitfragen ohnehin zu beteiligen.'],
 ein:[
 S(13,'Veränderung nach Lewin hat drei Phasen: Erst wird das Alte aufgetaut, dann wird verändert, dann wird das Neue gefestigt.',
  FLOW('Lewin: drei Phasen',[['🧊','Auftauen','Warum ändern?'],['🔄','Verändern','neu machen'],['❄️','Einfrieren','Standard','g']])),
 S(13,'Nach einer Ankündigung sinkt die Leistung oft erst einmal. Wer das Tal kennt, hält durch und begleitet sein Team hindurch.',cm1),
 S(13,'Widerstand hat Gründe: Angst um den Arbeitsplatz, Kontrollverlust, Unklarheit. Gegenmittel sind Information, Beteiligung und Qualifizierung.',
  VS('Widerstand',{h:'Ursachen',c:'r',l:['Angst','Unklarheit','Mehrarbeit'],m:'no'},{h:'Gegenmittel',c:'g',l:['früh informieren','beteiligen','schulen, Erfolge zeigen'],m:'ok'})),
 S(13,'Bei Betriebsänderungen ist der Betriebsrat zu beteiligen. Dazu gehören Interessenausgleich und Sozialplan nach dem Betriebsverfassungsgesetz.',
  LIST('Beteiligung des Betriebsrats',[['Unterrichtung bei neuen Abläufen','📋','§§ 90, 91 BetrVG'],['Betriebsänderung','⚖️','§§ 111 ff. BetrVG'],['Interessenausgleich und Sozialplan','🤝','bei Nachteilen für die Belegschaft']],{h:56})),
 S(13,'Prozessoptimierung geht in Schritten: Ist aufnehmen, Schwachstellen finden, Soll entwerfen, umsetzen und messen.',
  LIST('Prozess verbessern',[['Ist-Prozess aufnehmen','1','Flussdiagramm, Wertstrom'],['Schwachstellen suchen','2','Warten, Suchen, Doppelarbeit'],['Soll entwerfen','3'],['Umsetzen','4'],['Messen und absichern','5']],{h:42})),
 S(12,'Schnittstellen sind Übergaben zwischen Abteilungen. Klar geregelt heißt: wer liefert was bis wann in welcher Form.',
  BIG('Schnittstelle klären',[['Wer liefert …','ein3',20],['… was, bis wann, in welcher Form?','ein3',20],['sonst: Warten, Suchen, Fehler','ein2',17]],{y0:110}))],
 skz:[[SKZ(cm1,'Leistungskurve bei Veränderung'),'So verläuft die Leistung oft bei einer Veränderung: Nach der Ankündigung kommt ein Tal, danach ein höheres Niveau, wenn die Begleitung stimmt.']]};

if(typeof tab!=='undefined'&&FACH.includes(tab))go(tab)})();
