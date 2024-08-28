import React, { useState, useRef } from "react";
import { Marker, Popup, useMapEvent, useMapEvents } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

interface DraggableMarkerProps {
    position: [number, number];
    setPosition: (pos: [number, number]) => void;
    addressName: string;
    setLatitude: (lat: number) => void;
    setLongitude: (lon: number) => void;
}

const DraggableMarker: React.FC<DraggableMarkerProps> = ({
    position,
    setPosition,
    addressName,
    setLatitude,
    setLongitude,
}) => {
    const [draggable, setDraggable] = useState(true);
    const markerRef = useRef<L.Marker>(null);

    // useMapEvent('click', (e) => {
    //     setPosition([e.latlng.lat, e.latlng.lng]);
    //     setLatitude(e.latlng.lat);
    //     setLongitude(e.latlng.lng);
    // });
    const map = useMapEvents({
        click() {
          map.locate();
        },
        locationfound(e) {
          // setPosition([e.latlng.lat, e.latlng.lng]);
          // map.flyTo(e.latlng, map.getZoom());
          map.flyTo(position, map.getZoom());
        },
      });

    const eventHandlers = {
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                const newPos = marker.getLatLng();
                setPosition([newPos.lat, newPos.lng]);
                setLatitude(newPos.lat);
                setLongitude(newPos.lng);
            }
        },
    };

    const toggleDraggable = () => {
        setDraggable((d) => !d);
    };

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? `${addressName} (Drag me!)`
                        : `${addressName} (Click here to make draggable)`}
                </span>
            </Popup>
        </Marker>
    );
};

export default DraggableMarker;
