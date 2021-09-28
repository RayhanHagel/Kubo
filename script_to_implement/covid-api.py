import requests
from bs4 import BeautifulSoup as bs4
import sys


class Coronavirus_Parser:
    
    def __init__(self):
        self.url = 'https://www.worldometers.info/coronavirus/'
        self.data = ''
        
        self.date_update = ''
        self.total_cases = ''
        self.total_deaths = ''
        self.total_recovered = ''
        self.check = False
        

    def get_status(self):
        check =  self.data.find("span", attrs={"class" : "style4"})
        if check:
            self.check = False
        else:
            self.check = True
        
     
    def get_data(self, url):        
        fetch = requests.get(url)
        self.data = bs4(fetch.content, 'html.parser')
        
        self.get_status()
        
        if self.check == True:
            # Fetch Date Update
            if url == self.url:
                date = self.data.find("div", attrs={"style" : "font-size:13px; color:#999; margin-top:5px; text-align:center"})
            else:
                date = self.data.find("div", attrs={"style" : "font-size:13px; color:#999; text-align:center"})
            
            # Fetch Statistics
            total_statistics = self.data.findAll("div", {"class" : "maincounter-number"})
            for item in range(len(total_statistics)):
                total_statistics[item] = total_statistics[item].text
                total_statistics[item] = total_statistics[item].strip().strip("\n")
            
            # Defining into Class
            self.date_update = date.text[14:]
            self.total_cases = total_statistics[0]
            self.total_deaths = total_statistics[1]
            self.total_recovered = total_statistics[2]

        elif self.check == False:
            pass
        
        
    def get_country(self, country):
        if country == 'total':
            self.get_data(self.url)
        else:
            country = country.replace(' ', '-')
            url = self.url + "country/" + country
            self.get_data(url)


    def coronavirus(self, country='total'):
        country = country.lower()
        self.get_country(country)
        text = ""
        if self.check == True:
            if country[len(country)-1] == "s":
                title = f":microbe: **{country.lower().capitalize()}' Coronavirus Statistics**"
            else:
                title = f":microbe: **{country.lower().capitalize()}'s Coronavirus Statistics**"
            
            total_cases = f"*Cases*              :   {self.total_cases}"
            total_deaths = f"*Deaths*            :   {self.total_deaths}"
            total_recovered = f"*Recovered*      :   {self.total_recovered}"
            last_update = f"Last updated at {self.date_update}"
            
            text = f"{title}\n\n{total_cases}\n{total_deaths}\n{total_recovered}\n\n{last_update}"
        
        elif self.check == False:
            text = f"Country Not Found... Please try again!"        
        
        sys.stdout.write(text)
        

Covid_API = Coronavirus_Parser()
Covid_API.coronavirus(sys.argv[1])