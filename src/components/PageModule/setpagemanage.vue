<template>
  <div class="setpagemanage">
    <header>
      <h3>编辑页面</h3>
      <div style="float: right;margin-right: 30px">
        <button type="button" class="btn btn-primary" @click="returnbtn">返回</button>
      </div>
    </header>
    <section>
      <form action="">
        <el-table
          ref="singleTable"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            width="80"
            :index="indexMethod">
          </el-table-column>
          <el-table-column label="类别" prop="type" sortable>

          </el-table-column>
          <el-table-column label="文本" prop="text" :show-overflow-tooltip="true">

          </el-table-column>
          <el-table-column label="标题" prop="title" :show-overflow-tooltip="true">

          </el-table-column>
          <el-table-column label="图片" width="178">
            <template slot-scope="scope">
              <div style="width: 158px;height: 158px" v-if="scope.row.isImage">
                <img v-if="scope.row.picture" :src="scope.row.pictures" style="width: 100%;height: 100%;display: block">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="链接名" prop="link_name">

          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      </form>
      <transition name="el-fade-in-linear">
        <div v-if="isShows" class="Mask">
          <div class="buyBambino">
            <div class="buyBambino-head">
              <p><span>编辑页面</span> <i class="el-icon-close clos" @click="isShows = !isShows"></i></p>
            </div>
            <div class="buyBambino-main">
              <el-form ref="forms" :model="forms" label-width="120px">
                <el-form-item label="类别">
                  <el-col :span="12">
                    <p>{{ forms.type }}</p>
                  </el-col>
                </el-form-item>
                <el-form-item label="文本" v-if="forms.isText">
                  <el-col :span="12">
                    <el-input v-model="forms.text" :maxlength="15"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="标题" v-if="forms.isTitle">
                  <el-col :span="12">
                    <el-input v-model="forms.title" :maxlength="10"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="添加图片" v-if="forms.isImage">
                  <el-upload
                    ref="upload"
                    :action="url+'/upload/upload'"
                    name="image"
                    list-type="picture-card"
                    :file-list="forms.picture"
                    :on-success="edithandleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    :on-change="onFilesAdded"
                    :on-remove="handleRemove">
                    <div slot="tip" class="el-upload__tip" v-if="isNavs">最多只能上传1张，且不超过2M，正方形图片，建议尺寸200*200</div>
                    <div slot="tip" class="el-upload__tip" v-else>注：最多只能上传1张，且不超过2M，图片为正方形</div>
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
                <el-form-item label="跳转地址" v-if="!forms.isPhone">
                  <el-col :span="12">
                    <el-cascader
                      :options="options"
                      v-model="forms.children"
                      :show-all-levels="false"
                      @change="handleChange">
                    </el-cascader>
                  </el-col>
                </el-form-item>
                <el-form-item label="调用电话" v-else>
                  <el-col :span="12">
                    <el-input v-model="forms.phone" placeholder="例如：02812345678"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <button type="button" class="btn btn-primary" @click="editsubmitForm('forms')">立即添加</button>
                  <el-button @click="isShows = !isShows">返回</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        imgUrl:'',
        imgs:'',
        isShows:false,
        isInitial:true,
        dialogVisible: false,
        dialogImageUrl: '',
        isNavs:true,
        forms:{
          type:'',
          text:'',
          phone:'',
          isPhone:'',
          isText:'',
          isTitle:'',
          isImage:'',
          slider_pic_id:'',
          description:'',
          picture:[],
          pictures:'',
          link_value:'',
          children:[],
          link_name:'',
          link_type:''
        },
        options:[],
        tableData:[],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods: {
      indexMethod(index) {
        return index * 2;
      },
      returnbtn(){
        this.$router.go(-1)
      },
      handleChange(value){
        let val = ''
        if(value.length === 1){
          val = value[0]
        }else if(value.length === 2){
          val = value[1]
        }
        for(let i in this.options){
          if(Object.keys(this.options[i]).length === 2){
            for(let j in this.options[i].children){
              if(val === this.options[i].children[j].value){
                this.forms.link_name = this.options[i].children[j].label
                this.forms.link_type = this.options[i].children[j].type
                //console.log(this.options[i].children[j].label)
              }
            }
          }else {
            if(val === this.options[i].value){
              this.forms.link_name = this.options[i].label
              this.forms.link_type = this.options[i].type
             // console.log(this.forms.link_type)
            }
          }
        }
      },
      handleEdit(index,row){
       this.isShows = true
       this.$axios.post('/layout/getLayoutDetail',{'layout_id':row.layout_id}).then((response)=>{
         if(response.data.type==='快速导航'){
           this.isNavs = true
         }else {
           this.isNavs = false
         }
         this.forms = response.data.data
         if(this.forms.picture === ''|| this.forms.picture=== null){
           return this.forms.picture = []
         }
         this.isInitial = true
       })
      },
      editsubmitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.forms.picture === null||this.forms.picture === ''){
              this.forms.picture = []
            }else {
              let islen = this.forms.picture.slice(0,26)
              if(islen === 'https://essocial.win'){
                this.forms.picture = this.forms.picture.slice(26,this.forms.picture.length)
              }else {

              }
            }
            //label连接名字
            let val = ''
            if(this.forms.children.length === 1){
              val = this.forms.children[0]
            }else if(this.forms.children.length === 2){
              val = this.forms.children[1]
            }
            for(let i in this.options){
              if(Object.keys(this.options[i]).length > 2){
                for(let j in this.options[i].children){
                  if(val === this.options[i].children[j].value){
                    this.forms.link_name = this.options[i].children[j].label
                    this.forms.link_type = this.options[i].children[j].type
                    //console.log(this.options[i].children[j].label)
                  }
                }
              }else {
                if(val === this.options[i].value){
                  this.forms.link_name = this.options[i].label
                  this.forms.link_type = this.options[i].type
                }
              }
            }
            let sendData = {
              layout_id:this.forms.layout_id,
              title:this.forms.title,
              text:this.forms.text,
              phone:this.forms.phone,
              picture:this.forms.picture,
              link_value:this.forms.children,
              link_name:this.forms.link_name,
              link_type:this.forms.link_type
            }
            this.$axios.post('/layout/editLayout',sendData).then((response)=>{
                if(response.data.status === 1){
                  this.$message({showClose: true, message: response.data.message, type: 'success'});
                  this.isShows = false
                  this.$axios.post('/layout/getLayoutList',{'page_id':this.$route.query.page_id,page:this.currentPage}).then((response)=>{
                      if(response.data.status === 200){
                        this.tableData = response.data.data.data
                      }else {
                        this.$message({
                          showClose: true,
                          message: response.data.message,
                          type: 'error'});
                      }
                    })
                }else {
                  this.$message({showClose: true, message: response.data.message, type: 'error'});
                }
              })
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      edithandleAvatarSuccess(res, file) {
        if(res.status === 200){
          let imgdata = {
            uid:res.uid,
            status:res.status,
            url:res.data.image_url
          }
          if(this.forms.picture.length >= 1){
            this.forms.picture.splice( this.forms.picture.length,1)
          }else {
            this.forms.picture.push(imgdata)
          }
        }else {
          this.$message({showClose: true, message: res.message, type: 'error'});
        }
      },
      //预览
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
      handleRemove(file, fileList) {
        if(file.status ==="success"){
          this.forms.picture.splice( this.forms.picture.indexOf(file),1)
          return  this.forms.picture
        }else {
          return false
        }
      },
      onFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/layout/getLayoutList',{'page_id':this.$route.query.page_id,page:val}).then((response)=> {
          if (response.data.status === 200) {
            this.tableData = response.data.data.data
            this.sum = response.data.data.total
          } else {
            this.$message({showClose: true, message: '获取数据失败！', type: 'error'});
          }
        })
      },
      resetForm() {
        this.$router.go(-1)
      }
    },
    computed:{
      filterlist: function () {
        return this.forms.pictures === ''?this.forms.picture:this.forms.pictures
      }
    },
    created(){
      this.$axios.post('/layout/getLayoutList',{'page_id':this.$route.query.page_id}).then((response)=> {
          if (response.data.status === 200) {
            this.tableData = response.data.data.data
            this.sum = response.data.data.total
          } else {
            this.$message({showClose: true, message: response.data.message, type: 'error'});
          }
        })
      //获取分类
      this.$axios.post('/page/getPageList').then((response)=> {
          if (response.data.status === 1) {
            this.options = response.data.data
          } else {
            this.$message({showClose: true, message: response.data.message, type: 'error'});
          }
        })
    }
  }
</script>
<style scoped lang="scss">
  .setpagemanage{
    header{
      height: auto;
      width: 100%;
      overflow: hidden;
      padding-left: 20px;
      margin-bottom: 20px;
      h3{
        margin: 30px 20px;
      }
    }
    .Mask{
      width: 100%;
      height: 100%;
      z-index: 99;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: 0 auto;
      background-color: rgba(0,0,0,.5);
      .buyBambino{
        width: 600px;
        height: 650px;
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
    width: 158px;
    height: 158px;
    line-height: 158px;
    text-align: center;
  }
  .avatar {
    width: 158px;
    height: 158px;
    display: block;
  }

</style>
