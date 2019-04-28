<template>
  <div class="addCommod">
    <header>
      <h3>编辑外卖商品</h3>
    </header>
    <section class="addCommod-main">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" label-position="left">
        <el-form-item label="选择分类" prop="product_group_id">
          <el-select v-model="ruleForm.product_group_id" placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.product_group_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-col :span="8">
            <el-input v-model="ruleForm.name" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上传图片" prop="pictures">
          <el-upload
            ref="upload"
            :action="url+'/common/upload'"
            list-type="picture-card"
            :file-list="ruleForm.pictures"
            name="image"
            :on-preview="handlePictureCardPreview"
            :on-success="getDataImg"
            :on-change="onFilesAdded"
            :on-remove="handleRemove">
            <div slot="tip" class="el-upload__tip">最多只能上传5张，且不超过2M</div>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品规格：" prop="guige">
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
              :prop="col.prop"
              :label="col.label"
              :key="key"
              width="120">
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
          <span style="margin-left: 10px">cm^</span>
        </el-form-item>
        <el-form-item label="预约设置" prop="setYuyue">
          <div>
            <span>预约时间:</span>
            <el-select v-model="ruleForm.daytime" placeholder="预约时间" style="width: 120px">
              <el-option label="工作日" value="0"></el-option>
              <el-option label="周末" value="1"></el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px">
            <span>自定义时间:</span>
            <el-time-select
              placeholder="起始时间"
              v-model="ruleForm.startTime"
              :picker-options="{
                  start: '08:30',
                   step: '00:15',
                    end: '18:30'}">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="ruleForm.endTime"
              :picker-options="{
                start: '08:30',
                 step: '00:15',
                  end: '18:30',
              minTime: ruleForm.startTime}">
            </el-time-select>
          </div>
          <div style="margin-top: 10px">
            <span>联系电话:</span>
            <el-input v-model="ruleForm.hotline" type="number" style="width: 250px"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="预约说明" prop="instruction">
          <el-col :span="16">
            <el-input type="textarea" v-model="ruleForm.instruction"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="城市定位" prop="location">
          <el-switch v-model="ruleForm.location"></el-switch>
          <div class="area" v-if="ruleForm.location">
            <area-select :level="2" type="text" v-model="ruleForm.selected"></area-select>
          </div>
        </el-form-item>
        <el-form-item label="推荐" prop="recommend">
          <el-switch v-model="ruleForm.recommend"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
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
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  import {quillRedefine} from 'vue-quill-editor-upload'
  import {quillEditor} from 'vue-quill-editor'
  export default {
    data () {
      return {
        options: [],
        headH1:'',
        ruleForm: {
          product_group_id:'',
          name: '',
          virtual_price:'',
          pictures:[],
          price:'',
          stock:'',
          daytime:'',
          weight:'',
          volume:'',
          startTime: '',
          endTime: '',
          hotline:'',
          instruction:'',
          recommend: false,
          location:false,
          guige:'',
          description: '',
          selected:[],
          inputValue: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        //规格
        tableData: [],
        cols: [],
        form:{},
        dynamicTags: [],
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
      //上传图片限制
      onFilesAdded(file,fileList){
        if(this.ruleForm.pictures.length > 5){
          alert('最多添加5张图片！')
          fileList.splice(fileList.indexOf(file),1)
        }
        //this.ruleForm.pictures = fileList.filter(f => f.status === 'ready')
      },
      //删除图片
      handleRemove(file, fileList) {
        this.ruleForm.pictures.splice(this.ruleForm.pictures.indexOf(file),1)
        return this.ruleForm.pictures
      },
      //预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //获取上传图片详情
      getDataImg(response,file, fileList){
        let ponse = {
          uid:file.uid,
          url:this.urlImg+ file.response,
          status:file.status
        }
        if(this.ruleForm.pictures.length >= 5){
          this.ruleForm.pictures.splice(this.ruleForm.pictures.length,1)
        }else {
          this.ruleForm.pictures.push(ponse)
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //规格方法
      handleDelete(index, row) {
        //this.tableData.splice(this.tableData)
        if(this.tableData.length<2){
          return false
        }else {
          this.tableData.splice(index,1)
        }
      },
      handleClose(tag) {
        if(tag === '价格'|| tag==='库存'){
          alert('不可删除！')
        }else {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
      //添加规格数据
      addData(){
        let datas = {}
        for(let i in this.tableData[0]){
          this.$set(datas,i,'')
        }
        this.tableData.push(datas)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.selected === null){
              this.ruleForm.selected = []
            }
            if(this.ruleForm.pictures.length === 0){
              alert('图片至少上传一张')
            }
            let times = []
            times.push(this.ruleForm.startTime)
            times.push(this.ruleForm.endTime)
            let databes = {
              name: this.ruleForm.name,
              product_id:this.$route.query.product_id,
              product_group_id:this.ruleForm.product_group_id,
              price:this.ruleForm.price,
              virtual_price:this.ruleForm.virtual_price,
              stock:this.ruleForm.stock,
              location:Array.from(this.ruleForm.selected),
              description:this.ruleForm.description,
              pictures:Array.from(this.ruleForm.pictures),
              weight:this.ruleForm.weight,
              volume:this.ruleForm.volume,
              daytime:this.ruleForm.daytime,
              saletime:times,
              hotline:this.ruleForm.hotline,
              recommend:this.ruleForm.recommend,
              instruction:this.ruleForm.instruction,
              tableData:this.tableData
            }
            //console.log(databes)
            this.$axios.post("/product/editProduct",databes).then((response) =>{
              if(response.data.status === 1){
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'
                });
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
        this.$refs[formName].resetFields();
      },
    },
    computed:{

    },
    components: {
      quillEditor, quillRedefine
    },
    created(){
      this.$axios.post('/product_group/getProductGroupListAll').then((response)=>{
          this.options = response.data.data
        })
        this.$axios.post('/product/getProductDetail',{'product_id':this.$route.query.product_id})
          .then((response)=>{
            if(response.data.status === 1){
              this.ruleForm = response.data.data
              if(response.data.data.tableData.length === 0){
                this.tableData = [{规格: '',}]
                this.cols = [
                  {prop: '规格', label: '规格'},
                ]
                this.dynamicTags = ['规格']
              }else {
                this.cols = response.data.data.cols
                this.dynamicTags = response.data.data.dynamicTags
                this.tableData = response.data.data.tableData
              }
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'success'
              });
            }else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          })
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
</style>
