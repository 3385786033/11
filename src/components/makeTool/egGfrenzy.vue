<template>
  <div class="eGfrenzy">
    <header>
      <h3>中奖列表</h3>
      <div class="head-left">
        <div class="screen-list" style="margin-left: 30px;float: left">
          <el-select v-model="sortValues" placeholder="请选择" style="width: 120px;">
            <el-option
              v-for="item in sort"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input style="width: 180px" v-model="searchValue"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="sendSortValue">搜索</el-button>
        </div>
        <div class="screen-list" style="float: left;margin-left: 10px">
          <span>排序：</span>
          <el-select v-model="issueTypeValue" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
            <el-option
              v-for="item in issueType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="head-Right">
        <button type="button" class="btn btn-primary" @click="seteGfrenzy">设置砸金蛋</button>
        <el-button type="danger" icon="el-icon-delete" @click="listDelete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width:100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="用户ID"
          prop="customer_id">
        </el-table-column>
        <el-table-column
          label="昵称"
          prop="nickname"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="中奖时间"
          prop="win_time"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="奖品"
          prop="prize_name"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="抽奖次数"
          prop="slyder_adventures_count">
        </el-table-column>
        <el-table-column
          label="姓名"
          :show-overflow-tooltip="true"
          prop="name">
        </el-table-column>
        <el-table-column
          label="电话"
          prop="tel">
        </el-table-column>
        <el-table-column
          label="地址"
          :show-overflow-tooltip="true"
          prop="address">
        </el-table-column>
        <el-table-column label="备注" width="140">
          <template slot-scope="scope">
            <el-select v-model="scope.row.remark" placeholder="请选择" style="width: 120px;">
              <el-option
                v-for="item in statusSort"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">保存</el-button>
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
    data(){
      return{
        sortValues:'',
        searchValue:'',
        sort:[
          {label:'姓名', value:'name'},
          {label:'电话', value:'tel'},
          {label:'奖品', value:'prize_name'},
          {label:'备注', value:'remark'}
        ],
        issueTypeValue:'',
        issueType:[
          {label:'中奖时间', value:'win_time'},
          {label:'中奖记录', value:'slyder_adventures_count'}
        ],
        tableData:[],
        statusSort:[
          {
            label:'已处理',
            value:'已处理'
          },{
            label:'未处理',
            value:'未处理'
          }
        ],
        status:'',
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
      }
    },
    created(){},
    methods:{
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      sendSortValue(){
        this.$axios.post('/smash_golden_eggs_record/index',{keyword_type:this.sortValues,keyword:this.searchValue}).then((response) =>{
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      paymentType(){
        this.$axios.post('/smash_golden_eggs_record/index',{order:this.issueTypeValue}).then((response) =>{
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
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
          this.$axios.post('/smash_golden_eggs_record/delete',{'id':row.id}).then((response) =>{
            if(response.data.status === 200){
              this.$axios.post('/smash_golden_eggs_record/index',{page:this.currentPage}).then((response)=>{
                if(response.data.status === 200){
                  this.tableData = response.data.data.data
                  this.sum = response.data.data.total
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
      listDelete(index,row){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/smash_golden_eggs_record/deleteBatch',
          method:'post',
          data:{
            'id_arr':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/smash_golden_eggs_record/index',{page:this.currentPage}).then((response)=>{
              if(response.data.status === 200){
                this.tableData = response.data.data.data
                this.sum = response.data.data.total
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
      handleEdit(index,row){
        this.$axios.post('/smash_golden_eggs_record/saveRemark',{id:row.id,remark:row.remark}).then((response)=>{
          if(response.data.status === 200){
            this.$message({
              type: 'success',
              message: response.data.message
            });
          }
        })
      },
      seteGfrenzy(){
        this.$router.push({name:'setegGfrenzy'})
      },
      //分页
      handleSizeChange(val){
        //console.log(val)
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/smash_golden_eggs_record/index',{page:val}).then((response) =>{
          if(response.status === 200){
            this.tableData = response.data.data.data
            this.sum = response.data.data.total
          }else {
            this.$message({
              message: response.data.message,
              type: 'error'
            });
          }
        })
      }
    },
    created(){
      this.$axios.post('/smash_golden_eggs_record/index').then((response)=>{
        if(response.data.status === 200){
          this.tableData = response.data.data.data
          this.sum = response.data.data.total
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .eGfrenzy{
    header{
      h3{
        clear: none;
        margin-left: 20px;
        margin-top: 30px;
      }
      .head-left{
        margin-top: 30px;
        overflow: hidden;
      }
      .head-Right{
        float: right;
        padding-right: 30px;
        margin-bottom: 20px;
      }
    }
    section{
      padding-top: 30px;
    }
  }
</style>
