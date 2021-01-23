import { IMovement, ILatLng } from '../ts-interfaces/interfaces';

/** Function findPath takes an array of movements (movement: two coordinates) 
 * and calculates a route in which each coordinate is visited. The stipulation
 * for finding this path is that each movement contains a start and an end point,
 * and the start point must be visited first before its corresponding end point,
 * otherwise the endpoint is not counted as "visited".
 * 
 * The route is returned as an array of lat-long coordinates, where the first
 * coordinate is the starting point and the last coordinate is the ending point.
 * 
 * @param movements array of movements
 * @returns array of coordinates
 */
const findPath = (movements: IMovement[]) => {
  if (movements.length === 0) return [];

  const visited: any = { length: 1, [`${movements[0].id}`]: true };
  const results = [ movements[0].start ];
  // length is multiplied by two to account for the two coordinates per movement
  while (visited.length < movements.length * 2) {
    let top = results[results.length-1];
    let next: any = {
      key: null,
      coord: null,
    };
    // used to compare distance difference between the last coord and all other coords
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
    // checks to see if the next coord is the same as the last coord
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

export {
  findPath,
  calcDist,
};