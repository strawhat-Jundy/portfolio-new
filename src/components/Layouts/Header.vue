<template>
  <Navbar
    :links="links"
    :logo="Logo"
    :socials="socials"
    type="collapse"
    darkmode
    class="nav"
  ></Navbar>
</template>
<script setup>
import { ref, shallowRef } from "vue";
import Navbar from "../UI/Navbar.vue";

import Logo from "../../assets/logo/main.png";

import Github from "../Icons/Github.vue";
import LinkedIn from "../Icons/LinkedIn.vue";

const links = ref([
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Works",
    path: "/works",
  },
  {
    name: "Contact",
    path: "/contact",
  },
]);

const socials = shallowRef([
  {
    icon: Github,
    link: "https://github.com/strawhat-Jundy",
  },
  {
    icon: LinkedIn,
    link: "https://www.linkedin.com/in/jundy-dimasu-ay/",
  },
]);
</script>

<style scoped>
.nav :deep(.navbar__wrapper) {
  @apply bg-transparent;
}
</style>
