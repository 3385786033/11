<template>
  <div class="userDetails">
    <header>
      <h3>查看详情</h3>
      <div class="head-right">

      </div>
    </header>
    <div class="userDetails-main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="订单号：">
          <el-input style="width: 300px" v-model="form.order_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input style="width: 300px" v-model="form.tel" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="日期：">
          <el-input style="width: 300px" v-model="form.created_at" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请银行：">
          <el-input style="width: 300px" v-model="form.product_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input style="width: 300px" v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input style="width: 300px" v-model="form.identity_card" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="期望额度：">
          <el-input style="width: 300px" v-model="form.expect_limit" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select v-model="form.status" clearable placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        //基本信息
        form:{},
        //状态
        statusList:[
          {
            label:'待申请',
            value:'0'
          },{
            label:'申请中',
            value:'1'
          },{
            label:'申请成功',
            value:'2'
          },{
            label:'申请失败',
            value:'-1'
          }
        ],
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      //基本信息
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let sendData = {
              order_id:this.form.order_id,
              status:this.form.status
            }
            this.$axios.post('/credit_card_apply/saveStatus',sendData).then((response)=>{
              this.$message({
                showClose: true,
                message: '修改成功！',
                type: 'success'
              });
              this.$router.go(-1)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$router.go(-1)
      },
    },
    created(){
      //this.form = this.$route.query.data
      //基本信息
      this.$axios.post('/credit_card_apply/show',{'order_id':this.$route.query.data.order_id}).then((response)=>{
        this.form = response.data.data
      })
    }
  }
</script>
<style scoped lang="scss">
  .userDetails{
    header{
      h3{
        margin: 30px 20px;
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .basic-info,.vip-info,.integral-info,.login-info,.order-info{
      width: 100%;
      height: 100%;
      margin-top: 30px;
      overflow: hidden;
    }
    .basic-info-title,.vip-info-title,.integral-info-title,.login-info-title,.order-info-title{
      height: 60px;
      line-height: 60px;
      color: #666;
      padding-left: 20px;
      font-size:20px;
      background-color: rgba(215, 215, 215, 1);
    }
    .userhead{
      width: 80px;
      height: 80px;
      overflow: hidden;
      border: 1px #d7d7d7 solid;
    }
    .userhead img{
      display: block;
      width: 100%;
      height: 100%;
    }
    .basic-info-main{
      border: 1px solid #d7d7d7;
    }
    /*积分*/
    .integral-info-head{
      width: 100%;
      height: 60px;
      border: 1px solid #d7d7d7;
      border-top: 0;
      line-height: 60px;
      padding-left: 20px;
      font-size:18px;
    }
    .order-info-footer{
      height: 50px;
      width: 100%;
      margin-top: 5px;
      border: 1px #d7d7d7 solid;
      p{
        float: right;
        height: 100%;
        margin-right: 100px;
        line-height: 50px;
        font-size: 20px;
      }
    }
  }
</style>
