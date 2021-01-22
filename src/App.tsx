import React, { useEffect, useState } from 'react';
import './App.scss';
import DriverRoute from './components/DriverRoute';
import MapContainer from './components/MapContainer';
import MovementController from './components/MovementController';

interface ILatLng {
  lat: number;
  lng: number;
}

const findPath = (movements: any) => {
  if (movements.length === 0) return [];

  const visited: any = { length: 0, [`${movements[0].id}`]: true };
  const results = [ movements[0].start ];

  while (visited.length < movements.length * 2 - 1) {
    let top = results[results.length-1];
    console.log(results);
    let next: any = {
      key: null,
      coord: null,
    };
    let minDist = Number.MAX_VALUE;
    for (const movement of movements) {
      const {id, start, end} = movement;
      let dist;
      if (!visited[`${id}`]) {
        dist = calcDist(top, start);
        if (dist < minDist) {
          minDist = dist;
          next = { coord: start, key: `${id}` };
        }
      } else if (!visited[`${id}e`]) {
        dist = calcDist(top, end);
        if (dist < minDist) {
          minDist = dist;
          next = { coord: end, key: `${id}e` };
        }
      }
    }
    if (!(next.coord.lat === top.lat && next.coord.lng === top.lng)) {
      results.push(next.coord);
    }
    visited.length++;
    visited[next.key] = true;
  }
  return results;
};

const calcDist = (start: ILatLng, end: ILatLng) => {
  const dx = Math.abs(end.lat - start.lat);
  const dy = Math.abs(end.lng - start.lng);
  const dist = Math.sqrt(dx*dx + dy*dy);
  return dist;
};

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
  const [driverRoute, setDriverRoute]: [any, any] = useState([]);

  useEffect(() => {
    setDriverRoute(findPath(movements));
  }, [movements]);

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
        driverRoute={driverRoute}
      />
    </main>
  );
}

export default App;
