<template>
  <div id="Details">
    <div class="block">
      <div style="width:90%;margin: 2% auto 0 auto">
        <div style="height: 60px"></div>

        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/History' }">历史招聘</el-breadcrumb-item>
          <el-breadcrumb-item>职位详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="position-details">
          <div style="text-align: left;display: inline-block;width: 50%">
            <h1  style="font-size: 28px" class="name">{{form.positionName}}</h1><h2 class="classes">{{form.recruitmentType}}</h2>
          </div>
          <div style="text-align: right;display: inline-block;width: 49%">
            <h4 class="info-already-got">共收到简历数</h4>
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
                <p class="info">{{departments[Number(form.department)-1].name}}</p>
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
            <el-row>
              <el-col :span="6">
                <p class="label">结束日期：</p>
                <p class="info">{{form.deadline}}</p>
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
            <div v-for="item in 2" v-bind:class="'card-top '+'card-top-'+item+(item===(Number(activeTab)+1)?' card-top-active':'')">
              <div  class="card-top-item card-top-item-left"></div>
              <div  class="card-top-item card-top-item-right"></div>
            </div>
          </div>
          <el-tab-pane label="已通过" name="0">
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
              </el-table>
            </div>
            <div class="el-pagination__total page-total">
              共<a>{{total4Passed}}</a>条
            </div>
            <div class="page-select">
              <el-pagination
                @size-change="handleSizeChange4Passed"
                @current-change="handlePageChange4Passed"
                :current-page="currentPage4Passed"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="pageSize4Passed"
                layout="sizes, prev, pager, next, jumper"
                :total="total4Passed">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已回绝" name="1">
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
              </el-table>
            </div>
            <div class="el-pagination__total page-total">
              共<a>{{total4Refuse}}</a>条
            </div>
            <div class="page-select">
              <el-pagination
                @size-change="handleSizeChange4Refuse"
                @current-change="handlePageChange4Refuse"
                :current-page="currentPage4refuse"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="pageSize4Refuse"
                layout="sizes, prev, pager, next, jumper"
                :total="total4Refuse">
              </el-pagination>
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

        ],
        currentPage4Passed:1,
        total4Passed:0,
        pageSize4Passed:10,
        ResumesPassed: [
          {id:'',username:'',sex:'',highestEducation:'',deliverDate:'',auth:''}
        ],
        currentPage4refuse:1,
        total4Refuse:0,
        pageSize4Refuse:10,
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
        _this.$data.ResumesPassed=response.data.content;
        _this.$data.total4Passed=response.data.totalElements

      })

      this.$axios({         //获取已拒绝简历名单
        method:'get',
        url:'/admin/Refuse/'+_this.$route.query.id
      }).then(function (response) {
        _this.$data.ResumesRefuse=response.data.content;
        _this.$data.total4Refuse=response.data.totalElements
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
      handleSizeChange4Passed (val) {
        this.$data.pageSize4Passed = val
        let _this=this
        this.$axios({
          method: 'get',
          data: _this.$qs.stringify({
            size: _this.$data.pageSize4Passed,
            page: _this.$data.currentPage4Passed
          }),
          url:'/admin/Pass/'+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesPassed =response.data.content;
        })
      },
      handlePageChange4Passed (val) {
        this.$data.currentPage4Passed = val
        let _this=this
        this.$axios({
          method: 'get',
          data: _this.$qs.stringify({
            size: _this.$data.pageSize4Passed,
            page: _this.$data.currentPage4Passed
          }),
          url:'/admin/Pass/'+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesPassed=response.data.content;
        })
      },
      handleSizeChange4Refuse (val) {
        this.$data.pageSize4Refuse = val
        let _this=this
        this.$axios({
          method: 'get',
          data: _this.$qs.stringify({
            size: _this.$data.pageSize4Refuse,
            page: _this.$data.currentPage4refuse
          }),
          url:'/admin/Refuse/'+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesRefuse =response.data.content;
        })
      },
      handlePageChange4Refuse (val) {
        this.$data.currentPage4refuse = val
        let _this=this
        this.$axios({
          method: 'get',
          data: _this.$qs.stringify({
            size: _this.$data.pageSize4Refuse,
            page: _this.$data.currentPage4refuse
          }),
          url:'/admin/Refuse/'+_this.$route.query.id
        }).then(function (response) {
          _this.$data.ResumesRefuse=response.data.content;
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
    .img-isRead {
      z-index: 999;
      width: 50px;
      -moz-transform: rotate(10deg);
      -webkit-transform: rotate(30deg);;
      position: absolute;
      right: 0px;
      top:0px;
      overflow: visible
    }

  }
</style>
