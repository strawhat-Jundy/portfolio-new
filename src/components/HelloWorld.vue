<script setup>
import Notification from "./UI/Notification.vue";
import Carousel from "./UI/Carousel.vue";
import Modal from "./UI/Modal.vue";
import Button from "./UI/Button.vue";
import Navbar from "./UI/Navbar.vue";
import Toggle from "./UI/Toggle.vue";

import Image1 from "../assets/images/carousel/Example1.jpg";
import Image2 from "../assets/images/carousel/Example2.jpg";
import Image3 from "../assets/images/carousel/Example3.jpg";
import Image4 from "../assets/images/carousel/Example4.jpg";
import Image5 from "../assets/images/carousel/Example5.jpg";

import Moon from "./Icons/Moon.vue";
import Sun from "./Icons/Sun.vue";
import Github from "./Icons/Github.vue";
import LinkedIn from "./Icons/LinkedIn.vue";

import CV from "../assets/documents/CV.pdf";

import Logo from "../assets/logo/main.png";

import {
  computed,
  h,
  markRaw,
  onMounted,
  onUnmounted,
  ref,
  render,
  shallowRef,
  watch,
  watchEffect,
} from "vue";

const images = ref([Image1, Image2, Image3]);

const notif = ref(null);
const modal = ref(false);

const showNotif = () => {
  notif.value.pushNotification({
    title: "Title",
    message: "This is a message",
  });
  // modal.value = true;
};

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

const toggle = ref(true);

watchEffect(() => {
  // console.log(toggle.value);
});
</script>

<template>
  <Navbar
    type="collapse"
    :links="links"
    darkmode
    :logo="Logo"
    :socials="socials"
  />

  <div class="container container-screen">
    <Toggle
      v-model="toggle"
      :active-icon="Moon"
      :inactive-icon="Sun"
      active-color="#6b7280"
      inactive-color="#fff"
      size="default"
      class="border border-gray-200 shadow-lg"
    >
      <template #activeAction>
        <span class="border-white border-[3px] rounded-full bg-gray-500">
        </span>
      </template>
      <template #inactiveAction>
        <span
          class="border-yellow-500 border-[3px] rounded-full bg-yellow-100"
        ></span>
      </template>
      <template #activeInner>
        <Moon stroke-width="2" stroke="white" class="p-[8%]" />
      </template>
      <template #inactiveInner>
        <Sun stroke-width="2" stroke="#eab308" class="p-[8%]" />
      </template>
    </Toggle>
    <Button type="primary" @click="showNotif">Show Notif</Button>
    <Notification ref="notif" :duration="3000" />
    <Modal
      :modal="modal"
      @close="modal = false"
      transition="slide-down"
      show-close
    >
      <Carousel :images="images" loop />
      <!-- <iframe
        class="w-full h-screen"
        :src="CV"
        loading="lazy"
        frameborder="0"
      ></iframe> -->
    </Modal>
    <p v-for="item in 10" :key="item">This is a text</p>
  </div>
</template>

<style scoped></style>
