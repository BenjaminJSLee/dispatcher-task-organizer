import React, { useState } from 'react';
import Button from './Button';

const MovementForm = (props: any) => {

  const [opts, setOpts] = useState(props.movement || {
    id: null,
    start: { lat: 0, lng: 0 },
    end: { lat: 0, lng: 0 },
    color: "",
    description: "",
  });

  const handleChange = (change: string | number, target: string) => {
    setOpts((prev: any) => {
      let key = "";
      let val = null;
      switch (target) {
        case "START:LAT":
          key = "start";
          val = { lat: change, lng: prev.start.lng };
          break;
        case "START:LNG":
          key = "start";
          val = { lat: prev.start.lat, lng: change };
          break;
        case "END:LAT":
          key = "end";
          val = { lat: change, lng: prev.end.lng };
          break;
        case "END:LONG":
          key = "end";
          val = { lat: prev.end.lat, lng: change };
          break;
        case "DESCRIPTION":
          key = "description";
          val = change;
          break;
      }

      return {
        ...prev,
        [key]: val,
      }
    });
  };

  return (
    <div>
      <div className="movement-form">
        <div className="latlng-form">
          <h1>Start Point</h1>
          <label>Latitude</label>
          <input 
            type="number"
            value={opts.start.lat}
            onChange={(e) => handleChange(e.target.value, "START:LAT")}
          />
          <label>Longitude</label>
          <input 
            type="number"
            value={opts.start.lng}
            onChange={(e) => handleChange(e.target.value, "START:LNG")}
          />
        </div>
        <div className="latlng-form">
          <h1>End Point</h1>
          <label>Latitude</label>
          <input 
            type="number"
            value={opts.end.lat}
            onChange={(e) => handleChange(e.target.value, "END:LAT")}
          />
          <label>Longitude</label>
          <input 
            type="number"
            value={opts.end.lng}
            onChange={(e) => handleChange(e.target.value, "END:LNG")}
          />
        </div>
        <label>Description</label>
        <textarea
          value={opts.description}
          onChange={(e) => handleChange(e.target.value, "DESCRIPTION")}
        />
      </div>
      <div className="button-list">
        <Button
          onClick={props.onBack}
        >BACK</Button>
        <Button success
          onClick={() => props.onSave()}
        >SAVE</Button>
      </div>
    </div>
  );
};

export default MovementForm;