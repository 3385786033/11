<template>
  <div class="addIntegral">
    <header>
      <h3>添加积分商品</h3>
      <!--<div class="screen">
        <label>筛选</label>
        <el-select name="selectList" id="" class="selectList" filterable placeholder="请选择" v-model="values">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>-->
    </header>
    <section class="addIntegral-main">
      <el-table
        ref="multipleTable"
        :data="userListData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="商品名称"
          width="250">
        </el-table-column>
        <el-table-column
          label="商品图片"
          prop="picture1"
          width="200">
          <template slot-scope="scope"><img :src="scope.row.picture1" alt="" width="50"height="50"></template>
        </el-table-column>
        <el-table-column
          prop="product_group"
          label="商品分类"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="virtual_price"
          label="虚拟价格"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          width="150">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="addData(scope.$index, scope.row)"
            >添 加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px auto;">
        <el-pagination
          background
          layout="prev, pager, next"
          align="center"
          :page-sizes="[10, 20, 30, 40]"
          :pager-count="9"
          :page-size="pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChanges"
          :total="sum">
        </el-pagination>
      </div>
    </section>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        values: '',
        options:['1','2'],
        userListData: [],
        multipleSelection: [],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addData(index,row){
        this.$axios.post('/product/addIntegralProduct',{'product_id':row.product_id})
          .then((response)=> {
            if(response.data.status === 1){
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'success'
              });
              this.$router.go(-1)
            }else {

            }
          })
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/product/getNotIntegralProductList',{page:val}).then((response)=> {
          if(response.data.status === 200){
            this.userListData = response.data.data.data
            this.sum = response.data.data.total
          }else {

          }
        })
      }
    },
    created(){
      this.$axios.post('/product/getNotIntegralProductList').then((response)=> {
        if(response.data.status === 200){
          this.userListData = response.data.data.data
          this.sum = response.data.data.total
        }else {

        }
      })
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
  /*
  去除按钮的默认样式
  */
  @mixin inpButton($width,$height,$bgcolor,$bor_ridiuo,$color){
    width: $width;
    height: $height;
    border: 0;
    background-color: $bgcolor;
    border-radius: $bor_ridiuo;
    outline: none;
    text-align: center;
    line-height: $height;
    white-space: normal;
    color: $color;
    &:hover{
      cursor: pointer;
    }
  }
  .addIntegral{
    @include aspect(100%,100%);
    header{
      overflow: hidden;
      .screen{
        float: right;
        margin-right: 100px;
      }
    }
    .addIntegral-main{
      margin-top: 30px;
    }
  }
</style>
