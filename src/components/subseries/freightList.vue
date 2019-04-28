<template>
  <div class="freightList">
    <header>
      <h3>运费管理</h3>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="固定运费" name="first">
            <el-form label-width="120px">
              <el-form-item label="运费金额：">
                <el-input style="width: 100px"></el-input>
                <span>元</span><span style="margin-left: 10px">订单运费金额固定</span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="满包邮" name="second">
            <el-form label-width="160px">
              <el-form-item label="满包邮设置：订单满">
                <el-input style="width: 100px"></el-input>
                <span>元</span><span style="margin-left: 10px">运费为0</span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="模板运费" name="third">
            <el-button type="primary">添加模板 <i class="el-icon-plus"></i></el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </header>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style scoped lang="scss">
.freightList{
  header{
    padding-left: 30px;
    padding-top: 20px;
  }
}
</style>
