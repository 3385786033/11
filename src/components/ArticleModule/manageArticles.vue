<template>
  <div class="article">
    <header>
      <h3>文章管理</h3>
      <div class="head-left">

      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary" @click="addarticle" :disabled="showAdd"><i class="el-icon-plus"></i> 新增文章</button>
        <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="article-main">
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
        <el-table-column prop="title" label="文章标题" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="picture" label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.picture" alt="" width="60"height="60">
          </template>
        </el-table-column>
        <el-table-column prop="keywords" :show-overflow-tooltip="true" label="关键词">

        </el-table-column>
        <el-table-column label="时间" sortable prop="create_date">

        </el-table-column>
        <el-table-column prop="article_group" label="分类" sortable>
        </el-table-column>
        <el-table-column label="状态" prop="is_push">

        </el-table-column>
        <el-table-column label="推荐" prop="recommend">

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
      <div class="el-upload__tip" v-show="showText" style="color:red;">*注：可添加10条文章信息，高级版不限制文章数量，可通过官网线上购买或者联系客服购买。</div>
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
        multipleSelection:[],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
        //版本
        versionsType:'',
        showAdd:false,
        showText:false,
        dataLeng:0
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.$router.push({name:'newArticletxt',query:{data:row.article_id,edit:'编辑文章'}})
      },
      handleDelete(index, row) {
        this.tableData.splice(index,1);
        this.$axios.post('/article/deleteArticle',{'article_id':row.article_id}).then((response) =>{
          if(response.data.status === 1){
            this.$axios.post('/article/getArticleList',{page:this.currentPage}).then((response) =>{
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
      allDelete(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.article_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/article/deleteArticleInBatch',
          method:'post',
          data:{
            'article_id_array':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 1){
            this.$axios.post('/article/getArticleList',{page:this.currentPage}).then((response) =>{
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
      addarticle(){
        this.$router.push({name:'addnewArticle',query:{edit:'添加文章'}})
      },
      //分页
      handleSizeChange(val){
        //console.log(val)
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/article/getArticleList',{page:val}).then((response)=> {
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      }
    },
    created(){
      //获取版本
      this.$axios.post('/user/getVersion').then((response)=>{
        this.versionsType = response.data.data.version
      })
      this.$axios.post('/article/getArticleList').then((response)=> {
        this.tableData = response.data.data.data
        this.sum = response.data.data.total
        this.dataLeng =  this.tableData.length
      })
    },
    updated(){
      this.versionsType = this.$store.state.datastates
      if(this.versionsType === 'base'|| this.tableData.length < 10){

        if(this.tableData.length >= 10){
          this.showAdd = true
          this.showText = true
        }else {
          this.showAdd = false
          this.showText = false
        }
      }else {

      }
    },
    watch:{
      dataLeng(val){
        if(this.versionsType === 'base'){

          if(val >= 10){
            this.showAdd = true
            this.showText = true
          }else {
            this.showAdd = false
            this.showText = false
          }
        }else {

        }
      }
    }

  }
</script>
<style scoped lang="scss">
  .article{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-left: 20px;
      overflow: hidden;
      h3{
        margin: 30px 20px;
      }
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
    .article-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
