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
          <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" @click="point" :scroll-wheel-zoom="true" :clicking="true" ak="e0esSMgmsUQUqkcZRezjGjubpyECER2w">
            <bm-control :offset="{width: '10px', height: '10px'}">
              <bm-auto-complete v-model="details" :sugStyle="{zIndex: 1}">
                <el-input placeholder="请输入地名关键字"></el-input> <!-- 这里指代一个自定义搜索框组件 -->
              </bm-auto-complete>
            </bm-control>
            <bm-local-search :keyword="details" :auto-viewport="true" style="position: absolute;top: 0;right: 0"></bm-local-search>
          </baidu-map>
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
  import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
  import BapView from 'vue-baidu-map/components/map/MapView.vue'
  import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
  export default {
    data(){
      return {
        zoom: 3,　 //地图展示级别
        ruleForm:{},
        center:{
          lng: 0,
          lat: 0,
        },
        addressX1:'',
        addressY1:'',
        details:'',
        company:'',
        location:'成都',
      }
    },
    components:{
      BaiduMap,BapView,BmLocalSearch
    },
    methods:{
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.zoom = 15
      },
      transitionCode(lat,lon){
        var tx_lat;
        var tx_lon;
        var x_pi=3.14159265358979324;
        var x = lon - 0.0065, y = lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        tx_lon = z * Math.cos(theta);
        tx_lat = z * Math.sin(theta);

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let coordinate = []
            var tx_lat;
            var tx_lon;
            var x_pi=3.14159265358979324;
            var x = this.addressX1 - 0.0065, y = this.addressY1 - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
            tx_lon = z * Math.cos(theta);
            tx_lat = z * Math.sin(theta);
            coordinate.push(tx_lat)
            coordinate.push(tx_lon)
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
      point(e){
        this.addressX1 = e.point.lng;
        this.addressY1 = e.point.lat;
      }
    },
    created(){
      this.$axios.post('/map/read').then((response)=>{
        if(response.data.status === 200){
          this.ruleForm = response.data.data
          this.addressX1 = response.data.data.coordinate[0]
          this.addressY1 = response.data.data.coordinate[1]
          this.center.lng = response.data.data.coordinate[0]
          this.center.lat = response.data.data.coordinate[1]
          this.details = response.data.data.details
          this.company = response.data.data.company
        }
      })
    },
    mounted(){
      this.$nextTick(function () {

      })
    }
  }
</script>
<style scoped lang="scss">
  .map{
    width: 100%;
    height: 500px;
    .anchorBL{display: none;}
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
