<script setup lang="ts">
import type { SidebarContent, SidebarHeader } from "#build/components";
</script>

<template>
  <div class="md:h-screen md:p-4">
    <div class="flex md:flex-col md:h-full md:rounded-2xl md:bg-[#1D1F25]">
      <SidebarHeader class="hidden md:block" />
      <SidebarContent class="w-full" />
    </div>
  </div>
</template>
