import React, { useEffect, useState } from 'react';
import Map from 'google-map-react';
import './MapContainer.scss'

interface Path {
  start: google.maps.Marker,
  end: google.maps.Marker,
  line: google.maps.Polyline,
}

const createPath = (movement: any, map: any, maps: any) => {
  const line = new maps.Polyline({
    map,
    path: [movement.start, movement.end],
    strokeOpacity: 1,
    strokeColor: movement.color,
    icons: [{
      icon: {
        path: 'M -0.75,0 0,-1.5 0.75,0 Z',
        strokeColor: movement.color,
        strokeOpacity: 1,
        scale: 4
      },
      offset: '0',
      repeat: '20px'
    }],
  });
  const start = new google.maps.Marker({
    map,
    position: movement.start,
    title: "start",
    label: "S",
    // icon: {
    //   path: google.maps.SymbolPath.CIRCLE,
    //   scale: 7,
    // },
  });
  const end = new google.maps.Marker({
    map,
    position: movement.end,
    title: "end",
    label: "E",
    // icon: {
    //   path: google.maps.SymbolPath.CIRCLE,
    //   scale: 7,
    // },
  });

  animatePath(line);

  return {
    line,
    start,
    end,
  };
};

const animatePath = (line: google.maps.Polyline) => {
  let count = 100;
  setInterval(() => {
    count = (count + 1) % 100;

    const icons = line.get("icons");
    icons[0].offset = count + "px";
    line.set("icons", icons);
  }, 40);
};

const renderPaths = (map: any, maps: any, movements: any) => {
  const pathObject: {[key: number]: Path} = {};
  for (const movement of movements) {
    pathObject[movement.id] = createPath(movement, map, maps);
  }
  return pathObject;
};

const MapContainer  = (props: any) => {
  const [paths, setPaths]: [{[key: number]: Path}, Function] = useState([]);
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);

  const updatePath = (movement: any) => {
    setPaths((prev: {[key: number]: Path}) => {
      const { start, end, line } = prev[movement.id];
      start.setPosition(movement.start);
      end.setPosition(movement.end);
      return {
        ...prev,
        [movement.id]: {
          start,
          end,
          line,
        }
      };
    });
  };
  
  const deletePath = (id: number) => {
    setPaths((prev: {[key: number]: Path}) => {
      const path: Path = prev[id];
      path.start.setMap(null);
      path.end.setMap(null);
      path.line.setMap(null);
      return {
        ...prev,
        [id]: undefined,
      };
    });
  };
  
  const handleAPILoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);
  };

  useEffect(() => {
    if (map === null || maps === null) return;

    setPaths((prev: {[key: number]: Path}) => {
      for (const id in prev) {
        const path: Path = prev[id];
        path.start.setMap(null);
        path.end.setMap(null);
        path.line.setMap(null);
      }
      return {};
    });

    setPaths(renderPaths(map, maps, props.movements));

  }, [props.movements, map, maps]);

  useEffect(() => {
    const curMap: any = map;
    const path = paths[props.selected];
    if (path !== undefined && curMap !== null) {
      const start: any = path.start.getPosition();
      const end: any = path.end.getPosition();
      const bounds = new google.maps.LatLngBounds(start).extend(end);
      curMap.fitBounds(bounds);
      curMap.panToBounds(bounds, 100);
    };
  }, [props.selected, paths, map])

  return (
    <div className="map-container">
      <Map
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: ""/* process.env.REACT_APP_MAPS_API_KEY */ }}
        defaultCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
        defaultZoom={14}
        onGoogleApiLoaded={({ map, maps }) => handleAPILoaded(map, maps)}
      >
      </Map>
    </div>
  );
}
export default MapContainer;