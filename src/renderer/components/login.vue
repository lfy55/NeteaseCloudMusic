<template>
  <div class="app">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="ruleForm2.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from '../config'
import { interceptors } from '../lib/myUtils'

import { mapMutations } from 'vuex'

export default {
  name: 'login-page',
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确的手机号格式'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      ruleForm2: {
        phone: '',
        pass: '',
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['changeUser']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.get(config.baseUrl + `login/cellphone?phone=${this.ruleForm2.phone}&password=${this.ruleForm2.pass}`)
            .then(interceptors)
            .then(data => {
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              console.log('个人信息', data.data.profile)

              this.changeUser({ user: data.data.profile })
              this.$router.push({ name: 'user-profile' })
            })
            .catch(data => {
              this.$message({
                message: '登陆失败:' + data.msg,
                type: 'error'
              })
              console.log('登陆失败', data)
            })
        } else {
          this.$message({
            message: '请输入正确的信息',
            type: 'warning'
          })

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
