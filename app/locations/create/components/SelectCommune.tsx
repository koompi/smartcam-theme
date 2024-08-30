import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

async function fetchData(id: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND}/api/communes/${id}`;

  try {
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const SelectCommune: FC<{ register: any; id: any; active: string }> = ({
  register,
  id,
  active,
}) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!id) {
      setData([]);
      return;
    }
    fetchData(id)
      .then((res) => {
        setData(res);
      })
      .catch((_) => {
        setData([]);
      });
  }, [id]);

  return (
    <Select
      label="Commune / Sangkat:"
      {...register("communeId", {
        required: "Commune is required",
      })}
      placeholder="Commune / Sangkat:"
      className="col-span-3"
      variant="flat"
      size="lg"
      labelPlacement="outside"
      isRequired
      defaultSelectedKeys={[active]}
    >
      {data?.map((item) => (
        <SelectItem key={item.id}>{item.name_en}</SelectItem>
      ))}
    </Select>
  );
};
