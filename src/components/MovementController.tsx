import React, { useState } from 'react';
import MovementList from './MovementList';
import Movement from './Movement';
import Button from './Button';
import Error from './Error';

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

const areMovementsEqual = (a: IMovement, b: IMovement) => {
  const sameStart = a.start.lat === b.start.lat && a.start.lng === b.start.lng;
  const sameEnd = a.end.lat === b.end.lat && a.end.lng === b.end.lng;
  const sameDesc = a.description === b.description;
  return sameStart && sameEnd && sameDesc;
};

const MovementController = (props: any) => {

  const [view, setView] = useState(READ);
  const [error, setError] = useState("");

  const verify = (movement: IMovement) => {
    if (movement.start.lat === movement.end.lat && movement.start.lng === movement.end.lng) {
      return "Starting and ending points cannot be the same coordinates";
    }
    const found = props.movements.find((m: IMovement) => m.id !== movement.id && areMovementsEqual(m, movement));
    if (found) return "Given movement data already exists";
    return "";
  };

  const remove = (selected: number | null) => {
    if (selected !== null) {
      props.removeMovement(selected);
    }
    setView(READ);
  };

  const save = (movement: IMovement) => {
    const msg = verify(movement);
    if (msg) return setError(msg);
    props.addMovement(movement);
    setError("");
    setView(READ);
  };

  const handleViewChange = (view: string) => {
    setError("");
    setView(view);
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
            onClick={() => handleViewChange(NEW)}
          >ADD</Button>
          <Button warning disabled={props.selected === null}
            onClick={() => handleViewChange(EDIT)}
          >EDIT</Button>
          <Button danger disabled={props.selected === null}
            onClick={() => handleViewChange(DELETE)}
          >DELETE</Button>
        </div>
      </>
      }
      { view === NEW &&
        <MovementForm
          movement={null}
          onBack={() => handleViewChange(READ)}
          onSave={save}
        />
      }
      { view === EDIT &&
        <MovementForm
          movement={props.movements.find(({id}: { id: number }) => id === props.selected)}
          onBack={() => handleViewChange(READ)}
          onSave={save}
        />
      }
      { view === DELETE &&
        <Confirm
          onConfirm={() => remove(props.selected)}
          onCancel={() => handleViewChange(READ)}
          message={"Delete the selected movement?"}
        >
          <Movement 
            onClick={null} 
            movement={props.movements.find(({id}: { id: number }) => id === props.selected)}
          />
        </Confirm>
      }
      <Error 
        hidden={!error}
        clear={() => setError("")}
      >Error: {error}</Error>
    </div>
  );
};

export default MovementController;