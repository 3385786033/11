<template>
  <div class="bypassIdMain">
    <header>
      <h3>子账号</h3>
      <div class="head-left">
        <p>剩余可添加子账号 <span>500</span> 个</p>
      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary" @click="record =! record">操作记录</button>
        <button type="button" class="btn btn-primary" @click='addbypassId =! addbypassId'><i class="el-icon-plus"></i> 新建子账号</button>
        <button type="button" class="btn btn-primary" @click="open5()"> 购买子账号</button>
        <el-button type="danger" icon="el-icon-delete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="bypassIdMain-main">
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
        <el-table-column label="用户名" prop="name">

        </el-table-column>
        <el-table-column label="权限" prop="jurisdiction">

        </el-table-column>
      </el-table>
    </section>
    <transition name="el-fade-in-linear">
      <div class="record" v-show="record">
       <h3>操作记录</h3>
        <div class="record-main">
          <div class="labels">
            <el-tag type="success" style="margin-right: 20px">全部</el-tag>
            <el-tag type="info" style="margin-right: 20px"> 一周 </el-tag>
            <el-tag type="warning">一个月</el-tag>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData2"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column label="时间" prop="time">

            </el-table-column>
            <el-table-column label="内容" prop="content">

            </el-table-column>
          </el-table>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="addbypassId" v-show="addbypassId">
        <h3>添加子账号</h3>
        <div class="addbypassId-main">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="用户名">
              <el-input  style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="权限">
              <el-switch v-model="form.delivery"></el-switch>
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
        record: false,
        addbypassId: false,
        form:{
          delivery: ''
        },
        tableData3:[{
          name: 'dsgasdf',
          jurisdiction: 'dsfsdfdasf'
        }],
        tableData2: [{
          time: '2016-02-26',
          content: 'asdgjsdakgpaskidgpkasdg[;ladsgsaldgasldgasdlgdas'
        }]
      }
    },
    methods: {
      open5 () {
        this.$confirm('请联系客服购买子账号', '购买子账号', {
          confirmButtonText: '在线购买',
          cancelButtonText: '拨打客服',
          type: 'warning'
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .bypassIdMain{
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
        span{
          color: blue;
        }
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .bypassIdMain-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    .record{
      width: 100%;
      overflow: hidden;
      border: 1px solid;
      h3{
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: 30px;
      }
      .record-main{
        .labels{
          margin-left: 30px;
          margin-bottom: 20px;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    .addbypassId{
      width: 100%;
      height: auto;
      border: 1px solid;
      overflow: hidden;
    }
  }
</style>
