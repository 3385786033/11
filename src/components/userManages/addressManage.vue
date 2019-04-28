<template>
  <!--地址管理-->
  <div class="addressManage">
    <header>
      <h3>地址管理</h3>
    </header>
    <el-table
      ref="multipleTables"
      :data="addressData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
          <i>V</i>
        </template>
      </el-table-column>
      <el-table-column
        label="电话"
        width="200">
        <template slot-scope="scope">{{ scope.row.tel }}</template>
      </el-table-column>
      <el-table-column
        prop="postcode"
        label="邮编"
        width="200">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"> 删 除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--end-->
</template>
<script>
  export default {
    data () {
      return {
        addressData:[],
        ruleForm: {
          name: '',
          mobliedata:'',
          sex: '',
          delivery: false,
          email: '',
          grouping:'',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          mobliedata: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 8, max: 11, message: '长度在11个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          desc: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ],
          grouping: [
            { required: true, message: '请选择组类', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(index, row) {
        this.$axios.post('/customer_address/deleteCustomerAddress',{'customer_address_id':row.customer_address_id})
          .then((response) =>{
            //console.log(response)
          })
        this.addressData.splice(index, 1);
      }
    },
    created(){
      this.$nextTick(function () {
        this.$axios.post('/customer_address/getCustomerAddressList')
          .then((response) =>{
            //console.log(response)
            this.addressData = response.data.data
            if(response.data.status === 0){
              this.$message(response.data.message);
            }else {
              //console.log(response)
              this.addressData = response.data.data
            }
          })
          .catch((err)=>{
            console.log(err)
          })
      })
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
  .addressManage{
    @include aspect(100%,auto);
    margin-top: 30px;
    &:hover{
      cursor: pointer;
    }
  }
</style>
