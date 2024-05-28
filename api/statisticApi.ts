import axios from "axios";
import type { Statistic } from "~/types/Statistic";

export const getStatistic = async (): Promise<Statistic | null> => {
  const response = await axios.get<Statistic>(
    "http://localhost:4000/v1/earthquake/statistic"
  );

  return response.data;
};
