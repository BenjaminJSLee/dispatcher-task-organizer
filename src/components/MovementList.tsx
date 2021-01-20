import React from 'react';
import Movement from './Movement';
import './MovementList.scss';

const MovementList = (props: any) => {

  const movements = props.movements.map((movement: any) => {
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