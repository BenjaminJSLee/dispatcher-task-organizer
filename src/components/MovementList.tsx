import React, { useState } from 'react';
import Movement from './Movement';
import './MovementList.scss';


const MovementList = (props: any) => {
  const [selected, setSelected]: [number | null, Function] = useState(null);

  const movements = props.movements.map((movement: any) => {
    return (
      <Movement
        key={movement.id}
        onClick={() => setSelected(movement.id)}
        selected={selected === movement.id}
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