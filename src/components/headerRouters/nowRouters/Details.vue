<template>
    <div id="Details">
      <div class="blockDiv"></div>
      <div class="block">
        <div style="width:60%;margin: 2% auto 0 auto">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/Now' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>职位详情</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="position-details">
            <div style="text-align: left;display: inline-block;width: 50%">
            <h1 class="name">{{form.positionName}}</h1><h2 class="classes">{{form.recruitmentType}}</h2>
            </div>
            <div style="text-align: right;display: inline-block;width: 49%">
            <h4 class="info-already-got">已收到简历数</h4>
            <div class="already-got">{{form.num}}</div>
            </div>
            <div style="width: 100%">
              <el-row>
                <el-col :span="6">
                  <h3 class="label">工作地点：</h3>
                  <h3 class="info">{{form.workPlace}}</h3>
                </el-col>
                <el-col :span="6">
                  <h3 class="label">学历要求：</h3>
                  <h3 class="info">{{form.education}}</h3>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <h3 class="label">所属部门：</h3>
                  <h3 class="info">{{form.department}}</h3>
                </el-col>
                <el-col :span="6">
                  <h3 class="label">工作类型：</h3>
                  <h3 class="info">{{form.positionType}}</h3>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <h3 class="label">招聘人数：</h3>
                  <h3 class="info">{{form.recruitingNumbers}}</h3>
                </el-col>
              </el-row>
            </div>
            <h1 style="color: #707070;margin-top: 3%">岗位职责
            </h1>
              <h3 v-html="form.jobResponsibilities">   </h3>
            <h1 style="color: #707070;margin-top: 1%">职位要求
            </h1>
            <h3 v-html="form.jobRequirements"></h3>
          </div>
          <el-tabs type="card"  v-model="activeTab" @tab-click="handleClick">
            <div class="line" v-bind:style="'border-color:'+borderColor"></div>
            <el-tab-pane label="待审核" name="0">
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="tableData1" stripe style="width: 100%" class="table0">
                  <el-table-column prop="name" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="degree" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="date" label="投递时间" width="140">
                  </el-table-column>
                  <el-table-column label="查看详情" width="144">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    width="144"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="handleClick(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="投递状态"
                    width="144"
                  >
                  <template slot-scope="scope">
                      <el-button  @click="handleClick(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="el-pagination__total page-total">
                共<a style="width: 40px;display: inline-block;text-align: center">{{400}}</a>条
              </div>
              <div class="page-select">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[5, 10, 20, 30]"
                  :page-size="5"
                  layout="sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已通过" name="1">
              <div style="width:100%;margin: 0% auto 0% auto">
                <el-table :data="tableData2" stripe style="width: 100%" class="table1">
                  <el-table-column prop="name" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="degree" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="date" label="投递时间" width="140">
                  </el-table-column>
                  <el-table-column label="查看详情" width="144">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    width="144"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="handleClick(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="投递状态"
                    width="144"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="handleClick(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="el-pagination__total page-total">
                  共<a style="width: 40px;display: inline-block;text-align: center">{{400}}</a>条
                </div>
                <div class="page-select">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="5"
                    layout="sizes, prev, pager, next, jumper"
                    :total="400">
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
              <el-tab-pane label="已回绝" name="2">
              <div style="width:100%;margin: 0% auto 0% auto">
                <el-table
                  :data="tableData3"
                  stripe
                  style="width: 100%" class="table2">
                  <el-table-column prop="name" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="degree" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="date" label="投递时间" width="140">
                  </el-table-column>
                  <el-table-column label="查看详情" width="144">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    width="144"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="handleClick(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="投递状态"
                    width="144"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="handleClick(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <div class="el-pagination__total page-total">
                  共<a style="width: 40px;display: inline-block;text-align: center">{{400}}</a>条
                </div>
                <div class="page-select">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="5"
                    layout="sizes, prev, pager, next, jumper"
                    :total="400">
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>
</template>
<script>
import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item.vue'
import ElButton from '../../../../node_modules/element-ui/packages/button/src/button.vue'
import ElForm from '../../../../node_modules/element-ui/packages/form/src/form.vue'
import ElIcon from '../../../../node_modules/element-ui/packages/icon/src/icon.vue'
import ElRow from 'element-ui/packages/row/src/row'
import ElCol from 'element-ui/packages/col/src/col'
export default {
  components: {
    ElCol,
    ElRow,
    ElIcon,
    ElForm,
    ElButton,
    ElFormItem},
  name: 'Details',
  data () {
    return {
      form: {
        id:'',
        positionName: '',
        recruitmentType: '',
        num: 5,
        workPlace: '',
        education: '',
        assessmentDepartment: '',
        department: '',
        jobResponsibilities: '',
        jobRequirements: '',
        deadline:'',
        positionType:'',
        resumeAuditDepartment:'',
        recruitingNumbers:''

      },
      borderColor: '#1476C1',
      activeTab: 0,
      tableData1: [
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'}
      ],
      tableData2: [
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'}
      ],
      tableData3: [
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'}
      ]
    }
  },
  created(){
    console.log(this.$route.query.id);
    let that=this
    this.$axios({
      method:'get',
      url:'/admin/position/'+this.$route.query.id,
    }).then(function (response) {
        that.$data.form=response.data;
    })
  },
  updated(){

      if(this.$data.form.recruitmentType==='1'){
        this.$data.form.recruitmentType='校园招聘'
      }else if(this.$data.form.recruitmentType==='2'){
        this.$data.form.recruitmentType='社会招聘'
      }else if(this.$data.form.recruitmentType==='3'){
        this.$data.form.recruitmentType='实习生招聘'
      }

    this.$data.form.jobResponsibilities=this.$data.form.jobResponsibilities.replace("\n","<br>")
    this.$data.form.jobRequirements=this.$data.form.jobRequirements.replace("\n","<br>")
  },
  methods: {
    resumeDetails (num) {
      this.$router.push('/ResumeDetails')
    },
    handleClick () {
      switch (this.$data.activeTab) {
        case '0':this.$data.borderColor = '#1476C1'
          break
        case '1':this.$data.borderColor = '#E01B2F'
          break
        case '2':this.$data.borderColor = '#707070'
          break
      }
    }
  }
}
</script>
<style lang="less">
  #Details{
    .line{
      border: solid 1px #1476C1;
      margin-top: 0;
    }
    .page-total{
      width: 30%;
      display: inline-block;
      margin-top: 3%;
      margin-right: 0;
      vertical-align: top;
      font-size: 13px;
      a{
        font-weight: bolder;
        font-size: 16px;
      }
    }
    .page-select{
      display: inline-block;
      margin: 3% auto;
      text-align: right;
      width: 69%;
    }
    .iconfont{
      font-size: 26px;
    }
    .line{
      border: solid 1px #1476C1;
      margin-top: 0;
    }
    .el-button{
      padding:8px 30px
    }
    .el-row{
      margin-bottom: 0;
    }
    .el-col{
      margin-bottom: 0;
      height:30px
    }
    .el-table th{
      text-align: center;
    }
    .el-table__row{
      text-align: center;
    }
    .table0{
      .el-table__header-wrapper th{
        background: #ECF1F7 !important;
      }
      .el-table__row--striped td{
        background: #F6F7FB;
      }
      .iconfont{
        color:#1476C1
      }
    }
    .table1{
      .el-table__header-wrapper th{
        background: #FFEFF0 !important;
      }
      .el-table__row--striped td{
        background: #FFF9F9;
      }
      .iconfont{
        color:#E01B2F
      }
    }
    .table2{
      .el-table__header-wrapper th{
        background: #EAEAEA !important;
      }
      .el-table__row--striped td{
        background: #F4F4F4;
      }
      .iconfont{
        color:#707070
      }
    }
    .el-tabs__nav {
      width: 100%;
      border: none;
    }
    .el-tabs__header{
      margin-bottom: 0;
    }
    .el-tabs__item{
      height:50px;
      border-radius:20px 20px 0 0 ;
      border: 2px solid;
      width: 15%;
      text-align: center;
      vertical-align: middle;
      font-weight: bold;
      font-size: 18px;
      line-height:45px;
      background: #ffffff;
      border-bottom: none;
    }
    #tab-0{
      z-index: 997;
      border:solid 1px #1476C1;
      color:#1476C1;
      border-bottom: none;
    }
    #tab-0.is-active{
      z-index: 999;
      background: #1476C1;
      color:#ffffff
    }
    #tab-1{
      position: absolute;
      left:14%;
      z-index: 998;
      border:solid 1px #E01B2F;
      color: #E01B2F;
      border-bottom: none;
    }
    #tab-1.is-active{
      z-index: 999;
      background: #E01B2F;
      color:#ffffff
    }
    #tab-2{
      position: absolute;
      left:28%;
      z-index: 996;
      border:solid 1px #707070;
      color: #707070;
      border-bottom: none;
    }
    #tab-2.is-active{
      z-index: 999;
      background: #707070;
      color:#ffffff
    }
    .position-details{
      border-top: #1476C1 solid 1px;
      border-bottom: #1476C1 solid 1px;
      width: 100%;
      margin:2% auto ;
      .info-already-got{
        display: inline-block;
        font-size: 15px;
        margin-right: 1%;
      }
      .name{
        font-size: 24px;
        display: inline-block;
        vertical-align: middle;
        height:32px;
      }
      .already-got{
        margin-top:25px;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        height:60px;
        width: 60px;
        background: #E01B2F ;
        font-size: 50px;
        line-height:60px;
        color: #ffffff;
        border-radius: 5px;
      }
      .classes{
        display: inline-block;
        margin-left: 1%;
        vertical-align: middle;
        text-align: center;
        height:32px;
        width: 100px;
        color: #ffffff;
        background: #1476C1 ;
        line-height: 32px;
        border-radius: 32px;
      }
      .label{
        display: inline-block;
        color: #707070;
        line-height: 17px;
        font-size: 15px;
      }
      .info{
        display: inline-block;
        line-height: 17px;
        font-size: 15px;
      }
    }

  }
</style>
