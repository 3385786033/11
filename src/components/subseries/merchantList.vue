<template>
  <div class="merchantList">
    <header>
      <h3>店铺列表</h3>
      <div class="head-left">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input23"
          style="width: 360px"
        >
          <template slot="prepend">搜索</template>
        </el-input>
        <button type="button" class="btn btn-primary" @click="audits"><i class="el-icon-plus"></i> 添加店铺</button>
      </div>
      <div class="head-right">
        <el-select v-model="value4" clearable placeholder="请选择分类" style="width: 160px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button type="button" class="btn btn-primary"> 审核店铺</button>
        <button type="button" class="btn btn-primary" @click="show = !show"> 购买子店</button>
        <el-button type="danger" icon="el-icon-delete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="merchantList-main">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="店铺名称"
        >
        </el-table-column>
        <el-table-column prop="class" label="分类">

        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope"> {{scope.row.scope}}</template>
        </el-table-column>
        <el-table-column label="地址" prop="address">

        </el-table-column>
        <el-table-column label="电话" prop="mobile">

        </el-table-column>
        <el-table-column label="是否营业" prop="state">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <transition name="el-fade-in">
      <div class="buyBambino" v-show="show">
        <div class="buyBambino-head">
          <p>购买子店 <i class="el-icon-close clos" @click="show = !show"></i></p>
        </div>
        <div class="buyBambino-main">
          <el-form  ref="buyBambinoform" :model="buyBambinoform" label-width="120px">
            <el-form-item label="账号名称:">
              123
            </el-form-item>
            <el-form-item label="子店数量:">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button_new_tag" size="small" @click="showInput">+ 自定义</el-button>
            </el-form-item>
            <el-form-item label="支付方式:">
              <el-radio-group v-model="buyBambinoform.resource">
                <el-radio label="微信"></el-radio>
                <el-radio label="支付宝"></el-radio>
                <el-radio label="储值卡"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支付金额:">
              250
            </el-form-item>
            <el-form-item label="剩余店铺数量:">
              250
            </el-form-item>
            <el-form-item>
              <button type="button" class="btn btn-primary" style="margin-left: 100px"> 点 击 支 付 </button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        dynamicTags: ['50', '100', '150'],
        inputVisible: false,
        inputValue: '',
        buyBambinoform:{
          name: '三道杠',
          resource: '',
          picr: '2000元'
        },
        tableData3:[{
          name: '啥子嘛',
          class: '晓不得',
          address: '那个犄角嘎达啊啊啊啊啊啊啊',
          mobile: '9090950',
          state: '已倒闭'
        }],
        options:[{}],
        value4:'',
        input23:''
      }
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      audits(){
        this.$router.push({path:'/home/merchant/addMerchant'})
      }
    }
  }
</script>
<style scoped lang="scss">
  .merchantList{
    width: 100%;
    height: 100%;
    overflow: hidden;
      header{
        height: auto;
        width: 100%;
        overflow: hidden;
        padding-left: 20px;
        margin-bottom: 20px;
        h3{
          margin: 30px 20px;
        }
        .head-left{
          margin-top: 20px;
          float: left;
          margin-left: 20px;
        }
        .head-right{
          margin-top: 20px;
          float: right;
          margin-right: 30px;
        }
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }

    .merchantList-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    .buyBambino{
      width: 600px;
      height: 600px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 99;
      background-color: #fff;
      border: 1px solid;
      border-radius: 5px;
      .buyBambino-head{
        height: 50px;
        width: 100%;
        overflow: hidden;
        padding-left: 30px;
        background-color: #2e6da4;
        p{
          width: 100%;
          height: 100%;
          overflow: hidden;
          line-height: 50px;
          font-size: 18px;
          color: #fff;
          .clos{
            float: right;
            margin-top: 15px;
            cursor: pointer;
            margin-right: 30px;
          }
        }
      }
      .buyBambino-main{
        margin-top: 20px;
        padding-left: 10px;
        .el-tag + .el-tag {
          margin-left: 10px;
        }
        .button_new_tag {
          margin-left: 10px;
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }
        .input-new-tag {
          width: 90px;
          margin-left: 10px;
          vertical-align: bottom;
        }
      }
    }
  }
</style>
