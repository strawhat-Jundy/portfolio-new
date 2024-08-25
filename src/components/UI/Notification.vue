<template>
  <teleport to="body">
    <transition-group tag="div" name="slide" class="notification__container">
      <div
        class="notification"
        :class="notificationClasses"
        v-for="(content, index) in contents"
        :key="content"
      >
        <div class="notification__header">
          <h3>{{ content.title }}</h3>
          <button
            type="button"
            class="notification__btn--close"
            @click="closeNotif(index)"
          >
            <Close stroke-width="2" />
          </button>
        </div>
        <div class="notification__content">
          <p v-if="!content.message.__v_isVNode">{{ content.message }}</p>
          <component v-else :is="content.message"></component>
        </div>
      </div>
    </transition-group>
  </teleport>
</template>
<script setup>
import { computed, ref } from "vue";
import Close from "../Icons/Close.vue";

/* PROPS */
const props = defineProps({
  duration: Number,
  type: {
    type: String,
    validator(val) {
      return ["primary", "success", "warning", "error"].includes(val);
    },
    default: "primary",
  },
});

/* CONTENTS HANDLER */
const contents = ref([]);

const pushNotification = ({ title, message }) => {
  const content = { title, message };

  contents.value.push(content);

  if (props.duration) {
    setTimeout(() => {
      closeNotif(contents.value.indexOf(content));
    }, props.duration);
  }
};

/* CLOSE HANDLER */
const closeNotif = (index) => {
  contents.value.splice(index, 1);
};

/* CLASSES */
const notificationClasses = computed(() =>
  props.duration ? ["after", `after--${props.type}`] : ""
);

/* NOTIFICATION::AFTER DURATION HANDLER */
const duration = computed(() => `${props.duration + 300}ms`);

/* EXPORT FUNCTIONS */
defineExpose({
  pushNotification,
});
</script>

<style scoped>
.notification__container {
  @apply w-full max-w-80 max-sm:max-w-60 flex flex-col gap-4 fixed z-[1000] right-4 top-4;
}
.notification {
  @apply w-full min-h-28 max-sm:min-h-24 px-5 py-4 bg-background-accent border border-color-border shadow-lg rounded-md relative overflow-hidden;
}
.notification.after {
  @apply after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:animate-[shrink] after:animate-duration-[v-bind('duration')];
}
.after--primary {
  @apply after:bg-primary;
}
.after--success {
  @apply after:bg-bs-success;
}
.after--warning {
  @apply after:bg-bs-warning;
}
.after--error {
  @apply after:bg-bs-danger;
}
.notification__header {
  @apply flex items-center;
}
.notification__header h3 {
  @apply text-lg max-sm:text-sm font-bold pr-4;
}
.notification__btn--close {
  @apply w-4 ml-auto;
}
.notification__btn--close svg {
  @apply mix-blend-difference;
}
.notification__content {
  @apply mt-2;
}
.slide-move,
.slide-enter-active,
.slide-leave-active {
  @apply duration-300 ease-in-out;
}
.slide-enter-from {
  @apply translate-x-full;
}
.slide-enter-to {
  @apply translate-x-0;
}
.slide-leave-from {
  @apply opacity-100;
}
.slide-leave-to {
  @apply opacity-0 -z-[1];
}
.slide-leave-active {
  @apply absolute;
}
</style>
