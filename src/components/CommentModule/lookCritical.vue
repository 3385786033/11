<template>
  <div class="lookCritical">
    <header>
      <h3>评论详情</h3>
    </header>
    <section class="lookCritical-main">
      <el-form ref="form" :model="form" label-width="120px" label-position="left" inline>
        <el-form-item label="日期：" style="width: 40%">
          <span>{{ form.create_date }}</span>
        </el-form-item>
        <el-form-item label="用户名："style="width: 50%">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="订单号：" style="width: 40%">
          <span>{{ form.order_code }}</span>
        </el-form-item>
        <el-form-item label="商品名称：" style="width: 50%">
          <span>{{ form.target_name }}</span>
        </el-form-item>
        <el-form-item label="商品描述：" style="width: 100%">
          <el-rate
            v-model="form.description_level "
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}" style="float: left">
          </el-rate>
        </el-form-item>
        <el-form-item label="服务态度："style="width: 100%">
          <el-rate
            v-model="form.service_level"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}" style="float: left">
          </el-rate>
        </el-form-item>
        <el-form-item label="物流服务：" style="width: 100%">
          <el-rate
            v-model="form.logistics_level "
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}" style="float: left">
          </el-rate>
        </el-form-item>
        <el-form-item label="图片评论：">
          <ul class="listImg">
            <li v-for="(item,index) in form.picture"><img :src="item" alt=""></li>
          </ul>
        </el-form-item>
        <el-form-item label="文字评论：" style="width: 100%">
          <p>{{ form.description }}</p>
        </el-form-item>
        <el-form-item label="回复：" style="display: block">
          <el-input type="textarea" v-model="form.reply" style="width:600px;"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit('form')"style="margin-left: 120px">立即创建</el-button>
          <el-button @click="returnbtn">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        form:{}
      }
    },
    methods:{
      returnbtn(){
        this.$router.go(-1)
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let sendData = {
              comment_id:this.$route.query.data,
              reply:this.form.reply
            }
            //console.log(sendData)
            this.$axios.post('/comment/editComment',sendData)
              .then((response) =>{
                if (response.data.status === 1) {
                  this.$message({ message: response.data.message, type: 'success'});
                  this.$router.go(-1)
                } else {
                  this.$message({ message: response.data.message, type: 'error'});
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
    created(){
      this.$axios.post('/comment/getCommentDetail',{'comment_id':this.$route.query.data})
        .then((response) =>{
          this.form = response.data.data
          //console.log(response.data.data)
        })
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    border: 1px solid;
    margin: 0 auto;
  }
  /*
  设置宽高overflow
  */
  @mixin aspect($width,$height){
    width: $width;
    height: $height;
    overflow: hidden;
  }
.lookCritical{
  @include aspect(100%,100%);
  header {
    height: auto;
    width: 100%;
    overflow: hidden;
    padding-left: 20px;
    margin-bottom: 20px;
    h3 {
      margin:30px 20px;
    }
    .btn{
      float: right;
      margin-right: 100px;
    }
  }
  .lookCritical-main{
    width: 100%;
    height: auto;
    padding-left: 30px;
    padding-top: 20px;
    background-color: #fff;
    font-size: 18px;
    .userName{
      margin-top: 20px;
      overflow: hidden;
    }
    .listImg{
      overflow: hidden;
      li{
        border: 1px solid;
        width: 200px;
        height: 200px;
        float: left;
        overflow: hidden;
        margin: 0 10px 0 0;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
