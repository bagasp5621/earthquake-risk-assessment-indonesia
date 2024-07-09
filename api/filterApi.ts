import axios from "axios";
import type { Filter } from "~/types/Filter";

export const getFilter = async (
  north: number,
  south: number,
  west: number,
  east: number,
  startDate: number,
  endDate: number,
  minMag: number,
  maxMag: number,
  minDepth: number,
  maxDepth: number
): Promise<Filter> => {
  const response = await axios.get<Filter>(
    `http://localhost:4000/v1/earthquake/filter?north=${north}&south=${south}&west=${west}&east=${east}&startDate=${startDate}&endDate=${endDate}&minMag=${minMag}&maxMag=${maxMag}&minDepth=${minDepth}&maxDepth=${maxDepth}`
  );

  return response.data;
};
