<template>
  <div class="box">
    <div class="bg">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: center;">
          <span>欢迎登录</span>
        </div>
        <el-form label-position="left" label-width="80px" :model="formData">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input placeholder="请输入密码" show-password v-model="formData.password"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="button" :disabled="disabled" type="primary" @click="login">登录</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import {login} from "../assets/request";

export default {
  name: "Login",
  data() {
    return {
      formData: {
        name: '',
        password: ''
      }
    }
  },
  computed: {
    disabled() {
      return !(this.formData.name && this.formData.password)
    }
  },
  methods: {
    login() {
      login({
        "username": this.formData.name,
        "password": this.formData.password,
      }).then((res) => {
        if (res.data.code === 0) {
          sessionStorage.setItem('token', res.data.data)
          this.$router.replace({path: '/main'})
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;

  .bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url("../assets/1.jpg");
    background-size: cover;

    .box-card {
      min-width: 400px;
      min-height: 300px;
      max-width: 500px;
      max-height: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40%;
      height: 30%;
    }

    .button {
      width: 60%;
      padding: 15px;
      margin: 10px 20% 0;

    }
  }
}
</style>
