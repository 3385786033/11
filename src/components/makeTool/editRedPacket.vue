<template>
  <div class="addVoucher">
    <header>
      <h3>编辑红包</h3>
      <div  class="head-right">
        <button type="button" class="btn btn-primary" @click="back">返回</button>
      </div>
    </header>
    <section class="addVoucher-main">
      <div class="img-left">
        <img src="../../assets/images/hb.jpg" alt="">
      </div>
      <div class="addVoucher-content">
        <el-form ref="form" :model="form"  :rules="rules" :label-position="labelPosition" label="right" label-width="120px">
          <el-form-item label="红包名称" prop="name">
            <el-input style="width: 200px" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="弹窗">
            <el-switch v-model="form.popup_status"></el-switch>
          </el-form-item>
          <el-form-item label="设置">
            <el-radio-group v-model="form.give_out_type">
              <div style="float: left">
                <el-radio label="0">随机金额</el-radio>
              </div>
              <div style="float: left;margin-left:10px">
                <el-radio label="1">固定金额</el-radio>
              </div>
            </el-radio-group>
            <div style="clear: both">
              <span>红包额度</span><el-input style="width: 100px" v-model="form.amount" type="number" @blur="upCode"></el-input><span>元</span>，
            </div>
            <el-radio-group v-model="form.general_status" style="margin-top: 10px">
              <div style="float: left">
                <el-radio label="0">
                  <span>单笔满</span><el-input style="width: 60px" v-model="form.single_full" @blur="upCodesingle_full"></el-input><span>元可用</span>
                </el-radio>
              </div>
              <div style="float: left;margin-left: 10px;margin-top: 10px">
                <el-radio label="1">商品通用红包</el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="领取时间" required>
                <el-form-item prop="start_time" style="display: inline-block">
                  <el-date-picker
                    v-model="form.claim_start_time"
                    clearable
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              <span style="display: inline-block">至</span>
                <el-form-item prop="stop_time" style="display: inline-block">
                  <el-date-picker
                    v-model="form.claim_end_time"
                    type="datetime"
                    clearable
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
          </el-form-item>
          <el-form-item label="有效期" required>
                <el-form-item prop="valid_time1" style="display: inline-block">
                  <el-date-picker
                    v-model="form.use_start_time"
                    clearable
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              <span style="display: inline-block">至</span>
                <el-form-item prop="valid_time2" style="display: inline-block">
                  <el-date-picker
                    v-model="form.use_end_time"
                    type="datetime"
                    clearable
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
          </el-form-item>
          <el-form-item label="库存" prop="store">
            <el-input style="width: 80px" v-model="form.store"></el-input><span> 份 </span>
          </el-form-item>
          <el-form-item label="领取限制" prop="claim_limit">
            <span>每个用户ID可领取</span>
            <el-input style="width: 80px" v-model="form.claim_limit"></el-input><span> 张 </span>
            <span style="font-size: 12px">*每个用户领取上限,如不填则默认为1</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"@click="submitForm('form')">保存</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="listPro">
        <div class="setSeckill">
          <span style="font-size: 16px;margin-left: 50px">*设置商品</span>
          <el-radio-group v-model="form.product_limit_status" @change="radios()" class="changesRadios">
            <el-radio label="0">全部商品</el-radio>
            <el-radio label="1">部分商品</el-radio>
          </el-radio-group>
          <el-button style="margin-left: 20px"  type="primary" :disabled="isBtn" @click="addCommods">添加商品</el-button>
        </div>
        <el-table
          v-show="isTable"
          ref="multipleTable"
          :data="assignTable"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称">
          </el-table-column>
          <el-table-column
            label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.cover" alt="" width="60"height="60">
            </template>
          </el-table-column>
          <el-table-column
            prop="group_name"
            label="商品分类">
          </el-table-column>
          <el-table-column
            prop="virtual_price"
            label="虚拟价格">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="stock"
            label="库存">
          </el-table-column>
          <el-table-column
            prop="sales"
            label="销量">
          </el-table-column>
          <el-table-column
            prop="recommend"
            label="是否推荐">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="assignhandleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 20px auto;" v-show="isTable">
          <el-pagination
            background
            layout="prev, pager, next"
            align="center"
            :pager-count="currentPage"
            :page-size="pagesize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChanges"
            :total="assignSum">
          </el-pagination>
        </div>
      </div>
    </section>
    <transition name="el-fade-in-linear">
      <div v-if="isShow" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>添加商品</span> <i class="el-icon-close clos" @click="isShow = !isShow"></i></p>
          </div>
          <div class="buyBambino-main" style="height: 70%;overflow-y: auto">
            <el-table
              ref="multipleTable"
              :data="userListData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                label="商品图片">
                <template slot-scope="scope">
                  <img :src="scope.row.cover" alt="" width="60"height="60">
                </template>
              </el-table-column>
              <el-table-column
                prop="group_name"
                label="商品分类">
              </el-table-column>
              <el-table-column
                prop="virtual_price"
                label="虚拟价格">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="stock"
                label="库存">
              </el-table-column>
              <el-table-column
                prop="sales"
                label="销量">
              </el-table-column>
              <el-table-column
                prop="recommend"
                label="是否推荐">
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
          </div>
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
    </transition>

  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  export default {
    data () {
      return {
        labelPosition:'right',
        isShow:false,
        form: {
          name: '',
          popup_status:false,
          amount:'',
          single_full:'',
          product_id:[],
          claim_time:[],
          claim_start_time:'',
          claim_end_time:'',
          use_start_time:'',
          use_end_time:'',
          use_time:[],
          product_limit_status:'',
          general_status:'',
          give_out_type:'',
          store:'',
          claim_limit:'',
        },
        rules:{
          name:[
            { required: true, message: '请输入红包名称', trigger: 'blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
          ],
          amount:[
            {required: true, message: '请输入红包数额', trigger: 'blur' }
          ],
          claim_start_time:[
            {type: 'date', required: true, message: '请选择开始期限', trigger: 'change' }
          ],
          claim_end_time:[
            {type: 'date', required: true, message: '请选择结束期限', trigger: 'change' }
          ],
          use_start_time:[
            {type: 'date', required: true, message: '请选择开始期限', trigger: 'change' }
          ],
          use_end_time:[
            {type: 'date', required: true, message: '请选择结束期限', trigger: 'change' }
          ],
          store:[
            { required: true, message: '请输入库存数', trigger: 'blur' }
          ],
          claim_limit:[
            { required: true, message: '请输入限制张数', trigger: 'blur' }
          ]
        },
        userListData:[],
        //指定商品
        assignTable:[],
        assignSum:0,
        //限制商品
        isTable:null,
        isBtn:null,
        //分页
        sum:0,
        currentPage:1,
        pagesize:8
      }
    },
    methods: {
      //验证输入数字
      upCode(){
        this.form.amount = parseFloat(this.form.amount).toFixed(2)
      },
      upCodesingle_full(){
        this.form.single_full = parseFloat(this.form.single_full).toFixed(2)
      },
      back(){
        this.$router.go(-1)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let popupStatus = this.form.popup_status
            if(popupStatus === true){
              popupStatus = '1'
            }else {
              popupStatus = '0'
            }
            //领取时间
            let getArr = []
            let gitTime = new parson.getData();
            if(isNaN(this.form.claim_start_time) &&!isNaN(Date.parse(this.form.claim_start_time))){
              getArr.push(this.form.claim_start_time)
            }else {
              getArr.push(gitTime.formatDate(this.form.claim_start_time))
            }
            if(isNaN(this.form.claim_end_time) &&!isNaN(Date.parse(this.form.claim_end_time))){
              getArr.push(this.form.claim_end_time)
            }else {
              getArr.push(gitTime.formatDate(this.form.claim_end_time))
            }
            //期限
            let valid = []
            if(isNaN(this.form.use_start_time) &&!isNaN(Date.parse(this.form.claim_start_time))){
              valid.push(this.form.use_start_time)
            }else {
              valid.push(gitTime.formatDate(this.form.use_start_time))
            }
            if(isNaN(this.form.use_end_time) &&!isNaN(Date.parse(this.form.use_end_time))){
              valid.push(this.form.use_end_time)
            }else {
              valid.push(gitTime.formatDate(this.form.use_end_time))
            }
            //设置
            if(this.form.give_out_type === 0){
              this.form.general_status = 1
            }
            let sendData = {
              id:this.$route.query.data,
              name:this.form.name,
              popup_status:popupStatus,
              product_limit_status:this.form.product_limit_status,
              amount:this.form.amount,
              single_full:this.form.single_full,
              claim_time:getArr,
              use_time:valid,
              store:this.form.store,
              give_out_type:this.form.give_out_type,
              general_status:this.form.general_status,
              claim_limit:this.form.claim_limit,
            }
            this.$axios.post('/red_packet/update',sendData).then((response)=>{
              if(response.data.status === 200){
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'});
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
      addCommods() {
        this.isShow = true
        this.$axios.post('/goods/indexRedPacket',{red_packet_id:this.$route.query.data}).then((response)=>{
          this.userListData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      addData(index,row){
        this.$message({
          showClose: true,
          message: '添加成功！',
          type: 'success'});
        let sendData = {
          red_packet_id :this.$route.query.data,
          goods_type:row.goods_type,
          goods_id:row.goods_id
        }
        this.$axios.post('/red_packet_limit_goods/save',sendData).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/goods/indexRedPacket',{red_packet_id:this.$route.query.data}).then((response) =>{
              this.userListData = response.data.data.data
              this.sum = response.data.data.total
            })
            this.$axios.post('/red_packet_limit_goods/index',{red_packet_id:this.$route.query.data}).then((response)=>{
              this.assignTable = response.data.data.data
              this.assignSum = response.data.data.total
            })
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'});
          }
        })
      },
      //切换全部商品或部分商品
      radios(){
        if(this.form.product_limit_status === '0'){
          this.isBtn = true
          this.isTable = false
          let popupStatus = this.form.popup_status
          if(popupStatus === true){
            popupStatus = '1'
          }else {
            popupStatus = '0'
          }
          //领取时间
          let getArr = []
          let gitTime = new parson.getData();
          if(isNaN(this.form.claim_start_time) &&!isNaN(Date.parse(this.form.claim_start_time))){
            getArr.push(this.form.claim_start_time)
          }else {
            getArr.push(gitTime.formatDate(this.form.claim_start_time))
          }
          if(isNaN(this.form.claim_end_time) &&!isNaN(Date.parse(this.form.claim_end_time))){
            getArr.push(this.form.claim_end_time)
          }else {
            getArr.push(gitTime.formatDate(this.form.claim_end_time))
          }
          //期限
          let valid = []
          if(isNaN(this.form.use_start_time) &&!isNaN(Date.parse(this.form.claim_start_time))){
            valid.push(this.form.use_start_time)
          }else {
            valid.push(gitTime.formatDate(this.form.use_start_time))
          }
          if(isNaN(this.form.use_end_time) &&!isNaN(Date.parse(this.form.use_end_time))){
            valid.push(this.form.use_end_time)
          }else {
            valid.push(gitTime.formatDate(this.form.use_end_time))
          }
          //设置
          if(this.form.give_out_type === 0){
            this.form.general_status = 1
          }
          let sendData = {
            id:this.$route.query.data,
            name:this.form.name,
            popup_status:popupStatus,
            product_limit_status:this.form.product_limit_status,
            amount:this.form.amount,
            single_full:this.form.single_full,
            claim_time:getArr,
            use_time:valid,
            store:this.form.store,
            give_out_type:this.form.give_out_type,
            general_status:this.form.general_status,
            claim_limit:this.form.claim_limit,
          }
          this.$axios.post('/red_packet/update',sendData).then((response)=>{})
        }else {
          this.isBtn = false
          this.isTable = true
          let popupStatus = this.form.popup_status
          if(popupStatus === true){
            popupStatus = '1'
          }else {
            popupStatus = '0'
          }
          //领取时间
          let getArr = []
          let gitTime = new parson.getData();
          if(isNaN(this.form.claim_start_time) &&!isNaN(Date.parse(this.form.claim_start_time))){
            getArr.push(this.form.claim_start_time)
          }else {
            getArr.push(gitTime.formatDate(this.form.claim_start_time))
          }
          if(isNaN(this.form.claim_end_time) &&!isNaN(Date.parse(this.form.claim_end_time))){
            getArr.push(this.form.claim_end_time)
          }else {
            getArr.push(gitTime.formatDate(this.form.claim_end_time))
          }
          //期限
          let valid = []
          if(isNaN(this.form.use_start_time) &&!isNaN(Date.parse(this.form.claim_start_time))){
            valid.push(this.form.use_start_time)
          }else {
            valid.push(gitTime.formatDate(this.form.use_start_time))
          }
          if(isNaN(this.form.use_end_time) &&!isNaN(Date.parse(this.form.use_end_time))){
            valid.push(this.form.use_end_time)
          }else {
            valid.push(gitTime.formatDate(this.form.use_end_time))
          }
          //设置
          if(this.form.give_out_type === 0){
            this.form.general_status = 1
          }
          let sendData = {
            id:this.$route.query.data,
            name:this.form.name,
            popup_status:popupStatus,
            product_limit_status:this.form.product_limit_status,
            amount:this.form.amount,
            single_full:this.form.single_full,
            claim_time:getArr,
            use_time:valid,
            store:this.form.store,
            give_out_type:this.form.give_out_type,
            general_status:this.form.general_status,
            claim_limit:this.form.claim_limit,
          }
          this.$axios.post('/red_packet/update',sendData).then((response)=>{})
        }

      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val) {
        this.$axios.post('/goods/indexRedPacket',{red_packet_id:this.$route.query.data,page:val}).then((response) =>{
          this.userListData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      handleCurrentChanges1(val) {
        this.$axios.post('/red_packet_limit_goods/index',{red_packet_id:this.$route.query.data,page:val}).then((response) =>{
          this.assignTable = response.data.data.data
          this.assignSum = response.data.data.total
        })
      },
      //限制商品删除
      assignhandleDelete(index, row){
        this.assignTable.splice(index,1);
        this.$axios.post('/red_packet_limit_goods/delete',{id:row.id}).then((response)=>{
          //限制商品
          this.$axios.post('/discount_coupon_limit_goods/index',{red_packet_id:this.$route.query.data,page:this.currentPage}).then((response) =>{
            this.assignTable = response.data.data.data
            this.assignSum = response.data.data.total
          })
        })
      },
    },
    created(){
      this.$axios.post('/red_packet/read',{id:this.$route.query.data}).then((response)=>{
        this.form = response.data.data
        if(response.data.data.popup_status === 0){
          this.form.popup_status = false
        }else {
          this.form.popup_status = true
        }
        //限制商品
        this.$axios.post('/red_packet_limit_goods/index',{red_packet_id:response.data.data.id}).then((response) =>{
          this.assignTable = response.data.data.data
          this.assignSum = response.data.data.total
        })
      })
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
  .addVoucher{
    @include aspect(100%,100%);
    header{
      padding-left: 30px;
      padding-top: 20px;
      margin-bottom: 50px;
      width: 100%;
      overflow: hidden;
      .head-right{
        float: right;
        //margin-top: 20px;
        margin-right: 100px;
      }
      h3{
        margin-top: 20px;
        margin-left: 30px;
      }
    }
    section{
      width: 100%;
      height: auto;
      overflow: hidden;
      .img-left{
        width: 22%;
        height: 583px;
        float: left;
        overflow: hidden;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .addVoucher-content{
        width: 75%;
        margin-left: 3%;
        float: left;
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
      width: 75%;
      height: auto;
      margin-left:328px;
      overflow: hidden;
      .setSeckill{
        margin-top: 20px;
        margin-right: 100px;
        .changesRadios{
          margin-left: 10px;
          margin-top: 5px;
        }
      }
    }
  }
</style>
