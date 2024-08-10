const keyboardKey = {
  beforeMount(el, binding) {
    const { key, keyCode, handler } = binding.value;
    el._keysPressed = {};

    el._keyHandler = function (event) {
      if (event.key === key || event.keyCode === keyCode) {
        if (!el._keysPressed[event.key]) {
          el._keysPressed[event.key] = true;
          handler(event);
        }
      }
    };

    el._keyupHandler = function (event) {
      el._keysPressed[event.key] = false;
    };

    window.addEventListener("keydown", el._keyHandler);
    window.addEventListener("keyup", el._keyupHandler);
  },
  unmounted(el) {
    window.removeEventListener("keydown", el._keyHandler);
    window.removeEventListener("keyup", el._keyupHandler);
  },
};

export const leftKeyDirective = {
  beforeMount(el, binding) {
    keyboardKey.beforeMount(el, {
      value: {
        key: "ArrowLeft",
        keyCode: 37,
        handler: binding.value,
      },
    });
  },
  unmounted(el) {
    keyboardKey.unmounted(el);
  },
};

export const rightKeyDirective = {
  beforeMount(el, binding) {
    keyboardKey.beforeMount(el, {
      value: {
        key: "ArrowRight",
        keyCode: 39,
        handler: binding.value,
      },
    });
  },
  unmounted(el) {
    keyboardKey.unmounted(el);
  },
};

export const escKeyDirective = {
  beforeMount(el, binding) {
    keyboardKey.beforeMount(el, {
      value: {
        key: "Escape",
        keyCode: 27,
        handler: binding.value,
      },
    });
  },
  unmounted(el) {
    keyboardKey.unmounted(el);
  },
};
