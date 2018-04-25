<template>
  <div id="Xhwlheader" style="height:120px;border-bottom: solid 1px #dddddd;">
    <div style="display: inline-block;width: 26%;height: 160px;text-align: center;vertical-align: middle">
      <div style="display: block;margin: 4% auto">
        <img
          src="../../static/img/logoMain.png" style="height:auto;width: 70%;">
      </div>
    </div>
    <div style="display: inline-block;width: 48%;text-align: center;height: 60px">
      <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect"
               :router='true'
               text-color="#444444"
               background-color="#ffffff"
               active-text-color='#1476C1'
               active-background-color="#ffffff"
               :style="'width:'+(isSuperAdmin?560:450)+'px;margin:0 auto;height:60px;display: inline-block'">
        <el-menu-item index="1" style="border: none" route="/Now">招聘中</el-menu-item>
        <el-menu-item index="2" style="border: none" route="/History">历史招聘</el-menu-item>
        <el-menu-item index="3" style="border: none" route="/Release" >发布招聘</el-menu-item>
        <el-menu-item index="4" style="border: none" route="/Message">消息中心</el-menu-item>
        <el-menu-item v-if="isSuperAdmin" index="5" style="border: none" route="/Authority">权限审核</el-menu-item>
      </el-menu>
    </div>
    <div style="width:25%;display: inline-block;height: 120px;text-align: center;vertical-align: middle" v-if="Need2Login">
      <div style="margin: 4% auto">
        <el-button plain @click="dialogFormVisible = true" class="button4plain"
                   style="">注册</el-button>
        <el-button plain @click="dialogFormVisible1 = true" class="button4plain"
                   style="">登录</el-button>
      </div>
    </div>

    <div style="width:25%;display:inline-block;height: 100px;text-align: center;vertical-align: top" v-else>
      <div style="margin-top:20px">
        <el-dropdown >
          <el-button  type="text" ><img
            src="../../static/img/Default.png"><i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item v-for="item in mine">
              <router-link style="color: #333333" :to="item.path">
                {{item.text}}
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" @click="logout">注销</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XhwlHeader',
  data () {
    return {
      activeIndex: '1',
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: '14%',
      labelPosition: 'left',
      labelPosition1: 'left',
      Need2Login: false,
      isHighAdmin: true,
      isSuperAdmin: true,
      mine: [{path: '', text: '注销'}],


    }
  },
  methods: {
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
      this.$router.push('/')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
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
