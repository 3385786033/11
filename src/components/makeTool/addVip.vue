<template>
  <div class="addVip">
    <header>
      <h3>添加会员卡</h3>
      <div  class="head-right">
        <button type="button" class="btn btn-primary" @click="back">返回</button>
      </div>
    </header>
    <section class="addVip-main">
      <div class="addVip-mainLeft">
        <div
          v-bind:style="{
          'background-image':'url('+imageUrl+')',
          'background-repeat':'no-repeat',
          'background-size':'100% 100%',
          'background-color':form.color}"
          class="cread">
          <header>
            <div class="cread-right">
              <p>{{ form.name }}</p>
            </div>
          </header>
          <div class="footers" :style="'backgroundColor:'+form.background_color">
            <p v-if="isshowtime">有效期：<span>{{rise}}</span> 到 <span>{{over}}</span></p>
            <p v-else>有效期：无期限</p>
          </div>
        </div>
      </div>
      <div class="addVip-mainRight">
        <el-form ref="form" :model="form">
          <el-form-item label="卡片封面：">
            <el-radio-group v-model="form.cover" style="padding-top: 10px" @change="select">
              <div class="colors">
                <el-radio label="背景颜色"></el-radio>
                <div class="block" style="float: right;margin-left: 30px">
                  <span class="demonstration">有默认值</span>
                  <el-color-picker v-model="form.color"></el-color-picker>
                </div>
              </div>
              <div>
                <el-radio label="上传图片">
                </el-radio>
                <div style="float: right;margin-left: 30px">
                  <el-upload
                    :action="url+'/upload/upload'"
                    name="image"
                    list-type="picture-card"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-change="onFilesAdded"
                    :on-error="uploderror"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="form.picture" alt="">
                  </el-dialog>
                </div>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="会员卡名称：">
            <el-input v-model="form.name" style="width: 240px" :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="会员卡级别：">
            <el-input v-model="form.level" :maxlength="10" style="width: 240px"></el-input>
          </el-form-item>
          <el-form-item label="会员权益">
            <div>
              <el-checkbox-group v-model="form.type1">
                <el-checkbox label="会员折扣" name="type">会员折扣 <el-input v-model="form.discount" style="width: 60px"></el-input></el-checkbox> 折
                <span style="font-size: 12px;color: red;margin-left: 10px">*会员折扣需大于等于0.5并小于10</span>
              </el-checkbox-group>
            </div>
            <div style="margin-left: 87px">
              开卡赠送 <el-input v-model="form.point" style="width: 60px"></el-input>积分
            </div>
          </el-form-item>
          <el-form-item label="条件">
            <div>
              <el-radio-group v-model="form.resource">
                <el-radio label="无门槛条件"></el-radio>
              </el-radio-group>
            </div>
            <div>
              <el-radio-group v-model="form.resource">
                <el-radio label="按条件获取"></el-radio>
              </el-radio-group>
              <div v-if="true" style="margin-left: 10px">
                <p style="padding-left: 65px">累计成功交易 <el-input v-model="form.count" style="width: 80px"></el-input> 笔</p>
                <p style="padding-left: 65px">累计积分达到 <el-input v-model="form.points" style="width: 80px"></el-input> 分</p>
                <p style="padding-left: 65px">累计消费金额 <el-input v-model="form.sum" style="width: 80px"></el-input> 元</p>
                <p style="padding-left: 65px">单次消费金额 <el-input v-model="form.total" style="width: 80px"></el-input> 元</p>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="会员卡期限">
            <div>
              <el-radio-group v-model="form.time">
                <el-radio label="无限期"></el-radio>
              </el-radio-group>
            </div>
            <div>
              <el-radio-group v-model="form.time">
                <el-radio label="自定义时间"></el-radio>
              </el-radio-group>
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
          <el-form-item label="联系我们">
            <el-input v-model="form.contact_us" style="width: 280px" ></el-input>
          </el-form-item>
          <el-form-item label="使用须知">
            <el-input type="textarea" v-model="form.attention" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item>
            <button type="button" class="btn btn-primary" @click="submitForm('form')">保 存</button>
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
        dialogVisible:false,
        isshowtime:'',
        imageUrl:'',
        form: {
          cover:'',
          picture:'',
          color:'',
          background_color:'',
          imageUrl:'',
          name: '',
          resource: '',
          type1: '',
          type2:'',
          discount:'',
          point:'',
          desc: '',
          money1:'',
          money2:'',
          money3:'',
          money4:'',
          time:'',
          valid_time:'',
          relation:'',
          attention:'',
          level:''
        },
        rise:'',
        over:'',
        color: '#409EFF',
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
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      //上传图片
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.data.image_url
        this.form.imageUrl = file.url;
        this.form.picture = res.data.image_url
      },
      onFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      uploderror(err, file, fileList){
        console.log(err)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleRemove(file, fileList) {
        //console.log(file, fileList);
      },
      submitForm(formName) {
        let cover = ''
        let resource = ''
        let times = ''
        if(this.form.cover === "背景颜色"){
          this.form.background_color = this.form.color
        }else {
          cover = this.form.picture
        }

        if(this.form.resource === '无门槛条件'){
          resource = ''
        }else {
          resource = {
            count:this.form.count,
            point:this.form.points,
            sum:this.form.sum,
            total:this.form.total
          }
        }
        if(this.form.time ===''){
          times = ''
        }else {
          if(this.form.time === '无限期'){
            times = ''
          }else {
            let getDates = new parson.getTime()
            let rises = getDates.formatTime(this.form.valid_time[0])
            let overs = getDates.formatTime(this.form.valid_time[1])
            let datess = []
            datess.push(rises)
            datess.push(overs)
            times = datess
          }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let senddata = {
              name:this.form.name,
              background_color:this.form.background_color,
              picture:cover,
              point:this.form.point,
              discount:this.form.discount,
              condition:resource,
              valid_time:times,
              contact_us:this.form.contact_us,
              attention:this.form.attention,
              level:this.form.level
            }
            this.$axios.post('/vipcard/addVipcard',senddata).then((response)=>{
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //判断是否是图片或颜色
      select(){
        if(this.form.cover === '上传图片'){
          this.form.color = ''
        }else if(this.form.cover === '背景颜色'){
          this.imageUrl = ''
          this.form.picture = ''
          this.form.imageUrl = ''
        }
      }
    },
    updated(){
      if(this.form.time === '无限期' || this.form.time ===''){
        this.isshowtime = false
      }else {
        let times = this.form.valid_time
        if(times =! ''){
          this.isshowtime = true
          let getDates = new parson.getTime()
          let rises = getDates.formatTime(this.form.valid_time[0])
          let overs = getDates.formatTime(this.form.valid_time[1])
          this.rise = rises
          this.over = overs
        }else {

        }
      }
    },
    computed:{

    },
    created(){
      if(this.form.valid_time === ''){
        this.isshowtime = false
      }
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
  .addVip{
    @include aspect(100%,100%);
    header{
      padding-left: 30px;
      padding-top: 20px;
      margin-bottom: 50px;
      width: 100%;
      overflow: hidden;
      .head-right{
        float: right;
        //margin-top: 20px;
        margin-right: 100px;
      }
    }
    .addVip-main{
      overflow: hidden;
      @include aspect(100%,100%);
      .addVip-mainLeft{
        width: 328px;
        height: 583px;
        float: left;
        background-image: url("https://essocial.win/static/image/backend/common/souji.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .cread{
          width: 90%;
          height: 180px;
          overflow: hidden;
          margin: 100px auto;
          border-radius: 10px;
          border: 1px solid;
          background-color: black;
          position: relative;
          header{
            height: 60px;
            padding: 0;
            margin: 20px 0 0 0;
            box-sizing: border-box;
            overflow: hidden;
            .cread-left{
              height: 50px;
              width: 50px;
              margin-left: 30px;
              overflow: hidden;
              float: left;
              border-radius: 50%;
              img{
                width: 100%;
                height: 100%;
                display: block;
                overflow: hidden;
              }
            }
            .cread-right{
              float: left;
              height: 100%;
              overflow: hidden;
              padding-left: 10px;
              p{
                margin: 0;
                color: #fff;
              }
              p:nth-of-type(1){
                font-weight: bold;
                font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
                margin-top: 5px;
              }
            }
          }
          .footers{
            width: 100%;
            height: 40px;
            margin: 0;
            padding: 0;
            position: absolute;
            bottom: 0;
            color: #fff;
            p{
              padding-left: 30px;
              line-height: 40px;
              margin: 0;
              font-size: 12px;
            }
          }
        }
      }
      .addVip-mainRight{
        width: 50%;
        height: auto;
        float: left;
        overflow: hidden;
        padding-left: 20px;
        .logoImg{
          width: 50px;height: 50px;border: 1px solid;float: left;border-radius: 50%;overflow: hidden;
          img{
            display: block;
            height: 100%;
            width: 100%;
          }
        }
        .messages{
          font-size: 12px;color: red;margin-top: 10px;display: inline-block;
        }
        .colors{
          margin-bottom: 20px;
        }
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 16px;
        color: #8c939d;
        width: 88px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        border: 1px solid;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
</style>
