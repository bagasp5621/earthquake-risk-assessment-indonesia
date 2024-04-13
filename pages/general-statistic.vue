<script setup lang="ts">
import { useGetStatistic } from "../hooks/useGetStatistic";

const { statistics, isLoading } = useGetStatistic();
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="(entry, index) in statistics" :key="index">
        <p>Label: {{ entry.label }}</p>
      </div>
    </div>
  </div>
</template>
