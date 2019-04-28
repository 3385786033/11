<template>
  <div class="dataStat">
    <div class="dataStat-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    components: {

    }
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
.dataStat{
  @include aspect(100%,100%);
  .dataStat-main{
    width: 100%;
    min-height: 970px;
    overflow: hidden;
    background-color: rgba(247, 247, 247, 1);
  }
}
</style>
