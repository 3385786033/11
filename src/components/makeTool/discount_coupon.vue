<template>
  <div class="userDetails">
    <header>
      <h3>优惠券列表</h3>
      <div class="head-right"></div>
    </header>
    <div class="userDetails-main">
      <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="全部卡券" name="4">
          <div class="all">
            <div class="all_left">
              <span>排序：</span>
              <el-select v-model="sortValue" placeholder="请选择" @change="changs">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="all_right">
              <span style="font-size: 12px">*注：如删除优惠券列表对应用户则无此优惠券</span>
              <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
            </div>
          </div>
          <div class="basic-info">
            <div class="basic-info-main" style="border: 0">
              <el-table
                :data="all_tableData"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  :show-overflow-tooltip="true"
                  label="日期">
                </el-table-column>
                <el-table-column
                  label="名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="设置">
                  <template slot-scope="scope">
                    <div v-if="scope.row.type === 0">
                      折扣<span>{{scope.row.discount}}</span>折,
                      <span>单笔满</span><span>{{scope.row.single_full}}</span>元可用
                    </div>
                    <div v-else-if="scope.row.type === 1">
                      <div v-if="scope.row.product_limit_status === '1'">
                        购买指定商品可使用
                      </div>
                      <div v-else>
                        <span>单笔满</span><span>{{scope.row.single_full}}</span>元可使用
                      </div>
                    </div>
                    <div v-else-if="scope.row.type === 2">
                      <span>满减额度</span><span>{{scope.row.amount}}</span>元,
                      <span>单笔满</span><span>{{scope.row.single_full}}</span>元可用
                    </div>
                    <div v-else-if="scope.row.type === 3">
                      <div v-if="scope.row.general_status === '1'">
                        <span>红包额度</span><span>{{scope.row.amount}}</span>元,商品通用红包
                      </div>
                      <div v-else>
                        <span>红包额度</span><span>{{scope.row.amount}}</span>元
                        <span>单笔满</span><span>{{scope.row.single_full}}</span>元可用
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="领取时间"
                  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.claim_start_time}}<span>至</span>{{scope.row.claim_end_time}}
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="有效时间">
                  <template slot-scope="scope">
                    {{scope.row.use_start_time}}<span>至</span>{{scope.row.use_end_time}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="库存"
                  prop="store">

                </el-table-column>
                <el-table-column
                  label="领取上限"
                  prop="claim_limit">

                </el-table-column>
                <el-table-column
                  label="弹窗"
                  prop="popup_status">

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
        </el-tab-pane>
        <el-tab-pane label="折扣券" name="0">
          <div class="all">
            <div class="all_left">
              <span>排序：</span>
              <el-select v-model="sortValue" placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="all_right">
              <button type="button" class="btn btn-primary" @click="addDiscount"><i class="el-icon-plus"></i>添加折扣券</button>
              <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
            </div>
          </div>
          <div class="vip-info">
            <el-table
              :data="discount_tableData"
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="日期">
              </el-table-column>
              <el-table-column
                label="名称"
                prop="name">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                label="设置">
                <template slot-scope="scope">
                  折扣<span>{{scope.row.discount}}</span>折
                  <span>单笔满</span><span>{{scope.row.single_full}}</span>元可用
                </template>
              </el-table-column>
              <el-table-column
                label="领取时间"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  {{scope.row.claim_start_time}}<span>至</span>{{scope.row.claim_end_time}}
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                label="有效时间">
                <template slot-scope="scope">
                  {{scope.row.use_start_time}}<span>至</span>{{scope.row.use_end_time}}
                </template>
              </el-table-column>
              <el-table-column
                label="库存"
                prop="store">

              </el-table-column>
              <el-table-column
                label="领取上限"
                prop="claim_limit">

              </el-table-column>
              <el-table-column
                label="弹窗"
                prop="popup_status">

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
          </div>
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
        </el-tab-pane>
        <el-tab-pane label="兑换券" name="1">
          <div class="all">
            <div class="all_left">
              <span>排序：</span>
              <el-select v-model="sortValue" placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="all_right">
              <button type="button" class="btn btn-primary" @click="addDiscount"><i class="el-icon-plus"></i>添加兑换券</button>
              <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
            </div>
          </div>
          <div class="integral-info">
            <div class="basic-info-main" style="border: 0">
              <el-table
                :data="conversion_tableData"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  label="日期">
                </el-table-column>
                <el-table-column
                  label="名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="设置">
                  <template slot-scope="scope">
                    <div v-if="scope.row.product_limit_status === 1">
                      购买指定商品可使用
                    </div>
                    <div v-else>
                      <span>单笔满</span><span>{{scope.row.single_full}}</span>元可使用
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="领取时间"
                  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.claim_start_time}}<span>至</span>{{scope.row.claim_end_time}}
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="有效时间">
                  <template slot-scope="scope">
                    {{scope.row.use_start_time}}<span>至</span>{{scope.row.use_end_time}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="库存"
                  prop="store">

                </el-table-column>
                <el-table-column
                  label="领取上限"
                  prop="claim_limit">

                </el-table-column>
                <el-table-column
                  label="弹窗"
                  prop="popup_status">

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
            </div>
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
        </el-tab-pane>
        <el-tab-pane label="满减券" name="2">
          <div class="all">
            <div class="all_left">
              <span>排序：</span>
              <el-select v-model="sortValue" placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="all_right">
              <button type="button" class="btn btn-primary" @click="addDiscount"><i class="el-icon-plus"></i>添加满减券</button>
              <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
            </div>
          </div>
          <div class="integral-info">
            <div class="basic-info-main" style="border: 0">
              <el-table
                :data="reduction_tableData"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  label="日期">
                </el-table-column>
                <el-table-column
                  label="名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="设置">
                  <template slot-scope="scope">
                    <span>满减额度</span><span>{{scope.row.amount}}</span>元,
                    <span>单笔满</span><span>{{scope.row.single_full}}</span>元可用
                  </template>
                </el-table-column>
                <el-table-column
                  label="领取时间"
                  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.claim_start_time}}<span>至</span>{{scope.row.claim_end_time}}
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="有效时间">
                  <template slot-scope="scope">
                    {{scope.row.use_start_time}}<span>至</span>{{scope.row.use_end_time}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="库存"
                  prop="store">

                </el-table-column>
                <el-table-column
                  label="领取上限"
                  prop="claim_limit">

                </el-table-column>
                <el-table-column
                  label="弹窗"
                  prop="popup_status">

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
            </div>
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
        </el-tab-pane>
        <el-tab-pane label="红包" name="3">
          <div class="all">
            <div class="all_left">
              <span>排序：</span>
              <el-select v-model="sortValue" placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="all_right">
              <button type="button" class="btn btn-primary" @click="addDiscount"><i class="el-icon-plus"></i>添加红包</button>
              <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
            </div>
          </div>
          <div class="login-info">
            <div class="login-info-main">
              <el-table
                :data="packet_tableData"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  label="日期">
                </el-table-column>
                <el-table-column
                  label="名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="设置">
                  <template slot-scope="scope">
                    <div v-if="scope.row.general_status === '1'">
                      <span>红包额度</span><span>{{scope.row.amount}}</span>元,商品通用红包
                    </div>
                    <div v-else>
                      <span>红包额度</span><span>{{scope.row.amount}}</span>元,
                      <span>单笔满</span><span>{{scope.row.single_full}}</span>可用
                    </div>
                  </template>

                </el-table-column>
                <el-table-column
                  label="领取时间"
                  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.claim_start_time}}<span>至</span>{{scope.row.claim_end_time}}
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="有效时间">
                  <template slot-scope="scope">
                    {{scope.row.use_start_time}}<span>至</span>{{scope.row.use_end_time}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="库存"
                  prop="store">

                </el-table-column>
                <el-table-column
                  label="领取上限"
                  prop="claim_limit">

                </el-table-column>
                <el-table-column
                  label="弹窗"
                  prop="popup_status">

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
            </div>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        multipleSelection:[],
        //基本信息
        all_tableData:[],
        sortValue:'',
        activeName:'4',
        optionsStatus:[
          {
            value: 'claim_end_time',
            label: '领取时间'
          },
          {
            value: 'use_end_time',
            label: '使用时间'
          },
          {
            value: 'store',
            label: '库存'
          }
        ],
        //折扣券
        discount_tableData:[],
        //兑换
        conversion_tableData:[],
        //满减
        reduction_tableData:[],
        //红包
        packet_tableData:[],
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
      handleClick(tab, event){
        switch (this.activeName){
          case '0':
            this.sortValue = ''
            this.$axios.post('/discount_coupon/index').then((response)=>{
              if(response.data.status === 200){
                this.discount_tableData = response.data.data.data
                this.sum = response.data.data.total
              }
            })
                break;
          case '1':
            this.sortValue = ''
            this.$axios.post('/exchange_coupon/index').then((response)=>{
              if(response.data.status === 200){
                this.conversion_tableData = response.data.data.data
                this.sum = response.data.data.total
              }
            })
                break;
          case '2':
            this.sortValue = ''
            this.$axios.post('/full_reduction_coupon/index').then((response)=>{
              if(response.data.status === 200){
                this.reduction_tableData = response.data.data.data
                this.sum = response.data.data.total
              }
            })
                break;
          case '3':
            this.sortValue = ''
            this.$axios.post('/red_packet/index').then((response)=>{
              if(response.data.status === 200){
                this.packet_tableData = response.data.data.data
                this.sum = response.data.data.total
              }
            })
                break;
          case '4':
            this.sortValue = ''
            this.$axios.post('/card_volume/index').then((response)=>{
              if(response.data.status === 200){
                this.all_tableData = response.data.data.data
                this.sum = response.data.data.total
              }
            })
            break;
          default:
            alert('还未添加')
        }
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/card_volume/index',{page:val}).then((response)=>{
          if(response.data.status === 200){
            this.all_tableData = response.data.data.data
            this.sum = response.data.data.total
          }else {
            this.$message({
              showClose: true,
              message: '获取失败！',
              type: 'error'
            });
          }
        })
      },
      //编辑商品
      handleEdit(index, row) {
        switch(this.activeName){
          case '0':
            this.$router.push({name:'editDiscount',query:{data:row.id}})
            break;
          case '1':
            this.$router.push({name:'editConvert',query:{data:row.id}})
            break;
          case '2':
            this.$router.push({name:'editMoneyoff',query:{data:row.id}})
            break;
          case '3':
            this.$router.push({name:'editRedPacket',query:{data:row.id}})
            break;
          case '4':
            switch(row.type){
              case 0:
                this.$router.push({name:'editDiscount',query:{data:row.resource_id}})
                break;
              case 1:
                this.$router.push({name:'editConvert',query:{data:row.resource_id}})
                break;
              case 2:
                this.$router.push({name:'editMoneyoff',query:{data:row.resource_id}})
                break;
              case 3:
                this.$router.push({name:'editRedPacket',query:{data:row.resource_id}})
                break;
            }
            break;
          default:
            alert('还未添加')
        }
      },
      handleDelete(index, row) {
        switch (this.activeName){
          case '0':
              this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.discount_tableData.splice(index,1);
              this.$axios.post('/discount_coupon/delete',{'id':row.id}).then((response) =>{
                if(response.data.status === 200){
                  this.$message({
                    showClose: true,
                    message: response.data.message,
                    type: 'success'
                  });
                  this.$axios.post('/card_volume/index',{page:this.currentPage}).then((response)=>{
                    if(response.data.status === 200){
                      this.all_tableData = response.data.data.data
                      this.sum = response.data.data.total
                    }else {
                      this.$message({
                        showClose: true,
                        message: '获取失败！',
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
            break;
          case '1':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.conversion_tableData.splice(index,1);
              this.$axios.post('/exchange_coupon/delete',{'id':row.id}).then((response) =>{
                if(response.data.status === 200){
                  this.$axios.post('/card_volume/index',{page:this.currentPage}).then((response)=>{
                    if(response.data.status === 200){
                      this.all_tableData = response.data.data.data
                      this.sum = response.data.data.total
                    }else {
                      this.$message({
                        showClose: true,
                        message: '获取失败！',
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
            break;
          case '2':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.reduction_tableData.splice(index,1);
              this.$axios.post('/full_reduction_coupon/delete',{'id':row.id}).then((response) =>{
                if(response.data.status === 200){
                  this.$axios.post('/card_volume/index',{page:this.currentPage}).then((response)=>{
                    if(response.data.status === 200){
                      this.all_tableData = response.data.data.data
                      this.sum = response.data.data.totle
                    }else {
                      this.$message({
                        showClose: true,
                        message: '获取失败！',
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
            break;
          case '3':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.packet_tableData.splice(index,1);
              this.$axios.post('/red_packet/delete',{'id':row.id}).then((response) =>{
                if(response.data.status === 200){
                  this.$axios.post('/card_volume/index',{page:this.currentPage}).then((response)=>{
                    if(response.data.status === 200){
                      this.all_tableData = response.data.data.data
                      this.sum = response.data.data.total
                    }else {
                      this.$message({
                        showClose: true,
                        message: '获取失败！',
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
            break;
          case '4':
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.all_tableData.splice(index,1);
              this.$axios.post('/card_volume/delete',{'id':row.id}).then((response) =>{
                if(response.data.status === 200){
                  this.$axios.post('/card_volume/index',{page:this.currentPage}).then((response)=>{
                    if(response.data.status === 200){
                      this.all_tableData = response.data.data.data
                      this.sum = response.data.data.total
                    }else {
                      this.$message({
                        showClose: true,
                        message: '获取失败！',
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
            break;
          default:
            alert('还未添加')
        }
      },
      allDelete(){
        switch (this.activeName){
          case '0':
            let arr = []
            this.multipleSelection.forEach(selectedItem =>{
              arr.push(selectedItem.id)
              return arr
            })
            let arr_id = JSON.stringify(arr)
            this.$axios({
              url:'/discount_coupon/deleteBatch',
              method:'post',
              data:{
                'id_arr':arr_id
              }
            }).then((response)=>{
              if(response.data.status === 200){
                this.$axios.post('/discount_coupon/index',{page:this.currentPage}).then((response) =>{
                  if(response.status === 0){
                    alert('获取商品列表失败！')
                  }else {
                    this.discount_tableData = response.data.data.data
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
            break;
          case '1':
            let arr1 = []
            this.multipleSelection.forEach(selectedItem =>{
              arr1.push(selectedItem.id)
              return arr1
            })
            let arr_id1 = JSON.stringify(arr1)
            this.$axios({
              url:'/exchange_coupon/deleteBatch',
              method:'post',
              data:{
                'id_arr':arr_id1
              }
            }).then((response)=>{
              if(response.data.status === 200){
                this.$axios.post('/exchange_coupon/index',{page:this.currentPage}).then((response) =>{
                  if(response.status === 0){
                    alert('获取商品列表失败！')
                  }else {
                    this.conversion_tableData = response.data.data.data
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
            break;
          case '2':
            let arr2 = []
            this.multipleSelection.forEach(selectedItem =>{
              arr2.push(selectedItem.id)
              return arr2
            })
            let arr_id2 = JSON.stringify(arr2)
            this.$axios({
              url:'/full_reduction_coupon/deleteBatch',
              method:'post',
              data:{
                'id_arr':arr_id2
              }
            }).then((response)=>{
              if(response.data.status === 200){
                this.$axios.post('/full_reduction_coupon/index',{page:this.currentPage}).then((response) =>{
                  if(response.status === 0){
                    alert('获取商品列表失败！')
                  }else {
                    this.reduction_tableData = response.data.data.data
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
            break;
          case '3':
            let arr3 = []
            this.multipleSelection.forEach(selectedItem =>{
              arr3.push(selectedItem.id)
              return arr3
            })
            let arr_id3 = JSON.stringify(arr3)
            this.$axios({
              url:'/red_packet/deleteBatch',
              method:'post',
              data:{
                'id_arr':arr_id3
              }
            }).then((response)=>{
              if(response.data.status === 200){
                this.$axios.post('/red_packet/index',{page:this.currentPage}).then((response) =>{
                  if(response.status === 0){
                    alert('获取商品列表失败！')
                  }else {
                    this.packet_tableData = response.data.data.data
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
            break;
          case '4':
            let arr4 = []
            this.multipleSelection.forEach(selectedItem =>{
              arr4.push(selectedItem.id)
              return arr4
            })
            let arr_id4 = JSON.stringify(arr4)
            this.$axios({
              url:'/card_volume/deleteBatch',
              method:'post',
              data:{
                'id_arr':arr_id4
              }
            }).then((response)=>{
              if(response.data.status === 200){
                this.$axios.post('/card_volume/index',{page:this.currentPage}).then((response) =>{
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
            break;
          default:
            alert('还未添加')
        }
      },
      //添加折扣券
      addDiscount(){
        switch (this.activeName){
          case '0':
            this.$router.push({path:'/home/marketing/addDiscount'})
                break;
          case '1':
            this.$router.push({path:'/home/marketing/addconvert'})
                break;
          case '2':
            this.$router.push({path:'/home/marketing/MoneyOff'})
            break;
          case '3':
            this.$router.push({path:'/home/marketing/redPacket'})
            break;
          default:
        }

      },
      //排序
      changs(){
        switch (this.activeName){
          case '0':
            this.$axios.post('/discount_coupon/index',{order:this.sortValue}).then((response)=>{
              if(response.data.status === 200){
                this.discount_tableData = response.data.data.data

              }
            })
            break;
          case '1':
            this.$axios.post('/exchange_coupon/index',{order:this.sortValue}).then((response)=>{
              if(response.data.status === 200){
                this.conversion_tableData = response.data.data.data
              }
            })
            break;
          case '2':
            this.$axios.post('/full_reduction_coupon/index',{order:this.sortValue}).then((response)=>{
              if(response.data.status === 200){
                this.reduction_tableData = response.data.data.data
              }
            })
            break;
          case '3':
            this.$axios.post('/red_packet/index',{order:this.sortValue}).then((response)=>{
              if(response.data.status === 200){
                this.packet_tableData = response.data.data.data
              }
            })
            break;
          case '4':
            this.$axios.post('/card_volume/index',{order:this.sortValue}).then((response)=>{
              if(response.data.status === 200){
                this.all_tableData = response.data.data.data
              }
            })
            break;
          default:
            alert('还未添加')
        }
      }
    },
    created(){
      //全部
      this.$axios.post('/card_volume/index').then((response)=>{
        if(response.data.status === 200){
          this.all_tableData = response.data.data.data
          this.sum = response.data.data.total
        }else {
          this.$message({
            showClose: true,
            message: '获取失败！',
            type: 'error'
          });
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .userDetails{
    header{
      h3{
        margin: 30px 20px;
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .all{
      overflow: hidden;
    }
    .all_left{
      float: left;
    }
    .all_right{
      float: right;
    }
    .basic-info,.vip-info,.integral-info,.login-info,.order-info{
      width: 100%;
      height: 100%;
      margin-top: 30px;
      overflow: hidden;
    }
    .basic-info-title,.vip-info-title,.integral-info-title,.login-info-title,.order-info-title{
      height: 60px;
      line-height: 60px;
      color: #666;
      padding-left: 20px;
      font-size:20px;
      background-color: rgba(215, 215, 215, 1);
    }
    .userhead{
      width: 80px;
      height: 80px;
      overflow: hidden;
      border: 1px #d7d7d7 solid;
    }
    .userhead img{
      display: block;
      width: 100%;
      height: 100%;
    }
    .basic-info-main{
      border: 1px solid #d7d7d7;
    }
    /*积分*/
    .integral-info-head{
      width: 100%;
      height: 60px;
      border: 1px solid #d7d7d7;
      border-top: 0;
      line-height: 60px;
      padding-left: 20px;
      font-size:18px;
    }
    .order-info-footer{
      height: 50px;
      width: 100%;
      margin-top: 5px;
      border: 1px #d7d7d7 solid;
      p{
        float: right;
        height: 100%;
        margin-right: 100px;
        line-height: 50px;
        font-size: 20px;
      }
    }
  }
</style>
