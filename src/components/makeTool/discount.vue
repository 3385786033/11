<template>
  <div class="discount">
    <header>
      <h3>折扣券列表</h3>
      <div class="discount-btn">
        <button type="button" class="btn btn-primary" @click="adddiscount">添加折扣券</button>
        <el-button type="danger" @click="allDelete">批量删除 <i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="discount-main">
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width:100%"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="折扣券名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="折扣券设置"
          prop="discount"
        >
        </el-table-column>
        <el-table-column
          label="领取时间"
          prop="receive_time"
        >
        </el-table-column>
        <el-table-column
          label="有效期"
          prop="valid_time"
        >
        </el-table-column>
        <el-table-column
          label="不可用时间"
          prop="invalid_time"
        >
        </el-table-column>
        <el-table-column
          label="库存"
          prop="stock"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
        multipleSelection:[],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    components: {

    },
    methods:{
      adddiscount(){
        this.$router.push({path:'/home/marketing/addDiscount'})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index,row){
        this.$router.push({name:'editDiscount',query:{data:row.coupon_id}})
      },
      allDelete(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.coupon_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        console.log(arr_id)
        this.$axios({
          url:'/coupon/deleteCouponInBatch',
          method:'post',
          data:{
            'coupon_id_array':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 1){
            this.$axios.post('/coupon/getCouponList').then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
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
          this.$axios.post('/exchange/deleteExchange',{'exchange_id':row.coupon_id}).then((response) =>{
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
      this.$axios.post('/coupon/getCouponList')
        .then((response) =>{
          this.tableData = response.data.data
          this.sum = response.data.data.length
          //console.log(response)
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
  .discount{
    @include aspect(100%,100%);
    header{
      overflow: hidden;
      h3{
        clear: none;
        margin-top: 30px;
        margin-left: 20px;
      }
      .discount-btn{
        margin-top: 30px;
        float: right;
        margin-right: 30px;
      }
    }
    .discount-main{
      padding-top: 30px;
    }
  }
</style>
