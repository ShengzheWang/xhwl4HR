<template>
  <div id="Now">
    <div class="block">
      <div style="width:60%;margin: 5% auto 0% auto">
        <el-form ref="form" :model="form" label-width="100px" style="width: 50%;margin-left: 5%;display: inline-block">
          <el-form-item label="发布日期：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col style="text-align: center" :span="2">—</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="职位名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form" label-width="100px" style="width: 40%;margin-left: 0%;display: inline-block">
          <el-form-item label="招聘类型：">
            <el-select v-model="form.region" placeholder="请选择招聘类型">
              <el-option label="社会招聘" value="shanghai"></el-option>
              <el-option label="校园招聘" value="beijing"></el-option>
              <el-option label="实习生招聘" value="beijing"></el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 10%">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="width:60%;margin: 2% auto 0% auto">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="职位名称"
            width="140">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            width="140">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="140">
          </el-table-column>
          <el-table-column
            prop="place"
            label="地点"
            width="140">
          </el-table-column>
          <el-table-column
            prop="dateBegin"
            label="发布时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="dateEnd"
            label="截止时间"
            width="140">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="240"
          >
            <template slot-scope="scope">
              <el-button plain @click="handleClick(scope.row)" type="primary" size="middle">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
  name: 'Now',
  data () {
    return {
      form: '',
      tableData: [
        {name: 'WEB前端设计师', department: '技术部', place: '深圳', type: '校园招聘', dateBegin: '2018-1-1', dateEnd: '2018-2-2'}
      ]
    }
  },
  methods: {
    handleClick (row) {
      this.$router.push('/Details')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  #Now {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: -20px;
    font-size: 18px;
  }
</style>
