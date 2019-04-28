<template>
  <div class="store">
    <header>
      <h3>店铺管理</h3>
    </header>
    <section class="store-main">
      <div class="store-left">

      </div>
      <div class="store-right">
        <el-form ref="storeForm" :model="storeForm" :rules="rules" class="demo-ruleForm" label-width="160px" label-position="left">
          <el-form-item label="店铺名字" prop="name">
            <el-col :span="6">
              <el-input v-model="storeForm.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="店铺LOGO" prop="logo">
            <el-upload
              :action="url+'/upload/upload'"
              list-type="picture-card"
              name="image"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="店铺图片" prop="picture">
            <el-upload
              :action="url+'/upload/upload'"
              name="image"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="店铺介绍" prop="introduce">
            <el-col :span="12">
            <el-input type="textarea" v-model="storeForm.introduce" :rows="6"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="店铺电话" prop="mobile">
            <el-col :span="12">
            <el-input v-model="storeForm.mobile"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="店铺公告" prop="notice">
            <el-col :span="12">
            <el-input v-model="storeForm.notice"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="二维码">
            <div>
              <el-col :span="12">
              <el-input v-model="storeForm.qrcode"></el-input>
              </el-col>
              <el-button type="primary" @click="qrcode">生成二维码</el-button>
            </div>
            <div id="qrcode" ref="qrcode"></div>
          </el-form-item>
          <!--<el-form-item label="配送时间 " prop="name">
            <span style="float: left">平均配送 &nbsp;</span><el-input v-model="storeForm.name" style="width: 50px"></el-input> &nbsp;分钟
          </el-form-item>
          <el-form-item label="配送方式" prop="region">
            <el-select v-model="storeForm.region" placeholder="请选择配送方式">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起送价" prop="mobile">
            <el-input v-model="storeForm.mobile" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="配送价" prop="mobile">
            <el-input v-model="storeForm.mobile" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="送餐范围" prop="mobile">
            <el-input v-model="storeForm.mobile" style="width: 100px"></el-input> 米
          </el-form-item>-->
          <el-form-item label="营业时间" required>
            <el-col :span="4">
              <el-form-item prop="date1">
                <el-time-picker
                  v-model="storeForm.date1"
                  :picker-options="{selectableRange: '8:00:00 - 20:30:00'}"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">至</el-col>
            <el-col :span="5">
              <el-form-item prop="date2">
                <el-time-picker
                  v-model="storeForm.date2"
                  :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="店铺位置">
            <div style="height: 50px">
              <div class="area">
                <area-select :level="2" type="text" v-model="ruleForm.selected" style="display: inline-block;margin-left: 0"></area-select>
                <el-input style="width: 300px;" v-model="storeForm.address"></el-input>
              </div>
            </div>
            <div class="area">
              <el-input v-model="details" placeholder="请输入内容" id="suggestId" style="width: 360px;display: inline-block"></el-input>
            </div>
            <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" @click="getPoint" :scroll-wheel-zoom="true" ak="G9m6LPU7ON0OVxZmwLYQhyg7t3tCAD24">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
              <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
              <bm-local-search :keyword="details" :auto-viewport="true" location="成都" zoom="12.8"></bm-local-search>
            </baidu-map>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('storeForm')">立即创建</el-button>
            <el-button @click="resetForm('storeForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
  import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
  import QRCode from 'qrcodejs2'
  export default {
    nema: 'store',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        storeForm: {
          name: '',
          qrcode:'',
          address:'',
          picture:[],
          logo:[],
          introduce:'',
          mobile:'',
          notice:'',
        },
        rules: {
          name: [
            {required: true, message: '请输入店铺名字', trigger: 'blur'}
          ],
          logo: [
            {required: true, message: '请上传店铺logo', trigger: 'blur'}
          ],
          picture: [
            {required: true, message: '请上传店铺图片,至少上传一张图片', trigger: 'blur'}
          ],
          introduce: [
            {required: true, message: '请输入店铺介绍', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入店铺联系电话', trigger: 'blur'}
          ],
          notice: [
            {required: true, message: '请输入店铺公告', trigger: 'blur'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          region: [
            {required: true, message: '请选择分类', trigger: 'change'}
          ]
        },
        zoom: 3,　 //地图展示级别
        ruleForm:{},
        center:{
          lng: "104.083897",
          lat: "30.558967",
        },
        details:'',
        locations:'',
        //二维码

      }
    },
    methods: {
      handleRemove(file, fileList) {
        if(file.status ==="success"){
          this.ruleForm.pictures.splice(this.ruleForm.pictures.indexOf(file),1)
        }else {
          return false
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //地图
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
        this.center.lng = e.point.lng;
        this.center.lat = e.point.lat;
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
      //二维码
      qrcode () {
        document.getElementById("qrcode").innerHTML = "";
        let qrcode = new QRCode('qrcode', {
          width: 232,  // 设置宽度
          height: 232, // 设置高度
          colorDark: "#000000",
          colorLight: "#ffffff",
          text: this.storeForm.qrcode
        })
      },
    },
    mounted(){
      this.$nextTick(function () {
        var ac = new BaiduMap.BMap.Autocomplete({"input": "suggestId","location": this.locations})
      })
    },
    components:{
      BaiduMap,QRCode
    },
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe {
    overflow: hidden;
    border: 1px solid;
    margin: 0 auto;
  }

  /*
  设置宽高overflow
  */
  @mixin aspect($width,$height) {
    width: $width;
    height: $height;
    overflow: hidden;
  }

  .store {
    header {
      margin-bottom: 60px;
      h3 {
        padding: 10px 0;
      }
    }
    @include aspect(100%, 100%);
    .store-main {
      width: 100%;
      overflow: hidden;
      .store-left{
        width: 20%;
        height: 500px;
        overflow: hidden;
        float: left;
        background-image: url("../../assets/images/shxx.jpg");
        background-size: 100% 100%;
        background-position: 0;
        background-repeat: no-repeat;
        box-sizing: border-box;
      }
      .store-right{
        overflow: hidden;
        float: left;
        width: 80%;
        padding-left: 20px;
        box-sizing: border-box;
      }
    }
  }
  .map{
    width: 100%;
    height: 500px;
    .anchorBL{display: none;}
  }
  #qrcode{
    margin-top: 20px;
  }
</style>
