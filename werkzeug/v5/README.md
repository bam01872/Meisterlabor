# Meisterlabor Version 5 (Entwurf, 08.11.2026)
- Basis: ../meisterlabor-basis.html (Version 4, live).
- ml5.css + ml5.js werden vor dem ersten </body> eingefügt (werkzeug/build.py, im Ordner mit ml4.html = Kopie der Basis).
- ml5.html = gebaute App, meisterlabor-v5-test.html = dieselbe mit window.ML5PREV=true (Farbumschalter oben rechts).
- Vorschau: https://claude.ai/artifact/EJtnU9YZmSVDu7pMtYotWR, Testversion: https://claude.ai/artifact/VVxNbgV2G2hfRSaRpWvhye
- Inhalte je Modul in ml5.js: X['Modulname']={v:[Frage,Optionen,richtig,Auflösung], ein:[Szenen {d,t,f(k)}], skz:[[()=>svg, Bildunterschrift]]}.
