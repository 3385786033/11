<template>
  <div class="exchange">
    <header>
      <h3>退换货</h3>
      <div class="head-right">
        <!--<el-select v-model="value4" clearable placeholder="请选择ds分类" style="width: 160px">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--<button type="button" class="btn btn-primary" > 导出数据</button>-->
        <!--<el-button type="danger" icon="el-icon-delete">批量删除<i class="el-icon-delete"></i></el-button>-->
      </div>
    </header>
    <section class="exchange-main">
      <div class="allList">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
          <el-tab-pane label="全部订单" name="all">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code" :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column label="用户名称" prop="name" :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column label="商品" prop="product" :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column label="价格" prop="price">

              </el-table-column>
              <el-table-column label="数量" prop="amount">

              </el-table-column>
              <el-table-column label="退款金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="退款说明" prop="remark" :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column label="退货原因" prop="reason" :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="exchanges(scope.$index, scope.row)">编辑
                  </el-button>
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
          </el-tab-pane>
          <el-tab-pane label="审核中" name="second">
            <el-table
              ref="multipleTable"
              :data="tableData2"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="用户名称" prop="name">

              </el-table-column>
              <el-table-column label="商品" prop="product">

              </el-table-column>
              <el-table-column label="价格" prop="price">

              </el-table-column>
              <el-table-column label="数量" prop="amount">

              </el-table-column>
              <el-table-column label="退款金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="退款说明" prop="remark">

              </el-table-column>
              <el-table-column label="退货原因" prop="reason">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable>

              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="exchanges(scope.$index, scope.row)">编辑
                  </el-button>
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
          </el-tab-pane>
          <el-tab-pane label="退款中" name="third">
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="用户名称" prop="name">

              </el-table-column>
              <el-table-column label="商品" prop="product">

              </el-table-column>
              <el-table-column label="价格" prop="price">

              </el-table-column>
              <el-table-column label="数量" prop="amount">

              </el-table-column>
              <el-table-column label="退款金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="退款说明" prop="remark">

              </el-table-column>
              <el-table-column label="退货原因" prop="reason">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable>

              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="exchanges(scope.$index, scope.row)">编辑
                  </el-button>
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
          </el-tab-pane>
          <el-tab-pane label="退款已完成" name="accomplish">
            <el-table
              ref="multipleTable"
              :data="tableData4"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="用户名称" prop="name">

              </el-table-column>
              <el-table-column label="商品" prop="product">

              </el-table-column>
              <el-table-column label="价格" prop="price">

              </el-table-column>
              <el-table-column label="数量" prop="amount">

              </el-table-column>
              <el-table-column label="退款金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="退款说明" prop="remark">

              </el-table-column>
              <el-table-column label="退货原因" prop="reason">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable>

              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="exchanges(scope.$index, scope.row)">编辑
                  </el-button>
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: true,
        activeName:'all',
        //value4: '',
        tableData:[],
        tableData2:[],
        tableData3:[],
        tableData4:[],
        options: [{
          value: '选项1',
          label: '申通快递'
        }],
        value:'',
        value4:'',
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods: {
      handleClick(){
        switch(this.activeName){
          case 'all':
            this.$axios.post('/returns/getReturnList').then((response) =>{
                this.tableData = response.data.data.data
              })
            break;
          case 'second':
            this.$axios.post('/returns/getReturnList',{status:1}).then((response) =>{
                this.tableData2 = response.data.data.data
              })
            break;
          case 'third':
            this.$axios.post('/returns/getReturnList',{status:2}).then((response) =>{
                this.tableData3 = response.data.data.data
              })
            break;
          case 'accomplish':
            this.$axios.post('/returns/getReturnList',{status:3}).then((response) =>{
                this.tableData4 = response.data.data.data
              })
            break;
          default:
            alert('还未添加')
        }
      },
      exchanges(index,row){
        //console.log(row)
        this.$router.push({name:'exchesDetali',query:{data:row}})
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/returns/getReturnList',{status:0,page:val}).then((response) =>{
          this.tableData = response.data.data.data
        })
      }
    },
    created(){
      this.$axios.post('/returns/getReturnList',{status:0}).then((response) =>{
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        })
    }
  }
</script>
<style scoped lang="scss">
  .exchange{
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
      .head-right{
        float: right;
        margin-right: 30px;
      }
    }
    .exchange-main{
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
