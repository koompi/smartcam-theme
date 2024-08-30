import { useEffect } from "react";
import { useMap } from "react-leaflet/hooks";

export const FlyToLocation = ({
    position,
    setPosition,
  }: {
    position: [number, number];
    setPosition: (pos: [number, number]) => void;
  }) => {
    const map = useMap();
  
    useEffect(() => {
      if (position) {
        map.flyTo(position, map.getZoom(), {
          animate: true,
          duration: 1.5,
        });
      }
    }, [position, map]);
  
    return null;
  };