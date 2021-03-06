import { ILatLng, Paths, IMovement } from '../ts-interfaces/interfaces';

const createPath = (movement: IMovement, map: any, maps: any) => {

  const icon = {
    path: "M-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0",
    fillColor: "#f7f7f7",
    strokeColor: movement.color,
    fillOpacity: 1,
    anchor: new google.maps.Point(0,0),
    strokeWeight: 3,
    scale: 0.5
  }

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
      repeat: '25px'
    }],
  });
  const start = new google.maps.Marker({
    map,
    position: movement.start,
    title: "start",
    label: "S",
    icon,
    zIndex: 2,
  });
  const end = new google.maps.Marker({
    map,
    position: movement.end,
    title: "end",
    label: "E",
    icon,
    zIndex: 1,
  });

  return {
    id: movement.id,
    line,
    start,
    end,
  };
};

const createRoute = (path: ILatLng[], map: any, vertices: boolean = true) => {
  const line = new google.maps.Polyline({
    map,
    path,
    strokeOpacity: 0.25,
    strokeWeight: 8,
    strokeColor: "#000000",
    zIndex: 101,
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
  if (!vertices) return { line, markers: [] };
  const markers = [];
  const visited: any = {};
  for (let i = 0; i < path.length; i++) {
    if (!visited[`${path[i].lat}-${path[i].lng}`]) {
      const marker = new google.maps.Marker({
        map,
        position: path[i],
        title: `${i+1}`,
        label: `${i+1}`,
      })
      markers.push(marker);
      visited[`${path[i].lat}-${path[i].lng}`] = marker;
    } else {
      const marker = visited[`${path[i].lat}-${path[i].lng}`];
      marker.setLabel(`${marker.getLabel()}/${i+1}`);
    }
  }
  return { line, markers };
};

const animatePath = (line: google.maps.Polyline) => {
  let count = 100;
  return setInterval(() => {
    count = (count + 1) % 100;

    const icons = line.get("icons");
    icons[0].offset = count + "px";
    line.set("icons", icons);
  }, 25);
};

const renderPaths = (map: any, maps: any, movements: IMovement[]) => {
  const pathObject: Paths = {};
  for (const movement of movements) {
    pathObject[movement.id] = createPath(movement, map, maps);
  }
  return pathObject;
};

export {
  createPath,
  createRoute,
  animatePath,
  renderPaths,
};