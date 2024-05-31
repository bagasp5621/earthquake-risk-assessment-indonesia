import axios from "axios";
import type { ProvinceStat } from "~/types/ProvinceStat";

export const getProvince = async (): Promise<ProvinceStat | null> => {
  const response = await axios.get<ProvinceStat>(
    "http://localhost:4000/v1/earthquake/province"
  );

  return response.data;
};
