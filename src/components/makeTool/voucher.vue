<template>
  <div class="voucher">
    <header class="voucher">
      <h3>代金券列表</h3>
      <div class="voucher-btn">
        <button type="button" class="btn btn-primary" @click="addvoucher">添加代金券</button>
        <el-button type="danger" @click="listDelete">批量删除 <i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="voucher-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
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
          label="代金券名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="代金券设置"
          prop="condition"
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData:[],
      }
    },
    components: {

    },
    methods: {
      addvoucher(){
        this.$router.push({path:'/home/marketing/addVoucher'})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row){
        this.$router.push({name:'eidtVoucher',query:{voucher_id:row.voucher_id}})
      },
      handleDelete(index, row){
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
          this.$axios.post('/voucher/deleteVoucher',{'voucher_id':row.voucher_id}).then((response) =>{
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
      listDelete(index,row){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.voucher_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/voucher/deleteVoucherInBatch',
          method:'post',
          data:{
            'voucher_id_array':arr_id
          }
        }).then((response)=>{
          //console.log(response)
          if(response.data.status === 1){
            this.$axios.post('/voucher/getVoucherList').then((response) =>{
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
      },
    },
    created(){
      this.$axios.post('/voucher/getVoucherList').then((response)=>{
        this.tableData = response.data.data
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
  .voucher{
    @include aspect(100%,100%);
    .voucher{
      overflow: hidden;
      h3{
        clear: none;
        margin-left: 20px;
        margin-top: 30px;
      }
      .voucher-btn{
        margin-top: 30px;
        float: right;
        margin-right: 30px;
      }
    }
    .voucher-main{
      padding-top: 30px;
    }
  }
</style>
