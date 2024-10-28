import React, { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import CustomIcon from '../CustomIcon.jsx';
import UserLocationMarker from '../UserLocation/UserLocationMarker.jsx';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import Legend from './Legend.jsx';
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
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Render markers */}
      {markers
        .filter(marker => marker.id !== 'user' && marker.position)
        .map(marker => (
          <CustomIcon
            key={marker.id}
            position={marker.position}
            popupContent={marker.popupContent}
            iconClass={marker.iconClass}
            iconColor={marker.iconColor}
            iconSize={marker.iconSize}
          />
        ))}

      {/* User location marker */}
      <UserLocationMarker position={position} iconUrl="/icons/blue_pin.png" />

      {/* Legend component */}
      <Legend markers={markers} />
    </MapContainer>
  );
};

export default Map;
