<template>
  <div id="Authority">
    <div class="blockDiv"></div>
    <div class="block">
      <div style="width:60%;margin: 2% auto 0 auto">
        <el-form ref="form" :model="form" label-width="0px" style="width: 100%;margin-left: 0%;display: inline-block">
          <el-col style="width: 38%">
            <el-form-item >
              <el-input placeholder="请输入工号" v-model="input3" style="font-size: 18px;height: 60px;margin-left: -1%">
                <el-button slot="append" @click="searchAdmin"><img src="../../../static/img/search.png"> </el-button>
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
        <el-table :data="formAdmins" v-show="!showSearch" stripe class="table" style="width: 100%" v-loading="loading">
          <el-table-column prop="username" label="工号" width="280">
          </el-table-column>
          <el-table-column prop="department" label="部门" width="280">
            <template slot-scope="scope">
              {{departments[Number(formAdmins[scope.$index].department)-1].name}}
            </template>
          </el-table-column>
          <el-table-column prop="password" label="密码" width="280">
          </el-table-column>
          <el-table-column label="删除"  width="140">
            <template slot-scope="scope">
              <el-button class="button4delete" @click="deleteClick(scope.$index)" type="text" size="middle" icon="icon iconfont icon-huishouquanxian">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="修改"  width="140">
            <template slot-scope="scope">
              <el-button class="button4edit" @click="modifyClick(scope.$index)" type="text" size="middle" icon="icon iconfont icon-xiugai">
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
      <el-form   :model="formAddAdmin" ref="formAddAdmin" style="width: 80%;margin: 3% auto" :status-icon="true" :rules="rules">
        <el-form-item  prop="username" class="item4login">
          <el-input  placeholder="请输入工号" prefix-icon="iconfont icon-shoujihao icon4form" v-model="formAddAdmin.username"></el-input>
        </el-form-item>
        <el-form-item  prop="password" class="item4login">
          <el-input  type="password"  placeholder="请输入密码" :disabled="disabled" prefix-icon="iconfont icon-mima icon4form" v-model="formAddAdmin.password"></el-input>
        </el-form-item>
        <div style="text-align: right;" class="item4login">
          <el-checkbox  v-model="disabled" style="display: inline-block">使用工号作为默认密码</el-checkbox>
        </div>
        <el-form-item  prop="department" class="item4login">
          <el-select v-model="formAddAdmin.department" placeholder="请选择部门">
            <el-option
              v-for="item in departments"
              :label="item.name"
              :value="item.index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="foot4login" style="margin: 3% auto;width: 80%">
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-register'" @click="dialogFormVisible1=false">取消</el-button>
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-login'" @click="addAdmin('formAddAdmin')">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog  id="form4login" :visible.sync="dialogFormVisible2" style="width: 50%;margin:auto auto" :lock-scroll="false" :append-to-body="false">
      <el-form   :model="formModify" ref="formModify" style="width: 80%;margin: 3% auto" :status-icon="true" :rules="rules">
        <el-form-item  prop="username" class="item4login">
          <el-input  placeholder="请输入工号" prefix-icon="iconfont icon-shoujihao icon4form" v-model="formModify.username"></el-input>
        </el-form-item>
        <el-form-item  prop="password" class="item4login">
          <el-input  type="password"  placeholder="请输入密码" :disabled="disabled1" prefix-icon="iconfont icon-mima icon4form" v-model="formModify.password"></el-input>
        </el-form-item>
        <div style="text-align: right;" class="item4login">
          <el-checkbox  v-model="disabled1" style="display: inline-block">使用工号作为默认密码</el-checkbox>
        </div>
        <el-form-item  prop="department" class="item4login">
          <el-select v-model="formModify.department" placeholder="请选择部门" style="width: 100%">
            <el-option
              v-for="item in departments"
              :label="item.name"
              :value="item.index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="foot4login" style="margin: 3% auto;width: 80%">
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-register'" @click="dialogFormVisible2=false">取消</el-button>
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-login'" @click="modifyAdmin('formModify')">确定修改</el-button>
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
      showSearch:false,
      disabled:false,
      disabled1:false,
      search:'',
      input3:'',
      loading: true,
      currentPage: 1,
      total: 0,
      State : true,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      pageSize: 20,
      modifyIndex:null,
      form: {},

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

      formAddAdmin:{            //新增管理员的表单
        username:'',
        password:'',
        department:''
      },

      formAdmins:[{             //显示所有管理员的表单
        id:null,
        username:'',
        password:'',
        department:'',
      }],

      formModify:{
        username:'',
        password:'',
        department:''
      },

      formSearch:{
        id:null,
        username:'',
        password:'',
        department:''
      },

      rules:{
        username:[
          {required:true,message:'工号不能为空',trigger:'change'}
        ],
        password:[
          {required:true,message:'密码不能为空',trigger:'change'},
          {min:6,max:18,message:'密码在6-18位之间',trigger:'change'}
        ],
        department:[
          {required:true,message:'部门不能为空',trigger:'change'}
        ]
      },
    }
  },



  created(){
    let _this=this;
    this.$axios({
      method:'post',
      data:_this.$qs.stringify({
        size:10,
        page:1
      }),
      url:'/super/searchAdmins'
    }).then(function (response) {
      _this.$data.formAdmins=response.data.content;
      _this.$data.total=response.data.totalElements;
      _this.$data.loading = false
      console.log(_this.$data.formAdmins)
    })
  },
  methods: {
    searchAdmin(){
      let name=this.$data.input3;
      if(name===''){
        let _this=this;
        _this.$axios({
          method:'post',
          data:_this.$qs.stringify({
            size:10,
            page:1
          }),
          url:'/super/searchAdmins'
        }).then(function (response) {
          _this.$data.formAdmins=response.data.content;
        })
      }else{
        let _this=this;
        _this.$axios({
          method:'get',
          url:'/super/searchAdmin/'+name
        }).then(function (response) {

          _this.$data.formAdmins.splice(0,_this.$data.formAdmins.length);
          _this.$data.formAdmins.push(response.data);

        })

      }


    },


    modifyClick(index){

      this.$data.formModify.department=this.$data.formAdmins[index].department;
      this.$data.formModify.username=this.$data.formAdmins[index].username;
      this.$data.formModify.password=this.$data.formAdmins[index].password;

      this.$data.dialogFormVisible2=true;
      this.$data.modifyIndex=index;
    },

    modifyAdmin(formName){
      let _this=this;
      if(_this.$data.disabled1===true){
        _this.$data.formModify.password=_this.$data.formModify.username;
      }
      console.log(this.$data.formModify)
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.$axios({
            method:'post',
            url:'/super/modifyAdmin',
            data:_this.$data.formModify
          }).then(function (response) {
            _this.$data.dialogFormVisible2 = false;
            console.log(_this.$data.dialogFormVisible1);
            _this.$data.formAdmins.splice(_this.$data.modifyIndex,1,response.data)

          })
        }
      })

    },


    deleteClick(index){         //删除管理员
      let _this=this;
      let key=_this.$data.formAdmins[index].username;
      console.log(this.$data.formAdmins[index].id);
      this.$axios({
          method:'delete',
          url:'/super/recallPermission/'+key
      }).then(function (response) {
        _this.$data.formAdmins.splice(index,1);
        _this.$data.total--;
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
        url:'/super/searchAdmins'
      }).then(function (response) {
        _this.$data.formAdmins=response.data.content;
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
        url:'/super/searchAdmins'
      }).then(function (response) {
        _this.$data.formAdmins=response.data.content;
        _this.$data.total=response.data.totalElements;
      })
    },
    addAdmin (formName) {
      let _this=this;
      if(_this.$data.disabled===true){
        _this.$data.formAddAdmin.password=_this.$data.formAddAdmin.username;
      }
      this.$refs[formName].validate((valid)=>{
        if(valid){

          console.log(_this.$data.formAddAdmin);

          this.$axios({
            method:'post',
            url:'/super/addAdmin',
            data: _this.$data.formAddAdmin

          }).then(function (response) {
              _this.$data.dialogFormVisible1 = false;
              _this.$message({
                type: 'success',
                message:'添加成功！'
              })
              _this.$data.formAdmins.push(_this.$data.formAddAdmin);

          }).catch(function (error) {
           _this.$message({
             type:'error',
             message:'该用户已存在！'
           })

          })

        }
      })
    },
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
