<template>
  <label class="toggle" :class="{ toggle__on: toggle }">
    <input
      type="checkbox"
      :checked="toggle"
      @change="handleToggle($event.target.checked)"
    />
    <div class="toggle__wrapper" :class="toggleSize" v-bind="$attrs">
      <div class="toggle__inner">
        <component
          class="toggle__icon"
          :is="toggle ? activeIcon : inactiveIcon"
          v-if="!activeText && !$slots.activeInner"
        ></component>
        <span class="toggle__text" v-if="activeText && !$slots.activeInner">{{
          toggle ? activeText : inactiveText
        }}</span>
        <slot v-else-if="toggle" name="activeInner" />
        <slot v-else name="inactiveInner" />
      </div>
      <span class="toggle__action">
        <component
          v-if="!$slots.activeAction && !$slots.inactiveAction"
          :is="toggle ? activeIcon : inactiveIcon"
          class="toggle__icon"
        ></component>
        <slot v-else-if="toggle" name="activeAction" />
        <slot v-else name="inactiveAction" />
      </span>
    </div>
  </label>
</template>

<script setup>
import { computed, ref } from "vue";

defineOptions({
  inheritAttrs: false,
});
const emit = defineEmits(["change"]);
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

const toggleSize = computed(() => `toggle__${props.size}`);

const toggle = ref(props.modelValue);

const handleToggle = (value) => {
  emit("change", value);
  toggle.value = value;
};
</script>
<style scoped>
.toggle {
  @apply inline-flex items-center;
}
.toggle input {
  @apply sr-only;
}
.toggle__wrapper {
  @apply inline-flex items-center border border-gray-100 relative bg-[v-bind('props.inactiveColor')] rounded-full overflow-hidden cursor-pointer;
}
.toggle__on .toggle__wrapper {
  @apply bg-[v-bind('props.activeColor')];
}
.toggle__inner {
  @apply w-full h-full flex justify-center items-center transition-all;
}
.toggle__inner .toggle__icon {
  @apply stroke-white h-3/4;
}
.toggle__text {
  @apply text-white text-[80%] uppercase whitespace-nowrap text-ellipsis overflow-hidden px-2;
}
.toggle__action {
  @apply absolute top-[3px] left-[4px] rounded-full transition-all bg-white overflow-hidden;
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
.toggle__on .toggle__large .toggle__inner {
  @apply pl-0 pr-6;
}
.toggle__large .toggle__action {
  @apply w-6 h-6;
}
.toggle__on .toggle__large .toggle__action {
  @apply left-[calc(100%-28px)];
}
.toggle__default {
  @apply min-w-[3.75rem] h-7;
}
.toggle__default .toggle__inner {
  @apply pl-5 pr-0;
}
.toggle__on .toggle__default .toggle__inner {
  @apply pl-0 pr-5;
}
.toggle__default .toggle__action {
  @apply w-5 h-5;
}
.toggle__on .toggle__default .toggle__action {
  @apply left-[calc(100%-24px)];
}
.toggle__small {
  @apply min-w-12 h-6;
}
.toggle__small .toggle__inner {
  @apply pl-4 pr-0;
}
.toggle__on .toggle__small .toggle__inner {
  @apply pl-0 pr-4;
}
.toggle__small .toggle__action {
  @apply w-4 h-4;
}
.toggle__on .toggle__small .toggle__action {
  @apply left-[calc(100%-20px)];
}
</style>
