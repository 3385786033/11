<template>
  <div class="orderDetails">
    <header>
      <h3>外卖订单详情</h3>
      <button type="button" class="btn btn-primary" @click="returnbtn"> 返 回 </button>
    </header>
    <section>
      <el-form label-position="left" inline class="demo-table-expand" :model="form" ref="form">
        <el-form-item label="订单号：" style="width: 20%">
          <span>{{ form.order_code }}</span>
        </el-form-item>
        <el-form-item label="总金额：" style="width: 20%">
          <span>{{ form.total }}</span>
        </el-form-item>
        <el-form-item label="日期：" style="width: 30%">
          <span>{{ form.create_date }}</span>
        </el-form-item>
        <el-form-item  style="width: 80%">
          <el-table
            :data="form.products"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="商品名"
              width="300"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              width="300"
            >
            </el-table-column>
            <el-table-column
              prop="amount"
              label="数量"
              width="300"
            >
            </el-table-column>
            <el-table-column
              prop="total"
              label="合计"
              width="300"
            >
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
        <el-form-item label="活动优惠："style="width: 20%">
          <span>{{ form.card_volume_name  }}</span>
        </el-form-item>
        <el-form-item label="储值金抵扣："style="width: 50%">
          <span>{{ form.deduction }}</span>
        </el-form-item>
        <el-form-item label="实收：" style="width: 20%">
          <el-input v-model="form.income"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px;display: block">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button>取消</el-button>
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
          value: 1,
          label: '待付款'
        }, {
          value: 2,
          label: '待发货'
        }, {
          value: 3,
          label: '待收货'
        },{
          value: 4,
          label: '已完成'
        },{
          value: 5,
          label: '已取消'
        }
        ],
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
              freight:this.form.freight,
              income:this.form.income,
              status:this.form.status
            }
            console.log(sendData)
            this.$axios.post("/order/editOrder",sendData).then((response) =>{
              if(response.data.status === 1){
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
      this.$axios.post('/order/getOrderDetail',{'order_id':this.$route.query.data_id})
        .then((response) =>{
          this.headh3 = this.$route.query.edit
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
