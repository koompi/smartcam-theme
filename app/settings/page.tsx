"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Badge,
  Input,
  CardFooter,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/useAuth";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutation/user";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

interface FormUpdateUserProfile {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  phoneNumber?: string;
  username?: string;
  email?: string;
}

export default function Component() {
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm<FormUpdateUserProfile>();
  const [value, setValue] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  const onSubmit = async (data: FormUpdateUserProfile) => {
    const input = {
      ...data,
      gender: !value ? user?.gender : value,
      avatar: !photo ? user?.avatar : photo,
    };

    updateUser({ variables: { input } })
      .then(() => {
        toast.success("User has been updated!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  function to upload img
  async function handleChange(e: any) {
    e.preventDefault();

    const body = {
      upload: e.target?.files[0],
    };

    axios
      .post(
        `https://backend.riverbase.org/api/upload/image/${user?.id}`,
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
      });
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-center py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto max-w-5xl px-3 sm:px-3 lg:px-12 py-6"
        >
          <Card shadow="none">
            <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
              <p className="text-large">Account Details</p>
              <div className="flex gap-4 py-4">
                <Badge
                  classNames={{
                    badge: "w-5 h-5",
                  }}
                  color="primary"
                  content={
                    <Button
                      isIconOnly
                      className="p-0 text-background"
                      radius="full"
                      size="sm"
                      variant="light"
                    >
                      <div className="text-center w-full">
                        <label className="relative cursor-pointer flex flex-col justify-center items-center">
                          <Icon icon="solar:pen-2-linear" />

                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </Button>
                  }
                  placement="bottom-right"
                  shape="circle"
                >
                  <Avatar
                    className="h-14 w-14"
                    isBordered
                    src={!photo ? user?.avatar : photo}
                    alt={user?.fullname}
                  />
                </Badge>
                <div className="flex flex-col items-start justify-center">
                  <p className="font-medium">{user?.fullname}</p>
                  <span className="text-small text-default-500">
                    {user?.email}
                  </span>
                </div>
              </div>
              <p className="text-small text-default-400">
                The photo will be used for your profile, and will be visible to
                other users of the platform.
              </p>
            </CardHeader>
            <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Email */}
              <Input
                label="Email"
                labelPlacement="outside"
                placeholder="Enter email"
                defaultValue={user?.email}
                {...register("email")}
                isDisabled={user?.email ? true : false}
              />

              {/* Phone Number */}
              <Input
                label="Phone Number"
                labelPlacement="outside"
                placeholder="Enter phone number"
                defaultValue={user.phone_number}
                {...register("phoneNumber")}
              />
              {/* username */}
              <Input
                label="Username"
                labelPlacement="outside"
                placeholder="Enter username"
                defaultValue={user?.fullname}
                {...register("username")}
              />

              {/* Phone gender */}
              <RadioGroup
                label="Select your gender"
                orientation="horizontal"
                defaultValue={user?.gender}
                onValueChange={(value) => {
                  setValue(value);
                }}
              >
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
              </RadioGroup>
              {/* First Name */}
              <Input
                label="First Name"
                labelPlacement="outside"
                placeholder="Enter first name"
                defaultValue={user?.first_name}
                {...register("firstName")}
              />
              {/* Last Name */}
              <Input
                label="Last Name"
                labelPlacement="outside"
                placeholder="Enter last name"
                defaultValue={user?.last_name}
                {...register("lastName")}
              />
            </CardBody>

            <CardFooter className="mt-4 justify-end gap-2">
              {/* <Button radius="full" variant="bordered">
                Cancel
              </Button> */}
              <Button
                color="primary"
                type="submit"
                radius="full"
                fullWidth
                className="text-background"
                isDisabled={
                  watch("firstName") === user?.first_name &&
                  watch("lastName") === user?.last_name &&
                  watch("username") === user?.fullname &&
                  watch("phoneNumber") === user?.phone_number &&
                  watch("email") === user?.email
                }
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
