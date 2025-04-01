<template>
  <div class="page-register">
    <article class="header">
      <header>
        <span class="login">
          <em class="bold">已有账号？</em>
          <router-link to="/">登录</router-link>
        </span>
      </header>
    </article>

    <section>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm"
        autocomplete="off">
        <div>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <!--  <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" />
            <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
            <span class="status">{{ statusMsg }}</span>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="ruleForm.code" maxlength="4" />
          </el-form-item>
        -->
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="cpwd">
            <el-input v-model="ruleForm.cpwd" type="password" />
          </el-form-item>

        </div>
      </el-form>
    </section>
    <div class="footer">

      <el-button type="primary" @click="register">注册</el-button>
      <div class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {

        name: [{
          required: true,
          type: 'string',
          message: '请输入用户名',
          trigger: 'blur'
        }],
        /* email: [{
           required: true,
           type: 'email',
           message: '请输入邮箱',
           trigger: 'blur'
         }],*/
        pwd: [{
          required: true,
          message: '创建密码',
          trigger: 'blur'
        }],
        cpwd: [{
          required: true,
          message: '确认密码',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  layout: 'blank',
  methods: {
    /*sendMsg: function () {
      const self = this
      let namePass
      let emailPass
      if (self.timerid) {
        return false
      }
      this.$refs['ruleForm'].validateField('name', (valid) => {
        namePass = valid
      })
      self.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs['ruleForm'].validateField('email', (valid) => {
        emailPass = valid
      })
      // 模拟验证码发送
       if (!namePass && !emailPass) {
         let count = 60
         self.statusMsg = `验证码已发送,剩余${count--}秒`
         self.timerid = setInterval(function () {
           self.statusMsg = `验证码已发送,剩余${count--}秒`
           if (count === 0) {
             clearInterval(self.timerid)
           }
         }, 1000)
       }*/

    register: function () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let registerData = new FormData();
          registerData.append('username', this.ruleForm.name);
          registerData.append('password', this.ruleForm.pwd);
          registerData.append('confirmPassword', this.ruleForm.cpwd);
          console.log(this.ruleForm.name)
          // 调用 register 接口
          this.$api.register(registerData)
            .then(() => {
              this.$router.push('/');
            })
            .catch(error => {
              console.error('There was a problem with the register operation:', error);
            });
        }
      });
    }

  },





  next: function () {
    if (this.active === 0) {
      this.$refs['ruleForm'].validateField('agreed', (valid) => {
        if (valid === '') {
          this.active++
        }
      })
    }
  },
  prev: function () {
    if (--this.active < 0) this.active = 0
  },

  // 模拟登录
  register: function () {
    this.$refs['ruleForm'].validate((valid) => {
      if (valid) {
        setTimeout(
          this.$router.push('/'), 2000
        )
      }
    })
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.page-register {
  .header {
    //border-bottom: 2px solid rgb(235, 232, 232);
    min-width: 980px;
    color: #666;

    header {
      margin: 0 auto;
      padding: 10px 0;
      width: 980px;

      .login {
        float: right;
      }

      .bold {
        font-style: normal;
      }
    }
  }

  .register {
    color: #1890ff;
  }

  a {
    color: #1890ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
  }

  >section {
    margin: 0 auto 30px;
    padding-top: 30px;
    width: 980px;
    min-height: 300px;
    padding-right: 550px;
    box-sizing: border-box;

    .status {
      font-size: 12px;
      margin-left: 20px;
      color: #e6a23c;
    }

    .error {
      color: red;
    }
  }

  .footer {
    text-align: center;
  }
}
</style>