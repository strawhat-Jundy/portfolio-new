<template>
  <ScrollSnap :components="components" />
</template>
<script setup>
import Banner from "../Layouts/Banner.vue";
import About from "../Layouts/About.vue";
import Works from "../Layouts/Works.vue";

import ScrollSnap from "../Layouts/Features/ScrollSnap.vue";

import { shallowRef } from "vue";

const components = shallowRef([
  {
    path: "banner",
    component: Banner,
  },
  {
    path: "about",
    component: About,
  },
  {
    path: "works",
    component: Works,
  },
]);
</script>
