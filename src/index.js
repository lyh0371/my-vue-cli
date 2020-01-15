import Vue from "vue";
import App from "./app.vue";
import "./assets/style/main.less";
import "./assets/style/init.less";
import router from "./router";
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
