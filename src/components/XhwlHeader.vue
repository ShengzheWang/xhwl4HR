<template>
  <div id="Xhwlheader"
       style="width:100%;min-width:1100px;opacity:0.90;height:80px;border-bottom: solid 1px #dddddd;
       background: #ffffff;z-index:1" >
    <div class=""></div>
    <div style="display: inline-block;width: 26%;height: 8px;text-align: center;" class="animated fadeInDown">
      <div style="display: inline-block;margin-top: 3%">
        <img
          src="../../static/img/logoMain.png" style="height:50px;width: auto;">
      </div>
    </div>
    <div style="display: inline-block;width: 48%;text-align: center;height: 60px" class="animated fadeInDown">
      <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect"
               :router='true'
               text-color="#444444"
               background-color="#ffffff"
               active-text-color='#1476C1'
               active-background-color="#ffffff"
               :style="'width:'+(isSuperAdmin?560:450)+'px;font-size: 18px;margin:0 auto;height:58px;display: inline-block'">
        <el-menu-item index="1" style="border: none" route="/Now" class="item4menu">招聘中</el-menu-item>
        <el-menu-item index="2" style="border: none" route="/History" class="item4menu">历史招聘</el-menu-item>
        <el-menu-item index="3" style="border: none" route="/Release" class="item4menu">发布招聘</el-menu-item>
        <el-menu-item index="4" style="border: none" route="/Message" class="item4menu">消息中心</el-menu-item>
        <el-menu-item v-if="isSuperAdmin" index="5" style="border: none" route="/Authority" class="item4menu">权限审核</el-menu-item>
      </el-menu>
    </div>
    <div style="width:25%;display: inline-block;height: 120px;text-align: center;vertical-align: middle" v-if="Need2Login">
      <div style="margin: 21px auto">
        <el-button plain @click="dialogFormVisible1 = true" class="button4plain"
                   style="">登录</el-button>
      </div>
    </div>
    <div style="width:25%;display:inline-block;height: 90px;text-align: center;vertical-align: top" v-else>
      <div style="margin-top:10px">
        <el-dropdown >
          <el-button  type="text" ><img
            src="../../static/img/Default.png" style="width: 24px;"><i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>
              <el-button type="text" @click="logout">注销</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog  class="form4login" :visible.sync="Need2Login" style="margin:auto auto;width: 1000px" :lock-scroll="false" :append-to-body="true"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false">
      <el-form :label-position="labelPosition1"  :model="user" ref="user" :rules="rules" style="width: 80%;margin: 3% auto" :status-icon="true">
        <el-form-item  prop="username" class="item4login">
          <el-input v-model="user.username" placeholder="请输入工号" prefix-icon="iconfont icon-shoujihao icon4form" ></el-input>
        </el-form-item>
        <el-form-item  prop="password" class="item4login">
          <el-input v-model="user.password" type="password"  placeholder="请输入密码" prefix-icon="iconfont icon-mima icon4form"></el-input>
        </el-form-item>
      </el-form>
      <div class="foot4login" style="margin: 3% auto;width: 80%">
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-register'" @click="dialogFormVisible1=false">取消</el-button>
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-login'" @click="login('user');">登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'XhwlHeader',
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
      activeIndex: '1',
      dialogFormVisible1: false,
      formLabelWidth: '14%',
      labelPosition: 'left',
      labelPosition1: 'left',
      Need2Login: true,
      isHighAdmin: true,
      isSuperAdmin: false,
      user:{
        username:'',
        password:''
      },
      State: true,
      rules:{
        username:[
          {validator:checkLogUser,trigger:'change'}
        ],
        password:[
          {validator:checkLogPass,trigger:'change'}
        ]
      },
      mine: [{path: '', text: '注销'}],

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
        url: '/adminTokenCheck',
      }).then(function (response) {
        if(response.data.msg==='superAdmin'){
          _this.$data.isSuperAdmin=true
        }
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
                if(response.data.msg==='superAdmin'){
                  _this.$data.isSuperAdmin=true
                }
                const token=response.data.data;
                _this.$axios.defaults.headers.Authorization = token
                _this.$data.Need2Login = false
                _this.$data.dialogFormVisible1=false;
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
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      //this.$data.Need2Login = true
      delete this.$axios.defaults.headers['Authorization']
      document.cookie = ''
      this.$message({
        message: '注销成功，已返回首页，请重新登录',
        type: 'success'
      })
      this.$data.Need2Login = true
      this.$router.push('/')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .form4login{
    .is-error{
      .icon4form{
        color:#f56c6c;
      }
    }
    .is-success{
      .icon4form{
        color:#67c23a;
      }
    }
    .el-input__inner{
      height:54px;
      padding-left:48px !important;
    }
    .el-input__prefix{
      height:54px;
      width: 48px;
    }
    .button4login{
      transition: all 0.2s;
      letter-spacing: 2px!important;
      border-radius: 46px!important;
      font-size: 20px!important;
    }
    .button4login{
      transition: all 0.2s;
      letter-spacing: 2px!important;
      border-radius: 46px!important;
      font-size: 20px!important;
    }
    .item4login{
      height:54px;
      transition: all 0.6s;
      &:hover {
        transform: scale(1.05);
      }
      &:focus {
        transform: scale(1.05);
      }
    }
    .nowLogin-login{
      margin-left: 3% !important;
      width: 65% !important;
      font-weight: 500;
      background: #E01B2F!important ;
      color:#ffffff  !important;
      border:solid 2px #E01B2F !important;
      &:hover {
        transform: scale(1.05);
        background: #E01B2F;
        color:#ffffff  ;
        border:solid 2px #E01B2F;
      }
    }
    .nowRegister-login{
      margin-left: 3% !important;
      width: 30% !important;
      background: #ffffff !important;
      color:#E01B2F !important ;
      border:solid 2px #E01B2F!important;
      font-weight: 500;
      &:hover {
        transform: scale(1.05);
        background: #E01B2F!important;;
        color:#ffffff!important;  ;
        border:solid 2px #E01B2F!important;;
      }
    }
    .nowLogin-register{
      margin-left: 0 !important;
      width: 30% !important;
      background: #ffffff !important;
      color:#a4a4a4 !important ;
      border:solid 2px #a4a4a4 !important;
      font-weight: 500;
      &:hover {
        transform: scale(1.05);
        background: #a4a4a4!important;;
        color:#ffffff !important; ;
        border:solid 2px #ffffff!important;;
      }
    }
    .nowRegister-register{
      margin-left: 0 !important;
      width: 65% !important;
      color:#ffffff  !important;
      border:solid 2px #a4a4a4 !important;
      background: #a4a4a4 !important;
      font-weight: 500;
      &:hover {
        transform: scale(1.05);
        color:#ffffff;
        border:solid 2px #a4a4a4;
        background: #a4a4a4;
      }
    }
  }
  .icon4form{
    color:#1476C1;
    font-size: 30px !important;
  }
  #XhwlHeader {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;

    .el-button{
      background: #f6f6f6;
    }
    .el-button--primary{
      background:#1476C1;
      border: none;
    }

    .el-button--text{
      color:#222222;
    }
  }

</style>
