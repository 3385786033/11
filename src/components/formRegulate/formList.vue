<template>
  <div class="pageManageList">
    <header>
      <h3>表单管理列表</h3>
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
        tableData:[],

      }
    },
    created(){
      this.$axios.post('/form/getFormList')
        .then((response) => {
          console.log(response)
          this.tableData = response.data.data
        })
    },
    methods:{
      handleEdit(index, row) {
        this.$router.push({name:'formManageList',query:{data:row,'form_id':row.form_id}})
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
