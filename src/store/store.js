import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = new Vuex.Store({
  //定义状态
  state: {
    program_id:[],
    optionList: [{
      value: 1,
      label: '电商版'
    }, /*{
      value: 2,
      label: '到店商品'
    }, {
      value: 3,
      label: '外卖商品'
    },{
      value: 4,
      label: '预约商品'
    },*/{
      value: 5,
      label: '分销版'
    }/*,{
      value: 6,
      label: '旅游商品'
    }*/],
    //商品订单刷选
    listOptins: [{
      value: '1',
      label: '电商订单'
    }, {
      value: '2',
      label: '到店订单'
    }, {
      value: '3',
      label: '外卖订单'
    },{
      value: '4',
      label: '预约订单'
    },{
      value: '5',
      label: '分销订单'
    }
    ],
    //订单号筛选
    oerder_code:[{
      label:'订单号',
      value:'订单号'
    },{
      label:'手机号',
      value:'手机号'
    },{
      label:'姓名',
      value:'姓名'
    }
    ],
    // 付款方式
    payment:[{
      label:'微信',
      value:'微信'
    },{
      label:'储值卡',
      value:'储值卡'
    }
    ],
    //订单来源
    source:[{
      label:'总店',
      value:'总店'
    },{
      label:'子店',
      value:'子店'
    }
    ],
    //活动形式
    activity:[{
      label:'会员卡',
      value:'会员卡'
    },{
      label:'积分',
      value:'2'
    },{
      label:'优惠券',
      value:'3'
    },{
      label:'储值卡',
      value:'4'
    },{
      label:'拼团',
      value:'5'
    },{
      label:'折扣券',
      value:'6'
    },{
      label:'满减',
      value:'7'
    },{
      label:'秒杀',
      value:'8'
    }
    ],
    //商品筛选
    screenList:[
      {
        value:'分类',
        label:'分类'
      },
      {
        value:'状态',
        label:'状态'
      }
    ],
    datastates:''
  },
  mutations: {
    getData(state,res){
      state.datastates = res.data.data.version
    }
  },
  actions:{
    getData(content){
      axios.post('/user/getVersion').then((response=>{
        content.commit('getData',response)
      }))
    }
  }
})
export default store
