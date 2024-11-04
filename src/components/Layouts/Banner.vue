<template>
  <div class="container-screen content">
    <div class="text__content">
      <span>HI! I AM</span>
      <h1>Jundy Mer Dimasu-ay</h1>
      <span class="separator"></span>
      <div class="typer">
        <Type
          :typeSpeed="50"
          :backSpeed="25"
          loop
          :smartBackspace="false"
          :strings="messages"
        >
          <span class="typing"></span>
        </Type>
      </div>
    </div>
    <div class="hero__image">
      <div class="image__wrapper">
        <img src="../../assets/images/banner/front.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Type from "../UI/Type.vue";

const messages = ref(["I love coding.", "I love eating."]);
</script>
<style scoped>
.content {
  @apply flex justify-between items-center max-lg:flex-col-reverse max-lg:justify-center;
}
.text__content {
  @apply flex flex-col justify-center max-lg:mt-[-3rem] max-lg:w-3/4 max-lg:self-start;
}
.text__content h1 {
  @apply text-wrap;
}
.typer :deep(span) {
  @apply md:text-2xl sm:text-xl text-base font-semibold text-primary;
}
.hero__image {
  @apply flex justify-center items-center w-full max-w-[40%] max-md:max-w-full;
}
.image__wrapper {
  @apply w-full aspect-square rounded-full bg-secondary overflow-hidden;
}
.hero__image img {
  @apply w-full object-cover;
}
.separator {
  @apply w-1/2;
}
</style>
