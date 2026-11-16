# Übergabe Meisterlabor (Stand 15.11.2026)

Diese Datei ist der Startpunkt für das eigene Projekt „Meisterlabor“. Sie fasst alles zusammen, was bisher im Projekt „Lernlabor v2“ dazu entstanden ist. Ein neuer Claude-Thread soll damit ohne Rückfragen weiterarbeiten können.

## 1. Kurz zusammengefasst

- **Zweck:** Lern-App für die Basisqualifikationen (BQ) der IHK-Industriemeister in den vier Fächern **ReHa** (Rechtsbewusstes Handeln), **BeHa** (Betriebswirtschaftliches Handeln), **MIKP** (Information, Kommunikation, Planung) und **ZiB** (Zusammenarbeit im Betrieb). Schwester-App des Lernlabors (NTG) und Gerüst für Lernlabor Pro.
- **Besitzer:** Markus (Dr. rer. nat. Markus Baum), nebenberuflicher Dozent, unterrichtet samstags angehende Industriemeister. Deutsch, Du-Form.
- **Repo:** https://github.com/bam01872/Meisterlabor (öffentlich, Branch `main`)
- **Live (GitHub Pages, seit 12.11.2026):** https://bam01872.github.io/Meisterlabor/
- **Stand main:** Version 5 (PR #1, gemergt 08.11.2026, Commit bbefede): Oberfläche im Lernlabor-Stil, Akzentfarbe **Bordeaux**, Fach **ReHa komplett** (13 Module mit Vermutung, Erklärvideo „Kurz erklärt“ und Skizze). BeHa, MIKP und ZiB haben noch den alten Stand (Version 4: Text, Check-Fragen, Rechenaufgaben, Fälle, aber ohne Videos/Skizzen).
- **Nächste freie Version:** 6
- **Früherer Name:** „Meisterlabor Basis“, das Kennzahlen-Dashboard darin hieß „Leitstand“.

## 2. Aufbau des Repos

| Datei | Inhalt |
|---|---|
| `index.html` | die ganze App in einer Datei (rund 530 KB) |
| `sw.js` | Offline-Funktion, Cache-Name `const V='meisterlabor-vN'`, bei jeder Version erhöhen |
| `fonts/`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Schrift lokal, App-Symbol |
| `tests/check.js` | Browser-Prüfung mit Playwright: keine JS-Fehler, jede Themenseite vollständig, keine Überbreite (390 px und 1366 px), sw.js mit Versionsname, keine Dozentenversion im Repo |
| `.github/workflows/check.yml` | CI, läuft bei jedem PR und Push auf main |
| `.nojekyll` | für GitHub Pages |

**Aufbau von index.html (wichtig für Änderungen):**
- Fächer `FACH=['reha','beha','mikp','zib']`, Navigation Start / Fächer / Prüfen / Ich (`#nw`, `#fs`, `#nm`, `nav()`).
- Block `RG` oben im Script: Rechengrößen (Mindestlohn, Minijob, BBG, SV-Sätze) mit Jahreswechsel-Checkliste als Kommentar. Datumshelfer `feiertag`/`werktag`/`fD`.
- Rechentypen über `cc()`, Datumsaufgaben mit `dt:Date`, `nf(v,d,ng)` ohne Tausenderpunkt für Jahreszahlen.
- Neue Module **immer hinten anhängen**, die Indizes der Rechenaufgaben hängen an der Reihenfolge. Neue Module brauchen ERK und GRP.
- Fallaufgaben mit Erwartungshorizont und Haken (`ehSplit`/`ehBox`). Prüfungssimulation: 5 Aufwärmfragen ohne Wertung, 2 Rechen- + 3 Fallaufgaben in 90 min (kurz 1+1 in 30 min), 100 Punkte, bestanden ab 50.
- Version-5-Teil (ML5): Inhalte je Modul `X['Modulname']={v:[Frage,Optionen,richtig,Auflösung], ein:[Szenen {d,t,f(k)}], skz:[[()=>svg, Bildunterschrift]]}`; Bausteine `ML5.H` (LIST, CARDS, BARS, FLOW, VS, STAIRS, TL, CYC, SKZ); Markenfarbe per `data-brand` (Standard bordeaux). `fach()` und `home()` sind in ML5 überschrieben.
- Kurstermine im Leitstand (Ich → Leitstand) mit ICS-Export; `KURS0` mit Einheiten je Fach (ReHa 7, BeHa 9, MIKP 8, ZiB 8) und BQ-Prüfung 21./22.10.2027. localStorage-Schlüssel `meisterlabor-kurs`, `meisterlabor-kurs0`, Tour-Flags `meisterlabor-tour`/`-tips`.
- Einführungstour (6 Karten) unter Ich → „So funktioniert das Meisterlabor“.
- `const DOZENT=false` im Repo. Die Dozentenversion (`DOZENT=true`) wird nie committet.

**Quellen außerhalb des Repos (bisher nur im Projektordner von „Lernlabor v2“):** Die Version-5-Teile entstanden als eigene Dateien `ml5.css`, `ml5.js`, `ml5-reha.js` und wurden vor dem ersten `</body>` eingefügt. Dazu gibt es Prüf- und Aufnahme-Skripte (`small.js` meldet zu kleine Texte, `shot.js`, `gif.js`, `frames.js`, `skz.js`, `rf.js`, `page.js`, `check.js`). Im Repo steht heute nur das fertige `index.html`. Vorschlag: diese Quellen und Skripte als `werkzeug/` ins Repo übernehmen (siehe Abschnitt 7).

## 3. Arbeitsweise und Regeln (gelten weiter)

**Allgemein**
- Deutsch, Du-Form. Kurze, klare Antworten in ganzen Sätzen.
- Nur **eigene Aufgaben**, keine IHK-Originale und keine Nachbildung von Prüfungen (ADR 002 im Lernlabor). Fremde Seiten höchstens als Themenliste, keine Texte oder Zahlen übernehmen.
- Lernstand nur lokal im Browser, keine Konten, keine Nutzungszählung, keine KI in der veröffentlichten App.
- Rechtsstand Oktober/November 2026, Gesetzeszahlen vor dem Lehren prüfen. Bekannt: neues ProdHaftG (gilt für Produkte ab 09.12.2026, kein 500-€-Selbstbehalt, Software = Produkt); ArbZG-Reform nur Entwurf; § 26 BDSG nach EuGH C-34/21 nicht anwendbar; Mindestausbildungsvergütung 2026: 724/854/977/1.014 €; Minijob 2027 voraussichtlich 633 €. Zum Jahreswechsel den Block `RG` nachziehen.
- Fachliche Korrekturen an Markus' Beispielen sind erwünscht.

**Ablauf**
- Code, Commit, PR nur nach Markus' Ja.
- Vor jeder **Darstellungsänderung zuerst eine Vorschau**: Artifact-Seite mit Screenshots Handy und Laptop, hell und dunkel, bei Bewegung GIFs. Den Link **im Klartext** in die Fertig-Meldung schreiben (Dateilinks öffnen bei Markus oft nicht).
- **Merge nur auf Markus' Ja mit Merge-Wort** („PR und merge“; diktiert auch „PR Merchant“, „PR und Merch“, „merge es“, „Dann merge“). Direkt nach einer Vorschau-Meldung gilt es für diese Vorschau. „PR und merge für X“ heißt nur X.
- „Strukturiere den Prompt, bevor du ihn ausführst“ = erst Ist / Soll / Akzeptanzkriterien / Vorschlag, umsetzen erst nach Ja. „… und führe ihn dann aus“ = kurz strukturieren und bis zur Vorschau umsetzen.
- „Abspeichern“ / „Aufgabe merken“ = Branch gepusht lassen, kein PR.
- Parallele Threads: vor dem PR `main` holen, rebasen, nächste freie Version nehmen, nie rückwärts. Der Koordinator vergibt Versionsnummern in Merge-Reihenfolge.
- Version erhöhen in `sw.js` (`meisterlabor-vN`), dazu README und gegebenenfalls Neuigkeiten in der App.
- `node tests/check.js` muss grün sein (CI ist maßgeblich). CI hängt gelegentlich bei „playwright install“: neu starten.
- PRs per `gh api` REST (GraphQL ist gesperrt). Live-Prüfung per curl geht nicht (Proxy 403): den Pages-Workflow „pages build and deployment“ prüfen, bei Hänger neu starten.
- Force-Push wird blockiert: nach gemergtem PR den Branch neu von `origin/main` aufsetzen und vor dem Push `git merge -s ours origin/<branch>`.

**Nach jedem Merge**
1. Dozentenversion bauen (seit Version 13): `python3 /mnt/project-files/dozent/build-dozent.py index.html /mnt/project-files/dozent/meisterlabor_dozent.html` (Kopie des Skripts in `werkzeug/build-dozent.py`). Kurz prüfen: `const DOZENT=true` drin, Titel „Dozent · Lernlabor Betrieb“, `#dozent` öffnet ohne JS-Fehler. Nie ins Repo, nicht auf Pages, nicht als öffentliches Artifact.
2. Sicherung: `BACKUP_REPO=bam01872/Meisterlabor BACKUP_ZIEL=/mnt/project-files/backup python3 /mnt/project-files/backup/werkzeug/backup.py` (Repo-Bundle, App-ZIP, alle PRs; Ziel bewusst ohne Unterordner, damit Verlauf und protokoll.txt weiterlaufen).
3. In der Fertig-Meldung nennen, dass Dozentenversion und Sicherung gelaufen sind.

**Gestaltung (aus dem Lernlabor übernommen)**
- Oberfläche und Bedienung wie das Lernlabor, nur eigene Akzentfarbe (Bordeaux). Bei Abweichungen nachfragen.
- Handy ist der kritische Fall. Beschriftungen in Skizzen nie überlappend oder verdeckt, in allen Ansichten prüfen.
- Echter Bruchstrich statt Schrägstrich (Ausnahmen Datum, Wortpaare, Eingabefelder); in Merkboxen ÷/× durch Bruchstrich/· ersetzen.
- Einheiten in jedem Rechenschritt. Formeln in einer Zeile, zu lang → kleinere Schrift.
- Zahlen: fünfstellig ohne 000-Ende ohne Tausender-Leerzeichen, runde Zahlen (10 000) mit; Geldbeträge mit zwei Nachkommastellen.
- Skizzen dürfen die Lösung nicht verraten. Seltene Knöpfe klein.
- Erklärvideos „Kurz erklärt“ wie im Lernlabor (Szenen mit Text und Zeichnung). Markus: Simulationen mit Reglern eher nicht, weil die Fächer textlastig sind (höchstens ~8 Rechner optional).

## 4. Offene Punkte und nächste Schritte

1. **Paket 2 fortsetzen:** BeHa (rund 12 Module) im gleichen Muster wie ReHa (Vermutung, Erklärvideo, Skizze), danach ZiB und MIKP. Jedes Fach mit eigener Vorschau, dann „PR und merge“. Insgesamt fehlen noch rund 36 Module mit Video.
2. **Name:** Markus wollte den Namen ändern. Vorschläge: Lernlabor Betrieb (Empfehlung), Praxislabor, Handlungslabor, Führungslabor, Meisterwerkstatt. Entscheidung offen. Bei Umbenennung des Repos ändert sich die Pages-Adresse, und der Lernstand der Nutzer hängt an der Adresse.
3. **Pflichtteil fehlt noch:** Die öffentliche App hat kein Impressum und keinen „Fehler melden“-Knopf (geprüft 15.11.: Wort „Impressum“ kommt in index.html nicht vor). Impressum/Datenschutz/Copyright wie im Lernlabor bzw. Lernlabor Pro (Fußzeile) nachziehen, dazu die Schreibregeln in Merkboxen. Vorrang, weil die Seite öffentlich ist.
4. Optional Paket 3: einige Rechner mit Reglern (z. B. Kostenrechnung).
5. Sicherung lief bisher nur einmal (08.11.2026). Nach dem Umzug neu einrichten.
6. Kurstermine 2026/27 aus Markus' Stundenplan (für Kalender im Leitstand): RBH 06.02., 06.03., 17.04., 24.07., 11.09., 04.10., 06.10.2027; BWH 21.11., 05.12., 12.12.2026, 10.04., 29.05., 26.06., 07.08., 25.09., 09.10.2027; MIK 19.12.2026, 09.01., 30.01., 20.02., 08.05., 28.08., 04.09., 08.10.2027; ZIB 13.02., 13.03., 12.06., 03.07., 31.07., 18.09., 05.10., 07.10.2027. BQ-Prüfung 21./22.10.2027.
7. Aus dem IHK-Archiv-Vergleich: Vergleich der Nicht-NTG-Fächer gegen das Meisterlabor steht noch aus.

## 5. Vorschauen, Gutachten, Live-Seiten (Artifacts)

| Was | Link |
|---|---|
| Version 5 Paket 1 (Oberfläche, Bordeaux, 4 Mustermodule) | https://claude.ai/artifact/EJtnU9YZmSVDu7pMtYotWR |
| Testversion zum Klicken | https://claude.ai/artifact/VVxNbgV2G2hfRSaRpWvhye |
| Paket 2 ReHa (13 Module) | https://claude.ai/artifact/VwM2CZGX7hbegogwLrirzT |
| Version 4 Vorschau (Kurstermine, Tour) | https://claude.ai/artifact/MNF1RVVsLB19d7qtLu7k46 |
| Alte Live-Fassung als Artifact (Version 4, „Meisterlabor Basis“) | https://claude.ai/artifact/ETNVG16tGKCYAce3JXraiW |
| Gutachten 21.10.2026 (Recht/Verwaltung/Betriebswirt, 41 Befunde, alle umgesetzt) | https://claude.ai/artifact/WmiMtGtybkD9vzV769ksFF |

## 6. Wichtige Daten aus Lernlabor v2

- Zielgruppe: eigene Lehrgangsteilnehmer (IM TZ 11/2026 Regenstauf). Später Träger-Lizenz oder Einmalkauf, Pilot kostenlos. Zeitbudget Markus 5 bis 7 Stunden pro Woche.
- Kontakt-Mail für Impressum: baum.ma91@yahoo.de.
- Schwester-Apps: Lernlabor https://bam01872.github.io/Lernlabor/ (Repo bam01872/Lernlabor), Lernlabor Pro https://bam01872.github.io/Lernlabor-Pro/ (Repo bam01872/Lernlabor-Pro). **Lernlabor Pro baut auf dem Meisterlabor-Gerüst Version 5 auf** (Kopie in `Lernlabor-Pro/werkzeug/basis/meisterlabor-v5.html`). Änderungen am Meisterlabor wirken dort nicht automatisch.

## 7. Werkzeug im Repo und Dateien aus dem alten Projekt

Seit 15.11.2026 liegen im Repo:
- `werkzeug/v5/`: die Quellen von Version 5 (`ml5.js` mit den Bausteinen `ML5.H`, `ml5.css`, `ml5-reha.js` mit den 13 ReHa-Modulen, `README.md`). Sie stecken bereits fertig in `index.html`. Neue Fächer (BeHa, ZiB, MIKP) nach dem Muster von `ml5-reha.js` schreiben, also `X['Modulname']={v,ein,skz}`, und in `index.html` einbauen.
- `werkzeug/skripte/`: Prüf- und Aufnahme-Skripte aus Version 5 (`small.js` meldet zu kleine Texte, `shot.js`/`gif.js`/`frames.js` für Vorschaubilder, `skz.js` Skizzen, `build.py` alter Bauweg). Pfade darin sind teils noch auf den alten Projektordner gestellt.
- `werkzeug/backup.py`: Sicherungsskript (Standard-Repo bam01872/Meisterlabor). Aufruf: `BACKUP_ZIEL=/mnt/project-files/backup python3 werkzeug/backup.py`. Legt Bundle, App-ZIP und alle PRs ab; Markus lädt monatlich auf Zuruf „Backup herunterladen“ die Monatsdatei.

Nicht im Repo, nur im Projektordner von „Lernlabor v2“: die Dozentenversion (`meisterlabor/dozent/meisterlabor_dozent.html`, nie ins Repo; lässt sich jederzeit aus `index.html` mit `DOZENT=true` neu bauen), die alte Sicherung vom 08.11. und alte Stände Version 2 bis 4. Diese werden nicht gebraucht.
