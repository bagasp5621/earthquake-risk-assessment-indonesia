<template>
  <div
    class="h-full flex flex-col-reverse justify-between md:flex-none md:grid md:grid-cols-6"
  >
    <div class="md:col-span-1">
      <AppSidebar />
    </div>
    <div class="max-h-full md:max-h-screen md:col-span-5 md:overflow-y-auto">
      <div class="md:p-4 pb-2">
        <slot />
      </div>
    </div>
  </div>
</template>
