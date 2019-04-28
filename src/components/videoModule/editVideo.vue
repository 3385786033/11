<template>
  <div class="addvidel">
    <header>
      <h3>编辑视频</h3>
    </header>
    <section class="addvideo-main">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="选择分类">
          <el-select v-model="ruleForm.video_group_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称" prop="name">
          <el-input style="width: 300px" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="上传视频" prop="path">
          <el-upload
            :action="url+'/upload/video'"
            name="video"
            :file-list="videos"
            :on-success="videohandleVideoSuccess"
            :before-upload="videohandleUpload"
            :on-remove="videohandleRemove"
            :on-change="videonFilesAdded">
            <el-button size="small" type="primary" :disabled="updateBtn">点击上传</el-button>
          </el-upload>
          <div class="video-list">
            <ul>
              <li v-for="item in videoList">
                <video :src="item" controls="controls" class="videoClass"></video>
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item label="视频封面" prop="preview_picture">
          <el-upload
            :action="url+'/upload/upload'"
            list-type="picture-card"
            name="image"
            :file-list="picture"
            :on-preview="imghandlePictureCardPreview"
            :on-success="imghandleVideoSuccess"
            :on-change="imgonFilesAdded"
            :before-upload="beforeAvatarUpload"
            :on-remove="imghandleRemove">
            <div slot="tip" class="el-upload__tip">最多只能上传1张，且不超过2M， 建议尺寸500*500</div>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="视频描述" prop="description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="ruleForm.description"style="width: 600px">
          </el-input>
        </el-form-item>
        <el-form-item label="虚拟价格" prop="virtual_price">
          <el-input style="width: 60px" v-model="ruleForm.virtual_price"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="real_price">
          <el-input style="width: 60px" v-model="ruleForm.real_price"></el-input><span>元</span>
        </el-form-item>
        <el-form-item label="库存" prop="store">
          <el-input style="width: 60px" v-model="ruleForm.store"></el-input><span>个</span>
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input style="width: 60px" v-model="ruleForm.sales"></el-input><span>个</span>
        </el-form-item>
        <el-form-item label="推荐" prop="delivery">
          <el-switch v-model="ruleForm.recommend_status"></el-switch>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="ruleForm.putaway_status"></el-switch>
        </el-form-item>
        <el-form-item label="相关视频">
          <el-checkbox-group v-model="ruleForm.related_video">
            <el-checkbox :label="item.id" v-for="(item,index) in checkboxs" :key="index" style="margin: 0">
              <div class="checkboxs">
                <img :src="item.preview_picture[0]" :alt="item.preview_picture[0]" class="checkboxs_img">
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        textarea3:'',
        dialogImageUrl:'',
        dialogVisible:false,
        //表单
        picture:[],
        videos:[],
        videoList:[],
        ruleForm: {
          video_group_id:'',
          name:'',
          preview_picture:[],
          view_type:'',
          path:'',
          virtual_price:'',
          real_price:'',
          store:'',
          sales:'',
          related_video:[]
        },
        rules:{
          name:[
            {required: true, message: '名称不能为空', trigger: 'blur'},
            { min: 1, max: 28, message: '长度在 1 到 28 个字符', trigger: 'blur' }
          ],
          path:[
            {required: true, message: '至少上传一个视频', trigger: 'blur'}
          ],
          preview_picture:[
            {type:'array',required: true, message: '至少添加一张图片', trigger: 'blur'}
          ],
          description:[
            {required: true, message: '请填写视频描述', trigger: 'blur'},
            { min: 1, max: 120, message: '长度在 1 到 120 个字符', trigger: 'blur' }
          ],
          virtual_price:[
            {required: true, message: '请填写虚拟价格', trigger: 'blur'}
          ],
          real_price:[
            {required: true, message: '请填写价格', trigger: 'blur'}
          ],
          store:[
            {required: true, message: '请填写库存', trigger: 'blur'}
          ],
          related_video:[
            {type: 'array',required: true, message: '至少上选择一个视频', trigger: 'blur'}
          ]
        },
        options:[],
        value:'',
        updateBtn:false,
        checkboxs:[]
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      //上传图片
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      imghandleRemove(file, fileList) {
        if(file.status ==="success"){
          this.ruleForm.preview_picture.splice(this.ruleForm.preview_picture.indexOf(file),1)
        }else {
          return false
        }
      },
      imghandlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      imghandleVideoSuccess(response,file, fileList){
        this.ruleForm.preview_picture.push(response.data.image_url)
        this.$refs.ruleForm.validateField('preview_picture');
        return this.ruleForm.preview_picture
      },
      imgonFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      //上传视频
      videonFilesAdded(file,fileList){

      },
      beforeUploadVideo(file){
        const isLt100M = file.size / 1024 / 1024  < 100;
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb','video/mp4','video/mov','video/3gp','video/mtv','video/dat','video/mpeg1-4',].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式');
          return false;
        }
        if (!isLt100M) {
          this.$message.error('上传视频大小不能超过10MB哦!');
          return false;
        }
      },
      videohandleVideoSuccess(response,file, fileList){
        this.videoList.push(file.url)
        this.ruleForm.path = response.data.video_url
        return this.videoList
      },
      videohandleRemove(file, fileList){
        this.updateBtn = false
        this.videoList.pop(0,1)
        return this.videoList
      },
      videohandleUpload(file){
        const isLt10M = file.size / 1024 / 1024  < 10;
        if (!isLt10M) {
          this.$message.error('上传视频大小不能超过10MB哦!');
          return false;
        }
        if(this.videoList.length >= 0){
          this.updateBtn = true
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let statusVal = ''
            if(this.ruleForm.recommend_status === true){
              statusVal = 1
            }else {
              statusVal = 0
            }
            //上下架
            let statusVideo = ''
            if(this.ruleForm.putaway_status === true){
              statusVideo = 1
            }else {
              statusVideo = 0
            }
            let databesedit = {
              id:this.$route.query.data,
              video_group_id:this.ruleForm.video_group_id,
              name:this.ruleForm.name,
              description:this.ruleForm.description,
              path:this.ruleForm.path,
              preview_picture:this.ruleForm.preview_picture,
              virtual_price:this.ruleForm.virtual_price,
              real_price:this.ruleForm.real_price,
              store:this.ruleForm.store,
              sales:this.ruleForm.sales,
              recommend_status:statusVal,
              putaway_status:statusVideo,
              related_video:this.ruleForm.related_video
            }
            this.$axios.post("/video/update",databesedit).then((response) =>{
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
      this.$axios.post('/video_group/indexAll').then((response)=>{
        if(response.status === 200){
          this.options = response.data.data
        }
      })
      this.$axios.post('/video/read',{id:this.$route.query.data}).then((response)=>{
        if(response.status === 200){
          this.ruleForm = response.data.data
          if(response.data.data.recommend_status === 0){
            this.ruleForm.recommend_status = false
          }else {
            this.ruleForm.recommend_status = true
          }
          //上下架
          if(response.data.data.putaway_status === 0){
            this.ruleForm.putaway_status = false
          }else {
            this.ruleForm.putaway_status = true
          }
          //图片
          for(let i in response.data.data.preview_picture){
            let pictures = {
              uid:Math.floor(Math.random()*10+1),
              status:200,
              url:response.data.data.preview_picture[i]
            }
            this.picture.push(pictures)
          }
          //视频
          if(response.data.data.path !== ''){
            this.updateBtn = true
          }else {
            this.updateBtn = false
          }
          this.videoList.push(response.data.data.path)
          let videoMes = {
            name:response.data.data.name,
            url:response.data.data.path
          }
          this.videos.push(videoMes)
          //
          //this.related_video = response
        }
      })
      this.$axios.post('/video/index').then((response)=>{
        if(response.data.status === 200){
          this.checkboxs = response.data.data.data
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .addvidel{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
    }
    .addvideo-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
      .video-list{
        width: 80%;
        max-height:500px;
        overflow-y: scroll;
        ul{
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          li{
            width: 210px;
            height: 210px;
            padding: 5px;
            float: left;
            margin-right: 5px;
            border-radius: 5px;
            border: 1px dashed #dddddd;
            .videoClass{
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          }
        }
      }
      .checkboxs{
        width: 148px;
        height: 148px;
        padding: 5px;
        display: inline-block;
        margin-right: 5px;
        border-radius: 5px;
        border: 1px dashed #dddddd;
      }
      .checkboxs_img{
        width: 100%;
        height: 100%;
        display: block;
        overflow: hidden;
      }
      .related_video{
        margin-top: 10px;
        width: 100%;
        min-height: 200px;
        border: 1px dashed #dddddd;
        overflow: hidden;
      }
    }
  }
</style>
