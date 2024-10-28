// components/Footer/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>Praca inżynierska Weronika Dziołak 2024/2025.</p>
      <p>
        Źródła API: {' '}
        <a href="https://powietrze.gios.gov.pl/pjp/content/api" target="_blank" rel="noopener noreferrer">zanieczyszczenia poweitrza GIOŚ</a>,{' '}
        <a href="https://danepubliczne.imgw.pl/pl/apiinfo" target="_blank" rel="noopener noreferrer">dane IMGW synoptyczne, hydrologiczne</a>,{' '}
        <a href="https://sunrise-sunset.org/api" target="_blank" rel="noopener noreferrer">dane przemieszczania słońca</a>{' '}
      </p>
    </footer>
  );
}

export default Footer;
