<template>
  <div class="criticalList">
    <header>
      <h3>评论管理列表</h3>
      <div class="head-left">
        <el-input style="width: 180px" placeholder="请输入内容搜索" v-model="searchValue"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="sendSortValue">搜索</el-button>
      </div>
      <div class="head-right">
        <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="critical-main">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <el-table
            ref="multipleTable"
            :data="all_tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column  label="日期" width="120"  sortable :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div  v-if="scope.row.read_status === '0'">
                  <el-badge :is-dot="scope.row.read_status === '0'" class="item" >{{ scope.row.create_date }}</el-badge>
                </div>
                <div v-else>
                  <el-badge :is-dot="!scope.row.read_status === '0'" class="item" >{{ scope.row.create_date }}</el-badge>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="评论用户" prop="name" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="商品描述">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.description_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="服务态度">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.service_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="物流服务" prop="logistics_level">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.logistics_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="图片评论">
              <template slot-scope="scope">
                <img :src="scope.row.picture" alt="" width="50" height="50">
              </template>
            </el-table-column>
            <el-table-column label="文字评论" prop="description" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="操作"width="220">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
              :pager-count="currentPage"
              :page-size="pagesize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChanges1"
              :total="sum">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已读" name="read">
          <el-table
            ref="multipleTable"
            :data="read_tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column prop="create_date" label="日期"  sortable :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="评论用户" prop="name" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="商品描述">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.description_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="服务态度">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.service_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="物流服务" prop="logistics_level">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.logistics_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="图片评论">
              <template slot-scope="scope">
                <img :src="scope.row.picture" alt="" width="50" height="50">
              </template>
            </el-table-column>
            <el-table-column label="文字评论" prop="description" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="操作"width="220">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
              :pager-count="currentPage"
              :page-size="pagesize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChanges2"
              :total="sum">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未读" name="unread">
          <el-table
            ref="multipleTable"
            :data="unread_tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="日期"  sortable :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="true">
                  <el-badge :is-dot="!scope.row.status" class="item" >{{ scope.row.create_date }}</el-badge>
                </div>
                <div v-else>
                  <el-badge :is-dot="!scope.row.status" class="item" >{{ scope.row.create_date }}</el-badge>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="评论用户" prop="name" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="商品描述">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.description_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="服务态度">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.service_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="物流服务" prop="logistics_level">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.logistics_level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="图片评论">
              <template slot-scope="scope">
                <img :src="scope.row.picture" alt="" width="50" height="50">
              </template>
            </el-table-column>
            <el-table-column label="文字评论" prop="description" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="操作"width="220">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
              :pager-count="currentPage"
              :page-size="pagesize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChanges3"
              :total="sum">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tabelDate: [],
        all_tableData:[],
        read_tableData:[],
        unread_tableData:[],
        //搜索内容
        searchValue:'',
        activeName: 'all',
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //搜索内容
      sendSortValue(){
        this.$axios.post('/comment/getCommentList',{keyword:this.searchValue,keyword_type:'description',page:this.currentPage}).then((response) =>{
          this.all_tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      handleClick(tab, event) {
        switch(this.activeName){
          case 'all':
            this.$axios.post('/comment/getCommentList').then((response) =>{
              this.all_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'read':
            this.$axios.post('/comment/getCommentList',{read_status:1}).then((response) =>{
              this.read_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'unread':
            this.$axios.post('/comment/getCommentList',{read_status:0}).then((response) =>{
              console.log(response)
              this.unread_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
        }
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges1(val){
        this.currentPage = val;
        this.$axios.post('/comment/getCommentList',{page:val}).then((response) =>{
          this.all_tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      handleCurrentChanges2(val){
        this.currentPage = val;
        this.$axios.post('/comment/getCommentList',{page:val,read_status:1}).then((response) =>{
          this.read_tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      handleCurrentChanges3(val){
        this.currentPage = val;
        this.$axios.post('/comment/getCommentList',{page:val,read_status:0}).then((response) =>{
          this.unread_tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      allDelete(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.comment_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/comment/deleteCommentInBatch',
          method:'post',
          data:{
            'comment_id_array':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 1){
            this.$axios.post('/comment/getCommentList',{page:this.currentPage}).then((response) =>{
              if(response.status === 200){
                this.tabelDate = response.data.data.data
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
          this.tabelDate.splice(index,1);
          this.$axios.post('/comment/deleteComment',{'comment_id':row.comment_id}).then((response) =>{
            if(response.data.status === 1){
              this.$axios.post('/comment/getCommentList',{page:this.currentPage}).then((response) =>{
                this.all_tableData = response.data.data.data
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
        this.$router.push({name:'lookCritical',query:{data:row.comment_id}})
      },
    },
    created(){
      this.$axios.post('/comment/getCommentList').then((response) =>{
          this.all_tableData = response.data.data.data
          this.sum = response.data.data.total
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
  .criticalList{
    @include aspect(100%,100%);
    header{
      height: auto;
      width: 100%;
      overflow: hidden;
      padding-left: 20px;
      margin-bottom: 20px;
      h3{
        margin:30px 20px;
      }
      .head-left{
        float: left;
      }
      .head-right{
        float: right;
        margin-right: 30px;
      }
    }
    .critical-main{
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
