<template>
  <div class="critical">
    <router-view></router-view>
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
.critical{
  @include aspect(100%,100%);
}
</style>
