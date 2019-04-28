<template>
  <div class="addVoucher">
    <header>
      <h3>添加兑换券</h3>
      <div  class="head-right">
        <button type="button" class="btn btn-primary" @click="back">返回</button>
      </div>
    </header>
    <section class="addVoucher-main">
      <div class="img-left">
        <img src="../../assets/images/dh.jpg" alt="">
      </div>
      <div class="addVoucher-content">
        <el-form ref="form" :model="form"  :rules="rules" :label-position="labelPosition" label="right" label-width="120px">
          <el-form-item label="兑换券名称" prop="name">
            <el-input style="width: 200px" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="弹窗">
            <el-switch v-model="form.popup_status"></el-switch>
          </el-form-item>
          <el-form-item label="领取时间" required>
            <div class="block">
                <el-form-item prop="start_time" style="display: inline-block">
                  <el-date-picker
                    v-model="form.start_time"
                    clearable
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              <span style="display: inline-block">至</span>
                <el-form-item prop="stop_time" style="display: inline-block">
                  <el-date-picker
                    v-model="form.stop_time"
                    type="datetime"
                    clearable
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="有效期" required>
                <el-form-item prop="valid_time1" style="display: inline-block">
                  <el-date-picker
                    v-model="form.valid_time1"
                    clearable
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              <span style="display: inline-block">至</span>
                <el-form-item prop="valid_time2" style="display: inline-block">
                  <el-date-picker
                    v-model="form.valid_time2"
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
    </section>
    <!--限制商品-->
    <transition name="el-fade-in-linear">
      <div v-if="isShow" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>添加商品</span> <i class="el-icon-close clos" @click="isShow = !isShow"></i></p>
          </div>
          <div class="buyBambino-main" style="overflow-y: auto;height: 70%">
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
              @current-change="handleCurrentChanges3"
              :total="sum1">
            </el-pagination>
          </div>
        </div>
      </div>
    </transition>
    <div class="listPro">
      <div class="setSeckill">
        <span>*设置购买指定商品</span>
        <el-radio-group v-model="form.types" @change="radios()">
          <el-radio label="single_full">
            <span>单笔满</span><el-input style="width: 60px" v-model="form.single_full" @change="upCodesingle_full"></el-input><span>元可使用</span>
          </el-radio>
          <el-radio label="buy_product">购买指定商品可使用</el-radio>
        </el-radio-group>
        <el-button style="margin-left: 20px"  type="primary" @click="addCommod">添加商品</el-button>
      </div>
      <el-table
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
      <div style="margin: 20px auto;">
        <el-pagination
          background
          layout="prev, pager, next"
          align="center"
          :pager-count="currentPage"
          :page-size="pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChanges1"
          :total="assignSum">
        </el-pagination>
      </div>
    </div>
    <!--兑换商品-->
    <transition name="el-fade-in-linear">
      <div v-if="isShows" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>添加商品</span> <i class="el-icon-close clos" @click="isShows = !isShows"></i></p>
          </div>
          <div class="buyBambino-main" style="overflow-y: auto;height: 70%">
            <el-table
              ref="multipleTable"
              :data="userListDatas"
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
                             @click="addDatas(scope.$index, scope.row)"
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
              @current-change="handleCurrentChanges4"
              :total="sum">
            </el-pagination>
          </div>
        </div>
      </div>
    </transition>
    <div class="listPro">
      <div class="setSeckill">
        <span>*设置兑换商品</span>
        <el-button style="margin-left: 20px"  type="primary" @click="addCommods">添加商品</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="exchangeTable"
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
              @click="exchangehandleDelete(scope.$index, scope.row)">删除</el-button>
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
          @current-change="handleCurrentChanges2"
          :total="exchangeSum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  import index from "../../router/index";
  export default {
    data () {
      return {
        labelPosition:'right',
        isShow:false,
        isShows:false,
        form: {
          name: '',
          popup_status:false,
          single_full:'',
          claim_time:[],
          start_time:'',
          stop_time:'',
          valid_time1:'',
          valid_time2:'',
          use_time:[],
          product_limit_status:'',
          types:'',
          store:'',
          claim_limit:'',
        },
        rules:{
          name:[
            { required: true, message: '请输入代金券名称', trigger: 'blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
          ],
          start_time:[
            {type: 'date', required: true, message: '请选择开始期限', trigger: 'change' }
          ],
          stop_time:[
            {type: 'date', required: true, message: '请选择结束期限', trigger: 'change' }
          ],
          valid_time1:[
            {type: 'date', required: true, message: '请选择开始期限', trigger: 'change' }
          ],
          valid_time2:[
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
        userListDatas:[],
        //指定商品
        assignTable:[],
        assignSum:0,
        //获取商品列表ID
        exchange_coupon_id:null,
        //兑换商品
        exchangeTable:[],
        exchangeSum:0,
        //分页
        sum:0,
        sum1:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      //添加限制商品
      addData(index,row){
        this.$message({
          showClose: true,
          message: '添加成功！',
          type: 'success'});
        let sendData = {
          exchange_coupon_id:this.exchange_coupon_id,
          goods_type:row.goods_type,
          goods_id:row.goods_id
        }
        this.$axios.post('/exchange_coupon_limit_goods/save',sendData).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/goods/indexExchangeCouponLimitGoods',{exchange_coupon_id:this.exchange_coupon_id}).then((response) =>{
              this.userListData = response.data.data.data
              this.sum1 = response.data.data.total
            })
            this.$axios.post('/exchange_coupon_limit_goods/index',{exchange_coupon_id:this.exchange_coupon_id}).then((response)=>{
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
      addCommod(){
        if(this.exchange_coupon_id === ''||this.exchange_coupon_id === null||this.exchange_coupon_id === undefined ){
          this.$message({
            showClose: true,
            message: '请先设置折扣规则！',
            type: 'error'});
        }else {
          this.isShow = true
          this.$axios.post('/goods/indexExchangeCouponLimitGoods',{exchange_coupon_id:this.exchange_coupon_id}).then((response) =>{
            this.userListData = response.data.data.data
            this.sum1 = response.data.data.total
          })
        }
      },
      //添加兑换商品
      addDatas(index,row){
        this.$message({
          showClose: true,
          message: '添加成功！',
          type: 'success'});
        let sendData = {
          exchange_coupon_id:this.exchange_coupon_id,
          goods_type:row.goods_type,
          goods_id:row.goods_id
        }
        this.$axios.post('/exchange_coupon_exchange_goods/save',sendData).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/goods/indexExchangeCouponExchangeGoods',{exchange_coupon_id:this.exchange_coupon_id}).then((response) =>{
              this.userListDatas = response.data.data.data
              this.sum = response.data.data.total
            })
            this.$axios.post('/exchange_coupon_exchange_goods/index',{exchange_coupon_id:this.exchange_coupon_id}).then((response)=>{
              this.exchangeTable = response.data.data.data
              this.exchangeSum = response.data.data.total
            })
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'});
          }
        })
      },
      addCommods(){
        if(this.exchange_coupon_id === ''||this.exchange_coupon_id === null||this.exchange_coupon_id === undefined ){
          this.$message({
            showClose: true,
            message: '请先设置兑换规则！',
            type: 'error'});
        }else {
          this.isShows = true
          this.$axios.post('/goods/indexExchangeCouponExchangeGoods',{exchange_coupon_id:this.exchange_coupon_id}).then((response) =>{
            this.userListDatas = response.data.data.data
            this.sum = response.data.data.total
          })
        }
      },
      //设置限制商品
      radios(){
        let popupStatus = this.form.popup_status
        if(popupStatus === true){
          popupStatus = '1'
        }else {
          popupStatus = '0'
        }
        //领取时间
        let getArr = []
        let gitTime = new parson.getData();
        getArr.push(gitTime.formatDate(this.form.start_time))
        getArr.push(gitTime.formatDate(this.form.stop_time))
        //期限
        let valid = []
        valid.push(gitTime.formatDate(this.form.valid_time1))
        valid.push(gitTime.formatDate(this.form.valid_time2))
        //兑换
        let types = this.form.types
        if(types === 'buy_product'){
          this.form.single_full_status = '0'
          this.form.product_limit_status = '1'
        }else {
          this.form.product_limit_status = '0'
          this.form.single_full_status = '1'
        }
        let sendData = {
          id:this.exchange_coupon_id,
          name:this.form.name,
          popup_status:popupStatus,
          single_full:this.form.single_full,
          single_full_status:this.form.single_full_status,
          product_limit_status:this.form.product_limit_status,
          claim_time:getArr,
          use_time:valid,
          store:this.form.store,
          claim_limit:this.form.claim_limit
        }
        this.$axios.post('/exchange_coupon/update',sendData).then((response)=>{})
      },
      //兑换商品删除
      exchangehandleDelete(index, row){
        this.exchangeTable.splice(index,1);
        this.$axios.post('/exchange_coupon_exchange_goods/delete',{id:row.id}).then((response)=>{
          //限制商品
          this.$axios.post('/exchange_coupon_exchange_goods/index',{exchange_coupon_id:this.exchange_coupon_id,page:this.currentPage}).then((response) =>{
            this.exchangeTable = response.data.data.data
            this.exchangeSum = response.data.data.total
            this.currentPage = response.data.data.current_page
          })
        })
      },
      //指定商品删除
      assignhandleDelete(index, row){
        this.assignTable.splice(index,1);
        this.$axios.post('/exchange_coupon_limit_goods/delete',{id:row.id}).then((response)=>{
          //限制商品
          this.$axios.post('/exchange_coupon_limit_goods/index',{exchange_coupon_id:this.exchange_coupon_id,page:this.currentPage}).then((response) =>{
            this.assignTable = response.data.data.data
            this.assignSum = response.data.data.total
          })
        })
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
            getArr.push(gitTime.formatDate(this.form.start_time))
            getArr.push(gitTime.formatDate(this.form.stop_time))
            //期限
            let valid = []
            valid.push(gitTime.formatDate(this.form.valid_time1))
            valid.push(gitTime.formatDate(this.form.valid_time2))
            //兑换
            let types = this.form.types
            if(types === 'buy_product'){
              this.form.single_full_status = '0'
              this.form.product_limit_status = '1'
            }else {
              this.form.product_limit_status = '0'
              this.form.single_full_status = '1'
            }
            let sendData = {
              name:this.form.name,
              popup_status:popupStatus,
              single_full:this.form.single_full,
              single_full_status:this.form.single_full_status,
              product_limit_status:this.form.product_limit_status,
              claim_time:getArr,
              use_time:valid,
              store:this.form.store,
              claim_limit:this.form.claim_limit
            }
            //console.log(sendData)
            this.$axios.post('/exchange_coupon/save',sendData).then((response)=>{
              if(response.data.status === 200){
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'});
                this.exchange_coupon_id = response.data.data.exchange_coupon_id
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
        this.$axios.post('/exchange_coupon_limit_goods/index',{exchange_coupon_id:this.exchange_coupon_id,page:val}).then((response) =>{
          this.assignTable = response.data.data.data
          this.assignSum = response.data.data.total
        })
      },
      handleCurrentChanges1(val){
        this.currentPage = val;
      },
      handleCurrentChanges2(val){
        this.currentPage = val;
        this.$axios.post('/exchange_coupon_exchange_goods/index',{exchange_coupon_id:this.exchange_coupon_id,page:val}).then((response) =>{
          this.exchangeTable = response.data.data.data
          this.exchangeSum = response.data.data.total
        })
      },
      //限制分页
      handleCurrentChanges4(val){
        this.currentPage = val;
        this.$axios.post('/goods/indexExchangeCouponLimitGoods',{exchange_coupon_id:this.exchange_coupon_id,page:val}).then((response) =>{
          this.userListData = response.data.data.data
          this.sum1 = response.data.data.total
        })
      },
      //兑换分页
      handleCurrentChanges3(val){
        this.currentPage = val;
        this.$axios.post('/goods/indexExchangeCouponExchangeGoods',{exchange_coupon_id:this.exchange_coupon_id,page:val}).then((response) =>{
          this.userListDatas = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      upCodesingle_full(){
        this.form.single_full = parseFloat(this.form.single_full).toFixed(2)
      }

    },
    created(){
      //限制商品
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
        width: 23%;
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
        margin-left: 2%;
        float: left;
        width: 75%;
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
        overflow-y: auto;
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
