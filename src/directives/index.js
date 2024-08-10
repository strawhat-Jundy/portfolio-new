import {
  leftKeyDirective,
  rightKeyDirective,
  escKeyDirective,
} from "./keyboardDirectives";

const registerDirectives = (app) => {
  app.directive("onLeftKey", leftKeyDirective);
  app.directive("onRightKey", rightKeyDirective);
  app.directive("onEsc", escKeyDirective);
};

export default registerDirectives;
