<template>
  <div id="XhwlMenu" style="display: block;height: 100%;position:absolute;top:0;left:0;width: 100%">
    <el-menu  :default-active="activeIndex" class="el-menu-demo" @select="handleSelect"
              :router='true'
              text-color="#ffffff"
              background-color="#000000"
              active-text-color='#ffffff'
              active-background-color="#38BDFE"
              style="font-size: 18px;display: inline-block;margin: 0 auto;height: 100%;width: 80%;z-index: 0">
      <el-menu-item index="1" style="border: none;margin-top:30px" route="/Now" class="item4menu">

        <i class="icon iconfont icon-zhengzaizhaopin-"></i>

        <span slot="title" style="display: block">正在招聘</span>
      </el-menu-item>
      <el-menu-item index="2" style="border: none" route="/History" class="item4menu">
        <i class="icon iconfont icon-lishijilu"></i>

        <span slot="title" style="display: block">历史招聘</span>
      </el-menu-item>
      <el-menu-item v-if="isSuperAdmin >= 1" index="3" style="border: none" route="/Release" class="item4menu">
        <i class="icon iconfont icon-fabu-"></i>

        <span slot="title" style="display: block">发布招聘</span>
      </el-menu-item>
      <el-menu-item v-if="isSuperAdmin===2" index="5" style="border: none" route="/Authority" class="item4menu">
        <i class="icon iconfont icon-quanxianguanli-"></i>

        <span slot="title" style="display: block">权限审核</span></el-menu-item>
      <el-menu-item index="4" style="border: none" disabled  route="/Message" class="item4menu">
        <i class="icon iconfont icon-xiaoxizhongxin-"></i>

        <span slot="title" style="display: block" >消息中心</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>
<script>
export default{
  name: 'XhwlMenu',
  watch: {
    $route(to, from) {
      switch(to.path){
        case '/Now':
          this.$data.activeIndex = '1'
          break
        case '/Authority':
          this.$data.activeIndex = '5'
          break
        case '/Release':
          this.$data.activeIndex = '3'
          break
        case '/History':
          this.$data.activeIndex = '2'
          break
        default:

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
        url: '/adminTokenCheck',
      }).then(function (response) {
        if(response.data.msg==='superAdmin'){
          _this.$data.isSuperAdmin=2
        }
        if(response.data.msg==='seniorAdmin'){
          _this.$data.isSuperAdmin=1
        }
        _this.$message('欢迎回来')
        _this.$data.Need2Login = false
        console.log(_this.$route.path)
        if(_this.$route.path === '/')
          _this.$router.push('/Now')
      }).catch(function(error) {
        _this.$message('用户凭证已过期，请重新登陆')
        delete _this.$axios.defaults.headers['Authorization']
        document.cookie = ''
        _this.$data.Need2Login = true
        _this.$router.push('/')
      })
    }
  },
  data () {
    return {
      activeIndex: '1',
      isSuperAdmin:0
    }
  },
  methods:{
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
  }
}
</script>
<style lang="less">
  #XhwlMenu {
    .iconfont{
      font-size: 50px !important;
    }
    .el-menu-item, .el-submenu__title{
     line-height: 1.4;
    }
    .item4menu {
      background: #000000 !important;
      height: 100px !important;
      text-align: center;
      width: 100%;
      transition: all 0.1s;
      box-sizing: border-box;
      z-index: 0;
    }

    .item4menu:hover {
      background:#38BDFE !important;
      color: #ffffff !important;

    }
    .item4menu.is-active {
      background:#38BDFE !important;
      color: #ffffff !important;
      font-weight: 600;
      width: 140%;
      box-sizing: border-box;
      border-radius: 200px 0 0 200px;
      margin-left: -30%;
    }
  }
</style>
