import Button from "./Button.vue";
import "../../style.css";

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
    uppercase: {
      control: "boolean",
    },
  },
};

export const Primary = {
  args: {
    type: "primary",
    default: "Primary",
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
  parameters: {
    docs: {
      description: {
        story: "Bootstrap default PRIMARY button",
      },
    },
  },
};

export const BSSecondary = {
  args: {
    type: "bs-secondary",
    default: "BS Secondary",
  },
  parameters: {
    docs: {
      description: {
        story: "Bootstrap default SECONDARY button",
      },
    },
  },
};

export const BSSuccess = {
  args: {
    type: "bs-success",
    default: "BS Success",
  },
  parameters: {
    docs: {
      description: {
        story: "Bootstrap default SUCCESS button",
      },
    },
  },
};

export const BSWarning = {
  args: {
    type: "bs-warning",
    default: "BS Warning",
  },
  parameters: {
    docs: {
      description: {
        story: "Bootstrap default WARNING button",
      },
    },
  },
};

export const BSDanger = {
  args: {
    type: "bs-danger",
    default: "BS Danger",
  },
  parameters: {
    docs: {
      description: {
        story: "Bootstrap default DANGER button",
      },
    },
  },
};

export const BSInfo = {
  args: {
    type: "bs-info",
    default: "BS Info",
  },
  parameters: {
    docs: {
      description: {
        story: "Bootstrap default INFO button",
      },
    },
  },
};
