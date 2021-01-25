import React, { useEffect, useState } from 'react';
import Map from 'google-map-react';

import { Path, Paths } from '../ts-interfaces/interfaces';

import {
  createRoute,
  animatePath,
  renderPaths,
} from '../helpers/map-ui';

import './MapContainer.scss'

const MapContainer  = (props: any) => {
  const [paths, setPaths]: [Paths, Function] = useState({});
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  
  const handleAPILoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);
  };

  // set movements markers and paths on map
  useEffect(() => {
    if (map === null || maps === null || (props.view !== "ALL" && props.view !== "MOVEMENTS")) return;

    setPaths((prev: Paths) => {
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
      setPaths((prev: Paths) => {
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

  // sets boundaries for the map to view a selected movement
  useEffect(() => {
    const curMap: any = map;
    const path = paths[props.selected];
    if (path !== undefined && curMap !== null) {
      const start: any = path.start.getPosition();
      const end: any = path.end.getPosition();
      path.start.setOptions({ zIndex: 100 });
      path.end.setOptions({ zIndex: 100 });
      path.line.setOptions({ zIndex: 100 });
      const animation = animatePath(path.line);
      const bounds = new google.maps.LatLngBounds(start).extend(end);
      curMap.fitBounds(bounds);
      curMap.panToBounds(bounds, 200);
      return () => {
        clearInterval(animation);
        path.start.setOptions({ zIndex: 2 });
        path.end.setOptions({ zIndex: 1 });
        path.line.setOptions({
          zIndex: 1,
        });
      };
    };
  }, [props.selected, paths, map]);

  // sets boundaries for the entire map view (including all markers and paths)
  useEffect(() => {
    const curMap: any = map;
    if (curMap === null) return;
    const bounds = new google.maps.LatLngBounds();
    for(const key in paths) {
      const start = paths[key].start.getPosition();
      const end = paths[key].end.getPosition();
      if (start && end) bounds.extend(start).extend(end);
    }
    if (bounds.isEmpty()) {
      curMap.setCenter({
        lat: 56.1304,
        lng: -106.3468,
      });
      curMap.setZoom(1);
    } else {
      curMap.fitBounds(bounds);
      curMap.panToBounds(bounds);
    }
  }, [paths, map, props.view]);

  // sets driver route path on the map
  useEffect(() => {
    if (map === null || (props.view !== "ALL" && props.view !== "ROUTE")) return;
    const { line, markers } = createRoute(props.driverRoute, map, props.view !== "ALL");
    const animation = animatePath(line);
    return () => {
      clearInterval(animation);
      line.setMap(null);
      for(const marker of markers) {
        marker.setMap(null);
      }
    };
  }, [props.driverRoute, props.view, map]);

  return (
    <div className="map-container">
      <Map
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY || "" }}
        defaultCenter={
          {
            lat: 56.1304,
            lng: -106.3468,
          }
        }
        defaultZoom={1}
        onGoogleApiLoaded={({ map, maps }) => handleAPILoaded(map, maps)}
      >
      </Map>
    </div>
  );
}
export default MapContainer;