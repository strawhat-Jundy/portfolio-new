<template>
  <div class="background__wrapper">
    <div class="space"></div>
  </div>
  <Header />
  <RouterView />
</template>

<script setup>
import Header from "./components/Layouts/Header.vue";
</script>

<style scoped>
.background__wrapper {
  @apply h-screen w-screen fixed;
}
.space {
  @apply w-full h-full bg-[radial-gradient(circle_at_120%_-40%,rgb(255,198,134)0%,rgb(255,210,158)35%,rgb(238,226,211)69%,rgb(255,248,240)80%)] dark:bg-[url("./assets/images/banner/stars.svg")] bg-no-repeat bg-cover;
}
</style>
