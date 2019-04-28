<template>
  <!--商品详情-->
  <div class="comm-details">
      <header>
        <h3>编辑电商商品</h3>
      </header>
      <section class="addCommod-main">
        <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" label-position="left">
          <el-form-item label="选择分类" prop="region">
            <el-select v-model="ruleForm.classType" placeholder="请选择分类">
              <el-option label="衣服" value="yifu"></el-option>
              <el-option label="裤子" value="kuzi"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品名称" prop="name">
            <el-col :span="8">
              <el-input v-model="ruleForm.name" ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="上传图片" prop="region">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-exceed="limitImg"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品规格" prop="guige">
            <ul class="oLi-guige">
              <li>尺码</li>
              <li>颜色</li>
              <li>口味</li>
              <li>尺寸</li>
              <li>型号</li>
              <li>重置</li>
              <li>自定义</li>
            </ul>
            <el-tabs v-model="editableTabsValue" type="border-card" editable @edit="handleTabsEdit">
              <el-tab-pane
                :key="item.name"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name"
              >
                <div>
                  <ul class="oLi-listG">
                    <li>27</li>
                    <li>27</li>
                    <li>27</li>
                    <li>27</li>
                    <li>27</li>
                    <li>27</li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
          <el-form-item label="虚拟价格" prop="virtualPrice">
            <el-col :span="6">
              <el-input v-model="ruleForm.virtualPrice" type="number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-col :span="6">
              <el-input v-model="ruleForm.price" type="number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="库存" prop="inventory">
            <el-col :span="6">
              <el-input v-model="ruleForm.inventory" type="number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="商品重量" prop="weight">
            <el-col :span="4">
              <el-input v-model="ruleForm.weight" type="number"></el-input>
            </el-col>
            <span style="margin-left: 10px">kg</span>
          </el-form-item>
          <el-form-item label="商品体积" prop="volume">
            <el-col :span="4">
              <el-input v-model="ruleForm.volume" type="number"></el-input>
            </el-col>
            <span style="margin-left: 10px">cm^</span>
          </el-form-item>
          <el-form-item label="运费设置" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="包邮"></el-radio>
              <el-radio label="快递"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="城市定位" prop="cityOrient">
            <el-switch v-model="ruleForm.cityOrient"></el-switch>
            <div class="area" v-if="ruleForm.cityOrient">
              <area-select :level="2" type="text" v-model="ruleForm.selected"></area-select>
            </div>
          </el-form-item>
          <el-form-item label="推荐" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <el-col :span="16">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  <!--end-->
</template>
<script>
  export default {
    data () {
      return {
        id:'',
        ruleForm: {
          classType:'',
          name: '',
          virtualPrice:'',
          price:'',
          inventory:'',
          weight:'',
          volume:'',
          delivery: false,
          cityOrient:false,
          type: [],
          resource: '',
          guige:'',
          desc: '',
          selected:[]
        },
        dialogImageUrl: '',
        dialogVisible: false,
        editableTabsValue:'2',
        editableTabs: [{
          title: '尺码',
          name: '1',
          content: '尺码'
        }, {
          title: '颜色',
          name: '2',
          content: '颜色'
        },
          {
            title: '口味',
            name: '3',
            content: '口味'
          },
          {
            title: '尺寸',
            name: '4',
            content: '尺寸'
          },
          {
            title: '型号',
            name: '5',
            content: '型号'
          },
          {
            title: '重量',
            name: '6',
            content: '重量'
          }],
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /* this.$axios.post("/",this.ruleForm).then((response) =>{
               console.log(response)
             })*/
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      limitImg(files,fileList){
        console.log(files, fileList);
      },
      returnbtn(){
        this.$router.go(-1)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleTabsEdit(targetName, action){
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    },
    created(){
      this.id = this.$route.params.id
      this.$axios.post('/product/getProductDetail',{'product_id':this.id}).then((response) =>{
        if(response.status == -1){
          alert('获取商品信息失败！')
        }else {
          //this.ruleForm = response.data.data
          console.log(response)
        }
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
  .comm-details{
    @include aspect(100%,100%);
    header{
      height: 60px;
      width: 100%;
      overflow: hidden;
      h3{
        float: left;
      }
      .btn-primary{
        margin-top: 10px;
        margin-right: 300px;
        float: right;
      }
    }
    .addCommod-main{
      width: 60%;
      .oLi-guige{
        width: 100%;
        height: auto;
        overflow: hidden;
        li{
          float: left;
          margin-left: 10px;
          width: 80px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border: 1px #666 solid;
          border-radius: 5px;
        }
        li:first-child{
          background-color: #00AA88;
          color: #fff;
        }
      }
      .oLi-listG{
        li{
          width: 60px;
          height: 25px;
          border: 1px #333333 solid;
          float: left;
          margin-left: 20px;
          text-align: center;
          line-height: 25px;
          border-radius: 5px;

        }
        li:first-child{
          margin-left: 0;
        }
      }
    }
  }
</style>
