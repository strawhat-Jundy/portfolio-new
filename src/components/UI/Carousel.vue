<template>
  <div
    class="carousel"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div
      class="carousel-slide"
      v-for="(image, index) in imageObjects"
      :key="index"
    >
      <transition :name="transitionName">
        <img
          class="carousel-image"
          v-show="currentSlide === index + 1"
          :src="image.src"
          :alt="image.alt"
        />
      </transition>
    </div>
    <div class="carousel-nav">
      <div
        class="carousel-btn carousel-btn--left"
        :class="{ degrade: isFirstImage }"
        @click="prevSlide"
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"
          />
        </svg>
      </div>
      <div
        class="carousel-btn carousel-btn--right"
        :class="{ degrade: isLastImage }"
        @click="nextSlide"
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"
          />
        </svg>
      </div>
    </div>
    <div v-show="pagination" class="carousel-pagination">
      <div
        class="carousel-page"
        v-for="(slide, index) in images.length"
        :key="index"
      >
        <span
          :class="{ active: index + 1 === currentSlide }"
          @click="slideTo(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  images: {
    type: Array,
    validator(val) {
      return (
        Array.isArray(val) &&
        val.every(
          (item) => typeof item === "object" || typeof item === "string"
        )
      );
    },
    required: true,
  },
  autoplay: {
    type: Number,
    validator(val) {
      return val >= 1000 && val <= 10000;
    },
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  animation: {
    type: String,
    validator(val) {
      return ["slide", "fade"].includes(val);
    },
    default: "slide",
  },
  loop: {
    type: Boolean,
    default: false,
  },
});

const imageObjects = computed(() => {
  if (props.images && typeof props.images[0] === "object") {
    return props.images;
  }
  return props.images.map((src, index) => ({
    src,
    alt: `Image ${index + 1}`,
  }));
});

const currentSlide = ref(1);
const direction = ref("next");

/* NAVIGATION */
const nextSlide = () => {
  direction.value = "next";
  if (currentSlide.value === props.images.length) {
    currentSlide.value = props.loop ? 1 : props.images.length;
  } else {
    currentSlide.value += 1;
  }
};

const prevSlide = () => {
  direction.value = "prev";
  if (currentSlide.value === 1) {
    currentSlide.value = props.loop ? props.images.length : 1;
  } else {
    currentSlide.value -= 1;
  }
};

const isFirstImage = computed(() => {
  return !props.loop && currentSlide.value === 1;
});

const isLastImage = computed(() => {
  return !props.loop && currentSlide.value === props.images.length;
});

/* PAGINATION */
const slideTo = (index) => {
  direction.value = index + 1 > currentSlide.value ? "next" : "prev";
  currentSlide.value = index + 1;
};

/* TRANSITION */
const transitionName = computed(() => {
  return props.animation === "slide"
    ? `slide-${direction.value}`
    : props.animation;
});

/* AUTOPLAY FEATURE */
const autoPlay = () => {
  setInterval(() => {
    nextSlide();
  }, props.autoplay);
};

onMounted(() => {
  if (props.autoplay) {
    autoPlay();
  }
});

/*------- TOUCH DEVICES -------*/
const startX = ref(0);
const startY = ref(0);
const endX = ref(0);
const endY = ref(0);
const swipeOffset = ref(0);

const touchstart = (e) => {
  startX.value = e.touches[0].clientX;
  startY.value = e.touches[0].clientY;
};

const touchmove = (e) => {
  endX.value = e.touches[0].clientX;
  endY.value = e.touches[0].clientY;
  swipeOffset.value = endX.value - startX.value;
};

const touchend = (e) => {
  if (swipeOffset.value < -50) {
    resetTouchValue();
    nextSlide();
  } else if (swipeOffset.value > 50) {
    resetTouchValue();
    prevSlide();
  } else {
    resetTouchValue();
  }
};

const resetTouchValue = () => {
  startX.value = 0;
  startY.value = 0;
  endX.value = 0;
  endY.value = 0;
  swipeOffset.value = 0;
};
/* ------------------------------- */
</script>

<style scoped>
.carousel {
  @apply relative h-screen max-h-screen overflow-hidden;
}
.carousel-slide {
  @apply absolute inset-0;
}
.carousel-image {
  @apply object-cover h-full w-full max-w-full;
}
.carousel-nav {
  @apply absolute h-full w-full flex justify-between;
}
.carousel-btn {
  @apply flex items-center px-8 bg-black bg-opacity-30 cursor-pointer transition-all duration-300 hover:bg-opacity-50;
}
.carousel-btn svg {
  @apply fill-white scale-150;
}
.carousel-btn--left {
  @apply -translate-x-full;
}
.carousel-btn--right {
  @apply translate-x-full;
}
.carousel-nav:hover .carousel-btn--left,
.carousel-nav:hover .carousel-btn--right {
  @apply translate-x-0;
}
.degrade {
  @apply opacity-0 cursor-default;
}
.carousel-pagination {
  @apply absolute flex justify-center items-center w-full bottom-5 gap-2;
}
.carousel-page {
  @apply flex;
}
.carousel-page span {
  @apply rounded-full h-3 w-3 bg-white cursor-pointer hover:scale-125 transition-all duration-500;
}
.carousel-page span.active {
  @apply bg-accent ring-2 ring-white scale-110;
}
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active,
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-700;
}
.slide-next-enter-from {
  @apply translate-x-full;
}
.slide-next-leave-to {
  @apply -translate-x-full;
}
.slide-prev-enter-from {
  @apply -translate-x-full;
}
.slide-prev-leave-to {
  @apply translate-x-full;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
.fade-leave-from,
.fade-enter-to {
  @apply opacity-100;
}
</style>
