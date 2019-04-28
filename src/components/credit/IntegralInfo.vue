<template>
  <div class="userDetails">
    <header>
      <h3>积分兑换详情</h3>
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
        <el-form-item>
          <el-table :data="tableData" border style="width: 30%" >
            <el-table-column
              prop="name"
              label="商品">
            </el-table-column>
            <el-table-column
              prop="msg"
              label="数量">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="申请人：">
          <el-input style="width: 300px" v-model="form.real_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="提现方式：">
          <el-input style="width: 300px" v-model="form.withdraw_type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="到账账户：">
          <el-input style="width: 300px" v-model="form.account" :disabled="true"></el-input>
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
        <el-form-item label="兑换截图：">
          <div style="overflow: hidden;width: 300px">
            <img :src="form.image_address" alt="" style="display: block;overflow: hidden;max-width: 100%">
          </div>
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
        form:{
          type:'',
          status:''
        },
        tableData:[],
        statusList:[
          {
            label:'待兑换',
            value:'0'
          },{
            label:'兑换中',
            value:'1'
          },{
            label:'兑换成功',
            value:'2'
          },{
            label:'兑换失败',
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
            this.$axios.post('/credit_card_integral/saveStatus',sendData).then((response)=>{
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
      let arr = [{
        name:this.$route.query.data.product_name,
        msg:'1'
      }]
      this.tableData = arr
      //基本信息
      this.$axios.post('/credit_card_integral/show',{'order_id':this.$route.query.data.order_id}).then((response)=>{
        this.form = response.data.data

      })
      //基本信息
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
