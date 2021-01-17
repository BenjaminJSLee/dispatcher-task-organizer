import React from 'react';
import Movement from './Movement';


const MovementList = (props: any) => {

  const movements = props.movements.map((movement: any) => {
    return (
      <Movement
        start={movement.start}
        end={movement.end}
        description={movement.description}
      />
    )
  });

  return (
    <>
    <div className="movement-list">
      {movements}
    </div>
    <button>Add</button>
    <button>Edit</button>
    <button>Delete</button>
    </>
  );
};

export default MovementList;