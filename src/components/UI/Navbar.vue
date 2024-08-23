<template>
  <nav v-bind="$attrs" class="navbar" :class="navbarClasses" ref="navbar">
    <div
      class="navbar__wrapper"
      :class="isOpen ? 'menu__is--open' : 'menu__is--closed'"
    >
      <div v-if="logo" class="navbar__logo">
        <img :src="logo" alt="Logo" />
      </div>
      <ul class="navbar__menu">
        <li v-for="link in links" :key="link">
          <span :class="{ active: isActive(link.path) }"
            ><a :href="link.path">{{ link.name }}</a></span
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
              @change="handleDarkmode"
              active-color="#374151"
              inactive-color="#fff"
              :size="isMobile ? 'default' : 'large'"
            >
              <template #inactiveAction>
                <span class="half-moon"></span>
              </template>
            </Toggle>
          </span>
        </li>
        <span
          class="mobile--menu"
          @click="openMenu"
          v-if="isMobile || type === 'collapse'"
        ></span>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { useRouter } from "vue-router";
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from "vue";

/* TOGGLE COMPONENT */
import Toggle from "./Toggle.vue";

/* ROUTER */
const router = useRouter();

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

const handleSticky = (e) => {
  const offsetTop = navbar.value.offsetTop;
  isSticky.value = scrollY > offsetTop - (offsetTop >= 5 ? 5 : 0);
};

/* RESIZE HANDLER */
const windowSize = ref(window.innerWidth);

const handleResize = () => {
  windowSize.value = window.innerWidth;
};

const isMobile = computed(() => windowSize.value <= 767);

/* IS ACTIVE HANDLER */
const isActive = (path) => {
  return router.currentRoute.value.href === path;
};

/* DARKMODE HANDLER */
const isLightMode = ref(false);

const handleDarkmode = (val) => {
  isLightMode.value = val;
  const mode = val ? "light" : "dark";
  localStorage.setItem("theme", mode);
  document.documentElement.setAttribute("data-theme", mode);
};

/* MENU HANDLER */
const isOpen = ref(false);
const openMenu = () => {
  isOpen.value = !isOpen.value;
};

/* CLASSES */
const navbarClasses = computed(() => {
  const sticky = isSticky.value && props.type === "sticky" && "sticky--scroll";
  const collapsible =
    (isMobile.value || props.type === "collapse") && "is--collapsed";

  return [`navbar__is--${props.type}`, sticky, collapsible];
});

/* HOOKS */
onMounted(() => {
  window.addEventListener("scroll", handleSticky);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleSticky);
  window.removeEventListener("resize", handleResize);
});

onBeforeMount(() => {
  /* DARKMODE */
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedMode = localStorage.getItem("theme");

  if ((!storedMode && isDark) || storedMode === "dark") {
    handleDarkmode(false);
  } else {
    handleDarkmode(true);
  }
});
</script>
<style scoped>
.navbar {
  @apply w-full z-50;
}
.navbar__is--fixed,
.navbar__is--collapse,
.navbar__is--sticky {
  @apply fixed top-0 w-full;
}
.navbar__is--sticky {
  @apply sticky;
}
.navbar__is--collapse {
  @apply shadow-lg;
}
.sticky--scroll {
  @apply shadow;
}
.navbar__wrapper {
  @apply flex justify-between relative items-center h-20 bg-body;
  @apply md:px-20 max-md:h-16;
}
.sticky--scroll .navbar__wrapper {
  @apply h-16;
}
.sticky--scroll.is--collapsed .navbar__wrapper {
  @apply h-12;
}
.navbar__logo {
  @apply relative z-[1];
  @apply h-[calc(100%-1rem)];
}
.navbar__logo img {
  @apply h-full object-contain contrast-[0.5] dark:invert-[1];
}
.navbar__menu {
  @apply flex items-center self-center gap-5 flex-wrap;
}
.navbar__menu > li > span {
  @apply block relative overflow-hidden w-max;
  @apply after:content-[''] after:block after:absolute after:bottom-0 after:w-full after:h-0.5 after:transition-all after:duration-200 after:bg-primary after:-translate-x-full hover:after:translate-x-0;
}
.navbar__menu > li > span > a {
  @apply text-xl text-color-text font-normal;
}
.navbar__menu .active {
  @apply after:translate-x-0;
}
.sticky--scroll.is--collapsed .navbar__menu {
  @apply shadow top-12;
}
.navbar__socials {
  @apply flex justify-end items-center h-full gap-2 z-[1];
}
.navbar__socials .social--icon {
  @apply w-7 h-7 p-0.5 border-2 border-color-text rounded fill-color-text hover:opacity-80;
}
.navbar__socials .dark--mode {
  @apply md:ml-2;
}
.navbar__socials :deep(.toggle__wrapper) {
  @apply min-w-[2.8rem] max-md:min-w-10 duration-200;
}
.navbar__socials .half-moon {
  @apply bg-white rounded-full shadow-[inset_10px_0_0_0_rgb(2,21,38)];
}
.is--collapsed {
  @apply shadow-none;
}
.is--collapsed .navbar__wrapper {
  @apply px-0;
}
.is--collapsed .navbar__logo {
  @apply pl-8 md:pl-20;
}
.is--collapsed .navbar__socials {
  @apply w-full md:px-20 px-8;
}
.is--collapsed .mobile--menu {
  @apply relative cursor-pointer ml-2 z-[1] h-4 w-8;
  @apply after:content-[''] after:absolute after:top-0 after:block after:h-1 after:w-8 after:rounded after:bg-color-text after:transition-all after:duration-300;
  @apply before:content-[''] before:absolute before:bottom-0 before:block before:h-1 before:w-8 before:rounded before:bg-color-text before:transition-all before:duration-300;
}
.is--collapsed .menu__is--open .mobile--menu {
  @apply after:-rotate-45 after:top-1/2;
  @apply before:rotate-45 before:bottom-1/4;
}
.is--collapsed .navbar__menu {
  @apply justify-center flex-col gap-0 bg-body absolute top-16 transition-all duration-300 w-full z-[-1];
}
.is--collapsed .navbar__menu li {
  @apply py-4 w-[98%] border-b border-gray-100 overflow-hidden flex justify-center;
}
.is--collapsed .navbar__menu li:first-child {
  @apply mt-4;
}
.is--collapsed .navbar__menu li:last-child {
  @apply border-none;
}
.is--collapsed .navbar__menu li > span {
  @apply block duration-300;
}
.is--collapsed .menu__is--open .navbar__menu {
  @apply translate-y-0;
}
.is--collapsed .menu__is--open .navbar__menu li > span {
  @apply translate-y-0 delay-500 after:h-1;
}
.is--collapsed .menu__is--closed .navbar__menu {
  @apply -translate-y-full delay-500;
}
.is--collapsed .menu__is--closed .navbar__menu li > span {
  @apply translate-y-[150%];
}
.navbar__is--collapse .navbar__menu {
  @apply h-screen top-0 gap-16 duration-500;
}
.navbar__is--collapse .navbar__menu li {
  @apply border-none;
}
.navbar__is--collapse .navbar__menu li:first-child {
  @apply mt-0;
}
.navbar__is--collapse .navbar__menu li > span > a {
  @apply text-6xl tracking-wider font-semibold text-color-text;
}
</style>
