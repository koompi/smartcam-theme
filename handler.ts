"use server";

import { promises as fs } from "fs";

export const read = async () => {
  return await fs
    .readFile(process.cwd() + "/themes/dynamic.json", "utf8")
    .then((file: string) => {
      const data = JSON.parse(file);
      return data;
    })
    .catch((error: Error) => {
      console.error("Error reading file:", error);
      throw error; // rethrowing the error for the caller to handle
    });
};
