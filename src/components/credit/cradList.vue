<template>
  <div class="orderEcom">
    <header>
      <h3>信用卡列表</h3>
    </header>
    <section class="orderEcom-main">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="全部" name="all">
          <div class="first">
            <div class="allList">
              <div class="screen" style="line-height: 65px">
                <div class="screen-list" style="margin-left: 30px">
                  <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                    <el-option
                      v-for="item in oerder_code"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
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
              </div>
              <el-table
                ref="multipleTable"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="80">
                </el-table-column>
                <el-table-column label="订单号" prop="order_id">

                </el-table-column>
                <el-table-column label="日期" prop="created_at" sortable>

                </el-table-column>
                <el-table-column label="申请银行" prop="created_at" sortable>

                </el-table-column>
                <el-table-column label="姓名" prop="name">

                </el-table-column>
                <el-table-column label="电话" prop="tel">

                </el-table-column>
                <el-table-column label="身份证号码" prop="identity_card">

                </el-table-column>
                <el-table-column label="期望额度" prop="expect_limit">

                </el-table-column>
                <el-table-column label="订单状态" prop="status">

                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <button type="button" class="btn btn-primary" @click="pushOrderDetails(scope.$index, scope.row)">查看详情</button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin: 20px auto;">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  align="center"
                  :page-sizes="[10, 20, 30, 40]"
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
        <el-tab-pane label="待申请" name="third">
          <div class="allList">
            <div class="screen" style="line-height: 65px">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
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
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_third.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_id">

              </el-table-column>
              <el-table-column label="日期" prop="created_at" sortable>

              </el-table-column>
              <el-table-column label="申请银行" prop="created_at" sortable>

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="身份证号码" prop="identity_card">

              </el-table-column>
              <el-table-column label="期望额度" prop="expect_limit">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <button type="button" class="btn btn-primary" @click="pushOrderDetails(scope.$index, scope.row)"> 查看详情</button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin: 20px auto;">
              <el-pagination
                background
                layout="prev, pager, next"
                align="center"
                :page-sizes="[10, 20, 30, 40]"
                :pager-count="currentPage"
                :page-size="pagesize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChanges"
                :total="sum">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="申请中" name="second">
          <div class="allList">
            <div class="screen" style="line-height: 65px">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
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
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_second.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_id">

              </el-table-column>
              <el-table-column label="日期" prop="created_at" sortable>

              </el-table-column>
              <el-table-column label="申请银行" prop="created_at" sortable>

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="身份证号码" prop="identity_card">

              </el-table-column>
              <el-table-column label="期望额度" prop="expect_limit">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <button type="button" class="btn btn-primary" @click="pushOrderDetails(scope.$index, scope.row)"> 查看详情</button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin: 20px auto;">
              <el-pagination
                background
                layout="prev, pager, next"
                align="center"
                :page-sizes="[10, 20, 30, 40]"
                :pager-count="currentPage"
                :page-size="pagesize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChanges"
                :total="sum">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="申请成功" name="fourth">
          <div class="allList">
            <div class="screen" style="line-height: 65px">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
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
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_fourth.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_id">

              </el-table-column>
              <el-table-column label="日期" prop="created_at" sortable>

              </el-table-column>
              <el-table-column label="申请银行" prop="created_at" sortable>

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="身份证号码" prop="identity_card">

              </el-table-column>
              <el-table-column label="期望额度" prop="expect_limit">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <button type="button" class="btn btn-primary" @click="pushOrderDetails(scope.$index, scope.row)"> 查看详情</button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin: 20px auto;">
              <el-pagination
                background
                layout="prev, pager, next"
                align="center"
                :page-sizes="[10, 20, 30, 40]"
                :pager-count="currentPage"
                :page-size="pagesize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChanges"
                :total="sum">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="申请失败" name="accomplish">
          <div class="allList">
            <div class="screen" style="line-height: 65px">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
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
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_accomplish.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_id">

              </el-table-column>
              <el-table-column label="日期" prop="created_at" sortable>

              </el-table-column>
              <el-table-column label="申请银行" prop="product_name" sortable>

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="身份证号码" prop="identity_card">

              </el-table-column>
              <el-table-column label="期望额度" prop="expect_limit">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <button type="button" class="btn btn-primary" @click="pushOrderDetails(scope.$index, scope.row)"> 查看详情</button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin: 20px auto;">
              <el-pagination
                background
                layout="prev, pager, next"
                align="center"
                :page-sizes="[10, 20, 30, 40]"
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
        //代发货
        tableData_second:[],
        tableData_third:[],
        tableData_fourth:[],
        tableData_accomplish:[],
        values_type:'',
        options: [],
        value: '',
        //所有
        search_value1:'',
        oderCode_value1:'',
        startTime1:'',
        fsnumShow:false,
        //商品订单刷选
        productType:'',
        //订单号筛选
        oerder_code:[{
          label:'订单号',
          value:'order_id'
        },{
          label:'手机号',
          value:'tel'
        },{
          label:'姓名',
          value:'real_name'
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
      handleClick(tab, event) {
      switch(this.activeName){
        case 'all':
          this.startTime1 = ''
          this.search_value1 = ''
          this.oderCode_value1 =''
          this.$axios.post('/credit_card_apply/indexList').then((response) =>{
            this.tableData = response.data.data
          })
          break;
        case 'second':
          this.search_value1 = ''
          this.startTime1 = ''
          this.oderCode_value1 =''
          let secondData = {
            status:1
          }
          //console.log(secondData)
          this.$axios.post('/credit_card_apply/indexList',secondData)
            .then((response) =>{
              this.tableData_second = response.data.data
            })
          break;
        case 'third':
          this.search_value1 = ''
          this.startTime1 = ''
          this.oderCode_value1 =''
          let thirdData = {
            status:0
          }
          this.$axios.post('/credit_card_apply/indexList',thirdData)
            .then((response) =>{
              this.tableData_third = response.data.data
            })
          break;
        case 'fourth':
          this.search_value1 = ''
          this.startTime1 = ''
          this.oderCode_value1 =''
          let fourthData = {
            status:2
          }
          this.$axios.post('/credit_card_apply/indexList',fourthData)
            .then((response) =>{
              this.tableData_fourth = response.data.data
            })
          break;
        case 'accomplish':
          this.search_value1 = ''
          this.startTime1 = ''
          this.oderCode_value1 =''
          let accomplishData = {
            status:-1
          }
          this.$axios.post('/credit_card_apply/indexList',accomplishData)
            .then((response) =>{
              this.tableData_accomplish = response.data.data
            })
          break;
        default:
          alert('还未添加')
      }
    },
      handleEdit(index, row) {
        console.log(index, row);
      },
      /*handleDelete(index, row) {
        switch(this.activeName){
          case 'all':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.tableData.splice(index,1);
                this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
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
              }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            break;
          case 'second':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.tableData_second.splice(index,1);
                this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
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
              }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            break;
          case 'third':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.tableData_third.splice(index,1);
                this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
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
              }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            break;
          case 'fourth':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.tableData_fourth.splice(index,1);
                this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
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
              }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            break;
          case 'accomplish':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.tableData_accomplish.splice(index,1);
                this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
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
              }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            break;
          case 'accomplishs':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.tableData_accomplishs.splice(index,1);
                this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
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
              }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            break;
          default:
            alert('还未添加')
        }
      },*/
      /*allDeleta(){
        // 点击删除全部时
        let arr = []
        //console.log(this.multipleSelection)
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.order_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/order/deleteOrderInBatch',
          method:'post',
          data:{
            'order_id_array':arr_id
          }
        }).then((response)=>{
          //console.log(response)
          if(response.data.status === 1){
            this.$axios.post('/order/getOrderList').then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                //console.log(response)
                this.tableData = response.data.data
              }
            })
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
      },*/
      pushOrderDetails(index, row){
        this.$router.push({name:'applyCradInfo',query:{'data':row}})
      }, //订单号筛选
      sendOerderCode(){
        switch(this.activeName){
          case 'all':
            let sedData = {
              keyword_type:this.oderCode_value1,
              keyword:this.search_value1,
            }
            this.$axios.post('/credit_card_apply/indexList',sedData).then((response) =>{
              this.tableData = response.data.data
            })
            break;
          case 'second':
            let sedData1 = {
              status:1,
              keyword_type:this.oderCode_value1,
              keyword:this.search_value1
            }
            this.$axios.post('/credit_card_apply/indexList',sedData1).then((response) =>{
              this.tableData_second = response.data.data
            })
            break;
          case 'third':
            let sedData2 = {
              status:0,
              keyword_type:this.oderCode_value1,
              keyword:this.search_value1,
            }
            //全部订单
            this.$axios.post('/credit_card_apply/indexList',sedData2).then((response) =>{
              this.tableData_third = response.data.data
            })
            break;
          case 'fourth':
            let sedData3 = {
              status:2,
              keyword_type:this.oderCode_value1,
              keyword:this.search_value1,
            }
            this.$axios.post('/credit_card_apply/indexList',sedData3).then((response) =>{
              this.tableData_fourth = response.data.data
            })
            break;
          case 'accomplish':
            let sedData4 = {
              status:-1,
              keyword_type:this.oderCode_value1,
              keyword:this.search_value1,
            }
            this.$axios.post('/credit_card_apply/indexList',sedData4).then((response) =>{
              this.tableData_accomplish = response.data.data
            })
            break;
          default:
        }
      },
      //选择日期
      selectTimes(){
        switch(this.activeName){
          case 'all':
            if(this.startTime1 === ''){
              let datess = []
              let sedData = {
                date:datess,
              }
              //全部订单
              this.$axios.post('/credit_card_apply/indexList',sedData)
                .then((response) =>{
                  this.tableData = response.data.data
                })
            }else {
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
              this.$axios.post('/credit_card_apply/indexList',sedData)
                .then((response) =>{
                  this.tableData = response.data.data
                })
            }
            break;
          case 'second':
            if(this.startTime1 === ''){
              let datess = []
              let sedData = {
                status:1,
                date:datess,
              }
              //console.log(sedData)
              //全部订单
              this.$axios.post('/credit_card_apply/indexList',sedData)
                .then((response) =>{
                  this.tableData_second = response.data.data
                })
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.startTime1[0])
              let overs = getDates.formatTime(this.startTime1[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              let sedData = {
                status:1,
                date:datess,
              }
              this.$axios.post('/credit_card_apply/indexList',sedData)
                .then((response) =>{
                  this.tableData_second = response.data.data
                })
            }
            break;
          case 'third':
            if(this.startTime1 === ''){
              let datess = []
              let sedData = {
                status:0,
                date:datess,
              }
              this.$axios.post('/credit_card_apply/indexList',sedData)
                .then((response) =>{
                  this.tableData_third = response.data.data
                })
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.startTime1[0])
              let overs = getDates.formatTime(this.startTime1[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              let sedData = {
                status:0,
                date:datess,
              }
              this.$axios.post('/credit_card_apply/indexList',sedData).then((response) =>{
                this.tableData_third = response.data.data
              })
            }
            break;
          case 'fourth':
            if(this.startTime1 === ''){
              let datess = []
              let sedData = {
                status:2,
                date:datess,
              }
              this.$axios.post('/credit_card_apply/indexList',sedData).then((response) =>{
                this.tableData_fourth = response.data.data
              })
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.startTime1[0])
              let overs = getDates.formatTime(this.startTime1[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              let sedData = {
                status:2,
                date:datess,
              }
              this.$axios.post('/credit_card_apply/indexList',sedData).then((response) =>{
                this.tableData_fourth = response.data.data
              })
            }
            break;
          case 'accomplish':
            if(this.startTime1 === ''){
              let datess = []
              let sedData = {
                status:-1,
                date:datess,
              }
              console.log(sedData)
              this.$axios.post('/credit_card_apply/indexList',sedData).then((response) =>{
                this.tableData_accomplish = response.data.data
              })
            }else {
              let getDates = new parson.getTime()
              let rises = getDates.formatTime(this.startTime1[0])
              let overs = getDates.formatTime(this.startTime1[1])
              let datess = []
              datess.push(rises)
              datess.push(overs)
              let sedData = {
                status:-1,
                date:datess,
              }
             // console.log(sedData)
              this.$axios.post('/credit_card_apply/indexList',sedData)
                .then((response) =>{
                  this.tableData_accomplish = response.data.data
                })
            }
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
      }
    },
    created(){
      //全部订单
      this.$axios.post('/credit_card_apply/indexList').then((response) =>{
          this.sum = response.data.data.length
          this.tableData = response.data.data
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
      .block{
        float: right;
      }
    }
  }
</style>
