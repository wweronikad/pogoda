// TrendIcon.jsx
import React from 'react';

const TrendIcon = ({ trend }) => {
  let trendIcon = '';

  if (trend === 0) {
    trendIcon = '/icons/malejacy.png';
  } else if (trend === 2) {
    trendIcon = '/icons/rosnacy.png';
  } else {
    trendIcon = '/icons/boczny.png';
  }

  return (
    <img 
      src={trendIcon} 
      alt="Trend ikona" 
      width="12" 
      height="12" 
      style={{ verticalAlign: 'middle' }} 
    />
  );
};

export default TrendIcon;
