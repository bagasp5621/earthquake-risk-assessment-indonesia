import axios from "axios";
import type { Earthquake } from "~/types/Earthquake";

export const getHazard = async (): Promise<Earthquake | null> => {
  const response = await axios.get<Earthquake>(
    "http://localhost:4000/v1/earthquake/polygon?includeEarthquakes=true"
  );

  return response.data;
};
