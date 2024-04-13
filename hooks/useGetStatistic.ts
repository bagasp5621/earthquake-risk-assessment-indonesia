import { useQuery } from "@tanstack/vue-query";
import { getStatistic } from "../api/statisticApi";

export const useGetStatistic = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getStatistic"],
    queryFn: getStatistic,
  });

  return { statistics: data, isLoading, error };
};
