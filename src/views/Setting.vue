<template>
  <b-container class="container">
    <h2 class="topFont">修改密码</h2>
    <a-form id="components-form-demo-normal-login" class="login-form">
      <a-form-item>
        <a-input
          v-model="oldPassword"
          autocomplete="off"
          v-decorator="[
            'oldPassword',
            {
              rules: [{ required: true, message: '请输入旧密码' }]
            }
          ]"
          type="password"
          placeholder="旧密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model="password"
          autocomplete="off"
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入新密码' }]
            }
          ]"
          type="password"
          placeholder="新密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="changePassword"
          class="login-form-button"
        >
          修改
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
      oldPassword: "",
      password: ""
    };
  },
  methods: {
    changePassword() {
      if (this.password == this.oldPassword) {
        alert("新旧密码不能相同！");
      } else if (this.password != "" && this.oldPassword != "") {
        let param = new URLSearchParams();
        param.append("password", this.password);
        param.append("oldPassword", this.oldPassword);
        axios({
          method: "put",
          url: "http://localhost:8888/student/",
          data: param,
          headers: {
            Authorization: "Bearer " + this.$cookies.get("token")
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.password = "";
              this.oldPassword = "";
              alert("修改成功！");
            } else {
              alert("修改失败！");
            }
          })
          .catch(err => {
            alert("修改失败！");
            console.log(err);
          });
      } else {
        alert("密码不能为空！");
      }
    }
  }
};
</script>

<style></style>
