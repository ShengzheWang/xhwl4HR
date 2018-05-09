<template>
  <div id="Home">
    <div class="blockDiv"></div>
    <div class="blockDiv"></div>
    <div class="blockDiv"></div>
    <div class="block">
      <div style="width:30%;margin: 10% auto 0% auto">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {

    var checkLogUser=(rule,value,callback)=>{
      if(!value){
        callback(new Error('请输入用户名'))
      }else{
        callback();
      }
    }

    var checkLogPass=(rule,value,callback)=>{
      if(!value){
        callback(new Error('请输入密码'))
      }else{
        callback();
      }
    }

    return {
      dialogFormVisible1: true,
      State: true,
      value4login: 0,
      user:{
        username:'',
        password:''
      },
      type:'',
      rules:{
        username:[
          {validator:checkLogUser,trigger:'change'}
        ],
        password:[
          {validator:checkLogPass,trigger:'change'}
        ]
      }
    }
  },
  beforeMount () {
    const token = document.cookie.split(';')[0]
    console.log(token)
    if (token) {
      this.$axios.defaults.headers.Authorization = token
      let _this = this
      this.$axios({
        method: 'get',
        url: '/tokenCheck',
      }).then(function (response) {
        _this.$message('欢迎回来')
        _this.$data.Need2Login = false
      }).catch(function(error) {
        _this.$message('用户凭证已过期，请重新登陆')
        delete _this.$axios.defaults.headers['Authorization']
        document.cookie = ''
        _this.$data.Need2Login = true
        _this.$router.push('/')
      })
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose () {
      this.$data.dialogFormVisible1=false
    },

    login(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          let _this=this;
          this.$axios({
            method:'post',
            url:'/adminLogin',
            data:this.$qs.stringify(this.$data.user)
          }).then(function (response) {
            switch(response.data.code){
              case 200:

                const token=response.data.data;
                _this.$axios.defaults.headers.Authorization = token
                _this.$data.value4login=1;
                _this.$data.dialogFormVisible1=true;
                document.cookie=token;
                _this.$message({
                  message:'登录成功',
                  type:'success'
                });
                break
              case 500:
                _this.$message({
                  message:'登录密码错误！',
                  type:'warning'
                });
                _this.$data.user.password='';
                break;
              case 401:
                break;
            }

          }).catch(function (error) {
            console.log(error)
            _this.$message({
              message: '用户名或密码错误，请重试',
              type: 'warning'})

          })
        }
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  #Home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: -20px;
    font-size: 18px;
    .el-slider__runway{
      height: 18px;
      border-radius: 18px;
    }
    .el-slider__bar{
      height: 18px;
      border-radius: 18px;
    }
    .el-slider__button-wrapper{
      top:-6px;
    }
    .el-slider__button{
      background:url("../../../static/img/arrow.png") no-repeat center #ffffff;
      width: 40px;
      height: 25px;
      border-radius: 20px;
      border-color: #999999;
    }

  }
</style>
