<template>
  <div class="addVoucher">
    <header>
      <h3>添加代金券</h3>
    </header>
    <section class="addVoucher-main">
      <div class="img-left">
        <img src="../../assets/images/voucher.jpg" alt="">
      </div>
      <div class="addVoucher-content">
        <el-form ref="form" :model="form" :label-position="labelPosition" label="right" label-width="120px">
          <el-form-item label="代金券名称">
            <el-input style="width: 200px" v-model="form.name" :maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="优惠设置">
            <el-input style="width: 100px" v-model="form.condition"></el-input>
            <span>元代金券,单笔订单金额满</span>
            <el-input style="width: 100px" v-model="form.value"></el-input>
            <span>元，可使用</span>
          </el-form-item>
          <el-form-item label="选择商品">
            <el-radio-group v-model="form.product_ids">
              <div>
                <el-radio label="全部商品"></el-radio>
              </div>
              <div>
                <el-radio label="部分商品"></el-radio>
                <el-button style="margin-left: 20px"  type="primary" @click="addCommods">添加商品</el-button>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="领取时间">
            <div class="block">
              <el-date-picker
                v-model="form.receive_time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="有效期">
            <div class="block">
              <el-date-picker
                v-model="form.valid_time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="不可用时间">
            <div class="block">
              <el-date-picker
                v-model="form.invalid_time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="库存">
            <el-input style="width: 80px" v-model="form.stock"></el-input><span> 份 </span>
          </el-form-item>
          <el-form-item label="领取限制">
            <el-input style="width: 80px" v-model="form.limit"></el-input><span> 张 </span> <span style="font-size: 12px">*每个用户领取上限,如不填则默认为1</span>
          </el-form-item>
          <el-form-item label="联系我们">
            <el-input v-model="form.contact_us" style="width: 280px"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"@click="submitForm('form')">保存</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <transition name="el-fade-in-linear">
      <div v-if="isShow" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>添加商品</span> <i class="el-icon-close clos" @click="isShow = !isShow"></i></p>
          </div>
          <div class="buyBambino-main">
            <el-table
              ref="multipleTable"
              :data="userListData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称"
                width="250">
              </el-table-column>
              <el-table-column
                label="商品图片"
                prop="picture"
                width="200">
                <template slot-scope="scope"><img :src="scope.row.picture" alt="" width="50"height="50"></template>
              </el-table-column>
              <el-table-column
                prop="product_group"
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
                prop="stock"
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
                :total="sum">
              </el-pagination>
            </div>
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
          value:'',
          condition:'',
          product_id:[],
          product_ids:[],
          receive_time:'',
          valid_time:'',
          invalid_time:'',
          stock:'',
          limit:'',
          contact_us:'',
          remark:''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        userListData:[],
        //分页
        sum:0,
        currentPage:1,
        pagesize:8
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let receive_times = ''
            if(this.form.receive_time ===''){
              receive_times = []
            }else {
                let getDates = new parson.getTime()
                let rises = getDates.formatTime(this.form.receive_time[0])
                let overs = getDates.formatTime(this.form.receive_time[1])
                let datess = []
                datess.push(rises)
                datess.push(overs)
              receive_times = datess
            }
            let valid_times = ''
            if(this.form.valid_time ===''){
              valid_times = []
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.form.valid_time[0])
              let overs = getDates.formatTime(this.form.valid_time[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              valid_times = datess
            }
            let invalid_times = ''
            if(this.form.invalid_time ===''){
              invalid_times = []
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.form.invalid_time[0])
              let overs = getDates.formatTime(this.form.invalid_time[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              invalid_times = datess
            }
            let getCom = Array.from(new Set(this.form.product_id))
            let sendData = {
              name:this.form.name,
              value:this.form.value,
              condition:this.form.condition,
              product_id:getCom,
              receive_time:receive_times,
              valid_time:valid_times,
              invalid_time:invalid_times,
              stock:this.form.stock,
              limit:this.form.limit,
              contact_us:this.form.contact_us,
              remark:this.form.remark
            }
            this.$axios.post('/voucher/addVoucher',sendData).then((response)=>{
              if(response.data.status === 1){
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'});
                this.$router.go(-1)
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
      },
      addData(index,row){
        this.$message({
          showClose: true,
          message: '添加成功！',
          type: 'success'});
        //console.log(typeof this.form.product_id)
        this.form.product_id.push(row.product_id)
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
      }
    },
    created(){
      this.$axios.post('/product/getProductList').then((response)=>{
        this.userListData = response.data.data
        this.sum = response.data.data.length
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
      width: 100%;
      height: auto;
      overflow: hidden;
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
        width: 328px;
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
        height: 800px;
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
  }
</style>
