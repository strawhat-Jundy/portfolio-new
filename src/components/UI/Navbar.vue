<template>
  <nav v-bind="$attrs" class="navbar" :class="navbarClasses" ref="navbar">
    <div class="navbar__wrapper">
      <div v-if="logo" class="navbar__logo">
        <RouterLink to="/">
          <img :src="logo" alt="Logo" />
        </RouterLink>
      </div>
      <ul class="navbar__menu">
        <li v-for="link in links" :key="link">
          <span :class="{ 'is--active': $route.path === link.path }"
            ><RouterLink @click="isOpen = false" :to="link.path">{{
              link.name
            }}</RouterLink></span
          >
        </li>
      </ul>
      <ul class="navbar__socials">
        <li v-for="social in socials" :key="social">
          <a :href="social.link" target="_blank">
            <component class="social--icon" :is="social.icon"></component>
          </a>
        </li>
        <li class="dark--mode" v-if="darkmode">
          <span class="">
            <Toggle
              v-model="isLightMode"
              active-color="#1E1E24"
              inactive-color="#FFF8F0"
              :size="isMobile ? 'default' : 'large'"
            >
              <template #inactiveAction>
                <span class="half-moon"></span>
              </template>
            </Toggle>
          </span>
        </li>
        <span
          class="collapse--menu"
          @click="openMenu"
          v-if="collapsible"
        ></span>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
} from "vue";

/* TOGGLE COMPONENT */
import Toggle from "./Toggle.vue";

/* INHERIT COMPONENT ATTRIBUTES */
defineOptions({
  inheritAttrs: false,
});

/* PROPS */
const props = defineProps({
  type: {
    type: String,
    validator(val) {
      return ["sticky", "fixed", "collapse"].includes(val);
    },
    default: "sticky",
  },
  links: {
    type: Array,
    validator(val) {
      const properties = ["name", "path"];
      return val.every((obj) =>
        properties.every((property) => obj.hasOwnProperty(property))
      );
    },
    required: true,
  },
  socials: {
    type: Array,
    validator(val) {
      const properties = ["icon", "link"];
      return val.every((obj) =>
        properties.every((property) => obj.hasOwnProperty(property))
      );
    },
  },
  logo: String,
  darkmode: Boolean,
});

/* STICKY HANDLER */
const navbar = ref(null);
const isSticky = ref(false);

const handleSticky = () => {
  const offsetTop = navbar.value.offsetTop;
  isSticky.value = scrollY > offsetTop - (offsetTop >= 5 ? 5 : 0);
};

/* RESIZE HANDLER */
const windowSize = ref(window.innerWidth);

const handleResize = () => {
  windowSize.value = window.innerWidth;
};

const isMobile = computed(() => windowSize.value <= 767);
const collapsible = computed(() => isMobile.value || props.type === "collapse");

/* DARKMODE HANDLER */
const isLightMode = ref(null);

watchEffect(() => {
  if (isLightMode.value !== null) {
    const mode = isLightMode.value ? "light" : "dark";
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
  }
});

/* MENU HANDLER */
const isOpen = ref(false);
const openMenu = () => {
  isOpen.value = !isOpen.value;
};

/* CLASSES */
const navbarClasses = computed(() => {
  const sticky = isSticky.value && props.type === "sticky" && "is--sticky";
  const mobile = isMobile.value && "is--collapsed";
  const menu = collapsible.value && isOpen.value && "menu__is--open";

  return [`navbar__${props.type}`, sticky, mobile, menu];
});

/* HOOKS */
onMounted(() => {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleSticky);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleSticky);
});

onBeforeMount(() => {
  /* DARKMODE */
  const storedMode = localStorage.getItem("theme");
  const isDark = storedMode
    ? storedMode === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

  isLightMode.value = !isDark;
});
</script>
<style scoped>
.navbar {
  @apply w-full z-50 h-20;
}
.is--collapsed {
  @apply h-16 max-sm:h-14;
}
.navbar__fixed,
.navbar__collapse,
.navbar__sticky {
  @apply fixed top-0;
}
.navbar__sticky {
  @apply sticky;
}
.navbar__sticky.is--sticky {
  @apply shadow;
}
.navbar__wrapper {
  @apply h-full flex justify-between items-center bg-background overflow-hidden;
}
.navbar__logo {
  @apply h-[calc(100%-1rem)] md:ml-12 ml-6;
}
.navbar__logo img {
  @apply h-full object-contain contrast-[0.5] dark:invert-[1];
}
.navbar__menu {
  @apply self-center flex items-center gap-5;
}
.navbar__menu li {
  @apply overflow-hidden;
}
.navbar__menu span {
  @apply block;
}
.navbar__menu span a {
  @apply block relative overflow-hidden w-max;
  @apply after:content-[''] after:block after:absolute after:bottom-0 after:w-full after:h-0.5 after:transition-transform after:duration-200 after:bg-primary after:-translate-x-[101%];
}
.navbar__menu span a:hover,
.navbar__menu span.is--active a {
  @apply lg:after:translate-x-0;
}
.navbar__menu a {
  @apply text-xl max-md:text-lg max-sm:text-base font-normal;
}
.navbar__socials {
  @apply flex justify-end items-center gap-2 md:mr-12 mr-6;
}
.social--icon {
  @apply w-full max-w-7 h-full p-0.5 border-2 border-color-text rounded fill-color-text hover:opacity-80;
}
.dark--mode {
  @apply md:ml-2;
}
.dark--mode :deep(.toggle__wrapper) {
  @apply min-w-[2.8rem] max-md:min-w-10;
}
.dark--mode :deep(.toggle__action) {
  @apply bg-[#FFF8F0];
}
.half-moon {
  @apply bg-[#FFF8F0] rounded-full shadow-[inset_10px_0_0_0_#1E1E24];
}
.navbar__collapse .navbar__menu,
.is--collapsed .navbar__menu {
  @apply absolute top-20 z-[-1] w-full justify-center flex-col gap-0 bg-background translate-x-0;
}
.navbar__sticky.is--sticky.menu__is--open {
  @apply shadow-none;
}
.navbar__fixed.is--collapsed.menu__is--open .navbar__menu,
.navbar__sticky.is--collapsed.menu__is--open .navbar__menu {
  @apply shadow;
}
.navbar__fixed.is--collapsed .navbar__menu li,
.navbar__sticky.is--collapsed .navbar__menu li {
  @apply px-14 max-sm:px-6 w-full;
}
.navbar__fixed.is--collapsed .navbar__menu span,
.navbar__sticky.is--collapsed .navbar__menu span {
  @apply py-4 border-b border-color-border w-full flex justify-center;
}
.navbar__fixed.is--collapsed .navbar__menu li:last-child span,
.navbar__sticky.is--collapsed .navbar__menu li:last-child span {
  @apply border-none;
}
.navbar__fixed.is--collapsed .navbar__menu,
.navbar__sticky.is--collapsed .navbar__menu {
  @apply top-16 max-sm:top-14;
}
.navbar__collapse .navbar__menu {
  @apply h-screen md:gap-16 gap-10 top-0 overflow-y-auto;
}
.is--collapsed:not(.menu__is--open) .navbar__menu,
.navbar__collapse:not(.menu__is--open) .navbar__menu {
  @apply -translate-y-full;
}
.navbar__collapse:not(.menu__is--open) .navbar__menu {
  @apply delay-500;
}
.navbar__collapse .navbar__menu span a {
  @apply after:h-1;
}
.navbar__collapse:not(.menu__is--open) .navbar__menu span {
  @apply translate-y-[150%];
}
.navbar__collapse.menu__is--open .navbar__menu span {
  @apply translate-y-0 delay-500;
}
.navbar__collapse .navbar__menu a {
  @apply text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl tracking-wider;
}
.is--collapsed .collapse--menu,
.navbar__collapse .collapse--menu {
  @apply relative cursor-pointer ml-2 h-4 w-8 select-none;
  @apply after:content-[''] after:absolute after:top-0 after:block after:h-1 after:w-full after:rounded after:bg-color-text after:transition-all after:duration-300;
  @apply before:content-[''] before:absolute before:bottom-0 before:block before:h-1 before:w-full before:rounded before:bg-color-text before:transition-all before:duration-300;
}
.is--collapsed .collapse--menu {
  @apply w-6 h-[0.70rem];
  @apply after:h-[0.130rem];
  @apply before:h-[0.130rem];
}
.is--collapsed.menu__is--open .collapse--menu,
.navbar__collapse.menu__is--open .collapse--menu {
  @apply after:-rotate-45 after:top-1/2;
  @apply before:rotate-45 before:bottom-1/4;
}
.is--collapsed.menu__is--open .collapse--menu {
  @apply before:bottom-[30%];
}
</style>
