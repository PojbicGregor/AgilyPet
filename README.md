# AgilyPet 

## Namen projekta
Naš cilj je narediti rešitev, ki bo zadovoljevala vsem pogojem/vmesnim ciljem/funkcionalnostim, ki si jih zastavimo.
Cilj je narediti čim boljšo spletno aplikacijo, ki bo tehnološko zahtevna in lepo oblikovana. Cilj je tudi pravilno uporabljati
vse tehnologije ki smo se jih dogovorili uporabiti. V povzetku je naš cilj zadovoljiva in uporabna spletna aplikacija.

## Funkcionalnosti
- **Urejanje coursov**
- **Risanje coursov**
- **Sledenje kreatorju coursa**
- **Pošiljanje maila ob izdaji novega coursa**
- **Podatki o pasmi psa uporabnika**
- **Podatki o izbrani pasmi psa**
- **Urejanje dogodkov**
- **Prikaz dogodka na koledarju**
- **Prijava in odjava na dogodek**
- **Vnos psa**
- **Filtriranje po coursih glede na zdravstveno stanje psa**
- **Avtentikacija**

## Tehnološki sklad
Slika ![Tehnološki sklad](/slike/Agilypet_tehnoloskiSklad.PNG)

## Razvojno okolje
- VisualStudio Code

## GitLab repozitorij
Celoten repozitorij celotnega projekta se nahaja na [GitLab-u](https://gitlab.com/LukacJan/agilypet).

## Vzpostavitev projekta
Ker se projekt nahaja na GitLab-u, lahko vzpostavimo projekt tako da kloniramo [GitLab repozitorij](https://gitlab.com/LukacJan/agilypet).

## Zagon projekta
### Zagon backenda
Backend zaženemo v mapi ![Mape backend](/slike/backend_mapa.PNG) z ukazom ```nodemon index.js``` ali samo ```nodemon``` lahko pa tudi z ukazom ```node index.js```.

### Zagon frontenda
Frontend zaženemo v mapi ![Mape frontend](/slike/frontend_mapa.PNG) z ukazom ```npm start```.

## Namestitev projekta
Projekt se lahko namesti s pomočjo ```docker-compose.yml``` datoteke, ki se nahaja v root direktoriju projekta. 
Ukaz za namestitev je: ```docker-compose up```.

## Vloge
username: osnovni@uporabnik.si
password: osnovni123

## Zaslonske maske


## Člani
- **Pojbič Gregor**
- **Manev Blazhe**
- **Ristova Kristina**
- **Lukač Jan**
<!--
## Opis projekta
### Člani
Člani ekipe, ki dela na tem projektu smo Blazhe Manev, Gregor Pojbič, Kristina Ristova in Jan Lukač.
Vodja naše ekipe je Gregor Pojbič, lastnik izdelka (product owner) pa je asistent Tilen Hliš.
Smo ekipa 4 študentov FERI, 2. letnik smeri ITK. Projekt pa delamo pri predmetu Praktikum 2.

### Opis
AgilyPet je naziv našega projekta, ki smo si ge izbrali pri predmetu Praktikum 2. 

### Naloga
Naša naloga je nareiti rešitev glede na podano navodilo in jo na koncu predstaviti.

### Navodilo
```
Vse več ljudi ima hišne ljubljenčke, s katerimi si želijo aktivno preživeti čas. Ena izmed možnosti za
aktivno preživljanje prostega časa s svojim ljubljenčkom je postavitev domačega agility-ja. Večina
ljudi si pod pojmom agilty predstavlja progo za večje pse, kjer psi tečejo in preskakujejo ovire.
Vendar pa so posebne oblike proge za agilty primerne tudi za manjše pse, za pse z zdravstvenimi
težavami in tudi druge vrste hišnih ljubljenčkov, kot so hrčki in vietnamski prašički. 

Na skupnem seznamu označite, katere proge so dodane s strani administratorja in katere s strani
registriranih uporabnikov. Omogočite, da se lahko uporabniki prijavijo na določenega avtorja prog in
mu sledijo ter so obveščeni (preko elektronske pošte), ko je s strani avtorja dodana nova proga.
```

## Ciji
Naš cilj je narediti rešitev, ki bo zadovoljevala vsem pogojem/vmesnim ciljem/funkcionalnostim, ki si jih zastavimo.
Cilj je narediti čim boljšo spletno aplikacijo, ki bo tehnološko zahtevna in lepo oblikovana. Cilj je tudi pravilno uporabljati
vse tehnologije ki smo se dogovorili uporabiti. V kartekem je naš cilj zadovoljiva in uporabna spletna aplikacija.

## Specifikacije
### Tehnologije
- Node.js
- Express
- React
- MongoDB
- Git (GitLab)

### Razvojno okolje
- Visual studio code

### Sledenje poteku dela
- GitLab

## Način dela
Delo si bomo med posamezniki razdelili po dogovoru v skupini. Delo posameznika bomo sledili in posledično lahko spremljali v GitLab-u s pomočjo List-ov in Milestone-ov. Liste bomo lahko spremljali s pomočjo premikanja po tabli (Board) glede na to pod
katero labelo (To do, Doing, Done) se nahaja določen list.

## Vzpostavitev
Navodila kako vzpostaviti začetno aplikacijo.

Najprej bo potrebno izvesti pull, da pridobimo vse datoteke na veji main

### Vzpostavitev React (frontend)
Za vzpostavitev bomo se morali pomakniti v podmapo our-app ki se nahaja v mapi frontend.
![Mape frontend](/slike/react_mape.PNG)
To naredimo z ukazom ```cd .\frontend\```, da se premaknemo v mapo frontend, nato pa še uporabimo ukaz ```cd .\our-app\``` da se
premaknemo v podmapo our-app. Zdaj bi naš terminal moral zgledati nekako tako: ![Terminal react](/slike/terminal_react.PNG)
Sedaj moramo ustvariti še node_modules, kar pa naredimo z ukazom ```npm install```. Sedaj imamo React vzpostavljen.

### Vzpostavitev backend-a
Za vzpostavitev bomo se morali pomakniti v mapo backend.
![Mape backend](/slike/backend_mapa.PNG)
To naredimo z ukazom ```cd .\backend\```, da se premaknemo v mapo backend (Seveda se moramo pred izvedbo tega ukaza nahajati v korenski mapi).  Zdaj bi naš terminal moral zgledati nekako tako: ![Terminal backend](/slike/terminal_backend.PNG)
Sedaj moramo ustvariti še node_modules, kar pa naredimo z ukazom ```npm install```. Sedaj imamo backend vzpostavljen.

## Zagon aplikacije
Po vzpostavitvi aplikacije lahko aplikacijo zaženemo.

### Zagon backend-a
Backend zaženemo, tako da ko se nahajamo v podmapi backend v terminal napišemo ukaz ```node index.js```. Sedaj imamo zagnan backend na port-u 3001.

### Zagon React-a (frontend)
React zaženemo, tako da ko se nahajamo v podmapi our-app, ki je v mapi frontend in v terminal napišemo ukaz ```npm start```. Sedaj imamo zagnan React na port-u 3000.

## Nameščanje rešitve 
Našo aplikacijo se lahko namesti s pomočjo docker-compose ali pa s pomočjo dockerfile

### Nameščanje rešitve s pomočjo Dockerfile
Najprej je potrebno klonirati [repozitorij našega projekta](https://gitlab.com/LukacJan/agilypet). Ko smo projekt klonirali in ga imamo nameščenega na svoji napravi, se premaknemo v ta projekt.

#### Nameščanje rešitve s pomočjo Dockerfile (backend)
Najprej se premaknemo v mapo ![backend](/slike/backend_mapa.PNG), z ukazom ```cd .\backend\```. Nato pa zaženemo ukaz 
```docker build . -t {username}/agilypet-backend:0.1```. S tem ukazom smo ustvarili docker image za backend. Nato lahko docker image zaženemo, kar lahko storimo kar najlažje preko [Docker Desktop](https://www.docker.com/products/docker-desktop/), ali pa z ukazom ```docker run -d -p 3001:3001 {username}/agilypet-backend:0.1```. Tako smo namestili in zagnali backend.

#### Nameščanje rešitve s pomočjo Dockerfile (frontend)
Najprej se premaknemo v mapo ![ts_frontend/our-app](/slike/react_mape.PNG), z ukazom ```cd .\ts_frontend\our-app```. Nato pa zaženemo ukaz 
```docker build . -t {username}/agilypet-frontend:0.1```. S tem ukazom smo ustvarili docker image za frontend. Nato lahko docker image zaženemo, kar lahko storimo kar najlažje preko [Docker Desktop](https://www.docker.com/products/docker-desktop/), ali pa z ukazom ```docker run -d -p 3000:3000 {username}/agilypet-frontend:0.1```. Tako smo namestili in zagnali frontend.

### Nameščanje rešitve s pomočjo docker-compose
Dokaj preprosto lahko namestimo aplikacijo s pomočjo docker-compose. Ker so image-i že zgrajeni in dodani v javni repozitorij, lahko preprosto celotno aplikacijo namestimo s pomočjo ukaza ```docker-compose up```, seveda se moramo v tistem trenutku nahajati v mapi, kjer je datoteka docker-compose.yml.
<!--
## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/LukacJan/agilypet.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/LukacJan/agilypet/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!).  Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
--> 