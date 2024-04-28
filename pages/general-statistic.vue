<script setup lang="ts">
import { useGetStatistic } from "../hooks/useGetStatistic";
import type {
  GeneralStatisticSummary,
  LoadingSkeletonGeneralStats,
} from "#build/components";

const { statistics, isLoading } = useGetStatistic();

const summary = [
  {
    title: "Total Earthquakes",
    value: 11000,
    pronounce: "Eq",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente molestias asperiores perferendis libero reiciendis iste unde eum exercitationem ducimus provident!`,
  },
  {
    title: "Total Clusters",
    value: 15,
    pronounce: "Cluster",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente molestias asperiores perferendis libero reiciendis iste unde eum exercitationem ducimus provident!",
  },
  {
    title: "Total Years",
    value: 17,
    pronounce: "Years",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente molestias asperiores perferendis libero reiciendis iste unde eum exercitationem ducimus provident!",
  },
  {
    title: "Largest Earthquake",
    value: 7.8,
    pronounce: "RS",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente molestias asperiores perferendis libero reiciendis iste unde eum exercitationem ducimus provident!",
  },
];
</script>

<template>
  <!-- if data is fetching show loading skeleton -->
  <div v-if="isLoading">
    <LoadingSkeletonGeneralStats />
  </div>

  <!-- if data is fetched show this code-->
  <div v-else class="h-full grid-rows-4 gap-4 overflow-hidden">
    <!-- Summary Card Area -->
    <div class="bg-[#1D1F25] p-5 rounded-xl row-span-1">
      <p class="text-xl font-bold pb-2">Ringkasan</p>
      <div class="grid grid-cols-4 justify-items-stretch gap-16">
        <GeneralStatisticSummary
          v-for="(stat, index) in summary.slice(0, 4)"
          :key="stat.title + index"
          :title="stat.title"
          :value="stat.value"
          :pronounce="stat.pronounce"
          :description="stat.description"
        />
      </div>
    </div>

    <!-- Chart Area -->
    <div class="mt-5 row-span-3">
      <div class="bg-[#1D1F25] p-5 rounded-xl h-full">
        <p class="text-xl font-bold pb-2">Cluster Statistics</p>
        <GeneralStatisticChart :statistics="statistics" />
      </div>
    </div>
  </div>
</template>
