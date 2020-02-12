<template>
  <b-container class="container">
    <h2 class="topFont">学生注册</h2>
    <a-form class="login-form">
      <a-form-item>
        <a-select
          showSearch
          placeholder="选择院系"
          optionFilterProp="children"
          style="width: 300px"
          @change="handleChangeFaculty"
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="f in faculties"
            :key="f.value"
            :value="f.value"
            >{{ f.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select
          showSearch
          placeholder="选择专业"
          optionFilterProp="children"
          style="width: 300px"
          @change="handleChangeMajor"
          :filterOption="filterOption"
        >
          <a-select-option v-for="m in majors" :key="m.value" :value="m.value"
            >{{ m.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model="name"
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入用户名' }]
            }
          ]"
          placeholder="用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model="phone"
          v-decorator="[
            'phone',
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
          autocomplete="off"
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
        <a-input
          v-model="rePassword"
          autocomplete="off"
          v-decorator="[
            'rePassword',
            {
              rules: [{ required: true, message: '请重复输入密码' }]
            }
          ]"
          type="password"
          placeholder="重复密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="register" class="login-form-button">
          注册
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
      name: "",
      phone: "",
      password: "",
      rePassword: "",
      faculty: "",
      major: "",
      faculties: [],
      majors: []
    };
  },
  mounted() {
    this.initFaculties();
  },
  methods: {
    initFaculties() {
      axios({
        method: "get",
        url: "http://localhost:8888/faculty/dto"
      })
        .then(res => {
          console.log(res.data);
          this.faculties = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMajors(facultyId) {
      axios({
        method: "get",
        url: "http://localhost:8888/major/dto/" + facultyId
      })
        .then(res => {
          console.log(res.data);
          this.majors = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChangeFaculty(value) {
      this.faculty = value;
      this.getMajors(value);
    },
    handleChangeMajor(value) {
      this.major = value;
    },
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
          location.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (!telStr.test(this.phone)) {
        alert("手机号码输入不规范");
      } else if (this.password != this.rePassword) {
        alert("两次输入的密码不一致");
        this.password = "";
        this.rePassword = "";
      } else {
        console.log("faculty:" + this.faculty);
        console.log("major:" + this.major);
        let param = new URLSearchParams();
        param.append("name", this.name);
        param.append("password", this.password);
        param.append("phone", this.phone);
        param.append("major.id", this.major);
        param.append("faculty.id", this.faculty);
        axios({
          method: "post",
          url: "http://localhost:8888/student/",
          data: param
        })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 200) {
              this.login();
            } else {
              alert("注册失败");
            }
          })
          .catch(err => {
            alert("注册失败");
            console.log(err);
          });
      }
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
