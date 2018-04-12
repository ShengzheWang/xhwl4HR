<template>
  <div id="Xhwlheader" style="height:50px">

      <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect"
               :router='true'
               text-color="#444444"
               background-color="#f6f6f6"
               active-text-color='#1476C1'
               active-background-color="#f6f6f6"
               style="width:450px;margin:0 auto;top:-40px;height:90px">
        <el-menu-item index="1" style="border: none" route="/Now">招聘中</el-menu-item>
        <el-menu-item index="2" style="border: none" route="/History">历史招聘</el-menu-item>
        <el-menu-item index="3" style="border: none" route="/Release" >发布招聘</el-menu-item>
        <el-menu-item index="4" style="border: none" route="/Message">消息中心</el-menu-item>
      </el-menu>
    <div style="position:absolute;top: 2.5%;left: 1500px" v-if="Need2Login">
      <div>
        <el-button plain round @click="dialogFormVisible = true" class="button4plain"
                   style="border: 2px solid #909399;border-radius:28px;color:#909399;font-size: 16px">注册</el-button>
        <el-button plain round @click="dialogFormVisible1 = true" class="button4plain"
                   style="border: 2px solid #909399;;border-radius:28px;color: #909399;font-size: 16px">登录</el-button>
      </div>
    </div>
      <div style="position:absolute;top: 2.5%;left: 1600px" v-else>
      <el-dropdown >
      <el-button  type="text" ><img
        src="../../static/Default.png"><i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item v-for="item in mine">
            <router-link style="color: #333333" :to="item.path">
              <el-badge :value="item.messageNum" class="item">
              {{item.text}}
              </el-badge>
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
      <a style="position: absolute;top: 2.5%;left: 188px;font-size: 32px;"><img
        src="../assets/logoMain.png"></a>

    <div class="line"></div>

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
      mine: [{path: '', text: '注销'}]

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
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
