<template>
  <div id="Authority">
    <div class="blockDiv"></div>
    <div class="block">
      <div style="width:60%;margin: 2% auto 0 auto">
        <el-form ref="form" :model="form" label-width="0px" style="width: 100%;margin-left: 0%;display: inline-block">
          <el-col style="width: 38%">
            <el-form-item >
              <el-input placeholder="请输入工号" v-model="input3" style="font-size: 18px;height: 60px;margin-left: -1%">
                <el-button slot="append"><img src="../../../static/img/search.png"> </el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 40%">
            <div style="width: 100%"><p> </p></div>
          </el-col>
          <el-col style="width: 20%">
            <el-form-item >
              <el-button class="button4choose " @click="dialogFormVisible1 =true">添加管理员</el-button>
            </el-form-item>
          </el-col>
        </el-form>

      </div>
      <div style="width:60%;margin: 2% auto 0% auto">
        <el-table :data="tableData" stripe class="table" style="width: 100%">
          <el-table-column prop="positionName" label="姓名" width="200">
          </el-table-column>
          <el-table-column prop="department" label="部门" width="200">
          </el-table-column>
          <el-table-column prop="recruitmentType" label="工号" width="200">
          </el-table-column>
          <el-table-column prop="workPlace" label="密码" width="240">
          </el-table-column>
          <el-table-column label="删除"  width="140">
            <template slot-scope="scope">
              <el-button class="button4delete" @click="handleClick1(scope.$index)" type="text" size="middle" icon="icon iconfont icon-huishouquanxian">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="修改"  width="140">
            <template slot-scope="scope">
              <el-button class="button4edit" @click="handleClick2(scope.$index)" type="text" size="middle" icon="icon iconfont icon-xiugai">
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
    <el-dialog  id="form4login" :visible.sync="dialogFormVisible1" style="width: 50%;margin:auto auto" :lock-scroll="false" :append-to-body="true">
      <el-form :label-position="labelPosition1"   style="width: 80%;margin: 3% auto" :status-icon="true">
        <el-form-item  prop="username" class="item4login">
          <el-input  placeholder="请输入工号" prefix-icon="iconfont icon-shoujihao icon4form" ></el-input>
        </el-form-item>
        <el-form-item  prop="password" class="item4login">
          <el-input  type="password"  placeholder="请输入密码" prefix-icon="iconfont icon-mima icon4form"></el-input>
        </el-form-item>
        <div style="text-align: right;" class="item4login">
          <el-checkbox v-model="checked" style="display: inline-block">使用工号作为默认密码</el-checkbox>
        </div>
        <el-form-item  prop="password" class="item4login">
          <el-input  type="password"  placeholder="请选择部门" prefix-icon="iconfont icon-zhiweileixing icon4form"></el-input>
        </el-form-item>
      </el-form>
      <div class="foot4login" style="margin: 3% auto;width: 80%">
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-register'" @click="dialogFormVisible1=false">取消</el-button>
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-login'" @click="login('user');">添加</el-button>
      </div>
    </el-dialog>
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
      currentPage: 1,
      total: 0,
      State : true,
      dialogFormVisible1: false,
      pageSize: 20,
      form: {},
      tableData: [{positionName: 'aa', department: '', workPlace: '', publishDate: '', deadline: '',recruitmentType:''
      },{positionName: 'aa', department: '', workPlace: '', publishDate: '', deadline: '',recruitmentType:''
      }]
    }
  },
  created(){
//    let _this=this
//    this.$axios({
//      method: 'post',
//      data: _this.$qs.stringify({
//        size: 20,
//        page: 1
//      }),
//      url:'/admin/positions'
//    }).then(function (response) {
//      _this.$data.tableData=response.data.content;
//      _this.$data.total=response.data.totalElements;
//    })

  },
  updated(){

  },
  methods: {
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
      this.$router.push({path:'/Details',query:{id:row+1}})
    }
  }
}
</script>
<style lang="less">
  #Authority{
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
    .iconfont{
      font-size: 26px;
    }
    .el-table__header-wrapper th {
      background: #ECF1F7 !important;
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
    .el-form-item {
      .el-input__inner {
        border: 2px solid #1476C1;
        border-radius: 100px 0 0 100px;
        height: 60px;
      }
      .el-input-group__append {
        border: 1px solid #1476C1;
        border-radius: 0px 100px 100px 0;
        background: #1476C1;
      }
    }
    .button4edit{
      background: inherit;
      color:#2480C3;
      width:80px
    }
    .button4delete{

      background: inherit;
      color:#E01B2F;
      width:80px
    }
    .el-table__header{
      font-size: 15px;
      .cell{
        font-weight: 900;
        color:#2c3e50;
      }
      tr {
        height: 80px;
      }
    }
    .el-table__body{
      font-size: 15px;
      .el-table__row{
        background: #ffffff;
        td{
          padding: 6px 0;
        }
      }
      .el-table__row--striped{
        background: #F6F7FB !important;
        td{
          background: #F6F7FB !important;
          padding: 6px 0;
        }
      }
      tr {
        height: 40px;
      }
    }
    .button4choose{
      background: #1476C1;
      color: #ffffff;
      width: 100%;
      height: 54px;
      border: solid 1px #1476C1;
      border-radius: 50px;
      font-size: 20px;
    }
    .input-name{
      border-radius: 50px;
    }
    .input-classes{
      border-radius: 50px;
    }

  }
</style>
