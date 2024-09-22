<template>
  <main @mousewheel="handleOnWheel">
    <section
      v-for="(item, index) in components"
      :key="index"
      :id="item.path"
      :style="`transform: translateY(${translateY}%)`"
    >
      <component :is="item.component"></component>
    </section>
  </main>
  <div class="snap__wrapper">
    <span class="snap__pagination">
      <Router-Link
        v-for="(item, index) in components"
        :key="index"
        :class="{ 'is--active': hash === `#${item.path}` }"
        :to="`#${item.path}`"
      ></Router-Link>
    </span>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

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
const activeIndex = ref(null);

const scrollTo = (index) => {
  const windowHash = `#${props.components[index].path}`;
  window.location.hash = windowHash;
  hash.value = windowHash;
};

const scrollToSection = (index) => {
  translateY.value = -(index * 100);
};

watch(hash, (val) => {
  const path = val.replace("#", "");
  const sectionIndex = props.components.findIndex((item) => item.path === path);

  activeIndex.value = sectionIndex;
  scrollToSection(sectionIndex);
});

watchEffect(() => {
  hash.value = route.hash || `#${props.components[0].path}`;
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
</script>

<style scoped>
main {
  @apply fixed top-0 w-full flex flex-col;
}
section {
  @apply duration-300;
}
.snap__wrapper {
  @apply fixed flex items-center justify-center md:top-0 md:left-[3rem] max-md:bottom-3 md:h-screen max-md:w-full;
}
.snap__pagination {
  @apply flex sm:gap-10 gap-8 md:flex-col max-md:items-end;
}
.snap__pagination a {
  @apply md:h-1 md:w-6 h-5 xs:w-1 w-0.5 rounded-full bg-color-text cursor-pointer duration-500;
}
.snap__pagination a.is--active {
  @apply md:w-10 md:h-1 h-8;
}
</style>
