<template>
  <div class="recharge">
    <header class="recharge">
      <h3>储值卡明细</h3>
      <div class="recharge-btn">
        <button type="button" class="btn btn-primary">导出</button>
      </div>
    </header>
    <section class="recharge-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width:100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="电话"
          prop="Mobil"
        >
        </el-table-column>
        <el-table-column
          label="储值卡名称"
          prop="cardName"
        >
        </el-table-column>
        <el-table-column
          label="充值时间"
          prop="time"
        >
        </el-table-column>
        <el-table-column
          label="充值金额"
          prop="rechargeMoney"
        >
        </el-table-column>
        <el-table-column
          label="赠送金额"
          prop="seeMoney"
        >
        </el-table-column>
        <el-table-column
          label="合计"
          prop="total"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
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
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData:[{
          name:'老王',
          Mobil: '无门槛',
          equity: '会员8.5折,开卡赠送200积分',
          cardName: '收到该额度是个',
          time: '2018-5-23',
          rechargeMoney: '200',
          seeMoney: '300',
          total: '500'
        }]
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
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
  .recharge{
    @include aspect(100%,100%);
    header{
      overflow: hidden;
      h3{
        clear: none;
      }
      .recharge-btn{
        margin-top: 30px;
        float: right;
        margin-right: 30px;
      }
    }
    .recharge-main{
      padding-top: 30px;
    }
  }
</style>
