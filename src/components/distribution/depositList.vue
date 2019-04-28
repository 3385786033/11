<template>
  <div class="depositList">
    <header>
      <h3>提现申请列表</h3>
      <div class="head-left">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="inputValues"
          style="width: 360px;float: left"
        >
          <template slot="prepend"><el-button icon="el-icon-search">搜索</el-button></template>
        </el-input>
        <div class="block">
          <span>申请日期</span>
          <el-date-picker
            v-model="times"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <button type="button" class="btn btn-primary" style="margin-left: 20px" @click="inquire"> 查询</button>
      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary" style="margin-left: 10px" @click="sendfal1"> 已审核</button>
        <button type="button" class="btn btn-primary" style="margin-left: 10px" @click="sendfal2"> 待审核</button>
      </div>
    </header>
    <section class="depositList-main">
      <form action="">
        <el-table
          ref="singleTable"
          :data="tableData"
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            :show-overflow-tooltip="true"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="customer_name"
            :show-overflow-tooltip="true"
            label="分销商名">
          </el-table-column>
          <el-table-column
            prop="value"
            label="申请金额">
          </el-table-column>
          <el-table-column
            prop="create_date"
            :show-overflow-tooltip="true"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="account_type"
            label="账号类型">
          </el-table-column>
          <el-table-column
            prop="account_value"
            :show-overflow-tooltip="true"
            label="收款账号">
          </el-table-column>
          <el-table-column
            width="180"
            label="状态">
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" clearable placeholder="请选择" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <button type="button" class="btn btn-primary" @click="handleEdit(scope.$index, scope.row)"> 保存</button>
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
      </form>
    </section>
  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  export default {
    data () {
      return {
        inputValues:'',
        times: '',
        value4:'',
        options:[{
          value: 1,
          label: '已审核'
        },{
          value: 2,
          label: '待审核'
        }],
        tableData:[],
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
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods:{
      handleEdit(index,row){
        this.$axios.post('/distributor/editWithdraw ',{'remark':row.remark,'withdraw_id':row.withdraw_id,'status':row.status}).then((response)=>{
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
      },
      inquire(){
        let datess = []
        if(this.times === ''|| this.times === undefined){
          let datess = []
        }else {
          let getDates = new parson.getTime()
          let rises = getDates.formatTime(this.times[0])
          let overs = getDates.formatTime(this.times[1])
          datess.push(rises)
          datess.push(overs)
        }
        this.$axios.post('/distributor/getWithdrawList',{'search_value':this.inputValues,'date':datess}).then((response)=>{
          if(response.data.status === 200){
            this.tableData = response.data.data.data
          }else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
        })
      },
      handleCurrentChange(){

      },
      sendfal1(){
        this.$axios.post('/distributor/getWithdrawList',{'status':1}).then((response)=>{
            if(response.data.status === 200){
              this.tableData = response.data.data.data
            }else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          })
      },
      sendfal2(){
        this.$axios.post('/distributor/getWithdrawList',{'status':2})
          .then((response)=>{
            if(response.data.status === 200){
              this.tableData = response.data.data.data
            }else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          })
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/distributor/getWithdrawList',{page:val}).then((response)=>{
          if(response.data.status === 200){
            this.tableData = response.data.data.data
          }else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
        })
      }
    },
    created(){
      this.$axios.post('/distributor/getWithdrawList').then((response)=>{
          if(response.data.status === 200){
            this.tableData = response.data.data.data
            this.sum = response.data.data.total
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
  .depositList{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
      h3{
        margin: 30px 20px;
      }
      .head-left{
        margin-top: 20px;
        float: left;
        margin-left: 20px;
        .block{
          float: left;
          margin-left: 20px;
        }
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .depositList-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
