<template>
    <div id="Details">
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
                <el-form-item>
                  <el-button icon="el-icon-upload" type="primary"  style="width:20%;margin-left:80%">修改此招聘信息</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="工作职责">
              <el-form ref="form" :model="form" label-width="120px" style="width: 80%;;display: inline-block;margin-left: 7%;margin-top:5%">
                <el-form-item label="工作职责：">
                  <el-input type="textarea" v-model="form.desc" :rows="15"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button icon="el-icon-upload" type="primary"  style="width:20%;margin-left:80%">修改此招聘信息</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="职位要求">
              <el-form ref="form" :model="form" label-width="120px" style="width: 80%;;display: inline-block;margin-left: 7%;margin-top:5%">
                <el-form-item label="职位要求：">
                  <el-input type="textarea" v-model="form.desc" :rows="15"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button icon="el-icon-upload" type="primary"  style="width:20%;margin-left:80%">修改此招聘信息</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="应召人员">
              <h2>待审核</h2>
              <div style="width:100%;margin: 1% auto 0% auto">
                <el-table
                  :data="tableData1"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="sex"
                    label="性别"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="age"
                    label="年龄"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="degree"
                    label="最高学历"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="投递时间"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    fixed="right"
                    width="400"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="primary" size="middle">查看详情
                      </el-button>
                      <el-button  @click="handleClick(scope.row)" type="info" size="middle">下载简历
                      </el-button>
                      <el-button  @click="handleClick(scope.row)" type="danger" size="middle">投递进度
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <h2>已通过</h2>
              <div style="width:100%;margin: 1% auto 0% auto">
                <el-table
                  :data="tableData2"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="sex"
                    label="性别"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="age"
                    label="年龄"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="degree"
                    label="最高学历"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="投递时间"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    fixed="right"
                    width="400"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row,scope.$index)" type="primary" size="middle">查看详情
                      </el-button>
                      <el-button  @click="handleClick(scope.row)" type="info" size="middle">下载简历
                      </el-button>
                      <el-button  @click="handleClick(scope.row)" type="danger" size="middle" disabled>投递进度
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <h2>已回绝</h2>
              <div style="width:100%;margin: 1% auto 0% auto">
                <el-table
                  :data="tableData3"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="sex"
                    label="性别"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="age"
                    label="年龄"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="degree"
                    label="最高学历"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="投递时间"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    fixed="right"
                    width="400"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="primary" size="middle">查看详情
                      </el-button>
                      <el-button  @click="handleClick(scope.row)" type="info" size="middle">下载简历
                      </el-button>
                      <el-button  @click="handleClick(scope.row)" type="danger" size="middle" disabled>投递进度
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
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
  name: 'Details',
  data () {
    return {
      form: '',
      tableData1: [
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'}
      ],
      tableData2: [
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'}
      ],
      tableData3: [
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'}
      ]
    }
  },
  methods: {
    resumeDetails (num) {
      this.$router.push('/ResumeDetails')
    }
  }
}
</script>
<style>
</style>
