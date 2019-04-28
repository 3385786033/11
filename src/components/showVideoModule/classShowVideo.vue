<template>
  <div class="classvideo">
    <header>
      <h3>展示视频分类</h3>
      <div class="head-left">
        <el-input style="width: 180px" placeholder="请输入内容搜索" v-model="searchValue" @keydown.enter.native="sendSortValue"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="sendSortValue">搜索</el-button>
      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary" @click="addclass"><i class="el-icon-plus"></i> 添加分类</button>
        <el-button type="danger" icon="el-icon-delete" @click="listDelete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="classvideo-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
        >
        </el-table-column>
        <el-table-column label="视频封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover_picture" :alt="scope.rowcover_picture" style="width: 50;height: 50px">
          </template>
        </el-table-column>

        <el-table-column
          prop="description"
          label="描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
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
        tableData: [],
        searchValue: '',
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
      sendSortValue(){
        this.$axios.post('/video_group_demo/index',{name:this.searchValue}).then((response)=>{
          if(response.data.status === 200){
            this.tableData = response.data.data.data
            this.sum = response.data.data.total
          }else {
            alert('获取列表失败！')
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
        this.$axios.post('/video_group_demo/index',{page:val}).then((response) =>{
          if(response.status === 200){
            this.tableData = response.data.data.data
          }else {
            alert('获取列表失败！')
          }
        })
      },
      handleEdit(index, row) {
        this.$router.push({name:'editClassShowVideo',query:{data:row.id}})
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
          this.$axios.post('/video_group_demo/delete',{'id':row.id}).then((response) =>{
            if(response.data.status === 200){

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
          arr.push(selectedItem.id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/video_group_demo/deleteBatch',
          method:'post',
          data:{
            'id_arr':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/video_group_demo/index',{page:this.currentPage}).then((response) =>{
              if(response.data.status === 200){
                this.tableData = response.data.data.data
              }else {
                alert('获取列表失败！')
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
      addclass(){
        this.$router.push({name:'addClassVideo'})
      }
    },
    created(){
      this.$axios.post('/video_group_demo/index').then((response)=>{
        if(response.data.status === 200){
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        }else {
          alert('获取列表失败！')
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .classvideo{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
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
    .classvideo-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
