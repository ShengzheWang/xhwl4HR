<template>
  <div id="Release">
    <div class="block">
      <div style="width:60%;margin: 2% auto 0 auto">
            <h2> 基本信息</h2>
            <div class="line"></div>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 100%;;display: inline-block;margin-top:5%">
              <el-form-item label="职位名称" style="width: 30%" prop="positionName">
                <el-input v-model="form.positionName"></el-input>
              </el-form-item>
              <el-form-item label="所属部门" style="" prop="departments">
                <el-select v-model="form.departments" placeholder="请选择" prop="department">
                  <el-option  v-for="(item,index) in departments" v-bind:key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="简历审核部门" style="" prop="resumeAuditDepartment">
                <el-select v-model="form.resumeAuditDepartment" placeholder="请选择">
                  <el-option  v-for="(item,index) in departments" v-bind:key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="考核部门" style="" prop="assessmentDepartment">
                <el-select v-model="form.assessmentDepartment" placeholder="请选择">
                  <el-option  v-for="(item,index) in departments" v-bind:key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位类型" style="" prop="positionType">
                <el-select v-model="form.positionType" placeholder="请选择">
                  <el-option  v-for="(item,index) in departments" v-bind:key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="招聘类型" style="" prop="recruitmentType">
                <el-select v-model.number="form.recruitmentType" placeholder="请选择招聘类型">
                  <el-option label="社会招聘" :value=1></el-option>
                  <el-option label="校园招聘" :value=2></el-option>
                  <el-option label="实习生招聘" :value=3></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作地点" style="width: 220px" prop="workPlace">
                <el-input v-model="form.workPlace"></el-input>
              </el-form-item>
              <el-form-item label="学历要求" style="" prop="education">
                <el-select v-model="form.education" placeholder="请选择">
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="硕士" value="硕士"></el-option>
                  <el-option label="博士" value="博士"></el-option>
                  <el-option label="大专" value="大专"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="招聘人数" style="" prop="recruitingNumbers">
                <el-input-number @change="handleChange" :min="1" :max="10" v-model="form.recruitingNumbers"></el-input-number>
              </el-form-item>
              <el-form-item label="截至日期" style="" prop="deadline">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.deadline"></el-date-picker>
              </el-form-item>

            </el-form>

        <h2> 工作职责</h2>
        <div class="line"></div>
        <el-form label-width="40px" style="width: 80%;;display: inline-block;margin-left: 8%;margin-top:5%" :rules="rules" ref="form2" :model="form2">
          <el-form-item label="" prop="jobResponsibilities">
            <el-input type="textarea" v-model="form2.jobResponsibilities" :rows="15"></el-input>
          </el-form-item>
        </el-form>
        <h2> 职位要求</h2>
        <div class="line"></div>
            <el-form ref="form" :model="form" :rules="rules" label-width="40px" style="width: 80%;;display: inline-block;margin-left: 8%;margin-top:5%">
              <el-form-item label="" prop="jobRequirements">
                <el-input type="textarea" v-model="form.jobRequirements" :rows="15"></el-input>
              </el-form-item>
            </el-form>
        <el-form  style="width: 80%;;display: inline-block;margin-left: 6%;margin-top:5%">
          <el-form-item style="text-align: center">
                <el-button  class="button4release" @click="ReleaseJob"  style="width:20%;">发布招聘</el-button>
          </el-form-item>
        </el-form>
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
  name: 'Release',
  data () {

    return {
      form:{
        id:'',
        positionName:'',
        department:'',
        resumeAuditDepartment:'',
        assessmentDepartment:'',
        positionType:'',
        recruitmentType:'',
        workPlace:'',
        education:'',
        recruitingNumbers:'',
        deadline:null,
      },
      form2:{
        jobResponsibilities:''
      },
      form3:{
        jobRequirements:''
      },
      formRelease:{
        id:'',
        positionName:'',
        department:'',
        resumeAuditDepartment:'',
        assessmentDepartment:'',
        positionType:'',
        recruitmentType:'',
        workPlace:'',
        education:'',
        recruitingNumbers:'',
        deadline:null,
        jobResponsibilities:'',
        jobRequirements:''
      },
      departments: [{name: '研发'},{name: '设计'},{name: '人事'}],
      rules:{
          positionName:[
            {required:true,message:'请输入职位名称',trigger:'blur'},
            {pattern: /[^x00-xff]/ ,message:'请输入中文名称',trigger:'blur'}
          ],
        departments:[
          {required:true,message:'请选择部门',trigger:'blur'}
        ],
        resumeAuditDepartment:[
          {required:true,message:'请选择部门',trigger:'blur'}
        ],
        assessmentDepartment:[
          {required:true,message:'请选择部门',trigger:'blur'}
        ],
        positionType:[
          {required:true,message:'请选择部门',trigger:'blur'}
        ],
        recruitmentType:[
          {required:true,message:'请选择部门',trigger:'blur'}
        ],
        workPlace:[
          {required:true,message:'请输入工作地点',trigger:'blur'}
        ],
        education:[
          {required:true,message:'请选择学历',trigger:'blur'}
        ],
        recruitingNumbers:[
          {required:true,message:'请输入职位数量',trigger:'blur'}
        ],
        deadline:[
          {required:true,message:'请选择截止日期',trigger:'blur'}
        ],
        jobRequirements:[
          {required:true,message:'请输入职位要求',trigger:'blur'},
          {max:500,message:'职位描述超过限制字数',trigger:'blur'}
        ],
        jobResponsibilities:[
          {required:true,message:'请输入职位职责',trigger:'blur'},
          {max:500,message:'职位描述超过限制字数',trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    ReleaseJob(){

      if(this.$data.form.deadline!==null){
      this.$data.form.deadline=new Date(this.$data.form.deadline);
      this.$data.form.deadline.setTime(this.$data.form.deadline.getTime()+8*3600*1000);}

      let flag1=false;
      let flag2=false;
      let flag3=false;

      this.$refs['form'].validate((valid)=>{
        if(valid){
          flag1=true;
        }else{

        }
      })

      this.$refs['form2'].validate((valid)=>{
        if(valid){
          flag2=true;
        }else{

        }
      })

      this.$refs['form3'].validate((valid)=>{
        if(valid){
          flag3=true;
        }else{
        }
      })


      if(flag1===false){
        this.$message({
          message:'好像基本信息处的填写有错误哦',
          type:"error"
        })
      }else if(flag2===false){
        this.$message({
          message:'好像工作职责处的填写有错误哦',
          type:'error'
        })
      }else if(flag3===false){
        this.$message({
          message:'好像工作要求处的填写有问题哦',
          type:'error'
        })
      }else if(flag1===true&&flag2===true&&flag3===true){
        this.$data.formRelease.positionName=this.$data.form.positionName;
        this.$data.formRelease.positionType=this.$data.form.positionType;
        this.$data.formRelease.department=this.$data.form.department;
        this.$data.formRelease.deadline=this.$data.form.deadline;
        this.$data.formRelease.assessmentDepartment=this.$data.form.assessmentDepartment;
        this.$data.formRelease.resumeAuditDepartment=this.$data.form.resumeAuditDepartment;
        this.$data.formRelease.recruitingNumbers=this.$data.form.recruitingNumbers;
        this.$data.formRelease.recruitmentType=this.$data.form.recruitmentType;
        this.$data.formRelease.education=this.$data.form.education;
        this.$data.formRelease.workPlace=this.$data.form.workPlace;
        this.$data.formRelease.jobRequirements=this.$data.form3.jobRequirements;
        this.$data.formRelease.jobResponsibilities=this.$data.form2.jobResponsibilities;


        let that=this;
        this.$axios({
          method:'post',
          url:'/admin/position',
          data:that.$data.formRelease
        }).then(function (response) {
          that.message({
            message:'提交成功！',
            type:'success'
          })
        })

        this.$router.push('/Now');
      }

      /*this.$refs['form'].validate((valid)=>{
        if(valid){
          let _this=this;
          this.$axios({
            method:'post',
            url:'/admin/position',
            data:_this.$data.form
          }).then(function (response) {
            _this.$message({
              message:'发布成功',
              type:'success'
            })

          })
          this.$router.push('/Now');
        }else{
          this.$message({
            type:'error',
            message:'出错了！'
          })
        }
      })*/

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  #Release {
    .line{
      border: solid 1px #1476C1;
      margin-top: 0;
    }
    .button4release{
      background: #E01B2F;
      color: #ffffff;
      height: 54px;
      border: solid 2px #E01B2F;
      border-radius: 50px;
      font-size: 20px;
    }
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: -20px;
    font-size: 18px;
  }
</style>
