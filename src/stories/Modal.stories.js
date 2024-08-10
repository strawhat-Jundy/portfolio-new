import { setup } from "@storybook/vue3";
import Modal from "../components/UI/Modal.vue";
import Button from "../components/UI/Button.vue";
import "../style.css";

import registerDirectives from "../directives";

setup((app) => {
  registerDirectives(app);
});

export default {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    transition: {
      control: "select",
      options: ["fade", "slide-up", "slide-down", "slide-left", "slide-right"],
    },
  },
  render: (args) => ({
    components: { Button, Modal },
    setup() {
      return { args };
    },
    template: `
                <Button @click="args.modal = true">Click Me!</Button>
                <Modal @close="args.modal = false" v-bind="args">
                  <div class="h-24 p-3">{{ args.default }}</div>
                </Modal>
              `,
  }),
  args: {
    modal: false,
    showClose: true,
    width: 700,
  },
};

export const CustomWidth = {
  args: {
    width: 1000,
    default: "This is an Example Modal with a custom WIDTH of 1000px",
  },
};

export const SlideUpTransition = {
  args: {
    transition: "slide-up",
    default: "This is a Modal TRANSITION SLIDE-UP and defalt is FADE",
  },
};

export const SlideDownTransition = {
  args: {
    transition: "slide-down",
    default: "This is a Modal TRANSITION SLIDE-DOWN and defalt is FADE",
  },
};

export const SlideLeftTransition = {
  args: {
    transition: "slide-left",
    default: "This is a Modal TRANSITION SLIDE-LEFT and defalt is FADE",
  },
};

export const SlideRightTransition = {
  args: {
    transition: "slide-right",
    default: "This is a Modal TRANSITION SLIDE-RIGHT and defalt is FADE",
  },
};

export const CustomTitle = {
  args: {
    default: "This is a Modal with Custom Title",
  },
  render: (args) => ({
    components: { Button, Modal },
    setup() {
      return { args };
    },
    template: `
                <Button @click="args.modal = true">Click Me!</Button>
                <Modal @close="args.modal = false" v-bind="args">
                  <template #title>
                    <h1 class="p-3 text-lg font-medium">Custom Title</h1>
                  </template>
                  <div class="h-24 p-3">{{ args.default }}</div>
                </Modal>
              `,
  }),
};
