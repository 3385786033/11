<template>
  <div class="setStoredCard">
    <header class="setStoredCard">
      <h3>设置储值卡</h3>
    </header>
    <section class="setStoredCard-main">
      <el-form
        ref="form"
        :mobel="form"
        label-width="120px">
        <el-form-item label="储值卡设置">
          <el-radio-group v-model="form.resource">
           <div>
             <el-radio label="不赠送"></el-radio>
           </div>
            <div class="proportion">
              <el-radio label="按比例赠送："></el-radio>
              <el-input style="width:50px;margin-left: 10px"></el-input>
              <span>例如：填入0.1，<span>金额储值金=充值储值金*0.1</span></span>
            </div>
            <div class="section">
              <el-radio label="按区间赠送： 每充值"></el-radio>
              <el-input style="width:50px;margin-left: 10px"></el-input>
              <span style="margin-left: 10px"> 元，赠送多少</span>
              <el-input style="width:50px;margin-left: 10px"></el-input>
              <span>&nbsp;元</span>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button @click="returnbtn">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        form: {
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      returnbtn(){
        this.$router.go(-1)
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
  .setStoredCard{
    @include aspect(100%,100%);
    header{
      overflow: hidden;
      h3{
        clear: none;
      }
    }
    .setStoredCard-main{
      padding-top: 30px;
      .proportion{
        margin-top: 10px;
        span{
          font-size: 12px;
        }
      }
      .section{
        margin-top: 10px;
        span{
          font-size: 12px;
        }
      }
    }
  }
</style>
