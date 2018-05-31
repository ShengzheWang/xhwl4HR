<template>
    <div>
      <div style="margin-left: 10%">
        <div style="height:30px;"></div>
      <div style="font-size:20px">给求职者{{name}}发送{{type}}邮件</div>
        <div style="height:30px;"></div>
        <el-form>
        <el-form-item label="邮件标题">
          <el-input style="width: 50%;" v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="邮件内容">
          <el-input style="width: 50%;" :rows="10" type="textarea" v-model="component"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 7%" @click="sendMail">发送邮件</el-button>
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

</style>
