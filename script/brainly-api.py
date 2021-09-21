import requests
from bs4 import BeautifulSoup
from googlesearch import search
import sys


def brainly(target):
    for results in search(f"brainly {target}", tld="co.id", num=10, stop=1, pause=2):
        if results.find('brainly') != -1:
            page = requests.get(results)
            soup = BeautifulSoup(page.content, 'html.parser')
            data = soup.find('div', attrs={'class': 'brn-qpage-next-answer-box-content__section'})
            data = data.text.strip().replace("Jawaban:", "")

            text = f":notepad_spiral: The answer for the question is below\n\n{data}"
            sys.stdout.write(text)

brainly(sys.argv[1])           
