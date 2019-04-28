<template>
  <div class="orderEcom">
    <header>
      <h3>视频订单列表</h3>
      <div class="ManageData-headRight">
        <label>版本类型 ：</label>
        <el-select
          name="selectList"
          id=""
          class="selectType"
          filterable
          placeholder="请选择"
          @change="changs"
          v-model="values_type">
          <el-option
            v-for="item in listOptins"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--<el-button type="danger" icon="el-icon-delete" @click="allDeleta">批量删除<i class="el-icon-delete"></i></el-button>-->
      </div>
    </header>
    <section class="orderEcom-main">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="全部订单" name="all">
          <div class="first">
            <div class="allList">
              <div class="screen">
                <div class="screen-list" style="margin-left: 30px">
                  <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                    <el-option
                      v-for="item in oerder_code"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input style="width: 180px" v-model="search_value1"></el-input>
                  <el-button type="primary" @click="sendOerderCode">筛选</el-button>
                </div>
                <div class="screen-list" >
                  <span>付款方式：</span>
                  <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in payment"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="screen-list">
                  <span>订单来源：</span>
                  <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in source"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="screen-list">
                  <span>选择日期：</span>
                  <div class="block">
                    <el-date-picker
                      v-model="startTime1"
                      type="daterange"
                      @change="selectTimes"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                  <span>活动类型：</span>
                  <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in activity"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="80">
                </el-table-column>
                <el-table-column label="订单号" prop="order_id">

                </el-table-column>
                <el-table-column label="姓名" prop="name">

                </el-table-column>
                <el-table-column label="电话" prop="tel">

                </el-table-column>
                <el-table-column label="实收" prop="income">

                </el-table-column>
                <el-table-column label="订单状态" prop="status_str">

                </el-table-column>
                <el-table-column label="日期" prop="create_time" sortable>

                </el-table-column>
                <el-table-column label="操作" width="280">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      :disabled="fsnumShow"
                      @click="pushOrderDetails(scope.$index, scope.row)"
                    >查看详情</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="待付款" name="third">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1"></el-input>
                <el-button type="primary" @click="sendOerderCode">筛选</el-button>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_third"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_id">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="订单状态" prop="status_str">

              </el-table-column>
              <el-table-column label="日期" prop="create_time" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="已完成" name="accomplish">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1"></el-input>
                <el-button type="primary" @click="sendOerderCode">筛选</el-button>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_accomplish"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_id">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="订单状态" prop="status_str">

              </el-table-column>
              <el-table-column label="日期" prop="create_time" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
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
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  export default {
    data () {
      return {
        activeName: 'all',
        tableData:[],
        tableData_third:[],
        tableData_accomplish:[],
        values_type:'',
        options: [],
        value: '',
        //所有
        search_value1:'',
        oderCode_value1:'',
        payment_value1:'',
        source_value1:'',
        activity_value1:'',
        startTime1:'',

        fsnumShow:false,
        //商品订单刷选
        productType:'',
        listOptins: [{
          value: 1,
          label: '电商版'
        }, /*{
          value: 2,
          label: '到店版'
        }, {
          value: 3,
          label: '外卖版'
        },{
          value: 4,
          label: '预约版'
        },*/{
          value: 5,
          label: '分销版'
        }/*,{
          value: 6,
          label: '旅游版'
        }*/
        ],
        //订单号筛选
        oerder_code:[
          {
            label:'订单号',
            value:'order_id'
          },{
            label:'电话',
            value:'tel'
          },{
            label:'名字',
            value:'name'
          }
        ],
        // 付款方式
        payment:[{
          label:'微信',
          value:'微信'
        },{
          label:'储值卡',
          value:'储值卡'
        },{
          label:'支付宝',
          value:'支付宝'
        }
        ],
        //订单来源
        source:[
          {
            label:'总店',
            value:'1'
          },
          {
            label:'子店',
            value:'2'
          }
        ],
        //活动形式
        activity:[{
          label:'会员卡',
          value:'1'
        },{
          label:'积分',
          value:'2'
        },{
          label:'折扣券',
          value:'3'
        },{
          label:'兑换券',
          value:'4'
        },{
          label:'满减券',
          value:'5'
        },{
          label:'红包',
          value:'6'
        },{
          label:'储值卡',
          value:'7'
        },{
          label:'组团',
          value:'8'
        },{
          label:'秒杀',
          value:'9'
        }
        ],
        //时间
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods: {
      //排序
      handleClick(tab, event) {
        switch(this.activeName){
          case 'all':
            this.search_value1 = ''
            this.oderCode_value1 =''
            this.payment_value1 = ''
            this.source_value1 = ''
            this.activity_value1 = ''
            this.startTime1 = ''
            this.$axios.post('/video_order/index').then((response) =>{
              this.tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'third':
            this.search_value1 = ''
            this.oderCode_value1 =''
            this.payment_value1 = ''
            this.source_value1 = ''
            this.activity_value1 = ''
            this.startTime1 = ''
            let thirdData = {
              status:1
            }
            this.$axios.post('/video_order/index',thirdData).then((response) =>{
              console.log(response)
              this.tableData_third = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'accomplish':
            this.search_value1 = ''
            this.oderCode_value1 =''
            this.payment_value1 = ''
            this.source_value1 = ''
            this.activity_value1 = ''
            this.startTime1 = ''
            let accomplishData = {
              status:4
            }
            this.$axios.post('/video_order/index',accomplishData).then((response) =>{
              this.tableData_accomplish = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          default:
            alert('还未添加')
        }
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      changs(){
        this.$nextTick(function () {
          let sum = parseInt(this.values_type)
          this.$axios.post('/order/getOrderList',{'program_type':sum}).then((response)=>{
              if(response.data.data.current_program_type == this.values_type){
                this.fsnumShow = false
              }else {
                this.fsnumShow = true
              }
              this.tableData = response.data.data.data
            this.sum = response.data.data.total
            })
        })
      },
      pushOrderDetails(index, row){
        this.$router.push({name:'videoOrderInfo',query:{data_id:row.order_id}})
      },
      //订单号筛选
      sendOerderCode(){
        switch(this.activeName){
          case 'all':
              let sedData = {
                keyword_type:this.oderCode_value1,
                keyword:this.search_value1
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData).then((response) =>{
                this.tableData = response.data.data.data
                this.sum = response.data.data.total
              })

            break;
          case 'third':
            let sedData1 = {
              keyword_type:this.oderCode_value1,
              keyword:this.search_value1
            }
            this.$axios.post('/video_order/index',sedData1).then((response) =>{
              this.tableData_third = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'accomplish':
            let sedData2 = {
              keyword_type:this.oderCode_value1,
              keyword:this.search_value1
            }
            this.$axios.post('/video_order/index',sedData2).then((response) =>{
              this.tableData_accomplish = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          default:
        }
      },
      //付款方式
      paymentType(){
        switch(this.activeName){
          case 'all':
              let sedData = {
                payment_type:this.payment_value1
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData).then((response) =>{
                this.tableData = response.data.data.data
                this.sum = response.data.data.total
              })
            break;
          case 'third':
            let sedData1 = {
              payment_type:this.payment_value1
            }
            this.$axios.post('/video_order/index',sedData1).then((response) =>{
              this.tableData_third = response.data.data.data
              this.sum = response.data.data.total
            })
            break;

          case 'accomplish':
              let sedData2 = {
                payment_type:this.payment_value1
              }
              this.$axios.post('/order/getOrderList',sedData2).then((response) =>{
                this.tableData_accomplish = response.data.data.data
                this.sum = response.data.data.total
              })
            break;
          default:
        }
      },
      //订单来源
      oerderSource(){
        switch(this.activeName){
          case 'all':
              let sedData = {
                source:this.source_value1
              }
              this.$axios.post('/video_order/index',sedData).then((response) =>{
                this.tableData = response.data.data.data
                this.sum = response.data.data.total
              })
            break;
          case 'third':
              let sedData1 = {
                source:this.source_value1
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData1).then((response) =>{
                this.tableData_third = response.data.data.data
                this.sum = response.data.data.total
              })
            break;
          case 'accomplish':
              let sedData2 = {
                source:this.source_value1
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData2).then((response) =>{
                this.tableData_accomplish = response.data.data.data
              })
            break;
          default:
        }
      },
      //选择日期
      selectTimes(){
        switch(this.activeName){
          case 'all':
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.startTime1[0])
              let overs = getDates.formatTime(this.startTime1[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              let sedData = {
                date:datess,
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData).then((response) =>{
                this.tableData = response.data.data.data
              })
            break;
          case 'third':
              let getDates1 = new parson.getTime()
              let rises1 = getDates1.formatTime(this.startTime1[0])
              let overs1 = getDates1.formatTime(this.startTime1[1])
              let datess1 = []
              datess1.push(rises1)
              datess1.push(overs1)
              let sedData1 = {
                date:datess1,
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData1).then((response) =>{
                this.tableData_third = response.data.data.data
              })
            break;
          case 'accomplish':
              let getDates2 = new parson.getTime()
              let rises2 = getDates2.formatTime(this.startTime1[0])
              let overs2 = getDates2.formatTime(this.startTime1[1])
              let datess2 = []
              datess2.push(rises2)
              datess2.push(overs2)
              let sedData2 = {
                date:datess2,
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData2).then((response) =>{
                this.tableData_accomplish = response.data.data.data
              })
            break;
          default:
        }
      },
      //活动类型
      activeType(){
        switch(this.activeName){
          case 'all':
              let sedData = {
                activation_type:this.activity_value1
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData).then((response) =>{
                this.tableData = response.data.data.data
              })
            break;
          case 'third':
              let sedData1 = {
                activation_type:this.activity_value1
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData1).then((response) =>{
                this.tableData_third = response.data.data.data
              })
            break;
          case 'accomplish':
              let sedData2 = {
                activation_type:this.activity_value1
              }
              //全部订单
              this.$axios.post('/video_order/index',sedData2).then((response) =>{
                this.tableData_accomplish = response.data.data.data
              })
            break;
          default:
        }
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/video_order/index',{page:val}).then((response) =>{
          this.productType = response.data.data.current_program_type
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      }
    },
    created(){
      //全部订单
      this.$axios.post('/video_order/index').then((response) =>{
        if(response.data.status === 200){
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        }
        this.productType = response.data.data.current_program_type

      })
    },

  }
</script>
<style scoped lang="scss">
  .orderEcom{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-left: 20px;
      h3{
        margin: 30px 20px;
      }
      .ManageData-headRight{
        float: right;
        padding-right: 30px;
        .selectType{
          width: 110px;
        }
      }
    }
    .orderEcom-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
      .demo-table-expand {
        font-size: 0;
      }
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
        padding: 0 126px;
      }
    }
  }
  .screen{
    overflow: hidden;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    .screen-list{
      overflow: hidden;
      float: left;
      margin-right: 20px;
      height: 36px;
      line-height: 36px;
      .block{
        float: right;
      }
    }
  }
</style>
