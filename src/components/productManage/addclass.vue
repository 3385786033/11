<template>
  <div class="addClass">
    <header>
      <h3>添加分类</h3>
    </header>
    <section class="addClass-main">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon="true">
        <el-form-item label="上级分类" prop="parent_group">
          <el-col :span="8">
            <el-select v-model="ruleForm.parent_group" placeholder="请选择" :disabled="isFaClass">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.name">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="分类排序" prop="order">
          <el-col :span="8">
            <el-input v-model="ruleForm.order" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="分类图片" prop="picture">
          <el-upload
            :action="url+'/upload/upload'"
            name="image"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-change="onFilesAdded"
            :on-success="hans"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove">
            <div slot="tip" class="el-upload__tip">最多只能上传1张，且不超过2M，建议尺寸500*500</div>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="分类名称" prop="classname">
          <el-col :span="8">
            <el-input v-model="ruleForm.name" :maxlength="4"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述" prop="desc" >
          <el-input type="textarea" v-model="ruleForm.description" :maxlength="120" :rows="8"></el-input>

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
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
  export default {
    nema: 'addclass',
    data () {
      return {
        ruleForm: {
          parent_group: '',
          picture:[],
          name:'',
          order:'',
          description: '',
          parent_group_id:''
        },
        dialogVisible: false,
        dialogImageUrl:'',
        options:[],
        isFaClass:null,
        versionsType:null
      }
    },
    methods: {
      returnbtn(){
        this.$router.go(-1)
      },
      handleRemove(file, fileList) {
        if(file.status ==="success"){
          this.ruleForm.picture.splice(this.ruleForm.picture.indexOf(file),1)
          return this.ruleForm.picture
        }else {
          return false
        }
      },
      onFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(0,1)
        }else {
          return fileList
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      hans(response, file, fileList){
        let ponse = {
          uid:file.uid,
          url:response.data.image_url,
          status:file.status
        }
        this.ruleForm.picture.push(ponse)
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
            for(let i in this.options){
              if(this.options[i].name === this.ruleForm.parent_group){
                this.ruleForm.parent_group_id = this.options[i].product_group_id
              }
            }
            if(this.isFaClass = true){
              this.ruleForm.parent_group = ''
            }else {

            }
            this.$axios.post('/product_group/addProductGroup',this.ruleForm).then((response) =>{
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
      resetForm() {
        this.$router.go(-1)
      }
    },
    created(){
      this.$axios.post('/user/getVersion').then((response)=> {
        this.versionsType = response.data.data.version
        if(response.data.data.version === 'base'){
          this.isFaClass = true
        }else {
          this.isFaClass = false
        }
      })
      this.$nextTick(function () {
        this.$axios.post('/product_group/getProductGroupListAll').then((response)=>{
            if(response.data.status===200){
              this.options = response.data.data
            }else {
              this.$message({
                showClose: true,
                message: '获取分类失败！',
                type: 'error'
              });
            }
          })
      })
    },
    updated:function(){
      if(this.versionsType === 'base'){
        this.isFaClass = true
      }else {
        this.isFaClass = false
      }
    },
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
