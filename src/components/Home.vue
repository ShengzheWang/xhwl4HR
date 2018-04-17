<template>
  <div id="Home">
    <div class="block">
      <div style="width:30%;margin: 10% auto 0% auto">
        <el-collapse-transition>
        <div style="height: 300px;text-align: center">
          <el-dialog title="登录"  :visible="value4login==100" style="margin:auto auto;width: 50%" :lock-scroll="false"
                     @close="handleClose">
            <el-form :label-position="right" label-width="60px" >
              <el-form-item label="用户名">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button type="text" @click="this.$router.push('/SuperAdmin')">超级管理员入口...</el-button>
              <el-button type="primary" @click="value4login=0">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        </el-collapse-transition>
        <div class="block">
          <span class="demonstration">滑动到指定范围解锁登录表单！</span>
          <el-slider v-model="value4login"></el-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      dialogFormVisible1: false,
      value4login: 0
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose () {
      this.$data.value4login = 0
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
      background:url("../assets/arrow.png") no-repeat center #ffffff;
      width: 40px;
      height: 25px;
      border-radius: 20px;
      border-color: #999999;
    }

  }
</style>
