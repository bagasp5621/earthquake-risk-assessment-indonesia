<script setup lang="ts">
import { useGetStatistic } from "../hooks/useGetStatistic";

const { statistics, isLoading } = useGetStatistic();
</script>

<template>
  <div>
    {{ statistics }}
  </div>
</template>
