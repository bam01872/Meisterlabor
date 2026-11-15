/* ===== Version 9, Paket C: Zusammenarbeit im Betrieb, 12 Module mit Vermutung, Erklärvideo und Skizze ===== */
(()=>{const {F,ph,T,RC,OP,POP,ARp,OK,NO,FORM,TX,TITLE,STG,CC,LIST,CARDS,BARS,FLOW,VS,STAIRS,TL,CYC,BIG,SKZ,DOC,PER,GEAR}=ML5.H,X=ML5.X;
const S=(d,t,f)=>({d,t,f});
const MIX=(c,p)=>`color-mix(in srgb,${CC(c)} ${p}%,var(--card))`;
/* Rechenszene: Titel, Ausgangslage, bis zu drei Formelzeilen, Schluss (Schluss nur bei höchstens zwei Zeilen) */
const CALC=(ti,lage,rows,fazit)=>k=>{let s=TITLE(ti)+OP(ph(k,.04,.18),TX(240,78,lage,450,'ein2','middle'));
 rows.forEach((r,i)=>{s+=OP(ph(k,.2+i*.2,.34+i*.2),FORM(240,140+i*52,r,'middle'))});
 return s+(fazit?OP(ph(k,.84,.95),TX(240,258,fazit,450,'ein3','middle')):'')};
/* Pyramide: Schichten von unten [Text, Farbe] */
const PYR=(ti,L)=>k=>{let s=TITLE(ti);const n=L.length,top=58,bot=252,h=(bot-top)/n,hw=y=>100+(y-top)/(bot-top)*120;
 L.forEach((c,i)=>{const yb=bot-i*h,yt=yb-h+4,p=STG(k,n,i,.05,.8),c0=CC(c[1]);
  s+=OP(p,`<path d="M${F(240-hw(yb))} ${F(yb)}L${F(240-hw(yt))} ${F(yt)}H${F(240+hw(yt))}L${F(240+hw(yb))} ${F(yb)}Z" fill="${MIX(c[1],18)}" stroke="${c0}" stroke-width="2" stroke-linejoin="round"/>`+TX(240,(yb+yt)/2+6,c[0],2*hw(yt)-24,'ein3','middle',16))});
 return s};
/* Feld mit zwei Achsen und Punkten [x 0..1, y 0..1, Text, Farbe] */
const GRID=(ti,xl,yl,P)=>k=>{const x0=86,x1=446,y0=58,y1=222,px=f=>x0+f*(x1-x0),py=f=>y1-f*(y1-y0);
 let s=TITLE(ti)+ARp(x0,y1,x0,y0-8,ph(k,0,.12),'var(--ink)',2)+ARp(x0,y1,x1+8,y1,ph(k,0,.12),'var(--ink)',2)+
  OP(ph(k,.05,.15),`<g transform="translate(62 ${(y0+y1)/2}) rotate(-90)">${TX(0,0,yl,170,'ein2','middle',15)}</g>`+TX((x0+x1)/2,y1+28,xl,360,'ein2','middle',15));
 P.forEach((c,i)=>{const x=px(c[0]),y=py(c[1]);s+=POP(x,y,STG(k,P.length,i,.15,.85),RC(x-78,y-16,156,32,MIX(c[3],16),CC(c[3]),16,2)+TX(x,y+6,c[2],146,'ein3','middle',15))});
 return s};

/* ---------- Mitarbeiterentwicklung & Unterweisung ---------- */
const mu1=STAIRS('Vier-Stufen-Methode',[['Vorbereiten','Stufe 1'],['Vormachen','und erklären'],['Nachmachen','lassen'],['Üben','selbstständig']],{top:84,lo:'Mit jeder Stufe arbeitet der Mitarbeiter selbstständiger.'});
X['Mitarbeiterentwicklung & Unterweisung']={
 v:['Du sollst einem neuen Mitarbeiter das Rüsten einer Maschine beibringen. Womit beginnst Du nach der Vier-Stufen-Methode?',
  ['Er probiert es erst einmal selbst.','Du bereitest ihn und den Arbeitsplatz vor.','Du zeigst sofort jeden Handgriff.','Du gibst ihm die Betriebsanleitung.'],1,
  'Am Anfang steht die Vorbereitung: Arbeitsplatz und Material bereitlegen, den Mitarbeiter begrüßen, Ziel und Sinn der Aufgabe erklären und sein Vorwissen erfragen. Erst dann folgt das Vormachen.'],
 ein:[
 S(13,'Die Vier-Stufen-Methode ist der Klassiker für die Unterweisung am Arbeitsplatz: vorbereiten, vormachen, nachmachen lassen und selbstständig üben.',mu1),
 S(14,'Bei jeder Stufe hast Du eine eigene Aufgabe. Wichtig: Beim Nachmachen erklärt der Mitarbeiter selbst, was er tut. So merkst Du, ob er es verstanden hat.',
  LIST('Was Du in jeder Stufe tust',[['Vorbereiten','1','Platz, Material, Ziel erklären, Vorwissen fragen'],['Vormachen und erklären','2','in kleinen Schritten: was, wie, warum'],['Nachmachen lassen','3','er tut es und erklärt dabei selbst'],['Üben und abschließen','4','allein üben, Du kontrollierst, lobst']])),
 S(13,'Ein gutes Lernziel ist SMART: spezifisch, messbar, attraktiv, realistisch und terminiert.',
  LIST('SMART formulieren',[['spezifisch','S','klar und eindeutig'],['messbar','M','Zahl, Menge oder Zustand prüfbar'],['attraktiv','A','vom Mitarbeiter angenommen'],['realistisch','R','mit seinen Mitteln erreichbar'],['terminiert','T','bis wann?']],{y0:48})),
 S(12,'Vergleiche selbst: „Mach weniger Ausschuss“ kann niemand prüfen. „Ausschuss an Linie 2 von 4 auf 2 Prozent bis Ende März“ schon.',
  VS('Ziel formulieren',{h:'unklar',c:'r',l:['„Mach weniger','Ausschuss.“']},{h:'SMART',c:'g',l:['Ausschuss Linie 2','von 4 % auf 2 %','bis 31. März']},{note:'Nur ein prüfbares Ziel kann man loben.'})),
 S(14,'Bei Beurteilungen schleichen sich typische Fehler ein. Der Halo-Effekt lässt ein Merkmal alles überstrahlen, beim Nikolaus-Effekt zählen nur die letzten Wochen.',
  CARDS('Typische Beurteilungsfehler',[['✨','Halo-Effekt','ein Merkmal zählt alles','y'],['⚖️','Tendenz zur Mitte','nur mittlere Noten','y'],['🎅','Nikolaus-Effekt','nur das Ende zählt','y'],['🙂','Sympathie','mag ich, also gut','y'],['🌗','Milde oder Strenge','zu gut oder zu schlecht','y'],['🔀','Kontrastfehler','Vergleich mit Vorgänger','y']],{cols:2})),
 S(13,'Unterweisen musst Du auch im Arbeitsschutz: vor der ersten Arbeit, bei Änderungen und dann regelmäßig, mindestens einmal im Jahr. Jugendliche halbjährlich.',
  LIST('Unterweisung im Arbeitsschutz',[['vor Beginn der Tätigkeit','ok','§ 12 ArbSchG'],['bei neuen Maschinen, Stoffen, Abläufen','ok','und nach Unfällen'],['mindestens einmal jährlich','ok','DGUV Vorschrift 1'],['Jugendliche: mindestens halbjährlich','ok','§ 29 JArbSchG']],{note:'schriftlich festhalten und unterschreiben lassen'}))],
 skz:[[SKZ(mu1,'Die Vier-Stufen-Methode'),'Die vier Stufen der Unterweisung: vorbereiten, vormachen und erklären, nachmachen lassen, selbstständig üben.']]};

/* ---------- Motivation ---------- */
const mo1=PYR('Bedürfnispyramide nach Maslow',[['Grundbedürfnisse: Essen, Schlaf, Lohn','b'],['Sicherheit: Arbeitsplatz, Gesundheit','b'],['Soziales: Team, Zugehörigkeit','g'],['Wertschätzung: Lob, Status','y'],['Selbstverwirklichung','a']]);
X['Motivation']={
 v:['Ein Mitarbeiter bekommt 5 Prozent mehr Lohn, ist aber bald wieder unzufrieden mit seiner eintönigen Arbeit. Was erklärt das nach Herzberg?',
  ['Die Erhöhung war zu klein.','Lohn ist ein Hygienefaktor: Er verhindert Unzufriedenheit, motiviert aber kaum auf Dauer.','Er ist ein Mensch vom Typ X.','Geld ist der stärkste Motivator.'],1,
  'Nach Herzberg beseitigen Hygienefaktoren wie der Lohn nur Unzufriedenheit. Echte Zufriedenheit kommt von Motivatoren: interessante Arbeit, Verantwortung, Anerkennung. Hier hilft eher Job Enrichment.'],
 ein:[
 S(14,'Maslow ordnet Bedürfnisse in einer Pyramide. Erst wenn die unteren einigermaßen erfüllt sind, werden die oberen wichtig. Die unteren vier heißen Defizitbedürfnisse.',mo1),
 S(14,'Herzberg unterscheidet zwei Arten von Faktoren. Hygienefaktoren verhindern Unzufriedenheit. Motivatoren erzeugen Zufriedenheit und Leistungsbereitschaft.',
  VS('Zwei-Faktoren-Theorie',{h:'Hygienefaktoren',c:'y',l:['Lohn und Gehalt','Arbeitsbedingungen','sicherer Arbeitsplatz','Verhältnis zu Kollegen']},{h:'Motivatoren',c:'g',l:['Anerkennung','Verantwortung','interessante Arbeit','Aufstieg, Erfolg']},{note:'Hygiene verhindert Frust, Motivatoren spornen an.'})),
 S(13,'McGregor beschreibt zwei Menschenbilder. Wer glaubt, Mitarbeiter seien faul, kontrolliert sie und macht sie damit oft erst passiv.',
  VS('Menschenbild nach McGregor',{h:'Theorie X',c:'r',l:['arbeitet ungern','braucht Druck','scheut Verantwortung']},{h:'Theorie Y',c:'g',l:['will etwas leisten','motiviert sich selbst','sucht Verantwortung']},{note:'Das Menschenbild bestätigt sich oft selbst.'})),
 S(12,'Intrinsische Motivation kommt von innen, etwa Freude an der Aufgabe. Extrinsische kommt von außen, etwa Prämien. Von innen hält länger.',
  VS('Woher kommt der Antrieb?',{h:'intrinsisch',c:'g',l:['Freude an der Arbeit','Stolz auf das Ergebnis','Neugier']},{h:'extrinsisch',c:'b',l:['Prämie, Lohn','Lob von außen','Angst vor Strafe']},{note:'Von innen hält länger.'})),
 S(14,'Arbeit lässt sich motivierender gestalten. Beim Job Enlargement kommen gleichartige Aufgaben dazu, beim Job Enrichment mehr Verantwortung, bei der Job Rotation wechselt der Arbeitsplatz.',
  CARDS('Arbeit gestalten',[['↔️','Enlargement','mehr gleichartige Aufgaben','b'],['↕️','Enrichment','dazu planen und prüfen','g'],['🔄','Rotation','Arbeitsplätze wechseln','y']],{note:'Enrichment wirkt nach Herzberg am stärksten.'}))],
 skz:[[SKZ(mo1,'Bedürfnispyramide nach Maslow'),'Die fünf Stufen nach Maslow, von unten nach oben. Die oberste Stufe, die Selbstverwirklichung, ist das Wachstumsbedürfnis.']]};

/* ---------- Führung ---------- */
const TBS=k=>{let s=TITLE('Kontinuum nach Tannenbaum/Schmidt');const N=['autoritär','patriarchalisch','informierend','beratend','kooperativ','delegativ','autonom'];
 s+=OP(ph(k,.04,.2),`<path d="M20 64H460L20 168Z" fill="${MIX('a',22)}" stroke="var(--acc)" stroke-width="2" stroke-linejoin="round"/><path d="M20 168L460 64V168Z" fill="${MIX('b',22)}" stroke="var(--flow)" stroke-width="2" stroke-linejoin="round"/>`)+
  OP(ph(k,.15,.3),TX(30,92,'Spielraum Vorgesetzter',220,'ein3','start',16)+TX(450,156,'Spielraum Gruppe',200,'ein3','end',16));
 N.forEach((n,i)=>{const x=20+(i+.5)*440/7,r=i%2,p=STG(k,7,i,.3,.85);s+=OP(p,`<path d="M${F(x)} 168v${r?34:10}" stroke="var(--mute)" stroke-width="1.5"/>`+TX(x,r?222:196,n,120,'ein2','middle',15))});
 return s+OP(ph(k,.88,.97),TX(240,256,'Je weiter rechts, desto mehr entscheidet das Team.',450,'ein2','middle',15))};
const fu1=LIST('Situativ führen nach Hersey/Blanchard',[['Telling: genau anweisen','S1','kann es nicht und will es (noch) nicht'],['Selling: überzeugen','S2','will, kann es aber noch nicht'],['Participating: beteiligen','S3','kann es, ist aber unsicher'],['Delegating: übertragen','S4','kann es und will es']]);
X['Führung']={
 v:['Ein erfahrener Facharbeiter beherrscht seine Aufgabe sicher und will sie auch erledigen. Welcher Stil passt nach Hersey und Blanchard?',
  ['Telling: genau anweisen','Selling: überzeugen','Participating: beteiligen','Delegating: Aufgabe übertragen'],3,
  'Wer fachlich kann und motiviert ist, hat einen hohen Reifegrad. Hier überträgst Du die Aufgabe und hältst Dich zurück. Engmaschiges Anweisen würde ihn eher bremsen.'],
 ein:[
 S(13,'Kurt Lewin unterscheidet drei Führungsstile: autoritär, kooperativ und laissez-faire. Der kooperative Stil gilt meist als der beste Kompromiss.',
  CARDS('Führungsstile nach Lewin',[['👆','autoritär','Chef entscheidet allein','r'],['🤝','kooperativ','Team wird beteiligt','g'],['🏖️','laissez-faire','jeder macht, was er will','m']])),
 S(14,'Tannenbaum und Schmidt sehen die Stile als Band. Links entscheidet der Vorgesetzte allein, nach rechts wächst der Spielraum der Gruppe bis zur Selbststeuerung.',TBS),
 S(15,'Hersey und Blanchard sagen: Der Stil richtet sich nach dem Reifegrad des Mitarbeiters, also nach Können und Wollen. Je reifer, desto mehr gibst Du ab.',fu1),
 S(12,'Ein neuer Auszubildender braucht klare Anweisungen. Ein erfahrener Geselle braucht Freiraum. Derselbe Chef führt beide unterschiedlich.',
  VS('Gleicher Chef, zwei Stile',{h:'neuer Azubi',c:'y',l:['genau zeigen','eng begleiten','oft Rückmeldung']},{h:'erfahrener Geselle',c:'g',l:['Ziel nennen','Weg offen lassen','Ergebnis prüfen']},{note:'Es gibt keinen besten Stil für alle.'})),
 S(13,'Drei Führungstechniken solltest Du kennen: Führen durch Ziele, durch Delegation und nur bei Ausnahmen.',
  CARDS('Führungstechniken',[['🎯','MbO','Führen durch Ziele','a'],['📤','MbD','durch Delegation','b'],['🚨','MbE','nur bei Ausnahmen','y']],{note:'Management by Objectives, Delegation, Exception'}))],
 skz:[[SKZ(fu1,'Situatives Führen'),'Die vier Stile nach Hersey und Blanchard. Der Reifegrad des Mitarbeiters entscheidet, wie viel Du vorgibst.']]};

/* ---------- Gruppe & Arbeitsorganisation ---------- */
const gr1=STAIRS('Teamphasen nach Tuckman',[['Forming','Orientierung'],['Storming','Konflikte'],['Norming','Regeln'],['Performing','Leistung']],{top:84,lo:'Ohne Storming kein Performing.'});
X['Gruppe & Arbeitsorganisation']={
 v:['Ein neues Team streitet nach zwei Wochen heftig über Zuständigkeiten. Was bedeutet das nach Tuckman?',
  ['Das Team ist gescheitert.','Das ist die normale Storming-Phase, die Du begleiten solltest.','Du musst das Team sofort neu zusammensetzen.','Das Team hat Performing erreicht.'],1,
  'Streit um Rollen und Regeln ist typisch für die Storming-Phase. Moderiere die Konflikte und hilf, Regeln zu finden. Dann kommt das Team in Norming und Performing.'],
 ein:[
 S(13,'Nach Tuckman durchläuft jedes Team Phasen: sich finden, streiten, Regeln finden, leisten. Löst es sich auf, spricht man von Adjourning.',gr1),
 S(15,'In jeder Phase führst Du anders. Am Anfang gibst Du Orientierung, im Sturm moderierst Du, am Ende hältst Du Dich zurück.',
  LIST('Was Du als Meister tust',[['Forming: Kennenlernen','1','Ziele und Aufgaben klar machen'],['Storming: Machtkämpfe','2','Konflikte offen ansprechen, moderieren'],['Norming: Regeln entstehen','3','Absprachen festhalten'],['Performing: Leistung','4','delegieren, Freiraum geben']])),
 S(13,'Formelle Gruppen bildet der Betrieb, etwa eine Schicht. Informelle Gruppen entstehen von selbst, etwa die Raucherrunde. Beide beeinflussen die Arbeit.',
  VS('Zwei Arten von Gruppen',{h:'formell',c:'b',l:['vom Betrieb gebildet','Ziel: Aufgabe','z. B. Schicht, Team']},{h:'informell',c:'g',l:['entsteht von selbst','Ziel: Kontakt','z. B. Fahrgemeinschaft']},{note:'Informelle Gruppen sind oft schneller informiert.'})),
 S(13,'In Gruppen bilden sich Rollen. Der informelle Führer hat Einfluss ohne Titel. Achte auf Außenseiter und darauf, dass niemand zum Sündenbock wird.',
  CARDS('Rollen in der Gruppe',[['⭐','informeller Führer','Einfluss ohne Titel','g'],['🐑','Mitläufer','schließt sich an','m'],['🚪','Außenseiter','gehört nicht dazu','y'],['🎯','Sündenbock','bekommt die Schuld','r']],{cols:2})),
 S(13,'Gruppen bündeln Wissen und helfen sich. Es gibt aber Risiken: Gruppendruck, blinde Einigkeit und Mitglieder, die sich mitziehen lassen.',
  VS('Arbeit in Gruppen',{h:'Chancen',c:'g',l:['Wissen bündeln','gegenseitige Hilfe','Zugehörigkeit']},{h:'Risiken',c:'r',l:['Gruppendruck','blinde Einigkeit','Trittbrettfahrer']})),
 S(13,'Bei teilautonomer Gruppenarbeit plant und verteilt das Team die Arbeit selbst und prüft die Qualität. Ein Gruppensprecher hält Kontakt zum Meister.',
  LIST('Teilautonome Gruppe',[['plant und verteilt die Arbeit selbst','ok'],['prüft die eigene Qualität','ok'],['wählt einen Gruppensprecher','ok'],['Du gibst Ziele und Rahmen vor','🎯']]))],
 skz:[[SKZ(gr1,'Teamphasen nach Tuckman'),'Forming, Storming, Norming, Performing: So wächst ein Team zusammen.']]};

/* ---------- Konflikte lösen ---------- */
const GL=k=>{let s=TITLE('Eskalation nach Glasl');const C=['g','g','g','y','y','y','r','r','r'];
 for(let i=0;i<9;i++){const x=24+i*48,y=76+i*18,p=STG(k,9,i,.05,.7);s+=OP(p,RC(x,y,44,250-y,MIX(C[i],14+(i%3)*8),CC(C[i]),6,1.5)+TX(x+22,y+22,String(i+1),40,'ein3','middle',18))}
 [['win-win',0,'g'],['win-lose',3,'y'],['lose-lose',6,'r']].forEach((g,j)=>{s+=OP(ph(k,.3+j*.2,.42+j*.2),TX(24+g[1]*48+70,64+g[1]*18,g[0],140,'ein3','middle',16,`fill:${CC(g[2])}`))});
 return s+OP(ph(k,.88,.97),TX(240,266,'Je tiefer, desto eher braucht es Hilfe von außen.',450,'ein2','middle',15))};
X['Konflikte lösen']={
 v:['Zwei Schichtführer reden nur noch über Dritte miteinander und drohen sich gegenseitig mit Abmahnungen. Wo stehen sie nach Glasl ungefähr?',
  ['Stufe 1 bis 3: beide können noch gewinnen','Stufe 4 bis 6: einer soll verlieren','Stufe 7 bis 9: beide gehen unter','Das ist noch kein Konflikt.'],1,
  'Koalitionen und Drohungen gehören zur zweiten Phase, Drohstrategien sind Stufe 6. Hier schaffen es die beiden kaum noch allein. Du solltest moderieren oder einen Mediator hinzuziehen.'],
 ein:[
 S(14,'Konflikte haben verschiedene Ursachen. Beim Zielkonflikt wollen beide Verschiedenes, beim Beurteilungskonflikt dasselbe auf anderem Weg, beim Verteilungskonflikt geht es um knappe Mittel.',
  CARDS('Konfliktarten',[['🎯','Zielkonflikt','wollen Verschiedenes','b'],['🛣️','Beurteilungskonflikt','anderer Weg zum Ziel','b'],['🍰','Verteilungskonflikt','Wer bekommt was?','b'],['💔','Beziehungskonflikt','wir mögen uns nicht','r'],['🎭','Rollenkonflikt','zwei Erwartungen','y'],['⚖️','Wertekonflikt','Was ist richtig?','y']],{cols:2})),
 S(14,'Friedrich Glasl beschreibt neun Stufen der Eskalation. Es geht abwärts: erst können beide gewinnen, dann soll einer verlieren, am Ende verlieren beide.',GL),
 S(14,'Die Stufen im Einzelnen: Verhärtung, Debatte, Taten statt Worte. Dann Koalitionen, Gesichtsverlust, Drohungen. Am Ende Vernichtungsschläge, Zersplitterung, gemeinsam in den Abgrund.',
  LIST('Drei Phasen',[['1 bis 3: Verhärtung, Debatte, Taten','ok','win-win: selbst lösbar'],['4 bis 6: Koalitionen, Gesichtsverlust, Drohung','⚠️','win-lose: Moderation, Mediation'],['7 bis 9: Schläge, Zersplitterung, Abgrund','no','lose-lose: Machteingriff nötig']],{h:58,y0:60})),
 S(14,'Thomas und Kilmann zeigen fünf Arten, mit Konflikten umzugehen. Sie unterscheiden, wie stark jemand sich durchsetzt und wie stark er auf den anderen eingeht.',
  GRID('Konfliktstile nach Thomas/Kilmann','Kooperation: auf den anderen eingehen →','Durchsetzung →',[[.22,.85,'Konkurrieren','r'],[.78,.85,'Zusammenarbeiten','g'],[.5,.5,'Kompromiss','y'],[.22,.15,'Vermeiden','m'],[.78,.15,'Entgegenkommen','b']])),
 S(14,'Ein Konfliktgespräch bereitest Du vor. Jede Seite schildert ihre Sicht, dann sammelt Ihr Lösungen und haltet fest, wer was bis wann tut.',
  LIST('Konfliktgespräch führen',[['vorbereiten: Fakten, Ort, Zeit','1'],['beide Sichtweisen hören','2','ausreden lassen, zusammenfassen'],['Lösungen gemeinsam sammeln','3'],['vereinbaren und nachhalten','4','wer, was, bis wann']])),
 S(13,'Bei festgefahrenen Konflikten hilft Mediation. Ein neutraler Dritter leitet das Gespräch, entscheidet aber nicht. Die Lösung finden die Beteiligten selbst.',
  CARDS('Mediation',[['⚖️','neutral','Mediator entscheidet nicht','b'],['🙋','freiwillig','beide wollen es','g'],['🤐','vertraulich','bleibt im Raum','y']],{note:'Die Lösung erarbeiten die Beteiligten selbst.'}))],
 skz:[[SKZ(GL,'Eskalationsstufen nach Glasl'),'Die neun Stufen nach Glasl in drei Phasen: win-win, win-lose, lose-lose.']]};

/* ---------- Personalplanung & -auswahl ---------- */
const pp1=VS('Fragen im Vorstellungsgespräch',{h:'erlaubt',c:'g',l:['Ausbildung, Abschlüsse','Berufserfahrung','Führerschein, wenn nötig','Vorstrafen mit Bezug']},{h:'unzulässig',c:'r',l:['Schwangerschaft','Religion, Partei','Gewerkschaft','Familienplanung']},{note:'Bei unzulässigen Fragen darf gelogen werden.'});
X['Personalplanung & -auswahl']={
 v:['Im Vorstellungsgespräch fragst Du eine Bewerberin, ob sie schwanger ist. Sie sagt Nein, obwohl sie schwanger ist. Was folgt daraus?',
  ['Du kannst den Arbeitsvertrag anfechten.','Nichts: Die Frage war unzulässig, sie durfte lügen.','Sie muss Schadenersatz zahlen.','Der Vertrag ist automatisch nichtig.'],1,
  'Die Frage nach einer Schwangerschaft ist unzulässig. Auf eine unzulässige Frage darf die Bewerberin die Unwahrheit sagen, ohne dass Du anfechten kannst. Nur eine Lüge auf eine zulässige Frage berechtigt zur Anfechtung wegen arglistiger Täuschung nach § 123 BGB.'],
 ein:[
 S(15,'Der Nettopersonalbedarf zeigt, wie viele Leute Du wirklich suchen musst. Beispiel: Soll 50, Ist 46, drei gehen in Rente, ein Azubi wird übernommen. Gesucht sind 6.',
  CALC('Nettopersonalbedarf','Soll 50, Ist 46, Abgänge 3, Zugänge 1',[['Netto = Soll − (Ist − Abgänge + Zugänge)'],['Netto = 50 − (46 − 3 + 1)'],['Netto = 50 − 44 = 6 Mitarbeiter']])),
 S(14,'Die Auswahl läuft in Schritten. Grundlage ist das Anforderungsprofil. Die Stellenanzeige muss neutral sein, also ohne Alter oder Geschlecht.',
  LIST('Personal auswählen',[['Anforderungsprofil erstellen','1','Was muss die Person können?'],['Stelle ausschreiben','2','neutral nach AGG, mit (m/w/d)'],['Unterlagen sichten','3','Vorauswahl nach Profil'],['Gespräch, Probearbeit, Test','4'],['entscheiden, Betriebsrat beteiligen','5']],{y0:48})),
 S(13,'Im Gespräch darfst Du nur fragen, was mit der Stelle zu tun hat. Fragen nach Schwangerschaft, Religion oder Gewerkschaft sind unzulässig.',pp1),
 S(14,'Auf eine unzulässige Frage darf der Bewerber lügen. Lügt er dagegen auf eine zulässige Frage, kannst Du den Vertrag wegen arglistiger Täuschung anfechten.',
  FLOW('Recht zur Lüge',[['❓','unzulässige','Frage','r'],['🤥','Lüge ist','erlaubt','y'],['📄','keine','Anfechtung','g']],{note:'Lüge auf zulässige Frage:',note2:'Anfechtung nach § 123 BGB möglich'})),
 S(13,'Das Allgemeine Gleichbehandlungsgesetz verbietet Benachteiligung wegen sechs Merkmalen. Wer benachteiligt wird, kann Entschädigung verlangen.',
  CARDS('Geschützt nach § 1 AGG',[['','Herkunft','ethnisch','b'],['','Geschlecht','','b'],['','Religion','Weltanschauung','b'],['','Behinderung','','b'],['','Alter','jung und alt','b'],['','sexuelle Identität','','b']],{cols:3,note:'Ansprüche innerhalb von zwei Monaten schriftlich'})),
 S(13,'In Unternehmen mit mehr als 20 wahlberechtigten Arbeitnehmern muss der Betriebsrat jeder Einstellung zustimmen. Er hat eine Woche Zeit.',
  LIST('§ 99 BetrVG',[['mehr als 20 wahlberechtigte Arbeitnehmer','§','im Unternehmen'],['Einstellung, Versetzung, Ein- und Umgruppierung','ok','brauchen Zustimmung'],['Widerspruch binnen einer Woche','⏱️','schriftlich, mit Grund'],['Schweigt er, gilt die Zustimmung','ok','als erteilt']]))],
 skz:[[SKZ(pp1,'Erlaubte und unzulässige Fragen'),'Im Vorstellungsgespräch zählt, was mit der Stelle zu tun hat. Persönliches wie Schwangerschaft oder Religion ist tabu.']]};

/* ---------- Gesundheit, Fehlzeiten & Inklusion ---------- */
const gf1=LIST('Betriebliches Eingliederungsmanagement',[['mehr als 6 Wochen krank in 12 Monaten','6W','am Stück oder zusammengezählt'],['Arbeitgeber muss BEM anbieten','§','§ 167 Abs. 2 SGB IX'],['Teilnahme ist freiwillig','ok','der Mitarbeiter darf ablehnen'],['Ziel: Arbeitsplatz erhalten','🎯','Hilfen, Umbau, andere Aufgaben']]);
X['Gesundheit, Fehlzeiten & Inklusion']={
 v:['Ein Mitarbeiter war in den letzten 12 Monaten dreimal je drei Wochen krank. Was musst Du als Arbeitgeber tun?',
  ['Nichts, das ist seine Privatsache.','Ihm ein Betriebliches Eingliederungsmanagement anbieten.','Ihn abmahnen.','Ihm sofort kündigen.'],1,
  'Neun Wochen in zwölf Monaten sind mehr als sechs Wochen. Damit muss der Arbeitgeber ein BEM anbieten. Der Mitarbeiter entscheidet selbst, ob er teilnimmt.'],
 ein:[
 S(14,'Die Fehlzeitenquote setzt die Fehltage ins Verhältnis zu den Soll-Arbeitstagen. 264 Fehltage bei 20 Mitarbeitern mit je 220 Tagen sind 6 Prozent.',
  CALC('Fehlzeitenquote','20 Mitarbeiter, je 220 Soll-Arbeitstage, 264 Fehltage',[['Quote = ',{n:'Fehltage',d:'Soll-Arbeitstage'},' · 100 %'],['Quote = ',{n:'264 Tage',d:'20 · 220 Tage'},' · 100 % = 6 %']],'Vergleiche mit Vorjahr und Branche.')),
 S(13,'Zähle die Krankheitszeiten der letzten zwölf Monate zusammen. Dreimal drei Wochen sind neun Wochen, also mehr als sechs.',
  TL('Zwölf Monate zusammengezählt',{y:170,ticks:[[0,'Jan'],[.5,'Jul'],[1,'Dez']],spans:[[.06,.24,'3 Wochen','y'],[.4,.58,'3 Wochen','y'],[.74,.92,'3 Wochen','r']],note:'9 Wochen: mehr als 6, also BEM anbieten'})),
 S(14,'Das BEM ist Pflicht für den Arbeitgeber, aber freiwillig für den Mitarbeiter. Beteiligt werden Betriebsrat, Betriebsarzt und bei Bedarf die Schwerbehindertenvertretung.',gf1),
 S(13,'Nach jeder Krankheit hilft ein kurzes Rückkehrgespräch. Es zeigt Interesse und klärt, was der Mitarbeiter braucht. Nach der Diagnose fragst Du nicht.',
  VS('Rückkehrgespräch',{h:'so ja',c:'g',l:['Willkommen zurück','Wie geht es Dir?','Was hat sich geändert?','Was brauchst Du?']},{h:'so nicht',c:'r',l:['nach Diagnose fragen','Vorwürfe machen','vor anderen führen']})),
 S(14,'Bei Suchtproblemen hilft ein Stufenplan. Er beginnt mit einem Fürsorgegespräch und wird mit jeder Stufe verbindlicher, bis hin zu arbeitsrechtlichen Folgen.',
  STAIRS('Stufenplan bei Sucht',[['Gespräch','Fürsorge'],['2. Gespräch','mit Betriebsrat'],['3. Gespräch','Hilfe, Auflagen'],['4. Gespräch','Abmahnung'],['5. Stufe','Kündigung']],{top:96,lo:'Ziel ist Hilfe, nicht Strafe.'})),
 S(14,'Schwerbehindert ist, wer einen Grad der Behinderung von mindestens 50 hat. Betriebe ab 20 Arbeitsplätzen müssen 5 Prozent davon besetzen oder eine Ausgleichsabgabe zahlen.',
  LIST('Inklusion schwerbehinderter Menschen',[['schwerbehindert ab GdB 50','ok'],['Pflichtquote 5 Prozent','📊','ab 20 Arbeitsplätzen, sonst Ausgleichsabgabe'],['5 Tage Zusatzurlaub','🏖️','§ 208 SGB IX'],['Kündigung nur mit Zustimmung','§','des Integrationsamts']]))],
 skz:[[SKZ(gf1,'Betriebliches Eingliederungsmanagement'),'Wann ein BEM angeboten werden muss und was es soll.']]};

/* ---------- Beurteilung & Potenzialerkennung ---------- */
const NINE=k=>{const x0=110,y0=52,cw=112,ch=60,L=[['Rohdiamant','Aufsteiger','Top-Talent'],['Fragezeichen','Kernteam','Leistungs-träger'],['Problemfall','solide','Spezialist']],
 C=[['b','g','g'],['y','b','g'],['r','y','b']];let s=TITLE('9-Felder-Matrix');
 s+=OP(ph(k,0,.12),`<g transform="translate(74 ${y0+1.5*ch}) rotate(-90)">${TX(0,0,'Potenzial →',170,'ein2','middle',15)}</g>`+TX(x0+1.5*cw,y0+3*ch+30,'Leistung →',300,'ein2','middle',15));
 L.forEach((r,i)=>r.forEach((t,j)=>{const x=x0+j*cw,y=y0+i*ch,p=STG(k,9,i*3+j,.1,.85),w=t.split('-');
  s+=POP(x+cw/2,y+ch/2,p,RC(x+3,y+3,cw-6,ch-6,MIX(C[i][j],16),CC(C[i][j]),8,1.5)+(w.length>1?TX(x+cw/2,y+ch/2-3,w[0]+'-',cw-14,'ein3','middle',15)+TX(x+cw/2,y+ch/2+16,w[1],cw-14,'ein3','middle',15):TX(x+cw/2,y+ch/2+6,t,cw-14,'ein3','middle',15)))}));
 return s};
const STAR=(ti,mid,A)=>k=>{let s=TITLE(ti);const P=[[240,72],[90,150],[390,150],[240,228]];
 s+=POP(240,150,ph(k,.02,.15),RC(180,128,120,44,MIX('a',20),'var(--acc)',12,2.2)+TX(240,156,mid,110,'ein3','middle',16));
 A.forEach((a,i)=>{const [x,y]=P[i],p=STG(k,4,i,.15,.8),w=i===1||i===2?120:150;
  s+=OP(p,RC(x-w/2,y-20,w,40,'var(--card)',CC(a[1]),10,2)+TX(x,y+6,a[0],w-12,'ein3','middle',15));
  s+=i===0?ARp(240,94,240,124,p,'var(--mute)',2):i===3?ARp(240,206,240,176,p,'var(--mute)',2):i===1?ARp(152,150,176,150,p,'var(--mute)',2):ARp(328,150,304,150,p,'var(--mute)',2)});
 return s};
X['Beurteilung & Potenzialerkennung']={
 v:['Ein Mitarbeiter liefert sehr gute Arbeit, will und kann aber keine weitere Verantwortung übernehmen. Wo steht er in der 9-Felder-Matrix?',
  ['hohe Leistung, niedriges Potenzial','hohe Leistung, hohes Potenzial','niedrige Leistung, hohes Potenzial','niedrige Leistung, niedriges Potenzial'],0,
  'Er ist ein Spezialist: stark in seiner Aufgabe, aber ohne Ziel nach oben. Solche Leute hältst Du mit Anerkennung und fachlicher Entwicklung, nicht mit einer Führungsrolle.'],
 ein:[
 S(13,'Es gibt Regelbeurteilungen, etwa jährlich, und Anlassbeurteilungen, etwa am Ende der Probezeit. Gebundene Beurteilungen nutzen feste Kriterien und eine Skala.',
  CARDS('Arten der Beurteilung',[['📅','Regelbeurteilung','z. B. jährlich','b'],['📌','Anlassbeurteilung','Probezeit, Versetzung, Zeugnis','b'],['✍️','frei','Text ohne Vorgaben','y'],['📋','gebunden','Kriterien und Skala','g']],{cols:2})),
 S(13,'Eine faire Beurteilung braucht Beobachtung über das ganze Jahr. Dann beurteilst Du nach Kriterien und besprichst das Ergebnis mit dem Mitarbeiter.',
  FLOW('Ablauf',[['👀','beobachten','das ganze Jahr','b'],['📝','beurteilen','nach Kriterien','a'],['💬','besprechen','Gespräch, Ziele','g']],{note:'Der Mitarbeiter hat ein Recht auf Erörterung.',note2:'§ 82 Abs. 2 BetrVG'})),
 S(13,'Beim 360-Grad-Feedback kommt die Rückmeldung von allen Seiten: vom Vorgesetzten, von Kollegen, Kunden und eigenen Mitarbeitern. Dazu kommt das Selbstbild.',
  STAR('360-Grad-Feedback','Selbstbild',[['Vorgesetzter','a'],['Kollegen','b'],['Kunden','y'],['eigene Mitarbeiter','g']])),
 S(14,'Die 9-Felder-Matrix ordnet Mitarbeiter nach Leistung heute und Potenzial für morgen. Oben rechts stehen die Top-Talente, unten links ist Handlungsbedarf.',NINE),
 S(13,'Gelernt wird vor allem bei der Arbeit. Die 70-20-10-Regel sagt: 70 Prozent durch Aufgaben, 20 durch andere Menschen, nur 10 durch Kurse.',
  BARS('70-20-10-Regel',[['Aufgaben',70,'70 % bei der Arbeit','a'],['Menschen',20,'20 % Feedback, Mentor','b'],['Kurse',10,'10 % Seminare','y']],{max:70,lx:110,W:150,h:50,y0:70,note:'Plane Entwicklung vor allem über Aufgaben.'})),
 S(13,'Der Betriebsrat bestimmt bei Beurteilungsgrundsätzen und Personalfragebögen mit. Der Mitarbeiter darf in seine Personalakte sehen.',
  LIST('Rechte und Mitbestimmung',[['Beurteilungsgrundsätze','§','Betriebsrat bestimmt mit, § 94 BetrVG'],['Personalfragebögen','§','ebenfalls nur mit Zustimmung'],['Einsicht in die Personalakte','ok','§ 83 BetrVG'],['Beurteilung erklären lassen','ok','§ 82 BetrVG']]))],
 skz:[[SKZ(NINE,'9-Felder-Matrix'),'Leistung und Potenzial im Überblick: oben rechts Top-Talente, unten links Problemfälle.']]};

/* ---------- Führungsmethoden, Delegation & Zielvereinbarung ---------- */
const TRI=k=>{let s=TITLE('Kongruenzprinzip');const P=[[240,82,'Aufgabe','Was ist zu tun?','b'],[110,214,'Kompetenz','Was darf ich?','g'],[370,214,'Verantwortung','Wofür stehe ich ein?','a']];
 s+=OP(ph(k,.35,.55),`<path d="M240 108L130 188M240 108L350 188M186 214H294" stroke="var(--mute)" stroke-width="2" fill="none"/>`);
 P.forEach((c,i)=>{s+=POP(c[0],c[1],STG(k,3,i,.04,.4),RC(c[0]-78,c[1]-26,156,52,MIX(c[4],16),CC(c[4]),12,2.2)+TX(c[0],c[1]-3,c[2],146,'ein3','middle',17)+TX(c[0],c[1]+17,c[3],146,'ein2','middle',14))});
 return s+POP(240,170,ph(k,.6,.72),TX(240,176,'=',60,'ein1','middle',34))+OP(ph(k,.84,.95),TX(240,262,'Alle drei müssen zueinander passen.',450,'ein2','middle',15))};
X['Führungsmethoden, Delegation & Zielvereinbarung']={
 v:['Du überträgst einem Vorarbeiter die Schichtplanung. Schichten tauschen darf er aber nicht, das musst immer Du freigeben. Was ist verletzt?',
  ['das Kongruenzprinzip: Aufgabe und Befugnis passen nicht zusammen','die Fürsorgepflicht','gar nichts, das ist üblich','Management by Exception'],0,
  'Wer eine Aufgabe übernimmt, braucht auch die Befugnisse dafür und trägt dann die Verantwortung. Ohne das Recht zum Tauschen kann er die Schichtplanung nicht wirklich leisten.'],
 ein:[
 S(13,'Beim Delegieren müssen Aufgabe, Kompetenz und Verantwortung zusammenpassen. Das nennt man Kongruenzprinzip.',TRI),
 S(14,'Delegieren heißt nicht abschieben. Die Führungsverantwortung bleibt bei Dir: richtige Person, gute Anleitung, Kontrolle. Die Handlungsverantwortung geht über.',
  VS('Wer trägt was?',{h:'bleibt bei Dir',c:'a',l:['Auswahl der Person','Anleitung, Information','Kontrolle']},{h:'geht über',c:'g',l:['Durchführung','richtige Ausführung','Ergebnis der Aufgabe']},{note:'Führungs- und Handlungsverantwortung'})),
 S(13,'Einige Aufgaben gibst Du nicht ab: Ziele setzen, Mitarbeiter beurteilen, Personalentscheidungen und besonders vertrauliche oder riskante Dinge.',
  LIST('Nicht delegierbar',[['Ziele für das Team setzen','no','Führungsaufgabe'],['Mitarbeiter beurteilen','no','auch Gehaltsfragen'],['Personalentscheidungen','no','Einstellung, Abmahnung'],['vertrauliche oder sehr riskante Aufgaben','no']])),
 S(13,'So delegierst Du richtig: Aufgabe und Ziel klar beschreiben, die passende Person wählen, Befugnisse mitgeben und Rückmeldung vereinbaren.',
  LIST('Richtig delegieren',[['Aufgabe und Ziel klar beschreiben','1'],['passende Person auswählen','2','Können und Wollen'],['Befugnisse und Mittel mitgeben','3'],['Rückmeldung vereinbaren, kontrollieren','4']])),
 S(14,'Eine Zielvereinbarung ist ein Kreislauf: Ziele gemeinsam vereinbaren, selbstständig umsetzen, zwischendurch nachfragen und am Ende bewerten.',
  CYC('Zielvereinbarung',[['vereinbaren','SMART','a'],['umsetzen','selbstständig','b'],['nachfragen','Zwischenstand','y'],['bewerten','Gespräch','g']],{cy:160,sy:.9})),
 S(12,'Vereinbarte Ziele werden eher angenommen als vorgegebene. Vorgaben sind schneller, bringen aber weniger Einsatz.',
  VS('Ziele finden',{h:'vereinbart',c:'g',l:['gemeinsam erarbeitet','hohe Akzeptanz','mehr Einsatz']},{h:'vorgegeben',c:'y',l:['schnell','klar von oben','weniger Akzeptanz']}))],
 skz:[[SKZ(TRI,'Kongruenzprinzip'),'Aufgabe, Kompetenz und Verantwortung müssen beim Delegieren zusammenpassen.']]};

/* ---------- Fragetechniken & Fehlerkultur ---------- */
const NET=k=>{const n=5,cx=124,cy=156,R=78,P=[...Array(n)].map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+R*Math.cos(a),cy+R*Math.sin(a)]});let s=TITLE('Kommunikationskanäle'),e=0;
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){s+=OP(STG(k,10,e,.12,.6),`<path d="M${F(P[i][0])} ${F(P[i][1])}L${F(P[j][0])} ${F(P[j][1])}" stroke="var(--flow)" stroke-width="2"/>`);e++}
 P.forEach((p,i)=>{s+=POP(p[0],p[1],ph(k,.02+i*.02,.1+i*.02),`<circle cx="${F(p[0])}" cy="${F(p[1])}" r="15" fill="var(--acc)"/>`+TX(p[0],p[1]+6,String(i+1),24,'einw','middle',15,'font-weight:700'))});
 return s+OP(ph(k,.62,.75),FORM(340,130,['K = ',{n:'n · (n − 1)',d:'2'}],'middle'))+OP(ph(k,.78,.9),FORM(340,200,['K = ',{n:'5 · 4',d:'2'},' = 10'],'middle'))};
X['Fragetechniken & Fehlerkultur']={
 v:['„Du hast doch sicher auch gemerkt, dass die neue Regel Unsinn ist?“ Welche Frageart ist das?',
  ['offene Frage','Alternativfrage','Suggestivfrage','Kontrollfrage'],2,
  'Die Frage legt die Antwort schon in den Mund. Das ist eine Suggestivfrage. Im Mitarbeitergespräch solltest Du sie meiden, weil Du so keine ehrliche Meinung erfährst.'],
 ein:[
 S(14,'Offene Fragen beginnen mit einem W-Wort und laden zum Erzählen ein. Geschlossene Fragen lassen nur Ja oder Nein zu. Suggestivfragen geben die Antwort vor.',
  LIST('Fragearten',[['offen: „Wie lief die Schicht?“','💬','W-Frage, lädt zum Erzählen ein'],['geschlossen: „Ist die Anlage fertig?“','✔️','nur Ja oder Nein'],['Alternative: „Früh oder spät?“','🔀','Auswahl aus zwei Möglichkeiten'],['suggestiv: „Du findest doch auch …?“','no','gibt die Antwort vor, meiden']])),
 S(13,'Aktives Zuhören heißt: zugewandt zuhören, mit eigenen Worten wiederholen und nachfragen. So merkt der andere, dass er verstanden wird.',
  CARDS('Aktiv zuhören',[['👂','zuhören','Blickkontakt, nicken','b'],['🔁','spiegeln','„Du meinst …“','g'],['❓','nachfragen','„Wie genau?“','y']])),
 S(14,'Mit jeder Person im Team wächst die Zahl der Verbindungen stark. Bei fünf Personen gibt es schon zehn Kanäle, über die etwas verloren gehen kann.',NET),
 S(13,'Bei zehn Personen sind es schon 45 Kanäle. Doppelt so viele Leute bedeuten also mehr als viermal so viele Wege für Missverständnisse.',
  CALC('Größeres Team','Team mit 10 statt 5 Personen',[['K = ',{n:'n · (n − 1)',d:'2'}],['K = ',{n:'10 · 9',d:'2'},' = 45 Kanäle']],'Klare Infowege werden wichtiger.')),
 S(13,'In einer Schuldkultur werden Fehler versteckt. In einer Lernkultur werden sie gemeldet und genutzt, damit sie nicht wieder passieren.',
  VS('Umgang mit Fehlern',{h:'Schuldkultur',c:'r',l:['Wer war das?','Fehler verstecken','Angst']},{h:'Lernkultur',c:'g',l:['Wie kam es dazu?','Fehler melden','daraus lernen']},{note:'Gemeldete Fehler sind billige Fehler.'})),
 S(12,'Psychologische Sicherheit heißt: Jeder kann Fragen stellen und Fehler zugeben, ohne bloßgestellt zu werden. Du schaffst sie, indem Du selbst eigene Fehler offen ansprichst.',
  BIG('Psychologische Sicherheit',[['„Hier darf ich fragen','ein3',22],['und Fehler zugeben.“','ein3',22],['Du gehst voran: eigene Fehler offen ansprechen','ein2',17]],{y0:112}))],
 skz:[[SKZ(NET,'Kommunikationskanäle im Team'),'Mit fünf Personen gibt es zehn Kanäle: n mal (n minus 1) durch 2.']]};

/* ---------- Betriebsklima & Mitarbeiterbindung ---------- */
const bk1=CARDS('Warnzeichen für schlechtes Klima',[['🚪','Fluktuation','mehr Kündigungen','r'],['🤒','Fehlzeiten','öfter krank','r'],['📣','Beschwerden','mehr Ärger','y'],['🩹','Unfälle','mehr Unachtsamkeit','y'],['🗑️','Ausschuss','mehr Fehler','y'],['💡','Vorschläge','kaum noch Ideen','b']],{cols:2});
X['Betriebsklima & Mitarbeiterbindung']={
 v:['Woran erkennst Du am ehesten, dass sich das Betriebsklima verschlechtert?',
  ['steigende Fluktuation und Fehlzeiten','neue Maschinen in der Halle','mehr Aufträge','höherer Umsatz'],0,
  'Das Betriebsklima selbst kann man nicht direkt messen. Steigen Kündigungen, Fehlzeiten und Beschwerden, ist das ein deutliches Warnzeichen.'],
 ein:[
 S(13,'Das Betriebsklima zeigt sich an Kennzahlen. Steigen Fluktuation, Fehlzeiten, Beschwerden oder Unfälle, solltest Du genau hinsehen.',bk1),
 S(14,'Die Fluktuationsquote setzt die Kündigungen durch Mitarbeiter ins Verhältnis zum durchschnittlichen Personalbestand. 9 von 120 sind 7,5 Prozent.',
  CALC('Fluktuationsquote','Ø 120 Mitarbeiter, 9 Eigenkündigungen im Jahr',[['F = ',{n:'Abgänge',d:'Ø Personalbestand'},' · 100 %'],['F = ',{n:'9',d:'120'},' · 100 % = 7,5 %']],'Jeder Abgang kostet Geld und Wissen.')),
 S(13,'Jede Kündigung kostet: Die Stelle muss besetzt werden, der Neue wird eingearbeitet, am Anfang passieren mehr Fehler und Wissen geht verloren.',
  LIST('Was ein Abgang kostet',[['Stellenanzeige, Auswahl','💶'],['Einarbeitung','🧑‍🏫','Kollegen und Meister sind gebunden'],['mehr Fehler am Anfang','🗑️'],['Wissen geht verloren','🧠','was nicht aufgeschrieben ist']])),
 S(14,'Bindung beginnt vor dem ersten Arbeitstag. Ein gutes Onboarding mit Paten, Einarbeitungsplan und Gesprächen senkt Frühkündigungen.',
  LIST('Gutes Onboarding',[['vor dem ersten Tag','1','Arbeitsplatz, Zugänge, Plan bereit'],['erster Tag','2','Begrüßung, Pate, Rundgang'],['erste Wochen','3','Einarbeitungsplan, Feedback'],['Ende der Probezeit','4','Gespräch: Wie geht es weiter?']])),
 S(13,'Mitarbeiter bleiben, wenn sie sich entwickeln können, Anerkennung und faire Bezahlung bekommen. Schlechte Führung ist der häufigste Grund zu gehen.',
  VS('Bleiben oder gehen?',{h:'bindet',c:'g',l:['Entwicklung','Anerkennung','faire Bezahlung','gutes Team']},{h:'vertreibt',c:'r',l:['schlechte Führung','keine Perspektive','Dauerüberlastung']})),
 S(12,'Eine Mitarbeiterbefragung zeigt, wo es hakt. Sie muss anonym sein, und Du musst die Ergebnisse zurückmelden und Maßnahmen folgen lassen.',
  FLOW('Mitarbeiterbefragung',[['📝','anonym','befragen','b'],['📢','Ergebnis','zurückmelden','y'],['🛠️','Maßnahmen','umsetzen','g']],{note:'Ohne Maßnahmen schadet die Befragung.'}))],
 skz:[[SKZ(bk1,'Warnzeichen für das Betriebsklima'),'Diese Kennzahlen zeigen, wenn das Klima kippt.']]};

/* ---------- Der Einzelne im Betrieb ---------- */
const de1=FLOW('Wo beschweren?',[['🏢','Arbeitgeber','§ 84 BetrVG','b'],['👥','Betriebsrat','§ 85 BetrVG','g'],['📮','AGG-Stelle','§ 13 AGG','y']],{note:'Wer sich beschwert, darf keine Nachteile haben.'});
X['Der Einzelne im Betrieb']={
 v:['Eine Mitarbeiterin wird seit Monaten von Kollegen systematisch ausgegrenzt und lächerlich gemacht. Wo kann sie sich beschweren?',
  ['nirgends, das ist Privatsache','beim Arbeitgeber und beim Betriebsrat','nur bei der Polizei','nur beim Arbeitsgericht'],1,
  'Sie kann sich beim Arbeitgeber beschweren (§ 84 BetrVG) und den Betriebsrat einschalten (§ 85 BetrVG). Geht es um Benachteiligung nach dem AGG, gibt es zusätzlich die Beschwerdestelle nach § 13 AGG. Der Arbeitgeber muss handeln.'],
 ein:[
 S(13,'Menschen bringen je nach Lebensphase andere Bedürfnisse mit. Junge wollen lernen, in der Familienphase zählt Planbarkeit, Ältere bringen viel Erfahrung mit.',
  CARDS('Lebensphasen im Beruf',[['🌱','Berufsstart','lernen, ausprobieren','b'],['🏡','Familienphase','planbare Zeiten','g'],['🧭','Erfahrene','Wissen weitergeben','y']],{note:'Jede Phase braucht eine andere Führung.'})),
 S(13,'Erwachsene lernen anders als Schüler. Sie wollen an ihre Erfahrung anknüpfen, das Gelernte sofort anwenden und mitbestimmen. Ältere lernen nicht schlechter, nur anders.',
  LIST('Wie Erwachsene lernen',[['an Erfahrung anknüpfen','ok'],['praxisnah, sofort anwendbar','ok'],['selbst mitbestimmen','ok'],['Ältere lernen anders, nicht schlechter','ok','mehr Zeit, mehr Zusammenhang']])),
 S(13,'Mobbing ist mehr als ein Streit. Es sind gezielte Angriffe gegen eine Person, systematisch und über längere Zeit.',
  CARDS('Was ist Mobbing?',[['🔁','systematisch','immer wieder','r'],['📅','lange','über Monate','r'],['🎯','gezielt','gegen eine Person','r']],{note:'Ein einzelner Streit ist noch kein Mobbing.'})),
 S(14,'Das AGG kennt vier Formen der Benachteiligung. Mittelbar heißt: Eine neutrale Regel trifft eine Gruppe besonders, etwa schlechtere Bedingungen für alle Teilzeitkräfte.',
  LIST('Benachteiligung nach § 3 AGG',[['unmittelbar','1','offen schlechter behandelt'],['mittelbar','2','neutrale Regel trifft eine Gruppe'],['Belästigung','3','Würde verletzt, z. B. Spott'],['sexuelle Belästigung','4','unerwünschtes sexuelles Verhalten']])),
 S(13,'Der Arbeitgeber muss vorbeugen und eingreifen. Er schult, stoppt Benachteiligung mit Abmahnung, Versetzung oder Kündigung und richtet eine Beschwerdestelle ein.',
  LIST('Pflichten des Arbeitgebers, § 12 AGG',[['vorbeugen und schulen','ok'],['bei Verstößen eingreifen','ok','Abmahnung, Versetzung, Kündigung'],['Beschwerdestelle einrichten','ok','§ 13 AGG'],['schützen, wer sich beschwert','ok','Maßregelungsverbot']])),
 S(13,'Beschweren kann man sich beim Arbeitgeber, beim Betriebsrat und bei der Beschwerdestelle nach dem AGG. Nachteile wegen einer Beschwerde sind verboten.',de1)],
 skz:[[SKZ(de1,'Beschwerdewege'),'Drei Wege für eine Beschwerde. Niemand darf benachteiligt werden, weil er sich beschwert.']]};

if(typeof tab!=='undefined'&&FACH.includes(tab))go(tab)})();
