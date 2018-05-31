<template>
    <div>
      <div style="margin-left: 10%;width: 80%">
        <div style="height:30px;"></div>
        <div style="font-size:32px">给求职者{{name}}发送{{type}}邮件</div>
        <div class="line" style="margin: 40px auto"></div>
        <div style="height:30px;"></div>
        <el-form labelWidth="10%" label-position="top">

        <el-form-item label="邮件标题">
          <el-input style="width: 100%;" v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="邮件内容">
          <el-input style="width: 100%;"  :rows="10" type="textarea" v-model="component"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  class="button4release" @click="sendMail">发送邮件</el-button>
          <el-button  style="position: absolute;right: 0" class="button4cancel" @click="exitMail">取消发送</el-button>
        </el-form-item>
      </el-form>
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
        if(this.$route.query.type==='ResumesPassed'){
          this.$data.type='通过'
        }else{
          this.$data.type='回绝'
        }
      },
      data(){
          return{
            title:'',
            component:'',
            id:'',
            name:'',
            type:''
          }
        },
      methods:{
        exitMail(){
          this.$router.push({path:'/Details',query:{id:this.$data.detailsId}})
        },
          sendMail(){
            let _this=this;
            this.$axios({
              method:'post',
              url:'/admin/customMail/'+_this.$data.id,
              data:_this.$qs.stringify({
                title:_this.$data.title,
                component:_this.$data.component
              })

            }).then(function (response) {
              _this.$message(
                {
                  type:'success',
                  message:'发送成功'
                }
              )
              _this.$router.push({path:'/Details',query:{id:_this.$data.detailsId}})
            })
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
