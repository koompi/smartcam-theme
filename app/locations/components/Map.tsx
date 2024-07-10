"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import axios from "axios";

interface MapProps {
  zoom: number;
  position: L.LatLngExpression;
  addressName: string;
  setAddressName: Function;
  setPosition: Function;
  setAddress: any;
  setMap: any;
}

function DraggableMarker({
  position,
  setPosition,
  addressName,
  setLatitude,
  setLongitude,
  setMap,
}: {
  position: L.LatLngExpression | L.LatLngTuple;
  setPosition: Function;
  addressName: string;
  setLatitude: Function;
  setLongitude: Function;
  setMap: Function;
}) {
  const [draggable, setDraggable] = useState(true);
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          map.flyTo(marker.getLatLng(), map.getZoom());
          setLatitude(marker.getLatLng().lat);
          setLongitude(marker.getLatLng().lng);
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setLatitude, setLongitude, setPosition]
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound() {
      map.flyTo(position, map.getZoom());
    },
  });

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? addressName : addressName}
        </span>
      </Popup>
    </Marker>
  );
}

const Map: React.FC<MapProps> = ({
  zoom,
  position,
  setPosition,
  addressName,
  setAddressName,
  setAddress,
  setMap,
}) => {
  const [latitude, setLatitude] = useState<number>(11.551512108111616);
  const [longitude, setLongitude] = useState<number>(104.88767623901369);
  const center: L.LatLngExpression = [latitude, longitude];

  useEffect(() => {
    const fetchAddress = async () => {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      try {
        const response = await axios.get(url);
        setAddress(response.data.address);
        setAddressName(response.data.display_name);
        setMap(response.data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    if (position) {
      fetchAddress();
    }
  }, [latitude, longitude, position, setAddressName, setAddress, setMap]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        position={position}
        setPosition={setPosition}
        addressName={addressName}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setMap={setMap}
      />
    </MapContainer>
  );
};

export default Map;
