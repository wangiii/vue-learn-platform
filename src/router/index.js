import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Course from "../views/Course.vue";
import Login from "../views/Login.vue";
import Setting from "../views/Setting.vue";
import Register from "../views/Register.vue";
import Video from "../views/Video.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/course/:courseId",
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
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/video",
    name: "video",
    component: Video
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
