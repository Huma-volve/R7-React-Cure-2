import { useMap } from "react-leaflet";

interface ChangeMapViewProps {
  center: [number, number];
}

export function ChangeMapView({ center }: ChangeMapViewProps) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}