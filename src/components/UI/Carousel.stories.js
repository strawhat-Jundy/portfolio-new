import Carousel from "./Carousel.vue";
import "../../style.css";

import Image1 from "../../assets/carousel/Example1.jpg";
import Image2 from "../../assets/carousel/Example2.jpg";
import Image3 from "../../assets/carousel/Example3.jpg";
import Image4 from "../../assets/carousel/Example4.jpg";
import Image5 from "../../assets/carousel/Example5.jpg";

export default {
  title: "UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    autoplay: { control: { type: "number", min: 1000, max: 10000 } },
    pagination: { control: "boolean" },
    animation: { control: "select", options: ["slide", "fade"] },
    loop: { control: "boolean" },
    images: {
      description: `<b>Array Format:</b>
        <br/>
        <b>1)</b> [{src: 'src/Image1.jpg' alt: 'Example 1'}, {src: 'src/Image2.jpg' alt: 'Example 2'}, {src: 'src/Image3.jpg' alt: 'Example 3'}]
        <br/>
        <b>2)</b> ['src/Image1.jpg', 'src/Image2.jpg', 'src/Image3.jpg']`,
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
