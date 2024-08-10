<script setup>
import Button from "./UI/Button.vue";
import Carousel from "./UI/Carousel.vue";
import Modal from "./UI/Modal.vue";
import Image1 from "../assets/carousel/Example1.jpg";
import Image2 from "../assets/carousel/Example2.jpg";
import Image3 from "../assets/carousel/Example3.jpg";
import Image4 from "../assets/carousel/Example4.jpg";
import Image5 from "../assets/carousel/Example5.jpg";
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";

const container = ref(null);

const modal = ref(false);

const windowWidth = ref(window.innerWidth);

const carouselHeight = ref(350);

watchEffect(() => {
  const breakpoints = [
    { max: 768, min: 641, height: 300 },
    { max: 640, min: 415, height: 250 },
    { max: 414, min: 0, height: 200 },
    { max: Infinity, min: 768, height: 350 },
  ];

  const matchingBreakpoint = breakpoints.find(
    (breakpoint) =>
      windowWidth.value <= breakpoint.max && windowWidth.value >= breakpoint.min
  );

  carouselHeight.value = matchingBreakpoint ? matchingBreakpoint.height : 350;
});

const handleWindowSize = (width, height) => {
  windowWidth.value = width;
};
</script>

<template>
  <div ref="container" v-onResizeWindow="handleWindowSize">
    <Button @click="modal = true">Button</Button>
  </div>
  <Modal
    :modal="modal"
    width="45rem"
    @close="modal = false"
    show-close
    transition="slide-up"
  >
    <Carousel
      loop
      pagination
      :images="[
        { src: Image5, alt: 'Example', caption: 'This is a caption' },
        Image1,
        Image2,
        Image3,
        Image4,
      ]"
      :height="carouselHeight"
    >
      <template v-for="number in 5" :key="number" #[`caption-${number}`]>
        <div class="h-full table">
          <div class="table-cell align-middle">
            <p class="p-2 backdrop-blur text-white font-medium">
              This is a custom caption for {{ number }}
            </p>
          </div>
        </div>
      </template>
    </Carousel>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Modal>
</template>

<style scoped></style>
