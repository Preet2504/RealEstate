import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map({ address }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`);
        const data = await response.json();
        if (data && data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          console.error('No coordinates found for the address:', address);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={position || [0, 0]} zoom={position ? 13 : 1} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {position && <Marker position={position}><Popup>{address}</Popup></Marker>}
      </MapContainer>
    </div>
  );
}

export default Map;
