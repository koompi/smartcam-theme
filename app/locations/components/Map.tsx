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
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

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
}: {
  position: L.LatLngExpression | L.LatLngTuple;
  setPosition: Function;
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
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // map.flyTo(position, map.getZoom());
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

  const [listPlace, setListPlace] = useState([]);

  const [searchText, setSearchText] = useState<string>(""); // State for new text input
  const isFetching = useRef<boolean>(false); // Ref to track the fetching state
  const timeoutId = useRef<NodeJS.Timeout | null>(null); // Ref to store the timeout ID

  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current || !searchText) return;

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
          q: searchText,
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
  }, [searchText]);

  useEffect(() => {
    const fetchAddress = async () => {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

      try {
        const response = await fetch(url);
        const data = await response.json(); // Parse JSON manually

        setAddress(data.address);
        setAddressName(data.display_name);
        setMap(data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    if (position) {
      const debounceFetch = setTimeout(fetchAddress, 300);
      return () => clearTimeout(debounceFetch);
    }
  }, [latitude, longitude, position, setAddressName, setAddress, setMap]);

  const handlChange = (key: any) => {
    setPosition(key?.toString()?.split(","));
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound() {
        map.flyTo(position, map.getZoom());
      },
    });
  };

  return (
    <>
      <Autocomplete
        defaultItems={listPlace}
        onValueChange={(e) => setSearchText(e)}
        radius="lg"
        variant="flat"
        size="lg"
        color="default"
        className="absolute top-24 right-8 max-w-[36rem] z-[10000] text-gray-400"
        placeholder="Search Maps"
        startContent={<Icon icon="fluent-mdl2:map-directions" fontSize={24} />}
        onSelectionChange={handlChange}
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
