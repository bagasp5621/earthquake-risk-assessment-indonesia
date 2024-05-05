<script setup lang="ts">
import type { MapsInteractive } from "#build/components";
const isLoading = false;
</script>

<template>
  <div class="flex justify-center items-center">
    <div v-if="isLoading">loading...</div>
    <MapsInteractive v-else />
  </div>
</template>
