<template>
  <div class="setbrokerage">
    <header>
      <h3>佣金设置</h3>
      <div class="head-right">

      </div>
    </header>
    <section lang="">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="分销商佣金设置" name="first">
          <el-form :model="form" ref="form" style="margin-top: 50px">
            <el-form-item  label="*一级佣金">
              <el-input type="number" v-model="form.commission_a" style="width: 100px"></el-input>
              <span>% &nbsp;佣金最高百分之50</span>
            </el-form-item>
            <el-form-item label="*二级佣金">
              <el-input type="number" v-model="form.commission_b" style="width: 100px"></el-input>
              <span>% &nbsp;佣金最高百分之50</span>
            </el-form-item>
            <el-form-item style="margin-top: 50px">
              <button type="button" class="btn btn-primary" @click="brokonSubmit('form')"> 保 存</button>
              <el-button @click="returnbtn">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="提现设置" name="second">
          <el-form :model="forms" ref="forms" style="margin-top: 50px">
            <el-form-item label="*提现方式">
              <el-radio v-model="forms.withdraw_type" label="1">全额提现</el-radio>
              <el-radio v-model="forms.withdraw_type" label="2">整额提现</el-radio>
            </el-form-item>
            <el-form-item label="*最低提现金额:">
              <el-input type="number" v-model="forms.withdraw_value" style="width: 100px"></el-input>
              <span>元</span>
            </el-form-item>
            <el-form-item style="margin-top: 50px">
              <button type="button" class="btn btn-primary" @click="onSubmit('forms')"> 保 存</button>
              <el-button @click="returnbtn">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeName: 'first',
        form:{
          commission_a:'',
          commission_b:'',
        },
        forms:{
          withdraw_type:'',
          withdraw_value:''
        }
      }
    },
    methods:{
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      returnbtn(){
        this.$router.go(-1)
      },
      onSubmit(formName){
        let senddata = {
          withdraw_type:this.forms.withdraw_type,
          withdraw_value:this.forms.withdraw_value
        }
        //console.log(senddata)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(senddata)
            this.$axios.post("/distributor/editWithdrawSetting",senddata)
              .then((response)=>{
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
      },
      brokonSubmit(formName){
        let senddata = {
          commission_a:this.form.commission_a,
          commission_b:this.form.commission_b,
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(senddata)
            this.$axios.post("/distributor/editCommissionSetting",senddata).then((response)=>{
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
      this.$axios.post("/distributor/getCommissionSetting").then((response)=>{
          this.form = response.data.data
          //console.log(response)
        })
      this.$axios.post("/distributor/getWithdrawSetting").then((response)=>{
          this.forms = response.data.data
          //console.log(response)
        })
    }
  }
</script>
<style scoped lang="scss">
  .setbrokerage{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
      h3{
        margin: 30px 20px;
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
  }
</style>
