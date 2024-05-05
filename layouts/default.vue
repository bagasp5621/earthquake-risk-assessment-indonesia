<template>
  <div class="grid grid-cols-6">
    <div class="col-span-1">
      <AppSidebar />
    </div>
    <div class="max-h-screen col-span-5 overflow-y-auto">
      <div class="my-7 mr-7">
        <slot />
      </div>
    </div>
  </div>
</template>
