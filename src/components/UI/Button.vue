<template>
  <button type="button" :class="buttonClasses" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

defineEmits(["click"]);

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

const buttonClasses = computed(() => {
  const colors = {
    primary: "btn--primary",
    secondary: "btn--secondary",
    "bs-primary": "btn--bs-primary",
    "bs-secondary": "btn--bs-secondary",
    "bs-success": "btn--bs-success",
    "bs-warning": "btn--bs-warning",
    "bs-danger": "btn--bs-danger",
    "bs-info": "btn--bs-info",
  };

  const sizes = {
    small: "btn--small",
    medium: "btn--medium",
    large: "btn--large",
  };

  const isUppercase = props.uppercase && "btn--uppercase";

  return ["btn", colors[props.type], sizes[props.size], isUppercase];
});
</script>

<style scoped>
.btn {
  @apply border rounded-full font-medium transition-all duration-300 focus:outline-none focus:-translate-y-0.5 hover:-translate-y-0.5;
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
  @apply bg-primary text-white border-indigo-900 focus:bg-indigo-900 focus:border-primary;
}
.btn--secondary {
  @apply bg-secondary text-white border-emerald-500 focus:bg-emerald-500 focus:border-secondary;
}
.btn--bs-primary {
  @apply bg-blue-500 text-white border-blue-600 focus:bg-blue-600 focus:border-blue-500;
}
.btn--bs-secondary {
  @apply bg-gray-500 text-white border-gray-600 focus:bg-gray-600 focus:border-gray-500;
}
.btn--bs-success {
  @apply bg-green-500 text-white border-green-600 focus:bg-green-600 focus:border-green-500;
}
.btn--bs-warning {
  @apply bg-yellow-500 text-white border-yellow-600 focus:bg-yellow-600 focus:border-yellow-500;
}
.btn--bs-danger {
  @apply bg-red-500 text-white border-red-600 focus:bg-red-600 focus:border-red-500;
}
.btn--bs-info {
  @apply bg-cyan-600 text-white border-cyan-700 focus:bg-cyan-700 focus:border-cyan-600;
}
.btn--uppercase {
  @apply uppercase;
}
</style>
