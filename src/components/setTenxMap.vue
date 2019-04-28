<template>
  <div class="setMap">
    <header>
      <h3>地图设置</h3>
    </header>
    <section class="setMap-main">
      <el-form ref="ruleForm" :model="ruleForm" label-width="120px">
        <el-form-item label="公司详细地址">
          <div class="area">
            <el-input v-model="details" placeholder="请输入内容" id="suggestId" style="width: 360px;display: inline-block"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="输入公司名称">
          <div class="area">
            <el-input v-model="company" placeholder="请输入公司名称"style="width: 360px;display: inline-block"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="输入坐标" >
          <span>X轴:</span><el-input v-model="addressX1" placeholder="请输入坐标" style="width: 100px;"></el-input>
          <span>Y轴:</span><el-input v-model="addressY1" placeholder="请输入坐标" style="width: 100px;"></el-input>
        </el-form-item>
        <el-form-item label="">
          <div id="container"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm()">返回</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  import {TMap} from '../assets/js/map'
  export default {
    data(){
      return {
        ruleForm:{},
        addressX1:'',
        addressY1:'',
        details:'',
        company:'',
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let coordinate = []
            coordinate.push(this.addressX1)
            coordinate.push(this.addressY1)
            let databesedit = {
              coordinate:coordinate,
              details:this.details,
              company:this.company
            }
            this.$axios.post("/map/update",databesedit).then((response) =>{
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    created(){
      this.$axios.post('/map/read').then((response)=>{
        if(response.data.status === 200){
          this.ruleForm = response.data.data
          this.addressX1 = response.data.data.coordinate[0]
          this.addressY1 = response.data.data.coordinate[1]
          this.details = response.data.data.details
          this.company = response.data.data.company
        }
      })
    },
    mounted(){
      //经纬度
      var myLatitude = 37.205883,myLongitude = 104.069132;
      var geocoder,map,marker = null;
      TMap('5JGBZ-3PO35-TDCIQ-QLXDP-LWA7H-YXFQL').then(qq => {
        var map = new qq.maps.Map(document.getElementById("container"), {
          // 地图的中心地理坐标。
          center: new qq.maps.LatLng(myLatitude, myLongitude),
          zoom: 8
        });
        geocoder = new qq.maps.Geocoder({
          complete : function(result){
            map.setCenter(result.detail.location);
            var marker = new qq.maps.Marker({
              map:map,
              position: result.detail.location
            });
          }
        });
      });
    }
  }
</script>
<style scoped lang="scss">
  #container {
    min-width:500px;
    min-height:767px;
  }
  header{
    width: 100%;
    height: auto;
    padding-top: 20px;
    overflow: hidden;
    h3 {
      margin:30px 20px;
    }
  }
  .setMap-main{
    width: 100%;
    height: auto;
    padding-left: 30px;
    padding-top: 20px;
    background-color: #fff;
  }
</style>
