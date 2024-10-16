import React, { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import StationsIconComponent from '../CustomIcon.jsx';
import UserLocationMarker from '../UserLocation/UserLocationMarker.jsx';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import './Map.css';

const Map = ({ position, markers, onZoomAndHighlight }) => {
  const mapRef = useRef(null);

  return (
    <MapContainer
      ref={mapRef}
      center={[52.0, 19.0]} // Default center for Poland
      zoom={6}
      scrollWheelZoom={true}
      className="custom-map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {/* Renderowanie markerów */}
      {markers
        .filter(marker => marker.id !== 'user' && marker.position) // Filtrujemy markery, które mają poprawne pozycje
        .map(marker => (
          <StationsIconComponent
            key={marker.id}
            position={marker.position} // Przekazujemy pozycję markera
            iconUrl={marker.iconUrl} // Przekazujemy URL ikony
            popupContent={marker.popupContent} // Treść popupu
          />
        ))}

      {/* Marker dla pozycji użytkownika */}
      <UserLocationMarker
        position={position}
        iconUrl="/icons/blue_pin.png"
      />
    </MapContainer>
  );
};

export default Map;
