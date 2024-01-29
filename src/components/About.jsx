import React from 'react';
import '../css/About.css';

function About() {
    return (
        <div className="about-container">
            <h2>O nama</h2>
            <p>
Planirate putovanje, ali ne znate odakle da počnete? Upoznajte našu aplikaciju! Bez obzira da li sanjate o egzotičnoj destinaciji ili jednostavnom vikend-odmoru, mi smo tu da vam olakšamo planiranje. Samo unesite destinaciju, budžet i trajanje putovanja, a mi ćemo vam predložiti hotele i znamenitosti koje odgovaraju vašim željama i finansijskim mogućnostima. Naša aplikacija vam omogućava da istražite širok spektar smeštajnih opcija i atrakcija, sve prilagođeno vašim preferencijama. Bez stresa i komplikacija, samo čista radost putovanja! Isprobajte je već danas i uživajte u planiranju svog savršenog odmora.</p>
            <h3>Kontakt</h3>
            <p>Za sve dodatne informacije ili podršku, možete nas kontaktirati na:</p>
            <ul>
                <li>Telefon: +381 12 3456789</li>
                <li>Email: info@planputovanja.com</li>
            </ul>
            <h3>Adresa</h3>
            <p>Posetite nas na adresi:</p>
            <p>Ulica dobrih putovanja, 10, Beograd</p>
        </div>
    );
}

export default About;
