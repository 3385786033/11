<template>
  <div class="addSeckill">
    <header>
      <h3>编辑拼团</h3>
    </header>
    <section>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="拼团人数" prop="people_number">
          <el-input style="width:100px" v-model="form.people_number"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
              <el-form-item prop="valid_time1" style="display: inline-block">
                <el-date-picker
                  v-model="form.start_time"
                  clearable
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            <span style="display: inline-block">至</span>
              <el-form-item prop="valid_time2" style="display: inline-block">
                <el-date-picker
                  v-model="form.end_time"
                  type="datetime"
                  clearable
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
        </el-form-item>
        <el-form-item label="限购数量" prop="buy_num_limit">
          <el-input style="width:100px" v-model="form.buy_num_limit"></el-input>
          <span class="el-upload__tip">(为保证商家利益，请对每位用户每次参团时可购买件数进行限制)</span>
        </el-form-item>
        <el-form-item label="拼团规则" prop="rule_explain">
          <div class="editor-container" style="width: 1000px;margin-bottom: 100px">
            <quill-editor
              v-model="form.rule_explain"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"@click="submitForm('form')">保存</el-button>
          <el-button @click="returnBtn">返回</el-button>
        </el-form-item>
      </el-form>
    </section>
    <transition name="el-fade-in-linear">
      <div v-if="isShow" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>添加商品</span> <i class="el-icon-close clos" @click="isShow = !isShow"></i></p>
          </div>
          <div class="buyBambino-main" style="overflow-y: auto;height: 70%">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称"
                width="250">
              </el-table-column>
              <el-table-column
                label="商品图片"
                prop="cover"
                width="200">
                <template slot-scope="scope"><img :src="scope.row.cover" alt="" width="50"height="50"></template>
              </el-table-column>
              <el-table-column
                prop="group_name"
                label="商品分类"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="virtual_price"
                label="虚拟价格"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="store"
                label="库存"
                width="150">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary"
                             size="mini"
                             @click="addData(scope.$index, scope.row)"
                  >添 加</el-button>
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
                :total="sum1">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div v-if="isNo" class="Mask" >
        <div class="buyBambino" style="width: 30%;height: 400px">
          <div class="buyBambino-head">
            <p><span>编辑</span> <i class="el-icon-close clos" @click="isNo = !isNo"></i></p>
          </div>
          <div class="buyBambino-main" style="margin-top: 20px">
            <el-form ref="form" :model="ruleForm" label-width="120px">
              <el-form-item label="拼团价格">
                <el-input style="width:100px" v-model="ruleForm.group_booking_price"></el-input>
              </el-form-item>
              <el-form-item label="拼团库存">
                <el-input style="width:100px" v-model="ruleForm.store"></el-input>
              </el-form-item>
              <el-form-item label="推荐">
                <el-switch v-model="ruleForm.recommend_status"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"@click="NoSubmitForm('form')">保存</el-button>
                <el-button @click="isNo = !isNo">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div v-if="isYes" class="Mask">
        <div class="buyBambino" style="width: 50%">
          <div class="buyBambino-head">
            <p><span>编辑</span> <i class="el-icon-close clos" @click="isYes = !isYes"></i></p>
          </div>
          <div class="buyBambino-main">
            <el-form ref="ruleForm1" :model="ruleForm1" label-width="120px">
              <el-form-item label="商品规格">
                <el-table
                  ref="multipleTable"
                  :data="specTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  tooltip-effect="dark"
                  style="width: 100%;margin-top: 10px">
                  <el-table-column
                    v-for="(index,item,key) in specTableData[0]"
                    :label="item"
                    :prop="item"
                    v-if="item ==='id'|| item ==='price' || item ==='store'?false:true"
                    :key="key">

                  </el-table-column>
                  <el-table-column label="拼团价格">
                    <template slot-scope="scope">
                      <el-input style="width:100px" v-model="scope.row.price"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="拼团库存"
                    width="200">
                    <template slot-scope="scope">
                      <el-input style="width:100px" v-model="scope.row.store"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="推荐">
                <el-switch v-model="ruleForm1.recommend_status"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="YesSubmitForm('ruleForm1')">保存</el-button>
                <el-button @click="isYes = !isYes">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </transition>
    <div class="listPro">
      <div class="setSeckill">
        <span>*设置拼团商品</span>
        <el-button type="primary" @click="addCommods">添加商品</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="commodityData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称">
        </el-table-column>
        <el-table-column
          label="商品图片"
          prop="cover">
          <template slot-scope="scope"><img :src="scope.row.cover" alt="" width="50"height="50"></template>
        </el-table-column>
        <el-table-column
          prop="group_name"
          label="商品分类"
          sortable>
        </el-table-column>
        <el-table-column
          prop="virtual_price"
          label="虚拟价格"
          sortable>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          sortable>
        </el-table-column>
        <el-table-column
          prop="group_booking_price"
          label="拼团价格"
          sortable>
        </el-table-column>
        <el-table-column
          prop="group_booking_store"
          label="拼团库存">
        </el-table-column>
        <el-table-column
          prop="store"
          label="库存">
        </el-table-column>
        <el-table-column
          prop="sales"
          label="销量">
        </el-table-column>
        <el-table-column
          prop="recommend_status"
          label="推荐状态"
          sortable>
        </el-table-column>
        <el-table-column label="操作" width="200">
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
        form: {
          start_time:'',
          end_time:'',
          buy_num_limit:'',
          valid_time1:'',
          valid_time2:''
        },
        rules:{
          start_time:[
            {type:'date', required: true, message: '请选择开始期限', trigger: 'change' }
          ],
          end_time:[
            {type:'date', required: true, message: '请选择结束期限', trigger: 'change' }
          ],
          buy_num_limit:[
            { required: true, message: '请输入限制数量', trigger: 'blur' }
          ],
          people_number:[
            { required: true, message: '请输入拼团人数', trigger: 'blur' }
          ],
        },
        tableData:[],
        commodityData:[],
        specTableData:[],
        seckill_id:null,
        isShow:false,
        proListIsShow:false,
        //有无规格
        isNo:false,
        isYes:false,
        ruleForm:{
          group_booking_price:'',
          store:'',
          recommend_status:'',
          group_booking_goods_id:''
        },
        ruleForm1:{
          seckill_price:'',
          store:'',
          recommend_status:''
        },
        specificationData:[],
        //规格名字,值
        specificationName:[],
        specificationValue:[],
        //分页
        sum:0,
        sum1:0,
        currentPage:1,
        pagesize:10,
        //富文本
        serverUrl:this.url+'/upload/upload',
        editorOption:{},
      }
    },
    methods:{
      returnBtn(){
        this.$router.go(-1)
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let getArr = []
            let gitTime = new parson.getData();
            if(isNaN(this.form.start_time) &&!isNaN(Date.parse(this.form.start_time))){
              getArr.push(this.form.start_time)
            }else {
              getArr.push(gitTime.formatDate(this.form.start_time))
            }
            if(isNaN(this.form.end_time) &&!isNaN(Date.parse(this.form.end_time))){
              getArr.push(this.form.end_time)
            }else {
              getArr.push(gitTime.formatDate(this.form.end_time))
            }
            let sendData = {
              id:this.$route.query.data,
              people_number:this.form.people_number,
              date:getArr,
              buy_num_limit:this.form.buy_num_limit,
              rule_explain:this.form.rule_explain
            }
            this.$axios.post('/group_booking/update',sendData).then((response)=>{
              if(response.data.status === 200){
                console.log(response)
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'});
                this.seckill_id = response.data.data.id
              }else {
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'});
              }
            })
          }else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      addCommods(){
        this.isShow = true
        this.$axios.post('/goods/indexGroupBooking',{group_booking_id:this.seckill_id}).then((response)=>{
          this.tableData = response.data.data.data
          this.sum1 = response.data.data.total
        })
      },
      addData(index,row){
        let sendData = {
          group_booking_id:this.seckill_id,
          goods_type:row.goods_type,
          goods_id:row.goods_id
        }
        this.$axios.post('/group_booking_goods/save',sendData).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/group_booking_goods/index',{group_booking_id:this.seckill_id}).then((response)=>{
              this.commodityData = response.data.data.data
              this.sum = response.data.data.total
            })
            this.$axios.post('/goods/indexGroupBooking',{group_booking_id:this.seckill_id}).then((response)=>{
              this.tableData = response.data.data.data
              this.sum1 = response.data.data.total
            })
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'});
          }
        })
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.commodityData.splice(index,1);
          this.$axios.post('/group_booking_goods/delete',{id:row.id}).then((response) =>{
            if(response.data.status === 200){
              this.$axios.post('/group_booking_goods/index',{group_booking_id:this.seckill_id}).then((response)=>{
                this.commodityData = response.data.data.data
                this.sum = response.data.data.total
              })
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
            message: '已取消删除'
          });
        });
      },
      handleEdit(index, row) {
        this.$axios.post('/group_booking_goods/read',{id:row.id}).then((response)=>{
          if(response.data.status === 200){
            if(response.data.data.option_list_status === 1){
              this.isYes = true
              this.ruleForm1 = response.data.data
              this.specTableData = response.data.data.option_list
              if(response.data.data.recommend_status === 0){
                this.ruleForm1.recommend_status = false
              }else {
                this.ruleForm1.recommend_status = true
              }
            }else {
              this.isNo = true
              this.ruleForm = response.data.data
              if(response.data.data.recommend_status === 0){
                this.ruleForm.recommend_status = false
              }else {
                this.ruleForm.recommend_status = true
              }
            }
          }else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
        })
      },
      YesSubmitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let popupStatus = this.ruleForm1.recommend_status
            if(popupStatus === true){
              popupStatus = '1'
            }else {
              popupStatus = '0'
            }
            let arr = []
            let obj = {}
            for(let i in this.specTableData){
              obj = {
                price:this.specTableData[i].price,
                store:this.specTableData[i].store,
                id:this.specTableData[i].id
              }
              arr.push(obj)
            }
            let sendData = {
              id:this.ruleForm1.group_booking_goods_id,
              recommend_status:popupStatus,
              option_list:arr
            }
            this.$axios.post('/group_booking_goods/updateOptionList',sendData).then((response)=>{
              if(response.data.status === 200){
                this.$message({
                  showClose: true,
                  message: '保存成功！',
                  type: 'success'});
                this.$axios.post('/group_booking_goods/index',{group_booking_id:this.seckill_id}).then((response)=>{
                  this.commodityData = response.data.data.data
                  this.sum = response.data.data.data.length
                })
                this.isYes = false
              }else {
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'});
              }
            })
          }else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      NoSubmitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let popupStatus = this.ruleForm.recommend_status
            if(popupStatus === true){
              popupStatus = '1'
            }else {
              popupStatus = '0'
            }
            let sendData = {
              id:this.ruleForm.group_booking_goods_id,
              recommend_status:popupStatus,
              price:this.ruleForm.group_booking_price,
              store:this.ruleForm.store,
              group_booking_goods_option_id:this.ruleForm.group_booking_goods_option_id
            }
            this.$axios.post('/group_booking_goods/updateOptionSingle',sendData).then((response)=>{
              if(response.data.status === 200){
                this.$message({
                  showClose: true,
                  message: '保存成功！',
                  type: 'success'});
                this.$axios.post('/group_booking_goods/index',{group_booking_id:this.seckill_id}).then((response)=>{
                  this.commodityData = response.data.data.data
                  this.sum = response.data.data.data.length
                })
                this.isNo = false
              }else {
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'});
              }
            })
          }else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
          this.$axios.post('/goods/indexGroupBooking',{group_booking_id:this.seckill_id,page:val}).then((response)=>{
            this.tableData = response.data.data.data
            this.sum1 = response.data.data.total
          })
      },
      //富文本
      onEditorBlur(){//失去焦点事件
      },
      onEditorFocus(){//获得焦点事件
      },
      onEditorChange(){//内容改变事件
      },
      onEditorReady(editor){
        //console.log('editor ready!', editor)
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
            return respnse.data.image_url
          },
          name: 'image',  // 图片上传参数名
          size: 1024*5,
          success: () => {

          },
        }
      })
      this.$axios.post('/group_booking/read',{id:this.$route.query.data}).then((response)=>{
        this.form = response.data.data
        this.seckill_id = response.data.data.id
        this.$axios.post('/group_booking_goods/index',{group_booking_id:response.data.data.id}).then((response)=>{
          this.commodityData = response.data.data.data
          this.sum = response.data.data.total
        })
      })
    },
    mounted(){

    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
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
  .addSeckill{
    @include aspect(100%,100%);
    header{
      width: 100%;
      height: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      overflow: hidden;
      h3{
        margin-left: 30px;
      }
    }
    section{
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    .editor-container{

    }
    .quill-editor {
      height: 300px;
      .ql-container {
        height: 280px;
      }
    }
    .ql-snow .ql-editor img {
      max-width: 480px;
    }
    .ql-editor .ql-video {
      max-width: 480px;
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
        width:80%;
        height: 75%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 9999;
        background-color: #fff;
        border: 1px solid;
        overflow: hidden;
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
          margin: 0 auto;
          width: 99%;
        }
      }
    }
    .listPro{
      width: 100%;
      height: auto;
      overflow: hidden;
      .setSeckill{
        margin-top: 20px;
        margin-right: 100px;
        float: right;
      }
    }
  }
</style>
