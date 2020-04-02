import Vue from "vue";
import VueRouter from "vue-router";
import nprogress from "nprogress";
import store from "../store/index";

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
    component: () => import("../pages/Movies.vue"),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch("Movies/fetchMovies").then(movies => {
        routeTo.params.movies = movies;
        next();
      });
    }
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

router.beforeEach((routeTo, routeFrom, next) => {
  nprogress.start();
  next();
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
