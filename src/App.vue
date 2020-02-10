<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <router-link to="/">
          <div class="topLogo">
            华商e学堂
          </div>
        </router-link>
        <a-button-group class="loginButton">
          <a-button type="link">登录</a-button>
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
