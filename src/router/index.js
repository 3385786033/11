import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/homepage'
//数据总览
import dataStat from '@/components/dataStat'
import dataStates from '@/components/StatisData/dataStates'
import userAnalyze from '@/components/StatisData/userAnalyze'
import visitor from '@/components/StatisData/visitor'
import dataAnalyze from '@/components/StatisData/dataAnalyze'
import userPortrayal from '@/components/StatisData/userPortrayal'
//用户管理
import userManage from '@/components/userManage'
import userClass from '@/components/userManages/userClass'
import userDetails from '@/components/userManages/userDetails'
import userManageData from '@/components/userManages/userManageData'
import addUserClass from '@/components/userManages/addUserClass'
import editUserClass from '@/components/userManages/editUserClass'
// 商品管理
import commodControl from '@/components/commodControl'
import classManage from '@/components/productManage/classManage'
import productList from '@/components/productManage/productList'
//微分销
import distributions from '@/components/distribution/distributions'
import distributionList from '@/components/distribution/distributionList'
import setbrokerage from '@/components/distribution/setbrokerage'
import depositList from '@/components/distribution/depositList'
import Commission from '@/components/distribution/Commission'
//排序
import setSort from '@/components/productManage/setSort'
//添加外卖
import takeOut from '@/components/productManage/takeOut'
import addTack from '@/components/productManage/addTack'
//添加到店
import addArrival from '@/components/productManage/addArrival'
import editArrival from '@/components/productManage/editArrival'
// 添加商品
import addCommod from '@/components/productManage/addCommod'
import editCommod from '@/components/productManage/editCommod'
//添加预约商品
import addSubscribe from '@/components/productManage/addSubscribe'
import editSubscribe from '@/components/productManage/editSubscribe'
//添加分销
import distributionsystem from '@/components/productManage/distributionsystem'
import editDistributionsys from '@/components/productManage/editDistributionsys'
//旅游添加
import travel from '@/components/productManage/travel'
import editTravel from '@/components/productManage/editTravel'
//添加分类
import addClass from '@/components/productManage/addclass'
//编辑分类
import editClass from '@/components/productManage/editClass'
// 店铺管理
import store from '@/components/productManage/store'
// 积分管理
import Integral from '@/components/Integral'
import IntegralList from '@/components/subseries/IntegralList'
import addIntegral from '@/components/subseries/addIntegral'
// 营销工具
import discount_coupon from '@/components/makeTool/discount_coupon'
import marketing from "@/components/marketing"
import vip from '@/components/makeTool/vip'
import addvip from '@/components/makeTool/addvip'
import editVip from '@/components/makeTool/editVip'
import voucher from '@/components/makeTool/voucher'
import addVoucher from '@/components/makeTool/addVoucher'
import eidtVoucher from '@/components/makeTool/eidtVoucher'
import convert from '@/components/makeTool/convert'
import addconvert from '@/components/makeTool/addconvert'
import editConvert from '@/components/makeTool/editConvert'
import petCard from '@/components/makeTool/petCard'
import recharge from '@/components/makeTool/recharge'
import setStoredCard from '@/components/makeTool/setStoredCard'
import booking from '@/components/makeTool/booking'
import addBooking from '@/components/makeTool/addBooking'
import editBooking from '@/components/makeTool/editBooking'
import discount from '@/components/makeTool/discount'
import addDiscount from '@/components/makeTool/addDiscount'
import editDiscount from '@/components/makeTool/editDiscount'
import MoneyOff from '@/components/makeTool/MoneyOff'
import editMoneyoff from '@/components/makeTool/editMoneyoff'
import seckill from '@/components/makeTool/seckill'
import addSeckill from '@/components/makeTool/addSeckill'
import editSeckill from '@/components/makeTool/editSeckill'
import egGfrenzy from '@/components/makeTool/egGfrenzy'
import setegGfrenzy from '@/components/makeTool/setegGfrenzy'
import turntable from '@/components/makeTool/turntable'
import setTurntable from '@/components/makeTool/setTurntable'
import redPacket from '@/components/makeTool/redPacket'
import editRedPacket from '@/components/makeTool/editRedPacket'
//评论管理
import critical from '@/components/critical'
import criticalList from "@/components/CommentModule/criticalList"
import lookCritical from '@/components/CommentModule/lookCritical'
//轮播管理
import carousel from '@/components/carousel'
import carouselList from '@/components/CarouselModule/carouselList'
import setcarousel from '@/components/CarouselModule/setcarousel'
//页面管理
import pageManage from '@/components/pageManage'
import pageManageList from '@/components/PageModule/pageManageList'
import setpagemanage from '@/components/PageModule/setpagemanage'
//运费管理
import freight  from '@/components/freight'
import freightList from '@/components/subseries/freightList'
import newstemp from '@/components/subseries/newstemp'
//文章管理
import articletxt from '@/components/articletxt'
import manageArticles from '@/components/ArticleModule/manageArticles'
import newArticletxt from '@/components/ArticleModule/newArticletxt'
import addnewArticle from '@/components/ArticleModule/addnewArticle'
import classArticletxt from '@/components/ArticleModule/classArticletxt'
import addclassArticletxt from '@/components/ArticleModule/addclassArticletxt'
//商品视频
import videoManage from '@/components/videoManage'
import videoList from '@/components/videoModule/videoList'
import addvideo from '@/components/videoModule/addvideo'
import editVideo from '@/components/videoModule/editVideo'
import classvideo from '@/components/videoModule/classvideo'
import addclassvideo from '@/components/videoModule/addclassvideo'
import editclassvideo from '@/components/videoModule/editclassvideo'
//订单视频
import videOorder from '@/components/videOorder'
import videoOrderList from '@/components/videoOrder/videoOrderList'
import videoOrderInfo from '@/components/videoOrder/videoOrderInfo'
import videoOrderDetails from "@/components/videoOrder/videoOrderDetails"
//展示视频
import showVideo from '@/components/showVideo'
import showVideoList from '@/components/showVideoModule/showVideoList'
import addShowVideo from '@/components/showVideoModule/addShowVideo'
import editShowVideo from '@/components/showVideoModule/editShowVideo'
import classShowVideo from '@/components/showVideoModule/classShowVideo'
import addClassVideo from '@/components/showVideoModule/addClassVideo'
import editClassShowVideo from '@/components/showVideoModule/editClassShowVideo'
//多商家
import merchant from '@/components/merchant'
import merchantList from '@/components/subseries/merchantList'
import addMerchant from '@/components/subseries/addMerchant'

/*订单管理*/
import orderList from '@/components/orderList'
import orderEcom from '@/components/orderEcoms/orderEcom'
import orderDetails from '@/components/orderEcoms/orderDetails'
import makeOerder from '@/components/orderEcoms/makeOerder'

//电商
import Ecommerce from '@/components/orderEcoms/Ecommerce'
//分销
import distribution from '@/components/orderEcoms/distribution'
//到店
import Arrival from '@/components/orderEcoms/Arrival'
//外卖
import takeOuts from '@/components/orderEcoms/takeOuts'
//退换货
import billDetail from '@/components/orderEcoms/billDetail'
import exchange from '@/components/orderEcoms/exchange'
import exchesDetali from '@/components/orderEcoms/exchesDetali'
import statistics from '@/components/subseries/statistics'
//旅游
import travelOrder from '@/components/orderEcoms/travelOrder'
// 拼团
import bookingInfo from '@/components/orderEcoms/bookingInfo'
//秒杀
import seckillInfo from '@/components/orderEcoms/seckillInfo'
/*end*/
//群发
import FSend from '@/components/FSend'
import FSendList from '@/components/subseries/FSendList'
import draft from '@/components/subseries/draft'
//子账号
import bypassId from '@/components/bypassId'
import bypassIdMain from '@/components/subseries/bypassIdMain'
//表单管理
import formManage from '@/components/formManage'
import formManageList from '@/components/formRegulate/formManageList'
import formList from '@/components/formRegulate/formList'
//信用卡
import credits from '@/components/credit/credits'
import cradList from '@/components/credit/cradList'
import creditintegral from '@/components/credit/creditintegral'
import applyCradInfo from '@/components/credit/applyCradInfo'
import IntegralInfo from '@/components/credit/IntegralInfo'
//消息中心
import messAge from '@/components/messAge'
import messageList from '@/components/message/messageList'
import messageInfo from '@/components/message/messageInfo'
//设置地图
import setTenxMap from '@/components/setTenxMap'
import Setmap1 from '@/components/Setmap1'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home/dataStat/dataStates'},
    { path: '/home', name: 'homepage', component: Homepage,
      children: [
        //数据统计
        {path: '/home/dataStat', component: dataStat,
          children: [
            {path: '/home/dataStat/dataStates',component: dataStates},
            {path: '/home/dataStat/userAnalyze',component: userAnalyze},
            {path: '/home/dataStat/visitor',component: visitor},
            {path: '/home/dataStat/dataAnalyze',component: dataAnalyze},
            {path: '/home/dataStat/userPortrayal',component: userPortrayal}
          ]
        },
        //用户管理
        {path: '/home/userManage', component: userManage,
          children: [
            {path: '/home/userManage/userClass',component: userClass},
            {name:'userDetails' , path:'/home/userManage/userDetails', component:userDetails},
            {path: '/home/userManage/userManageData',component: userManageData},
            {name:'addUserClass' , path:'/home/userManage/addUserClass', component:addUserClass},
            {name:'editUserClass' , path:'/home/userManage/editUserClass', component:editUserClass}
          ]
        },
        //商品管理
        {path: '/home/commodControl', component: commodControl,
          children: [
            {path: '/home/commodControl/classManage',component: classManage},
            {path: '/home/commodControl/productList',component: productList},
            //添加到店
            {name:'addArrival', path: '/home/commodControl/addArrival',component: addArrival},
            {name:'editArrival', path: '/home/commodControl/editArrival',component: editArrival},
            //添加排序
            {path: '/home/commodControl/setSort',component: setSort},
            //外卖
            {name:'takeOut',path: '/home/commodControl/takeOut',component: takeOut},
            //添加外卖
            {name:'addTack',path: '/home/commodControl/addTack',component: addTack},
            //预约
            {name:'addCommod',path: '/home/commodControl/addCommod',component: addCommod},
            {name:'editCommod',path: '/home/commodControl/editCommod',component: editCommod},
            //添加预约商品  addSubscribe
            {name:'addSubscribe',path: '/home/commodControl/addSubscribe',component: addSubscribe},
            {name:'editSubscribe',path: '/home/commodControl/editSubscribe',component: editSubscribe},
            {name:'addClass',path: '/home/commodControl/addClass',component: addClass},
            {name:'editClass',path: '/home/commodControl/editClass',component: editClass},
            {path: '/home/commodControl/store',component: store},
            //分销
            {name:'distributionsystem',path: '/home/commodControl/distributionsystem',component: distributionsystem},
            {name:'editDistributionsys',path: '/home/commodControl/editDistributionsys',component: editDistributionsys},
            //旅游
            {name:'travel',path: '/home/commodControl/travel',component: travel},
            {name:'editTravel',path: '/home/commodControl/editTravel',component: editTravel},
          ]
        },
        //微分销
        {path: '/home/distribution', component: distributions,
          children: [
            {path: '/home/distribution/distributionList', component: distributionList},
            {path: '/home/distribution/setbrokerage', component: setbrokerage},
            {path: '/home/distribution/depositList', component: depositList},
            {path: '/home/distribution/Commission', component: Commission}
          ]
        },
        //积分管理
        {path: '/home/Integral', component: Integral,
          children: [
            {path: '/home/Integral/IntegralList', component: IntegralList},
            {path: '/home/Integral/addIntegral', component: addIntegral}
          ]
        },
        //营销工具
        {path: '/home/marketing', component: marketing,
          children: [
            {name:'discount_coupon',path:'/home/marketing/discount_coupon',component:discount_coupon},
            {path: '/home/marketing/vip',component: vip},
            {name:'addvip', path: '/home/marketing/addvip',component: addvip},
            {name:'editVip', path: '/home/marketing/editVip',component: editVip},
            {path: '/home/marketing/voucher',component: voucher},
            {path: '/home/marketing/addVoucher',component: addVoucher},
            {name:'eidtVoucher',path: '/home/marketing/eidtVoucher',component: eidtVoucher},
            {path: '/home/marketing/convert',component: convert},
            {path: '/home/marketing/addconvert',component: addconvert},
            {name:'editConvert',path: '/home/marketing/editConvert',component: editConvert},
            {path: '/home/marketing/petCard',component: petCard},
            {path: '/home/marketing/recharge',component: recharge},
            {path: '/home/marketing/setStoredCard',component: setStoredCard},
            {path: '/home/marketing/booking',component: booking},
            {name:'addBooking', path: '/home/marketing/addBooking',component: addBooking},
            {name:'editBooking', path: '/home/marketing/editBooking',component: editBooking},
            {path: '/home/marketing/discount',component: discount},
            {path: '/home/marketing/addDiscount',component: addDiscount},
            {name:'editDiscount',path:'/home/marketing/editDiscount',component: editDiscount},
            {path: '/home/marketing/MoneyOff',component: MoneyOff},
            {name:'editMoneyoff',path: '/home/marketing/editMoneyoff',component: editMoneyoff},
            {path: '/home/marketing/seckill',component: seckill},
            {path: '/home/marketing/addSeckill',component: addSeckill},
            {name:'editSeckill',path: '/home/marketing/editSeckill',component: editSeckill},
            {name:'egGfrenzy',path: '/home/marketing/egGfrenzy',component: egGfrenzy},
            {name:'setegGfrenzy',path: '/home/marketing/setegGfrenzy',component: setegGfrenzy},
            {name:'turntable',path: '/home/marketing/turntable',component: turntable},
            {name:'setTurntable',path: '/home/marketing/setTurntable',component: setTurntable},
            {name:'redPacket',path: '/home/marketing/redPacket',component: redPacket},
            {name:'editRedPacket',path: '/home/marketing/editRedPacket',component: editRedPacket},
          ]
        },
        //评论管理
        {path: '/home/critical', component: critical,
          children:[
            { path:'/home/critical/criticalList',component: criticalList },
            {name:'lookCritical', path:'/home/critical/lookCritical',component: lookCritical }
          ]
        },
        //轮播管理
        {path: '/home/carousel', component: carousel,
          children:[
            { path:'/home/carousel/carouselList',component: carouselList },
            { name:'setcarousel', path:'/home/carousel/setcarousel',component: setcarousel }
          ]
        },
        //页面管理
        {path: '/home/pageManage', component: pageManage,
          children:[
            { path:'/home/pageManage/pageManageList',component: pageManageList },
            { name:'setpagemanage', path:'/home/pageManage/setpagemanage',component: setpagemanage }
          ]
        },
        {path: '/home/freight', component: freight,
          children:[
            { path:'/home/freight/freightList',component: freightList },
            { path:'/home/freight/newstemp',component: newstemp }
          ]
        },
        //文章管理
        {path: '/home/articletxt', component: articletxt,
          children:[
            { path:'/home/articletxt/manageArticles',component: manageArticles },
            {name:'newArticletxt', path:'/home/articletxt/newArticletxt',component: newArticletxt },
            { path:'/home/articletxt/classArticletxt',component: classArticletxt },
            {name:'addclassArticletxt', path:'/home/articletxt/addclassArticletxt',component: addclassArticletxt },
            {name:'addnewArticle', path:'/home/articletxt/addnewArticle',component: addnewArticle },
          ]
        },
        //视频管理
        {path: '/home/videoManage', component: videoManage,
          children:[
            { path:'/home/videoManage/videoList',component: videoList },
            {name:'addvideo', path:'/home/videoManage/addvideo',component: addvideo },
            {name:'classvideo', path:'/home/videoManage/classvideo',component: classvideo },
            {name:'addclassvideo', path:'/home/videoManage/addclassvideo',component: addclassvideo },
            {name:'editclassvideo', path:'/home/videoManage/editclassvideo',component: editclassvideo },
            {name:'editVideo', path:'/home/videoManage/editVideo',component: editVideo },
          ]
        },
        //展示视频
        {path: '/home/showVideo', component: showVideo,
          children:[
            { path:'/home/showVideo/showVideoList',component: showVideoList},
            {name:'addShowVideo', path:'/home/showVideo/addShowVideo',component: addShowVideo },
            {name:'videoOrderList', path:'/home/showVideo/addShowVideo',component: videoOrderList },
            {name:'classShowVideo', path:'/home/showVideo/classShowVideo',component: classShowVideo },
            {name:'editShowVideo', path:'/home/showVideo/editShowVideo',component: editShowVideo },
            {name:'addClassVideo', path:'/home/showVideo/addClassVideo',component: addClassVideo },
            {name:'editClassShowVideo', path:'/home/showVideo/editClassShowVideo',component: editClassShowVideo },
          ]
        },
        //订单视频
        {
          path:'/home/videOorder',component: videOorder,
          children:[
            { path:'/home/videOorder/videoOrderList',component: videoOrderList },
            {name:'videoOrderInfo', path:'/home/videOorder/videoOrderInfo',component: videoOrderInfo },
            {name:'videoOrderDetails', path:'/home/showVideo/videoOrderDetails',component: videoOrderDetails},
            {name:'editShowVideo', path:'/home/showVideo/editShowVideo',component: editShowVideo },
            {name:'addClassVideo', path:'/home/showVideo/addClassVideo',component: addClassVideo },
            {name:'editClassShowVideo', path:'/home/showVideo/editClassShowVideo',component: editClassShowVideo },
          ]
        },
        //多商家
        {path: '/home/merchant', component: merchant,
          children:[
            { path:'/home/merchant/merchantList',component: merchantList },
            { path:'/home/merchant/addMerchant',component: addMerchant }
          ]
        },
        //子账号
        //订单管理
        {path: '/home/orderList', component: orderList,
          children:[
            { path:'/home/orderList/orderEcoms/orderEcom',component: orderEcom },
            {name:'orderDetails', path:'/home/orderList/orderEcoms/orderDetails',component: orderDetails },
            {name:'makeOerder', path:'/home/orderList/orderEcoms/makeOerder',component: makeOerder },
            {name:'Ecommerce', path:'/home/orderList/orderEcoms/Ecommerce',component: Ecommerce },
            {name:'distribution', path:'/home/orderList/orderEcoms/distribution',component: distribution },
            {name:'Arrival', path:'/home/orderList/orderEcoms/Arrival',component: Arrival },
            {name:'takeOuts', path:'/home/orderList/orderEcoms/takeOuts',component: takeOuts },
            {name:'exchesDetali', path:'/home/orderList/orderEcoms/exchesDetali',component: exchesDetali },
            { path:'/home/orderList/orderEcoms/billDetail',component: billDetail },
            { path:'/home/orderList/orderEcoms/exchange',component: exchange },
            { path:'/home/orderList/statistics',component: statistics },
            {name:'travelOrder', path:'/home/orderList/orderEcoms/travelOrder',component: travelOrder },
            {name:'bookingInfo', path:'/home/orderList/orderEcoms/bookingInfo',component: bookingInfo },
            {name:'seckillInfo', path:'/home/orderList/orderEcoms/seckillInfo',component: seckillInfo },
          ]
        },
        //群发
        {path: '/home/FSend', component: FSend,
          children:[
            { path:'/home/FSend/FSendList',component: FSendList },
            { path:'/home/FSend/draft',component: draft }
          ]
        },

        {path: '/home/bypassId', component: bypassId,
          children:[
            { path:'/home/bypassId/bypassIdMain',component: bypassIdMain }
          ]
        },
        //表单管理
        {path: '/home/formManage', component: formManage,
          children:[
            {name:'formManageList', path:'/home/formManage/formManageList',component: formManageList },
            { path:'/home/formManage/formList',component: formList }
          ]
        },
        {path: '/home/credits', component: credits,
          children: [
            {path: '/home/credits/cradList', component: cradList},
            {name:'creditintegral',path: '/home/credits/creditintegral', component: creditintegral},
            {name:'applyCradInfo',path: '/home/credits/applyCradInfo', component: applyCradInfo},
            {name:'IntegralInfo',path: '/home/credits/IntegralInfo', component: IntegralInfo}
          ]
        },
        //地图
        {
          path: '/home/Setmap1', component: Setmap1
        },
        //消息中心
        {
          path:'/home/messAge',component:messAge,
          children:[
            {name:'messageList', path:'/home/messAge/messageList',component: messageList},
            {name:'messageInfo', path:'/home/messAge/messageInfo',component: messageInfo}
          ]
        },
        ]
    }
  ]
})
