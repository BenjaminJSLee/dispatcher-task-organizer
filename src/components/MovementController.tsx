import React from 'react';
import MovementList from './MovementList';
import Button from './Button';

import './MovementController.scss';


const MovementController = (props: any) => {
  return (
    <div className="movement-controller">
      { 
      <MovementList 
        movements={props.movements}
      /> 
      }
      {
        
      }
      <div className="button-list">
        <Button add
        
        >ADD</Button>
        <Button edit
        
        >EDIT</Button>
        <Button delete
        
        >DELETE</Button>
      </div>
    </div>
  );
};

export default MovementController;