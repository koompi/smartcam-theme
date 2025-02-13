"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  const { register, handleSubmit, watch } = useForm<FormUpdateUserProfile>({
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      username: user?.username || user?.fullname,
      phoneNumber: user?.phone_number,
      email: user?.email,
      gender: user?.gender,
      avatar: user?.avatar,
    },
  });

  const [value, setValue] = useState<string | null>(user?.gender || null);
  const [photo, setPhoto] = useState<string | null>(user?.avatar || null);
  const [initialUserData, setInitialUserData] =
    useState<FormUpdateUserProfile | null>(null);

  const [updateUser] = useMutation(UPDATE_USER);

  // Set initial user data when the component mounts
  useEffect(() => {
    if (user) {
      setInitialUserData({
        avatar: user.avatar,
        firstName: user.first_name,
        lastName: user.last_name,
        gender: user.gender,
        phoneNumber: user.phone_number,
        username: user.username || user.fullname,
        email: user.email,
      });
    }
  }, [user]);

  const onSubmit = async (data: FormUpdateUserProfile) => {
    const input = {
      ...data,
      gender: value || user?.gender,
      avatar: photo || user?.avatar,
    };

    updateUser({ variables: { input } })
      .then(() => {
        toast.success("User has been updated!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const body = {
        upload: e.target.files[0],
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
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Check if the form has changed
  const isFormChanged = () => {
    const currentValues = watch();
    if (!initialUserData) return false;

    return (
      currentValues.firstName !== initialUserData.firstName ||
      currentValues.lastName !== initialUserData.lastName ||
      currentValues.username !== initialUserData.username ||
      currentValues.phoneNumber !== initialUserData.phoneNumber ||
      currentValues.email !== initialUserData.email ||
      value !== initialUserData.gender ||
      photo !== initialUserData.avatar
    );
  };

  // Check if the form is valid
  const isFormValid = () => {
    const currentValues = watch();
    return (
      currentValues.firstName &&
      currentValues.lastName &&
      currentValues.username &&
      currentValues.phoneNumber &&
      currentValues.email
    );
  };

  // Disable the button if the form is unchanged or invalid
  const isButtonDisabled = !isFormChanged() || !isFormValid();

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
                defaultValue={user?.username ? user?.username : user?.fullname}
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
              <Button
                color="primary"
                type="submit"
                radius="full"
                fullWidth
                className="text-background"
                isDisabled={isButtonDisabled}
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
