import React, { useState } from 'react';
import MovementList from './MovementList';
import Movement from './Movement';
import Button from './Button';

import './MovementController.scss';
import Confirm from './Confirm';
import MovementForm from './MovementForm';

const READ = "READ";
const EDIT = "EDIT";
const NEW = "NEW";
const DELETE = "DELETE";

interface ILatLng {
  lat: number;
  lng: number;
}

interface IMovement {
  id: number,
  start: ILatLng,
  end: ILatLng,
  description: string,
  color: string;

}

const MovementController = (props: any) => {

  const [view, setView] = useState(READ);

  const verify = (movement: IMovement) => {
    return true;
  };

  const remove = (selected: number | null) => {
    if (selected !== null) {
      props.removeMovement(selected);
    }
    setView(READ);
  };

  const save = (movement: IMovement) => {
    if(!verify(movement)) return;
    props.addMovement(movement);
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
            onClick={() => setView(NEW)}
          >ADD</Button>
          <Button warning disabled={props.selected === null}
            onClick={() => setView(EDIT)}
          >EDIT</Button>
          <Button danger disabled={props.selected === null}
            onClick={() => setView(DELETE)}
          >DELETE</Button>
        </div>
      </>
      }
      { view === NEW &&
        <MovementForm
          movement={null}
          onBack={() => setView(READ)}
          onSave={save}
        />
      }
      { view === EDIT &&
        <MovementForm
          movement={props.movements.find(({id}: { id: number }) => id === props.selected)}
          onBack={() => setView(READ)}
          onSave={save}
        />
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