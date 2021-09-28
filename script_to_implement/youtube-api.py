import urllib.request
import re
import sys


def Youtube(search):
    search = search.replace(' ', '+')
    html = urllib.request.urlopen("https://www.youtube.com/results?search_query=" + search)
    link = re.findall(r"watch\?v=(\S{11})", html.read().decode())

    title = f':computer:  Top Search Result'
    url = f'https://www.youtube.com/watch?v={link[0]}'
    
    text = f"{title}\n{url}"
    sys.stdout.write(text)
        
Youtube(sys.argv[1])
