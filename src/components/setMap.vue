<template>
  <div class="setMap">
    <header>
      <h3>地图设置</h3>
    </header>
    <section class="setMap-main">
      <el-form ref="ruleForm" :model="ruleForm" label-width="120px">
        <el-form-item label="输入地址">
          <div class="area">
            <el-input v-model="details" placeholder="请输入内容" id="suggestId" style="width: 360px;display: inline-block"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="输入坐标" >
          <span>X轴:</span><el-input v-model="addressX1" placeholder="请输入内容" style="width: 100px;"></el-input>
          <span>Y轴:</span><el-input v-model="addressY1" placeholder="请输入内容" style="width: 100px;"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" @click="getPoint" :scroll-wheel-zoom="true" ak="G9m6LPU7ON0OVxZmwLYQhyg7t3tCAD24">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-local-search :keyword="details" :auto-viewport="true" location="成都" zoom="12.8"></bm-local-search>
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
  export default {
    data(){
      return {
        zoom: 3,　 //地图展示级别
        ruleForm:{},
        center:{
          lng: "",
          lat: "",
        },
        addressX1:'',
        addressY1:'',
        details:'',
        locations:'',
      }
    },
    components:{
      BaiduMap
    },
    methods:{
      handler ({BMap, map}) {
        //console.log(BMap, map)
        var ac = new BMap.Autocomplete({"input": "suggestId","location": this.locations})
        this.zoom = 15
        let _this = this;  // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          _this.center = {lng: r.longitude, lat: r.latitude};   // 设置center属性值
          _this.center = {lng: r.longitude, lat: r.latitude};   // 自定义覆盖物
          _this.initLocation = true;
          //console.log('center:', _this.center)  // 如果这里直接使用this是不行的
        },{enableHighAccuracy: true})
      },
      //获取地图点击的经纬度
      getPoint(e){
        console.log(e.point)
        this.addressX1 = e.point.lng;
        this.addressY1 = e.point.lat;
        /*this.center.lng = e.point.lng;
        this.center.lat = e.point.lat;*/
        let geocoder= new BaiduMap.BMap.Geocoder();  //创建地址解析器的实例
        geocoder.getLocation(e.point,rs=>{
          //地址描述(string)=
          this.details = rs.address
           console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
          // console.log(rs.addressComponents);//结构化的地址描述(object)
           console.log(rs.addressComponents.province); //省
           console.log(rs.addressComponents.city); //城市
           console.log(rs.addressComponents.district); //区县
           console.log(rs.addressComponents.street); //街道
           console.log(rs.addressComponents.streetNumber); //门牌号
           console.log(rs.surroundingPois); //附近的POI点(array)
           console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let coordinate = []
            coordinate.push(this.addressX1)
            coordinate.push(this.addressY1)
            let databesedit = {
              coordinate:coordinate,
              details:this.details
            }
            //console.log(this.ruleForm.details)
            this.$axios.post("/map/update",databesedit).then((response) =>{
              if(response.data.status === 200){
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
          this.center.lng = response.data.data.coordinate[0]
          this.center.lat = response.data.data.coordinate[1]
          this.details = response.data.data.details
        }
      })
    },
    mounted(){
      this.$nextTick(function () {
        var ac = new BaiduMap.BMap.Autocomplete({"input": "suggestId","location": this.locations})
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
