import React from 'react';
import './App.scss';
import Movement from './components/Movement';

function App() {
  return (
    <div>
      <Movement 
        selected
        onClick={null}
        movement={{
          id: 1,
          start: {lat: 2.0001, lng: 1.0011},
          end: {lat: 20.2821, lng: 15.0913},
          description: "Groceries for Safeway at 1234 Fake St, Toronto, Ontario",
          color: "#54a0ff",
        }}
      />
      <Movement 
        onClick={null}
        movement={{
          id: 2,
          start: {lat: 2.0001, lng: 1.0011},
          end: {lat: 20.2821, lng: 15.0913},
          description: "Groceries for Safeway at 1234 Fake St, Toronto, Ontario",
          color: "#00FF00",
        }}
      />
    </div>
  );
}

export default App;
