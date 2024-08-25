<template>
  <label class="toggle">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <div class="toggle__wrapper" :class="toggleClasses" v-bind="$attrs">
      <div class="toggle__inner">
        <component
          class="toggle__icon"
          :is="modelValue ? activeIcon : inactiveIcon"
          v-if="!activeText && !$slots.activeInner"
        ></component>
        <span class="toggle__text" v-if="activeText && !$slots.activeInner">{{
          modelValue ? activeText : inactiveText
        }}</span>
        <slot v-else-if="modelValue" name="activeInner" />
        <slot v-else name="inactiveInner" />
      </div>
      <span class="toggle__action">
        <component
          v-if="!$slots.activeAction && !$slots.inactiveAction"
          :is="modelValue ? activeIcon : inactiveIcon"
          class="toggle__icon"
        ></component>
        <slot v-else-if="modelValue" name="activeAction" />
        <slot v-else name="inactiveAction" />
      </span>
    </div>
  </label>
</template>

<script setup>
import { computed } from "vue";

/* INHERIT COMPONENT ATTRIBUTES */
defineOptions({
  inheritAttrs: false,
});

/* EMITTERS */
const emit = defineEmits(["update:modelValue"]);

/* PROPS */
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  activeIcon: Object,
  inactiveIcon: Object,
  activeActionIcon: Object,
  inactiveActionIcon: Object,
  activeText: String,
  inactiveText: String,
  activeColor: {
    type: String,
    default: "#3b82f6",
  },
  inactiveColor: {
    type: String,
    default: "#6b7280",
  },
  size: {
    type: String,
    validator(val) {
      return ["large", "small", "default"].includes(val);
    },
    default: "default",
  },
});

/* CLASSES */
const toggleClasses = computed(() => {
  const toggleOn = props.modelValue && "toggle__on";
  return [`toggle__${props.size}`, toggleOn];
});
</script>
<style scoped>
.toggle {
  @apply inline-flex items-center align-middle select-none;
}
.toggle input {
  @apply sr-only;
}
.toggle__wrapper {
  @apply inline-flex items-center relative bg-[v-bind('props.inactiveColor')] rounded-full overflow-hidden cursor-pointer;
}
.toggle__on.toggle__wrapper {
  @apply bg-[v-bind('props.activeColor')];
}
.toggle__inner {
  @apply w-full h-full flex justify-center items-center;
}
.toggle__inner .toggle__icon {
  @apply stroke-white h-3/4;
}
.toggle__text {
  @apply text-white text-[80%] uppercase whitespace-nowrap text-ellipsis overflow-hidden px-2;
}
.toggle__action {
  @apply absolute left-[4px] rounded-full bg-white overflow-hidden;
}
.toggle__inner :slotted(*),
.toggle__action :slotted(*) {
  @apply block h-full w-full;
}
.toggle__action .toggle__icon {
  @apply stroke-[v-bind('props.inactiveColor')] fill-[v-bind('props.inactiveColor')] p-[5%];
}
.toggle__on .toggle__action .toggle__icon {
  @apply stroke-[v-bind('props.activeColor')] fill-[v-bind('props.activeColor')] p-[5%];
}
.toggle__large {
  @apply min-w-[4.5rem] h-8;
}
.toggle__large .toggle__inner {
  @apply pl-6 pr-0;
}
.toggle__on.toggle__large .toggle__inner {
  @apply pl-0 pr-6;
}
.toggle__large .toggle__action {
  @apply w-6 h-6;
}
.toggle__on.toggle__large .toggle__action {
  @apply left-[calc(100%-29px)];
}
.toggle__default {
  @apply min-w-[3.75rem] h-7;
}
.toggle__default .toggle__inner {
  @apply pl-5 pr-0;
}
.toggle__on.toggle__default .toggle__inner {
  @apply pl-0 pr-5;
}
.toggle__default .toggle__action {
  @apply w-5 h-5;
}
.toggle__on.toggle__default .toggle__action {
  @apply left-[calc(100%-25px)];
}
.toggle__small {
  @apply min-w-12 h-6;
}
.toggle__small .toggle__inner {
  @apply pl-4 pr-0;
}
.toggle__on.toggle__small .toggle__inner {
  @apply pl-0 pr-4;
}
.toggle__small .toggle__action {
  @apply w-4 h-4;
}
.toggle__on.toggle__small .toggle__action {
  @apply left-[calc(100%-21px)];
}
</style>
