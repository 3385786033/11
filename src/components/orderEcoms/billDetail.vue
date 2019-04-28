<template>
  <div class="billDetail">
    <header>
      <h3>账单明细</h3>
      <div class="head-left">
        <div style="float: left">
          <span>选择日期：</span>
          <div class="block">
            <el-date-picker
              v-model="value6"
              type="daterange"
              @change="sendDate"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div style="float: left;margin-left: 30px">
          <span>付款方式：</span>
          <el-select v-model="value" @change="dataSends" placeholder="请选择" style="width: 160px">
            <el-option
              v-for="item in payment"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="head-right">
        <label>版本类型 ：</label>
        <el-select
          name="selectList"
          id=""
          style="width: 130px"
          class="selectType"
          filterable
          placeholder="请选择"
          @change="changs"
          v-model="values_type">
          <el-option
            v-for="item in listOptins"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--<el-button type="danger" icon="el-icon-delete" @click="allDeleta">批量删除<i class="el-icon-delete"></i></el-button>-->
      </div>
    </header>
    <section class="billDetail-main">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sortChange"
        >
        <el-table-column
          type="index"
          width="80">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.products"
              style="width: 80%;margin-left: 120px">
              <el-table-column
                prop="name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="数量">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名">

        </el-table-column>
        <el-table-column prop="tel" label="电话">

        </el-table-column>
        <el-table-column prop="total" label="总金额">

        </el-table-column>
        <el-table-column prop="status" label="交易状态">

        </el-table-column>
        <el-table-column prop="payment_type" label="支付方式">

        </el-table-column>
        <el-table-column label="日期" prop="create_time"  sortable="custom">

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
  import parson from '../../assets/js/parson'
  export default {
    data () {
      return {
        value6: '',
        value4: '',
        listOptins: [{
          value: '1',
          label: '电商版'
        }, /*{
          value: '2',
          label: '到店订单'
        }, {
          value: '3',
          label: '外卖订单'
        },{
          value: '4',
          label: '预约订单'
        },*/{
          value: '5',
          label: '分销版'
        }
        ],
        values_type:'',
        payment:[{
          label:'微信',
          value:'微信'
        },{
          label:'储值卡',
          value:'储值卡'
        }
        ],
        type_id:'',
        value: '',
        tableData3: [],
        tableData8:[],
        tableData: [],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10,
        //排序
        order_name:null,
        order_type:null,
      }
    },
    methods:{
      //分页
      handleSizeChange(val){
        this.pagesize = val;
      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableData.splice(index,1);
          this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
            if(response.data.status === 1){
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'success'
              });
            }else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      changs(){
        this.$nextTick(function () {
          let sum = parseInt(this.values_type)
          this.$axios.post('/order/getBillList',{'program_type':sum})
            .then((response)=>{
              if(response.data.status === 400){
                this.$message({message: response.data.message, type: 'error'});
                this.tableData3 = []
              }else {
                this.tableData3 = response.data.data.data
                this.sum = response.data.data.total
              }
            })
        })
      },
      sendDate(){
        let getDates = new parson.getTime()
        let rises = getDates.formatTime(this.value6[0])
        let overs = getDates.formatTime(this.value6[1])
        let datess = []
        datess.push(rises)
        datess.push(overs)
        //console.log(datess)
        let sendData = {
          program_type:this.type_id,
          date:datess,
          payment_type:this.value
        }
        //console.log(sendData)
        this.$axios.post('/order/getBillList',sendData).then((response)=>{
            this.tableData3 = response.data.data.data
          })
      },
      dataSends(){
        //console.log(datess)
        if(this.value6 === ''){
          let datess = []
          let sendData = {
            program_type:this.type_id,
            date:datess,
            payment_type:this.value
          }
          //console.log(sendData)
          this.$axios.post('/order/getBillList',sendData).then((response)=>{
              this.tableData3 = response.data.data.data
            this.sum = response.data.data.total
            })
        }else {
          let getDates = new parson.getTime()
          let rises = getDates.formatTime(this.value6[0])
          let overs = getDates.formatTime(this.value6[1])
          let datess = []
          datess.push(rises)
          datess.push(overs)
          let sendData = {
            program_type:this.type_id,
            date:datess,
            payment_type:this.value
          }
          this.$axios.post('/order/getBillList',sendData).then((response)=>{
              this.tableData3 = response.data.data.data
            this.sum = response.data.data.total
            })
        }
      },
      //排序
      sortChange(column, prop, order){
        this.$axios.post('/order/getBillList',{order_name:column.prop,order_type:column.order}).then((response) =>{
          console.log(response)
          this.order_name = column.prop
          this.order_type = column.order
          this.tableData3 = response.data.data.data
          this.sum = response.data.data.total
        })
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        this.$axios.post('/order/getBillList',{page:val,order_name:this.order_name,order_type:this.order_type}).then((response) =>{
          this.type_id = response.data.current_program_type
          this.tableData3 = response.data.data.data
          this.sum = response.data.data.total
        })
      },
    },
    created(){
      //全部订单
      this.$axios.post('/order/getBillList').then((response) =>{
          this.type_id = response.data.current_program_type
          this.tableData3 = response.data.data.data
          this.sum = response.data.data.total
        })
    },
  }
</script>
<style scoped lang="scss">
  .billDetail{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-left: 20px;
      h3{
        margin: 30px 20px;
      }
      .head-left{
        height: 36px;
        margin-top: 20px;
        float: left;
        line-height: 36px;
        margin-left: 20px;
        .block{
          float: right;
        }
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
        overflow: hidden;
      }
    }
    .billDetail-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;

      .son_oerder{
        overflow: hidden;
        li{
          font-size: 22px;
          font-weight: bold;
          margin: 0 50px;
          float: left;
        }
      }
    }
  }
</style>
