<template>
  <div class="Integral">
    <!--分类管理-->
    <div class="classManage">
      <h3>秒杀列表</h3>
      <div class="classManageBtn">
        <div class="classManageleft">
          <button type="button" class="btn btn-primary" @click="statusClick1">全部</button>
          <el-button @click="statusClick2">未开始</el-button>
          <el-button @click="statusClick3">进行中</el-button>
          <el-button @click="statusClick4">已结束</el-button>
        </div>
        <div class="classManageright">
          <button type="button" class="btn btn-primary" @click="addIntegrals">添加秒杀</button>
          <el-button type="danger" @click="allDelete">批量删除 <i class="el-icon-delete"></i></el-button>
        </div>
      </div>
      <!--分类信息-->
      <div class="classManageInfo">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="70">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="日期"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            label="秒杀时间">
            <template slot-scope="scope">{{scope.row.start_time}}至{{scope.row.end_time}}</template>
          </el-table-column>
          <el-table-column
            prop="buy_num_limit"
            label="限购件数">
          </el-table-column>

          <el-table-column
            prop="activity_status"
            label="活动状态"
            width="200">
          </el-table-column>
          <el-table-column label="操作" width="200">
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
      </div>
    </div>
    <!--end-->
  </div>
</template>
<script>
  export default {
    name: 'Integral',
    data() {
      return {
        labelPosition:'right',
        tableData: [],
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
      handleEdit(index, row) {
        this.$router.push({name:'editSeckill',query:{data:row.id}})
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
          this.$axios.post('/seckill/delete',{'id':row.id}).then((response) =>{
            if(response.data.status === 200){
              this.$axios.post('/seckill/index',{page:this.currentPage}).then((response) =>{
                if(response.data.status === 200){
                  this.tableData = response.data.data.data
                  this.sum = response.data.data.total
                }else {

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
      allDelete(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/seckill/deleteBatch',
          method:'post',
          data:{
            'id_arr':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/seckill/index',{page:this.currentPage}).then((response) =>{
              if(response.data.status === 200){
                this.tableData = response.data.data.data
                this.sum = response.data.data.total
              }else {

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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addIntegrals(){
        this.$router.push({path:'/home/marketing/addSeckill'})
      },
      //状态
      statusClick1(){
        this.$axios.post('/seckill/index',{status:0}).then((response)=>{
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
        this.$axios.post('/seckill/index',{status:1}).then((response)=>{
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
        this.$axios.post('/seckill/index',{status:2}).then((response)=>{
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
        this.$axios.post('/seckill/index',{status:3}).then((response)=>{
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
        this.$axios.post('/seckill/index',{page:val}).then((response)=>{
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
    },
    created(){
      this.$axios.post('/seckill/index').then((response)=>{
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
  .Integral{
    @include aspect(100%,100%);
    /*分类管理*/
    .classManage{
      @include aspect(100%,auto);
      padding-bottom: 20px;
      h3{
        margin: 30px 20px;
      }
      .classManageBtn{
        @include aspect(100%,auto);
        .classManageleft{
          float: left;
          margin-left: 30px;
        }
        .classManageright{
          float: right;
          margin-right: 30px;
        }
      }
      .classManageInfo{
        @include aspect(100%,auto);
        margin-top: 20px;
      }
    }
    .addCommodity{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      @include aspect(100%,100%);
      background-color: rgba(0,0,0,.5);
      z-index: 9;
      .addCommodity-main{
        width: 60%;
        height: 700px;
        position: absolute;
        background-color: #fff;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        header{
          margin-top: 20px;
          overflow: hidden;
          padding-left: 30px;
          margin-bottom: 20px;
        }
        .content{
          padding-left: 30px;
        }
      }
    }
  }
</style>
