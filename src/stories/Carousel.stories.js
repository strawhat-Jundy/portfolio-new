import { setup } from "@storybook/vue3";
import Carousel from "../components/UI/Carousel.vue";
import "../style.css";

import Image1 from "../assets/carousel/Example1.jpg";
import Image2 from "../assets/carousel/Example2.jpg";
import Image3 from "../assets/carousel/Example3.jpg";
import Image4 from "../assets/carousel/Example4.jpg";
import Image5 from "../assets/carousel/Example5.jpg";

import registerDirectives from "../directives";

setup((app) => {
  registerDirectives(app);
});

export default {
  title: "UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    autoplay: { control: { type: "number", min: 1000, max: 10000 } },
    animation: { control: "select", options: ["slide", "fade"] },
    images: {
      description: `<b>Array Format:</b><br/><b>Example 1)</b><br/>[<br/>{src: 'src/Image1.jpg' alt: 'Example 1'},<br/>{src: 'src/Image2.jpg' alt: 'Example 2'},<br/>{src: 'src/Image3.jpg' alt: 'Example 3'}<br/>]<br/><b>Example 2)</b><br/>[<br/>'src/Image1.jpg',<br/>'src/Image2.jpg',<br/>'src/Image3.jpg'<br/>]`,
    },
  },
  args: {
    images: [Image1, Image2, Image3, Image4, Image5],
  },
};

export const AutoPlay = {
  args: {
    autoplay: 3000,
    loop: true,
  },
};

export const Pagination = {
  args: {
    pagination: true,
  },
};

export const FadeAnimation = {
  args: {
    autoplay: 3000,
    loop: true,
    animation: "fade",
  },
};

export const InfiniteLoop = {
  args: {
    autoplay: 3000,
    loop: true,
  },
};

export const CustomHeight = {
  args: {
    autoplay: 3000,
    loop: true,
    height: 500,
  },
};

export const WithCaption = {
  args: {
    loop: true,
    images: [
      { src: Image1, alt: "Image 1", caption: "This is a caption for Image 1" },
      Image2,
      Image3,
      { src: Image4, alt: "Image 4", caption: "This is a caption for Image 4" },
      { src: Image5, alt: "Image 5", caption: "This is a caption for Image 5" },
    ],
  },
};

export const CustomCaption = {
  render: (args) => ({
    components: { Carousel },
    setup() {
      return { args };
    },
    template:
      '<Carousel v-bind="args"><template v-for="number in 5" :key="number" #[`caption-${number}`]><div class="h-full table"><div class="table-cell align-middle"><p class="p-2 backdrop-blur text-white font-medium text-xl">This is a custom caption for {{ number }}</p></div></div><template/></Carousel>',
  }),
  args: {
    loop: true,
    pagination: true,
  },
};
