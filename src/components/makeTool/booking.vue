<template>
  <div class="booking">
    <header>
      <h3>拼团列表</h3>
      <div class="booking-btn-left">
        <button type="button" class="btn btn-primary" @click="statusClick1">全部</button>
        <el-button @click="statusClick2">未开始</el-button>
        <el-button @click="statusClick3">进行中</el-button>
        <el-button @click="statusClick4">已结束</el-button>
      </div>
      <div class="booking-btn">
        <button type="button" class="btn btn-primary" @click="addbooking">添加拼团</button>
        <el-button type="danger" @click="allDelete">批量删除 <i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="booking-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width:100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="拼团日期"
          prop="create_time"
          width="250">
        </el-table-column>
        <el-table-column
          label="拼团人数"
          prop="people_number">
        </el-table-column>
        <el-table-column
          label="限购件数"
          prop="buy_num_limit">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="拼团时间">
          <template slot-scope="scope">
            {{scope.row.start_time}}至{{scope.row.end_time}}
          </template>
        </el-table-column>
        <el-table-column
          label="活动状态"
          prop="activity_status">
        </el-table-column>
        <el-table-column
          width="200"
          label="操作">
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
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData:[],
        multipleSelection: [],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addbooking(){
        this.$router.push({name:'addBooking'})
      },
      allDelete(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        //console.log(arr_id)
        this.$axios({
          url:'/group_booking/deleteBatch',
          method:'post',
          data:{
            'id_arr':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/group_booking/index',{page:this.currentPage}).then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                this.tableData = response.data.data.data
                this.sum = response.data.data.total
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
          this.tableData.splice(index,1);
          this.$axios.post('/group_booking/delete',{'id':row.id}).then((response) =>{
            if(response.data.status === 200){
              this.$axios.post('/group_booking/index',{page:this.currentPage}).then((response) =>{
                if(response.status === 0){
                  alert('获取商品列表失败！')
                }else {
                  this.tableData = response.data.data.data
                  this.sum = response.data.data.total
                }
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
      handleEdit(index,row){
        this.$router.push({name:'editBooking',query:{data:row.id}})
      },
      //状态
      statusClick1(){
        this.$axios.post('/group_booking/index',{status:0}).then((response)=>{
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
      },
      statusClick2(){
        this.$axios.post('/group_booking/index',{status:1}).then((response)=>{
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
      },
      statusClick3(){
        this.$axios.post('/group_booking/index',{status:2}).then((response)=>{
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
      },
      statusClick4(){
        this.$axios.post('/group_booking/index',{status:3}).then((response)=>{
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
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/group_booking/index',{page:val}).then((response)=>{
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      }
    },
    created(){
      this.$axios.post('/group_booking/index').then((response)=>{
        this.tableData = response.data.data.data
        this.sum = response.data.data.total
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
  .booking{
    @include aspect(100%,100%);
    header{
      overflow: hidden;
      h3{
        margin-top: 30px;
        margin-left: 20px;
        margin-bottom: 30px;
      }
      .booking-btn-left{
        float: left;
        margin-left: 20px;
      }
      .booking-btn{
        float: right;
        margin-right: 30px;
      }
    }
    .booking-main{
      padding-top: 30px;
    }
  }
</style>
