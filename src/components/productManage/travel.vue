<template>
  <div class="addCommod">
    <header>
      <h3>添加旅游商品</h3>
    </header>
    <section class="addCommod-main">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" label-position="left">
        <el-form-item label="选择分类" prop="product_group_id">
          <el-select v-model="ruleForm.product_group_id" placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.product_group_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-col :span="8">
            <el-input v-model="ruleForm.name" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预览图片" prop="cover">
          <el-upload
            :action="url+'/common/upload'"
            list-type="picture-card"
            name="image"
            :on-preview="preview_handlePictureCardPreview"
            :on-exceed="preview_limitImg"
            :on-success="preview_getDataImg"
            :on-change="preview_onFilesAdded"
            :on-progress="preview_onProgress"
            :on-remove="preview_handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">*预览图上传，最多只能上传1张，单张不超过2M，正方形图片，建议尺寸500*500</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibles">
            <img width="100%" :src="dialogImageUrls" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="上传图片" prop="pictures">
          <el-upload
            :action="url+'/common/upload'"
            list-type="picture-card"
            name="image"
            :on-preview="handlePictureCardPreview"
            :on-exceed="limitImg"
            :on-success="getDataImg"
            :on-change="onFilesAdded"
            :on-progress="onProgress"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">*至少上传一张，最多只能上传5张，单张不超过2M</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <div style="margin-bottom:0px" class="quill-wrap">
            <quill-editor
              v-model="ruleForm.description"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item label="费用说明" prop="expenses">
          <div style="margin-bottom:0px" class="quill-wrap">
            <quill-editor
              v-model="ruleForm.expenses"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item label="预定须知" prop="instruction">
          <div style="margin-bottom:0px" class="quill-wrap">
            <quill-editor
              v-model="ruleForm.instruction"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item label="商品规格" prop="guige">
          <el-form ref="form" :model="form" label-width="80px" >
            <el-tag
              v-for="(tag,index,key) in dynamicTags"
              :key="key"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirms"
              @blur="handleInputConfirms"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInputs">+ 自定义</el-button>
            <button type="button" class="btn btn-primary" @click="addData" style="display: block;float: right"> 添加数据 </button>
            <el-table :data="tableData" style="width: 100%" >
              <el-table-column
                style="text-align: center"
                v-for="(col,index,key) in cols"
                :key="key"
                :prop="col.prop" :label="col.label">
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <transition name="el-fade-in">
            <div class="Mask" v-show="show">
              <div class="buyBambino">
                <div class="buyBambino-head">
                  <p><span>规格编辑</span> <i class="el-icon-close clos" @click="show = !show"></i></p>
                </div>
                <div  class="buyBambino-main">
                  <el-form ref="forms" :model="forms" label-width="120px" label-position="left">
                    <el-form-item v-for="(index,item,key) in forms" :label="cols[key].label" :key="key">
                      <template>
                        <el-input v-model="forms[item]" style="width: 100px"></el-input><span style="color: red;margin-left: 20px;font-size: 12px">*不能为空</span>
                      </template>
                    </el-form-item>
                    <el-form-item width="180">
                      <el-button type="primary" @click="onSubmit">立即创建</el-button>
                      <el-button @click="quxiao">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </transition>
        </el-form-item>
        <el-form-item label="虚拟价格" prop="virtual_price">
          <el-col :span="6">
            <el-input v-model="ruleForm.virtual_price" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-col :span="6">
            <el-input v-model="ruleForm.price" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-col :span="6">
            <el-input v-model="ruleForm.stock" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="销量" prop="sales_volume">
          <el-col :span="6">
            <el-input v-model="ruleForm.sales_volume" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="城市定位" prop="location">
          <el-switch v-model="ruleForm.location"></el-switch>
          <div class="area" v-if="ruleForm.location">
            <area-select :level="2" type="text" v-model="ruleForm.selected"></area-select>
          </div>
          <span style="font-size: 12px;color: red;margin-left: 20px">*必填项</span>
        </el-form-item>
        <el-form-item label="推荐" prop="recommend">
          <el-switch v-model="ruleForm.recommend"></el-switch>
        </el-form-item>
        <el-form-item label="上下架" prop="is_push">
          <el-switch v-model="ruleForm.is_push"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  import {quillRedefine} from 'vue-quill-editor-upload'
  import {quillEditor} from 'vue-quill-editor'
  export default {
    components: {quillEditor, quillRedefine},
    data () {
      return {
        options:[],
        isInitial:false,
        imgurls:'',
        ruleForm:{
          product_group_id:'',
          name: '',
          pictures:[],
          cover:[],
          guige:'',
          virtual_price:'',
          price:'',
          stock:'',
          sales_volume:'',
          saledate:false,
          saletime:'',
          location:false,
          recommend: false,
          is_push:false,
          description: '',
          expenses: '',
          instruction: '',
          selected:[],
          inputValue: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        dialogImageUrls: '',
        dialogVisibles: false,
        //规格
        tableData: [{
          库存: '',
          价格:''
        }],
        cols: [
          {prop: '库存', label: '库存'},
          {prop: '价格', label: '价格'},
        ],
        form:{},
        dynamicTags: [ '库存','价格'],
        inputVisible: false,
        inputValue: '',
        show:false,
        forms:{},
        //富文本
        serverUrl:this.url+'/common/upload_description',
        editorOption:{},
      }
    },
    methods: {
      returnbtn(){
        this.$router.go(-1)
      },
      //上传图片个数
      onFilesAdded(file,fileList){
        if(fileList.length > 5){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      onProgress(event, file, fileList){
        /*console.log(event)
        console.log(file)*/
      },
      //清空表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //删除上传图片
      handleRemove(file, fileList) {
        this.ruleForm.pictures.splice(this.ruleForm.pictures.indexOf(file),1)
        //console.log(file, fileList);
      },
      //查看图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //超出个数限制
      limitImg(files,fileList){
        console.log(files, fileList);
      },
      //预览上传
      //上传图片个数
      preview_onFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
        // this.ruleForm.pictures = fileList.filter(f => f.status === 'ready')
      },
      preview_onProgress(event, file, fileList){
        /*console.log(event)
        console.log(file)*/
      },
      //删除上传图片
      preview_handleRemove(file, fileList) {
        this.ruleForm.cover.splice(this.ruleForm.cover.indexOf(file),1)
        //console.log(file, fileList);
      },
      //查看图片
      preview_handlePictureCardPreview(file) {
        this.dialogImageUrls = file.url;
        this.dialogVisibles = true;
      },
      //超出个数限制
      preview_limitImg(files,fileList){
        console.log(files, fileList);
      },
      //获取上传信息
      preview_getDataImg(response,file, fileList){
        this.ruleForm.cover.push(response)
        return this.ruleForm.cover
      },
      //获取上传信息
      getDataImg(response,file, fileList){
        this.ruleForm.pictures.push(response)
        return this.ruleForm.pictures
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.pictures.length === 0){
              alert('图片至少上传一张')
            }
            if(this.ruleForm.location === false){
              this.ruleForm.selected = []
            }
            let databes = {
              name: this.ruleForm.name,
              product_group_id:this.ruleForm.product_group_id,
              price:this.ruleForm.price,
              virtual_price:this.ruleForm.virtual_price,
              stock:this.ruleForm.stock,
              sales_volume:this.ruleForm.sales_volume,
              location:Array.from(this.ruleForm.selected),
              description:this.ruleForm.description,
              expenses:this.ruleForm.expenses,
              instruction:this.ruleForm.instruction,
              pictures:Array.from(this.ruleForm.pictures),
              cover:Array.from(this.ruleForm.cover),
              recommend:this.ruleForm.recommend,
              is_push:this.ruleForm.is_push,
              tableData:this.tableData
            }
            this.$axios.post("/product/addProduct",databes).then((response) =>{
              if(response.data.status===1){
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
      //规格方法
      handleDelete(index, row) {
        console.log(index, row);
      },
      //标签
      handleClose(tag) {
        if(tag === '价格'|| tag==='库存'){
          alert('不可删除！')
        }else {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          //this.cols.splice(this.cols.indexOf(tag),1)
          for(let j in this.cols){
            if(tag === this.cols[j].label){
              this.cols.splice(this.cols.indexOf(this.cols[j]),1)
            }
          }
          for(let i in this.tableData){
            this.$delete(this.tableData[i],tag);
          }
        }
      },
      showInputs() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirms() {
        let inputValue = this.inputValue;
        if(inputValue === ''){
          return false
        }
        if(inputValue){
          this.dynamicTags.push(inputValue);
          this.cols.push({prop: inputValue, label:inputValue})
          for(let i in this.tableData){
            this.$set(this.tableData[i], inputValue, '');
          }
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleEdit(index, row) {
        this.show = true
        this.forms = row
      },
      onSubmit() {
        this.$message({
          showClose: true,
          message: '编辑成功！',
          type: 'success'
        });
        this.show = false
      },
      quxiao(){
        this.show = false
      },
      addData(){
        let datas = {}
        for(let i in this.tableData[0]){
          this.$set(datas,i,'')
        }
        this.tableData.push(datas)
      },
    },
    computed:{

    },
    created(){
      this.$axios.post('/product_group/getProductGroupListAll').then((response)=>{
          this.options = response.data.data
        })
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
          success: () => {

          },
        }
      })
    },
    updated(){

    },
    mounted(){

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
  .addCommod{
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
    .addCommod-main{
      width: 80%;
      .speci0{
        width: 100%;
        height: auto;
        overflow: hidden;
        ul{
          @extend .speci0;
          li{
            width: 10%;
            height: 25px;
            border-radius: 5px;
            border: 1px solid;
            text-align: center;
            line-height: 25px;
            float: left;
            margin-left: 10px;
            cursor: pointer;
            margin-bottom: 10px;
          }
          li:nth-child(1){
            margin-left: 0;
          }
        }
      }
      .speci1{
        @extend .speci0;
      }
      .speci2{
        @extend .speci0;
      }
      .speci3{
        @extend .speci0;
      }
      .speci4{
        @extend .speci0;
      }
      .speci5{
        @extend .speci0;
      }
      .imglist{
        width: 100%;
        max-height: 150px;
        overflow: hidden;
        ul{
          width: auto;
          height: 100%;
          overflow: hidden;
          li{
            height: 148px;
            width: 148px;
            list-style: none;
            margin: 0 5px;
            float: left;
            border: 1px dashed;
            img{
              width: 100%;
              height: 100%;
              display: block;
              overflow: hidden;
            }
          }
          li:nth-child(1){
            margin: 0 ;
          }
        }
      }
      .bgcolos{
        background-color: #337ab7;
        color: #fff;
      }
      .el-tag + .el-tag {
        margin-left: 10px !important;
      }
      .el-tag{
        height: 32px;
        line-height: 32px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
      .quill-editor {
        /*height: 200px;*/
        min-height: 200px !important;
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
          padding-left: 20px;
        }

      }
    }
  }
</style>
