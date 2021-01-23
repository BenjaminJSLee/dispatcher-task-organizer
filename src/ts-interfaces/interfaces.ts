interface ILatLng {
  lat: number;
  lng: number;
}

interface Path {
  start: google.maps.Marker;
  end: google.maps.Marker;
  line: google.maps.Polyline;
}

interface Paths {
  [key: number]: Path;
}

interface IMovement {
  id: number,
  start: ILatLng,
  end: ILatLng,
  description: string,
  color: string;
}

export type {
  ILatLng,
  Path,
  Paths,
  IMovement,
};