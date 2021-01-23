import { ILatLng, Paths } from '../ts-interfaces/interfaces';

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
      repeat: '25px'
    }],
  });
  const start = new google.maps.Marker({
    map,
    position: movement.start,
    title: "start",
    label: "S",
  });
  const end = new google.maps.Marker({
    map,
    position: movement.end,
    title: "end",
    label: "E",
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
  for (let i = 0; i < path.length; i++) {
    markers.push(new google.maps.Marker({
      map,
      position: path[i],
      title: `${i+1}`,
      label: `${i+1}`,
    }));
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

const renderPaths = (map: any, maps: any, movements: any) => {
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