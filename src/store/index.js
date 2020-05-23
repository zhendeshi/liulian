import Vue from "vue";
import Vuex from "vuex";
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dayStydy: true,//白天风格
    tabBarVisible:true,
    dataAddress:[],//用户收货地址全部
    tabBarIndex:0,
    UserInfo:{},//用户信息
    UserOrder:{},//用户订单信息
    UserOrderID:{},//用户订单ID
    UserAddrId:null,//用户收货地址Id
    historyList:[],//历史搜索

  },
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
});
