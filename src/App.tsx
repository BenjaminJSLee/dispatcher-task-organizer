import React, { useEffect, useState } from 'react';
import './App.scss';
import Button from './components/Button';
import DriverRoute from './components/DriverRoute';
import MapContainer from './components/MapContainer';
import MovementController from './components/MovementController';

import { findPath } from './helpers/path-finding';

import { ILatLng, IMovement } from './ts-interfaces/interfaces';
import data from './data/init-data.json';

let created_movements = data.length;  // Would usually get an id from the DB
const MOVEMENTS = "MOVEMENTS";
const ROUTE = "ROUTE";
const ALL = "ALL";

function App() {

  const [selected, setSelected]: [number | null, Function] = useState(null);
  const [movements, setMovements]: [IMovement[], Function] = useState(data);
  const [driverRoute, setDriverRoute]: [ILatLng[], Function] = useState([]);
  const [view, setView]: [string, Function] = useState(MOVEMENTS);

  useEffect(() => {
    const route = findPath(movements);
    setDriverRoute(route);
  }, [movements]);

  const addMovement = (movement: IMovement) => {
    const id = movement.id || ++created_movements;
    setMovements((prev: IMovement[]) => {
      return [
        { ...movement, id, },
        ...prev.filter((m: any) => m.id !== id),
      ];
    });

  };

  const removeMovement = (id: number) => {
    const newMovements = movements.filter((movement) => movement.id !== id);
    setMovements(newMovements);
    setSelected(null);
  };

  const handleViewChange = (view: string) => {
    setSelected(null);
    setView(view);
  };

  return (
    <main>
      { (view === MOVEMENTS || view === ALL) && 
        <MovementController
          movements={movements}
          selected={selected}
          setSelected={setSelected}
          addMovement={addMovement}
          removeMovement={removeMovement}
        />
      }
      { view === ROUTE &&
        <DriverRoute 
          movements={movements}
          driverRoute={driverRoute}
        />
      }
      <div className="map-controller">
        <MapContainer
          view={view}
          selected={selected}
          movements={movements}
          driverRoute={driverRoute}
        />
        <div className="tabs">
          <Button tab
            selected={view === MOVEMENTS}
            onClick={() => handleViewChange(MOVEMENTS)}
          >
            {MOVEMENTS}
          </Button>
          <Button tab
            selected={view === ROUTE}
            onClick={() => handleViewChange(ROUTE)}
          >
            {ROUTE}
          </Button>
          <Button tab
            selected={view === ALL}
            onClick={() => handleViewChange(ALL)}
          >
            {ALL}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
