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
            <button
              class="modal__btn--close"
              v-if="showClose"
              @click="$emit('close')"
            >
              <Close stroke-width="2" />
            </button>
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
import Close from "../Icons/Close.vue";

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
const html = document.documentElement;
const body = document.body;

const isDocumentScrollable = computed(() => {
  const documentHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  const viewportHeight = window.innerHeight;

  return documentHeight > viewportHeight;
});

watchEffect(() => {
  if (props.modal && isDocumentScrollable.value) {
    body.classList.add("modal__overlay--hidden");
  } else {
    body.classList.remove("modal__overlay--hidden");
  }
});
</script>

<style scoped>
.modal {
  @apply block h-screen w-full fixed inset-0 z-[800] bg-black bg-opacity-20 dark:bg-opacity-50 overflow-y-auto md:p-5 p-1;
}
.modal__wrapper {
  @apply @container max-sm:w-full w-[v-bind('modalWidth')] bg-background-accent border border-color-border rounded-lg mx-auto md:my-8 shadow-lg overflow-auto p-2;
}
.modal__header {
  @apply flex w-full md:py-2 py-1;
}
.modal__header h3 {
  @apply text-3xl font-bold;
}
.modal__btn--close {
  @apply @3xl:w-10 @3xl:h-10 @[640px]:w-8 @[640px]:h-8 @[480px]:w-6 @[480px]:h-6 w-4 h-4 rounded-full ml-auto;
}
.modal__btn--close svg {
  @apply mix-blend-difference;
}
.modal__footer {
  @apply pt-1 pb-3;
}
.fade-enter-active,
.fade-leave-active,
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
  @apply duration-300 ease-in-out;
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
  @apply translate-y-[50%];
}
.fade-enter-from .modal__slide-down,
.fade-leave-to .modal__slide-down {
  @apply -translate-y-[50%];
}
.fade-enter-from .modal__slide-left,
.fade-leave-to .modal__slide-left {
  @apply translate-x-[50%];
}
.fade-enter-from .modal__slide-right,
.fade-leave-to .modal__slide-right {
  @apply -translate-x-[50%];
}
.fade-leave-from .modal__slide-up,
.fade-enter-to .modal__slide-up,
.fade-leave-from .modal__slide-down,
.fade-enter-to .modal__slide-down {
  @apply translate-y-0;
}
.fade-leave-from .modal__slide-left,
.fade-enter-to .modal__slide-left,
.fade-leave-from .modal__slide-right,
.fade-enter-to .modal__slide-right {
  @apply translate-x-0;
}
</style>
