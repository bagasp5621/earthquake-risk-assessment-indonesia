<script lang="ts">
import { usePopupStore } from "../../../store/PopupState";
import { ref, watchEffect } from "vue";
import { getInteractive } from "../../../api/interactiveApi";
import type { Interactive } from "~/types/Interactive";

export default {
  setup() {
    const store = usePopupStore();

    // Create reactive variables to track changes
    const latitude = ref(store.latitude);
    const longitude = ref(store.longitude);
    const interactiveData = ref<Interactive | null>(null); // Initialize with null or appropriate default value
    const isLoading = ref(false);

    // Watch for changes to latitude and longitude and update interactiveData and isLoading
    watchEffect(async () => {
      isLoading.value = true;
      try {
        const data = await getInteractive(latitude.value, longitude.value);
        interactiveData.value = data;
      } catch (error) {
        console.error("Error fetching interactive data:", error);
      } finally {
        isLoading.value = false;
      }
    });

    // Watch for changes in store latitude and longitude
    watchEffect(() => {
      latitude.value = store.latitude;
      longitude.value = store.longitude;
    });

    return {
      latitude,
      longitude,
      interactiveData,
      isLoading,
    };
  },
};
</script>

<template>
  <div v-if="isLoading" class="p-[5.2rem] px-[8.35rem]">
    <LoadingSkeletonMaps />
  </div>
  <div v-else>
    <div>
      Risk Level:
      <span class="text-[#FF7E35] font-extrabold"
        >{{ interactiveData?.risk }}!</span
      >
    </div>
    <div>
      Total Earthquake:
      <span class="text-[#FF7E35] font-bold">{{ interactiveData?.count }}</span>
    </div>
    <div>
      <MapsInteractiveChart :risk="interactiveData" />
    </div>
  </div>
</template>
