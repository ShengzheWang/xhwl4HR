<template>
  <div>
    <div class="block">
      <div style="width:90%;margin: 2% auto 0 auto">
        <div style="height: 60px"></div>

        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/Now' }">招聘中</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/Details',query:{id:this.$data.detailsId}}">职位详情</el-breadcrumb-item>
          <el-breadcrumb-item>给求职者{{name}}发送{{type}}邮件</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="line" style="margin: 40px auto"></div>
        <div style="height:30px;"></div>
        <el-form labelWidth="10%" label-position="top">
          <el-form-item v-show="type==='通过'" label="时间">
            <el-date-picker type="date" style="width: 20%" value-format="yyyy-MM-dd" placeholder="请选择时间" v-model="time"></el-date-picker>
          </el-form-item>
          <el-form-item v-show="type==='通过'" label="地点">
            <el-input style="width: 20%;" v-model="address"></el-input>
          </el-form-item>
          <el-form-item v-show="type==='通过'" label="联系方式">
            <el-input style="width: 20%;" v-model="contact"></el-input>
          </el-form-item>
          <el-form-item label="邮件预览">
            <el-input type="textarea" :rows="20"  v-model="component"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  class="button4release" @click="sendMail">发送邮件</el-button>
            <el-button  style="position: absolute;right: 0" class="button4cancel" @click="exitMail">取消发送</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: "SendMail",
    created(){
      this.$data.detailsId=this.$route.query.detailsId;
      this.$data.name=this.$route.query.name;
      this.$data.id=this.$route.query.id;
      this.$data.step=this.$route.query.step;
      this.$data.positionName=this.$route.query.positionName;
      //this.$data.address=this.$route.query.address

      if(this.$route.query.type==='passed'){
        this.$data.type='通过';

      }else{
        this.$data.type='回绝'
      }
      this.$data.title='【兴海物联】求职进度通知'

      if(this.$data.type==='回绝'){
        this.$data.component=this.$data.name
          + '：\n您好！\n很遗憾您没有通过'+this.$data.positionName+'该岗位的招聘，希望未来还会有合作的机会，祝您今后求职顺利。\n' +
          '进一步了解公司请点击下方链接：http://www.copm.com.cn/category.aspx?NodeID=588\n\t\t兴海物联'

      }else{
        if(this.$data.step==='已通过'){
          this.$data.defaultNote1=':\n恭喜你成功通过本公司';
          this.$data.defaultNote2='的所有环节！到岗时间通知如下：\n\t时间：';
          this.$data.defaultNote3='\n\t地点:';
          this.$data.defaultNote4='\n欢迎您的加入，如果有疑问请联系';
          this.$data.defaultNote5='。\n\t\t兴海物联';

          this.$data.component=this.$data.name+this.$data.defaultNote1+this.$data.positionName+
            this.$data.defaultNote2+this.$data.time+this.$data.defaultNote3+this.$data.address+
            this.$data.defaultNote4+this.$data.contact+this.$data.defaultNote5;
        }else{
          this.$data.defaultNote1=':\n恭喜你成功通过本公司'+this.$data.step;
          this.$data.defaultNote2='下一环节'+this.$route.query.stepNext+'通知如下:\n\t时间：';
          this.$data.defaultNote3='\n\t地点：';
          this.$data.defaultNote4='\n请准时参与，如有疑问请联系';
          this.$data.defaultNote5='。\n\t\t兴海物联';

          this.$data.component=this.$data.name+this.$data.defaultNote1+this.$data.positionName+
            this.$data.defaultNote2+this.$data.time+this.$data.defaultNote3+this.$data.address+
            this.$data.defaultNote4+this.$data.contact+this.$data.defaultNote5;
        }
      }

    },
    watch:{
      time:function (old,val) {

        this.$data.component=this.$data.name+this.$data.defaultNote1+this.$data.positionName+
          this.$data.defaultNote2+this.$data.time+this.$data.defaultNote3+this.$data.address+
          this.$data.defaultNote4+this.$data.contact+this.$data.defaultNote5;
      },
      contact:function (old,val) {
        this.$data.component=this.$data.name+this.$data.defaultNote1+this.$data.positionName+
          this.$data.defaultNote2+this.$data.time+this.$data.defaultNote3+this.$data.address+
          this.$data.defaultNote4+this.$data.contact+this.$data.defaultNote5;
      },
      address:function (old,val) {
        this.$data.component=this.$data.name+this.$data.defaultNote1+this.$data.positionName+
          this.$data.defaultNote2+this.$data.time+this.$data.defaultNote3+this.$data.address+
          this.$data.defaultNote4+this.$data.contact+this.$data.defaultNote5;
      }
    },
    data(){
      return{
        positionName:'',
        address:'',
        position:'',
        title:'',
        component:'',
        id:'',
        name:'',
        type:'',
        step:'',
        time:'',
        contact:'',
        place:'',
        defaultNote1:'',
        defaultNote2:'',
        defaultNote3:'',
        defaultNote4:'',
        defaultNote5:'',
      }
    },
    methods:{
      exitMail(){
        this.$router.push({path:'/Details',query:{id:this.$data.detailsId}})
      },
      sendMail(){
        let _this=this;
        let flag=true;
        if(this.$data.type==='通过'){
          if(this.$data.time===''){
            _this.$message(
              {
                type:'error',
                message:'时间未填写'
              }
            )
            flag=false;
          }else if(this.$data.address===''){
            _this.$message({
              type:'error',
              message:'地点未填写'
            })
            flag=false;
          }else if(this.$data.contact===''){
            _this.$message({
              type:'error',
              message:'联系方式未填写'
            })
            flag=false;
          }
        }
        if(flag===true) {
          this.$axios({
            method: 'post',
            url: '/admin/customMail/' + _this.$data.id,
            data: _this.$qs.stringify({
              title: _this.$data.title,
              component: _this.$data.component
            })

          }).then(function (response) {
            _this.$message(
              {
                type: 'success',
                message: '发送成功'
              }
            )
            _this.$router.push({path: '/Details', query: {id: _this.$data.detailsId}})
          })
        }
      }
    }
  }
</script>

<style scoped>
  .button4release{
    background: #E01B2F;
    color: #ffffff;
    height: 54px;
    border: solid 2px #E01B2F;
    font-size: 20px;
  }
  .button4cancel{
    background: #ffffff;
    color: #6C6F66;
    height: 54px;
    border: solid 2px #DCDFE6;
    font-size: 20px;
  }
  .line{
    border: solid 1px #1476C1;
    margin-top: 0;
  }
</style>
