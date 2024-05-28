import axios from "axios";
import type { Interactive } from "~/types/Interactive";

export const getInteractive = async (
  lat: number,
  lng: number
): Promise<Interactive> => {
  const response = await axios.get<Interactive>(
    `http://localhost:4000/v1/earthquake/risk?latitude=${lat}&longitude=${lng}`
  );

  return response.data;
};
