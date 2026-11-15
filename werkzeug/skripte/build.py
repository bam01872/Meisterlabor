import sys
s=open('ml4.html').read()
css=open('ml5.css').read();js=open('ml5.js').read();rh=open('ml5-reha.js').read()
i=s.find('</body>')
s=s[:i]+'<style>'+css+'</style>\n<script>'+js+'</script>\n<script>'+rh+'</script>\n'+s[i:]
open('ml5.html','w').write(s)
