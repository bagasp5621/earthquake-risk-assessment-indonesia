<script setup lang="ts">
import type { MapsProvince } from "#build/components";
const isLoading = false;
</script>

<template>
  <div class="flex justify-center items-center">
    <div v-if="isLoading">loading...</div>
    <MapsProvince v-else />
  </div>
</template>
