<template>
  <div class="page-register">
    <div class="header">
      <header>
        <a href="#" class="site-logo"></a>
        <div class="login">
          <span>已有美团账号？</span>
          <router-link :to="{name:'login'}">登录</router-link>
        </div>
      </header>
    </div>
    <div class="content">
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="username">
          <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off" ></el-input>
          <!-- <div class="pw-strength">
            <div :class="['bar',strengthClass]"></div>
            <div class="letter">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div> -->
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" v-model="registerForm.repassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">同意以下协议并注册</el-button>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </div>
    <footer class="footer--mini">
    <p class="copyright">
        ©<a class="f1" href="https://www.meituan.com">meituan.com</a>&nbsp;
        <a class="f1" target="_blank" href="http://www.miibeian.gov.cn/">京ICP证070791号</a>&nbsp;
        <span class="f1">京公网安备11010502025545号</span>
    </p>
</footer>
  </div>
</template>
<script>
import api from '@/api/index.js'
export default {
  data() {
    var validateUser = (rule,value,callback) => {
      if(value === ""){
        callback(new Error("请输入手机号"));
      }else if(value.length < 4 || value.length > 16){
        callback(new Error("用户名必须为4-16位的字母数字下划线组成"));
      }else {
        callback();
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }else {
        if (this.registerForm.repassword !== "") {
          this.$refs.registerForm.validateField("repassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        repassword: ""
      },
      rules: {
        username:[{validator:validateUser,trigger:"blur"}],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.registerForm);
              api.register({
                  params: this.registerForm
              }).then((res) => {
                  console.log("调用成功",res);
                  if (res.data.status == 'success') {

                      this.$router.push({name: 'login'})
                  }else{
                    alert(res.data.msg);
                  }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    input(){
      var regStr = /(\w)+/g;
      var regNum = /(\d)+/g;
      var reg = /_/g;
      var strongth = this.registerForm.password.match(reg) && this.registerForm.password.match(regNum) && this.registerForm.password.match(regStr);
      if(this.registerForm.password.length >12 || (this.registerForm.password > 6 && strongth)) {
        this.strengthClass = 'strong';
      }else if(this.registerForm.password.length < 6){
        this.strengthClass = 'week';
      }else if(this.registerForm.password == ''){
        this.strengthClass = '';
      }else {
        this.strengthClass = "normal";
      }
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
