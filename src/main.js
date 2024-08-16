import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import registerDirectives from "./directives";

const app = createApp(App);
const pinia = createPinia();

/** PLUGINS **/
app.use(router);
app.use(pinia);

/** PROVIDERS **/

/** DIRECTIVES **/
registerDirectives(app);

app.mount("#app");
