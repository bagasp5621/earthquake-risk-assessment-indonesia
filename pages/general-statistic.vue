<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { Statistic } from "~/types/Statistic";
import type {
  GeneralStatisticSummary,
  LoadingSkeletonGeneralStats,
} from "#build/components";
import { getStatistic } from "../api/statisticApi";

const statistics = ref<Statistic | null>(null);
const isLoading = ref(true);

watchEffect(async () => {
  try {
    isLoading.value = true;
    const data = await getStatistic();
    statistics.value = data;
  } catch (error) {
    console.error("Error fetching statistic:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading">
    <!-- Loading skeleton -->
    <LoadingSkeletonGeneralStats />
  </div>
  <div v-else class="h-full grid-rows-4 gap-4 overflow-hidden">
    <div class="hidden md:block bg-[#1D1F25] p-5 rounded-xl row-span-1">
      <p class="text-xl font-bold pb-2">Ringkasan</p>
      <div class="grid grid-cols-4 justify-items-stretch gap-16">
        <GeneralStatisticSummary :statistics="statistics" />
      </div>
    </div>

    <div class="mt-5 row-span-3">
      <div class="bg-[#1D1F25] p-5 rounded-xl h-full">
        <p class="text-xl font-bold pb-2">Cluster Statistics</p>
        <GeneralStatisticChart :statistics="statistics" />
      </div>
    </div>
  </div>
</template>
