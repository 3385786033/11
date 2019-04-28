<template>
  <div class="addVoucher">
    <header>
      <h3>编辑兑换券</h3>
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
    </section>
    <!--限制商品-->
    <transition name="el-fade-in-linear">
      <div v-if="isShow" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>添加商品</span> <i class="el-icon-close clos" @click="isShow = !isShow"></i></p>
          </div>
          <div class="buyBambino-main" style="height:600px;overflow-y: auto">
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
              :total="sum3">
            </el-pagination>
          </div>
        </div>
      </div>
    </transition>
    <div class="listPro">
      <div class="setSeckill">
        <span>*设置购买指定商品</span>
        <el-radio-group v-model="typeso" @change="radios()">
          <el-radio label="single_full">
            <span>单笔满</span><el-input style="width: 60px" v-model="form.single_full" @blur="upCodesingle_full"></el-input><span>元可使用</span>
          </el-radio>
          <el-radio label="buy_product">购买指定商品可使用</el-radio>
        </el-radio-group>
        <el-button style="margin-left: 20px"  type="primary" @click="addAssignCommod">添加商品</el-button>
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
          @current-change="handleCurrentChanges"
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
          <div class="buyBambino-main" style="height: 70%;overflow-y: auto">
            <el-table
              ref="multipleTables"
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
        <el-button style="margin-left: 20px"  type="primary" @click="addExchangeCommod">添加商品</el-button>
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
  export default {
    data () {
      return {
        labelPosition:'right',
        isShow:false,
        isShows:false,
        amounts:'',
        form: {
          name: '',
          popup_status:false,
          product_limit_list:[],
          exchange_goods:[],
          claim_time:[],
          claim_start_time:'',
          claim_end_time:'',
          use_start_time:'',
          use_end_time:'',
          use_time:[],
          single_full:'',
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
        typeso:'',
        userListData:[],
        userListDatas:[],
        //限制商品
        assignTable:[],
        assignSum:0,
        //兑换商品
        exchangeTable:[],
        exchangeSum:0,
        multipleSelection: [],
        multipleSelections: [],
        //分页
        sum:0,
        sum3:0,
        sum4:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods: {
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
            //弹窗
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
            //兑换设置
            let types = this.typeso
            let a = ''
            let b = ''
            if(types === 'buy_product'){
              a = '0'
              b = '1'
            }else {
              a = '1'
              b = '0'
            }
            let sendData = {
              id:this.$route.query.data,
              name:this.form.name,
              popup_status:popupStatus,
              single_full:this.form.single_full,
              single_full_status:a,
              product_limit_status:b,
              claim_time:getArr,
              use_time:valid,
              store:this.form.store,
              claim_limit:this.form.claim_limit
            }
            this.$axios.post('/exchange_coupon/update',sendData).then((response)=>{
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
      //设置限制商品
      radios(){
        //弹窗
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
        //兑换设置
        let types = this.typeso
        let a = ''
        let b = ''
        if(types === 'buy_product'){
          a = '0'
          b = '1'
        }else {
          a = '1'
          b = '0'
        }
        let sendData = {
          id:this.$route.query.data,
          name:this.form.name,
          popup_status:popupStatus,
          single_full:this.form.single_full,
          single_full_status:a,
          product_limit_status:b,
          claim_time:getArr,
          use_time:valid,
          store:this.form.store,
          claim_limit:this.form.claim_limit
        }
        this.$axios.post('/exchange_coupon/update',sendData).then((response)=>{})
      },
      //添加限制商品
      addAssignCommod(){
        this.isShow = true
        this.$axios.post('/goods/indexExchangeCouponLimitGoods',{exchange_coupon_id:this.$route.query.data}).then((response)=>{
          this.userListData = response.data.data.data
          this.sum3 = response.data.data.total
        })
      },
      addData(index,row){
        this.$message({
          showClose: true,
          message: '添加成功！',
          type: 'success'});
        let sendData = {
          exchange_coupon_id:this.$route.query.data,
          goods_type:row.goods_type,
          goods_id:row.goods_id
        }
        this.$axios.post('/exchange_coupon_limit_goods/save',sendData).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/goods/indexExchangeCouponLimitGoods',{exchange_coupon_id:this.$route.query.data}).then((response) =>{
              this.userListData = response.data.data.data
              this.sum3 = response.data.data.total
            })
            this.$axios.post('/exchange_coupon_limit_goods/index',{exchange_coupon_id:this.$route.query.data}).then((response)=>{
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
      //添加兑换商品
      addExchangeCommod(){
        this.isShows = true
        this.$axios.post('/goods/indexExchangeCouponExchangeGoods',{exchange_coupon_id:this.$route.query.data}).then((response)=>{
          this.userListDatas = response.data.data.data
          this.sum4 = response.data.data.total
        })
      },
      addDatas(index,row){
        this.$message({
          showClose: true,
          message: '添加成功！',
          type: 'success'});
        let sendData = {
          exchange_coupon_id:this.$route.query.data,
          goods_type:row.goods_type,
          goods_id:row.goods_id
        }
        this.$axios.post('/exchange_coupon_exchange_goods/save',sendData).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/goods/indexExchangeCouponExchangeGoods',{exchange_coupon_id:this.$route.query.data}).then((response) =>{
              this.userListData = response.data.data.data
              this.sum4 = response.data.data.total
            })
            this.$axios.post('/exchange_coupon_exchange_goods/index',{exchange_coupon_id:this.$route.query.data}).then((response)=>{
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
      //兑换商品删除
      exchangehandleDelete(index, row){
        this.exchangeTable.splice(index,1);
        this.$axios.post('/exchange_coupon_exchange_goods/delete',{id:row.id}).then((response)=>{
          //限制商品
          this.$axios.post('/exchange_coupon_exchange_goods/index',{exchange_coupon_id:this.$route.query.data,page:this.currentPage}).then((response) =>{
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
          this.$axios.post('/exchange_coupon_limit_goods/index',{exchange_coupon_id:this.$route.query.data,page:this.currentPage}).then((response) =>{
            this.assignTable = response.data.data.data
            this.assignSum = response.data.data.total
          })
        })
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
          //限制商品
        this.$axios.post('/exchange_coupon_limit_goods/index',{exchange_coupon_id:this.$route.query.data,page:val}).then((response) =>{
          this.assignTable = response.data.data.data
          this.assignSum = response.data.data.total
        })
      },
      handleCurrentChanges2(val){
        this.currentPage = val;
        this.$axios.post('/exchange_coupon_exchange_goods/index',{exchange_coupon_id:this.$route.query.data,page:val}).then((response) =>{
          this.exchangeTable = response.data.data.data
          this.exchangeSum = response.data.data.total
        })
      },
      handleCurrentChanges3(val){
        this.currentPage = val;
        this.$axios.post('/goods/indexExchangeCouponLimitGoods',{exchange_coupon_id:this.$route.query.data,page:val}).then((response)=>{
          this.userListData = response.data.data.data
          this.sum3 = response.data.data.total
        })
      },
      handleCurrentChanges4(val){
        this.currentPage = val;
        this.$axios.post('/goods/indexExchangeCouponLimitGoods',{exchange_coupon_id:this.$route.query.data,page:val}).then((response)=>{
          this.userListDatas = response.data.data.data
          this.sum4 = response.data.data.total
        })
      },
    },
    created(){
      this.$axios.post('/exchange_coupon/read',{id:this.$route.query.data}).then((response)=>{
        this.form = response.data.data
        if(response.data.data.popup_status === 0){
          this.form.popup_status = false
        }else {
          this.form.popup_status = true
        }
        if(response.data.data.single_full_status === 0){
          this.typeso = 'buy_product'
        }else {
          this.typeso = 'single_full'
        }
        //限制商品
        this.$axios.post('/exchange_coupon_limit_goods/index',{exchange_coupon_id:response.data.data.id}).then((response) =>{
          this.assignTable = response.data.data.data
          this.assignSum = response.data.data.total
        })
        //兑换商品
        this.$axios.post('/exchange_coupon_exchange_goods/index',{exchange_coupon_id:response.data.data.id}).then((response) =>{
          this.exchangeTable = response.data.data.data
          this.exchangeSum = response.data.data.total
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
        margin-left: 20px;
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
        position: fixed;
        overflow-y: auto;
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
