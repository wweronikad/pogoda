import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const CustomIcon = ({ position, popupContent, iconClass = 'fa-solid fa-location-dot', iconColor = 'black', iconSize = '24px' }) => {
    // Tworzymy niestandardową ikonę za pomocą HTML dla Font Awesome
    const customIcon = L.divIcon({
        html: `<div style="font-size: ${iconSize}; color: ${iconColor};"><i class="${iconClass}"></i></div>`,
        className: 'custom-marker',  
        iconSize: [25, 41], 
        iconAnchor: [12, 41], 
        popupAnchor: [0, -41]
    });

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>
                {popupContent}
            </Popup>
        </Marker>
    );
};

export default CustomIcon;
