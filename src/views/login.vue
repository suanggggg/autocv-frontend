<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px"
      class="login-form">
      <h3 class="title">欢迎使用视觉认知系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <!--
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" />
          </div>
        </el-form-item>
      
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">
        记住我
      </el-checkbox>
      -->
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="medium" type="primary" style="width: 100%"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <el-form-item style="width: 100%">
        <router-link to="/register">注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 加密
import { encrypt } from '@/utils/rsaEncrypt'
import Cookies from 'js-cookie'
import store from '../store/index';
export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      cookiePass: '',
      loginForm: {
        username: '',
        password: '',
        //rememberMe: false,
        //code: '',
        //uuid: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ],
        //code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // 获取验证码
    //this.getCode()
    // 获取用户名密码等Cookie
    //this.getCookie()
    // token 过期提示
    //this.point()
  },
  methods: {
    /*
    getCode() {
          // 模拟返回验证码图片
          this.codeUrl = "../varifycode.jpeg"
        this.loginForm.uuid = '111'
 
    },*/
    /* getCookie() {
       const username = Cookies.get('username')
       let password = Cookies.get('password')
       const rememberMe = Cookies.get('rememberMe')
       // 保存cookie里面的加密后的密码
       this.cookiePass = password === undefined ? '' : password
       password = password === undefined ? this.loginForm.password : password
       this.loginForm = {
         username: username === undefined ? this.loginForm.username : username,
         password: password,
         rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
         code: ''
       }
     },*/
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;

          let user = new FormData();
          user.append('username', this.loginForm.username);
          user.append('password', this.loginForm.password);

          // 调用 login 接口
          this.$api.login(user)
            .then((response) => {
              const userId = response.user_id;
              const role = response.role;
              const username = this.loginForm.username;
              // 保存用户id到 Vuex 中
              store.commit('setUserId', userId);
              store.commit('setUsername', username);
              store.commit('setUserRole', role)
              if (role === 'user') {
                this.$router.push('/User');
              } else if (role === 'admin') {
                this.$router.push('/Admin');
              }
            })
            .catch(error => {
              console.log(response);
              console.error('There was a problem with the login operation:', error);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log('Form validation failed.');
        }
      });
    },

    /* if(this.loginForm.username === 'user' && this.loginForm.password === '123456' && this.loginForm.code === 'a9pej') {
this.$router.push('/User');
}
       else if (this.loginForm.username === 'admin' && this.loginForm.password === '123456' && this.loginForm.code === 'a9pej') {
this.$router.push('/Admin');
}*/

    /* if (user.password !== this.cookiePass) {
       user.password = encrypt(user.password)
     }*/
    /*if(valid) {
      this.loading = true
      if (user.rememberMe) {
        Cookies.set('username', user.username, {
          expires: Config.passCookieExpires
        })
        Cookies.set('password', user.password, {
          expires: Config.passCookieExpires
        })
        Cookies.set('rememberMe', user.rememberMe, {
          expires: Config.passCookieExpires
        })
      } else {
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }

    }*/
  },
  /*point() {
    const point = Cookies.get('point') !== undefined
    if (point) {
      this.$notify({
        title: '提示',
        message: '当前登录状态已过期，请重新登录！',
        type: 'warning',
        duration: 5000
      })
      Cookies.remove('point')
    }
  }*/
}

</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;

  //float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.register {
  float: right;
  color: rgb(24, 144, 255);
}

a {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}
</style>