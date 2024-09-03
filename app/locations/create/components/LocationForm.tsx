"use client";
import React, { FC } from "react";
import {
  Button,
  Input,
  RadioGroup,
  Select,
  SelectItem,
  Image,
} from "@nextui-org/react";
import LocationLabel from "../../components/LocationLabel";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/useAuth";
import { SelectProvince } from "./SelectProvince";
import { SelectDistrict } from "./SelectDistrict";
import { SelectCommune } from "./SelectCommune";

type LocationForm = {
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
};

export const LocationForm: FC<{
  register: any;
  watch: any;
  photo: string;
  setPhoto: Function;
  addressLabel: string;
  setAddressLabel: Function;
}> = ({ register, photo, setPhoto, addressLabel, setAddressLabel, watch }) => {
  const { user } = useAuth();

  async function handleChange(e: any) {
    e.preventDefault();
    const body = {
      upload: e.target?.files[0],
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/upload/image/${user?.id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res: AxiosResponse<any, any>) => {
        setPhoto(res.data.path);
        toast.success("File has been added");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  }

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6 pb-2">
          <RadioGroup
            aria-label="Color"
            label={<p className="text-black">Label</p>}
            classNames={{
              base: "mt-2",
              wrapper: "gap-2",
            }}
            orientation="horizontal"
            {...register("label")}
            value={addressLabel}
            onValueChange={(value) => setAddressLabel(value)}
          >
            <LocationLabel value="Home" />
            <LocationLabel value="School" />
            <LocationLabel value="Office" />
            <LocationLabel value="Other" />
          </RadioGroup>
        </div>
        <div className="col-span-6">
          <label className="text-black">Photo</label>
          {!photo ? (
            <div className="text-center mt-2 font-medium w-full">
              <label className="relative cursor-pointer flex flex-col justify-center items-center border border-dashed rounded-xl h-72">
                <Icon icon="solar:streets-map-point-broken" fontSize={70} />
                <span>Location picture</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleChange}
                />
                <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
              </label>
            </div>
          ) : (
            <div className="relative">
              <div className="flex justify-center text-center">
                <Image
                  className="relative mx-auto h-72 mt-2 w-full object-contain cursor-pointer"
                  src={photo}
                  alt=""
                />
              </div>
              <div className="absolute top-0 right-0">
                <Button
                  color="danger"
                  variant="flat"
                  className="z-40 top-0"
                  onPress={() => setPhoto("")}
                  startContent={
                    <Icon
                      icon="solar:trash-bin-minimalistic-2-bold"
                      fontSize={18}
                    />
                  }
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* <div className="col-span-2">
          <Select
            {...register("salutation", {
              required: "Salutation is required",
            })}
            placeholder="Salutation"
            label="Salutation"
            labelPlacement="outside"
            size="lg"
            selectionMode="single"
            defaultSelectedKeys={
              user?.gender === "MALE"
                ? ["MR"]
                : user?.gender === "FEMALE"
                  ? ["MS"]
                  : ["OTHER"]
            }
          >
            <SelectItem key="MR">MR</SelectItem>
            <SelectItem key="MS">MS</SelectItem>
            <SelectItem key="OTHER">OTHER</SelectItem>
          </Select>
        </div> */}
        <div className="col-span-3">
          <Input
            variant="flat"
            label="First Name"
            labelPlacement="outside"
            {...register("firstName", {
              required: "First name is required",
            })}
            defaultValue={user?.first_name}
            size="lg"
            isRequired
            placeholder="eg. First Name"
          />
        </div>
        <div className="col-span-3">
          <Input
            variant="flat"
            label="Last Name"
            labelPlacement="outside"
            {...register("lastName", {
              required: "Last name is required",
            })}
            defaultValue={user?.last_name}
            size="lg"
            isRequired
            placeholder="eg. Last Name"
          />
        </div>
        <div className="col-span-6">
          <Input
            variant="flat"
            label="Email"
            labelPlacement="outside"
            {...register("email", {
              required: "Email is required",
            })}
            defaultValue={user?.email}
            size="lg"
            isRequired
            placeholder="eg. example@gmail.com"
          />
        </div>
        <div className="col-span-6">
          <Input
            variant="flat"
            label="Phone Number"
            labelPlacement="outside"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            defaultValue={user?.phone_number}
            size="lg"
            isRequired
            placeholder="0xxxxxxxx"
          />
        </div>
        <div className="col-span-3">
          <Select
            {...register("countryId", {
              required: "Country is required",
            })}
            variant="flat"
            label="Country"
            defaultSelectedKeys={"1"}
            labelPlacement="outside"
            size="lg"
            placeholder="Country"
          >
            <SelectItem key="1">Cambodia</SelectItem>
          </Select>
        </div>
        <div className="col-span-3">
          <SelectProvince register={register} active="" />
        </div>
        <div className="col-span-3">
          <SelectDistrict
            register={register}
            id={watch("provinceId")}
            active=""
          />
        </div>
        <div className="col-span-3">
          <SelectCommune
            register={register}
            id={watch("districtId")}
            active=""
          />
        </div>
      </div>
    </>
  );
};
