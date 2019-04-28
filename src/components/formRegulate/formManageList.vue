<template>
  <div class="formManageList">
    <header>
      <h3>表单列表</h3>
      <div class="formManageList-btn">
        <button type="button" class="btn btn-primary" @click="formback">返回</button>
        <button type="button" class="btn btn-primary" @click="addformManageList">添加</button>
      </div>
    </header>
    <div class="formManageList-main">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">

          </el-table-column>
          <el-table-column
            prop="name"
            label="字段名">

          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">

          </el-table-column>
          <el-table-column
            label="图片"
            prop="picture1"
            width="160">
            <template slot-scope="scope">
              <img :src="scope.row.icon" alt="" width="50" height="50"v-if="scope.row.type ==='封面'">
              <img :src="scope.row.picture" alt="" width="50" height="50" v-else>
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
                size="mini"
                :disabled="fsnumShow"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.is_delete"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="margin: 20px auto;">
        <el-pagination
          background
          layout="prev, pager, next"
          align="center"
          :pager-count="currentPage"
          :page-size="pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChanges"
          :total="sum">
        </el-pagination>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <div v-if="isShows" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>添加表单</span> <i class="el-icon-close clos" @click="isShows = !isShows"></i></p>
          </div>
          <div class="buyBambino-main">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="类型">
                <el-col :span="12">
                 <span>表单框 </span>
                </el-col>
              </el-form-item>
              <el-form-item label="字段名">
                <el-col :span="12">
                  <el-input v-model="form.name" :maxlength="4"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="描述">
                <el-col :span="12">
                  <el-input v-model="form.description" :maxlength="15"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  :action="url+'/upload/upload'"
                  name="image"
                  list-type="picture-card"
                  :on-success="addhandleAvatarSuccess"
                  :on-change="addonFilesAdded"
                  :on-preview="addhandlePictureCardPreview"
                  :before-upload="beforeAvatarUpload"
                  :on-remove="addhandleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibles">
                  <img width="100%" :src="dialogImageUrls" alt="">
                </el-dialog>
                <div class="el-upload__tip">*最多只能上传1张，单张不超过2M，建议宽度尺寸50*50</div>
              </el-form-item>
              <el-form-item>
                <button type="button" class="btn btn-primary" @click="submitForm('form')">立即保存</button>
                <el-button @click="resetForm()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </transition>

    <transition name="el-fade-in-linear">
      <div v-if="Shows" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>编辑表单</span> <i class="el-icon-close clos" @click="Shows = !Shows"></i></p>
          </div>
          <div class="buyBambino-main">
            <el-form ref="forms" :model="forms" label-width="120px">
              <el-form-item label="类型">
                <el-col :span="12">
                  <span>{{ text }}</span>
                </el-col>
              </el-form-item>
              <el-form-item label="字段名" v-if="isName">
                <el-col :span="12">
                  <el-input v-model="forms.name" :maxlength="4"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="描述">
                <el-col :span="12">
                  <el-input v-model="forms.description" :maxlength="15"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="图标" v-if="isPictures">
                <el-upload
                  ref="upload"
                  :action="url+'/upload/upload'"
                  name="image"
                  list-type="picture-card"
                  :file-list="forms.picture"
                  :on-success="pichandleAvatarSuccess"
                  :on-preview="pichandlePictureCardPreview"
                  :on-change="piconFilesAdded"
                  :before-upload="beforeAvatarUpload"
                  :on-remove="pichandleRemove">
                  <div slot="tip" class="el-upload__tip">*最多只能上传1张，单张不超过2M，建议宽度尺寸50*50</div>
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <el-form-item label="封面图片" v-else>
                <el-upload
                  ref="upload"
                  :action="url+'/upload/upload'"
                  name="image"
                  list-type="picture-card"
                  :file-list="forms.icon"
                  :on-success="iconhandleAvatarSuccess"
                  :on-preview="iconhandlePictureCardPreview"
                  :on-change="icononFilesAdded"
                  :before-upload="beforeAvatarUpload"
                  :on-remove="iconhandleRemove">
                  <div slot="tip" class="el-upload__tip">*最多只能上传1张，单张不超过2M，建议宽度尺寸320*117</div>
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="icondialogVisible">
                  <img width="100%" :src="icondialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <el-form-item>
                <button type="button" class="btn btn-primary" @click="editsubmitForm('forms')">立即保存</button>
                <el-button @click="Shows = !Shows">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        fsnumShow:false,
        isShows:false,
        Shows:false,
        isAdd:false,
        dialogVisible:false,
        dialogImageUrl:'',
        dialogVisibles:false,
        dialogImageUrls:'',
        //编辑图标
        icondialogVisible:false,
        icondialogImageUrl:'',
        tableData:[],
        text:'',
        form:{
          name:'',
          icon:'',
          description:'',
        },
        isName:'',
        isPictures:'',
        forms:{
          name:'',
          type:'',
          icon:[],
          description:'',
          picture:[]
        },
        //区分是否是编辑表单
        TypeSubmit:null,
        //分页
        sum:null,
        currentPage:null,
        pagesize:null,
      }
    },
    methods:{
      //分页

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      formback(){
        this.$router.go(-1)
      },
      handleEdit(index, row) {
        if(row.type === '封面'){
          this.text = '封面'
          this.Shows = true
          this.isName = false
          this.TypeSubmit = '封面'
          this.isPictures = false
          let pis = [{
            uid:Math.random(),
            status:true,
            url:row.icon
          }]
          if(row.icon === null || row.icon === ''){
            this.forms.icon = []
          }else {
            this.forms.icon = pis
          }
          this.forms.description = row.description
          this.forms.type = row.type
        }else {
          this.text = '表单框'
          this.TypeSubmit = '表单框'
          this.Shows = true
          this.isName = true
          this.isPictures = true
          this.$axios.post('/form/getFormColumnDetail',{'form_column_id':row.form_column_id}).then((response)=>{
            this.forms.name = response.data.data.name
            this.forms.description = response.data.data.description
            this.forms.form_column_id = response.data.data.form_column_id
            if(response.data.data.picture === ''){
              this.forms.picture = []
            }else {
              this.forms.picture = response.data.data.picture
            }
          })
        }
      },
      addformManageList(){
        this.isShows = true
        this.form ={
            name:'',
            icon:'',
            description:'',
            pictures:''
        }
      },
      //添加表单
      addonFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      addhandleAvatarSuccess(res, file,row) {
        this.form.icon = res.data.image_url
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      addhandleRemove(file, fileList) {
        this.form.pictures = ''
        return  this.form.pictures
      },
      addhandlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      /*编辑*/
      //编辑封面
      iconhandleAvatarSuccess(res, file) {
        let imgdata = {
          url:res.data.image_url
        }
        if(this.forms.icon.length >= 1){
          this.forms.icon.splice(this.forms.icon.length,1)
        }else {
          this.forms.icon.push(imgdata)
        }
      },
      iconhandlePictureCardPreview(file) {
        this.icondialogImageUrl = file.url;
        this.icondialogVisible = true;
      },
      icononFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      iconhandleRemove(file, fileList) {
        this.forms.icon = []
      },
      //编辑图标
      pichandleAvatarSuccess(res, file) {
        let imgdata = {
          url:res.data.image_url
        }
        if(this.forms.picture.length >= 1){
          this.forms.picture.splice( this.forms.picture.length,1)
        }else {
          this.forms.picture.push(imgdata)
        }
      },
      pichandlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      piconFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      pichandleRemove(file, fileList) {
        return  this.forms.picture = []
      },
      //添加表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let databes = {
              form_id:this.$route.query.form_id,
              name:this.form.name,
              icon:this.form.icon,
              description:this.form.description
            }
              this.$axios.post("/form/addFormColumn",databes).then((response) =>{
                if(response.data.status===1){
                  this.$message({
                    showClose: true,
                    message: response.data.message,
                    type: 'success'
                  });
                  this.$axios.post('/form/getFormColumnList',{'form_id':this.$route.query.form_id}).then((response)=>{
                    this.tableData = response.data.data.data
                    this.sum = response.data.data.total
                  })
                  this.isShows = false
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
      //编辑表单
      editsubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.TypeSubmit === '封面'){
              let databes = {
                form_id:this.$route.query.form_id,
                icon:this.forms.icon,
                type:this.forms.type,
                description:this.forms.description
              }
              this.$axios.post("/form/editFormColumn",databes).then((response) =>{
                if(response.data.status===1){
                  this.$message({
                    showClose: true,
                    message: response.data.message,
                    type: 'success'
                  });
                  this.$axios.post('/form/getFormColumnList',{'form_id':this.$route.query.form_id,page:this.currentPage}).then((response)=>{
                    this.tableData = response.data.data.data
                    this.sum = response.data.data.total
                  })
                  this.Shows = false
                }else {
                  this.$message({
                    showClose: true,
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
            }else {
              let databes = {
                form_column_id:this.forms.form_column_id,
                name:this.forms.name,
                icon:this.forms.picture,
                description:this.forms.description
              }
              //console.log(databes)
              this.$axios.post("/form/editFormColumn",databes).then((response) =>{
                if(response.data.status===1){
                  this.$message({
                    showClose: true,
                    message: response.data.message,
                    type: 'success'
                  });
                  this.$axios.post('/form/getFormColumnList',{'form_id':this.$route.query.form_id}).then((response)=>{
                    this.tableData = response.data.data.data
                    this.sum = response.data.data.total
                  })
                  this.Shows = false
                }else {
                  this.$message({
                    showClose: true,
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableData.splice(index, 1);
          this.$axios.post('/form/deleteFormColumn', {'form_column_id': row.form_column_id}).then((response) => {
            if (response.data.status === 1) {
              this.$axios.post('/form/getFormColumnList',{'form_id':this.$route.query.form_id,page:this.currentPage}).then((response)=>{
                this.sum = response.data.data.total
              })
            } else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          }) }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //重置表单
      resetForm() {
       this.$router.go(-1)
      },
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/form/getFormColumnList',{'form_id':this.$route.query.form_id,page:val}).then((response)=>{
          //console.log(response)
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
          this.pagesize = response.data.data.per_page
          this.currentPage = response.data.data.last_page
        })
      },
    },
    created(){
      this.$axios.post('/form/getFormColumnList',{'form_id':this.$route.query.form_id}).then((response)=>{
        this.tableData = response.data.data.data
        this.sum = response.data.data.total
        this.pagesize = response.data.data.per_page
        this.currentPage = response.data.data.last_page
      })
    },
    computed:{

    }
  }
</script>
<style scoped lang="scss">
  .formManageList{
    header{
      h3{
        margin: 30px 20px;
      }
      .formManageList-btn{
        overflow: hidden;
        padding-right: 30px;
        .btn{
          float: right;
        }
      }
    }
    .Mask{
      width: 100%;
      height: 100%;
      z-index: 999;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: 0 auto;
      background-color: rgba(0,0,0,.5);
      .buyBambino{
        width: 600px;
        height: 600px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 9999;
        background-color: #fff;
        border: 1px solid;
        border-radius: 10px;
        .buyBambino-head{
          height: 50px;
          width: 100%;
          overflow: hidden;
          padding-left: 30px;
          background-color: #2e6da4;
          p{
            width: 100%;
            height: 100%;
            overflow: hidden;
            line-height: 50px;
            font-size: 18px;
            color: #fff;
            .clos{
              float: right;
              margin-top: 15px;
              cursor: pointer;
              margin-right: 30px;
            }
          }
        }
        .buyBambino-main{
          margin-top: 20px;
        }
      }
    }
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
</style>
