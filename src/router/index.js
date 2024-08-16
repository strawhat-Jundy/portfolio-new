import { createMemoryHistory, createRouter } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to) => {
  const { title, description } = to.meta;
  const defaultTitle = "Jundy Mer Dimasu-ay";
  const defaultDescription =
    "This is a personal portfolio of Mr. Jundy Mer Dimasu-ay";

  document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

  const descriptionElement = document.querySelector(
    'head meta[name="description"]'
  );

  descriptionElement.setAttribute("content", description || defaultDescription);
});

export default router;
