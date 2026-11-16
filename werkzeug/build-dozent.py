#!/usr/bin/env python3
"""Baut die Dozentenversion von Lernlabor Betrieb (nie ins Repo!).

Aufruf:
    python3 /mnt/project-files/dozent/build-dozent.py index.html /mnt/project-files/dozent/meisterlabor_dozent.html

Macht genau vier Dinge und bricht sonst ab:
1. prüft, dass <title>Lernlabor Betrieb</title> und const DOZENT=false; je genau einmal vorkommen,
2. ersetzt den Titel durch „Dozent · Lernlabor Betrieb“,
3. ersetzt const DOZENT=false; durch const DOZENT=true;,
4. bettet jede src:url(fonts/….woff2) als base64 ein (erwartet: 3 Schriften).
Die Schriften werden neben index.html gesucht (oder im Ordner aus Argument 3).
"""
import base64, os, re, sys

TITEL = '<title>Lernlabor Betrieb</title>'
NEU = '<title>Dozent · Lernlabor Betrieb</title>'
SCHALTER = 'const DOZENT=false;'
SCHRIFTEN = 3

if len(sys.argv) < 3:
    sys.exit('Aufruf: build-dozent.py index.html ziel.html [repo-ordner]')
src, out = sys.argv[1], sys.argv[2]
root = sys.argv[3] if len(sys.argv) > 3 else os.path.dirname(os.path.abspath(src))
s = open(src, encoding='utf-8').read()
if s.count(TITEL) != 1:
    sys.exit('FEHLER: %s kommt %d-mal vor (erwartet 1)' % (TITEL, s.count(TITEL)))
if s.count(SCHALTER) != 1:
    sys.exit('FEHLER: %s kommt %d-mal vor (erwartet 1)' % (SCHALTER, s.count(SCHALTER)))
s = s.replace(TITEL, NEU).replace(SCHALTER, 'const DOZENT=true;')


def ein(m):
    b = base64.b64encode(open(os.path.join(root, m.group(1)), 'rb').read()).decode()
    return 'src:url(data:font/woff2;base64,' + b + ')'


s, n = re.subn(r'src:url\((fonts/[^)]+\.woff2)\)', ein, s)
if n != SCHRIFTEN:
    sys.exit('FEHLER: %d Schriften eingebettet (erwartet %d)' % (n, SCHRIFTEN))
if os.path.abspath(out).startswith(os.path.abspath(root) + os.sep):
    sys.exit('FEHLER: Ziel liegt im Repo-Ordner. Die Dozentenversion gehört nur in den Projektordner.')
open(out, 'w', encoding='utf-8').write(s)
print('ok', out, '%.0f KB' % (len(s.encode('utf-8')) / 1024))
