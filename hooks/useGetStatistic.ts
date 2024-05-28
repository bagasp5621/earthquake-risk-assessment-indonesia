import { useQuery } from "@tanstack/vue-query";
import { getStatistic } from "../api/statisticApi";
import type { Statistic } from "~/types/Statistic";

export const useGetStatistic = () => {
  const { data, isLoading, error } = useQuery<Statistic>({
    queryKey: ["getStatistic"],
    queryFn: getStatistic,
  });

  return { statistics: data, isLoading, error };
};
