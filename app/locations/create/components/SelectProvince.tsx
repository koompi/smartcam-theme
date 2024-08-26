import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

async function fetchData() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND}/api/provinces`;

  try {
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const SelectProvince: FC<{ register: any; active: string }> = ({
  register,
  active,
}) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <Select
      label="Province / City:"
      variant="flat"
      labelPlacement="outside"
      placeholder="Province / City"
      size="lg"
      {...register("provinceId", {
        required: "Province is required",
      })}
      className="col-span-3"
      isRequired
      defaultSelectedKeys={[active]}
    >
      {data?.map((item) => (
        <SelectItem key={item.id}>{item.name_en}</SelectItem>
      ))}
    </Select>
  );
};
