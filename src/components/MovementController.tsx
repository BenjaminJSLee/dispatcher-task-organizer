import React, { useState } from 'react';
import MovementList from './MovementList';
import Button from './Button';

import './MovementController.scss';

const READ = "READ";
const FORM = "FORM";
const DELETE = "DELETE";

const MovementController = (props: any) => {

  const [view, setView] = useState("READ")

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
        <>
          <Button
            onClick={() => setView(READ)}
          >CANCEL</Button>
          <Button danger
            onClick={() => setView(READ)}
          >CONFIRM</Button>
        </>
      }
    </div>
  );
};

export default MovementController;