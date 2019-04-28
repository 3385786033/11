<template>
  <div class="orderList">
    <!--//电商-->
    <router-view></router-view>
  </div>
</template>
<script>

  export default {
    data () {
      return {

      }
    },
    components:{

    }
  }
</script>
<style scoped lang="scss">
  .orderList{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
