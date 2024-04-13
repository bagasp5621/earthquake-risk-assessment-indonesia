import axios from "axios";
import type { ApiResponse } from "./apiResponse";
import type { Statistic } from "~/types/Statistic";

export const getStatistic = (): ApiResponse<Statistic> => {
  return axios
    .get(`http://localhost:4000/v1/earthquake/statistic`)
    .then((value) => {
      return value.data.data;
    });
};
