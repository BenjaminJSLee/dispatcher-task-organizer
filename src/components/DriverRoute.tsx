import React from 'react';
import './DriverRoute.scss';

interface ILatLng {
  lat: number;
  lng: number;
}

const DriverRoute = (props: any) => {

  const route = props.driverRoute.map((coord: ILatLng, i: number) => {
    return (
      <div key={i} className="place">
        <span className="place--number">{i+1}</span>
        <div className="place--description">
          Latitude: {coord.lat}
          <br/>
          Longitude: {coord.lng}
        </div>
      </div>
    );
  });

  return (
    <div className="driver-route">
      <div className="path-list">
        {route}
      </div>
    </div>
  );
};

export default DriverRoute;