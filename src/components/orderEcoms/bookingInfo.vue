<template>
  <div class="orderDetails">
    <header>
      <!--拼团-->
      <h3>查看详情</h3>
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
            :data="form.order_goods"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="商品名"
              width="300">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格(元)"
              width="300">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="数量(件)"
              width="300">
            </el-table-column>
            <el-table-column
              prop="total"
              label="合计(元)"
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
        <el-form-item label="拼团状态：" style="width: 20%">
          {{form.group_booking_status_str}}
        </el-form-item>
        <el-form-item label="活动状态：" style="width: 20%">
          <span v-if="form.activity_type === 1">拼团</span>
          <span v-else-if="form.activity_type === 2">秒杀</span>
          <span v-else>普通订单</span>
        </el-form-item>
        <el-form-item label="订单状态：" style="width: 20%" v-if="form.group_booking_success_status === true">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item >
        <el-form-item label="优惠(元)："style="width: 20%">
          <span >{{form.card_volume_discount_message }}</span>
        </el-form-item>
        <el-form-item label="积分(元)："style="width: 20%">
          <span>{{ form.points_discount_value }}</span>
        </el-form-item>
        <el-form-item label="会员(元)："style="width: 20%">
          <span>{{ form.vip_discount_value }}</span>
        </el-form-item>
        <el-form-item label="储值金抵扣(元)："style="width: 20%">
          <span>{{ form.deduction }}</span>
        </el-form-item>
        <el-form-item label="快递费(元)：" style="width: 20%">
          <span>{{ form.freight }}</span>
        </el-form-item>
        <el-form-item label="实收(元)：" style="width: 20%">
          <el-input v-model="form.income"></el-input>
        </el-form-item>
        <el-form-item label="快递公司：" style="width: 20%">
          <el-select v-model="form.express_company" placeholder="请选择">
            <el-option
              v-for="item in company"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号：" style="width: 50%">
          <el-input v-model="form.express_order"></el-input>
        </el-form-item>
        <el-form-item label="备注：" style="width: 100%">
          <el-input v-model="form.remark" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="买家留言：" style="width: 100%">
          {{form.leave_message}}
        </el-form-item>
        <el-form-item style="margin-top: 20px;display: block">
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
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
        company:[{
          value: '顺丰快递',
          label: '顺丰快递'
        },
          {
            value: '韵达快递',
            label: '韵达快递'
          },
          {
            value: '中通快递',
            label: '中通快递'
          },
          {
            value: '圆通快递',
            label: '圆通快递'
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
              income:this.form.income,
              express_company:this.form.express_company,
              status:this.form.status,
              express_order:this.form.express_order,
              remark:this.form.remark
            }
            this.$axios.post("/order/editOrder",sendData).then((response) =>{
              if(response.data.status === 1){
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'
                });
                this.$router.go(-1)
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
      this.$axios.post('/order/read',{'order_id':this.$route.query.data_id}).then((response) =>{
        console.log(response)
        if(response.data.status === 200){
          this.form = response.data.data
        }else {
          this.$message({
            showClose: true,
            message: '获取详情失败！',
            type: 'error'
          });
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .orderDetails{
    header{
      h3{
        margin: 30px 20px;
      }
      .btn{
        float: right;
        margin-right: 100px;
      }
    }
  }
</style>
