import React from 'react';
import './Movement.scss';

import { ILatLng, IMovement } from '../ts-interfaces/interfaces';

const Movement = (props: { onClick: any, selected?: boolean, movement: IMovement}) => {

  const colorScheme = {
    background: `#ffffff linear-gradient(90deg,${props.movement.color},${props.movement.color} 1em, ${props.movement.color}37 0) padding-box`,
    border: `0.3em solid ${props.selected ? props.movement.color : `${props.movement.color}37`}`,
  };

  const formatLatLng = (latlng: ILatLng) => {
    return `Latitude: ${latlng.lat}; Longitude: ${latlng.lng}`;
  };

  return (
    <div className="movement" style={colorScheme} onClick={props.onClick}>
      <header style={{borderColor: props.movement.color}}>
        <div>Pick-up (S) at {formatLatLng(props.movement.start)}</div>
        <div>Drop-off (E) at {formatLatLng(props.movement.end)}</div>
      </header>
      <div>{props.movement.description}</div>
    </div>
  );
};

export default Movement;