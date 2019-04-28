<template>
  <div class="setegGfrenzy">
    <header>
      <h3>设置砸金蛋</h3>
      <div class="head-right">
        <button type="button" class="btn btn-primary" @click="back">返回</button>
      </div>
    </header>
    <section class="setegGfrenzy-main">
      <div class="addVip-mainLeft">
        <div class="img-left">
          <img src="../../assets/images/zjd.jpg" alt="">
        </div>
      </div>
      <div class="addVip-mainRight">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="活动时间：" >
                <el-form-item style="display: inline-block">
                  <el-date-picker
                    v-model="form.start_time"
                    clearable
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              <span style="display: inline-block">至</span>
                <el-form-item style="display: inline-block">
                  <el-date-picker
                    v-model="form.stop_time"
                    type="datetime"
                    clearable
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
          </el-form-item>
          <el-form-item label="抽奖设置" prop="rule_status">
            <el-radio-group v-model="form.rule_status" @change="radios()">
              <el-radio :label="1">有门槛</el-radio>
              <el-radio :label="0">无门槛</el-radio>
            </el-radio-group>
            <div v-if="isShowRadio">
              <el-form ref="forms" :model="forms" label-width="75px">
                <el-form-item>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="integral">
                      <span>积分：积分满</span><el-input style="width: 100px" v-model="forms.Lottery_integral"></el-input>
                    </el-checkbox>
                    <div style="width: 100%"></div>
                    <el-checkbox label="member" v-model="forms.Lottery_vip">
                      <span>会员：</span>
                      <el-radio-group v-model="forms.vip_radio">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-checkbox>
                    <div style="width: 100%"></div>
                    <el-checkbox label="value_card" v-model="forms.Lottery_storageCard">
                      <span>储值卡：</span>
                      <div class="margins" style="margin-top: -38px">
                        <el-radio-group v-model="storageCard_radio">
                          <el-radio label="balance">余额不低于：</el-radio>
                          <el-input v-model="storageCard_val1" style="width: 80px"></el-input><div style="display: inline-block;font-size: 14px;width: 20px">次</div>
                        </el-radio-group>
                      </div>
                      <div class="margins">
                        <el-radio-group v-model="storageCard_radio">
                          <el-radio label="single_top_up">单笔充值金额满</el-radio>
                        </el-radio-group>
                        <el-input v-model="storageCard_val2" style="width: 80px"></el-input><div style="display: inline-block;font-size: 14px">次</div>
                      </div>
                    </el-checkbox>
                    <div style="width: 100%"></div>
                    <el-checkbox label="order_form" v-model="forms.oerder">
                      <span>订单：</span>
                      <div class="margins" style="margin-top: -38px">
                        <el-radio-group v-model="oerder_radio">
                          <el-radio label="single">单笔订单满：</el-radio>
                          <el-input v-model="oerder_val1" style="width: 80px"></el-input><div style="display: inline-block;font-size: 14px;width: 20px">元</div>
                        </el-radio-group>
                      </div>
                      <div class="margins">
                        <el-radio-group v-model="oerder_radio">
                          <el-radio label="total">累计消费满：</el-radio>
                          <el-input v-model="oerder_val2" style="width: 80px"></el-input><div style="display: inline-block;font-size: 14px">元</div>
                        </el-radio-group>
                      </div>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!--<el-form-item>
                  <button type="button" class="btn btn-primary" @click="LotterysubmitForm('forms')">立即添加</button>
                  <el-button @click="isShowRadio = !isShowRadio">取消</el-button>
                </el-form-item>-->
              </el-form>
            </div>
          </el-form-item>
          <el-form-item label="抽奖次数" prop="lottery_frequency">
            <div style="float: left">
              <el-radio-group v-model="form.lottery_frequency">
                <el-radio label="everyone_day">每人每天</el-radio>
                <el-input v-model="drawNumberVal2" style="width: 80px"></el-input><div style="display: inline-block;font-size: 14px;width: 20px">次</div>
              </el-radio-group>
            </div>
            <div style="float: left">
              <el-radio-group v-model="form.lottery_frequency" style="margin-top: 7px">
                <el-radio label="everyone">每人</el-radio>
              </el-radio-group>
              <el-input v-model="drawNumberVal1" style="width: 80px"></el-input><div style="display: inline-block;font-size: 14px">次</div>
            </div>
          </el-form-item>
          <el-form-item label="中奖总概率" prop="win_prob">
            <el-input v-model="form.win_prob" style="width: 80px"></el-input>%
          </el-form-item>
          <el-form-item>
            <button type="button" class="btn btn-primary" @click="submitForm('form')">保 存</button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
          <el-form-item label="* 抽奖说明规则">
            <el-button type="primary" @click="addRule" :disabled="isRule">添加规则</el-button><i class="s_i">注：最多添加5条</i>
            <div>
              <el-table :data="Rule_tableData" style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.content"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="success"
                      @click="Rule_handleEdit(scope.$index, scope.row)"><i class="glyphicon glyphicon-check"></i></el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="Rule_handleDelete(scope.$index, scope.row)"><i class="glyphicon glyphicon-trash"></i></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
          <el-form-item label="* 奖品设置">
            <el-button type="primary" @click="addPrize" :disabled="Prize">添加设置</el-button><i class="s_i">注：最多添加10条</i>
            <el-table :data="prize_tableData" style="width: 100%">
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column
                label="奖品类型">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.type"
                    clearable
                    @change="prize_changs(scope.row)"
                    placeholder="请选择">
                    <el-option
                      v-for="item in options_type"
                      :key="item.key"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="奖品内容">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.details_id"
                    clearable
                    placeholder="请选择"
                    @change="selectGet"
                    v-if="scope.row.type === 1">
                    <el-option
                      v-for="item in options_prizeVal"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="scope.row.details_id"
                    clearable
                    placeholder="请选择"
                    @change="selectGet1"
                    v-if="scope.row.type === 2">
                    <el-option
                      v-for="item in options_prizeVal1"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-input v-model="scope.row.details" v-if="scope.row.type === 0"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="图标">
                <template slot-scope="scope">
                  <el-upload
                    class="avatar-uploader"
                    name="image"
                    :action="url+'/upload/upload'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="scope.row.icon" :src="scope.row.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column label="中奖概率">
                <template slot-scope="scope">
                  {{scope.row.win_prob}}%
                </template>
              </el-table-column>
              <el-table-column
                label="奖品数量(个)">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.amount"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                width="230"
                label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="prize_handleEdit(scope.$index, scope.row)">保存</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="prize_handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="* 中奖纪录">
            <el-button type="primary" @click="addRecord" :disabled="record">添加纪录</el-button><i class="s_i">注：最多添加5条</i>
            <el-table :data="Record_tableData" style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.content"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="Record_handleEdit(scope.$index, scope.row)"><i class="glyphicon glyphicon-check"></i></el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="Record_handleDelete(scope.$index, scope.row)"><i class="glyphicon glyphicon-trash"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  export default {
    data(){
      return {
        time1:'',
        time2:'',
        form:{
          start_time:'',
          stop_time:'',
          //有无门槛
          rule_status:'',
          //总概率
          win_prob:'',
          //抽奖次数
          lottery_frequency:'',
          rule_info:{}
        },
        rules:{
          win_prob:[
            {required: true, message: '请填总概率', trigger: 'blur' }
          ],
          rule_status:[
            {type: 'number', required: true, message: '请选择抽奖门槛', trigger: 'blur' }
          ],
          lottery_frequency:[
            { required: true, message: '请选择抽奖次数', trigger: 'blur' }
          ]
        },
        Rule_tableData: [],
        //抽奖规则
        Prize:false,
        isRule:null,
        //抽奖设置
        isShowRadio:false,
        checkList:[],
        Lottery_integral:'',
        forms:{
          Lottery_integral:'',
          Lottery_vip:'',
          vip_radio:'',
          Lottery_storageCard:'',
          oerder:'',
          drawNumber:'',
          probability:'',
        },
        storageCard_radio:'',
        storageCard_val1:'',
        storageCard_val2:'',
        oerder_val1:'',
        oerder_val2:'',
        //订单
        oerder_radio:'',
        //抽奖次数
        drawNumberVal1:'',
        drawNumberVal2:'',
        //设置奖品
        integral:'',
        prize_tableData:[
          {
            imageUrl:''
          }
        ],
        type:'',
        options_type:[],
        coupon_id:'',
        isPrize_type:false,
        details:'',
        options_prizeVal:[],
        options_prizeVal1:[],
        imageUrl: '',
        //中奖纪录
        Record_tableData:[],
        record:false,
        //无用数据
        isShowtime:'',
        options:[{}],
        value:'',
        checked:true,
        vip:true,
        infoStatus:'',
        //区分是否是第一次进入设置大转盘
        RotaryId:null
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      //添加规则
      addRule(){
        if(this.RotaryId === ''||this.RotaryId === undefined ||this.RotaryId === null){
          this.$message({
            showClose: true,
            message: '请先设置保存大转盘规则！',
            type: 'warning'
          });
        }else {
          if(this.Rule_tableData.length >= 5){

          }else {
            let datas = {}
            for(let i in this.Rule_tableData[0]){
              this.$set(datas,i,'')
            }
            this.Rule_tableData.push(datas)
          }
        }
      },
      Rule_handleEdit(index,row){
        if(row.id ===''||row.id === null|| row.id===undefined){
          this.$axios.post('/smash_golden_eggs/saveRuleExplain',{content:row.content}).then((response)=>{
            if(response.data.status === 200){
              this.$message({
                type: 'success',
                message: '保存成功！'
              });
              //抽奖规则
              this.$axios.post('/smash_golden_eggs/indexRuleExplain').then((response)=>{
                if(response.data.status === 200){
                  this.Rule_tableData = response.data.data
                }else{
                  this.$message({
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
            }else {
              this.$message({
                message: '保存失败！',
                type: 'error'
              });
            }
          })
        }else {
          this.$axios.post('/smash_golden_eggs/updateRuleExplain',{id:row.id,content:row.content}).then((response)=>{
            if(response.data.status === 200){
              this.$message({
                type: 'success',
                message: '保存成功！'
              });
              //抽奖规则
              this.$axios.post('/smash_golden_eggs/indexRuleExplain').then((response)=>{
                if(response.data.status === 200){
                  this.Rule_tableData = response.data.data
                }else{
                  this.$message({
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
            }else {
              this.$message({
                message: '保存失败！',
                type: 'error'
              });
            }
          })
        }

      },
      Rule_handleDelete(index,row){
        if(this.Rule_tableData.length <= 1){
          alert('不可删除！')
        }else {
          if(row.id ===''||row.id === null|| row.id===undefined){
            this.Rule_tableData.splice(index,1);
          }else {
            this.$axios.post('/smash_golden_eggs/deleteRuleExplain',{id:row.id}).then((response)=>{
              if(response.data.status === 200){
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                });
                this.$axios.post('/smash_golden_eggs/indexRuleExplain').then((response)=>{
                  this.Rule_tableData = response.data.data
                })
              }else {
                this.$message({
                  message: '删除失败！',
                  type: 'error'
                });
              }
            })
          }
        }
      },
      //抽奖设置
      radios(){
        if(this.form.rule_status === 1){
          this.isShowRadio = true
        }else {
          this.isShowRadio = false
        }
        //
      },
      LotterysubmitForm(){
        let obj = {
          member:'0',
          member_status:'0',
          integral:{
            min:'',
            status:0
          },
          order_form:{
            total:{
              full:'',
              status:0
            },
            single:{
              full:'',
              status:0
            }
          },
          value_card:{
            balance:{
              min:'',
              status:0
            },
            single_top_up:{
              min:'',
              status:0
            }
          },
        }
        let arr = ['member','integral','order_form','value_card']
        let rusel = []
        let arr2 = this.checkList
        let c = arr.toString();
        for(let i = 0;i<arr.length;i++){
          if(c.indexOf(arr[i].toString()) > -1){
            for(let j =0;j<arr2.length;j++){
              if (arr[i] == arr2[j]) {
                rusel.push(arr[i]);
                break;
              }
            }
          }
        }
        if(this.checkList.length === 0){
          obj = {
            member:'0',
            integral:{
              min:'',
              status:0
            },
            order_form:{
              total:{
                full:'',
                status:0
              },
              single:{
                full:'',
                status:0
              }
            },
            value_card:{
              balance:{
                min:'',
                status:0
              },
              single_top_up:{
                min:'',
                status:0
              }
            },
          }
        }else{
          for(let k in rusel){
            if(rusel[k] === 'member'){
              obj.member = '1'
              obj.member_status = this.forms.vip_radio
            }else if(rusel[k] === 'integral'){
              obj.integral.status = 1
              obj.integral.min = this.forms.Lottery_integral
            }else if(rusel[k] === 'order_form'){
              if(this.oerder_radio === 'total'){
                obj.order_form.total.full = this.oerder_val2
                obj.order_form.total.status = 1
                obj.order_form.single.full = ''
                obj.order_form.single.status = 0
              }else {
                obj.order_form.total.full = this.oerder_val2
                obj.order_form.total.status = 0
                obj.order_form.single.full = this.oerder_val1
                obj.order_form.single.status = 1
              }
            }else if(rusel[k] === 'value_card'){
              if(this.storageCard_radio === 'balance'){
                obj.value_card.balance.min = this.storageCard_val1
                obj.value_card.balance.status = 1
                obj.value_card.single_top_up.min =''
                obj.value_card.single_top_up.status = 0
              }else {
                obj.value_card.balance.min = ''
                obj.value_card.balance.status = 0
                obj.value_card.single_top_up.min =this.storageCard_val2
                obj.value_card.single_top_up.status = 1
              }
            }
          }
        }
        this.form.rule_info = obj
        this.isShowRadio = false
        //console.log(obj)
      },
      //设置奖品
      prize_changs(row){
        switch(parseInt(row.type)){
          case 0:
            this.isPrize_type = false
            if(typeof row.details === 'object'){
              row.details = ''
            }
            break;
          case 1:
            this.isPrize_type = true
            this.$axios.post('/smash_golden_eggs/getVirtualPrize').then((response)=>{
              if(response.data.status === 200){
                this.options_prizeVal = response.data.data
              }else {
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'
                });
              }
            })
            break;
          case 2:
            this.isPrize_type = true
            this.$axios.post('/smash_golden_eggs/getThinks').then((response)=>{
              if(response.data.status === 200){
                this.options_prizeVal1 = response.data.data
              }else {
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'
                });
              }
            })
            break;
          default:
            this.$message({
              showClose: true,
              message: '暂无此类型！',
              type: 'error'
            });
        }
      },
      selectGet(vId){
        let obj = {};
        obj = this.options_prizeVal.find((item)=>{
          return item.id === vId;
        })
        console.log(obj.type)
      },
      selectGet1(vId){
        /*let obj = {};
        obj = this.options_prizeVal.find((item)=>{
          return item.id === vId;
        })*/
        //console.log(obj.type)
      },
      addPrize(){
        if(this.RotaryId === ''||this.RotaryId === undefined ||this.RotaryId === null){
          this.$message({
            showClose: true,
            message: '请先设置保存大转盘规则！',
            type: 'warning'
          });
        }else {
          if(this.prize_tableData.length >= 10){

          }else {
            let datas = {}
            for(let i in this.prize_tableData[0]){
              this.$set(datas,i,'')
            }
            this.prize_tableData.push(datas)
          }
        }
      },
      prize_handleEdit(index,row){
        let detail = ''
        switch(row.type){
          case 0:
            detail = row.details
            break;
          case 1:
            detail = {
              coupon_id:row.details_id
            }
            break;
          case 2:
            detail = {
              thank_id:row.details_id
            }
            break;
          default:
        }
        let img = ''
        if(this.imageUrl === ''){
          img = row.icon
        }else {
          img = this.imageUrl
        }
        let sendData = {}
        if(row.id === ''||row.id===null||row.id === undefined){
          sendData = {
            type:row.type,
            details:JSON.stringify(detail),
            icon:img,
            amount:row.amount,
          }
          this.$axios.post('/smash_golden_eggs_prize/save',sendData).then((response)=>{
            if(response.data.status === 200){
              this.$message({
                type: 'success',
                message: response.data.message
              });
              this.$axios.post('/smash_golden_eggs_prize/index').then((response)=>{
                if(response.data.status === 200){
                  this.prize_tableData = response.data.data
                }else{
                  this.$message({
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
              this.imageUrl = ''
            }else {
              this.$message({
                message: response.data.message,
                type: 'error'
              });
            }
          })
        }else {
          sendData = {
            type:row.type,
            details:JSON.stringify(detail),
            icon:img,
            amount:row.amount,
            id:row.id
          }
          this.$axios.post('/smash_golden_eggs_prize/update',sendData).then((response)=>{
            if(response.data.status === 200){
              this.$message({
                type: 'success',
                message: response.data.message
              });
              this.$axios.post('/smash_golden_eggs_prize/index').then((response)=>{
                if(response.data.status === 200){
                  this.prize_tableData = response.data.data
                }else{
                  this.$message({
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
              this.imageUrl = ''
            }else {
              this.$message({
                message: response.data.message,
                type: 'error'
              });
            }
          })
        }

      },
      prize_handleDelete(index,row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

          if(row.id ===''||row.id === null|| row.id===undefined){
            this.prize_tableData.splice(index,1);
          }else {
            this.$axios.post('/smash_golden_eggs_prize/delete',{'id':row.id}).then((response) =>{
              if(response.data.status === 200){
                this.$axios.post('/smash_golden_eggs_prize/index').then((response)=>{
                  this.prize_tableData = response.data.data
                })
              }else {
                this.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'
                });
              }
            })
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleAvatarSuccess(res, file) {
        if(res.status === 200) {
          this.$message({
            type: 'success',
            message: '上传成功'
          });
          this.imageUrl = res.data.image_url
        }
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      //中奖纪录
      Record_handleEdit(index,row){
        if(row.id ===''||row.id === null|| row.id===undefined){
          this.$axios.post('/smash_golden_eggs_record_fake/save',{'content':row.content}).then((response)=>{
            if(response.data.status === 200){
              this.$message({
                type: 'success',
                message: response.data.message
              });
              this.$axios.post('/smash_golden_eggs_record_fake/index').then((response)=>{
                if(response.data.status === 200){
                  this.Record_tableData = response.data.data
                }else {
                  this.$message({
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
            }else {
              this.$message({
                message: response.data.message,
                type: 'error'
              });
            }
          })
        }else {
          this.$axios.post('/smash_golden_eggs_record_fake/update',{'content':row.content,id:row.id}).then((response)=>{
            if(response.data.status === 200){
              this.$message({
                type: 'success',
                message: response.data.message
              });
            }else {
              this.$message({
                message: response.data.message,
                type: 'error'
              });
            }
          })
        }
      },
      Record_handleDelete(index,row){
        if(row.id ===''||row.id === null|| row.id===undefined){
          this.Record_tableData.splice(index,1)
        }else {
          this.$axios.post('/smash_golden_eggs_record_fake/delete',{id:row.id}).then((response)=>{
            if(response.data.status === 200){
              this.$message({
                type: 'success',
                message: response.data.message
              });
              this.$axios.post('/smash_golden_eggs_record_fake/index').then((response)=>{
                this.Record_tableData = response.data.data
              })
            }else {
              this.$message({
                type: 'error',
                message: '删除失败！'
              });
            }
          })
        }
      },
      addRecord(){
        if(this.RotaryId === ''||this.RotaryId === undefined ||this.RotaryId === null){
          this.$message({
            showClose: true,
            message: '请先设置保存大转盘规则！',
            type: 'warning'
          });
        }else {
          if(this.Record_tableData.length>=5){

          }else {
            let datas = {}
            for(let i in this.Record_tableData[0]){
              this.$set(datas,i,'')
            }
            this.Record_tableData.push(datas)
          }
        }
      },
      //刷新数据
      getDatas(){
        //抽奖规则
        this.$axios.post('/smash_golden_eggs/indexRuleExplain').then((response)=>{
          if(response.data.status === 200){
            this.Rule_tableData = response.data.data
          }else{
            this.$message({
              message: response.data.message,
              type: 'error'
            });
          }
        })
        //奖品类型
        this.$axios.post('/smash_golden_eggs/getPrizeType').then((response)=>{
          if(response.data.status === 200){
            this.options_type = response.data.data
          }else{
            this.$message({
              message: response.data.message,
              type: 'error'
            });
          }
        })
        //中奖纪录
        this.$axios.post('/smash_golden_eggs_record_fake/index').then((response)=>{
          if(response.data.status === 200){
            this.Record_tableData = response.data.data
          }else {
            this.$message({
              message: response.data.message,
              type: 'error'
            });
          }
        })
        //设置奖品获取列表
        this.$axios.post('/smash_golden_eggs/getVirtualPrize').then((response)=>{
          if(response.data.status === 200){
            this.options_prizeVal = response.data.data
          }else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
        })
        this.$axios.post('/smash_golden_eggs/getThinks').then((response)=>{
          if(response.data.status === 200){
            this.options_prizeVal1 = response.data.data
          }else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
        })
        this.$axios.post('/smash_golden_eggs_prize/index').then((response)=>{
          if(response.data.status === 200){
            this.prize_tableData = response.data.data
          }else{
            this.$message({
              message: response.data.message,
              type: 'error'
            });
          }
        })
        this.$axios.post('/smash_golden_eggs/read').then((response)=>{
          //区分门槛是否编辑
          this.infoStatus = response.data.data.rule_info
          //活动时间
          this.form.start_time = response.data.data.start_time
          this.form.stop_time = response.data.data.stop_time
          //抽奖设置
          this.form.rule_status = response.data.data.rule_status
          if(response.data.data.rule_info.member ==='0'){

          }else {
            this.checkList.push('member')
            if(response.data.data.rule_info.member_status ==='0'){
              this.forms.vip_radio = 0
            }else {
              this.forms.vip_radio = 1
            }
          }
          /**
           * 积分
           */
          if(response.data.data.rule_info.integral.status === 1){
            this.checkList.push('integral')
            this.forms.Lottery_integral = response.data.data.rule_info.integral.min
          }else {

          }
          /**
           * 储值卡
           */
          if(response.data.data.rule_info.value_card.balance.status===1 ||response.data.data.rule_info.value_card.single_top_up.status===1){
            this.checkList.push('value_card')
            if(response.data.data.rule_info.value_card.balance.status===1){
              this.storageCard_radio = 'balance'
              this.storageCard_val1 = response.data.data.rule_info.value_card.balance.min
            }else {
              this.storageCard_radio = 'single_top_up'
              this.storageCard_val2 = response.data.data.rule_info.value_card.single_top_up.min
            }
          }else {

          }
          /**
           * 订单
           */
          if(response.data.data.rule_info.order_form.single.status===1 ||response.data.data.rule_info.order_form.total.status===1){
            this.checkList.push('order_form')
            if(response.data.data.rule_info.order_form.single.status===1){
              this.oerder_radio = 'single'
              this.oerder_val1 = response.data.data.rule_info.order_form.single.full
            }else {
              this.oerder_radio = 'total'
              this.oerder_val2 = response.data.data.rule_info.order_form.total.full
            }
          }else {

          }

          //抽奖次数
          if(response.data.data.lottery_frequency.everyone.status === '1' ){
            this.form.lottery_frequency = 'everyone'
            this.drawNumberVal1 = response.data.data.lottery_frequency.everyone.frequency
          }else {
            this.form.lottery_frequency = 'everyone_day'
            this.drawNumberVal2 = response.data.data.lottery_frequency.everyone_day.frequency
          }
          //中奖概率
          this.form.win_prob = response.data.data.win_prob
        })
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          //抽奖设置
          let obj = {
            member:'0',
            member_status:'0',
            integral:{
              min:'',
              status:0
            },
            order_form:{
              total:{
                full:'',
                status:0
              },
              single:{
                full:'',
                status:0
              }
            },
            value_card:{
              balance:{
                min:'',
                status:0
              },
              single_top_up:{
                min:'',
                status:0
              }
            },
          }
          let arr = ['member','integral','order_form','value_card']
          let rusel = []
          let arr2 = this.checkList
          let c = arr.toString();
          for(let i = 0;i<arr.length;i++){
            if(c.indexOf(arr[i].toString()) > -1){
              for(let j =0;j<arr2.length;j++){
                if (arr[i] == arr2[j]) {
                  rusel.push(arr[i]);
                  break;
                }
              }
            }
          }
          if(this.checkList.length === 0){
            obj = {
              member:'0',
              integral:{
                min:'',
                status:0
              },
              order_form:{
                total:{
                  full:'',
                  status:0
                },
                single:{
                  full:'',
                  status:0
                }
              },
              value_card:{
                balance:{
                  min:'',
                  status:0
                },
                single_top_up:{
                  min:'',
                  status:0
                }
              },
            }
          }else{
            for(let k in rusel){
              if(rusel[k] === 'member'){
                obj.member = '1'
                obj.member_status = this.forms.vip_radio
              }else if(rusel[k] === 'integral'){
                obj.integral.status = 1
                obj.integral.min = this.forms.Lottery_integral
              }else if(rusel[k] === 'order_form'){
                if(this.oerder_radio === 'total'){
                  obj.order_form.total.full = this.oerder_val2
                  obj.order_form.total.status = 1
                  obj.order_form.single.full = ''
                  obj.order_form.single.status = 0
                }else {
                  obj.order_form.total.full = this.oerder_val2
                  obj.order_form.total.status = 0
                  obj.order_form.single.full = this.oerder_val1
                  obj.order_form.single.status = 1
                }
              }else if(rusel[k] === 'value_card'){
                if(this.storageCard_radio === 'balance'){
                  obj.value_card.balance.min = this.storageCard_val1
                  obj.value_card.balance.status = 1
                  obj.value_card.single_top_up.min =''
                  obj.value_card.single_top_up.status = 0
                }else {
                  obj.value_card.balance.min = ''
                  obj.value_card.balance.status = 0
                  obj.value_card.single_top_up.min =this.storageCard_val2
                  obj.value_card.single_top_up.status = 1
                }
              }
            }
          }
          this.form.rule_info = obj
          //时间
          let gitTime = new parson.getData();
          let rises = ''
          let overs = ''
          if(isNaN(this.form.start_time) &&!isNaN(Date.parse(this.form.stop_time))){
            rises = this.form.start_time
          }else {
            rises = gitTime.formatDate(this.form.start_time)
          }
          if(isNaN(this.form.stop_time) &&!isNaN(Date.parse(this.form.stop_time))){
            overs =this.form.stop_time
          }else {
            overs = gitTime.formatDate(this.form.stop_time)
          }
          //抽奖次数
          let drawNumber = this.form.lottery_frequency
          let lottery_frequencys = {}
          if(drawNumber === 'everyone'){
            lottery_frequencys = {
              everyone:{
                status:'1',
                frequency:this.drawNumberVal1
              },
              everyone_day:{
                status:'0',
                frequency:this.drawNumberVal2
              }
            }
          }else {
            lottery_frequencys = {
              everyone:{
                status:'0',
                frequency:this.drawNumberVal1
              },
              everyone_day:{
                status:'1',
                frequency:this.drawNumberVal2
              }
            }
          }
          let josns = ''
          if(JSON.stringify(this.form.rule_info) === '{}'){
            josns = JSON.stringify(this.infoStatus)
          }else {
           // console.log(this.form.rule_info)
            josns = JSON.stringify(this.form.rule_info)
          }
          //抽奖设置
          let sendData = {
            start_time:rises,
            stop_time:overs,
            rule_status:this.form.rule_status,
            win_prob:this.form.win_prob,
            lottery_frequency:lottery_frequencys,
            rule_info:josns
          }
          if (valid) {
            this.$axios.post('/smash_golden_eggs/update',sendData).then((response)=>{
              if(response.data.status === 200){
                this.$message({
                  type: 'success',
                  message: response.data.message
                });
                this.getDatas();
              }
            })
          }else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
    created(){
      //抽奖规则
      this.$axios.post('/smash_golden_eggs/indexRuleExplain').then((response)=>{
        if(response.data.status === 200){
          this.Rule_tableData = response.data.data
        }else{
          this.$message({
            message: response.data.message,
            type: 'error'
          });
        }
      })
      //奖品类型
      this.$axios.post('/smash_golden_eggs/getPrizeType').then((response)=>{
        if(response.data.status === 200){
          this.options_type = response.data.data
        }else{
          /*this.$message({
            message: response.data.message,
            type: 'error'
          });*/
        }
      })
      //中奖纪录
      this.$axios.post('/smash_golden_eggs_record_fake/index').then((response)=>{
        if(response.data.status === 200){
          this.Record_tableData = response.data.data
        }else {
          this.$message({
            message: response.data.message,
            type: 'error'
          });
        }
      })
      //设置奖品获取列表
      this.$axios.post('/smash_golden_eggs/getVirtualPrize').then((response)=>{
        if(response.data.status === 200){
          this.options_prizeVal = response.data.data
        }else {
          this.$message({
            showClose: true,
            message: response.data.message,
            type: 'error'
          });
        }
      })
      this.$axios.post('/smash_golden_eggs/getThinks').then((response)=>{
        if(response.data.status === 200){
          this.options_prizeVal1 = response.data.data
        }else {
          this.$message({
            showClose: true,
            message: response.data.message,
            type: 'error'
          });
        }
      })
      this.$axios.post('/smash_golden_eggs_prize/index').then((response)=>{
        if(response.data.status === 200){
          this.prize_tableData = response.data.data
        }else{
          this.$message({
            message: response.data.message,
            type: 'error'
          });
        }
      })

      this.$axios.post('/smash_golden_eggs/read').then((response)=>{
        //判断是否是首次进入
        if(response.data.data.id === ''||response.data.data.id === undefined || response.data.data.id === null){

        }else {
          this.RotaryId = response.data.data.id
        }
        //区分门槛是否编辑
        this.infoStatus = response.data.data.rule_info
        //活动时间
        this.form.start_time = response.data.data.start_time
        this.form.stop_time = response.data.data.stop_time
        //抽奖设置
        this.form.rule_status = response.data.data.rule_status
        if(response.data.data.rule_info.member ==='0'){

        }else {
          this.checkList.push('member')
          if(response.data.data.rule_info.member_status ==='0'){
            this.forms.vip_radio = 0
          }else {
            this.forms.vip_radio = 1
          }
        }
        /**
         * 积分
         */
        if(response.data.data.rule_info.integral.status === 1){
          this.checkList.push('integral')
          this.forms.Lottery_integral = response.data.data.rule_info.integral.min
        }else {

        }
        /**
         * 储值卡
         */
        if(response.data.data.rule_info.value_card.balance.status===1 ||response.data.data.rule_info.value_card.single_top_up.status===1){
          this.checkList.push('value_card')
          if(response.data.data.rule_info.value_card.balance.status===1){
            this.storageCard_radio = 'balance'
            this.storageCard_val1 = response.data.data.rule_info.value_card.balance.min
          }else {
            this.storageCard_radio = 'single_top_up'
            this.storageCard_val2 = response.data.data.rule_info.value_card.single_top_up.min
          }
        }else {

        }
        /**
         * 订单
         */
        if(response.data.data.rule_info.order_form.single.status===1 ||response.data.data.rule_info.order_form.total.status===1){
          this.checkList.push('order_form')
          if(response.data.data.rule_info.order_form.single.status===1){
            this.oerder_radio = 'single'
            this.oerder_val1 = response.data.data.rule_info.order_form.single.full
          }else {
            this.oerder_radio = 'total'
            this.oerder_val2 = response.data.data.rule_info.order_form.total.full
          }
        }else {

        }

        //抽奖次数
        if(response.data.data.lottery_frequency.everyone.status === '1' ){
          this.form.lottery_frequency = 'everyone'
          this.drawNumberVal1 = response.data.data.lottery_frequency.everyone.frequency
        }else {
          this.form.lottery_frequency = 'everyone_day'
          this.drawNumberVal2 = response.data.data.lottery_frequency.everyone_day.frequency
        }
        //中奖概率
        this.form.win_prob = response.data.data.win_prob
      })
    },
    //限制中奖纪录条数
    updated(){
      this.$nextTick(function () {
        if(this.Record_tableData.length >= 5){
          this.record = true
        }else {
          this.record = false
        }
      })
      //限制中奖纪录
      this.$nextTick(function () {
        if(this.Rule_tableData.length >= 5){
          this.isRule = true
        }else {
          this.isRule = false
        }
      })
      //限制奖品设置条数
      this.$nextTick(function () {
        if(this.Rule_tableData.length >= 5){
          this.Prize = true
        }else {
          this.Prize = false
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
  .setegGfrenzy{
    header{
      padding-left: 30px;
      padding-top: 20px;
      margin-bottom: 50px;
      overflow: hidden;
      .head-right{
        float: right;
        margin-right: 25px;
      }
    }
    section{
      .addVip-mainLeft{
        width: 22%;
        height: 583px;
        float: left;
        background-image: url("https://essocial.win/public/static/image/backend/common/souji.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        /* border: 1px solid;*/
        .cread{
          width: 90%;
          height: 180px;
          overflow: hidden;
          margin: 100px auto;
          border-radius: 10px;
          border: 1px solid;
          background-color: black;
          position: relative;
          header{
            height: 60px;
            padding: 0;
            margin: 20px 0 0 0;
            box-sizing: border-box;
            overflow: hidden;
            .cread-left{
              height: 50px;
              width: 50px;
              margin-left: 30px;
              overflow: hidden;
              float: left;
              border-radius: 50%;
              img{
                width: 100%;
                height: 100%;
                display: block;
                overflow: hidden;
              }
            }
            .cread-right{
              float: left;
              height: 100%;
              overflow: hidden;
              padding-left: 10px;
              p{
                margin: 0;
                color: #fff;
              }
              p:nth-of-type(1){
                font-weight: bold;
                font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
                margin-top: 5px;
              }
            }
          }
          .footers{
            width: 100%;
            height: 40px;
            margin: 0;
            padding: 0;
            position: absolute;
            bottom: 0;
            color: #fff;
            p{
              padding-left: 30px;
              line-height: 40px;
              margin: 0;
              font-size: 12px;
            }
          }
        }
        .img-left{
          width: 100%;
          height: 583px;
          float: left;
          overflow: hidden;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .addVip-mainRight{
        width: 75%;
        height: auto;
        float: left;
        overflow: hidden;
        padding-left: 3%;
        .logoImg{
          width: 50px;height: 50px;border: 1px solid;float: left;border-radius: 50%;overflow: hidden;
          img{
            display: block;
            height: 100%;
            width: 100%;
          }
        }
        .messages{
          font-size: 12px;color: red;margin-top: 10px;display: inline-block;
        }
        .colors{
          margin-bottom: 20px;
        }
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 16px;
        color: #8c939d;
        width: 88px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        border: 1px solid;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .s_i{
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .margins{
      margin-left: 80px;
    }
    .img-left{
      width: 328px;
      height: 583px;
      float: left;
      overflow: hidden;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .Mask{
      width: 100%;
      height: 100%;
      z-index: 99;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: 0 auto;
      background-color: rgba(0,0,0,.5);
      .buyBambino{
        width: 600px;
        height: 650px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 9999;
        background-color: #fff;
        border: 1px solid;
        border-radius: 10px;
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
        }
      }
    }
  }

</style>
