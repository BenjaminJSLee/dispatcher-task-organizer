import React from 'react';

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


const DriverRoute = (props: any) => {
  return (
    <div>
    </div>
  );
};

export default DriverRoute;