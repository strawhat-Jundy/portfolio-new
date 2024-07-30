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
    validator(value) {
      return [
        "primary",
        "secondary",
        "bs-primary",
        "bs-secondary",
        "bs-success",
        "bs-warning",
        "bs-danger",
        "bs-info",
      ].includes(value);
    },
    default: "primary",
  },
  size: {
    type: String,
    validator(value) {
      return ["large", "medium", "small"].includes(value);
    },
    default: "large",
  },
});

const buttonClasses = computed(() => {
  const colors = {
    primary:
      "bg-primary text-white border-indigo-900 hover:bg-indigo-900 focus:bg-indigo-900 focus:ring-primary",
    secondary:
      "bg-secondary text-white border-emerald-500 hover:bg-emerald-500 focus:bg-emerald-500 focus:ring-secondary",
    "bs-primary":
      "bg-blue-500 text-white border-blue-600 hover:bg-blue-600 focus:bg-blue-600 focus:ring-blue-500",
    "bs-secondary":
      "bg-gray-500 text-white border-gray-600 hover:bg-gray-600 focus:bg-gray-600 focus:ring-gray-500",
    "bs-success":
      "bg-green-500 text-white border-green-600 hover:bg-green-600 focus:bg-green-600 focus:ring-green-500",
    "bs-warning":
      "bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600 focus:bg-yellow-600 focus:ring-yellow-500",
    "bs-danger":
      "bg-red-500 text-white border-red-600 hover:bg-red-600 focus:bg-red-600 focus:ring-red-500",
    "bs-info":
      "bg-cyan-600 text-white border-cyan-700 hover:bg-cyan-700 focus:bg-cyan-700 focus:ring-cyan-600",
  };

  const sizes = {
    small: "px-2.5 py-1.5 text-tn",
    medium: "px-2.7 py-1.7 text-sm",
    large: "px-3 py-2",
  };

  return [
    "border rounded-lg font-medium transition-all duration-300 focus:ring-2 focus:outline-none focus:-translate-y-0.5 hover:-translate-y-0.5",
    colors[props.type],
    sizes[props.size],
  ];
});
</script>
