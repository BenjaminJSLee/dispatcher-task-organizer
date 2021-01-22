import React, { useState } from 'react';
import './App.scss';
import DriverRoute from './components/DriverRoute';
import MapContainer from './components/MapContainer';
import MovementController from './components/MovementController';

const data = [
  { 
    id: 1,
    start: { lat: 20.0001, lng: 20.0001},
    end: { lat: 21.0001, lng: 20.0001},
    color: "#cc0000",
    description: "Material delivery to Fake St, Toronto, Ontario",
  },
  { 
    id: 2,
    start: { lat: -1.2884, lng: 36.8233},
    end: { lat: 0, lng: 37.8233},
    color: "#00cc00",
    description: "Material delivery to Fake St, Toronto, Ontario",
  },
  { 
    id: 3,
    start: { lat: -2.2884, lng: 36.8233},
    end: { lat: 0, lng: 37.8233},
    color: "#0000cc",
    description: "Material delivery to Fake St, Toronto, Ontario",
  },
];

let created_movements = 3;  // Would usually get an id from the DB

function App() {

  const [selected, setSelected] = useState(null);
  const [movements, setMovements] = useState(data);

  const addMovement = (movement: any) => {
    const id = movement.id || ++created_movements;
    setMovements((prev: any) => {
      return [
        { ...movement, id, },
        ...prev.filter((movement: any) => movement.id !== id),
      ];
    });

  };

  const removeMovement = (id: number) => {
    const newMovements = movements.filter((movement) => movement.id !== id);
    setMovements(newMovements);
    setSelected(null);
  };

  return (
    <main>
      <MovementController
        movements={movements}
        selected={selected}
        setSelected={setSelected}
        addMovement={addMovement}
        removeMovement={removeMovement}
      />
      <MapContainer
        selected={selected}
        movements={movements}
      />
      <DriverRoute 
        movements={movements}
      />
    </main>
  );
}

export default App;
