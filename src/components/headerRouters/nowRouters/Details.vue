<template>
    <div id="Details">
      <div class="block">
        <div style="width:90%;margin: 2% auto 0 auto">
          <div style="height: 60px"></div>

          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/Now' }">招聘中</el-breadcrumb-item>
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
                  <p class="info">{{departments[Number(form.department)].name}}</p>
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
          <el-tabs type="card"  v-model="activeTab" @tab-click="handleClick" style="background: #ffffff">
            <div style=" font-size: 0;-webkit-text-size-adjust:none;">
              <div v-for="item in 7" v-bind:class="'card-top '+'card-top-'+item+(item===(Number(activeTab)+1)?' card-top-active':'')">
                <div  class="card-top-item card-top-item-left"></div>
                <div  class="card-top-item card-top-item-right"></div>
              </div>
            </div>
            <el-tab-pane label="简历初审" name="0">
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesFirst" stripe style="width: 100%" class="table0">
                  <el-table-column prop="username" label="姓名" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" style="width: 16%">
                  </el-table-column>
                  <el-table-column
                    label="查看详情"
                    style="width: 13%">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDownload(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="投递状态"
                    style="width: 13%"
                  >
                  <template slot-scope="scope">
                      <el-button  @click="changeStatus(scope.$index,'ResumesFirst','ResumesHRFirst')" type="text" size="middle"
                                  :disabled="scope.row.auth===0">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="HR初审" name="1">
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesHRFirst" stripe style="width: 100%" class="table0">
                  <el-table-column prop="username" label="姓名" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" style="width: 16%">
                  </el-table-column>
                  <el-table-column label="查看详情" style="width: 13%">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle"
                                  :disabled="scope.row.auth===0">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDownload(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="投递状态"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="changeStatus(scope.$index,'ResumesHRFirst','ResumesDepartmentWritten')" type="text" size="middle"
                                  :disabled="scope.row.auth===0">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="部门笔试" name="2">
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesDepartmentWritten" stripe style="width: 100%" class="table0">
                  <el-table-column prop="username" label="姓名" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="HighestEducation" label="最高学历" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" style="width: 16%">
                  </el-table-column>
                  <el-table-column label="查看详情" style="width: 13%">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDownload(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="投递状态"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="changeStatus(scope.$index,'ResumesDepartmentWritten','ResumesDepartmentInterview')" type="text" size="middle"
                                  :disabled="scope.row.auth===0">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="部门面试" name="3">
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesDepartmentInterview" stripe style="width: 100%" class="table0">
                  <el-table-column prop="username" label="姓名" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" style="width: 16%">
                  </el-table-column>
                  <el-table-column label="查看详情" style="width: 13%">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDownload(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="投递状态"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="changeStatus(scope.$index,'ResumesDepartmentInterview','ResumesHRinterview')" type="text" size="middle"
                                  :disabled="scope.row.auth===0">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            </el-tab-pane>
            <el-tab-pane label="HR面试" name="4">
              <div style="width:100%;margin: 0% auto 0 auto">
                <el-table :data="ResumesHRinterview" stripe style="width: 100%" class="table0" ref="ResumesHRFirst">
                  <el-table-column prop="username" label="姓名" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" style="width: 16%">
                  </el-table-column>
                  <el-table-column label="查看详情" style="width: 13%">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDownload(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="投递状态"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="changeStatus(scope.$index,'ResumesHRinterview','ResumesPassed')" type="text" size="middle"
                                  :disabled="scope.row.auth===0">
                        <i class="icon iconfont icon-toudijindu"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            </el-tab-pane>
            <el-tab-pane label="已通过" name="5">
              <div style="width:100%;margin: 0% auto 0% auto">
                <el-table :data="ResumesPassed" stripe style="width: 100%" class="table1">
                  <el-table-column prop="username" label="姓名" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" style="width: 16%">
                  </el-table-column>
                  <el-table-column label="查看详情" style="width: 13%">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDownload(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发送通知"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="tell(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-youxiang"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
              <el-tab-pane label="已回绝" name="6">
              <div style="width:100%;margin: 0% auto 0% auto">
                <el-table
                  :data="ResumesRefuse"
                  stripe
                  style="width: 100%" class="table2">
                  <el-table-column prop="username" label="姓名" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="highestEducation" label="最高学历" style="width: 16%">
                  </el-table-column>
                  <el-table-column prop="deliverDate" label="投递时间" style="width: 16%">
                  </el-table-column>
                  <el-table-column label="查看详情" style="width: 13%">
                    <template slot-scope="scope">
                      <el-button  @click="resumeDetails(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-chakanxiangqing"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="下载简历"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="resumeDownload(scope.row)" type="text" size="middle">
                        <i class="icon iconfont icon-xiazaijianli"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="撤回回绝"
                    style="width: 13%"
                  >
                    <template slot-scope="scope">
                      <el-button  @click="revokeReject(scope.$index)" type="text" size="middle">
                        <i class="icon iconfont icon-huifutoudi"></i>
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
      departments:[             //所有的部门
        {name:'人事行政部',index:'1'},
        {name:'财务管理部',index:'2'},
        {name:'部门管理部',index:'3'},
        {name:'市场开发部',index:'4'},
        {name:'工程技术部',index:'5'},
        {name:'运维及质量安全部',index:'6'},
        {name:'研发设计部',index:'7'},
        {name:'华南办事处',index:'8'},
        {name:'深圳办事处',index:'9'},
        {name:'北方办事处',index:'10'},
        {name:'西部办事处',index:'11'},
        {name:'华东办事处',index:'12'},
        {name:'华中办事处',index:'13'},
        {name:'华北办事处',index:'14'}
      ],
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
  watch:{
    ResumesRefuse:{
      handler(old,val){
        let _this=this;
        this.$axios({         //获取已拒绝简历名单
          method:'get',
          url:'/admin/Refuse/'+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesRefuse=response.data;
        })
      }

    },
    ResumesPassed:{
      handler(old,val) {
        let _this = this;
        this.$axios({         //获取已通过名单
          method: 'get',
          url: '/admin/Pass/' + _this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesPassed = response.data;

        })
      }

    },
    ResumesHRinterview:{
      handler(old,val){
        let _this=this
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
      }

    },
    ResumesDepartmentInterview:{
      handler(old,val){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/admin/DepartmentInterview/'+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesDepartmentInterview=response.data
        })
      }

    },
    ResumesDepartmentWritten:{
      handler(old,val){
        let _this=this
        this.$axios({
          method:'get',
          url:"/admin/DepartmentWritten/"+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesDepartmentWritten=response.data;
        })
      }

    },
    ResumesHRFirst:{
      handler(old,val){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/admin/HRFristReview/'+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesHRFirst=response.data;
        })
      }
    },
    ResumesFirst:{
      handler(old,val){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/admin/ResumeReview/'+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesFirst=response.data
        })
      }

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
    changeStatus(row,formName,formName1){
      let _this=this;
      this.$confirm('请确定您将对 '+_this.$data[formName][row].username+' 进行操作（下一步将无法取消）','重要',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(()=>{
        _this.$confirm('请选择你对 '+_this.$data[formName][row].username+'的操作?', '提示', {
          confirmButtonText: '审核完成，进入下一步',
          cancelButtonText: '回绝',
          type: 'warning',
          showClose:false,
          beforeClose: (action, instance, done) => {
            console.log(action)
            console.log(done)
            done();
          }
        }).then(() => {
          _this.$axios({
            method:'put',
            url:'/admin/passToNext/'+_this.$data[formName][row].id
          }).then(function (response) {
            _this.$message({
              type:'success',
              message:'进入下一步成功！'
            })
            _this.$data[formName1].push(_this.$data[formName][row])
            _this.$data[formName].splice(row,1)
          }).catch((error)=>{
            _this.$message({
              type:'error',
              message:'进入下一步失败！请查看是否有权限'
            })
          })
        }).catch(() => {
          _this.$axios({
            method:'put',
            url:'/admin/giveRefuse/'+_this.$data[formName][row].id
          }).then((response)=>{
            _this.$message({
              type:'success',
              message:'回绝成功！'
            })
            _this.$data.ResumesRefuse.push(_this.$data[formName][row])
            _this.$data[formName].splice(row,1)
          }).catch((error)=>{
            _this.$message({
              type:'error',
              message:'回绝失败！请查看是否有权限'
            })
          })
        });
      }).catch(()=>{

      })
    },

    tell(row){
      let _this=this;
      this.$confirm('确定对 '+row.username+'发送邮件和短信?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        _this.$axios({
          method: 'post',
          url: '/admin/onNoteWithoutDate/' + row.id
        }).then(function (response) {
          _this.$message({
            type: 'success',
            message: '发送成功'
          })
        }).catch((error) => {
          _this.$message({
            type: 'success',
            message: '发送失败'
          })
        })
      }).catch(() => {});
    },
    revokeReject(row){
      let _this=this;
      this.$confirm('确定对 '+_this.$data.ResumesRefuse[row].username+'撤销回绝?', '提示', {
        confirmButtonText: '撤销',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$axios({
          method: 'put',
          url: '/admin/cancelRefuse/' + _this.$data.ResumesRefuse[row].id
        }).then(function (response) {
          _this.$message({
            type: 'success',
            message: '操作成功'
          })
          _this.$data.ResumesRefuse.splice(row, 1)
        }).catch((error) => {
          _this.$message({
            type: 'error',
            message: '操作失败'
          })
        })
      }).catch(() => {});
    },
    resumeDetails (it) {
      this.$router.push({ path: '/ResumeDetails' , query: {id:it.id}})
    },
    resumeDownload(it){
      console.log(it)
      const id = it['id']
      this.$axios({
        method:'get',
        url:'/admin/downloadResume/'+ id,
        responseType: 'blob'
      }).then(function (response) {
        const data = response.data
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', it.id+'_'+it.username+'_简历.pdf')

        document.body.appendChild(link)
        link.click()
      }).catch(function(error){

      })

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
    .card-top{
      width: 14.2%;
      height: 62px;
      background: #38BDFE;
      display: inline-block;

      .card-top-item{
        display: inline-block;
        width: 50%;
        height: 60px;
        transition: all 0.6s;
        font-size: 0;
        -webkit-text-size-adjust:none;

      }
      .card-top-item-left{
        background: #ffffff;
        border-bottom-right-radius: 0px;
      }
      .card-top-item-right{
        background: #ffffff;
        border-bottom-right-radius: 0px;
      }
    }
    .card-top-active{
      .card-top-item-left{
        border-bottom-right-radius: 60px;
      }
      .card-top-item-right{
        border-bottom-left-radius: 60px;
      }
      /*.card-top-item-0{*/
        /*display: inline-block;*/
        /*margin: 0;*/
        /*width: 10%;*/
        /*height: 40px;*/
        /*background: #1476C1;*/
      /*}*/
      /*.card-top-item-1{*/
        /*display: inline-block;*/
        /*margin: 0;*/
        /*width: 8%;*/
        /*height: 28px;*/
        /*background: #1476C1;*/
      /*}*/
      /*.card-top-item-2{*/
        /*display: inline-block;*/
        /*margin: 0;*/
        /*width: 8%;*/
        /*height: 18px;*/
        /*background: #1476C1;*/
      /*}*/
      /*.card-top-item-3{*/
        /*display: inline-block;*/
        /*margin: 0;*/
        /*width:8%;*/
        /*height: 12px;*/
        /*background: #1476C1;*/
      /*}*/
      /*.card-top-item-4{*/
        /*display: inline-block;*/
        /*margin: 0;*/
        /*width: 8%;*/
        /*height: 8px;*/
        /*background: #1476C1;*/
      /*}*/
      /*.card-top-item-5{*/
        /*display: inline-block;*/
        /*margin: 0;*/
        /*width: 8%;*/
        /*height: 4px;*/
        /*background: #1476C1;*/
      /*}*/
    }
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
      .el-table__header-wrapper th{
        background: #ECF1F7 !important;
      }
      .el-table__row--striped td{
        background: #F6F7FB;
      }
      .iconfont{
        color:#1476C1
      }
    .el-tabs__header.is-top{
      border-bottom: none;
    }
    .el-tabs__nav {
      width: 100%;
      border: none;

    }
    .el-tabs__header{
      margin-bottom: 0;
    }
    .el-tabs__item{
      height:40px;
      border-radius:40px 40px 40px 40px ;
      box-sizing: border-box;
      border: 2px solid #38BDFE;
      width: 10.2%;
      padding: 0;
      margin-right: 2%;
      margin-left: 2%;
      text-align: center;
      vertical-align: middle;
      font-weight: bold;
      font-size: 16px;
      line-height:40px;
      background: #ffffff;
      color:#38BDFE;
    }
    .el-tabs__item.is-active{
      background: #38BDFE;
      color:#ffffff;
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
