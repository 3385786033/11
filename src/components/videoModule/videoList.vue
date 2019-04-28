<template>
  <div class="videoList">
    <header>
      <h3>视频列表</h3>
      <div class="head-left">
        <el-input style="width: 180px" placeholder="请输入内容搜索" v-model="searchValue" @keydown.enter.native="sendSortValue"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="sendSortValue">搜索</el-button>
      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary" @click="addVideo"><i class="el-icon-plus" ></i> 添加视频</button>
        <el-button type="danger" icon="el-icon-delete" @click="listDelete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="videoList-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="视频名称"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="group_name" label="分类">

        </el-table-column>
        <el-table-column label="预览图">
          <template slot-scope="scope">
            <img :src="scope.row.preview_picture[0]" :alt="scope.row.preview_picture[0]" style="width: 50px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column label="大小" prop="size">

        </el-table-column>
        <el-table-column label="视频类型" prop="group_name">

        </el-table-column>
        <el-table-column label="销量" prop="sales">

        </el-table-column>
        <el-table-column label="库存" prop="store">

        </el-table-column>
        <el-table-column
          prop="putaway_status"
          label="状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="recommend_status"
          label="推荐"
          show-overflow-tooltip>
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
          :page-sizes="[10, 20, 30, 40]"
          :pager-count="9"
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
    data() {
      return {
        searchValue: '',
        select:'',
        options: [],
        sortValue: '',
        sort:[],
        tableData: [],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
      }
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //搜索
      sendSortValue(){
        this.$axios.post('/video/index',{name:this.searchValue}).then((response)=>{
          if(response.data.status === 200){
            this.tableData = response.data.data.data
            this.sum = response.data.data.total
          }
        })
      },
      //分页
      handleSizeChange(val){
        //console.log(val)
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/video/index',{page:val}).then((response) =>{
          if(response.status === 200){
            this.tableData = response.data.data.data
            this.sum = response.data.data.total
          }else {
            this.$message({
              showClose: true,
              message: '获取数据失败！',
              type: 'error'
            });
          }
        })
      },
      handleEdit(index, row) {
       this.$router.push({name:'editVideo',query:{data:row.id}})
      },
      //单个删除
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
          this.$axios.post('/video/delete',{'id':row.id}).then((response) =>{
            if(response.data.status === 200){
              this.$axios.post('/video/index',{page:this.currentPage}).then((response) =>{
                if(response.status === 200){
                  this.tableData = response.data.data.data
                  this.sum = response.data.data.total
                }else {
                  this.$message({
                    showClose: true,
                    message: '获取数据失败！',
                    type: 'error'
                  });
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
      //批量删除
      listDelete(index,row){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/video/deleteBatch',
          method:'post',
          data:{
            'id_arr':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/video/index',{page:this.currentPage}).then((response) =>{
              if(response.data.status === 200){
                this.tableData = response.data.data.data
                this.sum = response.data.data.total
              }else {
                alert('获取商品列表失败！')
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
      //添加视频页面
      addVideo(){
        this.$router.push({name:'addvideo'})
      }
    },
    created(){
      //获取详情
      this.$axios.post('/video/index').then((response)=>{
        if(response.data.status === 200){
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        }
      })
      //获取分类列表
      this.$axios.post('/video_group/indexAll').then((response)=>{
        if(response.status === 200){
          this.options = response.data.data
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .videoList{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-left: 30px;
      padding-top: 20px;
      overflow: hidden;
      .head-left{
        margin-top: 20px;
        float: left;
        margin-left: 20px;
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .videoList-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
