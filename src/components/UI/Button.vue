<template>
  <button
    type="button"
    v-bind="$attrs"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <slot>Button</slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

/* EMITTERS */
defineEmits(["click"]);

/* INHERIT COMPONENT ATTRIBUTES */
defineOptions({
  inheritAttrs: false,
});

/* PROPS */
const props = defineProps({
  type: {
    type: String,
    validator(val) {
      return [
        "primary",
        "secondary",
        "bs-primary",
        "bs-secondary",
        "bs-success",
        "bs-warning",
        "bs-danger",
        "bs-info",
      ].includes(val);
    },
    default: "primary",
  },
  size: {
    type: String,
    validator(val) {
      return ["large", "medium", "small"].includes(val);
    },
    default: "large",
  },
  uppercase: {
    type: Boolean,
    default: false,
  },
});

/* CLASSES */
const buttonClasses = computed(() => {
  const isUppercase = props.uppercase && "btn--uppercase";

  return ["btn", `btn--${props.type}`, `btn--${props.size}`, isUppercase];
});
</script>

<style scoped>
.btn {
  @apply rounded-full text-white font-medium duration-300 hover:-translate-y-0.5 select-none;
}
.btn--small {
  @apply px-4 py-2 text-xs;
}
.btn--medium {
  @apply px-5 py-2.5 text-sm;
}
.btn--large {
  @apply px-6 py-3 text-base;
}
.btn--primary {
  @apply bg-primary;
}
.btn--secondary {
  @apply bg-secondary text-color-text-reverse;
}
.btn--bs-primary {
  @apply bg-bs-primary hover:bg-blue-600;
}
.btn--bs-secondary {
  @apply bg-bs-secondary hover:bg-gray-600;
}
.btn--bs-success {
  @apply bg-bs-success hover:bg-green-600;
}
.btn--bs-warning {
  @apply bg-bs-warning hover:bg-yellow-600;
}
.btn--bs-danger {
  @apply bg-bs-danger hover:bg-red-600;
}
.btn--bs-info {
  @apply bg-bs-info hover:bg-cyan-700;
}
.btn--uppercase {
  @apply uppercase;
}
</style>
