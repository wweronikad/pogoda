import React from 'react';
import './Footer.css';

const apiSources = [
  { name: "zanieczyszczenia powietrza GIOŚ", url: "https://powietrze.gios.gov.pl/pjp/content/api" },
  { name: "dane IMGW synoptyczne, hydrologiczne", url: "https://danepubliczne.imgw.pl/pl/apiinfo" },
  { name: "dane przemieszczania słońca Sunrise Sunset", url: "https://sunrise-sunset.org/api" },
  { name: "dane lokalizacyjne Nominatim", url: "https://nominatim.openstreetmap.org/ui/search.html" }
];

function Footer() {
  return (
    <footer className="footer">
      <p>
        Źródła API:{" "}
        {apiSources.map((source, index) => (
          <span key={index}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a>
            {index < apiSources.length - 1 && ", "}
          </span>
        ))}
      </p>
    </footer>
  );
}


export default Footer;
