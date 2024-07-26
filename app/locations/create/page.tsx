"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Button,
  Chip,
  Image,
  Input,
  RadioGroup,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { LocationForm } from "./components/LocationForm";
import { validateNumber } from "@/utils/phone";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER_LOCATION } from "@/graphql.bk/mutation/location";
import { useAuth } from "@/context/useAuth";
import dynamic from "next/dynamic";
import LocationLabel from "../components/LocationLabel";

const MyMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

interface FormCreateLocation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  salutation: string;
  countryId: string;
  communeId: string;
  districtId: string;
  provinceId: string;
  label: string;
}

export default function PageLocation() {
  const { user } = useAuth();

  const initialNewPhone = {
    phoneNumber: user?.phone_number ? user?.phone_number : "",
    isInternal: false,
    isVerified: false,
    isActived: false,
    isBanned: false,
  };

  const [position, setPosition] = useState<L.LatLngExpression | any>([
    11.562108, 104.888535,
  ]);
  const [addressName, setAddressName] = useState<string>("");

  const location: L.LatLngExpression = [11.562108, 104.888535];
  const [address, setAddress] = useState<any | null>(null);
  const [map, setMap] = useState<any | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newPhone, setNewPhone] = useState(initialNewPhone);
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [operator, setOperator] = useState("");
  const [color, setColor] = useState<"warning" | "success" | "danger" | null>(
    null
  );
  const [photo, setPhoto] = useState<string>("");
  const [email, setEmail] = useState("");
  const [addressLabel, setAddressLabel] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormCreateLocation>();

  const [storeCreateLocation] = useMutation(CREATE_CUSTOMER_LOCATION);

  useEffect(() => {
    if (operator.toLocaleLowerCase() === "cellcard") {
      setColor("warning");
    }
    if (operator.toLocaleLowerCase() === "smart") {
      setColor("success");
    }
    if (operator.toLocaleLowerCase() === "metfone") {
      setColor("danger");
    }
  }, [operator]);

  useEffect(() => {
    if (newPhone.phoneNumber !== "") {
      try {
        const valid = validateNumber({ phoneNumber: newPhone.phoneNumber });
        if (valid.name) {
          setIsValid(true);
          setValidationMessage("");
          setOperator(valid.name);
        }
      } catch (error: any) {
        if (error) {
          setIsValid(false);
          setValidationMessage(error.detail.message);
          setOperator("");
        }
      }
    }
  }, [newPhone.phoneNumber]);

  //  onSubmit to create location
  const onSubmit = (values: FormCreateLocation) => {
    let bodyLocation = {
      ...values,
      ...position,
      photos: photo.length > 0 ? [photo] : null,
      map: address,
    };

    let bodyAddress = {
      streetValue: addressName,
      zipCode: parseInt(address?.postcode),
      addressTypeId: "1",
    };

    storeCreateLocation({
      variables: {
        bodyLocation: bodyLocation,
        bodyAddress: bodyAddress,
      },
    })
      .then(() => {
        toast.success("New location has been created!");
        router.push(`/cart?steps=shipping`);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  // function handleNewPhoneChange(e: any) {
  //   const { name, value } = e.target;
  //   const object = {
  //     ...newPhone,
  //     [name]: value,
  //   };
  //   setNewPhone(() => object);
  // }

  // //  function to upload img
  // async function handleChange(e: any) {
  //   e.preventDefault();

  //   const body = {
  //     upload: e.target?.files[0],
  //   };

  //   axios
  //     .post(
  //       `https://backend.riverbase.org/api/upload/image/${user?.id}`,
  //       body,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((res: AxiosResponse<any, any>) => {
  //       setPhoto(res.data.path);
  //       toast.success("File has been added");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // email verify partern
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  return (
    <>
      <div className="container max-w-4xl mx-auto px-6 w-full pt-9 pb-36">
        <div className="mb-4">
          <Button
            className="-ml-2 text-default-700"
            radius="full"
            variant="flat"
            onClick={() => router.back()}
          >
            <Icon icon="solar:arrow-left-outline" fontSize={20} />
            Go back
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card shadow="sm" className="p-4 text-black">
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
            <CardBody>
              <LocationForm
                register={register}
                photo={photo}
                setPhoto={setPhoto}
                addressLabel={addressLabel}
                setAddressLabel={setAddressLabel}
              />
            </CardBody>
            <CardHeader>
              <h1 className="text-xl font-semibold">Address</h1>
            </CardHeader>
            <CardBody>
              <div className="h-80 w-max-full">
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
