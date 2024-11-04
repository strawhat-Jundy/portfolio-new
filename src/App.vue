<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import Header from "./components/Layouts/Header.vue";
</script>

<style scoped>
main {
  @apply w-full h-screen bg-[radial-gradient(circle_at_-70%_-40%,rgb(255,198,134)_0%,rgb(255,210,158)_35%,rgb(238,226,211)_69%,rgb(255,248,240)_80%)] dark:bg-[radial-gradient(circle_at_-70%_-40%,rgb(59,59,74)_0%,rgb(40,40,74)_35%,rgb(33,33,44)_69%,rgb(30,30,36)_80%)] bg-no-repeat bg-cover;
}
</style>
