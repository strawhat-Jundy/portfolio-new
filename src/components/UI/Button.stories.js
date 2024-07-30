import Button from "./Button.vue";
import "../../style.css";
import { fn } from "@storybook/test";

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "bs-primary",
        "bs-secondary",
        "bs-success",
        "bs-warning",
        "bs-danger",
        "bs-info",
      ],
    },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
    },
  },
};

export const Primary = {
  args: {
    type: "primary",
    default: "Primary",
    onClick: fn(() => "This is a test."),
  },
};

export const Secondary = {
  args: {
    type: "secondary",
    default: "Secondary",
  },
};

export const Large = {
  args: {
    size: "large",
    default: "Large",
  },
};

export const Medium = {
  args: {
    size: "medium",
    default: "Medium",
  },
};

export const Small = {
  args: {
    size: "small",
    default: "Small",
  },
};

export const BSPrimary = {
  args: {
    type: "bs-primary",
    default: "BS Primary",
  },
};

export const BSSecondary = {
  args: {
    type: "bs-secondary",
    default: "BS Secondary",
  },
};

export const BSSuccess = {
  args: {
    type: "bs-success",
    default: "BS Success",
  },
};

export const BSWarning = {
  args: {
    type: "bs-warning",
    default: "BS Warning",
  },
};

export const BSDanger = {
  args: {
    type: "bs-danger",
    default: "BS Danger",
  },
};

export const BSInfo = {
  args: {
    type: "bs-info",
    default: "BS Info",
  },
};
