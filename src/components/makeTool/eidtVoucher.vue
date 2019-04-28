<template>
  <div class="addVoucher">
    <header>
      <h3>编辑代金券</h3>
      <div  class="head-right">
        <button type="button" class="btn btn-primary" @click="back">返回</button>
      </div>
    </header>
    <section class="addVoucher-main">
      <div class="img-left">
        <img src="../../assets/images/voucher.jpg" alt="">
      </div>
      <div class="addVoucher-content">
        <el-form ref="form" :model="form" :label-position="labelPosition" label="right" label-width="120px">
          <el-form-item label="代金券名称">
            <el-input style="width: 200px" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="优惠设置">
            <el-input style="width: 100px" v-model="form.condition"></el-input>
            <span>元代金券,单笔订单金额满</span>
            <el-input style="width: 100px" v-model="form.value"></el-input>
            <span>元，可使用</span>
          </el-form-item>
          <el-form-item label="选择商品">
            <el-radio-group v-model="form.product_id">
              <div>
                <el-radio label="全部商品"></el-radio>
              </div>
              <div>
                <el-radio label="部分商品"></el-radio>
                <el-button style="margin-left: 20px"  type="primary">添加商品</el-button>
                <!--<div style="border: 1px solid;height: 100px;width: 100%"></div>-->
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="领取时间">
            <div class="block">
              <el-date-picker
                v-model="form.receive_time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="有效期">
            <div class="block">
              <el-date-picker
                v-model="form.valid_time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="不可用时间">
            <div class="block">
              <el-date-picker
                v-model="form.invalid_time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="库存">
            <el-input style="width: 80px" v-model="form.stock"></el-input><span> 份 </span>
          </el-form-item>
          <el-form-item label="领取限制">
            <el-input style="width: 80px" v-model="form.limit"></el-input><span> 张 </span> <span style="font-size: 12px">*每个用户领取上限,如不填则默认为1</span>
          </el-form-item>
          <el-form-item label="联系我们">
            <el-input v-model="form.contact_us" style="width: 280px"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  export default {
    data () {
      return {
        labelPosition:'right',
        form: {
          name: '',
          value:'',
          condition:'',
          receive_time:'',
          valid_time:'',
          invalid_time:'',
          stock:'',
          limit:'',
          contact_us:'',
          remark:''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let receive_times = ''
            if(this.form.receive_time ===''||this.form.receive_time === undefined){
              receive_times = ''
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.form.receive_time[0])
              let overs = getDates.formatTime(this.form.receive_time[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              receive_times = datess
            }
            let valid_times = ''
            if(this.form.valid_time ===''||this.form.valid_time ===undefined){
              valid_times = ''
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.form.valid_time[0])
              let overs = getDates.formatTime(this.form.valid_time[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              valid_times = datess
            }
            let invalid_times = ''
            if(this.form.invalid_time ===''|| this.form.invalid_time === undefined){
              invalid_times = ''
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.form.invalid_time[0])
              let overs = getDates.formatTime(this.form.invalid_time[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              invalid_times = datess
            }
            let sendData = {
              name:this.form.name,
              value:this.form.value,
              condition:this.form.condition,
              product_id:this.form.product_id,
              receive_time:receive_times,
              valid_time:valid_times,
              invalid_time:invalid_times,
              stock:this.form.stock,
              limit:this.form.limit,
              contact_us:this.form.contact_us,
              remark:this.form.remark
            }
            //console.log(sendData)
            this.$axios.post('/voucher/addVoucher',sendData).then((response)=>{
              if(response.data.status === 1){
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'});
                this.$router.go(-1)
              }else {
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'});
              }
            })
          }else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
    created(){
      this.$axios.post('/voucher/getVoucherDetail',{'voucher_id':this.$route.query.voucher_id}).then((response)=>{
        this.form = response.data.data
      })
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
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
  .addVoucher{
    @include aspect(100%,100%);
    header{
      width: 100%;
      height: auto;
      overflow: hidden;
      .head-right{
        float: right;
        //margin-top: 20px;
        margin-right: 100px;
      }
      h3{
        margin-top: 20px;
        margin-left: 30px;
      }
    }
    section{
      width: 100%;
      height: auto;
      overflow: hidden;
      .img-left{
        width: 328px;
        height: 583px;
        float: left;
        overflow: hidden;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .addVoucher-content{
        margin-left: 20px;
        float: left;
      }
    }
  }
</style>
