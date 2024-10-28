// MoreInfo.js
import React from 'react';
import trendText from '../../../sources/trend'; // Upewnij się, że ścieżka jest poprawna
import './MoreInfo.css';

const MoreInfo = ({ sources, type }) => {
  return (
    <details>
      <summary>Więcej informacji</summary>
      <ul>
        {sources.map((source, index) => (
          <li key={index}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.text}
            </a>
          </li>
        ))}
      </ul>

      {/* Zagnieżdżona lista rozwijalna dla typu 'pollution' */}
      {type === 'pollution' && (
        <details>
          <summary>Jak został obliczony trend?</summary>
          <div className="trend-text">
            <div
              dangerouslySetInnerHTML={{ __html: trendText }}
            />
          </div>
        </details>
      )}
    </details>
  );
};

export default MoreInfo;
