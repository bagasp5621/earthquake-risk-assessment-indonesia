<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

onBeforeMount(() => {
  const router = useRouter();
  router.push("/risk-map");
});
</script>

<template></template>
