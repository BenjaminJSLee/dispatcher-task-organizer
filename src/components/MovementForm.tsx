import React, { useState } from 'react';
import Button from './Button';

import './MovementForm.scss';

const MovementForm = (props: any) => {

  const [opts, setOpts] = useState(props.movement || {
    id: null,
    start: { lat: 0, lng: 0 },
    end: { lat: 0, lng: 0 },
    color: "#000000",
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
        case "END:LNG":
          key = "end";
          val = { lat: prev.end.lat, lng: change };
          break;
        case "DESCRIPTION":
          key = "description";
          val = change;
          break;
        case "COLOR":
          key = "color";
          val = change;
          break;
      }

      return {
        ...prev,
        [key]: val,
      }
    });
  };

  const cleanInput = (opts: any) => {
    const cleanedOpts = { ...opts };
    cleanedOpts.start = { lat: Number(opts.start.lat), lng: Number(opts.start.lng) };
    cleanedOpts.end = { lat: Number(opts.end.lat), lng: Number(opts.end.lng) };
    cleanedOpts.description = opts.description.trim();

    return cleanedOpts;
  };

  const handleSubmit = (opts: any) => {
    const cleanOpts = cleanInput(opts);
    props.onSave(cleanOpts);
  };

  return (
    <div>
      <div className="movement-form">
        <div className="latlng-form">
          <h4>Start Point</h4>
          <div>
            <label>Latitude</label>
            <input 
              type="number"
              value={opts.start.lat}
              onChange={(e) => handleChange(e.target.value, "START:LAT")}
            />
          </div>
          <div>
            <label>Longitude</label>
            <input 
              type="number"
              value={opts.start.lng}
              onChange={(e) => handleChange(e.target.value, "START:LNG")}
            />
          </div>
        </div>
        <div className="latlng-form">
          <h4>End Point</h4>
          <div>
            <label>Latitude</label>
            <input 
              type="number"
              value={opts.end.lat}
              onChange={(e) => handleChange(e.target.value, "END:LAT")}
            />
          </div>
          <div>
            <label>Longitude</label>
            <input 
              type="number"
              value={opts.end.lng}
              onChange={(e) => handleChange(e.target.value, "END:LNG")}
            />
          </div>
        </div>
        <div>
          <label><h4>Description</h4></label>
          <textarea
            value={opts.description}
            onChange={(e) => handleChange(e.target.value, "DESCRIPTION")}
          />
        </div>
        <div>
          <label><h4>Color</h4></label>
          <input 
            type="color"
            value={opts.color}
            onChange={(e) => handleChange(e.target.value, "COLOR")}
          />
        </div>
      </div>
      <div className="button-list">
        <Button
          onClick={props.onBack}
        >BACK</Button>
        <Button success
          onClick={() => handleSubmit(opts)}
        >SAVE</Button>
      </div>
    </div>
  );
};

export default MovementForm;