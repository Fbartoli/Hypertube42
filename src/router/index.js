import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/Home.vue")
  },
  {
    path: "/user/:username",
    name: "user",
    props: true,
    component: () => import("../pages/User.vue")
  },
  {
    path: "/movies",
    name: "movies",
    component: () => import("../pages/Movie.vue")
  },
  {
    // Always leave this as last one
    path: "*",

    component: () => import("../pages/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
