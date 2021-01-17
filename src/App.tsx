import React from 'react';
import './App.scss';
import './components/MapContainer'
import MapContainer from './components/MapContainer';

const data = [
  { 
    id: 1,
    start: { lat: 100.0001, lng: 100.0001},
    end: { lat: 101.0001, lng: 100.0001},
    color: "#FFFFFF",
    description: "",
  },
  { 
    id: 2,
    start: { lat: -1.2884, lng: 36.8233},
    end: { lat: 0, lng: 37.8233},
    color: "#000000",
    description: "",
  },
];

function App() {
  return (
    <div>
      <MapContainer
        movements={data}
      >
        
      </MapContainer>
    </div>
  );
}

export default App;
