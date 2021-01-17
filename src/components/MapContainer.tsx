import React from 'react';
import Map from 'google-map-react';
import './MapContainer.scss'

const MapContainer  = (props: any) => {

  const renderPaths = (map: object, maps: any) => {
    for (const movement of props.movements) {
      const path = new maps.Polyline({
        path: [movement.start, movement.end]
      });
      path.setMap(map);
    }
  }

  const handleAPILoaded = (map: object, maps: any) => {
    renderPaths(map,maps);
  };

  return (
    <div className="map-container">
      <Map
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: ""/* process.env.REACT_APP_MAPS_API_KEY */ }}
        defaultCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
        defaultZoom={14}
        onGoogleApiLoaded={({ map, maps }) => handleAPILoaded(map, maps)}
      >
      </Map>
    </div>
  );
}
export default MapContainer;