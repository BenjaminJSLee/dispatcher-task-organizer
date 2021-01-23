import React from 'react';
import Movement from './Movement';
import './MovementList.scss';

import { IMovement } from '../ts-interfaces/interfaces';

const MovementList = (props: any) => {

  const movements = props.movements.map((movement: IMovement) => {
    return (
      <Movement
        key={movement.id}
        onClick={() => props.setSelected(movement.id)}
        selected={props.selected === movement.id}
        movement={movement}
      />
    )
  });

  return (
    <div className="movement-list">
      {movements}
    </div>
  );
};

export default MovementList;