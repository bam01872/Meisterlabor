/* ===== Version 5, Paket 2: Rechtsbewusstes Handeln, übrige 12 Module mit Vermutung, Erklärvideo und Skizze ===== */
(()=>{const {F,ph,T,RC,OP,POP,ARp,OK,NO,FORM,TX,TITLE,STG,CC,LIST,CARDS,BARS,FLOW,VS,STAIRS,TL,CYC,SKZ,DOC}=ML5.H,X=ML5.X;
const S=(d,t,f)=>({d,t,f});

/* ---------- 1 Arbeitszeit, Urlaub & Schutzrechte ---------- */
const az1=TL('Ein Arbeitstag nach dem ArbZG',{y:150,ticks:[[0,'6 Uhr'],[4/24,'10 Uhr'],[8.5/24,'14:30 Uhr'],[1,'6 Uhr']],
 spans:[[0,4/24,'4 h','a'],[4.5/24,8.5/24,'4 h','a'],[8.5/24,1,'Ruhezeit: mehr als 11 h','g']],marks:[[4.25/24,'Pause 30 min','y']],note:'Frühschicht: 8 h Arbeit, 30 min Pause, danach mindestens 11 h frei'});
X['Arbeitszeit, Urlaub & Schutzrechte']={
 v:['Max hat Spätschicht bis 22 Uhr. Darf er am nächsten Morgen um 6 Uhr wieder zur Frühschicht kommen?',
  ['Ja, 8 Stunden Pause reichen.','Nein, er braucht 11 Stunden Ruhezeit.','Ja, wenn er selbst zustimmt.','Ja, mit Nachtzuschlag.'],1,
  'Nach dem Ende der Arbeit braucht er mindestens 11 Stunden ununterbrochene Ruhezeit (ArbZG). Ab 22 Uhr gerechnet darf er frühestens um 9 Uhr wieder anfangen.'],
 ein:[
 S(12,'Am Werktag gelten 8 Stunden. Bis zu 10 Stunden sind erlaubt, wenn der Durchschnitt über 6 Monate oder 24 Wochen bei 8 Stunden bleibt.',
  BARS('Höchstarbeitszeit (ArbZG)',[['Regel',8,'8 h am Werktag','a'],['höchstens',10,'10 h mit Ausgleich','y']],{max:10,h:56,y0:70,W:200,lx:120,note:'Ausgleich: im Schnitt 8 h in 6 Monaten oder 24 Wochen'})),
 S(12,'Bei mehr als 6 Stunden Arbeit stehen 30 Minuten Pause zu, bei mehr als 9 Stunden 45 Minuten. Aufteilen geht in Blöcken von mindestens 15 Minuten.',
  CARDS('Ruhepausen',[['☕','über 6 bis 9 h','30 min Pause','a'],['☕','über 9 h','45 min Pause','a'],['⏱️','aufteilen','Blöcke ab 15 min','y']],{note:'Bis 6 h Arbeit ist keine Pause vorgeschrieben.'})),
 S(13,'Nach dem Arbeitsende braucht jeder mindestens 11 Stunden Ruhezeit am Stück. Wer um 22 Uhr geht, darf frühestens um 9 Uhr wieder anfangen.',
  TL('11 Stunden Ruhezeit',{y:160,ticks:[[0,'18 Uhr'],[4/18,'22 Uhr'],[12/18,'6 Uhr'],[15/18,'9 Uhr']],spans:[[0,4/18,'Spätschicht','b'],[4/18,15/18,'11 h Ruhezeit','g']],
   marks:[[12/18,'','r'],[15/18,'','g']],note:'6 Uhr ist zu früh, frühestens 9 Uhr'})),
 S(13,'Gesetzlich stehen 24 Werktage Urlaub zu, gerechnet mit der 6-Tage-Woche. Bei der 5-Tage-Woche sind das 20 Arbeitstage.',
  k=>TITLE('Mindesturlaub (BUrlG)')+OP(ph(k,.05,.2),TX(240,78,'24 Werktage gelten für 6 Arbeitstage pro Woche',450,'ein2','middle'))+
   OP(ph(k,.25,.45),FORM(240,138,['Urlaub = ',{n:'24 Tage',d:'6 Tage'},' · Arbeitstage pro Woche'],'middle'))+
   OP(ph(k,.5,.7),FORM(240,206,['Urlaub = ',{n:'24 Tage',d:'6 Tage'},' · 5 Tage = 20 Tage'],'middle'))+OP(ph(k,.8,.92),TX(240,258,'bei der 5-Tage-Woche: 20 Arbeitstage',450,'ein3','middle'))),
 S(14,'Den vollen Urlaub gibt es nach 6 Monaten Wartezeit. Wer nach dem 1. Juli anfängt, bekommt ein Zwölftel je vollem Monat. Ab halbem Tag wird aufgerundet.',
  k=>TITLE('Teilurlaub im Eintrittsjahr')+OP(ph(k,.05,.2),TX(240,76,'Eintritt am 1. September, 5-Tage-Woche (20 Tage)',450,'ein2','middle'))+
   OP(ph(k,.2,.35),TX(240,108,'Sep · Okt · Nov · Dez = 4 volle Monate',450,'ein3','middle'))+
   OP(ph(k,.4,.6),FORM(240,168,['Teilurlaub = ',{n:'4',d:'12'},' · 20 Tage = 6,67 Tage'],'middle'))+
   OP(ph(k,.65,.8),TX(240,224,'ab einem halben Tag aufrunden: 7 Tage',450,'ein3','middle'))+OP(ph(k,.85,.95),TX(240,256,'Wer am 1. Juli anfängt, hat am 31.12. den vollen Anspruch.',450,'ein2','middle',15))),
 S(13,'Weitere Schutzrechte: 6 Wochen Lohn bei Krankheit, Mutterschutz 6 Wochen vor und 8 nach der Geburt, Elternzeit bis 3 Jahre, dazu der Mindestlohn.',
  CARDS('Weitere Schutzrechte',[['🤒','Krankheit','6 Wochen 100 % Lohn','a'],['🤰','Mutterschutz','6 Wochen vor, 8 nach','a'],['👶','Elternzeit','bis 3 Jahre je Kind','a'],['💶','Mindestlohn','13,90 € je Stunde (2026)','a']],{cols:2,note:'Mindestlohn ab 1.1.2027: 14,60 € je Stunde'}))],
 skz:[[SKZ(az1,'Arbeitstag mit Pause und Ruhezeit'),'Eine Frühschicht von 6 bis 14:30 Uhr: 8 Stunden Arbeit und 30 Minuten Pause. Bis zum nächsten Morgen bleiben mehr als 11 Stunden Ruhezeit.']]};

/* ---------- 2 Betriebsverfassung & Tarifrecht ---------- */
const bv1=k=>{const B=(x,y,w,t1,t2,c)=>RC(x,y,w,56,`color-mix(in srgb,${CC(c)} 14%,var(--card))`,CC(c),12,2)+TX(x+w/2,y+(t2?24:34),t1,w-12,'ein3','middle')+(t2?TX(x+w/2,y+45,t2,w-12,'ein2','middle',14):'');
 const L=(y,t)=>`<path d="M140 ${y+28}H180M300 ${y+28}H340" stroke="var(--ink)" stroke-width="2"/>`+DOC(200,y-6,80,64,{n:3,sig:1})+TX(240,y+78,t,200,'ein3','middle',16);
 return B(14,24,126,'Gewerkschaft','','b')+L(24,'Tarifvertrag')+B(340,24,126,'Arbeitgeber-','verband','b')+
  B(14,136,126,'Betriebsrat','','a')+L(136,'Betriebsvereinbarung')+B(340,136,126,'Arbeitgeber','','a')+
  ARp(77,250,77,198,1,'var(--ink)',2)+TX(92,246,'wählt',200,'ein2','start',15)+TX(14,264,'Belegschaft (ab 5 AN)',200,'ein3','start',16)+TX(466,262,'gilt für alle im Betrieb',200,'ein2','end',15)};
X['Betriebsverfassung & Tarifrecht']={
 v:['Der Chef will in der Halle Kameras aufhängen, die auch die Arbeit der Mitarbeiter zeigen. Was gilt, wenn es einen Betriebsrat gibt?',
  ['Das entscheidet der Chef allein.','Der Betriebsrat muss zustimmen (Mitbestimmung).','Der Betriebsrat wird nur informiert.','Nur die Gewerkschaft darf mitreden.'],1,
  'Überwachung gehört zu den sozialen Angelegenheiten nach § 87 BetrVG. Technik, die Verhalten oder Leistung überwachen kann, darf der Chef nur mit Zustimmung des Betriebsrats einführen.'],
 ein:[
 S(12,'Einen Betriebsrat wählen Betriebe mit in der Regel mindestens 5 wahlberechtigten Arbeitnehmern, davon 3 wählbar. Die Amtszeit dauert 4 Jahre.',
  CARDS('Der Betriebsrat',[['👥','ab 5 Arbeitnehmern','wahlberechtigt, 3 wählbar','a'],['🗳️','Amtszeit','4 Jahre','a'],['📣','Betriebs- versammlung','mindestens 1-mal im Quartal','a']])),
 S(12,'Die Größe hängt von der Zahl der Arbeitnehmer ab: 5 bis 20 wählen 1 Mitglied, 21 bis 50 wählen 3, 51 bis 100 wählen 5 und 101 bis 200 wählen 7.',
  BARS('Größe des Betriebsrats (§ 9 BetrVG)',[['5 bis 20 AN',1,'1 Mitglied'],['21 bis 50 AN',3,'3 Mitglieder'],['51 bis 100 AN',5,'5 Mitglieder'],['101 bis 200 AN',7,'7 Mitglieder']],{max:7,W:170,h:46})),
 S(13,'Vor jeder Kündigung wird der Betriebsrat angehört, bei Einstellungen muss er zustimmen, bei sozialen Fragen bestimmt er mit.',
  STAIRS('Wie stark redet der Betriebsrat mit?',[['Anhörung','§ 102 Kündigung'],['Zustimmung','§ 99 Einstellung'],['Mitbestimmung','§ 87 Soziales']],{hi:2,top:96,lo:'schwächer',up:'stärker'})),
 S(13,'Mitbestimmung: ohne Betriebsrat keine Regelung, etwa zu Arbeitszeit oder Kameras. Bei Einstellung und Versetzung (ab mehr als 20 AN) muss er zustimmen.',
  VS('Beispiele',{h:'§ 87 Soziales',c:'a',l:['Arbeitszeit, Pausen','Überwachung, Kameras','soziale Fragen']},{h:'§ 99 Personelles',c:'b',l:['Einstellung','Versetzung','Ein- und Umgruppierung','ab mehr als 20 AN']},{note:'§ 102: Vor jeder Kündigung anhören'})),
 S(13,'Den Tarifvertrag schließen Gewerkschaft und Arbeitgeber(verband), die Betriebsvereinbarung Arbeitgeber und Betriebsrat. Beim Tarif gilt Friedenspflicht.',
  VS('Zwei Arten von Vereinbarungen',{h:'Tarifvertrag',c:'b',l:['Gewerkschaft und','Arbeitgeber(verband)','Tarifautonomie, Art. 9 GG','Friedenspflicht']},{h:'Betriebsvereinbarung',c:'a',l:['Arbeitgeber und','Betriebsrat','gilt unmittelbar und zwingend','für alle im Betrieb']})),
 S(12,'Günstigkeitsprinzip: Vom Tarifvertrag darf man nur zugunsten des Arbeitnehmers abweichen. Mehr Urlaub als im Tarif ist erlaubt, weniger nicht.',
  BARS('Günstigkeitsprinzip',[['Tarifvertrag',30,'30 Tage Urlaub','b'],['Vertrag A',32,'32 Tage: erlaubt','g'],['Vertrag B',28,'28 Tage: gilt nicht','r']],{max:32,W:170,h:52,y0:62,note:'Abweichen nur zugunsten des Arbeitnehmers'}))],
 skz:[[()=>'<svg class="mlsk" viewBox="0 0 480 270" role="img" aria-label="Wer schließt welchen Vertrag">'+bv1(1)+'</svg>','Oben: Den Tarifvertrag schließen Gewerkschaft und Arbeitgeberverband. Unten: Die Betriebsvereinbarung schließen Betriebsrat und Arbeitgeber.']]};

/* ---------- 3 Sozialversicherung & Entgelt ---------- */
const sv1=k=>{const R=[['Rente','9,3 %','9,3 %'],['Kranken','8,75 %','8,75 %'],['Pflege','1,8 %','1,8 %'],['Arbeitslosen','1,3 %','1,3 %'],['Unfall','alles','']],lx=126,W=330;
 let s=RC(lx,14,14,14,'var(--acc)','none',3,0)+TX(lx+20,27,'Arbeitgeber',200,'ein2','start',15)+RC(lx+130,14,14,14,'var(--flow)','none',3,0)+TX(lx+150,27,'Arbeitnehmer',200,'ein2','start',15);
 R.forEach((r,i)=>{const y=44+i*42,p=STG(k,5,i,.05,.8),a=r[2]?W/2:W;
  s+=TX(lx-8,y+23,r[0],lx-12,'ein2','end',16)+RC(lx,y+4,a*p,28,'var(--acc)','none',5,0)+(r[2]?RC(lx+W/2+2,y+4,(W/2-2)*p,28,'var(--flow)','none',5,0):'')+
   OP(p,TX(lx+a/2,y+24,r[2]?r[1]:'Arbeitgeber zahlt allein (BG)',a-12,'einw','middle',15)+(r[2]?TX(lx+W*.75,y+24,r[2],W/2-8,'einw','middle',15):''))});
 return s+OP(ph(k,.85,.95),TX(240,262,'Arbeitnehmeranteil zusammen: 21,15 % (mit Kind, ohne Sachsen)',450,'ein2','middle',15))};
X['Sozialversicherung & Entgelt']={
 v:['Welche Sozialversicherung zahlt der Arbeitgeber ganz allein?',['Krankenversicherung','Rentenversicherung','Unfallversicherung','Arbeitslosenversicherung'],2,
  'Die gesetzliche Unfallversicherung (Berufsgenossenschaft) zahlt allein der Arbeitgeber. Die anderen vier Zweige teilen sich Arbeitgeber und Arbeitnehmer im Grundsatz je zur Hälfte.'],
 ein:[
 S(11,'Die Sozialversicherung hat fünf Zweige: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung.',
  CARDS('Fünf Zweige der Sozialversicherung',[['🏥','Kranken-','versicherung','a'],['🛏️','Pflege-','versicherung','a'],['🧓','Renten-','versicherung','a'],['📉','Arbeitslosen-','versicherung','a'],['🦺','Unfall-','versicherung','y']],{cols:3})),
 S(13,'Beitragssätze 2026: Rente 18,6 %, Kranken 14,6 % plus Zusatzbeitrag, Pflege 3,6 %, Arbeitslosen 2,6 %. Meist zahlt jede Seite die Hälfte.',
  BARS('Beitragssätze 2026',[['Rente',18.6,'18,6 %'],['Kranken',17.5,'14,6 % + 2,9 %'],['Pflege',3.6,'3,6 %'],['Arbeitslosen',2.6,'2,6 %']],{max:18.6,W:150,lx:130,h:44,note:'Kranken: 2,9 % ist der durchschnittliche Zusatzbeitrag'})),
 S(14,'Der Arbeitnehmer zahlt 9,3 + 8,75 + 1,8 + 1,3 = 21,15 % vom Brutto. Bei 3000 € Brutto sind das 634,50 €. Kinderlose ab 23 zahlen 0,6 % mehr.',
  k=>{const P=[['Rente','9,3 %'],['Kranken','8,75 %'],['Pflege','1,8 %'],['Arbeitsl.','1,3 %']];let s=TITLE('Arbeitnehmeranteil (mit Kind)');
   P.forEach((c,i)=>{const x=14+i*94,p=STG(k,4,i,.05,.45);s+=OP(p,RC(x,58,80,64,'var(--card)','var(--flow)',10,2)+TX(x+40,84,c[0],72,'ein2','middle',15)+TX(x+40,108,c[1],72,'ein3','middle'))+(i<3?OP(p,T(x+87,96,'+','ein1','middle')):'')});
   s+=OP(ph(k,.45,.55),T(392,98,'=','ein1','middle')+RC(404,58,62,64,'var(--flow)','none',10,0)+TX(435,98,'21,15 %',56,'einw','middle',16,'font-weight:700'));
   return s+OP(ph(k,.6,.75),FORM(240,180,['3000 € · 21,15 % = 634,50 €'],'middle'))+OP(ph(k,.82,.95),TX(240,236,'Kinderlose ab 23: plus 0,6 % Pflege (dann 21,75 %)',450,'ein2','middle',16))}),
 S(12,'Beiträge zahlt man nur bis zur Beitragsbemessungsgrenze: 5812,50 € im Monat bei Kranken und Pflege, 8450 € bei Rente und Arbeitslosen (2026).',
  CARDS('Beitragsbemessungsgrenzen 2026',[['🏥','Kranken und Pflege','5812,50 € pro Monat','a'],['🧓','Rente und Arbeitslosen','8450 € pro Monat','a']],{note:'Was darüber liegt, bleibt beitragsfrei.'})),
 S(13,'Vom Brutto gehen Lohnsteuer, gegebenenfalls Soli und Kirchensteuer sowie die Arbeitnehmeranteile zur Sozialversicherung ab. Übrig bleibt das Netto.',
  FLOW('Vom Brutto zum Netto',[['💶','Brutto','','a'],['➖','Lohnsteuer','ggf. Soli, Kirche'],['➖','Sozial- abgaben','Anteil AN'],['👛','Netto','','g']],{note:'Steuerklasse I bis VI je nach Familienstand'})),
 S(13,'Der direkte Weg zur Arbeit ist unfallversichert. Minijob 2026: bis 603 € im Monat. Arbeitslosengeld I: 60 % vom pauschalen Netto, mit Kind 67 %.',
  CARDS('Gut zu wissen',[['🚲','Wegeunfall','direkter Weg ist versichert','a'],['🧾','Minijob','bis 603 € im Monat','y'],['📉','Arbeitslosengeld\u00a0I','60 %, mit Kind 67 %','a']],{note:'Midijob: über 603 € bis 2000 € im Monat'}))],
 skz:[[()=>'<svg class="mlsk" viewBox="0 0 480 270" role="img" aria-label="Wer zahlt welchen Beitrag">'+sv1(1)+'</svg>','Wer zahlt was? Vier Zweige teilen sich Arbeitgeber und Arbeitnehmer zur Hälfte (Kranken mit Zusatzbeitrag). Die Unfallversicherung zahlt der Arbeitgeber allein.']]};

/* ---------- 4 Arbeitsschutz & Arbeitssicherheit ---------- */
const as1=k=>{const X0=[52,146,240,334,428],L=[['Verbot','rot'],['Warnung','gelb'],['Gebot','blau'],['Rettung','grün'],['Brandschutz','rot']];let s=TITLE('Sicherheitszeichen: Farbe und Form');
 X0.forEach((x,i)=>{const p=STG(k,5,i,.05,.8),y=118;let g='';
  if(i===0)g=`<circle cx="${x}" cy="${y}" r="36" fill="#fff" stroke="#d01f2e" stroke-width="9"/><path d="M${x-25} ${y-25}L${x+25} ${y+25}" stroke="#d01f2e" stroke-width="9"/>`;
  if(i===1)g=`<path d="M${x} ${y-40}L${x+42} ${y+32}H${x-42}Z" fill="#f7c600" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`+T(x,y+22,'!','ein1','middle','font-size:36px;fill:#111');
  if(i===2)g=`<circle cx="${x}" cy="${y}" r="38" fill="#1d5fb8"/>`+T(x,y+13,'i','ein1','middle','font-size:38px;fill:#fff');
  if(i===3)g=RC(x-38,y-38,76,76,'#13853f','none',6,0)+`<path d="M${x-8} ${y-24}h16v16h16v16h-16v16h-16v-16h-16v-16h16Z" fill="#fff"/>`;
  if(i===4)g=RC(x-38,y-38,76,76,'#d01f2e','none',6,0)+T(x,y+12,'🧯','ein2','middle','font-size:34px');
  s+=POP(x,y,p,g)+OP(p,TX(x,190,L[i][0],90,'ein3','middle',16)+TX(x,212,L[i][1],90,'ein2','middle',15))});
 return s+OP(ph(k,.85,.95),TX(240,242,'rund: Verbot und Gebot. Dreieckig: Warnung.',450,'ein2','middle',15)+TX(240,262,'Eckig: Rettung und Brandschutz.',450,'ein2','middle',15))};
X['Arbeitsschutz & Arbeitssicherheit']={
 v:['In einer Halle ist es zu laut. Welche Maßnahme kommt nach dem Arbeitsschutzgesetz zuerst?',
  ['Gehörschutz an alle verteilen','Lärmquelle dämmen oder leisere Maschine','Arbeitszeit in der Halle begrenzen','Warnschild aufhängen'],1,
  'Rangfolge TOP: zuerst technische Maßnahmen an der Quelle, dann organisatorische, zuletzt persönliche Schutzausrüstung wie Gehörschutz.'],
 ein:[
 S(14,'Der Arbeitgeber muss Gefährdungen beurteilen (§ 5 ArbSchG), Maßnahmen festlegen, die Beschäftigten unterweisen (§ 12) und alles dokumentieren.',
  CYC('Gefährdungsbeurteilung',[['Gefährdung','ermitteln'],['beurteilen','§ 5'],['Maßnahmen','festlegen'],['unterweisen','§ 12'],['Wirksamkeit','prüfen'],['dokumentieren','']],{cy:156,sy:1.04,sx:2.2,w:116})),
 S(13,'Rangfolge TOP: zuerst technische Maßnahmen an der Quelle, dann organisatorische, zuletzt persönliche Schutzausrüstung. Die PSA zahlt der Arbeitgeber.',
  FLOW('Maßnahmen nach TOP',[['⚙️','T: technisch','Lärm dämmen','g'],['📋','O: organisatorisch','Zeit begrenzen','y'],['🎧','P: persönlich','Gehörschutz','r']],{note:'Gefahr an der Quelle bekämpfen',note2:'PSA stellt der Arbeitgeber kostenlos'})),
 S(13,'Sicherheitszeichen erkennst Du an Farbe und Form: Verbot rot, Warnung gelb, Gebot blau, Rettung und Erste Hilfe grün, Brandschutz rot.',as1),
 S(13,'Betriebsarzt und Fachkraft für Arbeitssicherheit beraten den Arbeitgeber. Ab mehr als 20 Beschäftigten gibt es Sicherheitsbeauftragte und einen Ausschuss.',
  CARDS('Wer hilft beim Arbeitsschutz?',[['🩺','Betriebsarzt','berät (ASiG)','a'],['🦺','Fachkraft für','Arbeitssicherheit','a'],['🙋','Sicherheitsbeauftragte','ab mehr als 20 Beschäftigten','a'],['👷','Meister','Aufsicht bleibt beim Delegieren','y']],{cols:2})),
 S(14,'Ist jemand mehr als 3 Kalendertage arbeitsunfähig, geht binnen 3 Tagen eine Unfallanzeige an die BG. Kleine Verletzungen kommen ins Verbandbuch.',
  LIST('Unfall: Was muss gemeldet werden?',[['Mehr als 3 Tage arbeitsunfähig: Unfallanzeige','3'],['Frist: 3 Tage nach Kenntnis, Vordruck der BG','📄'],['Der Betriebsrat unterschreibt mit','✍️'],['Tödlicher Unfall: sofort melden, z. B. telefonisch','📞'],['Kleine Verletzung: Verbandbuch, 5 Jahre aufheben','📒']])),
 S(13,'Brandklassen: A feste Stoffe, B Flüssigkeiten, C Gase, D Metalle, F Speisefette und -öle. Das Löschmittel muss zur Brandklasse passen.',
  CARDS('Brandklassen',[['🪵','A','feste Stoffe','r'],['🛢️','B','flüssige Stoffe','r'],['💨','C','Gase','r'],['🔩','D','Metalle','r'],['🍳','F','Fett, Öl','r']],{cols:3,note:'Löschmittel passend zur Brandklasse wählen'}))],
 skz:[[SKZ(as1,'Sicherheitszeichen'),'Sicherheitszeichen nach Farbe und Form: Verbot rot und rund, Warnung gelb und dreieckig, Gebot blau und rund, Rettung grün, Brandschutz rot.']]};

/* ---------- 5 Umwelt- & Wirtschaftsrecht ---------- */
const uw1=k=>{const L=['Vermeidung','Vorbereitung zur Wiederverwendung','Recycling','sonstige Verwertung','Beseitigung'],C=['#16a34a','#65a30d','#ca8a04','#ea580c','#dc2626'];let s=TITLE('Abfallhierarchie (KrWG)');
 L.forEach((l,i)=>{const y=52+i*40,w1=440-i*64,w2=440-(i+1)*64,x1=240-w1/2,x2=240-w2/2,p=STG(k,5,i,.05,.8);
  s+=OP(p,`<path d="M${F(x1)} ${y}H${F(x1+w1)}L${F(x2+w2)} ${y+36}H${F(x2)}Z" fill="color-mix(in srgb,${C[i]} 22%,var(--card))" stroke="${C[i]}" stroke-width="2"/>`+TX(240,y+24,(i+1)+'. '+l,w2-10,'ein3','middle',16))});
 return s};
X['Umwelt- & Wirtschaftsrecht']={
 v:['Welche Stufe steht in der Abfallhierarchie ganz oben?',['Recycling','Vermeidung','Energetische Verwertung','Sichere Beseitigung'],1,
  'Die Reihenfolge des Kreislaufwirtschaftsgesetzes: Vermeidung, Vorbereitung zur Wiederverwendung, Recycling, sonstige Verwertung, Beseitigung. Was gar nicht entsteht, muss niemand entsorgen.'],
 ein:[
 S(13,'Die Abfallhierarchie gibt die Reihenfolge vor: vermeiden, wiederverwenden, recyceln, sonst verwerten und erst zuletzt beseitigen.',uw1),
 S(13,'Bestimmte Anlagen brauchen eine Genehmigung nach BImSchG. Je nach Größe sind Beauftragte für Immissionsschutz, Gewässer und Abfall zu bestellen.',
  CARDS('Immissionsschutz (BImSchG)',[['🏭','Genehmigung','für bestimmte Anlagen','a'],['💨','Immissionsschutz-','beauftragter','a'],['💧','Gewässerschutz-','beauftragter','b'],['🗑️','Abfall-','beauftragter','y']],{cols:2})),
 S(12,'Wasserhaushaltsgesetz: Anlagen für wassergefährdende Stoffe müssen dicht sein. Fässer stehen deshalb zum Beispiel in einer Auffangwanne.',
  k=>{const a=ph(k,.05,.3),b=ph(k,.35,.6),c=ph(k,.65,.85);let s=TITLE('Gewässerschutz (WHG)');
   s+=`<path d="M20 226H460" stroke="var(--ink)" stroke-width="2"/>`+RC(20,228,440,34,'color-mix(in srgb,var(--flow) 14%,var(--card))','none',0,0)+TX(240,252,'Boden und Grundwasser',450,'ein2','middle',15);
   s+=OP(a,RC(196,84,88,118,'color-mix(in srgb,var(--amber) 35%,var(--card))','var(--ink)',8,2)+`<path d="M196 116h88M196 170h88" stroke="var(--ink)" stroke-width="2"/>`+T(240,152,'☣️','ein2','middle','font-size:26px'));
   s+=OP(b,`<path d="M164 180V218H316V180" fill="none" stroke="var(--acc)" stroke-width="4"/>`+TX(330,206,'Auffangwanne',200,'ein3','start',16));
   s+=OP(a,TX(180,100,'wassergefährdender',200,'ein2','end',15)+TX(180,120,'Stoff',200,'ein2','end',15));
   return s+POP(330,120,c,OK(330,120))+OP(c,TX(352,126,'dicht',200,'ein3','start'))}),
 S(13,'Produkthaftung: Der Hersteller haftet auch ohne Verschulden. Für Produkte ab dem 9.12.2026 fällt der Selbstbehalt von 500 € bei Sachschäden weg.',
  VS('Produkthaftung kurz',{h:'vor dem 9.12.2026',c:'y',l:['Haftung ohne Verschulden','Sachschaden:','500 € Selbstbehalt']},{h:'ab dem 9.12.2026',c:'g',l:['Haftung ohne Verschulden','kein Selbstbehalt mehr']},{note:'maßgeblich: Tag des Inverkehrbringens'})),
 S(12,'Die DSGVO verlangt unter anderem Zweckbindung, Datenminimierung, Richtigkeit und Speicherbegrenzung. Mehr dazu im Modul Datenschutz.',
  CARDS('Datenschutz: Grundsätze (DSGVO)',[['🎯','Zweckbindung','','a'],['✂️','Datenminimierung','','a'],['✔️','Richtigkeit','','a'],['⏳','Speicher-','begrenzung','a']],{cols:2})),
 S(13,'Datenpanne: Meldung binnen 72 Stunden ab Kenntnis. Ab 20 Personen, die ständig Daten automatisiert verarbeiten, ist ein Datenschutzbeauftragter Pflicht.',
  CARDS('Fristen und Pflichten',[['⏰','Datenpanne','melden binnen 72 h ab Kenntnis','r'],['🧑‍💼','Datenschutzbeauftragter','ab 20 Personen mit Daten','a']]))],
 skz:[[SKZ(uw1,'Abfallhierarchie'),'Die Abfallhierarchie als umgedrehte Pyramide: Je weiter oben, desto besser für die Umwelt. Beseitigung ist der letzte Weg.']]};

/* ---------- 6 Haftung, Direktionsrecht & Zeugnis ---------- */
const hz1=BARS('Wie viel zahlt der Arbeitnehmer?',[['leichteste',0,'nichts','g'],['mittlere',50,'anteilig','y'],['grobe',100,'in der Regel voll','r'],['Vorsatz',100,'voll','r']],{max:100,lx:130,W:170,h:44,note:'Fahrlässigkeit bei betrieblich veranlasster Arbeit'});
X['Haftung, Direktionsrecht & Zeugnis']={
 v:['Ein Staplerfahrer ist kurz unaufmerksam (mittlere Fahrlässigkeit) und beschädigt ein Regal. Wer zahlt den Schaden?',
  ['Er allein, und zwar voll.','Der Betrieb allein.','Der Schaden wird geteilt.','Die Berufsgenossenschaft.'],2,
  'Bei betrieblich veranlasster Arbeit haftet der Arbeitnehmer bei mittlerer Fahrlässigkeit anteilig. Bei leichtester Fahrlässigkeit gar nicht, bei grober Fahrlässigkeit und Vorsatz in der Regel voll.'],
 ein:[
 S(12,'Der Arbeitgeber bestimmt Inhalt, Ort und Zeit der Arbeit nach billigem Ermessen. Grenzen setzen Vertrag, Tarifvertrag, Betriebsvereinbarung und Gesetz.',
  CARDS('Direktionsrecht (§ 106 GewO)',[['🛠️','Inhalt','was?','a'],['📍','Ort','wo?','a'],['🕒','Zeit','wann?','a']],{note:'Grenzen: Vertrag, Tarif, Betriebsvereinbarung, Gesetz'})),
 S(13,'Was der Arbeitnehmer zahlt, hängt vom Verschulden ab: bei leichtester Fahrlässigkeit nichts, bei mittlerer anteilig, bei grober und Vorsatz meist alles.',hz1),
 S(13,'Eine Abmahnung rügt ein konkretes Fehlverhalten und droht für den Wiederholungsfall die Kündigung an. Sie ist formfrei, schriftlich aber beweisbar.',
  FLOW('Abmahnung',[['⚠️','Fehlverhalten','konkret'],['📄','Abmahnung','Rüge und Warnung','y'],['✉️','Kündigung','bei Wiederholung','r']],{note:'Ohne Kündigungsandrohung ist es nur eine Ermahnung.'})),
 S(13,'Anspruch auf ein Zeugnis: einfach mit Art und Dauer der Tätigkeit oder qualifiziert mit Leistung und Verhalten. Es muss wohlwollend und wahr sein.',
  VS('Arbeitszeugnis (§ 109 GewO)',{h:'einfaches Zeugnis',c:'b',l:['Art der Tätigkeit','Dauer']},{h:'qualifiziertes Zeugnis',c:'a',l:['Art und Dauer','dazu Leistung','dazu Verhalten']},{note:'wohlwollend und wahr'})),
 S(12,'Beschäftigte dürfen ihre Personalakte einsehen, ein Betriebsratsmitglied mitnehmen und eine Gegendarstellung beifügen lassen. Notizen sachlich schreiben.',
  LIST('Personalakte (§ 83 BetrVG)',[['Einsicht in die eigene Personalakte','ok'],['ein Betriebsratsmitglied mitnehmen','ok'],['Gegendarstellung beifügen lassen','ok'],['Notizen des Meisters: sachlich schreiben','📝']])),
 S(13,'Schwerbehinderte (GdB ab 50) haben 5 Tage Zusatzurlaub und besonderen Kündigungsschutz. Das AGG verbietet Benachteiligung, etwa wegen des Alters.',
  CARDS('Besonderer Schutz',[['♿','Schwerbehinderte','GdB ab 50: 5 Tage mehr Urlaub','a'],['🛡️','Kündigung','nur mit Integrationsamt','a'],['⚖️','AGG','keine Benachteiligung','a'],['📢','Beschwerderecht','§ 13 AGG','a']],{cols:2}))],
 skz:[[SKZ(hz1,'Haftung nach Fahrlässigkeit'),'Arbeitnehmerhaftung nach dem Grad der Fahrlässigkeit: Je größer das Verschulden, desto mehr trägt der Arbeitnehmer selbst.']]};

/* ---------- 7 Ausbildung & Jugendarbeitsschutz ---------- */
const ab1=VS('Jugendliche und Erwachsene',{h:'Jugendliche (unter 18)',c:'a',l:['8 h am Tag, 40 h pro Woche','Pause 60 min ab über 6 h','12 h Freizeit','25 bis 30 Werktage Urlaub']},{h:'Erwachsene',c:'b',l:['8 h, bis 10 h mit Ausgleich','Pause 30 min ab über 6 h','11 h Ruhezeit','24 Werktage Urlaub']});
X['Ausbildung & Jugendarbeitsschutz']={
 v:['Ein 17-jähriger Azubi arbeitet 7 Stunden. Wie viel Pause steht ihm mindestens zu?',['30 Minuten','45 Minuten','60 Minuten','keine, er ist fast 18'],2,
  'Jugendliche brauchen bei mehr als 6 Stunden Arbeit 60 Minuten Pause, bei mehr als 4,5 bis 6 Stunden 30 Minuten. Das Jugendarbeitsschutzgesetz gilt bis unter 18 Jahren.'],
 ein:[
 S(12,'Der Ausbildungsvertrag wird vor Beginn schriftlich geschlossen. Probezeit: 1 bis 4 Monate. Danach kann der Betrieb nur aus wichtigem Grund kündigen.',
  CARDS('Ausbildungsvertrag',[['📝','schriftlich','vor Beginn','a'],['⏳','Probezeit','1 bis 4 Monate','a'],['🔒','danach','Kündigung nur aus wichtigem Grund','y']])),
 S(13,'Der Betrieb bildet aus, stellt Mittel kostenlos und gibt für die Berufsschule frei. Azubis lernen, folgen Weisungen und führen das Berichtsheft.',
  VS('Pflichten',{h:'Ausbildender',c:'a',l:['Ziel vermitteln','Ausbilder bestellen','Mittel kostenlos','Berufsschule freistellen','Vergütung, Zeugnis']},{h:'Auszubildende',c:'b',l:['lernen','Weisungen befolgen','Berichtsheft führen','Betriebsordnung beachten','Verschwiegenheit']})),
 S(12,'Mindestvergütung bei Beginn 2026: 724 € im 1. Jahr, dann 854 €, 977 € und 1014 €. Gilt ein Tarifvertrag, geht dieser vor.',
  BARS('Mindestausbildungsvergütung (Beginn 2026)',[['1. Jahr',724,'724 €'],['2. Jahr',854,'854 €'],['3. Jahr',977,'977 €'],['4. Jahr',1014,'1014 €']],{max:1014,lx:110,W:230,h:44,note:'Tarifverträge gehen vor'})),
 S(12,'Jugendliche (15 bis unter 18) arbeiten höchstens 8 Stunden am Tag und 40 in der Woche. Zwischen zwei Arbeitstagen liegen mindestens 12 Stunden frei.',
  CARDS('Jugendarbeitsschutz',[['🧒','Jugendliche','15 bis unter 18 Jahre','a'],['🕗','8 h am Tag','40 h pro Woche','a'],['🌙','12 h Freizeit','zwischen 2 Arbeitstagen','a']],{note:'Berufsschulzeit zählt als Arbeitszeit'})),
 S(12,'Jugendliche bekommen 30 Minuten Pause bei mehr als 4,5 bis 6 Stunden Arbeit und 60 Minuten bei mehr als 6 Stunden.',
  BARS('Pausen für Jugendliche',[['bis 4,5 h',0,'keine Pflicht','m'],['über 4,5 bis 6 h',30,'30 min'],['über 6 h',60,'60 min']],{max:60,lx:150,W:200,h:50,y0:62,note:'Erwachsene: 30 min erst bei mehr als 6 h'})),
 S(13,'Je jünger, desto mehr Urlaub: 30 Werktage unter 16, 27 unter 17, 25 unter 18. Vor Beginn und nach einem Jahr ist eine ärztliche Untersuchung Pflicht.',
  BARS('Mindesturlaub',[['unter 16',30,'30 Werktage'],['unter 17',27,'27 Werktage'],['unter 18',25,'25 Werktage'],['ab 18',24,'24 Werktage','m']],{max:30,lx:110,W:200,h:44,note:'Arzt: vor Beginn und nach einem Jahr'}))],
 skz:[[SKZ(ab1,'Jugendliche und Erwachsene im Vergleich'),'Jugendarbeitsschutz im Vergleich zum Arbeitszeitgesetz für Erwachsene: kürzere Tage, längere Pausen, mehr Freizeit und mehr Urlaub.']]};

/* ---------- 8 Vertragsrecht & Gewährleistung ---------- */
const vr1=FLOW('Rechte bei einem Mangel',[['🔧','1. Nacherfüllung','Reparatur oder Ersatz','a'],['↩️','2. Rücktritt','oder Minderung','y'],['💶','zusätzlich','ggf. Schadensersatz']],{note:'Unter Kaufleuten: sofort prüfen und rügen (§ 377 HGB)'});
X['Vertragsrecht & Gewährleistung']={
 v:['Eine neue Bohrmaschine ist nach zwei Wochen defekt. Was kann der Betrieb als Käufer zuerst verlangen?',
  ['Sofort das Geld zurück','Reparatur oder Ersatz (Nacherfüllung)','Nur einen Preisnachlass','Nichts, das Risiko trägt der Käufer'],1,
  'Zuerst kommt die Nacherfüllung: Reparatur oder Ersatz. Erst wenn sie scheitert, folgen Rücktritt oder Minderung, dazu gegebenenfalls Schadensersatz. Unter Kaufleuten den Mangel sofort rügen.'],
 ein:[
 S(11,'Ein Vertrag entsteht durch Angebot und Annahme, also zwei übereinstimmende Willenserklärungen.',
  FLOW('So entsteht ein Vertrag',[['🗣️','Angebot',''],['🤝','Annahme',''],['📄','Vertrag','','g']],{note:'zwei übereinstimmende Willenserklärungen'})),
 S(12,'Kaufvertrag (§ 433 BGB): Der Verkäufer übergibt die Sache und verschafft Eigentum. Der Käufer zahlt den Kaufpreis und nimmt die Sache ab.',
  VS('Kaufvertrag (§ 433 BGB)',{h:'Verkäufer',c:'a',l:['Sache übergeben','Eigentum verschaffen']},{h:'Käufer',c:'b',l:['Kaufpreis zahlen','Sache abnehmen']},{note:'AGB gelten nur, wenn sie vorher einbezogen wurden'})),
 S(13,'Unter 7 Jahren ist man geschäftsunfähig, von 7 bis unter 18 beschränkt geschäftsfähig (Zustimmung der Eltern, Taschengeld), ab 18 voll.',
  TL('Geschäftsfähigkeit',{y:160,ticks:[[0,'0'],[7/21,'7 Jahre'],[18/21,'18 Jahre']],spans:[[0,7/21,'geschäftsunfähig','r'],[7/21,18/21,'beschränkt','y'],[18/21,1,'voll','g']],note:'beschränkt: Zustimmung der Eltern oder Taschengeld'})),
 S(13,'Bei einem Mangel kommt zuerst die Nacherfüllung: Reparatur oder Ersatz. Scheitert sie, folgen Rücktritt oder Minderung, dazu gegebenenfalls Schadensersatz.',vr1),
 S(13,'Gewährleistung beim Kauf: 2 Jahre ab Ablieferung, bei Bauwerken 5 Jahre. Die regelmäßige Verjährung dauert 3 Jahre ab Ende des Jahres.',
  BARS('Fristen',[['Kauf',2,'2 Jahre ab Ablieferung'],['Bauwerk',5,'5 Jahre'],['Verjährung',3,'3 Jahre ab Jahresende','b']],{max:5,lx:120,W:120,h:50,y0:62})),
 S(12,'Beim Dienstvertrag schuldet man die Tätigkeit, beim Werkvertrag den Erfolg. Verzug: Die Leistung kommt trotz Fälligkeit und Mahnung nicht rechtzeitig.',
  VS('Dienst oder Werk?',{h:'Dienstvertrag',c:'b',l:['Tätigkeit geschuldet','z. B. Arbeit, Beratung']},{h:'Werkvertrag',c:'a',l:['Erfolg geschuldet','z. B. Reparatur, Anlage']},{note:'Verzug: fällig, gemahnt, trotzdem nicht geleistet'}))],
 skz:[[SKZ(vr1,'Rechte bei einem Mangel'),'Die Reihenfolge der Mängelrechte: zuerst Nacherfüllung, danach Rücktritt oder Minderung. Schadensersatz kann zusätzlich dazukommen.']]};

/* ---------- 9 Umweltmanagement & Nachhaltigkeit ---------- */
const um1=CYC('',[['Plan','Politik, Ziele'],['Do','umsetzen'],['Check','prüfen'],['Act','verbessern']],{cy:136,r:92,sx:1.75,sy:1.1,mid:'ISO 14001'});
X['Umweltmanagement & Nachhaltigkeit']={
 v:['Was verlangt EMAS zusätzlich zur ISO 14001?',['Nichts, beide sind gleich','Eine öffentliche Umwelterklärung und einen Umweltgutachter','Nur eine Energieberatung','Ein Qualitätszertifikat nach ISO 9001'],1,
  'EMAS ist das europäische System mit höheren Anforderungen: zusätzlich eine öffentliche Umwelterklärung, die Prüfung durch einen Umweltgutachter und die Registrierung.'],
 ein:[
 S(13,'ISO 14001 baut auf dem PDCA-Zyklus auf: Umweltpolitik und Ziele planen, umsetzen, prüfen und verbessern. Dann beginnt der Kreis von vorn.',um1),
 S(13,'ISO 14001 ist die internationale Norm. EMAS ist das europäische System mit mehr Pflichten: öffentliche Umwelterklärung, Umweltgutachter, Registrierung.',
  VS('ISO 14001 oder EMAS?',{h:'ISO 14001',c:'b',l:['international','Norm mit Zertifikat','Aufbau nach PDCA']},{h:'EMAS',c:'a',l:['europäisch, strenger','öffentliche Umwelterklärung','Umweltgutachter','Registrierung']})),
 S(12,'Umweltaspekte sind Teile der Arbeit, die die Umwelt beeinflussen: Energie, Abfall, Emissionen, Abwasser, Gefahrstoffe. Die Gesetze einzuhalten ist Pflicht.',
  CARDS('Umweltaspekte',[['⚡','Energie',''],['🗑️','Abfall',''],['💨','Emissionen',''],['💧','Abwasser',''],['☣️','Gefahrstoffe',''],['📜','Rechts-','konformität','a']],{cols:3})),
 S(12,'Nachhaltigkeit steht auf drei Säulen: Ökologie, Ökonomie und Soziales. Heute wirtschaften, ohne künftigen Generationen zu schaden.',
  k=>{let s=OP(ph(k,.05,.2),`<path d="M70 104L240 44L410 104Z" fill="color-mix(in srgb,var(--acc) 18%,var(--card))" stroke="var(--acc)" stroke-width="2.5" stroke-linejoin="round"/>`+TX(240,90,'Nachhaltigkeit',450,'ein1','middle',20));
   [['🌳','Ökologie'],['💶','Ökonomie'],['🤝','Soziales']].forEach((c,i)=>{const x=94+i*104,p=STG(k,3,i,.2,.75);s+=OP(p,RC(x,112,84,112,'var(--card)','var(--acc)',6,2)+T(x+42,156,c[0],'ein2','middle','font-size:26px')+TX(x+42,196,c[1],78,'ein3','middle',16))});
   return s+OP(ph(k,.05,.2),RC(64,228,352,14,'var(--acc)','none',4,0))+OP(ph(k,.82,.95),TX(240,264,'heute decken, ohne künftigen Generationen zu schaden',450,'ein2','middle',15))}),
 S(12,'Die Ökobilanz betrachtet ein Produkt über den ganzen Lebensweg: Rohstoff, Herstellung, Nutzung und Entsorgung.',
  FLOW('Ökobilanz: der Lebensweg',[['⛏️','Rohstoff',''],['🏭','Herstellung',''],['🚗','Nutzung',''],['♻️','Entsorgung','']],{note:'Umweltwirkung über den ganzen Lebensweg'})),
 S(13,'Praktische Maßnahmen: LED, Abwärme nutzen, Druckluftleckagen abdichten, Abfall trennen, Mehrweg und Schulung. ISO 50001 regelt Energiemanagement.',
  LIST('Was im Betrieb hilft',[['LED-Beleuchtung','💡'],['Abwärme nutzen','♨️'],['Druckluftleckagen abdichten','🔧'],['Abfall trennen, Mehrweg nutzen','♻️'],['Mitarbeiter schulen','🎓']],{h:38,note:'ISO 50001: Energiemanagementsystem'}))],
 skz:[[SKZ(um1,'PDCA-Zyklus'),'Der PDCA-Zyklus der ISO 14001: planen, umsetzen, prüfen, verbessern. Danach beginnt der Kreis mit neuen Zielen von vorn.']]};

/* ---------- 10 Produkthaftung ---------- */
const ph1=TL('Welches Recht gilt?',{y:150,ticks:[[0,'2025'],[.45,'9.12.2026'],[.9,'2027']],spans:[[0,.45,'altes Recht','y'],[.45,1,'neues Recht','g']],
 marks:[[.45,'','r']],note:'maßgeblich ist der Tag des Inverkehrbringens'});
const ph1b=k=>ph1(k)+OP(ph(k,.55,.7),TX(124,214,'500 € Selbstbehalt bei',200,'ein2','middle',15)+TX(124,234,'Sachschäden',200,'ein2','middle',15))+OP(ph(k,.7,.85),TX(345,214,'kein Selbstbehalt,',200,'ein2','middle',15)+TX(345,234,'Software ist Produkt',200,'ein2','middle',15));
X['Produkthaftung']={
 v:['Ein Akku-Schrauber kommt im Januar 2027 neu in den Handel. Ein Fehler am Akku beschädigt das private Sofa eines Kunden. Was gilt beim Sachschaden?',
  ['Der Kunde trägt 500 € selbst.','Kein Selbstbehalt, der Hersteller haftet.','Der Hersteller haftet nur bei Verschulden.','Nur der Händler haftet.'],1,
  'Für Produkte, die ab dem 9.12.2026 in Verkehr gebracht werden, entfällt der Selbstbehalt von 500 €. Maßgeblich ist der Tag des Inverkehrbringens, nicht der Tag des Schadens.'],
 ein:[
 S(13,'Nach dem Produkthaftungsgesetz haftet der Hersteller auch ohne Verschulden. Die Produzentenhaftung nach BGB setzt Verschulden voraus, reicht aber weiter.',
  VS('Zwei Grundlagen',{h:'ProdHaftG',c:'a',l:['ohne Verschulden','Mensch verletzt','private Sache beschädigt']},{h:'§ 823 BGB',c:'b',l:['mit Verschulden','Beweislastumkehr','auch gewerbliche Sachen']})),
 S(13,'Fehlerarten: Konstruktion, Fabrikation, Instruktion. War ein Entwicklungsfehler nach dem Stand der Wissenschaft nicht erkennbar, gibt es keine Haftung.',
  CARDS('Fehlerarten',[['📐','Konstruktion','ganze Serie','r'],['🏭','Fabrikation','einzelne Stücke','r'],['📖','Instruktion','Warnhinweis fehlt','r'],['🔬','Entwicklung','nicht erkennbar: keine Haftung','g']],{cols:2})),
 S(12,'Hersteller ist auch, wer unter eigenem Namen verkauft oder in die EU einführt. Der Lieferant haftet nur, wenn der Hersteller nicht feststellbar ist.',
  CARDS('Wer haftet?',[['🏭','Hersteller','','a'],['🏷️','Quasi-Hersteller','eigener Name','a'],['🚢','Importeur','in die EU','a'],['🏪','Lieferant','nur nachrangig','m']],{cols:2})),
 S(14,'Entscheidend ist, wann das Produkt in Verkehr kam: vor dem 9.12.2026 gilt altes Recht mit 500 € Selbstbehalt, danach neues Recht ohne Selbstbehalt.',ph1b),
 S(13,'Der Anspruch verjährt 3 Jahre ab Kenntnis und erlischt 10 Jahre nach dem Inverkehrbringen. Nach dem Verkauf muss der Hersteller sein Produkt beobachten.',
  CARDS('Fristen und Pflichten',[['⏳','3 Jahre','Verjährung ab Kenntnis','a'],['🔚','10 Jahre','nach Inverkehrbringen','a'],['👀','beobachten','warnen oder zurückrufen','y']])),
 S(12,'Als Meister: Fehler dokumentieren, Prüfungen durchführen, gesperrte Ware nicht ausliefern, Warnhinweise prüfen und Auffälligkeiten sofort melden.',
  LIST('Was Du als Meister tust',[['Fehler in der Fertigung dokumentieren','📝'],['Prüfungen durchführen','🔍'],['gesperrte Ware nicht ausliefern','⛔'],['Warnhinweise und Anleitung prüfen','📖'],['Auffälligkeiten sofort melden','📣']],{h:39}))],
 skz:[[SKZ(ph1b,'Altes und neues Produkthaftungsrecht'),'Altes oder neues Recht? Es zählt der Tag, an dem das Produkt in Verkehr gebracht wurde, nicht der Tag des Schadens.']]};

/* ---------- 11 Datenschutz (DSGVO) im Betrieb ---------- */
const ds1=LIST('Datenschutz im Alltag des Meisters',[['Schichtplan mit Krankmeldungen aushängen','no'],['Gesundheitsdaten nur an Berechtigte','ok'],['Personalthemen im privaten Messenger','no'],['Unterlagen wegschließen, Clean Desk','ok'],['Kamera nur mit dem Betriebsrat (§ 87)','ok']],{h:40});
X['Datenschutz (DSGVO) im Betrieb']={
 v:['Am Montag um 8 Uhr erfährt der Betrieb, dass ein Laptop mit Personaldaten gestohlen wurde. Bis wann sollte die Meldung an die Aufsichtsbehörde spätestens raus?',
  ['Donnerstag, 8 Uhr','Montag in einer Woche','Ende des Monats','Gar nicht, die Anzeige bei der Polizei reicht'],0,
  'Die Meldung muss unverzüglich, möglichst binnen 72 Stunden nach Kenntnis erfolgen, wenn ein Risiko für die Betroffenen besteht. 72 Stunden ab Montag 8 Uhr sind Donnerstag 8 Uhr.'],
 ein:[
 S(12,'Personenbezogen ist, was sich einer Person zuordnen lässt: Name, Personalnummer, Foto, Leistung, IP-Adresse. Gesundheitsdaten sind besonders geschützt.',
  CARDS('Personenbezogene Daten',[['🪪','Name',''],['🔢','Personalnummer',''],['📷','Foto',''],['📊','Leistungsdaten',''],['🌐','IP-Adresse',''],['🩺','Gesundheit','Art. 9 DSGVO','r']],{cols:3})),
 S(13,'Verarbeiten ist verboten, außer eine Rechtsgrundlage erlaubt es. Im Betrieb meist der Arbeitsvertrag, eine rechtliche Pflicht oder berechtigtes Interesse.',
  LIST('Verboten, außer es gibt eine Erlaubnis',[['Vertrag (Art. 6 Abs. 1 b)','ok'],['rechtliche Pflicht (c)','ok'],['berechtigtes Interesse (f)','ok'],['Einwilligung','ok'],['ergänzend: Betriebsvereinbarung','ok']],{h:39})),
 S(12,'Grundsätze nach Art. 5: Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Vertraulichkeit. Der Betrieb muss das nachweisen können.',
  CARDS('Grundsätze (Art. 5 DSGVO)',[['🎯','Zweckbindung',''],['✂️','Daten- minimierung',''],['✔️','Richtigkeit',''],['⏳','Speicher-','begrenzung'],['🔐','Vertraulichkeit',''],['📒','Rechenschaft','nachweisen','a']],{cols:3})),
 S(12,'Beschäftigte haben Rechte: Auskunft binnen eines Monats, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.',
  CARDS('Rechte der Betroffenen',[['❓','Auskunft','binnen 1 Monat','a'],['✏️','Berichtigung',''],['🗑️','Löschung',''],['⏸️','Einschränkung',''],['📤','Übertragbarkeit',''],['✋','Widerspruch','']],{cols:3})),
 S(14,'Eine Datenpanne mit Risiko meldet der Betrieb möglichst binnen 72 Stunden ab Kenntnis. Bei hohem Risiko werden auch die Betroffenen informiert.',
  TL('Datenpanne: 72 Stunden',{y:160,ticks:[[.08,'Mo 8 Uhr'],[.08+.84/3,'Di 8 Uhr'],[.08+.84*2/3,'Mi 8 Uhr'],[.92,'Do 8 Uhr']],spans:[[.08,.92,'72 Stunden ab Kenntnis','a']],marks:[[.08,'','b'],[.92,'','r']],note:'Bei hohem Risiko auch die Betroffenen informieren'})),
 S(13,'Im Alltag: keine Krankmeldungen aushängen, Gesundheitsdaten nur an Berechtigte, keine privaten Messenger, Unterlagen wegschließen.',ds1)],
 skz:[[SKZ(ds1,'Datenschutz im Alltag'),'Datenschutz im Alltag des Meisters: Was ist erlaubt, was nicht? Bußgelder können bis 20 Mio. € oder 4 % des weltweiten Jahresumsatzes reichen.']]};

/* ---------- 12 Arbeitsgericht & Beendigung ---------- */
const ag1=STAIRS('Drei Instanzen',[['Arbeitsgericht','1. Instanz'],['Landes- arbeitsgericht','2. Instanz'],['Bundes- arbeitsgericht','3. Instanz']],{top:96,lo:'kein Anwaltszwang am Arbeitsgericht'});
X['Arbeitsgericht & Beendigung']={
 v:['Ein Mitarbeiter gewinnt in der 1. Instanz vor dem Arbeitsgericht. Wer zahlt seinen Anwalt?',['Der Arbeitgeber, weil er verloren hat.','Er selbst.','Die Staatskasse.','Das Gericht teilt die Kosten auf.'],1,
  'In der ersten Instanz trägt jede Seite ihre Anwaltskosten selbst, auch wer gewinnt (§ 12a ArbGG). Einen Anwaltszwang gibt es vor dem Arbeitsgericht nicht.'],
 ein:[
 S(12,'Ein Arbeitsverhältnis endet durch ordentliche oder fristlose Kündigung, durch Aufhebungsvertrag oder mit Ablauf einer Befristung.',
  CARDS('Wege zum Ende',[['✉️','ordentliche','Kündigung mit Frist','a'],['⚡','fristlose','Kündigung','r'],['🤝','Aufhebungs-','vertrag','y'],['📅','Befristung','endet von selbst','b']],{cols:2})),
 S(13,'Fristlos nur aus wichtigem Grund, etwa Diebstahl oder Tätlichkeit. Die Kündigung muss binnen 2 Wochen ab Kenntnis zugehen. Vorher Betriebsrat anhören.',
  TL('Fristlose Kündigung (§ 626 BGB)',{y:150,ticks:[[.08,'Kenntnis'],[.08+.6,'2 Wochen']],spans:[[.08,.68,'Kündigung muss zugehen','r']],marks:[[.08,'','b']],note:'nur aus wichtigem Grund, vorher Betriebsrat anhören'})),
 S(13,'Der Aufhebungsvertrag beendet das Arbeitsverhältnis einvernehmlich und schriftlich. Folge ist meist eine Sperrzeit beim Arbeitslosengeld bis 12 Wochen.',
  VS('Aufhebungsvertrag',{h:'So geht es',c:'a',l:['schriftlich (§ 623 BGB)','einvernehmlich','kein Betriebsrat nötig']},{h:'Folgen',c:'r',l:['kein Kündigungsschutz','Sperrzeit (ALG I)','meist bis 12 Wochen']})),
 S(13,'Klage binnen 3 Wochen nach Zugang. Zuerst kommt die Güteverhandlung, scheitert sie, der Kammertermin. Meist endet es mit einem Vergleich.',
  FLOW('Ablauf der Klage',[['📅','Klage','binnen 3 Wochen'],['🤝','Güte-','verhandlung'],['⚖️','Kammer','mit 2 Ehrenamtlichen']],{note:'häufig: Vergleich, oft mit Abfindung'})),
 S(13,'Drei Instanzen: Arbeitsgericht, Landesarbeitsgericht, Bundesarbeitsgericht. In der 1. Instanz zahlt jede Seite ihren Anwalt selbst, auch wer gewinnt.',ag1),
 S(14,'§ 1a KSchG: Bei betriebsbedingter Kündigung mit Hinweis gibt es 0,5 Monatsverdienste je Jahr, wenn keine Klage kommt. Über 6 Monate wird aufgerundet.',
  k=>TITLE('Abfindung nach § 1a KSchG')+OP(ph(k,.05,.2),TX(240,76,'5 Jahre und 8 Monate im Betrieb, 3200 € im Monat',450,'ein2','middle'))+
   OP(ph(k,.2,.35),TX(240,108,'mehr als 6 Monate: aufrunden auf 6 Jahre',450,'ein3','middle'))+
   OP(ph(k,.4,.55),FORM(240,158,['Abfindung = 0,5 · Jahre · Monatsverdienst'],'middle'))+
   OP(ph(k,.6,.75),FORM(240,204,['Abfindung = 0,5 · 6 · 3200 € = 9600 €'],'middle'))+
   OP(ph(k,.82,.95),TX(240,252,'nur wenn der Mitarbeiter die Klagefrist verstreichen lässt',450,'ein2','middle',15)))],
 skz:[[SKZ(ag1,'Drei Instanzen der Arbeitsgerichtsbarkeit'),'Die drei Instanzen der Arbeitsgerichtsbarkeit. Vor der Kammer kommt in der 1. Instanz immer eine Güteverhandlung.']]};

if(typeof tab!=='undefined'&&FACH.includes(tab))go(tab)})();
