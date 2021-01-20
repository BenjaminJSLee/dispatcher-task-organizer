import React, { useState } from 'react';
import MovementList from './MovementList';
import Movement from './Movement';
import Button from './Button';

import './MovementController.scss';
import Confirm from './Confirm';

const READ = "READ";
const FORM = "FORM";
const DELETE = "DELETE";

const MovementController = (props: any) => {

  const [view, setView] = useState(READ);

  const remove = (selected: number | null) => {
    if (selected !== null) {
      props.removeMovement(selected);
    }
    setView(READ);
  };

  return (
    <div className="movement-controller">
      { view === READ &&
      <>
        <MovementList 
          movements={props.movements}
          selected={props.selected}
          setSelected={props.setSelected}
        /> 
        <div className="button-list">
          <Button success
            onClick={() => setView(FORM)}
          >ADD</Button>
          <Button warning disabled={props.selected === null}
            onClick={() => setView(FORM)}
          >EDIT</Button>
          <Button danger disabled={props.selected === null}
            onClick={() => setView(DELETE)}
          >DELETE</Button>
        </div>
      </>
      }
      { view === FORM &&
        <>
          <Button
            onClick={() => setView(READ)}
          >BACK</Button>
          <Button success
            onClick={() => setView(READ)}
          >SAVE</Button>
        </>
      }
      { view === DELETE &&
        <Confirm
          onConfirm={() => remove(props.selected)}
          onCancel={() => setView(READ)}
          message={"Delete the selected movement?"}
        >
          <Movement 
            onClick={null} 
            movement={props.movements.find(({id}: { id: number }) => id === props.selected)}
          />
        </Confirm>
      }
    </div>
  );
};

export default MovementController;