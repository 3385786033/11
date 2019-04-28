<template>
  <div class="userDetails">
    <header>
      <h3>用户详情</h3>
      <div class="head-right">

      </div>
    </header>
    <div class="userDetails-main">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息" >
          <div class="basic-info">
            <h3 class="basic-info-title" style="margin: 0">基本信息</h3>
            <div class="basic-info-main" style="padding-top: 20px">
              <el-form  label-width="120px"  ref="basicInfo" :model="basicInfo">
                <el-form-item label="头像：" >
                  <template slot-scope="scope">
                    <div class="userhead">
                      <img :src="basicInfo.avatar" alt="">
                    </div>
                  </template>
                </el-form-item>
                <el-form-item label="微信昵称：">
                 {{ basicInfo.name }}
                </el-form-item>
                <el-form-item label="电话：">
                  {{ basicInfo.tel }}
                </el-form-item>
                <el-form-item label="邮箱：">
                  <el-input v-model="basicInfo.email" style="width: 15%"></el-input>
                </el-form-item>
                <el-form-item label="分组：">
                  <el-select v-model="basicInfo.customer_group" placeholder="请选择">
                    <el-option
                      v-for="item in customer_group"
                      :key="item.customer_group_id"
                      :label="item.name"
                      :value="item.customer_group_id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="basicInfo.remark" :minlength="1" :maxlength="120" style="width: 30%;color: black"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                  <el-select v-model="basicInfo.status" placeholder="请选择">
                    <el-option
                      v-for="item in optionsStatus_info"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="font-size: 12px;color: #666666">备注:只能禁用评论权限</span>
                </el-form-item>
                <el-form-item size="large">
                  <el-button type="primary" @click="onSubmitbasicInfo('basicInfo')">立即保存</el-button>
                  <el-button @click="resetForm('basicInfo')">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <h3 class="basic-info-title" style="margin-top: 20px">地址信息</h3>
            <div class="basic-info-main" style="border: 0">
              <el-table
                :data="basicInfo.address"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="姓名：" style="width: 30%">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="电话" style="width: 30%">
                        <span>{{ props.row.tel }}</span>
                      </el-form-item>
                      <el-form-item label="地区：" style="width: 30%">
                        <span>{{ props.row.location[1] }}</span>
                      </el-form-item>
                      <el-form-item label="地址" style="width: 30%">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="邮编：" style="width: 30%">
                        <span>{{ props.row.postcode }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="姓名"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="电话"
                  prop="tel">
                </el-table-column>
                <el-table-column
                  label="地址"
                  prop="location">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="会员">
          <div class="vip-info">
            <h3 class="vip-info-title" style="margin: 0">会员</h3>
            <div class="vip-info-main" style="border: 1px solid #d7d7d7">
              <el-form  label-width="140px" :model="vipInfo">
                <el-form-item label="会员卡领取时间：">
                 {{ vipInfo.receive_time }}
                </el-form-item>
                <el-form-item label="会员权益：">
                  {{ vipInfo.right }}
                </el-form-item>
                <el-form-item label="会员条件：">
                  {{ vipInfo.condition }}
                </el-form-item>
                <el-form-item label="会员期限：">
                  {{ vipInfo.valid_time }}
                </el-form-item>
                <el-form-item label="状态：">
                  <el-select v-model="vipInfo.status" placeholder="请选择">
                    <el-option
                      v-for="item in optionsStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
               <!-- <el-form-item label="备注：">
                  <el-input v-model="basicInfo.name" style="width: 30%"></el-input>
                </el-form-item>-->
                <el-form-item size="large">
                  <el-button type="primary" @click="onSubmitvipInfo('basicInfo')">立即保存</el-button>
                  <el-button @click="resetForm('basicInfo')">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="积分">
          <div class="integral-info">
            <h3 class="integral-info-title" style="margin: 0">积分信息</h3>
            <div class="integral-info-head">
              积分合计：<span>{{ points }}</span>
            </div>
            <h3 class="integral-info-title" style="margin-top: 50px">积分记录</h3>
            <div class="basic-info-main" style="border: 0">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  label="日期"
                 >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="积分详情"
                  prop="way"
                >
                </el-table-column>
                <el-table-column
                  label="获得"
                  prop="increase"
                  >

                </el-table-column>
                <el-table-column
                  label="消费"
                  prop="decrease"
                  >

                </el-table-column>
                <el-table-column
                  label="剩余积分"
                  prop="left"
                  >

                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="储值卡">
          <div class="integral-info">
            <h3 class="integral-info-title" style="margin: 0">储值卡信息</h3>
            <div class="integral-info-head">
              储值卡余额：<span>{{ deposit }}</span>
            </div>
            <h3 class="integral-info-title" style="margin-top: 50px">储值记录</h3>
            <div class="basic-info-main" style="border: 0">
              <el-table
                :data="tableData2"
                style="width: 100%">
                <el-table-column
                  label="订单号"
                  prop="ordercode"
                >

                </el-table-column>
                <el-table-column
                  label="日期"
                >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="充值"
                  prop="increase"
                >

                </el-table-column>
                <el-table-column
                  label="获得"
                  prop="donation"
                >

                </el-table-column>
                <el-table-column
                  label="消费"
                  prop="decrease"
                >

                </el-table-column>
                <el-table-column
                  label="剩余积分"
                  prop="left"
                >

                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="登录历史">
          <div class="login-info">
            <h3 class="login-info-title" style="margin: 0">登录历史</h3>
            <div class="login-info-main">
              <el-table
                :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%">
                <el-table-column
                  label="登录时间"
                  prop="login_date"
                >

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
        </el-tab-pane>
        <el-tab-pane label="分销商">
          <div class="order-info">
            <h3 class="order-info-title" style="margin: 0">分销商信息</h3>
            <div class="order-info-main">
              <el-table
                :data="tableDataInfo"
                style="width: 100%">
                <el-table-column
                  label="微信昵称"
                  prop="wechat"
                >
                </el-table-column>
                <el-table-column
                  label="姓名"
                  prop="name"
                >
                </el-table-column>
                <el-table-column
                  label="电话"
                  prop="tel"
                >
                </el-table-column>
                <el-table-column
                  label="下级分销商数"
                  prop="children_count"
                >
                </el-table-column>
                <el-table-column
                  label="上级分销商"
                  prop="parent_distributor"
                >
                </el-table-column>
                <el-table-column
                  label="申请日期"
                  prop="create_date"
                >
                </el-table-column>
                <el-table-column
                  label="状态"
                  prop="status"
                >
                </el-table-column>
                <el-table-column
                  label="备注"
                  prop="remark"
                >
                </el-table-column>
              </el-table>
            </div>
            <h3 class="basic-info-title" style="margin-top: 20px">下级分销商列表</h3>
            <div class="order-info-main">
              <el-table
                :data="tableDataFlist"
                style="width: 100%">
                <el-table-column
                  label="微信昵称"
                  prop="wechat"
                >
                </el-table-column>
                <el-table-column
                  label="姓名"
                  prop="name"
                >
                </el-table-column>
                <el-table-column
                  label="电话"
                  prop="tel"
                >
                </el-table-column>
                <el-table-column
                  label="下级分销商数"
                  prop="children_count"
                >
                </el-table-column>
                <el-table-column
                  label="申请日期"
                  prop="create_date"
                >
                </el-table-column>
                <el-table-column
                  label="状态"
                  prop="status"
                >
                </el-table-column>
                <el-table-column
                  label="备注"
                  prop="remark"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="订单信息">
          <div class="order-info">
            <h3 class="order-info-title" style="margin: 0">订单信息</h3>
            <div class="order-info-main">
              <el-table
                :data="tableData4.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%">
                <el-table-column
                  label="订单号"
                  prop="order_code">
                </el-table-column>
                <el-table-column
                  label="日期"
                  :show-overflow-tooltip="true"
                  prop="create_date">
                </el-table-column>
                <el-table-column
                  label="姓名"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="电话"
                  prop="tel">
                </el-table-column>
                <el-table-column
                  label="金额(元)"
                  prop="total">
                </el-table-column>
                <el-table-column
                  label="优惠券"
                  prop="discount">
                </el-table-column>
                <el-table-column
                  label="会员卡(元)"
                  prop="vip_discount">
                </el-table-column>
                <el-table-column
                  label="积分(元)"
                  prop="point_discount">
                </el-table-column>
                <el-table-column
                  label="储值卡(元)"
                  prop="deposit">
                </el-table-column>
                <el-table-column
                  label="实收"
                  prop="income">
                </el-table-column>
              </el-table>
            </div>
            <div class="order-info-footer">
              <p>总金额：<span>{{ totle }}</span></p>
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
        </el-tab-pane>
        <el-tab-pane label="表单信息">
          <div class="order-info" v-for="(item,index) in forms">
            <h3 class="order-info-title" style="margin: 0">表单信息</h3>
            <div class="order-info-main">
              <el-form :model="vipInfo" >
                <el-form-item v-for="(ite,index,key) in forms[index]" :label="index+'：'" :key="key" style="margin-top: 10px;margin-bottom:0px;border-bottom: 2px solid #e1e1e8;padding-left: 10px">
                  {{ ite }}
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div style="margin: 20px auto;">
            <el-pagination
              background
              layout="prev, pager, next"
              align="center"
              :pager-count="forMcurrentPage"
              :page-size="forMpagesize"
              @size-change="forMhandleSizeChange"
              @current-change="forMhandleCurrentChanges"
              :total="forMsum">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        //基本信息
        basicInfo:{
          avatar:'',
          name:''
        },
        value:'',
        optionsStatus_info:[
          {value: '1', label: '启用'},
          {value: '-1',label: '禁用'}
        ],
        optionsStatus:[
          {value: '1', label: '启用'},
          {value: '-1',label: '禁用'}
        ],
        customer_group:[],
        options:[{}],
        tableData5:[],
        //会员卡
        vipInfo:{},
        //积分
        tableData:[],
        points:'',
        //储值卡
        tableData2:[],
        deposit:'',
        //登录历史
        tableData3:[],
        //订单信息
        tableData4:[],
        totle:'',
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
        //表单信息
        tableData6:[],
        tableDatalist:[],
        arr:[],
        //测试表单
        forms:[],
        //分页
        forMsum:null,
        forMcurrentPage:null,
        forMpagesize:null,
        //分销
        tableDataFlist:[],
        tableDataInfo:[]
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      handle(IDwechat){
        alert(IDwechat)
      },
      //基本信息
      onSubmitbasicInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let sendData = {
              customer_id:this.$route.query.product_id,
              status: this.basicInfo.status,
              email:this.basicInfo.email,
              group:this.basicInfo.customer_group,
              remark:this.basicInfo.remark
            }
            //console.log(sendData)
            this.$axios.post('/customer/editBaseInfo',sendData).then((response)=>{
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'success'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$router.go(-1)
      },
      //会员
      onSubmitvipInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let sendData = {
                vipcard_to_customer_id:this.vipInfo.vipcard_to_customer_id,
                status:this.vipInfo.status
              }
              this.$axios.post('/customer/editVipInfo',sendData).then((response)=>{
                if(response.data.status === 1){
                  this.$message({
                    showClose: true,
                    message: response.data.message,
                    type: 'success'
                  });
                }else {
                  this.$message({
                    showClose: true,
                    message: '保存失败！',
                    type: 'error'
                  });
                }

              })
            }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        console.log(val)
      },
      //分页
      forMhandleSizeChange(val){
        this.forMpagesize = val;
        //console.log(`每页 ${val} 条`);
      },
      forMhandleCurrentChanges(val){
        this.forMcurrentPage = val;
        this.$axios.post('/customer/getFormInfo',{'customer_id':this.$route.query.product_id,page:val}).then((response)=>{
          this.forms = response.data.data.data
          this.forMcurrentPage = response.data.data.current_page
          this.forMsum = response.data.data.total
          this.forMpagesize = response.data.data.per_page
        })
      }
    },
    created(){
      this.$axios.post('/customer_group/getCustomerGroupList').then((response) =>{
        this.customer_group = response.data.data.data
      })
      //基本信息
      this.$axios.post('/customer/getBaseInfo',{'customer_id':this.$route.query.product_id}).then((response)=>{
        this.basicInfo = response.data.data
        if(response.data.data === null){
          this.basicInfo = {}
        }
      })

      //会员
      this.$axios.post('/customer/getVipInfo',{'customer_id':this.$route.query.product_id}).then((response)=>{
        this.vipInfo = response.data.data
        if(response.data.data === null){
          this.vipInfo = {}
        }
      })
      //积分
      this.$axios.post('/customer/getPointInfo',{'customer_id':this.$route.query.product_id}).then((response)=>{
        this.tableData = response.data.data.point_history
        this.points = response.data.data.points
      })
      //储值卡
      this.$axios.post('/customer/getDepositInfo',{'customer_id':this.$route.query.product_id}).then((response)=>{
        this.tableData2 = response.data.data.deposit_history
        this.deposit = response.data.data.deposit
      })
      //登录历史
      this.$axios.post('/customer/getLoginInfo',{'customer_id':this.$route.query.product_id}).then((response)=>{
        this.tableData3 = response.data.data
        this.sum = response.data.data.length
      })
      //分销商
      this.$axios.post('/customer/getDistributorInfo',{'customer_id':this.$route.query.product_id}).then((response)=>{
        //console.log(response)
        if(response.data.data.distributor_list === null){
          this.tableDataFlist = []
        }else {
          this.tableDataFlist = response.data.data.distributor_list
        }
        if(response.data.data.distributor_info === null){
          this.tableDataInfo = []
        }else {
          this.tableDataInfo = response.data.data.distributor_info
        }
      })
      //订单信息
      this.$axios.post('/customer/getOrderInfo ',{'customer_id':this.$route.query.product_id}).then((response)=>{
        if(response.data.data === null){
          this.tableData4 = []
        }else {
          this.tableData4 = response.data.data.orders
          this.sum = response.data.data.orders.length
          this.totle = response.data.data.total
        }
      })
      //表单
      this.$axios.post('/customer/getFormInfo',{'customer_id':this.$route.query.product_id}).then((response)=>{
        //console.log(response)
        this.forms = response.data.data.data
        this.forMcurrentPage = response.data.data.current_page
        this.forMsum = response.data.data.total
        this.forMpagesize = response.data.data.per_page
      })
    }
  }
</script>
<style scoped lang="scss">
  .userDetails{
    header{
      h3{
        margin: 30px 20px;
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .basic-info,.vip-info,.integral-info,.login-info,.order-info{
      width: 100%;
      height: 100%;
      margin-top: 30px;
      overflow: hidden;
    }
    .basic-info-title,.vip-info-title,.integral-info-title,.login-info-title,.order-info-title{
      height: 60px;
      line-height: 60px;
      color: #666;
      padding-left: 20px;
      font-size:20px;
      background-color: rgba(215, 215, 215, 1);
    }
    .userhead{
      width: 80px;
      height: 80px;
      overflow: hidden;
      border: 1px #d7d7d7 solid;
    }
    .userhead img{
      display: block;
      width: 100%;
      height: 100%;
    }
    .basic-info-main{
      border: 1px solid #d7d7d7;
    }
    /*积分*/
    .integral-info-head{
      width: 100%;
      height: 60px;
      border: 1px solid #d7d7d7;
      border-top: 0;
      line-height: 60px;
      padding-left: 20px;
      font-size:18px;
    }
    .order-info{
      border: 1px solid #e1e1e8;
      border-bottom: none;
    }
    .order-info-footer{
      height: 50px;
      width: 100%;
      margin-top: 5px;
      border: 1px #d7d7d7 solid;
      p{
        float: right;
        height: 100%;
        margin-right: 100px;
        line-height: 50px;
        font-size: 20px;
      }
    }
  }
</style>
