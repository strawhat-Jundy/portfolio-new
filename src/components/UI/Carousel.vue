<template>
  <div
    class="carousel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    v-onLeftKey="debouncedPrevSlide"
    v-onRightKey="debouncedNextSlide"
  >
    <div class="carousel__wrapper">
      <button
        class="carousel__btn carousel__btn--left"
        :class="{ degrade: isFirstImage }"
        @click="debouncedPrevSlide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        class="carousel__btn carousel__btn--right"
        :class="{ degrade: isLastImage }"
        @click="debouncedNextSlide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <div
        class="carousel__slide"
        v-for="(image, index) in imageObjects"
        :key="index"
      >
        <transition :name="transitionName">
          <div class="carousel__image" v-show="currentSlide === index + 1">
            <img :src="image.src" :alt="image.alt" />
            <div
              class="carousel__caption"
              v-if="$slots[`caption-${index + 1}`] || image.caption"
            >
              <slot
                v-if="
                  $slots[`caption-${index + 1}`] ||
                  ($slots[`caption-${index + 1}`] && image.caption)
                "
                :name="`caption-${index + 1}`"
              />
              <div class="caption__content" v-else>
                <p class="caption__paragraph">
                  {{ image.caption }}
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div v-show="pagination" class="carousel__pagination">
        <span
          class="carousel__page"
          :class="{ active: index + 1 === currentSlide }"
          @click="slideTo(index)"
          v-for="(slide, index) in images.length"
          :key="index"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { debounce } from "lodash";
import { computed, onMounted, reactive, ref } from "vue";

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
      return val >= 1000;
    },
  },
  pagination: Boolean,
  animation: {
    type: String,
    validator(val) {
      return ["slide", "fade"].includes(val);
    },
    default: "slide",
  },
  loop: Boolean,
  height: {
    type: [Number, String],
    default: "100vh",
  },
});

/* IMAGE HANDLING */
const imageObjects = computed(() =>
  props.images.map((image) =>
    typeof image === "string"
      ? {
          src: image,
          alt: `Image ${props.images.indexOf(image) + 1}`,
          caption: "",
        }
      : {
          src: image.src,
          alt: image.alt || `Image ${props.images.indexOf(image) + 1}`,
          caption: image.caption || "",
        }
  )
);

/* CAROUSEL HEIGHT */
const carouselHeight = computed(() =>
  typeof props.height === "number" ? `${props.height / 16}rem` : props.height
);

/* NAVIGATION */
const currentSlide = ref(1);
const direction = ref("next");

const nextSlide = () => {
  direction.value = "next";
  currentSlide.value =
    currentSlide.value === props.images.length
      ? props.loop
        ? 1
        : props.images.length
      : currentSlide.value + 1;
};

const prevSlide = () => {
  direction.value = "prev";
  currentSlide.value =
    currentSlide.value === 1
      ? props.loop
        ? props.images.length
        : 1
      : currentSlide.value - 1;
};

const debouncedNextSlide = debounce(nextSlide, 250);
const debouncedPrevSlide = debounce(prevSlide, 250);

const isFirstImage = computed(() => !props.loop && currentSlide.value === 1);
const isLastImage = computed(
  () => !props.loop && currentSlide.value === props.images.length
);

/* PAGINATION */
const slideTo = (index) => {
  direction.value = index + 1 > currentSlide.value ? "next" : "prev";
  currentSlide.value = index + 1;
};

/* TRANSITION */
const transitionName = computed(() =>
  props.animation === "slide" ? `slide-${direction.value}` : props.animation
);

/* AUTOPLAY */
const startAutoplay = () => {
  if (props.autoplay) {
    setInterval(nextSlide, props.autoplay);
  }
};

/*------- TOUCH DEVICES -------*/
const touchState = reactive({
  startX: 0,
  offset: 0,
});

const handleTouchStart = (e) => {
  touchState.startX = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  touchState.offset = e.touches[0].clientX - touchState.startX;
};

const handleTouchEnd = () => {
  if (touchState.offset < -50) nextSlide();
  else if (touchState.offset > 50) prevSlide();
  touchState.offset = 0;
};
/* ------------------------------- */

/* MOUNTED HOOK */
onMounted(startAutoplay);
</script>

<style scoped>
.carousel {
  @apply @container w-full h-[v-bind('carouselHeight')] overflow-hidden;
}
.carousel__wrapper {
  @apply relative h-full flex items-center justify-between;
}
.carousel__slide {
  @apply absolute inset-0;
}
.carousel__image {
  @apply h-full w-full;
}
.carousel__image img {
  @apply object-cover w-full h-full;
}
.carousel__caption {
  @apply h-full w-full absolute inset-0 z-[1] p-2 flex justify-center;
}
.caption__content {
  @apply max-w-60 absolute @3xl:bottom-20 bottom-14 flex justify-center w-max backdrop-blur p-1 drop-shadow-xl;
}
.caption__paragraph {
  @apply text-white text-center text-base @3xl:text-xl max-md:text-base leading-none font-normal mb-0;
}
.carousel__btn {
  @apply flex items-center justify-center @3xl:w-14 @3xl:h-14 @md:w-10 @md:h-10 w-8 h-8 p-2 relative z-[2] text-white rounded-full bg-black bg-opacity-30 cursor-pointer transition-all duration-300 hover:bg-opacity-50;
}
.carousel__btn--left {
  @apply -translate-x-full;
}
.carousel__btn--right {
  @apply translate-x-full;
}
.carousel__wrapper:hover .carousel__btn--left {
  @apply translate-x-3;
}
.carousel__wrapper:hover .carousel__btn--right {
  @apply -translate-x-3;
}
.degrade {
  @apply opacity-0 cursor-default;
}
.carousel__pagination {
  @apply absolute @3xl:bottom-5 bottom-3 flex justify-center items-center w-full gap-2 z-[2];
}
.carousel__page {
  @apply rounded-full @3xl:h-2.5 @3xl:w-2.5 h-2 w-2 bg-transparent cursor-pointer hover:scale-125 border border-white transition-all duration-500;
}
.carousel__page.active {
  @apply bg-white scale-125;
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
