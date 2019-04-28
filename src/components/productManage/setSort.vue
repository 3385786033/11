<template>
  <div class="setSort">
    <header style="margin-bottom: 50px">
      <h3 style="margin: 30px 20px">排序设置</h3>
    </header>
    <section class="setSort-Main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="排序设置">
          <el-switch v-model="form.status">
          </el-switch>
        </el-form-item>
        <el-form-item label="排序名称" v-if="form.status">
          <el-checkbox-group
            v-model="form.checkedCities1"
            :min="1"
            :max="5">
            <el-checkbox v-for="city in form.cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin-top: 300px;">
          <el-form-item>
            <button type="button" class="btn btn-primary" @click="onSubmit">保存</button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        form:{
          status:false,
          checkedCities1:[],
          cities:['最新','销量','价格','积分']
        },
      }
    },
    methods:{
      onSubmit(){
        this.$axios.post('/product/editOrderSetting',{'order_setting':this.form.checkedCities1}).then((response) =>{
          //console.log(response)
            if(response.data.status===1){
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'success'
              });
            }else {

            }
          })
      },
      returnbtn(){
        this.$router.go(-1)
      },
      resetForm(){
        this.$router.go(-1)
      }
    },
    created(){
      this.$axios.post('/product/getOrderSetting').then((response)=>{
        this.form.checkedCities1 = response.data.data
        if(response.data.data.length > 0){
          this.form.status = true
        }else {
          this.form.status = false
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .setStor{
    header{
      overflow: hidden;
      margin-bottom: 50px;
    }
    .setSort-Main{
      margin-top: 50px;
    }
  }
</style>
