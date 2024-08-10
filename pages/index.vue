<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

onBeforeMount(() => {
  const router = useRouter();
  router.push("/guide");
});
</script>

<template></template>
