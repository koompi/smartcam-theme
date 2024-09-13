"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Button,
  useDisclosure,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { LocationForm } from "./components/LocationForm";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER_LOCATION } from "@/graphql/mutation/location";
import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

interface FormCreateLocation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  countryId: string;
  communeId: string;
  districtId: string;
  provinceId: string;
}

export default function PageLocation() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const [position, setPosition] = useState<[number, number]>([
    11.5564, 104.9282,
  ]);

  const [addressName, setAddressName] = useState<string>("");

  const [address, setAddress] = useState<any | null>(null);
  const [map, setMap] = useState<any | null>(null);

  const [photo, setPhoto] = useState<string>("");
  const [addressLabel, setAddressLabel] = useState<string>("");

  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<FormCreateLocation>();

  const [storeCreateLocation] = useMutation(CREATE_CUSTOMER_LOCATION);

  //  onSubmit to create location
  const onSubmit = (values: FormCreateLocation) => {
    let bodyLocation = {
      communeId: values.communeId,
      countryId: "1",
      districtId: values.districtId,
      provinceId: values.provinceId,
      phoneNumber: values.phoneNumber,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      lat: position[0].toString(),
      lng: position[1].toString(),
      map: JSON.stringify(addressName).toString(),
    };

    let bodyAddress = {
      addressName: addressName,
      zipCode: parseInt(address?.postcode),
      label: addressLabel,
      photos: photo.length > 0 ? [photo] : null,
    };

    storeCreateLocation({
      variables: {
        bodyLocation: bodyLocation,
        bodyAddress: bodyAddress,
      },
    })
      .then(() => {
        toast.success("Successfully added location!");
        setTimeout(() => {
          router.back();
        }, 500);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: set the position to the current location
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error retrieving location:", error);
          // Fallback: set a default position (e.g., a city center or a specific location)
          // setPosition([11.5564, 104.9282]); // Olympic coordinates as an example
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Fallback: set a default position
      // setPosition([11.5564, 104.9282]); // Olympic coordinates as an example
    }
  }, []);

  if (!position) {
    return <div>Loading map...</div>; // Render loading state while position is null
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        size="full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Select your location</h1>
                <p className="text-sm font-light">
                  Drag the icon to change your location
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="h-[70dvh] sm:h-[70dvh] lg:min-h-[80dvh] ">
                  <MyMap
                    zoom={13}
                    position={position}
                    setPosition={setPosition}
                    addressName={addressName}
                    setAddressName={setAddressName}
                    setAddress={setAddress}
                    setMap={setMap}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-col gap-3">
                <p className="text-black">{addressName}</p>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="text-background w-full"
                  size="lg"
                >
                  Deliver to this location
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="container max-w-4xl mx-auto px-6 w-full pt-9 pb-36">
        <div className="mb-4">
          <Button
            className="-ml-2"
            radius="full"
            variant="flat"
            onClick={() => router.back()}
          >
            <Icon icon="solar:arrow-left-outline" fontSize={20} />
            Go back
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card shadow="none" className="p-1 sm:p-1 lg:p-4">
            <CardHeader>
              <h1 className="text-xl font-semibold">
                <div>
                  <h1 className="text-xl font-medium">New Location</h1>
                  <p className="text-sm font-light mt-2">
                    Heads up! To ensure a smooth delivery, please double-check
                    your shipping address. An accurate location helps us get
                    your order to you faster!
                  </p>
                </div>
              </h1>
            </CardHeader>
            <CardBody className="text-gray-400">
              <LocationForm
                register={register}
                photo={photo}
                setPhoto={setPhoto}
                addressLabel={addressLabel}
                setAddressLabel={setAddressLabel}
                watch={watch}
              />
            </CardBody>
            <CardHeader>
              <h1 className="text-xl font-semibold">Address</h1>
            </CardHeader>
            <CardBody className="text-gray-400">
              <Textarea
                placeholder="eg. Phnom Penh ..."
                size="lg"
                isRequired
                minRows={3}
                value={addressName}
                defaultValue={addressName}
                onChange={(e) => {
                  setAddressName(e.target.value);
                }}
                endContent={
                  <Button
                    variant="light"
                    color="primary"
                    radius="lg"
                    isIconOnly
                    onClick={(e: any) => {
                      e.preventDefault();
                      onOpen();
                    }}
                  >
                    <Icon icon="solar:streets-map-point-bold" fontSize={36} />
                  </Button>
                }
              />
            </CardBody>
            <CardFooter>
              <div className="w-full">
                <Button
                  className="w-full text-white"
                  color="primary"
                  variant="solid"
                  type="submit"
                  size="lg"
                  fullWidth={true}
                >
                  Save
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
