<template>
  <div class="newArticletxt">
    <header>
      <h3>新增文章</h3>
    </header>
    <section class="newArticletxt-main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="选择分类">
          <el-select v-model="form.article_group_id" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.article_group_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input style="width: 300px" v-model="form.title" :maxlength="28"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            :action="url+'/upload/upload'"
            name="image"
            list-type="picture-card"
            :on-success="edithandleAvatarSuccess"
            :on-change="onFilesAdded"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload"
            :on-error="handleError"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">最多只能上传1张，且不超过2M, 建议尺寸500*500</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="正文">
          <div class="editor-container" style="width: 1000px;margin-bottom: 100px">
            <quill-editor
              v-model="form.description"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input style="width: 300px" v-model="form.keywords" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-switch v-model="form.recommend"></el-switch>
        </el-form-item>
        <el-form-item label="上下架">
          <el-switch v-model="form.is_push"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="returnbtn">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  import {quillRedefine} from 'vue-quill-editor-upload'
  import {quillEditor} from 'vue-quill-editor'
  export default {
    components: {quillEditor, quillRedefine},
    data () {
      return {
        dialogVisible: false,
        options:[],
        dialogImageUrl: '',
        headh1:this.$route.query.edit,
        form: {
          article_group_id:'',
          title:'',
          picture:[],
          description:'',
          keywords:'',
          recommend:false,
          is_push:false
        },
        //富文本
        serverUrl:this.url+'/common/upload_description',
        editorOption:{},
      }
    },
    methods: {
      returnbtn(){
        this.$router.go(-1)
      },
      handleRemove(file, fileList) {
        if(file.status ==="success"){
          this.form.picture = ''
          return  this.form.picture
        }else {
          return false
        }
      },
      onFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      edithandleAvatarSuccess(res, file) {
        if(res.status === 200){
          let imgdata = {
            uid:res.uid,
            status:res.status,
            url:res.data.image_url
          }
          if(this.form.picture.length >= 1){
            this.form.picture.splice(this.form.picture.length,1)
          }else {
            this.form.picture.push(imgdata)
          }
        }else {
          this.$message({showClose: true, message: res.message, type: 'error'});
        }
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleError(err, file, fileList){
        console.log(err)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let databes = {
                title:this.form.title,
                description:this.form.description,
                picture:this.form.picture,
                article_group_id:this.form.article_group_id,
                keywords:this.form.keywords,
                recommend:this.form.recommend,
                is_push:this.form.is_push
              }
              //console.log(databes)
              this.$axios.post("/article/addArticle",databes).then((response) =>{
                if(response.data.status === 1){
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
      //富文本
      onEditorBlur(){//失去焦点事件
      },
      onEditorFocus(){//获得焦点事件
      },
      onEditorChange(){//内容改变事件
      },
      onEditorReady(){
      }
    },
    created(){
      this.editorOption = quillRedefine({
        // 图片上传的设置
        uploadConfig: {
          action: this.serverUrl,  // 必填参数 图片上传地址
          methods: 'POST',
          res: (respnse) => {
            //console.log(respnse)
            return respnse.result.img
          },
          name: 'image',  // 图片上传参数名
          size: 1024*5,
          success: () => {

          },
        }
      })
      this.$axios.post('/article_group/getArticleGroupList') .then((response)=>{
          if (response.data.status === 200) {
            this.options = response.data.data.data
          } else {
            this.$message({showClose: true, message: response.data.message, type: 'error'});
          }
        })
    }
  }
</script>
<style scoped lang="scss">
  .newArticletxt{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
    }
    .newArticletxt-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    .avatar-uploader{
      .el-upload{
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .quill-editor {
      height: 400px;
      min-height: 500px !important;
      .ql-container {
        height: 180px;
      }
    }
    .ql-snow .ql-editor img {
      max-width: 480px;
    }
    .ql-editor .ql-video {
      max-width: 480px;
    }
  }
</style>
