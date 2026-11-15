#!/usr/bin/env python3
"""Baut die Lernlabor-Bedienung (werkzeug/ll/) in index.html ein. Mehrfach aufrufbar.
Aufruf im Repo-Ordner: python3 werkzeug/ll/einbauen.py
Version und Datum stehen nur hier (APPV, APPD); daraus entstehen die Angaben in der App und sw.js."""
import os,re
APPV,APPD=10,'16.11.2026'
R=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
W=os.path.join(R,'werkzeug','ll')
rd=lambda n:open(os.path.join(W,n),encoding='utf-8').read()
p=os.path.join(R,'index.html');s=open(p,encoding='utf-8').read()
s=re.sub(r'\n?<!--LL8-->.*?<!--/LL8-->','',s,flags=re.S)
s=re.sub(r"<script>const APPV=\d+,APPD='[^']*'</script>\n",'',s)
s=s.replace('<meta charset="utf-8">','<meta charset="utf-8">\n<script>const APPV='+str(APPV)+",APPD='"+APPD+"'</script>",1)
old="<script>if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));</script>"
new="<script>if('serviceWorker' in navigator)window.addEventListener('load',()=>{const had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&window.llUpdate)window.llUpdate()});navigator.serviceWorker.register('sw.js').then(r=>{document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')r.update().catch(()=>{})});setInterval(()=>r.update().catch(()=>{}),36e5)}).catch(()=>{})});</script>"
s=s.replace(old,new)
blk='<!--LL8-->\n<style>'+rd('ll.css')+'</style>\n'+''.join('<script>'+rd(n)+'</script>\n' for n in ['ll-thema.js','qrcode.js','ll-tutorial.js','ll-bedienung.js','ll-audit.js','ll-umbruch.js','ll-update.js'])+'<!--/LL8-->\n'
mk='<style>/* ===== Version 6'
assert mk in s;s=s.replace(mk,blk+mk,1)
s=s.replace('(()=>{const APPV=7,OW=','(()=>{const OW=').replace('(()=>{const APPV=8,OW=','(()=>{const OW=')
open(p,'w',encoding='utf-8').write(s)
sw=os.path.join(R,'sw.js');t=open(sw,encoding='utf-8').read();t=re.sub(r"meisterlabor-v\d+","meisterlabor-v"+str(APPV),t);open(sw,'w',encoding='utf-8').write(t)
print('ok',APPV,len(s))
