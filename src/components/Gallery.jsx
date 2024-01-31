// components/Gallery.js
import React from 'react';
import NavBar from './NavBar';
import '../css/Gallery.css';


function Gallery({ onLogout, email }) {
  return (
    <div>
      <h2>Galerija</h2>
      <div className="image-container">
        <figure>
        <img src="https://www.travel4you.rs/images/smestaj/galerija/pariz-putovanje-avionom-jeftino-02.jpg" alt="Pariz" />
          <figcaption>Pariz</figcaption>
        </figure>
        <figure>
          <img src="https://a.cdn-hotels.com/gdcs/production6/d781/3bae040b-2afb-4b11-9542-859eeb8ebaf1.jpg" alt="Istanbul" />
          <figcaption>Istanbul</figcaption>
        </figure>
        <figure>
          <img src="https://www.sattravel.rs/images/tekstovi/sat-travel-evropski-gadovi-rim-12.jpg" alt="Rim" />
          <figcaption>Rim</figcaption>
        </figure>
        <figure>
          <img src="https://www.state.gov/wp-content/uploads/2022/01/shutterstock_248799484-scaled.jpg" alt="New Yoek" />
          <figcaption>New York</figcaption>
        </figure>
        <figure>
          <img src="https://www.travelandleisure.com/thmb/lI6nagO4MS8iZ0XRg0GbnbtvKW8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-amsterdam-AMSTERDAMTGGHOG0823-a2f9a769f3c44a23b08649daf25e1c8c.jpg" alt="Amsterdam" />
          <figcaption>Amsterdam</figcaption>
        </figure>
        <figure>
          <img src="https://bizlife.rs/wp-content/uploads/2019/01/be%C4%8D-pixabay.jpg" alt="Beč" />
          <figcaption>Beč</figcaption>
        </figure>
        <figure>
          <img src="https://www.vivatravel.rs/photo/56518/p/16:10" alt="Budimpešta" />
          <figcaption>Budimpešta</figcaption>
        </figure>
        <figure>
          <img src="https://www.rapsodytravel.rs/wp-content/uploads/prag-1.jpg" alt="Prag" />
          <figcaption>Prag</figcaption>
        </figure>
        <figure>
          <img src="https://www.luxlife.rs/storage/posts/thumbnail/2022/Mar/252195/zasto-je-madrid-nova-evropska-luksuzna-destinacija.jpeg" alt="Madrid" />
          <figcaption>Madrid</figcaption>
        </figure>
        <figure>
          <img src="https://www.vivatravel.rs/photo/56764/p/16:10" alt="Barselona" />
          <figcaption>Barselona</figcaption>
        </figure>
        <figure>
          <img src="https://bookaweb.s3.eu-central-1.amazonaws.com/media/73793/beograd-destinacija-feature.jpg" alt="Beograd" />
          <figcaption>Beograd</figcaption>
        </figure>
        {/* Dodajte ostale slike sa njihovim nazivima */}
      </div>
    </div>
  );
}

export default Gallery;

