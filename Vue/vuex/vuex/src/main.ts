import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// singleModule
// import store from "./usage/examples/basicUsage/singleModule/store";

// multipleModules
import store from "./usage/basicUsage/singleModule/store";

createApp(App).use(store).mount("#app");
