<template>
  <div class="userManage-data">
    <h3>用户列表</h3>
    <div class="userManageData-head">
      <div class="ManageData-headLeft">

      </div>
      <div class="ManageData-headRight">
        <!--<input type="button" class="btn btn-primary" value="批量禁用" @click="allDelete">-->
      </div>
    </div>
    <!--用户列表-->
    <div class="ManageData-content">
      <el-table
        ref="multipleTable"
        :data="userListData"
        tooltip-effect="dark"
        style="width: 100%"
        :fit="true"
        @sort-change='sortChange'
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="customer_id"
          label="用户ID"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称">
        </el-table-column>
        <el-table-column
          label="电话">
          <template slot-scope="scope">{{ scope.row.tel}}</template>
        </el-table-column>
        <el-table-column
          prop="email"
          :show-overflow-tooltip="true"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="points"
          label="积分"
          sortable>
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="储值金">
        </el-table-column>
        <el-table-column
          prop="customer_group"
          label="分组"
          sortable>
        </el-table-column>
        <el-table-column
          prop="last_login_date"
          sortable
          :show-overflow-tooltip="true"
          label="上次登录时间">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
    </div>
    <!--end-->
  </div>
</template>
<script>
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        userListData: [],
        multipleSelection: [],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
        //筛选
        search: ''
      }
    },
    methods:  {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.$router.push({name:'userDetails',query:{product_id:row.customer_id}})
      },
      //分页
      handleSizeChange(val){
        //console.log(val)
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/customer/getCustomerList',{page:val}).then((response) =>{
          if(response.status === 200){
            this.userListData = response.data.data.data
          }else {
            alert('获取用户列表失败！')
          }
        })
      },
      //排序
      sortChange(column, prop, order){
        this.$axios.post('/customer/getCustomerList',{order_name:column.prop,order_type:column.order,page:this.currentPage}).then((response) =>{
          this.userListData = response.data.data.data
          this.sum = response.data.data.total
        })
      }
    },
    created (){
      this.$nextTick(function () {
        this.$axios.post('/customer/getCustomerList').then((response) =>{
          if(response.status == -1){
            alert('获取用户列表失败！')
          }else {
            this.userListData = response.data.data.data
            this.sum = response.data.data.total
          }
        })
      })
      this.$axios.post('/customer_group/getCustomerGroupList').then((response) =>{
        this.options = response.data.data
      })
    },

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
    /*右边内容*/
      .userManage-data{
        @include aspect(100%,auto);
        display: block;
        h3{
          margin: 30px 20px;
        }
        .userManageData-head{
          @include aspect(100%,auto);
          .ManageData-headLeft{
            float: left;
            margin-left: 20px;
            .selectList{
              width: 150px;
              margin-left: 20px;
              option{
                text-align: center;
              }
            }
          }
          .ManageData-headRight{
            float: right;
            margin-right: 30px;
          }
        }
        .ManageData-content{
          @include aspect(100%,auto);
          margin-top: 30px;
          &:hover{
            cursor: pointer;
          }

          .demo-table-expand {
            font-size: 0;
          }
          .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
          }
          .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
            padding: 0 126px;
          }
        }
        .addressManage{
          @extend .ManageData-content;
        }
      }
    /*end*/
  /*编辑资料*/
  .EditData{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 999;
    .EditData-main{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 800px;
      height: 800px;
      /*padding-top: 20px;*/
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
      margin: auto;
      header{
        height: auto;
        width: 100%;
        overflow: hidden;
        padding-left: 30px;
        background-color: #2e6da4;
        margin-bottom: 20px;
        .EditData-close{
          overflow: hidden;
          .userEidt{
            float: left;
            font-size: 20px;
            color: #fff;
            margin-top: 15px;
          }
          i{
            float: right;
            height: 50px;
            color: #fff;
            font-size: 18px;
            line-height: 50px;
            padding-right: 30px;
            &:hover{
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
