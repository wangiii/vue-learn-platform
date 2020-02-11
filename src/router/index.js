import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Course from "../views/Course.vue";
import Login from "../views/Login.vue";
import Setting from "../views/Setting.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/course",
    name: "course",
    component: Course
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/setting",
    name: "setting",
    component: Setting
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
