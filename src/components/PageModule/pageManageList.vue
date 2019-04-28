<template>
  <div class="pageManageList">
    <header>
      <h3>页面管理列表</h3>

    </header>
    <section class="pageManage-main">
      <el-table
        ref="singleTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column label="页面名称" prop="name">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        tableData:[]
      }
    },
    created(){
      this.$axios.post('/layout/getPageList').then((response) => {
          this.tableData = response.data.data
          //console.log(response)
        })
    },
    methods:{
      handleEdit(index, row) {
        //console.log(index, row);
        this.$router.push({name:'setpagemanage',query:{data:row,'page_id':row.page_id}})
      }
    }
  }
</script>
<style scoped lang="scss">
  .pageManageList{
    header {
      height: auto;
      width: 100%;
      overflow: hidden;
      padding-left: 20px;
      margin-bottom: 20px;
      h3 {
        margin:30px 20px;
      }
    }
  }
</style>
