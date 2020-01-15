import Vue from "vue";
import Router from "vue-router";

const Hellow = () => import("root/components/hellow");
const Word = () => import("root/components/word");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Hellow",
      component: Hellow
    },
    {
      path: "/word",
      name: "Word",
      component: Word
    }
  ]
});
