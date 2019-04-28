<template>
  <div class="vip">
    <header class="vip">
      <h3>会员卡列表</h3>
      <div class="vip-btn">
        <button type="button" class="btn btn-primary" @click="addvip">添加会员卡</button>
        <el-button type="danger" @click="allDelete">批量删除 <i class="el-icon-delete"></i></el-button>
      </div>

    </header>
    <section class="vip-main">
      <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width:100%"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
          label="会员卡名称"
          :show-overflow-tooltip="true"
          prop="name">
        </el-table-column>
        <el-table-column
          label="会员条件"
          :show-overflow-tooltip="true"
          prop="condition">
        </el-table-column>
        <el-table-column
          label="会员条件权益"
          prop="discount">
        </el-table-column>
        <el-table-column
          label="领卡人数"
          prop="count">
        </el-table-column>
        <el-table-column
          label="会员卡级别"
          sortable="custom"
          prop="level">
        </el-table-column>
        <el-table-column
          label="会员卡期限"
          :show-overflow-tooltip="true"
          prop="valid_time">
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
        //排序
        order_name:null,
        order_type:null,
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
      addvip(){
        this.$router.push({path:'/home/marketing/addvip'})
      },
      allDelete(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.vipcard_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        //console.log(arr_id)
        this.$axios({
          url:'/vipcard/deleteVipcardInBatch',
          method:'post',
          data:{
            'vipcard_id_array':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 1){
            this.$axios.post('/vipcard/getVipcardList',{page:this.currentPage}).then((response) =>{
              this.tableData = response.data.data.data
              this.sum = response.data.data.total
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
          this.$axios.post('/vipcard/deleteVipcard',{'vipcard_id':row.vipcard_id}).then((response) =>{
            if(response.data.status === 1){
              this.$axios.post('/vipcard/getVipcardList',{page:this.currentPage}).then((response) =>{
                this.tableData = response.data.data.data
                this.sum = response.data.data.total
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleEdit(index,row){
        //console.log(row.comment_id)
        this.$router.push({name:'editVip',query:{data:row.vipcard_id}})
      },
      //排序
      sortChange(column, prop, order){
        this.$axios.post('/vipcard/getVipcardList',{ order_name:column.prop,order_type:column.order}).then((response)=>{
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/vipcard/getVipcardList',{page:val,order_name:this.order_name,order_type:this.order_name}).then((response)=>{
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      }
    },
    created(){
      this.$axios.post('/vipcard/getVipcardList').then((response) =>{
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
  .vip{
    @include aspect(100%,100%);

    .vip{
      overflow: hidden;
      h3{
        clear: none;
        margin-left: 20px;
        margin-top: 30px;
      }
      .vip-btn{
        margin-top: 30px;
        float: right;
        margin-right: 30px;
      }
    }
    .vip-main{
      padding-top: 30px;
    }
  }
</style>
