import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapCenterContext } from '../contexts/MapCenterContext';
import 'leaflet/dist/leaflet.css';
import '../assets/styles/MyMaps.css';

function MyMapComponent({ places }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const { mapCenter } = useContext(MapCenterContext);

  const current_icon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/6068/6068816.png',
    iconSize: [41, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  });

  const icon = new L.Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [41, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  });

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      const onLocationFound = (e) => {
        // Introduce a delay before updating the location
        setTimeout(() => {
          setCurrentLocation(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        }, 1000); // Delay of 1 second
        map.off('locationfound', onLocationFound); // Remove the event listener
      };

      map.on('locationfound', onLocationFound);
      map.locate();

      return () => {
        map.off('locationfound', onLocationFound);
      };
    }, [map]);

    return currentLocation === null ? null : (
      <Marker position={currentLocation} icon={current_icon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  const ChangeView = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        // map.setView(center);
        map.flyTo(center, 15, { duration: 0.1 });
    }, [center, map]);
    // return null;
  };

  return (
    <MapContainer 
        class="w-screen h-screen display:block"
        center={mapCenter} zoom={15} scrollWheelZoom={true}>
      <ChangeView center={mapCenter} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
      {places.map((place, index) => (
        <Marker
          key={index}
          position={[place.lat, place.lon]}
          icon={icon}
        >
          <Popup>
            {place.name} {/* Assuming each place has a 'name' property */}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MyMapComponent;