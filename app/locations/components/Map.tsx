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
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LatLngTuple } from "leaflet";

interface MapProps {
  zoom: number;
  position: [number, number];
  addressName: string;
  setAddressName: Function;
  setPosition: (pos: [number, number]) => void;
  setAddress: any;
  setMap: any;
}

function DraggableMarker({
  position,
  setPosition,
  addressName,
  setLatitude,
  setLongitude,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
  addressName: string;
  setLatitude: Function;
  setLongitude: Function;
}) {
  const [draggable, setDraggable] = useState(true);
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setLatitude(marker.getLatLng().lat);
          setLongitude(marker.getLatLng().lng);
          map.flyTo(marker.getLatLng(), map.getZoom());
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
    locationfound(_) {
      map.flyTo(position, map.getZoom());
    },
  });

  useEffect(() => {
    if (!map) return; // Ensure map is defined before running

    map.whenReady(() => {
      // Check if the new position is different from the current map center
      const currentCenter = map.getCenter();
      if (
        currentCenter.lat !== position[0] ||
        currentCenter.lng !== position[1]
      ) {
        map.flyTo(position, map.getZoom());
      }
    });
  }, [map, position]);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position as LatLngTuple}
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
  const [latitude, setLatitude] = useState<number>(position[0]);
  const [longitude, setLongitude] = useState<number>(position[1]);
  const center: L.LatLngExpression = [latitude, longitude];

  const [listPlace, setListPlace] = useState([]);

  const mapRef = useRef<any>(null); // Ref to store the map instance

  const [searchText, setSearchText] = useState<string>(""); // State for new text input
  const isFetching = useRef<boolean>(false); // Ref to track the fetching state
  const timeoutId = useRef<NodeJS.Timeout | null>(null); // Ref to store the timeout ID

  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current || !searchText) {
        setSearchText("");
        return;
      }

      isFetching.current = true; // Lock the loop

      const timeout = 5000; // Timeout in milliseconds

      const fetchWithTimeout = (
        url: string,
        options: RequestInit,
        timeout: number
      ): Promise<Response> => {
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error("Request timed out"));
          }, timeout);

          fetch(url, options)
            .then((response) => {
              clearTimeout(timer);
              resolve(response);
            })
            .catch((err) => {
              clearTimeout(timer);
              reject(err);
            });
        });
      };

      try {
        // Search
        const params = {
          q: searchText ? searchText : "",
          format: "json",
          addressdetails: 1,
          polygon_geojson: 0,
        };
        const queryString = new URLSearchParams(params as any).toString();

        const requestOptions: RequestInit = {
          method: "GET",
          redirect: "follow",
        };

        const response = await fetchWithTimeout(
          `${NOMINATIM_BASE_URL}${queryString}&accept-language=en%2Ckh&countrycodes=kh`,
          requestOptions,
          timeout
        );
        const result = await response.json();
        setListPlace(result);
      } catch (err) {
        console.log("err: ", err);
      } finally {
        isFetching.current = false; // Unlock the loop
      }
    };

    // Cleanup existing timeout if searchText changes
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Set a new timeout
    timeoutId.current = setTimeout(() => {
      fetchData();
    }, 1000); // Delay search by 1 second after the user stops typing

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current); // Cleanup the timeout on unmount or when searchText changes
      }
    };
  }, [searchText, setPosition]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude === null || longitude === null) return;

      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude ? latitude : position[0]}&lon=${longitude ? longitude : position[1]}`;

      try {
        const response = await fetch(url);
        const data = await response.json(); // Parse JSON manually

        // Check if the new position is different from the current one
        if (!position || position[0] !== data.lat || position[1] !== data.lon) {
          setPosition([data.lat, data.lon]);
          setAddress(data.address);
          setAddressName(data.display_name);
          setMap(data);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    if (position) {
      const debounceFetch = setTimeout(fetchAddress, 300);
      return () => clearTimeout(debounceFetch);
    }
  }, [
    latitude,
    longitude,
    position,
    setPosition,
    setAddressName,
    setAddress,
    setMap,
  ]);

  const handleChange = (key: any) => {
    setLongitude(key?.toString()?.split(",")[1]);
    setLatitude(key?.toString()?.split(",")[0]);

    // Fly the map to the new position
    if (mapRef.current) {
      mapRef.current.flyTo(
        [key?.toString()?.split(",")[0], key?.toString()?.split(",")[1]],
        mapRef.current.getZoom()
      );
    }
  };

  return (
    <>
      <Autocomplete
        defaultItems={listPlace}
        onValueChange={(e: any) => setSearchText(e)}
        radius="lg"
        variant="flat"
        size="lg"
        color="default"
        className="absolute top-24 right-8 max-w-[18rem] sm:max-w-[18rem] lg:max-w-[36rem] z-[10000] text-gray-400"
        placeholder="Search your area"
        startContent={<Icon icon="fluent-mdl2:map-directions" fontSize={24} />}
        onSelectionChange={handleChange}
      >
        {(item: any) => (
          <AutocompleteItem
            key={[item.lat, item.lon] as any}
            textValue={item.name}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Icon
                  icon="fluent:location-ripple-12-filled"
                  fontSize={30}
                  className="text-primary"
                />
                <div className="flex flex-col">
                  <span className="text-small">{item.name}</span>
                  <span className="text-tiny text-default-400">
                    {item.display_name}
                  </span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
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
        />
      </MapContainer>
    </>
  );
};

export default Map;
