<script setup>
import Notification from "./UI/Notification.vue";
import Carousel from "./UI/Carousel.vue";
import Modal from "./UI/Modal.vue";
import Button from "./UI/Button.vue";
import Navbar from "./UI/Navbar.vue";
import Toggle from "./UI/Toggle.vue";

import Image1 from "../assets/carousel/Example1.jpg";
import Image2 from "../assets/carousel/Example2.jpg";
import Image3 from "../assets/carousel/Example3.jpg";
import Image4 from "../assets/carousel/Example4.jpg";
import Image5 from "../assets/carousel/Example5.jpg";

import Moon from "./Icons/Moon.vue";
import Sun from "./Icons/Sun.vue";

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

const images = ref([Image1, Image2, Image3]);

const notif = ref(null);

const showNotif = () => {
  notif.value.pushNotification({
    title: "Title",
    message: "This is a message",
  });
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

const toggle = ref(true);

const handleToggle = (value) => {
  console.log(value);
};
</script>

<template>
  <Navbar menu="center" sticky :links="links" />
  <div class="pt-5">
    <Toggle
      v-model="toggle"
      @change="handleToggle"
      :active-icon="Moon"
      :inactive-icon="Sun"
      active-color="#6b7280"
      inactive-color="#fff"
      size="large"
      class="border border-gray-200"
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
    <Button @click="showNotif">Show Notif</Button>
    <Notification type="success" ref="notif" :duration="5000" />
    <Modal :modal="false" show-close>
      <Carousel :images="images" loop />
    </Modal>
    <p>
      Lorem ipsum odor amet, consectetuer adipiscing elit. Vehicula scelerisque
      ridiculus dolor non auctor. Fermentum hendrerit ultricies curabitur fames
      eros morbi. Nam nascetur tellus fringilla tincidunt fermentum accumsan
      enim. Magna feugiat in id ac nulla semper per. Nunc massa sagittis libero
      ipsum sodales natoque lorem class. Felis quam platea habitant fringilla
      dictum augue fringilla. Platea varius ridiculus ullamcorper dapibus
      dapibus odio; pretium porta eu.
    </p>

    <p>
      Consectetur sapien adipiscing feugiat lacinia sociosqu vulputate phasellus
      torquent. Dis elit duis nibh himenaeos arcu. Vestibulum fames vitae
      ullamcorper dolor libero varius augue phasellus. Consectetur tellus tempor
      potenti vehicula molestie mattis eros eu. Potenti quis nullam ut pulvinar
      netus. Eros eget justo nascetur erat vel blandit. Elementum taciti
      praesent amet faucibus malesuada vivamus nam. Nisi mattis lobortis aptent
      pharetra consectetur.
    </p>

    <p>
      Integer eget pulvinar enim pulvinar rhoncus maecenas ut. Egestas a nisi
      lobortis congue malesuada. Tristique dolor quam justo eros vivamus
      nascetur vel quam. Parturient class nisi tristique porttitor viverra
      sodales efficitur nascetur. Id natoque morbi potenti cubilia accumsan.
      Faucibus lectus natoque eleifend hac ultrices congue potenti. Libero
      litora accumsan tempor euismod ridiculus aenean.
    </p>

    <p>
      Sodales curae amet malesuada fermentum bibendum conubia. Arcu porttitor
      cursus senectus ac fringilla taciti ad duis a. Quis lectus donec egestas
      tempor aptent ullamcorper felis. Ante inceptos ultrices natoque facilisi
      sagittis accumsan tellus vestibulum. Potenti mauris amet semper nam mattis
      metus nec. Conubia parturient sit congue, tempus scelerisque sapien. Enim
      condimentum amet finibus augue dignissim per. Eu efficitur dapibus
      interdum himenaeos mi posuere non ac.
    </p>

    <p>
      Conubia malesuada vestibulum tincidunt ante eros massa tempus. Torquent
      nec himenaeos non netus congue. Nisl congue felis orci himenaeos ad. Netus
      sapien mi, est lacus felis pellentesque interdum. Libero faucibus porta
      dis velit per dapibus imperdiet magnis. Ex curae vulputate tempor diam
      sapien. Mattis aliquam malesuada erat ipsum rhoncus nec sollicitudin dis.
    </p>
  </div>
</template>

<style scoped></style>
