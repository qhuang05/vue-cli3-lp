<template>
  <div class="login-wrap">
    <div class="ms-title">MCK后台管理系统</div>
    <div class="ms-login">
      <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="demo-form">
        <el-form-item prop="uname">
          <el-input v-model="form.uname" placeholder="您的账户"></el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input type="passwd" placeholder="您的密码" v-model="form.passwd"></el-input>
        </el-form-item>
        <!-- <el-form-item class="code" prop="code">
          <el-input class="value" placeholder="验证码" v-model="form.code" @keyup.enter.native="submitForm('form')"></el-input>
          <div class="img-wrap">
            <img class="image" :src="codeurl" alt="验证码" @click="changeValidCode">
          </div>
        </el-form-item> -->
        <div class="login-btn">
          <el-button type="primary" :loading="loading" @click="submitForm('form')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { baseURL } from '../../utils/plugins/request';

export default {
  data() {
    return {
      codeurl: '',
      loading: false,
      form: {
        uname: '',
        passwd: '',
        code: '',
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        // code: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' },
        // ],
      },
    };
  },
  created() {
    this.changeValidCode();
  },
  methods: {
    changeValidCode() {
      this.codeurl = `${baseURL}/system_conf/captcha/generate?t=${Date.now()}`;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          // this.$http.post('/manager/login', this.form).then(() => {
            this.$router.push({ path: '/' });
          // }).catch(() => {
          //   this.changeValidCode();
          // }).finally(() => {
          //   this.loading = false;
          // });
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap{
  position: relative;
  width:100%;
  height:100%;
  background: #778499;
}
.ms-title{
  position: absolute;
  top:50%;
  width:100%;
  margin-top: -230px;
  text-align: center;
  font-size:30px;
  color: #fff;
}
.ms-login{
  position: absolute;
  left:50%;
  top:50%;
  width:300px;
  height:150px;
  margin:-150px 0 0 -190px;
  padding:40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn{
  margin-top: 20px;
  text-align: center;
}
.login-btn button{
  width:100%;
  height:36px;
}
.code .value{
  width: 180px;
}
.code .img-wrap {
  display: inline-block;
  position: relative;
}
.code .image {
  position: absolute;
  top: -36px;
  left: 0;
  width: 120px;
  height: 50px;
}
</style>
