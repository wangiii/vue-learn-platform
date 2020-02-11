<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <router-link to="/">
          <div class="topLogo">
            华商e学堂
          </div>
        </router-link>
        <a-dropdown v-if="name" class="loginButton">
          <a class="ant-dropdown-link" href="#">
            {{ name }} <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="#" @click="setting">修改密码</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#" @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-button-group class="loginButton" v-else>
          <a-button type="link">
            <router-link to="/login">
              登录
            </router-link>
          </a-button>
          <a-button type="link">注册</a-button>
        </a-button-group>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <!-- <a-layout-footer class="footer">Footer</a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: ""
    };
  },
  methods: {
    setName() {
      this.name = this.$cookies.get("userName");
    },
    logout() {
      this.$cookies.remove("userName");
      this.$cookies.remove("token");
      this.$cookies.remove("phone");
      location.replace("/");
    },
    setting() {
      this.$router.replace("/setting");
    }
  },
  created: function() {
    this.setName();
  }
};
</script>

<style lang="less">
.topLogo {
  color: white;
  display: inline;
  font-size: 30px;
}
.loginButton {
  float: right;
}
</style>
