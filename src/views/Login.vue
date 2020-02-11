<template>
  <b-container class="container">
    <h2 class="topFont">学生登陆</h2>
    <a-form id="components-form-demo-normal-login" class="login-form">
      <a-form-item>
        <a-input
          v-model="phone"
          v-decorator="[
            '手机',
            {
              rules: [{ required: true, message: '请输入手机号码' }]
            }
          ]"
          placeholder="手机"
        >
          <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model="password"
          v-decorator="[
            '密码',
            {
              rules: [{ required: true, message: '请输入密码' }]
            }
          ]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="login" class="login-form-button">
          登陆
        </a-button>
      </a-form-item>
    </a-form>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "http://localhost:8888/login",
        data: {
          username: this.phone,
          password: this.password
        }
      })
        .then(res => {
          console.log(res.data);
          this.$cookies.set("phone", res.data.data.uuid, 24 * 60 * 60 * 1000);
          this.$cookies.set("token", res.data.data.token, 24 * 60 * 60 * 1000);
          this.$cookies.set(
            "userName",
            res.data.data.userName,
            24 * 60 * 60 * 1000
          );
          console.log("phone:" + res.data.data.uuid);
          console.log("token:" + res.data.data.token);
          console.log("userName:" + res.data.data.userName);
          location.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.login-form {
  display: inline-block;
  max-width: 300px;
}
.login-form-button {
  width: 300px;
}
.container {
  text-align: center;
  float: none;
}
.topFont {
  margin: 10px;
  margin-left: 0px;
  color: darkgray;
}
</style>
