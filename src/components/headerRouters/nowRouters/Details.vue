<template>
    <div id="Details">
      <div class="block">
        <div style="width:60%;margin: 2% auto 0 auto">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/Now' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>职位详情</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="position-details">
            <div style="text-align: left;display: inline-block;width: 50%">
            <h1  style="font-size: 28px" class="name">{{form.positionName}}</h1><h2 class="classes">{{form.recruitmentType}}</h2>
            </div>
            <div style="text-align: right;display: inline-block;width: 49%">
            <h4 class="info-already-got">已收到简历数</h4>
            <div class="already-got">{{deliverNumber}}</div>
            </div>
            <div style="width: 100%">
              <el-row>
                <el-col :span="6">
                  <p class="label">工作地点：</p>
                  <p class="info">{{form.workPlace}}</p>
                </el-col>
                <el-col :span="6">
                  <p class="label">学历要求：</p>
                  <p class="info">{{form.education}}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <p class="label">所属部门：</p>
                  <p class="info">{{form.department}}</p>
                </el-col>
                <el-col :span="6">
                  <p class="label">工作类型：</p>
                  <p class="info">{{form.positionType}}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <p class="label">招聘人数：</p>
                  <p class="info">{{form.recruitingNumbers}}</p>
                </el-col>
              </el-row>
            </div>
            <h1 style="color: #000000;margin-top: 3%;font-size: 20px">岗位职责
            </h1>
              <p  style="font-size: 18px;line-height: 32px" v-html="form.jobResponsibilities"></p>
            <h1 style="color: #000000;margin-top: 1%;font-size: 20px">职位要求
            </h1>
            <p  style="font-size: 18px;line-height: 32px" v-html="form.jobRequirements"></p>
          </div>
          <el-tabs type="card"  v-model="activeTab" @tab-click="handleClick">
            <div class="line" v-bind:style="'border-color:'+borderColor"></div>
            <el-tab-pane label="待审核" name="0">
              <h1>简历初审</h1>
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesFirst" stripe style="width: 100%" class="table0">
                  <el-table-column prop="username" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" width="140">
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
                      <el-button  @click="passResume(scope.$index,'ResumesFirst','ResumesHRFirst')" type="text" size="middle">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <h1>HR初审</h1>
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesHRFirst" stripe style="width: 100%" class="table0">
                  <el-table-column prop="username" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" width="140">
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
                      <el-button  @click="passResume(scope.$index,'ResumesHRFirst','ResumesDepartmentWritten')" type="text" size="middle">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <h1>部门笔试</h1>
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesDepartmentWritten" stripe style="width: 100%" class="table0">
                  <el-table-column prop="username" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="HighestEducation" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" width="140">
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
                      <el-button  @click="passResume(scope.$index,'ResumesDepartmentWritten','ResumesDepartmentInterview')" type="text" size="middle">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <h1>部门面试</h1>
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesDepartmentInterview" stripe style="width: 100%" class="table0">
                  <el-table-column prop="username" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" width="140">
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
                      <el-button  @click="rejectResume(scope.$index)" type="text" size="middle">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>


              <h1>HR面试</h1>
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesHRinterview" stripe style="width: 100%" class="table0" ref="ResumesHRFirst">
                  <el-table-column prop="username" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" width="140">
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
                      <el-button  @click="passResume(scope.$index,'ResumesHRinterview','ResumesPassed')" type="text" size="middle">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            </el-tab-pane>
            <el-tab-pane label="已通过" name="1">
              <div style="width:100%;margin: 0% auto 0% auto">
                <el-table :data="ResumesPassed" stripe style="width: 100%" class="table1">
                  <el-table-column prop="username" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" width="140">
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
                  :data="ResumesRefuse"
                  stripe
                  style="width: 100%" class="table2">
                  <el-table-column prop="username" label="姓名" width="140">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="140">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="140">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" width="140">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" width="140">
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
      deliverNumber:'',
      borderColor: '#1476C1',
      activeTab: 0,
      tableData1: [
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'},
        {name: '李新阳', sex: '男', age: '20', degree: '本科', date: '2018-1-1'}
      ],
      ResumesFirst:[
        {id:'',username:'',sex:'',highestEducation:'',deliverDate:'',auth:''}
      ],
      ResumesHRFirst:[
        {id:'',username:'',sex:'',highestEducation:'',deliverDate:'',auth:''}
      ],
      ResumesDepartmentWritten:[
        {id:'',username:'',sex:'',highestEducation:'',deliverDate:'',auth:''}
      ],
      ResumesDepartmentInterview:[
        {id:'',username:'',sex:'',highestEducation:'',deliverDate:'',auth:''}
      ],
      ResumesHRinterview:[
        {id:'',username:'',sex:'',highestEducation:'',deliverDate:'',auth:''}
      ],
      ResumesPassed: [
        {id:'',username:'',sex:'',highestEducation:'',deliverDate:'',auth:''}
        ],
      ResumesRefuse: [
        {id:'',username:'',sex:'',age:'',highestEducation:'',deliverDate:'',auth:''}
      ]
    }
  },
  created(){
    let _this=this
    this.$axios({
      method:'get',
      url:'/admin/position/'+_this.$route.query.id,
    }).then(function (response) {
        _this.$data.form=response.data;
    })

    this.$axios({         //获取已通过名单
      method:'get',
      url:'/admin/Pass/'+_this.$route.query.id
    }).then(function (response) {
      _this.$data.ResumesPassed=response.data;

    })

    this.$axios({         //获取已拒绝简历名单
      method:'get',
      url:'/admin/Refuse/'+_this.$route.query.id
    }).then(function (response) {
      _this.$data.ResumesRefuse=response.data;
    })


    this.$axios({
      method:'get',
      url:'/admin/ResumeReview/'+_this.$route.query.id
    }).then(function (response) {
      _this.$data.ResumesFirst=response.data
    })


    this.$axios({
      method:'get',
      url:'/admin/HRFristReview/'+_this.$route.query.id
    }).then(function (response) {
      _this.$data.ResumesHRFirst=response.data;
    })

    this.$axios({
      method:'get',
      url:"/admin/DepartmentWritten/"+_this.$route.query.id
    }).then(function (response) {
      _this.$data.ResumesDepartmentWritten=response.data;
    })


    this.$axios({
      method:'get',
      url:'/admin/DepartmentInterview/'+_this.$route.query.id
    }).then(function (response) {
      _this.$data.ResumesDepartmentInterview=response.data
    })

    this.$axios({
      method:'get',
      url:'/admin/HRInterview/'+_this.$route.query.id
    }).then(function (response) {
      _this.$data.ResumesHRinterview=response.data
    }).catch(function (error) {
      _this.$message({
        type:'error',
        message:error.response.data.msg
      })
    })

    this.$axios({
      method:'get',
      url:'/admin/getDeliverNum/'+_this.$route.query.id
    }).then(function (response) {
      console.log(response.data)
      _this.$data.deliverNumber=response.data.number
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
      this.$data.form.jobResponsibilities = this.$data.form.jobResponsibilities.replace('\n','<br>')
    this.$data.form.jobRequirements = this.$data.form.jobRequirements.replace('\n','<br>')

  },
  methods: {
    rejectResume(row,formName){             //回绝简历
      let _this=this;
      this.$axios({
        method:'put',
        url:'/admin/giveRefuse/'+_this.$data[formName][row].id
      }).then((response)=>{
        _this.$message({
          type:'success',
          message:'操作成功！'
        })
        _this.$data.ResumesRefuse.push(_this.$data[formName][row])
        _this.$data[formName].splice(row,1)
      }).catch((error)=>{
        _this.$message({
          type:'error',
          message:'操作失败！请查看是否有权限'
        })
      })
    },
    passResume(row,formName,formName1){       //通过简历，跳转到下一流程
                                              //formName是操作的简历的表  formName1是下一流程的简历表
                                              //操作成功后该简历从formName表中删除，在formName1的表中添加
      let _this=this;
      this.$axios({
        method:'put',
        url:'/admin/passToNext/'+_this.$data[formName][row].id
      }).then(function (response) {
        _this.$message({
          type:'success',
          message:'操作成功！'
        })
        _this.$data[formName1].push(_this.$data[formName][row])
        _this.$data[formName].splice(row,1)
      }).catch((error)=>{
        _this.$message({
          type:'error',
          message:'操作失败！清查看是否有权限'
        })
      })
    },
    revokeReject(row){
      let _this=this;
      this.$axios({
        method:'put',
        url:'/admin/cancelRefuse/'+_this.$data.ResumesRefuse[row].id
      }).then(function (response) {
        _this.$message({
          type:'success',
          message:'操作成功'
        })
        _this.$data.ResumesRefuse.splice(row,1)
      }).catch((error)=>{
        _this.$message({
          type:'error',
          message:'操作失败'
        })
      })
    },
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
        margin-top: 24px;
      }
      .label{
        display: inline-block;
        color: #707070;
        line-height: 17px;
        font-size: 18px;
      }
      .info{
        display: inline-block;
        line-height: 17px;
        font-size: 18px;
      }
    }

  }
</style>
