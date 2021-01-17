import React from 'react';
import './Movement.scss';

interface LatLng {
  lat: number;
  lng: number;
}

const Movement = (props: {start: LatLng, end: LatLng, description: string}) => {

  const formatLatLng = (latlng: LatLng) => {
    return `Latitude: ${latlng.lat}; Longitude: ${latlng.lng}`;
  };

  return (
    <div className="movement">
      <header>
        <div>Pick-up (S) at {formatLatLng(props.start)}</div>
        <div>Drop-off (E) at {formatLatLng(props.end)}</div>
      </header>
      <p>{props.description}</p>
    </div>
  );
};

export default Movement;