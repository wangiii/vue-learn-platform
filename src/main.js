import Vue from "vue";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Menu,
  Layout,
  Dropdown,
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon
} from "ant-design-vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Layout);
Vue.use(Dropdown);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
