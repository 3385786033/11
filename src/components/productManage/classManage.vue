<template>
  <!--分类管理-->
  <div class="classManage">
    <h3>分类管理</h3>
    <div class="classManageBtn">
      <div class="classManageright">
        <el-button type="primary"  @click="addClasss">添加分类</el-button>
        <el-button type="danger" @click="allDelete">批量删除 <i class="el-icon-delete"></i></el-button>
      </div>
    </div>
    <!--分类信息-->
    <div class="classManageInfo">
      <el-table
        ref="multipleTable"
        :data="classManageData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="70">
        </el-table-column>
        <el-table-column
          prop="order"
          label="排序"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          :show-overflow-tooltip="true"
          label="分类名称">
        </el-table-column>
        <el-table-column
          label="分类图片"
          prop="picture">
          <template slot-scope="scope"><img :src="scope.row.picture" alt="" width="50"height="50"></template>
        </el-table-column>
        <el-table-column
          prop="parent_group"
          label="父级分类">
        </el-table-column>
        <el-table-column
          prop="description"
          :show-overflow-tooltip="true"
          label="描述">
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
</template>
<script>
  export default {
    data () {
      return {
        classManageData: [],
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
        this.$router.push({name:'editClass',query:{data:row.product_group_id}})
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
          this.classManageData.splice(index,1);
          this.$axios.post('/product_group/deleteProductGroup',{'product_group_id':row.product_group_id})
            .then((response) =>{
              this.$axios.post('/product_group/getProductGroupList',{page:this.currentPage}).then((response) =>{
                this.classManageData = response.data.data.data
                this.sum = response.data.data.total
              })
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
      addClasss(){
        this.$router.push('/home/commodControl/addClass')
      },
      allDelete(index, row){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.product_group_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/product_group/deleteProductGroupInBatch',
          method:'post',
          data:{
            'product_group_id_array':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 1){
            this.$axios.post('/product_group/getProductGroupList',{page:this.currentPage}).then((response) =>{
              this.classManageData = response.data.data.data
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
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.$axios.post('/product_group/getProductGroupList',{page:val}).then((response) =>{
          if(response.status === 0){
            alert('获取分类列表失败！')
          }else {
            this.classManageData = response.data.data.data
            this.sum = response.data.data.total
          }
        })
      }
    },
    created(){
      this.$axios.post('/product_group/getProductGroupList').then((response) =>{
        if(response.status === 0){
          alert('获取分类列表失败！')
        }else {
          this.classManageData = response.data.data.data
          this.sum = response.data.data.total
          this.pagesize = response.data.data.per_page
          this.currentPage = response.data.data.last_page
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    border: 1px solid;
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
  /*
  去除按钮的默认样式
  */
  @mixin inpButton($width,$height,$bgcolor,$bor_ridiuo,$color){
    width: $width;
    height: $height;
    border: 0;
    background-color: $bgcolor;
    border-radius: $bor_ridiuo;
    outline: none;
    text-align: center;
    line-height: $height;
    white-space: normal;
    color: $color;
    &:hover{
      cursor: pointer;
    }
  }
  /*分类管理*/
  .classManage{
    @include aspect(100%,auto);
    padding-bottom: 20px;
    h3{
      margin: 30px 20px;
    }
    .classManageBtn{
      @include aspect(100%,auto);
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
</style>
