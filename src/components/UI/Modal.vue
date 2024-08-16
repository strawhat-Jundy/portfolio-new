<template>
  <teleport to="body">
    <transition name="fade">
      <div class="modal" v-show="modal" @click="handleClickOutside">
        <div
          ref="modalContent"
          class="modal__wrapper"
          :class="`modal__${transition}`"
          v-onEsc="() => $emit('close')"
        >
          <div class="modal__header" v-if="showClose || title || $slots.title">
            <h3 v-if="title">{{ title }}</h3>
            <slot v-else name="title" />
            <div
              class="modal__btn--close"
              v-if="showClose"
              @click="$emit('close')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <slot />
          <div class="modal__footer" v-if="$slots.footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";

/* MODAL EMITTERS */
const emit = defineEmits(["close"]);

/* PROPS */
const props = defineProps({
  modal: {
    type: Boolean,
    required: true,
    default: false,
  },
  width: {
    type: [Number, String],
    default: 800,
  },
  title: String,
  showClose: Boolean,
  transition: {
    type: String,
    validator(val) {
      return [
        "fade",
        "slide-up",
        "slide-down",
        "slide-left",
        "slide-right",
      ].includes(val);
    },
    default: "fade",
  },
});

/* WIDTH HANDLER */
const modalWidth = computed(() =>
  typeof props.width === "number" ? `${props.width / 16}rem` : props.width
);

/* CLOSE MODAL ON OUTSIDE WRAPPER */
const modalContent = ref(null);

const handleClickOutside = (event) => {
  if (modalContent.value && !modalContent.value.contains(event.target)) {
    emit("close");
  }
};

/* ADD FIX SCROLL POSITION ON DOCUMENT ON OPEN MODAL */
const currentScrollY = ref(null);
const html = document.documentElement;

const isDocumentScrollable = computed(() => {
  const body = document.body;

  const documentHeight = Math.max(
    body.scrollHeight,
    html.scrollHeight,
    body.offsetHeight,
    html.offsetHeight,
    body.clientHeight,
    html.clientHeight
  );

  const viewportHeight = window.innerHeight;

  return documentHeight > viewportHeight;
});

watchEffect(() => {
  if (props.modal && isDocumentScrollable.value) {
    currentScrollY.value = scrollY;
    html.classList.add("modal__overlay--fixed");
    html.style.top = `-${currentScrollY.value}px`;
  } else {
    html.classList.remove("modal__overlay--fixed", "scroll");
    html.style.top = "";
    html.scrollTo({
      top: currentScrollY.value,
      behavior: "instant",
    });
    currentScrollY.value = null;
  }
});
</script>

<style scoped>
.modal {
  @apply flex items-center p-1 justify-center h-screen w-full fixed inset-0 z-20 bg-black bg-opacity-20;
}
.modal__wrapper {
  @apply @container h-auto sm:max-h-[calc(100%-5rem)] max-sm:w-full max-sm:h-full w-[v-bind('modalWidth')] bg-white rounded-lg shadow-lg overflow-auto p-2 relative;
}
.modal__header {
  @apply flex w-full py-2 min-h-[3.25rem] max-sm:min-h-11 relative;
}
.modal__header h3 {
  @apply text-3xl font-bold;
}
.modal__btn--close {
  @apply @3xl:w-10 @3xl:h-10 @[640px]:w-8 @[640px]:h-8 w-6 h-6 rounded-full cursor-pointer ml-auto;
}
.modal__btn--close svg {
  @apply text-gray-400 mix-blend-difference;
}
.modal__footer {
  @apply pt-1 pb-3;
}
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200 ease-in;
}
.fade-enter-active .modal__fade,
.fade-leave-active .modal__fade,
.fade-enter-active .modal__slide-up,
.fade-leave-active .modal__slide-up,
.fade-enter-active .modal__slide-down,
.fade-leave-active .modal__slide-down,
.fade-enter-active .modal__slide-left,
.fade-leave-active .modal__slide-left,
.fade-enter-active .modal__slide-right,
.fade-leave-active .modal__slide-right {
  @apply transition-all duration-300 ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
.fade-leave-from,
.fade-enter-to {
  @apply opacity-100;
}
.fade-enter-from .modal__slide-up,
.fade-leave-to .modal__slide-up {
  @apply translate-y-28;
}
.fade-enter-from .modal__slide-down,
.fade-leave-to .modal__slide-down {
  @apply -translate-y-28;
}
.fade-enter-from .modal__slide-left,
.fade-leave-to .modal__slide-left {
  @apply translate-x-44;
}
.fade-enter-from .modal__slide-right,
.fade-leave-to .modal__slide-right {
  @apply -translate-x-44;
}
.fade-leave-from .modal__slide-up,
.fade-enter-to .modal__slide-up,
.fade-leave-from .modal__slide-down,
.fade-enter-to .modal__slide-down,
.fade-leave-from .modal__slide-left,
.fade-enter-to .modal__slide-left,
.fade-leave-from .modal__slide-right,
.fade-enter-to .modal__slide-right {
  @apply translate-y-0;
}
</style>
