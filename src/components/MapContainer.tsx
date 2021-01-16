import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapContainer  = (props: any) => {
  return (
    <Map
      google={props.google}
      zoom={14}
      initialCenter={
        {
          lat: -1.2884,
          lng: 36.8233
        }
      }
    />
  );
}

export default GoogleApiWrapper({
  apiKey: `${""/*process.env.REACT_APP_MAPS_API_KEY*/}`
})(MapContainer);