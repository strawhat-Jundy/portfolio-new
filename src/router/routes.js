import Home from "../components/Pages/Home.vue";
import NotFound from "../components/Pages/404.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Page Not Found",
    },
  },
];

export default routes;
