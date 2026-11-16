# Lernlabor Betrieb (früher Meisterlabor)

Lern-App für die Basisqualifikationen der IHK-Industriemeister: Rechtsbewusstes Handeln (ReHa), Betriebswirtschaftliches Handeln (BeHa), Information, Kommunikation und Planung (MIKP) und Zusammenarbeit im Betrieb (ZiB). Schwester-App des [Lernlabors](https://github.com/bam01872/Lernlabor) (NTG).

- `index.html` ist die ganze App. Lernstand nur im Browser, keine Konten.
- `sw.js`: Offline-Funktion. Bei jeder neuen Version `const V='meisterlabor-vN'` erhöhen.
- `tests/check.js`: Browser-Prüfung (läuft in GitHub Actions bei jedem PR).
- Die Dozentenversion gehört nicht in dieses Repo. Sie entsteht nach jedem Merge mit `python3 werkzeug/build-dozent.py index.html <projektordner>/dozent/meisterlabor_dozent.html` (Titel „Dozent · Lernlabor Betrieb“, `DOZENT=true`, Schriften eingebettet, läuft als einzelne Datei ohne Server).

© 2026 Dr. rer. nat. Markus Baum. Eigene Aufgaben, keine Nachbildung von IHK-Prüfungen. Weitergabe nur mit Erlaubnis.
