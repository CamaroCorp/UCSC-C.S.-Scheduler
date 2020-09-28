from bs4 import BeautifulSoup
import requests
import json

url = ''
source = requests.get(url).text
soup = BeautifulSoup(source, 'lxml')
print(soup)

courses = soup.findAll('h2')
units = soup.findAll('div', class_='credits')
descs = soup.findAll('div', class_='desc')

catalog = dict()

count = 0
for desc in descs:
    if count == 215:
        break
    elif len((str(desc.text)).strip()) != 0 and 'Corequisites' not in (str(desc.text)).strip() and 'Cross Listed Courses' not in (str(desc.text)).strip():
        seperate = str(courses[count].a.text).split()
        catalog[(seperate[0] + ' ' + seperate[1])] = {
            "full_name": str(courses[count].a.text),
            "credits": int((str((units[count]).text)).strip()),
            "description": desc.text.strip().replace('\u00a0', ' ')
        }
        count += 1

search = input('\nEnter name of class (Ex. CSE 101): ').upper()
access = catalog[search]
print('CLASS NAME: {} / CREDITS: {} / DESCRIPTION: {}'.format(access['full_name'], access['credits'], access['description']))

# with open('courses.json', 'w') as file:
#     json.dump(catalog, file)