<template>
  <div id="Release">
    <div class="block">
      <div style="width:60%;margin: 2% auto 0 auto">
        <el-tabs>
          <el-tab-pane label="基本信息">
            <el-form ref="form" :model="form" label-width="120px" style="width: 80%;;display: inline-block;margin-left: 7%;margin-top:5%">
              <el-form-item label="职位名称：" style="width: 50%">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="所属部门：" style="">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option  v-for="item in departments" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="简历审核部门：" style="">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option  v-for="item in departments" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="考核部门：" style="">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option  v-for="item in departments" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="招聘类型：" style="">
                <el-select v-model="form.region" placeholder="请选择招聘类型">
                  <el-option label="社会招聘" value="shanghai"></el-option>
                  <el-option label="校园招聘" value="beijing"></el-option>
                  <el-option label="实习生招聘" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作地点：" style="width: 220px">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="学历要求：" style="">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="本科" value="shanghai"></el-option>
                  <el-option label="硕士" value="beijing"></el-option>
                  <el-option label="博士" value="beijing"></el-option>
                  <el-option label="不做要求" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="招聘人数：" style="">
                <el-input-number @change="handleChange" :min="1" :max="10"></el-input-number>
              </el-form-item>
              <el-form-item label="截至日期：" style="">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
              </el-form-item>

            </el-form>
          </el-tab-pane>
          <el-tab-pane label="工作职责">
            <el-form ref="form" :model="form" label-width="120px" style="width: 80%;;display: inline-block;margin-left: 7%;margin-top:5%">
            <el-form-item label="工作职责：">
              <el-input type="textarea" v-model="form.desc" :rows="15"></el-input>
            </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="职位要求">
            <el-form ref="form" :model="form" label-width="120px" style="width: 80%;;display: inline-block;margin-left: 7%;margin-top:5%">
              <el-form-item label="职位要求：">
                <el-input type="textarea" v-model="form.desc" :rows="15"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-upload" type="primary"  style="width:20%;margin-left:80%">发布招聘</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

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
  name: 'Release',
  data () {
    return {
      form: '',
      departments: [{name: '研发'},{name: '设计'},{name: '人事'}]
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  #Release {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: -20px;
    font-size: 18px;
  }
</style>
