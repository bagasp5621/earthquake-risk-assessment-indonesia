<script setup lang="ts">
import type { MapsHazard } from "#build/components";
const isLoading = false;
</script>

<template>
  <div class="flex justify-center items-center">
    <div v-if="isLoading">loading...</div>
    <MapsHazard v-else />
  </div>
</template>
