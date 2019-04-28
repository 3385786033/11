<template>
  <div class="container body">
    <div class="main_container">
      <!--左边导航-->
      <div class="col-md-3 left_col">
        <!--左上头像部分-->
        <div class="left_col scroll-view">
          <div class="navbar nav_title" style="border: 0;">
            <router-link to="/home/dataStat/dataStates" class="site_title"></router-link>
          </div>
          <div class="clearfix"></div>
          <!-- 用户头像信息 -->
          <div class="profile clearfix">
            <div class="pic_img">
              <img src="https://mps.essocial.com.cn/static/image/backend/common/default.png" alt="..." class="img-circle profile_img" style="width: 100%;height: 100%;margin-top: 0">
            </div>
            <div class="profile_info">
              <span>您好！</span>
              <h2 style="max-width:100px;white-space:nowrap;text-overflow:ellipsis;overflow: hidden">{{names}}</h2>
            </div>
          </div>
          <!-- end -->
          <br/>
          <!-- 左边导航列表 -->
          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section"style="margin-bottom: 0px">
              <ul class="nav side-menu">
                <li v-show="jurisdiction.statistics"><router-link to="/home/dataStat/dataStates"><i class="glyphicon glyphicon-signal"></i>数据统计<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/dataStat/dataStates">数据总览</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/dataStat/visitor">访客分析</router-link></li>
                    <li><router-link to="/home/dataStat/userAnalyze">用户分析</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/dataStat/dataAnalyze">数据分析</router-link></li>
                    <li><router-link to="/home/dataStat/userPortrayal">用户画像</router-link></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">访客分析 <i class="tipsa">vip</i></a></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">用户分析 <i class="tipsa">vip</i></a></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.customer"><router-link to="/home/userManage/userManageData"><i class="glyphicon glyphicon-user"></i>用户管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/userManage/userManageData">用户列表</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/userManage/userClass">用户分组</router-link></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">用户分组 <i class="tipsa">vip</i></a></li>
                    <!--<li><router-link to="/home/userManage/addressManage">地址管理</router-link></li>-->
                  </ul>
                </li>
                <li v-show="jurisdiction.product"><router-link to="/home/commodControl/productList"><i class="glyphicon glyphicon-th-large"></i>商品管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/commodControl/productList">商品列表</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/commodControl/setSort">排序设置</router-link></li>
                    <li><router-link to="/home/commodControl/classManage">分类管理</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/Integral/IntegralList">积分商品</router-link></li>
                    <li><router-link to="/home/commodControl/store" v-if="false">店铺设置</router-link></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">排序设置 <i class="tipsa">vip</i></a></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">积分商品 <i class="tipsa">vip</i></a></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.distributor"><router-link to="/home/distribution/distributionList"><i class="glyphicon glyphicon-th-large"></i>微分销<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li v-if="hideLink"><router-link to="/home/distribution/distributionList">分销商列表</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/distribution/setbrokerage">佣金设置</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/distribution/depositList">申请提现</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/distribution/Commission">佣金统计</router-link></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">分销商列表 <i class="tipsa">vip</i></a></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">佣金设置 <i class="tipsa">vip</i></a></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">申请提现 <i class="tipsa">vip</i></a></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">佣金统计 <i class="tipsa">vip</i></a></li>
                  </ul>
                </li>
                <!--<li v-show="true"><router-link to="/home/Integral/IntegralList"><i class="glyphicon glyphicon-th"></i>积分商品<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/Integral/IntegralList">积分商品</router-link></li>
                    &lt;!&ndash;<li><router-link to="/home/Integral/addIntegral">添加积分商品</router-link></li>&ndash;&gt;
                  </ul>
                </li>-->
                <li v-show="jurisdiction.tool"><router-link to=""><i class="glyphicon glyphicon-tags"></i>营销工具<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li v-show="jurisdiction.coupon"><router-link to="/home/marketing/discount_coupon">优惠券</router-link></li>
                    <li v-show="jurisdiction.vip_card"><router-link to="/home/marketing/vip">会员卡</router-link></li>
                    <!--<li><router-link to="/home/marketing/voucher">代金券</router-link></li>-->
                    <li v-show="false"><router-link to="/home/marketing/petCard">储值卡</router-link></li>
                    <li v-show="jurisdiction.seckill"><router-link to="/home/marketing/seckill">秒杀</router-link></li>
                    <li v-show="jurisdiction.collage"><router-link to="/home/marketing/booking">拼团</router-link></li>
                    <li v-show="jurisdiction.turntable"><router-link to="/home/marketing/turntable">大转盘</router-link></li>
                    <li v-show="jurisdiction.golden_egg"><router-link to="/home/marketing/egGfrenzy">砸金蛋</router-link></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.comment"><router-link to="/home/critical/criticalList"><i class="glyphicon glyphicon-comment"></i>评论管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/critical/criticalList">评论管理</router-link></li>
                    <!--<li><router-link to="/home/critical/lookCritical">查看详情</router-link></li>-->
                  </ul>
                </li>
                <li v-show="jurisdiction.slider ">
                  <router-link to="/home/carousel/carouselList">
                    <i class="glyphicon glyphicon-picture"></i>轮播管理<span class="fa fa-chevron-down"></span>
                  </router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/carousel/carouselList">轮播列表</router-link></li>
                    <!--<li><router-link to="/home/carousel/setcarousel">编辑轮播</router-link></li>-->
                  </ul>
                </li>
                <li v-show="jurisdiction.layout"><router-link to="/home/pageManage/pageManageList"><i class="glyphicon glyphicon-duplicate"></i>页面管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/pageManage/pageManageList">页面管理</router-link></li>
                    <!--<li><router-link to="/home/pageManage/setpagemanage">编辑页面</router-link></li>-->
                  </ul>
                </li>
                <!--<li><router-link to="/home/freight/freightList"><i class="glyphicon glyphicon-bed"></i>运费管理<span class="fa fa-chevron-down"></span></router-link>-->
                <!--<ul class="nav child_menu">-->
                <!--<li><router-link to="/home/freight/freightList">运费管理</router-link></li>-->
                <!--<li><router-link to="/home/freight/newstemp">新建运费模板</router-link></li>-->
                <!--</ul>-->
                <!--</li>-->
                <li v-show="jurisdiction.article"><router-link to="/home/articletxt/manageArticles"><i class="glyphicon glyphicon-file"></i>文章管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/articletxt/manageArticles">文章列表</router-link>
                    <li v-if="hideLink"><router-link to="/home/articletxt/classArticletxt">分类管理</router-link></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">分类管理 <i class="tipsa">vip</i></a></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.video"><router-link to="/home/videoManage/videoList"><i class="glyphicon glyphicon-film"></i>视频管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/videoManage/videoList">视频列表</router-link>
                    <li><router-link to="/home/videoManage/classvideo">视频分类</router-link></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.video_demo"><router-link to="/home/showVideo/showVideoList"><i class="glyphicon glyphicon-film"></i>展示视频管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/showVideo/showVideoList">视频列表</router-link></li>
                    <li><router-link to="/home/showVideo/classShowVideo">视频分类</router-link></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.order"><router-link to="/home/orderList/orderEcoms/orderEcom"><i class="glyphicon glyphicon-list-alt"></i>订单管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/orderList/orderEcoms/orderEcom">订单列表</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/orderList/orderEcoms/billDetail">账单明细</router-link></li>
                    <li><router-link to="/home/orderList/orderEcoms/exchange">退换货</router-link></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">账单明细 <i class="tipsa">vip</i></a></li>
                    <!--<li><a href="#level1_2">预约订单</a></li>-->
                  </ul>
                </li>
                <li v-show="jurisdiction.video_order"><router-link to="/home/videOorder/videoOrderList"><i class="glyphicon glyphicon-list-alt"></i>视频订单管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/videOorder/videoOrderList">视频订单列表</router-link></li>
                    <li v-if="hideLink"><router-link to="/home/showVideo/videoOrderDetails">账单明细</router-link></li>
                    <li><router-link to="/home/orderList/orderEcoms/exchange">退换货</router-link></li>
                    <li v-if="showLink"><a href="javascript:;" @click="privilege">账单明细 <i class="tipsa">vip</i></a></li>
                    <!--<li><a href="#level1_2">预约订单</a></li>-->
                  </ul>
                </li>
                <li v-show="jurisdiction.credit_card_integral"><router-link to="/home/credits/creditintegral"><i class="glyphicon glyphicon-list-alt"></i>信用卡积分<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/credits/creditintegral">信用卡积分列表</router-link></li>
                    <!--<li><a href="#level1_2">预约订单</a></li>-->
                  </ul>
                </li>
                <li v-show="jurisdiction.credit_card_apply"><router-link to="/home/credits/cradList"><i class="glyphicon glyphicon-list-alt"></i>信用卡申请<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/credits/cradList">信用卡列表</router-link></li>
                    <!--<li><a href="#level1_2">预约订单</a></li>-->
                  </ul>
                </li>
                <li v-show="false"><router-link to="/home/merchant/merchantList"><i class="glyphicon glyphicon-oil"></i>多商家<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/merchant/merchantList">店铺列表</router-link>
                    <li><router-link to="">订单分析</router-link></li>
                  </ul>
                </li>
                <li v-if="false"><router-link to="/home/bypassId/bypassIdMain"><i class="glyphicon glyphicon-plus"></i>子账号<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/bypassId/bypassIdMain">子账号主页</router-link></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.form">
                  <router-link to="/home/formManage/formList"><i class="glyphicon glyphicon-envelope"></i>表单管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/formManage/formList">表单列表</router-link></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.applet_message">
                  <router-link to="/home/messAge/messageList"><i class="glyphicon glyphicon-envelope"></i>消息管理<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/messAge/messageList">消息列表</router-link></li>
                  </ul>
                </li>
                <li v-show="false"><router-link to="/home/FSend/FSendList"><i class="glyphicon glyphicon-envelope"></i>群发<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/FSend/FSendList" class="a">群发列表</router-link>
                    <li><router-link to="/home/FSend/draft">新建群发</router-link></li>
                  </ul>
                </li>
                <li v-show="jurisdiction.map">
                  <router-link to="/home/Setmap1"><i class="glyphicon glyphicon-map-marker"></i>设置地图<span class="fa fa-chevron-down"></span></router-link>
                  <ul class="nav child_menu">
                    <li><router-link to="/home/Setmap1">设置地图</router-link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <!-- /end -->

        </div>
      </div>
      <!--左边导航 end-->

      <!-- top navigation -->
      <div class="top_nav">
        <div class="nav_menu">
          <nav>
            <div class="nav toggle">
              <a id="menu_toggle">
                <!--<i class="fa fa-bars"></i>-->
              </a>
            </div>
            <ul class="nav navbar-nav navbar-right">
              <li style="float: right;margin-top: 12px">
                <button type="button" class="btn btn-primary"style="float: right;margin-right: 50px" @click="aback"><a href="javascript:;" style="color: #fff">客服登录</a></button>
                <button type="button" class="btn btn-primary"style="float: right;" @click="back"><a href="javascript:;" style="color: #fff">返回官网</a></button>
              </li>
              <li>
                <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false" style="">
                  <span class=" fa" style="white-space:nowrap;display: inline-block;max-width: 70px;text-overflow: ellipsis;overflow: hidden;position: relative;top: 2px;">{{names}}</span><span class=" fa fa-angle-down"></span>
                </a>
                <ul class="dropdown-menu dropdown-usermenu pull-right">
                  <li @click="logout"><a href="javascript:;"><i class="fa fa-sign-out pull-right"></i> 退出登录</a></li>
                </ul>
              </li>
              <li role="presentation" class="dropdown" v-if="true">
                <router-link to="/home/messAge/messageList" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false" >
                  <i class="fa fa-envelope-o"></i>
                  <span class="badge bg-green" v-if="index === '0'?false:true">{{index}}</span>
                </router-link>
                <!--<ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                  <li>
                    <router-link to="/home/messAge/messageList">消息列表</router-link>
                  </li>
                </ul>-->
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- /top navigation -->

      <!-- page content -->
      <div class="right_col" role="main">
        <router-view></router-view>
      </div>
      <!-- /page content -->
      <!-- footer content -->
      <footer>
        <div class="pull-right">
          翼升科技 © 版权所有
          <!--Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>-->
        </div>
        <div class="clearfix"></div>
      </footer>
      <!-- /footer content -->
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data (){
      return {
        names:'',
        urls:'',
        jurisdiction:{
          statistics:'',
          customer:'',
          product:'',
          distributor:'',
          tool:'',
          comment:'',
          slider:'',
          layout:'',
          article:'',
          video:'',
          order:'',
          shop:'',
          user:'',
          credit_card_integral:'',
          credit_card_apply:'',
          groupmessage:'',
          form:'',
          video_demo:'',
          applet_message:'',
          video_order:'',
          map:'',
          seckill:'',
          collage:'',
          vip_card:'',
          turntable:'',
          golden_egg:'',
          coupon:'',
        },
        //消息条数
        index:null,
        //版本权限
        hideLink:false,
        showLink:true,
        versionsType:''
      }
    },
    components: {

    },
    methods: {
      checks(){

      },
      logout(){
        this.$axios.post('/common/logout').then((response)=>{
          window.location.href = response.data.data = response.data.url
        })
      },
      aback(){
        window.open('https://mpkf.weixin.qq.com/')
      },
      back(){
        window.location.href = 'https://mps.essocial.com.cn/'
      },
      privilege(){
        this.$message({
          message: '为方便您的更优体验，请您先升级权限！',
          type: 'warning'
        });
      }
    },
    mounted:function () {
      //console.log(this.$router)
    },
    created(){
      this.$axios.post('/program_permission/index').then((response)=>{
        if(response.data.status === 200){
          this.jurisdiction = response.data.data
        }else {
          window.location.href = response.data.data
        }
      })
      this.$axios.post('/user/getVersion').then((response)=> {
        this.versionsType = response.data.data.version
        if(response.data.status === 200){

        }else {
          window.location.href = 'https://mps.essocial.com.cn/home/login'
        }
        if(this.versionsType === 'base'){
          this.hideLink = false
        }else {
          this.hideLink = true
          this.showLink = false
        }
      })
      this.$axios.post('/program/readName').then((response)=>{
        this.names = response.data.data.name
      })
      this.$axios.post('/applet_message/number').then((response)=>{
        if(response.data.data.length === 0){
          this.index = '0'
        }else {
          this.index = response.data.data
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .navbar nav_title{
    width: 230px;
    height: 50px;
    overflow: hidden;
  }
  .site_title{
    padding: 0;
  }
  .navbar{
    background-image: url("https://mps.essocial.com.cn/static/image/backend/common/logo.png");
    background-position: center;
    background-repeat: no-repeat;
  }
  .right_col{
    padding-top: 60px!important;
  }
  .glyphicon{
    margin-right: 10px;
  }
  .profile{
    overflow: hidden;
  }
  .pic_img{
    height: 100%;
    width: 40%;
    overflow: hidden;
    float: left;
   img{
     margin-left:0 ;
     height: 100px;
     width: 100px;
   }
  }
  .profile_info{
    height: 100%!important;
    width: 55%!important;
    padding-right: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 15px;
    padding-left: 10px;
  }
  .tipsa{
    color: yellow;
    font-size: 10px;
    position: relative;
    top:-5px;
  }
</style>
