<template>
  <div class="orderDetails">
    <header>
      <h3>退货详情</h3>
    </header>
    <section>
      <el-form label-position="left" inline class="demo-table-expand" :model="form" ref="form">
        <el-form-item label="订单号：" style="width: 30%">
          <span>{{ form.order_code }}</span>
        </el-form-item>
        <el-form-item label="金额：" style="width: 20%">
          <span>{{ form.income }}</span>
        </el-form-item>
        <el-form-item label="日期：" style="width: 30%">
          <span>{{ form.create_date }}</span>
        </el-form-item>
        <el-form-item label="商品名称：" style="width: 30%">
          <span>{{ form.product }}</span>
        </el-form-item>
        <el-form-item label="商品数量："style="width: 20%">
          <span>{{ form.amount }}</span>
        </el-form-item>
        <el-form-item label="用户名称："style="width: 30%">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="价格：" style="width: 30%">
          <span>{{ form.price }}</span>
        </el-form-item>
        <el-form-item label="订单状态：" style="width: 30%">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款原因：" style="margin-top: 20px;display: block">
          <p>{{ form.reason }}</p>
        </el-form-item>
        <el-form-item label="退货信息：" style="margin-top: 20px;display: block">
          <p>{{ form.express_info }}</p>
        </el-form-item>
        <el-form-item label="备注：" style="margin-top: 20px;display: block">
          <p>{{ form.remark }}</p>
        </el-form-item>
        <el-form-item style="margin-top: 20px;display: block">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="returnbtn">返回</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  export default {
    data (){
      return {
        form:{},
        headh3:'',
        value:'',
        states:[{
          value: '1',
          label: '退款审核中'
        }, {
          value: '2',
          label: '退款中'
        },{
          value: '3',
          label: '已完成'
        }]
      }
    },
    methods:{
      returnbtn(){
        this.$router.go(-1)
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            let sendData = {
              return_id:this.form.return_id,
              status:this.form.status
            }
            //console.log(sendData)
            this.$axios.post("/returns/editReturn",sendData).then((response) =>{
              if(response.data.status === 1){
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'
                });
                this.$router.go(-1);
              }else {
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'
                });
              }
            })
          }
        })
      }
    },
    created(){
      this.$axios.post('/returns/getReturnDetail',{return_id:this.$route.query.data.return_id}).then((response)=>{
        this.form = response.data.data
      })
    }
  }
</script>
<style scoped lang="scss">
  .orderDetails{
    header{
      .btn{
        float: right;
        margin-right: 100px;
      }
    }
  }
</style>
