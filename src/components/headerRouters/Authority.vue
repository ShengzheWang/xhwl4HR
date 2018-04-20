<template>
  <div id="Authority">
    <div class="block">
      <div style="width:60%;margin: 2% auto 0 auto">
       <el-tabs style="">
         <el-tab-pane label="添加管理员">
       <el-form style="width: 50%;margin:3% auto" label-width="50px" :label-position="labelPosition">
         <h2>
           添加管理员
         </h2>
         <el-form-item label="工号">
           <el-input></el-input>
         </el-form-item>
         <el-form-item label="密码">
           <el-input></el-input>
         </el-form-item>
         <el-form-item label="">
           <el-button>确定添加</el-button>
         </el-form-item>
       </el-form>
         </el-tab-pane>
         <el-tab-pane label="管理员列表">
           <el-form style="width: 50%;margin:3% auto auto 0" label-width="50px" :label-position="labelPosition">
             <h2>
               管理员列表
             </h2>
             <el-form-item label="工号">
               <el-input class="input-with-select"><el-button slot="append">搜索</el-button></el-input>
             </el-form-item>
           </el-form>
           <el-table
             :data="tableData"
             stripe
             style="width: 100%">
             <el-table-column
               prop="department"
               label="部门"
               width="240">
             </el-table-column>
             <el-table-column
               prop="wordId"
               label="工号"
               width="240">
             </el-table-column>
             <el-table-column
               label="密码"
               width="240">
               <template slot-scope="scope">
                 <el-popover trigger="hover" placement="top">
                   <p>{{ scope.row.password }}</p>
                   <div slot="reference" class="name-wrapper">
                     <el-tag size="large" type="info">鼠标移至此查看密码</el-tag>
                   </div>
                 </el-popover>
               </template>
             </el-table-column>
             <el-table-column
               label="操作"
               fixed="right"
               width="340"
             >
               <template slot-scope="scope">
                 <el-button plain @click="handleClick(scope.row)" type="warning" size="middle">收回权限
                 </el-button>
                 <el-button plain @click="handleClick(scope.row)" type="primary" size="middle">修改密码
                 </el-button>
               </template>
             </el-table-column>
           </el-table>
         </el-tab-pane>
    </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item.vue'
import ElTabPane from '../../../node_modules/element-ui/packages/tabs/src/tab-pane.vue'

export default{
  components: {
    ElTabPane,
    ElFormItem},
  data () {
    return {
      labelPosition: 'right',
      tableData: [
        {department: '人事', wordId: '123', password: '1111'}
      ]
    }
  },
  method:{
  }
}
</script>
<style>
</style>
