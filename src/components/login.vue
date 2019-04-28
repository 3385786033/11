<template>
  <div class="loginComponent">
    <div class="loginMain">
      <p>账号登录</p>
      <div action="" class="loginFrom">
        <div class="formInput">
          <i class="mobile"></i>
          <input type="text" placeholder="用户名" maxlength="11" name="mob" id="mob" v-model="name">
        </div>
        <div class="info">
          <p id="msg"></p>
        </div>
        <div class="formInput">
          <i class="password"></i>
          <input type="password" placeholder="密码" name="passwd" id="passwd" v-model="pwd">
        </div>
        <div class="info2">
          <p id="msg2"></p>
        </div>
        <div class="codeInput formInput">
          <input type="text" class="codes" id="codesval"  placeholder="请输入验证码" v-model="codes" >
          <div id="mycanvas" width='90' height='35' @click="baclick">
            <img :src="codesImg" alt="" class="mycanvasImg">
          </div>
        </div>
        <div class="loginMsg">
          <!-- <a href="../register/register.html">没有账号？注册</a>
           <a href="../reset/reset.html">忘记密码？</a>-->
        </div>
        <div class="isErro"></div>
        <a href="javascript:;" class="loginSub"@click="loginsub">登录</a>
      </div>
      <div class="thirdPartyLogin">

      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        pwd:'',
        name:'',
        codes:'',
        num:'',
        codesImg:''
      }
    },
    methods:{
      loginsub(){
        //this.$router.push({name:'statisticDataInfo'})
        this.$axios.post("/admin_controller/loginCheck",{nickname:this.name,password:this.pwd,captcha:this.codes}).then((response)=>{
          //console.log(response)
          if(response.data.status === 200){
            this.$router.push({name:'statisticDataInfo'})
            window.location.reload();
          }else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
        })
      },
      baclick(){
        this.$axios.post("/admin_controller/getCaptcha").then((response)=>{
          this.codesImg = response.data.data.file_path
        })
      }
    },
    created(){
      this.$axios.post("/admin_controller/getCaptcha").then((response)=>{
        this.codesImg = response.data.data.file_path
      })
    }
  }
</script>
<style scoped lang="scss">
  ::-webkit-input-placeholder{
    font-size: 14px;
    color: #B7B7B7;
  }
  html,body{
    padding:0;margin:0;
  }
  select,input,img,select{vertical-align:middle;}
  a,a:hover,a:active,a:focus{text-decoration:none;}
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  input[type=text]:focus, input[type=password]:focus, textarea:focus {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  .pointer{cursor: pointer}
  .loginComponent{

    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    background: url("https://mps.essocial.com.cn/static/image/frontend/bglogin.png") no-repeat center;
    background-color: #fff;
  }
  .loginMain{
    width: 627px;
    height: 536px;
    background: #fff;
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0 0 5px #515567;
    border-radius: 3px;}
  .loginMain p{
    font-size: 20px;
    text-align: center;
    color: #515567;
    padding: 100px 0 35px 0;
    margin:0 auto;
  }
  .loginMain .getWay{
    font-size: 16px;
    text-align: center;
    margin:0 auto;
    padding-bottom: 30px;

  }
  .loginMain .getWay_left{
    color: #FD7242;
    cursor: pointer;
  }
  .loginMain .getWay_right{
    cursor: pointer;
  }
  .loginMain .toHelpDoc{
    color: gray;
    font-size: 12px;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
  }
  .Register p{
    padding: 40px 0 30px 0;
  }
  .forgetPwd p{ padding: 60px 0 15px 0;}
  .loginFrom{
    width: 294px;
    height: auto;
    overflow: hidden;
    padding-left: 25px;
    padding-right: 20px;
    position: relative;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: auto;
  }
  .formInput{
    width: 248px;
    margin:0 auto 18px auto;
    box-sizing:border-box; -moz-box-sizing:border-box; /* Firefox */ -webkit-box-sizing:border-box;
    position:relative;
  }
  .Register .formInput{
    margin-bottom:14px;
  }
  .loginFrom i{
    height: 20px;
    width: 20px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .loginFrom .mobile,.loginFrom .password,.loginFrom .verificationCode,.loginFrom .company,.loginFrom .questions,.loginFrom .user,.loginFrom .answer{
    position:absolute;
    left:-24px;
    top:-2px;
  }
  .loginFrom .mobile{
    background: url("https://mps.essocial.com.cn/static/image/frontend/mobile.png") no-repeat;
    background-size: 20px 20px;
  }.loginFrom .company{
     background: url("https://mps.essocial.com.cn/static/image/frontend/company.png") no-repeat;
     background-size: 20px 20px;
   }.loginFrom .verificationCode{
      background: url("https://mps.essocial.com.cn/static/image/frontend/verificationCode.png") no-repeat;
      background-size: 20px 20px;
    }
  .loginFrom .password{
    background: url("https://mps.essocial.com.cn/static/image/frontend/password.png") no-repeat;
    background-size: 20px 20px;
  }
  .loginFrom .questions{
    /*background: url("./question.svg") no-repeat;*/
    background: url("https://mps.essocial.com.cn/static/image/frontend/password.png") no-repeat;
    background-size: 22px 22px;
  }
  .loginFrom .answer{
    /*background: url("./answer.svg") no-repeat;*/
    background-size: 22px 22px;
  }
  .loginFrom .user{
    /*background: url("./user.svg") no-repeat;*/
    background-size: 20px 20px;
  }
  .formInput input{
    height: 35px;
    width: 248px;
    padding-left: 5px;
    border: 1px solid #CAC7C7;
    box-sizing:border-box; -moz-box-sizing:border-box; /* Firefox */ -webkit-box-sizing:border-box;
  }
  .formInput select{
    height: 35px;
    width: 248px;
    padding-left: 5px;
    border: 1px solid #CAC7C7;
    box-sizing:border-box; -moz-box-sizing:border-box; /* Firefox */ -webkit-box-sizing:border-box;
  }
  .loginMain .thirdPartyLogin{
    padding-top: 10px;
    margin: 0 auto;
    text-align: center;
  }
  .sendMsg input{
    width: 178px;
    float: left;
  }
  .sendMsg a{
    display: inline-block;
    line-height: 35px;
    font-size: 12px;
    color: #fff;
    padding:0 5px;
    background-color: #ff6d00;
  }

  .loginMsg{
    width: 248px;
    overflow: hidden;
    height: 35px;
    margin: 0 auto ;
    font-size: 12px;
    line-height: 35px;}
  .loginMsg span{
    float: left;
    color: #B7B7B7;
  }
  .loginMsg a{
    float: right;
    color: #B7B7B7;
  }
  .loginMsg a:nth-of-type(1){
    float: left;
  }
  .loginSub,.registerSub,.forgetSub{
    width: 248px;
    height: 35px;
    background-color: #FD7242;
    text-align: center;
    line-height: 35px;
    display: block;
    color: #fff;
    margin: 0 auto;
    margin-top: 10px;
  }

  .isErro{
    font-size: 14px;
    color: red;
    text-align: center;
  }
  /*用户协议*/
  .mask-protocol{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0,0,0,.5);
    top: 0;
    bottom: 0;
    z-index: 9999;
    display: none;
  }
  .mask-protocol-content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 60%;
    height: 80%;
    margin: auto;
    overflow: hidden;
    background-color: #fff;
  }
  .mask-protocol-close{
    width: 1.5rem;
    height: 1.5rem;
    float: right;
    margin: 1rem 1rem;
    background-image: url("http://cms.essocial.com.cn/assets/i/clones2.png");
    background-size: 100% 100%;
    background-position: center;
  }
  .mask-protocol-title1{
    font-size: 24px;
    line-height:40px;
    color:#000;
    text-align:center;
  }
  .mask-protocol-title{

  }
  .mask-info{
    width: 100%;
    height: 75%;
    padding: 2% 3% 0 3%;
    overflow-y: scroll;
    font-size: 16px;
    box-sizing:border-box;
    color: #4d4d4d;
    line-height:37px;
    /*border-bottom: 1px solid #6f6c6c;*/
  }
  .mask-info-title{
    font-size:16px;
    line-height:37px;
    color: #000;
    margin-top: 3rem;
  }
  .mask-info-footer{
    margin:2% 0 2% 3%;
  }
  .mask-info-btn{
    float: right;
    margin-right: 3rem;
    border: 0;
    background-color: #ff6d00;
    width: 5rem;
    height: 2rem;
    color: #fff;
    border-radius: 5px ;
    outline: none;
  }
  .backHome{
    position:fixed;
    top:0;
    left:0;
  }
  .backHomea{
    display:block;
    width:320px;
    height:100px;
    margin-left:20px;
    opacity: 0;
  }
  .loginMain .woen{
    font-size:14px;
    padding:0;
    text-align:center;
  }

  .codeInput{
    height: 35px;
    overflow: hidden;
    width: 249px !important;
  }
  .formInput{
    position: relative;
  }
  .codes{
    height: 35px;
    width: 159px!important;
    padding-left: 5px;
    outline: none;
    float: left;
    border: 1px solid #CAC7C7;
    box-sizing: border-box;
  }
  .loginFrom{
    width: 100%;
  }
  .info{
    width: 150px;
    height: auto;
    margin-right: 30px;
    position: absolute;
    top:0;
    right: 0;
  }
  .info2{
    width: 150px;
    height: 50px;
    margin-right: 30px;
    position: absolute;
    top:0;
    right: 0;
    margin-top: 55px;
  }
  .info p,.info2 p{
    padding: 0;
    font-size: 14px;
    color: red;
    text-align: left;
  }
  .codes::-webkit-input-placeholder{
    font-size: 12px;
  }
  #mycanvas{
    height: 35px;
    width: 90px;
    float: right;
    cursor: pointer;
  }
  .mycanvasImg{
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
