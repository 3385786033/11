<template>
  <div class="orderDetails">
    <header>
      <h3>商品详情</h3>
      <button type="button" class="btn btn-primary" @click="returnbtn"> 返 回 </button>
    </header>
    <section>
      <el-form label-position="left" inline class="demo-table-expand" :model="form" ref="form">
        <el-form-item label="订单号：" style="width: 20%">
          <span>{{ form.order_code }}</span>
        </el-form-item>
        <el-form-item label="总金额(元)：" style="width: 20%">
          <span>{{ form.total }}</span>
        </el-form-item>
        <el-form-item label="日期：" style="width: 30%">
          <span>{{ form.create_time }}</span>
        </el-form-item>
        <el-form-item  style="width: 80%">
          <el-table
            :data="form.products"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="商品名"
              width="300">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              width="300">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="数量"
              width="300">
            </el-table-column>
            <el-table-column
              prop="total"
              label="合计"
              width="300">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="姓名：" style="width: 20%">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="电话："style="width: 20%">
          <span>{{ form.tel }}</span>
        </el-form-item>
        <el-form-item label="地址："style="width: 40%">
          <span>{{ form.address }}</span>
        </el-form-item>
        <el-form-item label="订单状态：" style="width: 20%">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠："style="width: 20%">
          <span >{{form.card_volume_name }}</span>
        </el-form-item>
        <el-form-item label="积分(元)："style="width: 50%">
          <span>{{ form.points_discount_value }}元</span>
        </el-form-item>
        <el-form-item label="会员："style="width: 20%">
          <span>{{ form.vip_discount_value }}</span>
        </el-form-item>
        <el-form-item label="储值金抵扣："style="width: 20%">
          <span>{{ form.deduction }}</span>
        </el-form-item>
        <el-form-item label="实收：" style="width: 20%">
          <el-input v-model="form.income"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px;display: block">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="returnbtn">取消</el-button>
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
        value:'',
        states:[{
          value: 1,
          label: '待付款'
        },{
          value: 4,
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
              order_id:this.form.order_id,
              status:this.form.status,
            }
            this.$axios.post("/video_order/updateStatus",sendData).then((response) =>{
              if(response.data.status === 200){
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'
                });
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
      this.$axios.post('/video_order/read',{'order_id':this.$route.query.data_id}).then((response) =>{
          console.log(response)
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
