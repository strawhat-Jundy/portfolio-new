import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { title, description } = to.meta;
  const defaultTitle = "Juan Dela Cruz";
  const defaultDescription =
    "This is a personal portfolio of Mr. Juan Dela Cruz";

  document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

  const descriptionElement = document.querySelector(
    'head meta[name="description"]'
  );

  descriptionElement.setAttribute("content", description || defaultDescription);
});

export default router;
