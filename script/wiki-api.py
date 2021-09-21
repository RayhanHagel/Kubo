import wikipediaapi
import sys

 
class Wikipedia_API:
    def __init__(self):
        self.langguage = 'en'
        self.browser = wikipediaapi.Wikipedia(self.langguage)
        
    def wiki(self):
        text = ""
        arguments = ""
        base = sys.argv[1].split(' ')
        
        for i in range(len(base)):
            arguments += base[i].lower().capitalize()
            if i != len(base)-1:
                arguments += " "
        
        # Gets the article, if no article sends index error
        page = self.browser.page(arguments)
        if (page.summary == ""):
            sys.stdout.write("index error")
        line_break = page.summary.split('. ')

        # Setup where the paragraph ends
        if (len(line_break) > 3):
            text = f"{line_break[0]}. {line_break[1]}. {line_break[2]}."
        elif (len(line_break) > 2):
            text = f"{line_break[0]}. {line_break[1]}."
        else:
            text = line_break[0]
        
        # Make text bold
        text = text.replace(page.title, f'**{page.title}**')
        text = text.replace(page.title.lower(), f'**{page.title.lower()}**')
                
        # Encode
        text_bytes = text.encode('ascii', errors='ignore')
        text = text_bytes.decode('ascii')
            
        sys.stdout.write(f"**{page.title}**\n{text}")
        

Browse = Wikipedia_API()
Browse.wiki()

