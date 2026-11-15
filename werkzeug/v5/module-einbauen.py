#!/usr/bin/env python3
"""Baut die Modul-Inhalte der Fächer (ml5-beha.js, ml5-zib.js, ml5-mikp.js) in index.html ein. Mehrfach aufrufbar.
Aufruf im Repo-Ordner: python3 werkzeug/v5/module-einbauen.py"""
import os,re
R=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
W=os.path.join(R,'werkzeug','v5');p=os.path.join(R,'index.html');s=open(p,encoding='utf-8').read()
for n in ['beha','zib','mikp']:
    f=os.path.join(W,'ml5-'+n+'.js')
    s=re.sub(r'\n?<!--M5-'+n+r'-->.*?<!--/M5-'+n+r'-->','',s,flags=re.S)
    if not os.path.exists(f):continue
    blk='<!--M5-'+n+'-->\n<script>'+open(f,encoding='utf-8').read()+'</script>\n<!--/M5-'+n+'-->\n'
    s=s.replace('<!--LL8-->',blk+'<!--LL8-->',1)
open(p,'w',encoding='utf-8').write(s);print('ok')
