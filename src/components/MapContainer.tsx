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
    animation: google.maps.Animation.DROP,
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
    animation: google.maps.Animation.DROP,
    // icon: {
    //   path: google.maps.SymbolPath.CIRCLE,
    //   scale: 7,
    // },
  });

  return {
    id: movement.id,
    line,
    start,
    end,
  };
};

const animatePath = (line: google.maps.Polyline) => {
  let count = 100;
  return setInterval(() => {
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
  const [paths, setPaths]: [{[key: number]: Path}, Function] = useState({});
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  
  const handleAPILoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);
  };

  useEffect(() => {
    if (map === null || maps === null || props.view !== "MOVEMENTS") return;

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

    return () => {
      setPaths((prev: {[key: number]: Path}) => {
        for (const id in prev) {
          const path: Path = prev[id];
          path.start.setMap(null);
          path.end.setMap(null);
          path.line.setMap(null);
        }
        return prev;
      });
    };

  }, [props.movements, props.view, map, maps]);

  useEffect(() => {
    const curMap: any = map;
    const path = paths[props.selected];
    if (path !== undefined && curMap !== null) {
      const start: any = path.start.getPosition();
      const end: any = path.end.getPosition();
      const animation = animatePath(path.line);
      const bounds = new google.maps.LatLngBounds(start).extend(end);
      curMap.fitBounds(bounds);
      curMap.panToBounds(bounds, 200);
      return () => clearInterval(animation);
    };
  }, [props.selected, paths, map]);

  useEffect(() => {
    const curMap: any = map;
    if (curMap === null) return;
    const bounds = new google.maps.LatLngBounds();
    for(const key in paths) {
      const start = paths[key].start.getPosition();
      const end = paths[key].end.getPosition();
      if (start && end) bounds.extend(start).extend(end);
    }
    curMap.fitBounds(bounds);
    curMap.panToBounds(bounds);
  }, [paths, map, props.view]);

  useEffect(() => {
    if (map === null || props.view !== "ROUTE") return;
    const line = new google.maps.Polyline({
      path: props.driverRoute,
      strokeOpacity: 0.25,
      strokeWeight: 8,
      strokeColor: "#ffffff",
      icons: [{
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillColor: "#ffffff",
          strokeColor: "#ffffff",
          strokeOpacity: 1,
          scale: 1
        },
        offset: '0',
        repeat: '25px'
      }],
    });
    line.setMap(map);
    const animation = animatePath(line);
    return () => {
      clearInterval(animation);
      line.setMap(null);
    };
  }, [props.driverRoute, props.view, map]);

  return (
    <div className="map-container">
      <Map
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: ""/* process.env.REACT_APP_MAPS_API_KEY */ }}
        defaultCenter={
          {
            lat: 0,
            lng: 0,
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