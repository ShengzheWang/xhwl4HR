<template>
    <div id="ResumeDetails">
      <div class="block">
        <div style="width:40%;margin: 2% auto 0 auto">
          <el-form label-position="left" inline  class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ formBasic.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ formBasic.sex }}</span>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>
</template>
<script>
import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item.vue'
import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'
import ElForm from '../../node_modules/element-ui/packages/form/src/form.vue'
import ElIcon from '../../node_modules/element-ui/packages/icon/src/icon.vue'
export default {
  components: {
    ElIcon,
    ElForm,
    ElButton,
    ElFormItem},
  name: 'ResumeDetails',
  data () {
    return {
      formBasic:{
        name: '李新阳',
        sex: '男'
      },
    }
  },
  method: {
    resumeDetails (num) {
      this.$router.push('/ResumeDetails')
    }
  }
}
</script>
<style lang="less">
#ResumeDetails {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
