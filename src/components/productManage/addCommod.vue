<template>
  <div class="addCommod">
    <header>
      <h3>添加电商商品</h3>
    </header>
    <section class="addCommod-main">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm" label-position="left">
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
            <el-input v-model="ruleForm.name" :maxlength="28"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预览图片" prop="cover">
          <el-upload
            :action="url+'/upload/upload'"
            list-type="picture-card"
            name="image"
            :on-preview="preview_handlePictureCardPreview"
            :on-exceed="preview_limitImg"
            :on-success="preview_getDataImg"
            :on-change="preview_onFilesAdded"
            :before-upload="beforeAvatarUpload"
            :on-progress="preview_onProgress"
            :on-remove="preview_handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">*预览图上传，最多只能上传1张，单张不超过2M，正方形图片，建议尺寸500*500</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibles">
            <img width="100%" :src="dialogImageUrls" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品图片" prop="pictures">
          <el-upload
            :action="url+'/upload/upload'"
            list-type="picture-card"
            name="image"
            :on-preview="handlePictureCardPreview"
            :on-success="getDataImg"
            :on-change="onFilesAdded"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">*最多只能上传5张，且不超过2M，建议尺寸：750*750</div>
            <div slot="tip" class="el-upload__tip" style="color: red;line-height: 0" v-show="showText">*注：基础版可添加1张图片，高级版可添加5张图片，可通过官网线上购买或者联系客服</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
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
              :maxlength="10"
              @keyup.enter.native="handleInputConfirms"
              @blur="handleInputConfirms">
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
              <el-table-column width="200">
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
                    <el-form-item v-for="(index,item,key) in forms" :label="cols[key].label" :key="key" :prop="cols[key].label">
                      <template>
                        <el-input v-model="forms[item]" style="width: 100px"></el-input>
                        <span
                          style="color: red;margin-left: 20px;font-size: 12px"
                          v-show="cols[key].label ==='库存' || cols[key].label ==='价格'?true:false"
                        >*不能为空</span>
                      </template>
                    </el-form-item>
                    <el-form-item width="180">
                      <el-button type="primary" @click="onSubmit('forms')">立即创建</el-button>
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
        <el-form-item label="销量">
          <el-col :span="6">
            <el-input v-model="ruleForm.sales"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品重量" prop="weight">
          <el-col :span="4">
            <el-input v-model="ruleForm.weight" type="number"></el-input>
          </el-col>
          <span style="margin-left: 10px">kg</span>
        </el-form-item>
        <el-form-item label="商品体积" prop="volume">
          <el-col :span="4">
            <el-input v-model="ruleForm.volume" type="number"></el-input>
          </el-col>
          <span style="margin-left: 10px">cm³</span>
        </el-form-item>
        <el-form-item label="运费">
          <el-input type="number" v-model="ruleForm.freight" style="width: 100px"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="城市定位" prop="location">
          <el-switch v-model="ruleForm.location" :disabled="islocation"></el-switch>
          <div class="area" v-if="ruleForm.location">
            <area-select :level="2" type="text" v-model="ruleForm.selected"></area-select>
          </div>
        </el-form-item>
        <el-form-item label="推荐" prop="recommend">
          <el-switch v-model="ruleForm.recommend" :disabled="isRecommend"></el-switch>
        </el-form-item>
        <el-form-item label="状态" prop="is_push">
          <el-switch v-model="ruleForm.is_push" @change="pushStatus"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <div class="el-upload__tip">*建议图片尺寸：宽750</div>
          <div class="editor-container" style="width: 1000px;margin-bottom: 100px">
            <quill-editor
              v-model="ruleForm.description"
              ref="myQuillEditor"
              :options="editorOption">
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">返回</el-button>
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
    name: 'addCommod',
    data () {
      return {
        options: [],
        ruleForm: {
          product_group_id:'',
          name: '',
          virtual_price:'',
          pictures:[],
          cover:[],
          price:'',
          stock:'',
          sales:'',
          weight:'',
          volume:'',
          recommend: false,
          is_push:false,
          location:false,
          freight: '',
          guige:'',
          description: '',
          selected:[],
          inputValue: ''
        },
        rules:{
          name:[
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 1, max: 28, message: '长度在 1 到 28 个字符', trigger: 'blur' }
          ],
          pictures:[
            { required: true,message: '至少上传一张图片',}
          ],
          price:[
            { required: true, message: '请输入价格', trigger: 'blur' },
          ],
          stock:[
            { required: true, message: '请输入库存', trigger: 'blur' },
          ],
          virtual_price:[{ required: true, message: '请输入商品虚拟价格', trigger: 'blur' }]
        },
        rulesForms:{
          库存:[
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          价格:[
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
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
        //版本
        versType:this.$route.query.versionsType,
        num:0,
        islocation:false,
        showText:false,
        //是否禁止推荐
        isRecommend:true
      }
    },
    methods: {
      returnbtn(){
        this.$router.go(-1)
      },
      //删除上传图片
      handleRemove(file, fileList) {
        if(file.status ==="success"){
          this.ruleForm.pictures.splice(this.ruleForm.pictures.indexOf(file),1)
        }else {
          return false
        }
      },
      //查看上传图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //设置限制长度
      onFilesAdded(file,fileList){
        if(fileList.length > this.num){
          this.showText = true
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      //获取上传图片信息
      getDataImg(response,file, fileList){
        if(response.status === 200){
          this.ruleForm.pictures.push(response.data.image_url)
          this.$refs.ruleForm.validateField('pictures');
          return this.ruleForm.pictures
        }else {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'error'
          });
        }
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //规格方法
      handleDelete(index, row) {
        if(this.tableData.length < 2){
          return false
        }else {
          this.tableData.splice(index,1)
        }
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
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              showClose: true,
              message: '编辑成功！',
              type: 'success'
            });
            this.show = false
            let stor = 0
            for(let i in this.tableData){
              if(this.tableData[i].库存 === ''|| this.tableData[i].库存 === null){
                console.log(this.tableData[i])
              }else {
                stor = parseInt(stor) + parseInt(this.tableData[i].库存)
              }
            }
            this.ruleForm.stock = parseInt(stor).toString()
            //价格
            let min = null
            let max = null
            let arrPirc = []
            for(let i in this.tableData){
              arrPirc.push(parseFloat(this.tableData[i].价格).toFixed(2))
              if(this.tableData.length <= 1){
                if(this.tableData[i].价格 === ''||this.tableData[i].价格===undefined||this.tableData[i].价格==='0'){
                  this.isPrice = false
                }else {
                  this.ruleForm.price = parseFloat(this.tableData[i].价格).toFixed(2)
                }
              }else {
                if(this.tableData[i].价格 === ''||this.tableData[i].价格===undefined||this.tableData[i].价格==='0'){
                  this.ruleForm.price = 0
                }else {
                  this.isPrice = true
                  arrPirc.sort(function(a,b){
                    if(a<b){
                      return -1;
                    }
                    if(a>b){
                      return 1;
                    }
                    return 0;
                  })
                  min = arrPirc[0]
                  max = arrPirc[arrPirc.length-1]
                  this.ruleForm.price = min
                }

              }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
      //预览图片
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
        if(file.status ==="success"){
          this.ruleForm.cover.splice(this.ruleForm.cover.indexOf(file),1)
        }else {
          return false
        }
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
        if(response.status === 200){
          this.ruleForm.cover.push(response.data.image_url)
          return this.ruleForm.cover
        }else {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'error'
          });
        }
      },
      //上下架限制
      pushStatus(){
        if(this.ruleForm.is_push === false){
          this.isRecommend = true
          this.ruleForm.recommend = false
        }else {
          this.isRecommend = false
        }
      },
      //提交信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否添加?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.ruleForm.location === false){
                this.ruleForm.selected = []
              }
              let databesedit = {
                name: this.ruleForm.name,
                product_group_id:this.ruleForm.product_group_id,
                price:this.ruleForm.price,
                virtual_price:this.ruleForm.virtual_price,
                stock:this.ruleForm.stock,
                sales:this.ruleForm.sales,
                location:Array.from(this.ruleForm.selected),
                description:this.ruleForm.description,
                pictures:Array.from(this.ruleForm.pictures),
                cover:Array.from(this.ruleForm.cover),
                weight:this.ruleForm.weight,
                volume:this.ruleForm.volume,
                freight:this.ruleForm.freight,
                recommend:this.ruleForm.recommend,
                is_push:this.ruleForm.is_push,
                tableData:this.tableData
              }
              this.$axios.post("/product/addProduct",databesedit).then((response) =>{
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

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消！'
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$router.go(-1)
      },
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
          success: () => {

          },
        }
      })
      this.$axios.post('/product_group/getProductGroupListAll').then((response)=>{
        this.options = response.data.data
      })
      if(this.$route.query.versionsType === 'base'){
        this.islocation = true
      }else {
        this.islocation = false
      }
    },
    updated(){
      if(this.versType === 'base'){
        this.num = 1
      }else {
        this.num = 5
      }
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
      width: 60%;
      .el-tag + .el-tag {
        margin-left: 10px !important;
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
  }
</style>
