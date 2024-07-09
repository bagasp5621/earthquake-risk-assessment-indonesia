<script setup lang="ts">
import type { SidebarContent, SidebarHeader } from "#build/components";
</script>

<template>
  <div class="h-screen pt-7 pb-3 pr-4 pl-4">
    <div class="h-full rounded-2xl bg-[#1D1F25]">
      <SidebarHeader />
      <SidebarContent />
    </div>
  </div>
</template>
