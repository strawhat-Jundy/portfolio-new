<template>
  <div @mousewheel="handleOnWheel" class="section__wrapper">
    <div
      class="section"
      :class="{ visible: activeIndex === index }"
      v-for="(item, index) in components"
      :key="index"
      :id="item.path"
      :style="`transform: translateY(${translateY}%)`"
    >
      <component :is="item.component"></component>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";

/* PROPS */
const props = defineProps({
  components: {
    type: Array,
    required: true,
  },
});

/* HASH HANDLER */
const hash = ref("");
const translateY = ref(0);
const activeIndex = ref(0);

const scrollTo = (index) => {
  const windowHash = props.components[index].path;
  hash.value = windowHash;
};

const scrollToSection = (index) => {
  translateY.value = -(index * 100);
};

watch(hash, (val) => {
  const sectionIndex = props.components.findIndex((item) => item.path === val);
  localStorage.setItem("sectionIndex", sectionIndex);
  activeIndex.value = sectionIndex;
  scrollToSection(sectionIndex);
});

/* MOUSE WHEEL/TOUCHPAD HANDLER */
const isAnimating = ref(false);

const scrollUp = () => {
  if (activeIndex.value <= 0) return;

  const index = activeIndex.value - 1;
  scrollTo(index);
};

const scrollDown = () => {
  if (activeIndex.value >= props.components.length - 1) return;

  const index = activeIndex.value + 1;
  scrollTo(index);
};

const handleOnWheel = (e) => {
  if (!isAnimating.value && Math.abs(e.deltaY) > 5) {
    isAnimating.value = true;
    if (e.deltaY > 0) {
      scrollDown();
    } else if (e.deltaY < 0) {
      scrollUp();
    }
    resetAnimationState();
  }
};

const resetAnimationState = () => {
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};

onMounted(() => {
  const index = localStorage.sectionIndex ?? 0;
  const windowHash = props.components[index].path;
  hash.value = windowHash;
});
</script>

<style scoped>
.section__wrapper {
  @apply fixed top-0 w-full flex flex-col;
}
.section {
  @apply h-screen duration-300;
}
</style>
