<script setup>
import Notification from "./UI/Notification.vue";
import Carousel from "./UI/Carousel.vue";
import Modal from "./UI/Modal.vue";
import Button from "./UI/Button.vue";

import Image1 from "../assets/carousel/Example1.jpg";
import Image2 from "../assets/carousel/Example2.jpg";
import Image3 from "../assets/carousel/Example3.jpg";
import Image4 from "../assets/carousel/Example4.jpg";
import Image5 from "../assets/carousel/Example5.jpg";

import {
  computed,
  h,
  onMounted,
  onUnmounted,
  ref,
  render,
  watch,
  watchEffect,
} from "vue";

const notif = ref(null);

const showNotif = () => {
  notif.value.pushNotification({
    title: "Title",
    message:
      "This is a very long message. This is a very long message. This is a very long message. This is a very long message. This is a very long message.",
  });
};
</script>

<template>
  <div ref="container">
    <Notification ref="notif" :duration="3000" />
    <Button @click="showNotif">Button</Button>
  </div>
</template>

<style scoped></style>
