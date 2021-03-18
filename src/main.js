import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
Vue.config.productionTip = false;

//imports for bootstrap
import "./plugins/bootstrap";

// Initialize store
Vue.prototype.$store = store;

// initialize global for axios

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
