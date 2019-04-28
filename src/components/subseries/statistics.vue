<template>
  <div class="statistics">
    <header>
      <h3>订单统计</h3>
      <div class="derive">
        <button type="button" class="btn btn-primary">导出数据</button>
      </div>
    </header>
    <section class="statistics-main">
      <div class="orderData">
        <div class="orderData-list">
          <h3>今日下单数量</h3>
          <div>253</div>
        </div>
        <div class="orderData-list">
          <h3>代发货数量</h3>
          <div>253</div>
        </div>
        <div class="orderData-list">
          <h3>退换货数量</h3>
          <div>253</div>
        </div>
        <div class="orderData-list">
          <h3>今日总金额</h3>
          <div>253</div>
        </div>
      </div>
      <div class="datas">

      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>
<style scoped lang="scss">
  .statistics{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
      .derive{
        overflow: hidden;
        float: right;
        margin-right: 30px;
      }
    }
    .statistics-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
      .orderData{
        overflow: hidden;
       padding-left: 300px;
        .orderData-list{
          width: 200px;
          height: auto;
          overflow: hidden;
          border: 1px solid;
          float: left;
          text-align: center;
          margin-right: 20px;
          div{
            font-size: 18px;
          }
        }
      }
      .datas{
        width: 100%;
        padding: 0 200px;
        height: 300px;
        margin-top: 30px;
        border: 1px solid;
      }
    }
  }
</style>
