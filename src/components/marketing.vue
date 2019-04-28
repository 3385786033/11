<template>
  <div class="marketing">

    <router-view></router-view>
    <!--<vip ></vip>
    <add-vip ></add-vip>
    &lt;!&ndash;代金券&ndash;&gt;
    <voucher ></voucher>
    <add-voucher ></add-voucher>
    &lt;!&ndash;兑换券&ndash;&gt;
    <convert ></convert>
    <addconvert ></addconvert>
    &lt;!&ndash;储值卡&ndash;&gt;
    <petCard ></petCard>
    <recharge ></recharge>
    <setStoredCard ></setStoredCard>
    &lt;!&ndash;拼团&ndash;&gt;
    <booking ></booking>
    <add-booking ></add-booking>
    &lt;!&ndash;折扣券&ndash;&gt;
    <discount ></discount>
    <add-discount ></add-discount>
    &lt;!&ndash;满减&ndash;&gt;
    <Money-off ></Money-off>
    &lt;!&ndash;秒杀&ndash;&gt;
    <seckill ></seckill>
    <add-seckill></add-seckill>-->
  </div>
</template>
<script>
  /*import vip from '@/components/subseries/vip'
  import addVip from '@/components/subseries/addVip'
  import voucher from '@/components/subseries/voucher'
  import addVoucher from '@/components/subseries/addVoucher'
  import convert from '@/components/subseries/convert'
  import addconvert from '@/components/subseries/addconvert'
  import petCard from '@/components/subseries/petCard'
  import recharge from '@/components/subseries/recharge'
  import setStoredCard from '@/components/subseries/setStoredCard'
  import booking from '@/components/subseries/booking'
  import addBooking from '@/components/subseries/addBooking'
  //折扣券
  import discount from '@/components/subseries/discount'
  import addDiscount from '@/components/subseries/addDiscount'
  //满减
  import MoneyOff from '@/components/subseries/MoneyOff'
  //秒杀
  import seckill from '@/components/subseries/seckill'
  import addSeckill from '@/components/subseries/addSeckill'*/
  export default {
    data () {
      return {

      }
    },
    components: {
      /*vip,addVip,voucher,addVoucher,convert,addconvert,petCard,recharge,setStoredCard,booking,addBooking,
      discount,addDiscount,MoneyOff,seckill,addSeckill*/
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
  .marketing{
    @include aspect(100%,100%);

  }
</style>
