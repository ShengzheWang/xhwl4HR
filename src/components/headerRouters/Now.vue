<template>
  <div id="Now">
    <div class="block">
      <div style="width:60%;margin: 5% auto 0 auto">
        <el-form ref="form" :model="form" label-width="0px" style="width: 100%;margin-left: 0%;display: inline-block">
          <el-form-item >
            <el-col style="width: 38%">
              <el-date-picker type="date" prefix-icon="start-time-icon" class="start-time" placeholder="发布日期-起" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col style="width: 2%">
              <div style="width: 100%;height: 50px;color:#1476C1;text-align: center;font-size: 30px;vertical-align: middle;border-top:#1476C1 solid 2px;border-bottom: #1476C1 solid 2px ">|</div>
            </el-col>
            <el-col style="width: 38%">
              <el-date-picker type="date" prefix-icon="end-time-icon" class="end-time" placeholder="发布日期-终" v-model="form.date2" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

            <el-col style="width: 38%">
              <el-form-item >
            <el-input v-model="form.name" prefix-icon="name-icon" placeholder="职位名称" class="input-name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 2%">
              <div style="width: 100%"><p> </p></div>
            </el-col>
            <el-col style="width: 38%;margin-left: -2px">
              <el-form-item >
              <el-input v-model="form.region" prefix-icon="classes-icon" placeholder="招聘部门" class="input-classes">
              </el-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 2%">
              <div style="width: 100%"><p> </p></div>
            </el-col>
            <el-col style="width: 20%">
              <el-form-item >
              <el-button class="button4choose">筛选</el-button>
              </el-form-item>
            </el-col>
        </el-form>

      </div>
      <div style="width:60%;margin: 2% auto 0% auto">
        <el-table :data="tableData" stripe class="table" style="width: 100%" v-loading="loading">
          <el-table-column prop="positionName" label="职位名称" width="180">
          </el-table-column>
          <el-table-column prop="department" label="所在部门" width="160">
          </el-table-column>
          <el-table-column prop="recruitmentType" label="招聘类型" width="160">
          </el-table-column>
          <el-table-column prop="workPlace" label="工作地点" width="160">
          </el-table-column>
          <el-table-column prop="publishDate" label="发布时间" width="160">
          </el-table-column>
          <el-table-column prop="deadline" label="截止时间" width="160">
          </el-table-column>
          <el-table-column label="查看详情" fixed="right" width="140">
            <template slot-scope="scope">
              <el-button class="button4details" @click="handleClick(scope.row)" type="primary" size="middle">详情
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="删除职位" fixed="right" width="140">
            <template slot-scope="scope">
              <el-button class="button4details" @click="deletePosition(scope.$index)" type="danger" size="middle">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="el-pagination__total page-total">
          共<a>{{total}}</a>条
        </div>
        <div class="page-select">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item.vue'
import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
import ElForm from '../../../node_modules/element-ui/packages/form/src/form.vue'
import ElIcon from '../../../node_modules/element-ui/packages/icon/src/icon.vue'

export default {
  components: {
    ElIcon,
    ElForm,
    ElButton,
    ElFormItem},
  name: 'Now',
  data () {
    return {
      loading:true,
      currentPage: 1,
      total: 0,
      pageSize: 20,
      form: {},
      tableData: [{positionName: '', department: '', workPlace: '', publishDate: '', deadline: '',recruitmentType:'',id:''
      }]
    }
  },
  created(){
    let _this=this
    this.$axios({
      method: 'post',
      data: _this.$qs.stringify({
        size: 20,
        page: 1
      }),
      url:'/admin/positions'
    }).then(function (response) {
      _this.$data.tableData=response.data.content;
      _this.$data.loading = false
      _this.$data.total=response.data.totalElements;
    })


  },
  updated(){                  //将简历类型进行修改
    for(let index=0;index<this.$data.tableData.length;index++){
      if(this.$data.tableData[index].recruitmentType==='1'){
        this.$data.tableData[index].recruitmentType='校园招聘'
      }else if(this.$data.tableData[index].recruitmentType==='2'){
        this.$data.tableData[index].recruitmentType='社会招聘'
      }else if(this.$data.tableData[index].recruitmentType==='3'){
        this.$data.tableData[index].recruitmentType='实习生招聘'
      }
    }
  },
  methods: {
    deletePosition(row){        //删除职位
      let _this=this;
      this.$axios({
        method:'delete',
        url:'/admin/position/'+_this.$data.tableData[row].id
      }).then(function (response) {
        _this.$message({
          type:'success',
          message:'删除职位成功'
        })
        _this.$data.tableData.splice(row,1);
      }).catch(function (error) {
        _this.$message({
          type:'error',
          message:'删除失败！请查看是否有权限'
        })

      })
    },

    handleSizeChange (val) {
      this.$data.pageSize = val
      let _this=this
      this.$axios({
        method: 'post',
        data: _this.$qs.stringify({
          size: _this.$data.pageSize,
          page: _this.$data.currentPage
        }),
        url:'/admin/positions'
      }).then(function (response) {
        _this.$data.tableData=response.data.content;
        _this.$data.total=response.data.totalElements;
      })
    },
    handlePageChange (val) {
      this.$data.currentPage = val
      let _this=this
      this.$axios({
        method: 'post',
        data: _this.$qs.stringify({
          size: _this.$data.pageSize,
          page: _this.$data.currentPage
        }),
        url:'/admin/positions'
      }).then(function (response) {
        _this.$data.tableData=response.data.content;
        _this.$data.total=response.data.totalElements;
      })
    },
    handleClick (row) {
      //console.log(row);

      this.$router.push({path:'/Details',query:{id:this.$data.tableData[row].id}})

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
    .el-table th {
      text-align: center;
    }
    .el-table__row {
      text-align: center;
    }
    .el-table__header {
      font-size: 15px;
      .cell {
        font-weight: 900;
        color: #2c3e50;
      }
    }
    .el-table__body {
      font-size: 15px;
      .el-table__row {
        background: #F6F7FB;
      }
      .el-table__row--striped {
        background: #ffffff !important;
        td {
          background: #ffffff !important;
        }
      }
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
    i{
      display: inline-block;
      vertical-align: middle;
      width: 27px;
    }
    .button4details{
      border-radius: 40px !important;
      border:solid 1px #2480C3;
      background: inherit;
      color:#2480C3;
      width:80px
    }
    .el-table__header{
      font-size: 15px;
      .cell{
        font-weight: 900;
        color:#2c3e50;
      }
    }
    .el-table__body{
      font-size: 15px;
      .el-table__row{
        background: #F6F7FB;
      }
      .el-table__row--striped{
        background: #ffffff !important;
        td{
          background: #ffffff !important;
        }
      }
    }
    .button4choose{
      background: #E01B2F;
      color: #ffffff;
      width: 100%;
      height: 54px;
      border: solid 2px #E01B2F;
      border-radius: 50px;
      font-size: 20px;
    }
    .input-name{
      border-radius: 50px;
    }
    .input-classes{
      border-radius: 50px;
    }
    .el-form{
      .el-input{
        border:#1476C1 solid 2px;
        width: 100%;
        font-size: 20px;
      }
      .el-input__prefix{
        display: inline-block;
        width: 50px;
      }
      .el-input__inner{
        height:50px;
        border:none;
        background: inherit;
        padding-left:50px;
      }
    }

    .end-time{
      height:50px !important;
      border-radius:0 50px 50px 0;
      border-left:none !important;
    }
    .end-time-icon{
      height: 25px;
    }
    .start-time-icon{
      height: 25px;
    }
    .end-time-icon::before{
      content:url("../../../static/img/endTime.jpg");
    }
    .start-time{
      height:50px !important;
      border-radius:50px 0 0 50px;
      border-right: none !important;
    }
    .start-time-icon::before{
      content:url("../../../static/img/startTime.jpg");
    }
    .name-icon{
      height:25px;
    }
    .name-icon::before{
      content: url("../../../static/img/name.jpg");
    }
    .classes-icon{
      height: 25px;
    }
    .classes-icon::before{
      content: url("../../../static/img/classes.jpg");
    }
  }
</style>
