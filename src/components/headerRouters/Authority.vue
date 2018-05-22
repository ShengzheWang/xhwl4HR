<template>
  <div id="Authority">
    <div class="block">
      <div style="width:80%;margin: 2% auto 0 auto">
        <div style="height: 60px"></div>
        <el-form class="form4search" ref="form" :model="form" label-width="0px" style="width: 100%;margin-left: 0%;display: inline-block">
          <el-col style="width: 38%">
            <el-form-item >
              <el-input placeholder="请输入工号" v-model="input3" style="font-size: 18px;margin-left: -1%">
                <el-button slot="append" @click="searchAdmin"><img src="../../../static/img/search.png"> </el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 40%">
            <div style="width: 100%"><p> </p></div>
          </el-col>
          <el-col style="width: 20%">
            <el-form-item >
              <el-button class="button4choose " style="height: 50px" @click="addClick">添加管理员</el-button>
            </el-form-item>
          </el-col>
        </el-form>

      </div>
      <div style="width:80%;margin: 2% auto 0% auto">
        <el-table :data="formAdmins" v-show="!showSearch" stripe class="table" style="width: 100%" v-loading="loading">
          <el-table-column prop="username" label="工号" style="width: 28%">
          </el-table-column>
          <el-table-column prop="department" label="部门" style="width: 28%">
            <template slot-scope="scope">
              {{departments[Number(formAdmins[scope.$index].department)-1].name}}
            </template>
          </el-table-column>
          <el-table-column prop="password" label="密码" style="width: 28%">
          </el-table-column>
          <el-table-column label="删除"  style="width: 8%">
            <template slot-scope="scope">
              <el-button class="button4delete" @click="deleteClick(scope.$index)" type="text" size="middle" icon="icon iconfont icon-huishouquanxian">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="修改"  style="width: 8%">
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
    <el-dialog  class="form4login" :visible.sync="dialogFormVisible1" style="margin:auto auto;width: 1000px" :lock-scroll="false" :append-to-body="true">
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
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入部门"
            @select="handleSelect2"
            prefix-icon="iconfont icon-zhiweileixing icon4form"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div class="foot4login" style="margin: 3% auto;width: 80%">
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-register'" @click="dialogFormVisible1=false">取消</el-button>
        <el-button v-bind:class="'button4login now'+(State == true?'Login':'Register')+'-login'" @click="addAdmin('formAddAdmin')">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog  class="form4login" :visible.sync="dialogFormVisible2" style="width: 50%;margin:auto auto" :lock-scroll="false" :append-to-body="false">
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
          <el-autocomplete
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入部门"
            @select="handleSelect1"
            prefix-icon="iconfont icon-zhiweileixing icon4form"
          ></el-autocomplete>
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
      totalPages:0,
      State : true,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      pageSize: 20,
      modifyIndex:null,
      form: {},

      AllDepartments: [],
      state1: '',

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

      Modify:{
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
          {validator:checkPassword,trigger:'change'}
        ],
        department:[
          {required:true,message:'不存在该部门',trigger:'change'},
          {validator:checkDepartment,trigger:'blur'}
        ]
      },
    };
    let checkPassword=(rule,value,callback)=>{
      if(this.$data.disabled===true){
        callback();
      }else{
        if(value){
          if(value.length<6||value.length>18){
            callback(new Error('密码长度在6-18位之间'))
          }else{
            callback();
          }
        }else{
          callback(new Error('请输入密码'));
        }
      }
    };

    let checkDepartment=(rule,value,callback)=>{
      if(this.$data.state1===this.$data.departments[Number(value)-1].name){
        callback();
      }else{
        callback(new Error('不存在该部门'));
      }
    };
  },



  created(){
    let _this=this;
    this.$axios({
      method:'post',
      data:_this.$qs.stringify({
        size:20,
        page:1
      }),
      url:'/super/searchAdmins'
    }).then(function (response) {
      _this.$data.formAdmins=response.data.content;
      _this.$data.total=response.data.totalElements;
      _this.$data.totalPages=response.data.totalPages;
      _this.$data.loading = false
      console.log(_this.$data.formAdmins)
    }).catch(function(error){
        _this.$message({
          type:'error',
          message:error.response.data.msg
        })
    })
  },
  methods: {
    addClick(){         //点击添加时的函数
      this.$data.formAddAdmin.department='';
      this.$data.formAddAdmin.password='';
      this.$data.formAddAdmin.username='';
      this.$data.state1='';
      this.$data.dialogFormVisible1 =true;
    },
    querySearch(queryString, cb) {
      var AllDepartments = this.AllDepartments;
      var results = queryString ? AllDepartments.filter(this.createFilter(queryString)) : AllDepartments;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (department) => {
        return (department.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    searchAdmin(){
      let name=this.$data.input3;
      if(name===''){
        let _this=this;
        _this.$axios({
          method:'post',
          data:_this.$qs.stringify({
            size:20,
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


    modifyClick(index){           //点击修改管理员的函数

      this.$data.formModify.department=this.$data.formAdmins[index].department;
      this.$data.state1=this.$data.departments[Number(this.$data.formModify.department)-1].name;
      this.$data.formModify.username=this.$data.formAdmins[index].username;
      this.$data.formModify.password=this.$data.formAdmins[index].password;

      this.$data.dialogFormVisible2=true;
      this.$data.modifyIndex=index;
    },

    modifyAdmin(formName){         //修改管理员界面中点击确定修改的按钮的函数
      console.log(this.$data.formModify);

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
        _this.$message({
          type: 'success',
          message: '删除管理员成功'
        })
      }).catch(function (error) {
        _this.$message({
          type:'error',
          message:error.response.data.msg
        })

      })
    },
    handleSizeChange (val) {
      this.$data.loading  = true
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
        _this.$data.loading  = false
      })
    },
    handlePageChange (val) {
      this.$data.loading  = true
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
        _this.$data.loading  = false
      })
    },
    addAdmin (formName) {       //添加管理员界面中的确定按钮的函数
      let _this=this;
      let flag=false;
      if(_this.$data.disabled===true){
        _this.$data.formAddAdmin.password=_this.$data.formAddAdmin.username;
      }
      this.$refs[formName].validate((valid)=>{
        if(valid){
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
              console.log(_this.$data.formAddAdmin);
              _this.$data.formAdmins.push(_this.$data.formAddAdmin);
              flag=true;
              _this.$data.input3='';

          }).catch(function (error) {
           _this.$message({
             type:'error',
             message:error.response.data.msg
           })

          })

        }
      })
    },
    loadAll() {
      return [
        {"value":"人事行政部","index":"1"},
        {"value":"财务管理部","index":"2"},
        {"value":"部门管理部","index":"3"},
        {"value":"市场开发部","index":"4"},
        {"value":"工程技术部","index":"5"},
        {"value":"运维及质量安全部","index":"6"},
        {"value":"研发设计部","index":"7"},
        {"value":"华南办事处","index":"8"},
        {"value":"深圳办事处","index":"9"},
        {"value":"北方办事处","index":"10"},
        {"value":"西部办事处","index":"11"},
        {"value":"华东办事处","index":"12"},
        {"value":"华中办事处","index":"13"},
        {"value":"华北办事处","index":"14"}
      ];
    },
    handleSelect1(item) {       //添加管理员中的部门选择
      this.$data.formModify.department=item.index;
    },
    handleSelect2(item) {       //修改管理员中的部门选择

      this.$data.formAddAdmin.department=item.index;
    }
  },
  mounted() {
    this.AllDepartments = this.loadAll();
  }

}
</script>
<style lang="less">
  .el-autocomplete{
      width: 100%;
    }
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
    .form4search {
      .el-input__inner {
        border: 2px solid #1476C1;
        border-radius: 100px 0 0 100px;
        height: 50px;
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
