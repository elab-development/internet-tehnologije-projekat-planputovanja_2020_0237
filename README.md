**Internet Tehnologije Projekat - Aplikacija za Planiranje Putovanja**
*	Ova veb aplikacija je razvijena kao deo projekta iz predmeta Internet tehnologije. Cilj projekta je kreiranje sistema za planiranje putovanja, omogućavajući korisnicima da pregledaju destinacije, unose budžet i datume putovanja, te dobijaju preporuke u skladu sa svojim preferencijama.
**Korišćene tehnologije**
*	**Laravel**: Za backend razvoj aplikacije.
*	**React**: Za frontend razvoj aplikacije.
*	**phpMyAdmin**: Za upravljanje bazom podataka.

**Uputstvo za pokretanje projekta na lokalnoj mašini
Kloniranje repozitorijuma**
https://github.com/elab-development/internet-tehnologije-projekat-planputovanja_2020_0237.git
**Pokretanje - Backend**
1.	Pokrenite XAMPP i omogućite Apache i MySQL.
2.	Instalacija PHP i Composer-a
3.	Ukoliko nemate prethodno importovanu bazu, izvršite sledeće komande:
*	_php artisan migrate_
*	_php artisan db:seed_
4.	Zatim pokrenite server unosom komande:
*	_php artisan serve_
**Pokretanje - Frontend**
1.	Instalacija Node.js
2.	Unesite komandu za instalaciju npm-a:
*	_npm install_
3.	Zatim pokrenite putem:
*	_npm start_
4.	React aplikacija će biti dostupna na adresi http://localhost:3000/ u vašem web pregledaču.




**Funkcionalnosti**
**Za neulogovane korisnike**: Registracija, prijavljivanje.
**Za ulogovane korisnike:**  Kreiranje plana putovanja na osnovu unetih podataka, pregled galerije i kontakt stranice uz mogućnost upload-ovanja fajlova, zatim pregled prognoze i vesti relevantnih za izabranu destinaciju, pregled svih sačuvanih putovanja i mogućnost štampanja istih, navigacija kroz navigacioni meni, odjava.
**Za admina**: Ažuriranje destinacija dodavanjem nove, brisanje hotela, pregled statistike hotela po destinacijama, odjava.


