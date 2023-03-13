import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarIconSet from "quasar/icon-set/fontawesome-v6";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

// Import Quasar css
import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(Quasar, {
  iconSet: quasarIconSet,
});

app.mount("#app");
