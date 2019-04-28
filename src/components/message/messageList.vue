<template>
  <div class="messageList">
    <header>
      <h3>消息列表</h3>
      <div class="col-lg-3" style="margin-left: 30px">
        <div class="input-group">
            <span class="input-group-btn">
            <button class="btn btn-default glyphicon glyphicon-search" type="button" @click="Search"></button>
            </span>
          <input type="text" class="form-control" placeholder="Search for..." v-model='searchValue' style="margin-top: 1px;z-index: 0">
        </div><!-- /input-group -->
      </div>
      <el-button type="danger" class="allDelete" icon="el-icon-delete" @click="allDeleta">批量删除<i class="el-icon-delete"></i></el-button>
    </header>
    <div class="main">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            :data="all_tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="标题"
              prop="title">
              <template slot-scope="scope">
              <div @click="msgInfo(scope.$index, scope.row)" style="cursor: pointer" v-if="!scope.row.status">
                <el-badge :is-dot="!scope.row.status" class="item" >{{ scope.row.title }}</el-badge>
              </div>
                <div @click="msgInfo(scope.$index, scope.row)" style="cursor: pointer;color: #666666"  v-else>
                  <el-badge :is-dot="!scope.row.status" class="item" >{{ scope.row.title }}</el-badge>
                </div>
            </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              prop="create_date"
              label="时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
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
              @current-change="handleCurrentChanges"
              :total="sum">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已读" name="read">
          <el-table
            ref="multipleTable"
            :data="read_tableData"
            tooltip-effect="dark"
            :default-sort="{prop: 'title', order: 'descending'}"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="标题"
              prop="title">
              <template slot-scope="scope">
                <div @click="msgInfo(scope.$index, scope.row)" style="color: #666666">
                 {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="create_date"
              sortable
              label="时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
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
              @current-change="handleCurrentChanges"
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
            <el-table-column
              label="标题"
              prop="title">
              <template slot-scope="scope">
                <div @click="msgInfo(scope.$index, scope.row)" style="color: black">
                  <el-badge :is-dot="isDot" class="item" >{{ scope.row.title }}</el-badge>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              prop="create_date"
              label="时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
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
              @current-change="handleCurrentChanges"
              :total="sum">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="订单消息" name="orderList">
          <el-table
            ref="multipleTable"
            :data="orderList_tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="标题"
              prop="title">
              <template slot-scope="scope">
                <div @click="msgInfo(scope.$index, scope.row)">
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="create_date"
              label="时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
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
              @current-change="handleCurrentChanges"
              :total="sum">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="站内信" name="worklist">
          <el-table
            ref="multipleTable"
            :data="worklist_tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="标题"
              prop="title">
              <template slot-scope="scope">
                <div @click="msgInfo(scope.$index, scope.row)">
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="time"
              label="时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
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
              @current-change="handleCurrentChanges"
              :total="sum">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公告" name="userlist">
          <el-table
            ref="multipleTable"
            :data="userlist_tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="标题"
              prop="title">
              <template slot-scope="scope">
                <div @click="msgInfo(scope.$index, scope.row)">
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="create_date"
              label="时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
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
              @current-change="handleCurrentChanges"
              :total="sum">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data (){
      return {
        activeName: 'all',
        searchValue:'',
        isDot:true,
        multipleSelection:[],
        //全部
        all_tableData:[],
        read_tableData:[],
        unread_tableData:[],
        orderList_tableData:[],
        userlist_tableData:[],
        worklist_tableData:[],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClick(tab, event){
        switch(this.activeName){
          case 'all':
            this.$axios.post('/applet_message/index').then((response) =>{
              this.all_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'read':
            this.$axios.post('/applet_message/index',{status:1}).then((response) =>{
              this.read_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'unread':
            this.$axios.post('/applet_message/index',{status:0}).then((response) =>{
              this.unread_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'orderList':
            this.$axios.post('/applet_message/index',{type:1}).then((response) =>{
              this.orderList_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'userlist':
            this.$axios.post('/applet_message/index',{type:3}).then((response) =>{
              this.userlist_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'worklist':
            this.$axios.post('/applet_message/index',{type:2}).then((response) =>{
              this.worklist_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
        }
      },
      Search(){
        this.$axios.post('/applet_message/index',{content:this.searchValue}).then((response)=>{
          this.all_tableData = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      //删除
      allDeleta(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.message_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/applet_message/deletebatch',
          method:'post',
          data:{
            'message_id_array':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 200){
            this.$axios.post('/applet_message/index').then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                this.all_tableData = response.data.data.data
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
      handleDelete(index, row) {
        this.all_tableData.splice(index,1);
        this.$axios.post('/applet_message/delete',{message_id:row.message_id}).then((response) =>{
          if(response.data.status === 200){
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
      //查看详情
      msgInfo(index, row){
        this.isDot = false
        let statusData = ''
        if(row.status === true){
          statusData = 1
        }else {
          statusData = 0
        }
        this.$router.push({name:'messageInfo',query:{id:row.message_id,status:statusData}})
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        switch(this.activeName){
          case 'all':
            this.$axios.post('/applet_message/index',{page:val}).then((response) =>{
              this.all_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'read':
            this.$axios.post('/applet_message/index',{status:1,page:val}).then((response) =>{
              this.read_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'unread':
            this.$axios.post('/applet_message/index',{status:0,page:val}).then((response) =>{
              this.unread_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'orderList':
            this.$axios.post('/applet_message/index',{type:1,page:val}).then((response) =>{
              this.orderList_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'userlist':
            this.$axios.post('/applet_message/index',{type:3,page:val}).then((response) =>{
              this.userlist_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
          case 'worklist':
            this.$axios.post('/applet_message/index',{type:2,page:val}).then((response) =>{
              this.worklist_tableData = response.data.data.data
              this.sum = response.data.data.total
            })
            break;
        }
      },
    },
    created(){
      this.$axios.post('/applet_message/index').then((response=>{
        this.all_tableData = response.data.data.data
        this.sum = response.data.data.total
      }))
    }
  }
</script>
<style scoped lang="scss">
  .messageList{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      overflow: hidden;
      h3{
        margin: 30px 20px;
      }
      .allDelete{
        float: right;
      }
    }
    .main{
      margin-top: 30px;
    }
    .item{
      cursor: pointer;
    }
  }
</style>
