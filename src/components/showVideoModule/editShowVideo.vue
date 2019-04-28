<template>
  <div class="addvidel">
    <header>
      <h3>编辑展示视频</h3>
    </header>
    <section class="addvideo-main">
      <el-form ref="ruleForm" :model="ruleForm" label-width="120px">
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
        <el-form-item label="视频名称">
          <el-input style="width: 300px" v-model="ruleForm.name" :maxlength="28"></el-input>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :action="url+'/upload/video'"
            name="video"
            class="upload-demo"
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
        <el-form-item label="视频封面">
          <el-upload
            :action="url+'/upload/upload'"
            list-type="picture-card"
            name="image"
            :file-list="picture"
            :before-upload="beforeAvatarUpload"
            :on-preview="imghandlePictureCardPreview"
            :on-success="imghandleVideoSuccess"
            :on-change="imgonFilesAdded"
            :on-remove="imghandleRemove">
            <div slot="tip" class="el-upload__tip">最多只能上传1张，且不超过2M， 建议尺寸500*500</div>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="视频描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="ruleForm.description"style="width: 600px">
          </el-input>
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
        picture:[],
        videos:[],
        //表单
        ruleForm: {
          video_group_id:'',
          name:'',
          preview_picture:[],
          view_type:'',
          path:'',
          recommend_status:'',
          related_video:[]
        },
        //表单验证
        rules:{
          name:[
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          path:[
            {required: true, message: '至少上传一个视频', trigger: 'blur'}
          ],
          preview_picture:[
            {type:'array', required: true, message: '至少添加一张图片', trigger: 'blur'}
          ],
          description:[
            {required: true, message: '请填写备注', trigger: 'blur'}
          ]
        },
        options:[],
        value:'',
        videoList:[],
        relatedvideoList:[],
        updateBtn:false,
        checkboxs:[]
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      //上传图片
      imghandleRemove(file, fileList) {
        this.ruleForm.preview_picture.splice(this.ruleForm.preview_picture.indexOf(file),1)
      },
      imghandlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      imghandleVideoSuccess(response,file, fileList){
        this.ruleForm.preview_picture.push(response.data.image_url)
        return this.ruleForm.preview_picture
      },
      imgonFilesAdded(file,fileList){
        if(fileList.length > 5){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      //上传视频
      videonFilesAdded(file,fileList){

      },
      beforeUploadVideo(file){
        const isLt100M = file.size / 1024 / 1024  < 100;
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
        const isLt10M = file.size / 1024 / 1024  < 100;
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb','video/mp4','video/mov','video/3gp','video/mtv','video/dat','video/mpeg1-4',].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式');
          return false;
        }
        if (!isLt10M) {
          this.$message.error('上传视频大小不能超过100MB哦!');
          return false;
        }
        if(this.videoList.length >= 0){
          this.updateBtn = true
        }
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
            //相关视频
            let relatedVideo = this.ruleForm.related_video
            if(relatedVideo === ''){
              relatedVideo = []
            }else {
              relatedVideo = this.ruleForm.related_video
            }
            let showStatus = this.ruleForm.video_group_id
            if(showStatus === ''){
              this.ruleForm.video_group_id = '0'
            }else {

            }
            let databesedit = {
              id:this.$route.query.data,
              video_group_id:this.ruleForm.video_group_id,
              name:this.ruleForm.name,
              description:this.ruleForm.description,
              path:this.ruleForm.path,
              preview_picture:this.ruleForm.preview_picture,
              related_video:relatedVideo
            }
            //console.log(databesedit)
            this.$axios.post("/video_demo/update",databesedit).then((response) =>{
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
      this.$axios.post('/video_demo/read',{id:this.$route.query.data}).then((response)=>{
        if(response.status === 200){
          this.ruleForm = response.data.data
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

          //没有传分类的情况
          if(response.data.data.video_group_id === 0){
            this.form.video_group_id = ''
          }
        }
      })
      this.$axios.post('/video_group_demo/index').then((response)=>{
        if(response.status === 200){
          this.options = response.data.data.data
        }
      })
      this.$axios.post('/video_demo/index').then((response)=>{
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
