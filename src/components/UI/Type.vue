<template>
  <slot />
</template>
<script setup>
import Typed from "typed.js";
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  strings: {
    type: Array,
    required: true,
  },
  typeSpeed: Number,
  backSpeed: Number,
  loop: Boolean,
  smartBackspace: Boolean,
});

let typedInstance;

onMounted(() => {
  typedInstance = new Typed(".typing", {
    ...props,
  });
});

onUnmounted(() => {
  if (typedInstance) {
    typedInstance.destroy();
  }
});
</script>
