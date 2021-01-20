import React, { useState } from 'react';
import './App.scss';
import MovementController from './components/MovementController';

function App() {

  const [selected, setSelected] = useState(null);

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

  return (
    <div>
      <MovementController
        movements={data}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}

export default App;
