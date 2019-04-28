<template>
  <div class="addClass">
    <header>
      <h3>编辑用户分类</h3>
    </header>
    <section class="addClass-main">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon="true">
        <el-form-item label="分类名称" prop="name">
          <el-col :span="8">
            <el-input v-model="ruleForm.name" :maxlength="4" :minlength="1"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="分类图片" prop="picture">
          <el-upload
            :action="url+'/upload/upload'"
            name="image"
            list-type="picture-card"
            :limit="2"
            :file-list="picture"
            :on-preview="handlePictureCardPreview"
            :on-success="hans"
            :before-upload="beforeAvatarUpload"
            :on-change="onFilesAdded"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="描述" prop="desc" >
          <el-input type="textarea" v-model="ruleForm.description" :rows="8" :maxlength="120"></el-input>
          <!--<div class="editor-container">
            <UE :defaultMsg=ruleForm.description :config=config ref="ue"></UE>
          </div>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        dialogImageUrl:'',
        dialogVisible:false,
        imgurl:'',
        ruleForm: {
          picture:'',
          name:'',
          description: ''
        },
        picture:[],
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$axios.post('/customer_group/editCustomerGroup',this.ruleForm).then((response) =>{
                  //console.log(this.ruleForm)
                  if(response.data.status === 1){
                    this.$message({
                      showClose: true,
                      message: response.data.message,
                      type: 'success'
                    });
                    this.$router.go(-1);
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
      resetForm(formName) {
        this.$router.go(-1)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.ruleForm.picture = file.url;
        this.dialogVisible = true;
      },
      returnbtn(){
        this.$router.go(-1)
      },
      onFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      hans(response, file, fileList){
        this.ruleForm.picture = response.data.image_url
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
    },
    created(){
      this.$nextTick(function () {
        this.$axios.post('/customer_group/getCustomerGroupDetail',{'customer_group_id':this.$route.query.data}).then((response)=>{
          this.ruleForm = response.data.data
          //判断图片是否为空
          if(response.data.data.picture === '' || response.data.data.picture === null ||response.data.data.picture === undefined){
            this.picture = ''
          }else {
            let pictures = {
              uid:Math.floor(Math.random()*10+1),
              status:200,
              url:response.data.data.picture
            }
            this.picture.push(pictures)
          }
        })
      })
    },
    components: {

    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    border: 1px solid;
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
  .addClass{
    @include aspect(100%,100%);
    header{
      height: 60px;
      width: 100%;
      overflow: hidden;
      h3{
        float: left;
      }
      .btn-primary{
        margin-top: 10px;
        margin-right: 300px;
        float: right;
      }
    }
    .addClass-main{
      height: 100%;
      width: 70%;
    }
  }
</style>
