<template>
  <div class="addclassvideo">
    <header>
      <h3>添加分类</h3>
    </header>
    <section >
      <el-form ref="ruleForm" :model="ruleForm" label-width="120px">
        <el-form-item label="选择分类">
          <el-select v-model="ruleForm.father_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频图片" prop="cover_picture">
          <el-upload
            :action="url+'/upload/upload'"
            list-type="picture-card"
            name="image"
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
        <el-form-item label="分类名称">
          <el-input style="width: 300px" v-model="ruleForm.name" :maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            :maxlength="120"
            v-model="ruleForm.description"style="width: 600px">
          </el-input>
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
  export default {
    data () {
      return {
        textarea3:'',
        ruleForm: {
          father_id:'',
          name:'',
          cover_picture:'',
          description:''
        },
        dialogImageUrl:'',
        dialogVisible:false,
        //图片验证
        /*rules:{
          cover_picture:[
            { required: true, message: '至少添加一张图片', trigger: 'blur'}
          ],
        },*/
        options:[]
      }
    },
    methods:{
      //上传图片
      imghandleRemove(file, fileList) {
        if(file.status ==="success"){
          this.ruleForm.cover_picture = ''
        }else {
          return false
        }
      },
      imghandlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      imghandleVideoSuccess(response,file, fileList){
        this.ruleForm.cover_picture = response.data.image_url
        //清除图片验证文字
       // this.$refs.ruleForm.validateField('cover_picture');
        return this.ruleForm.cover_picture
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      imgonFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let databesedit = {
              father_id:this.ruleForm.father_id,
              name:this.ruleForm.name,
              cover_picture:this.ruleForm.cover_picture,
              description:this.ruleForm.description,
            }
            this.$axios.post("/video_group/save",databesedit).then((response) =>{
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
      resetForm(){
        this.$router.go(-1)
      }
    },
    created(){
      this.$axios.post('/video_group/indexAll').then((response)=>{
        if(response.status === 200){
          this.options = response.data.data
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .addclassvideo{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
      .head-left{
        margin-top: 20px;
        float: left;
        margin-left: 20px;
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .videoList-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
