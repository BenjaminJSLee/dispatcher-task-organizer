import React from 'react';
import MovementList from './MovementList';


const MovementController = (props: any) => {
  return (
    <div>
      <MovementList 
        movements={props.movements}
      />
    </div>
  );
};

export default MovementController;