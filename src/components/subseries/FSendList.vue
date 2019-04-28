<template>
  <div class="FSendlist">
    <header>
      <h3>群发管理</h3>
      <div class="head-right">
        <button type="button" class="btn btn-primary">草稿箱</button>
        <button type="button" class="btn btn-primary" @click="show =! show"><i class="el-icon-plus"></i> 新建群发</button>
        <el-button type="danger" icon="el-icon-delete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="FSendlist-main">
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
        <el-table-column label="主题">

        </el-table-column>
        <el-table-column label="发送时间">

        </el-table-column>
        <el-table-column label="内容">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <transition name="el-fade-in-linear">
      <div class="addDraft" v-show="show">
        <el-form ref="form" :model="form" label-width="120">
          <el-form-item label="主题">
            <el-input style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="群发对象">
            <el-select v-model="form.region" placeholder="请选择群发用户">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="群发内容">
            <el-input type="textarea" v-model="form.desc" style="width: 600px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show:false,
        tableData3:[{}],
        form: {
          region:'',
          desc: ''
        }
      }
    },
    methods:{

    }
  }
</script>
<style scoped lang="scss">
  .FSendlist{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
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
    .FSendlist-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    .addDraft{
      border: 1px solid;
    }
  }
</style>
