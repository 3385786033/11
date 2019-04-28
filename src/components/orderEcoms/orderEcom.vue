<template>
  <div class="orderEcom">
    <header>
      <h3>订单列表</h3>
      <div class="ManageData-headRight">
        <label>版本类型 ：</label>
        <el-select
          name="selectList"
          id=""
          class="selectType"
          filterable
          placeholder="请选择"
          :disabled="isTypes"
          @change="changs"
          v-model="values_type">
          <el-option
            v-for="item in listOptins"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--<el-button type="danger" icon="el-icon-delete" @click="allDeleta">批量删除<i class="el-icon-delete"></i></el-button>-->
      </div>
    </header>
    <section class="orderEcom-main">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="全部订单" name="all">
          <div class="first">
            <div class="allList">
              <div class="screen">
                <div class="screen-list" style="margin-left: 30px">
                  <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                    <el-option
                      v-for="item in oerder_code"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input style="width: 180px" v-model="search_value1"></el-input>
                  <el-button type="primary" @click="sendOerderCode">筛选</el-button>
                </div>
                <div class="screen-list" >
                  <span>付款方式：</span>
                  <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in payment"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="screen-list">
                  <span>订单来源：</span>
                  <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in source"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="screen-list">
                  <span>选择日期：</span>
                  <div class="block">
                    <el-date-picker
                      v-model="startTime1"
                      type="daterange"
                      @change="selectTimes"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                  <span>优惠方式：</span>
                  <el-select v-model="favorable_value1" clearable @change="discounts" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in favorable"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="screen-list" style="margin-left: 30px;margin-top: 10px;">
                  <span>活动类型：</span>
                  <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in activity"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="80">
                </el-table-column>
                <el-table-column label="订单号" prop="order_code">

                </el-table-column>
                <el-table-column label="姓名" prop="name">

                </el-table-column>
                <el-table-column label="电话" prop="tel">

                </el-table-column>
                <el-table-column label="实收" prop="income">

                </el-table-column>
                <el-table-column label="总金额" prop="total">

                </el-table-column>
                <el-table-column label="订单状态" prop="status_str">

                </el-table-column>
                <el-table-column label="日期" prop="create_time" sortable>

                </el-table-column>
                <el-table-column label="操作" width="280">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      :disabled="fsnumShow"
                      @click="pushOrderDetails(scope.$index, scope.row)"
                      >查看详情</el-button>
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
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="third">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1"></el-input>
                <el-button type="primary" @click="sendOerderCode">筛选</el-button>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>优惠方式：</span>
                <el-select v-model="favorable_value1" clearable @change="discounts" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in favorable"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_third"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status_str">

              </el-table-column>
              <el-table-column label="日期" prop="create_time" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="second">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1"></el-input>
                <el-button type="primary" @click="sendOerderCode">筛选</el-button>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>优惠方式：</span>
                <el-select v-model="favorable_value1" clearable @change="discounts" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in favorable"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_second"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status_str">

              </el-table-column>
              <el-table-column label="日期" prop="create_time" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="fourth">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1"></el-input>
                <el-button type="primary" @click="sendOerderCode">筛选</el-button>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>优惠方式：</span>
                <el-select v-model="favorable_value1" clearable @change="discounts" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in favorable"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_fourth"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status_str">

              </el-table-column>
              <el-table-column label="日期" prop="create_time" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="accomplish">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1"></el-input>
                <el-button type="primary" @click="sendOerderCode">筛选</el-button>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>优惠方式：</span>
                <el-select v-model="favorable_value1" clearable @change="discounts" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in favorable"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_accomplish"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status_str">

              </el-table-column>
              <el-table-column label="日期" prop="create_time" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="已取消" name="accomplishs">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" clearable placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1"></el-input>
                <el-button type="primary" @click="sendOerderCode">筛选</el-button>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" clearable @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" clearable @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>优惠方式：</span>
                <el-select v-model="favorable_value1" clearable @change="discounts" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in favorable"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" clearable @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_accomplishs"
              style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status_str">

              </el-table-column>
              <el-table-column label="日期" prop="create_time" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
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
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  export default {
    data () {
      return {
        activeName: 'all',
        tableData:[],
        //代发货
        tableData_second:[],
        tableData_third:[],
        tableData_fourth:[],
        tableData_accomplish:[],
        tableData_accomplishs:[],
        values_type:'',
        options: [],
        value: '',
        //所有
        favorable_value1:'',
        search_value1:'',
        oderCode_value1:'',
        payment_value1:'',
        source_value1:'',
        activity_value1:'',
        startTime1:'',
        fsnumShow:false,
        //商品订单刷选
        productType:'',
        listOptins: [{
          value: 1,
          label: '电商版'
        }, /*{
          value: 2,
          label: '到店版'
        }, {
          value: 3,
          label: '外卖版'
        },{
          value: 4,
          label: '预约版'
        },*/{
          value: 5,
          label: '分销版'
        }/*,{
            value: 6,
            label: '旅游版'
          }*/
        ],
        //订单号筛选
        oerder_code:[
          {label:'订单号', value:'order_code'},
          {label:'手机号', value:'tel'},
          {label:'姓名', value:'name'}
        ],
        // 付款方式
        payment:this.$store.state.payment,
        //订单来源
        source:this.$store.state.source,
        //活动形式
        activity:[
          {label:'普通', value:'0'},
          {label:'拼团', value:'1'},
          {label:'秒杀', value:'2'}
          ],
        //优惠方式
        favorable:[
          {value: '1', label: '卡券'},
          {value: '2', label: '会员'},
          {value: '3', label: '积分'},
        ],
        //时间
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
        //版本权限
        isTypes:false,
        versionsType:null
      }
    },
   methods: {
      //排序
     handleClick(tab, event) {
       switch(this.activeName){
         //全部
         case 'all':
           this.favorable_value1 = '',
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           this.$axios.post('/order/index').then((response) =>{
             this.tableData = response.data.data.data
             this.sum = response.data.data.total
           })
           break;
           //待付款
         case 'third':
           this.favorable_value1 = '',
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let thirdData = {
             program_type:this.values_type,
             status:1
           }
           this.$axios.post('/order/index',thirdData).then((response) =>{
             this.tableData_third = response.data.data.data
             this.sum = response.data.data.total
           })
           break;
           //待发货
         case 'second':
           this.favorable_value1 = '',
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let secondData = {
             program_type:this.values_type,
             status:2
           }
           this.$axios.post('/order/index',secondData).then((response) =>{
             this.tableData_second = response.data.data.data
             this.sum = response.data.data.total
           })
           break;
           //待收货
         case 'fourth':
           this.favorable_value1 = '',
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let fourthData = {
             program_type:this.values_type,
             status:3
           }
           this.$axios.post('/order/index',fourthData).then((response) =>{
               this.tableData_fourth = response.data.data.data
             this.sum = response.data.data.total
             })
           break;
           //已完成
         case 'accomplish':
           this.favorable_value1 = '',
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let accomplishData = {
             program_type:this.values_type,
             status:4
           }
           this.$axios.post('/order/index',accomplishData).then((response) =>{
             this.tableData_accomplish = response.data.data.data
             this.sum = response.data.data.total
           })
           break;
           //已取消
         case 'accomplishs':
           this.favorable_value1 = '',
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let accomplishsData = {
             program_type:this.values_type,
             status:5
           }
           this.$axios.post('/order/index',accomplishsData).then((response) =>{
             this.tableData_accomplishs = response.data.data.data
             this.sum = response.data.data.total
           })
           break;
         default:
           alert('数据错误！')
       }
     },
     handleEdit(index, row) {
       console.log(index, row);
     },
     changs(){
       this.$nextTick(function () {
         let sum = parseInt(this.values_type)
         this.$axios.post('/order/index',{'program_type':sum}).then((response)=>{
             if(response.data.data.current_program_type == this.values_type){
               this.fsnumShow = false
             }else {
               this.fsnumShow = true
             }
             this.tableData = response.data.data.data
           this.sum = response.data.data.total
           })
       })
     },
     //订单号筛选
     sendOerderCode(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:1,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:1,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         default:
       }
     },
     //付款方式
     paymentType(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData = response.data.data.data
               this.sum = response.data.data.total
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:1,
               //订单号
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               //来源
               source:this.source_value1,
               //时间
               date:datess,
               //子店
               payment_type:this.payment_value1,
               //活动类型
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               // console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:1,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
              //优惠方式
              discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{

                 this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
                 this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
               })
           }
           break;
         default:
       }
     },
     //订单来源
     oerderSource(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:1,
               //订单号
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               //来源
               source:this.source_value1,
               //时间
               date:datess,
               //子店
               payment_type:this.payment_value1,
               //活动类型
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               // console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:1,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{

               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         default:
       }
     },
     //选择日期
     selectTimes(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:1,
               //订单号
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               //来源
               source:this.source_value1,
               //时间
               date:datess,
               //子店
               payment_type:this.payment_value1,
               //活动类型
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               // console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:1,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{

               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         default:
       }
     },
     //活动类型
     activeType(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:1,
               //订单号
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               //来源
               source:this.source_value1,
               //时间
               date:datess,
               //子店
               payment_type:this.payment_value1,
               //活动类型
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               // console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:1,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{

               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         default:
       }
     },
     //优惠方式
     discounts(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:'',
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:1,
               //订单号
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               //来源
               source:this.source_value1,
               //时间
               date:datess,
               //子店
               payment_type:this.payment_value1,
               //活动类型
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               // console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:1,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{

               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:2,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               //console.log(response)
               //this.productType = response.data.current_program_type
               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:3,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:4,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:5,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sedData).then((response) =>{
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
             })
           }
           break;
         default:
       }
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
           if(this.startTime1 === ''){
             let datess = []
             let sendData = {
               program_type:this.productType,
               status:'',
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/index',sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sendData = {
               program_type:this.productType,
               status:'',
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let third_sendData = {
               program_type:this.productType,
               page:val,
               status:1,
               //订单号
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               //来源
               source:this.source_value1,
               //时间
               date:datess,
               //子店
               payment_type:this.payment_value1,
               //活动类型
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',third_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let third_sendData = {
               program_type:this.productType,
               status:1,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             //全部订单
             this.$axios.post('/order/index',third_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_third = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let second_sendData = {
               program_type:this.productType,
               status:2,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             this.$axios.post('/order/index',second_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let second_sendData = {
               program_type:this.productType,
               status:2,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             this.$axios.post('/order/index',second_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_second = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let fourth_sendData = {
               program_type:this.productType,
               status:3,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             this.$axios.post('/order/index',fourth_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let fourth_sendData = {
               program_type:this.productType,
               status:3,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             this.$axios.post('/order/index',fourth_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_fourth = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let accomplish_sendData = {
               program_type:this.productType,
               status:4,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             this.$axios.post('/order/index',accomplish_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let accomplish_sendData = {
               program_type:this.productType,
               status:4,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             this.$axios.post('/order/index',accomplish_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_accomplish = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let accomplishs_sendData = {
               program_type:this.productType,
               status:5,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             this.$axios.post('/order/index',accomplishs_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let accomplishs_sendData = {
               program_type:this.productType,
               status:5,
               page:val,
               keyword_type:this.oderCode_value1,
               keyword:this.search_value1,
               date:datess,
               payment_type:this.payment_value1,
               activity_type:this.activity_value1,
               //优惠方式
               discount_way:this.favorable_value1
             }
             this.$axios.post('/order/index',accomplishs_sendData).then((response) =>{
               this.productType = response.data.data.current_program_type
               this.tableData_accomplishs = response.data.data.data
               this.sum = response.data.data.total
               switch(parseInt(this.productType)){
                 case 1:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 2:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 3:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 4:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 5:
                   this.values_type = response.data.data.current_program_type
                   break;
                 case 6:
                   this.values_type = response.data.data.current_program_type
                   break;
                 default:
                   console.log('还没有订单')
               }
             })
           }
           break;
         default:
       }
     },
     //详情
     pushOrderDetails(index, row){
       if(row.activity_type === 0){
         switch(parseInt(this.productType)){
           case 1:
             this.$router.push({name:'Ecommerce',query:{data_id:row.order_id,edit:'查看电商详情'}})
             break;
           case 2:
             this.$router.push({name:'Arrival',query:{data_id:row.order_id,edit:'查看到店商品'}})
             break;
           case 3:
             this.$router.push({name:'takeOuts',query:{data_id:row.order_id,edit:'查看外卖商品'}})
             break;
           case 4:
             this.$router.push({name:'makeOerder',query:{data_id:row.order_id,edit:this.values_type}})
             break;
           case 5:
             this.$router.push({name:'distribution',query:{data_id:row.order_id,edit:'查看分销详情'}})
             break;
           case 6:
             this.$router.push({name:'travelOrder',query:{data_id:row.order_id,edit:'查看旅游详情'}})
             break;
           default:
             console.log('还没有订单')
         }
       }else if(row.activity_type === 1){
         this.$router.push({name:'bookingInfo',query:{data_id:row.order_id}})
       }else if(row.activity_type === 2){
         this.$router.push({name:'seckillInfo',query:{data_id:row.order_id}})
       }
     },
   },
    created(){
      //全部订单
      this.$axios.post('/order/index').then((response) =>{
          this.sum = response.data.data.total
          this.tableData = response.data.data.data
          switch(parseInt(this.productType)){
            case 1:
              this.values_type = response.data.data.current_program_type
              break;
            case 2:
              this.values_type = response.data.data.current_program_type
              break;
            case 3:
              this.values_type = response.data.data.current_program_type
              break;
            case 4:
              this.values_type = response.data.data.current_program_type
              break;
            case 5:
              this.values_type = response.data.data.current_program_type
              break;
            case 6:
              this.values_type = response.data.data.current_program_type
              break;
            default:
              console.log('还没有订单')
          }
        })
      //获取小程序类型
      this.$axios.post('/program/readProgramType').then((response)=>{
        this.productType = response.data.data.program_type
        switch(parseInt(this.productType)){
          case 1:
            this.values_type = response.data.data.program_type
            break;
          case 2:
            this.values_type = response.data.data.program_type
            break;
          case 3:
            this.values_type = response.data.data.program_type
            break;
          case 4:
            this.values_type = response.data.data.program_type
            break;
          case 5:
            this.values_type = response.data.data.program_type
            break;
          case 6:
            this.values_type = response.data.data.program_type
            break;
          default:
            console.log('还没有订单')
        }
      })
    },
    updated:function(){
      this.versionsType = this.$store.state.datastates
      if(this.versionsType === 'base'){
        this.isTypes = true
      }else {
        this.isTypes = false
      }
    }
  }
</script>
<style scoped lang="scss">
  .orderEcom{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-left: 20px;
      h3{
        margin: 30px 20px;
      }
      .ManageData-headRight{
        float: right;
        padding-right: 30px;
        .selectType{
          width: 110px;
        }
      }
    }
    .orderEcom-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
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
  }
  .screen{
    overflow: hidden;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    .screen-list{
      overflow: hidden;
      float: left;
      margin-right: 20px;
      height: 36px;
      line-height: 36px;
      .block{
        float: right;
      }
    }
  }
</style>
