<template>

</template>
<script>
  import axios from 'axios'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {publicState} from "../../store/mutations";
  import {resPost} from "../../api/base";

  export default {


    //生命周期函数
    created() {
      this.$router.push({
        path: '/liulian'
      })
      //let that = this
      //that.$toast.loading('正在登录')
      //that.setBusinessId('23')

    },
    // computed: {
    //   ...mapState(['businessInfo', 'userInfo', 'systemInfo'])
    // },
    // methods: {
    //   ...mapActions(['loadUserOpenid', 'loadBusinessInfo']),
    //   ...mapMutations(['publicState']),
    //   setBusinessId(id) {
    //     let businessList = [
    //       {
    //         pk_id: '2',
    //         url: 'quanyi.wzgd.net',
    //         userId: '36646',
    //         apiHost: 'https://tripapi.kailly.com',
    //         homePath: '/home',
    //         prodHost: 'http://quanyi.wzgd.net',
    //         imgUrl: 'https://qkl.kailly.com'
    //       },
    //       {
    //         pk_id: '3',
    //         url: 'chaotian.wzgd.net',
    //         userId: '',
    //         apiHost: 'https://tripapi.kailly.com',
    //         homePath: '/chaotian',
    //         prodHost: 'http://chaotian.wzgd.net',
    //         imgUrl: 'https://qkl.kailly.com'
    //       },
    //       {pk_id: '5', url: 'jjh.wzgd.net', userId: '', apiHost: 'https://tripapi.kailly.com', homePath: '/jijinhui'},
    //       {
    //         pk_id: '6',
    //         url: 'zmxy.wzgd.net',
    //         userId: '36671',
    //         apiHost: 'https://tripapi.kailly.com',
    //         homePath: '/xianbohui',
    //         prodHost: 'http://zmxy.wzgd.net',
    //         imgUrl: 'https://qkl.kailly.com'
    //       },
    //       {
    //         pk_id: '7',
    //         url: 'dsgw.wzgd.net',
    //         userId: '',
    //         apiHost: 'https://tripapi.kailly.com',
    //         homePath: '/dishu',
    //         prodHost: 'http://dsgw.wzgd.net',
    //         imgUrl: 'https://qkl.kailly.com'
    //       },
    //       {
    //         pk_id: '9',
    //         url: 'gxjz.wzgd.net',
    //         userId: '',
    //         apiHost: 'https://tripapi.kailly.com',
    //         homePath: '/jinzhuang',
    //         prodHost: 'http://gxjz.wzgd.net',
    //         imgUrl: 'https://qkl.kailly.com'
    //       },
    //       {
    //         pk_id: '13',
    //         url: 'udian.wzgd.net',
    //         userId: '36738',
    //         apiHost: 'https://tripapi.kailly.com',
    //         homePath: '/udian',
    //         prodHost: 'http://udian.wzgd.net',
    //         imgUrl: 'https://qkl.kailly.com'
    //       },
    //       {
    //         pk_id: '9',
    //         url: 'gxjz.wzgd.net',
    //         userId: '',
    //         apiHost: 'https://tripapi.kailly.com',
    //         homePath: '/jinzhuang',
    //         prodHost: 'http://gxjz.wzgd.net',
    //         imgUrl: 'https://qkl.kailly.com'
    //       },
    //       {
    //         pk_id: '23',
    //         url: 'wxtest.kailly.cn',
    //         userId: '34848',
    //         apiHost: 'https://testapi.kailly.com',
    //         homePath: '/juhuasuan',
    //         prodHost: 'http://wxtest.kailly.cn',
    //         imgUrl: 'http://test.kailly.cn'
    //       },
    //     ]
    //     let index = 0
    //     if (process.env.NODE_ENV === 'production') {
    //       let url = window.location.href
    //       index = businessList.findIndex(item => url.indexOf(item.url) > -1)
    //     } else {
    //       index = businessList.findIndex(item => item.pk_id === id)
    //     }
    //     let params = businessList[index]
    //     if (process.env.NODE_ENV === 'development') {
    //       this.publicState({
    //         key: 'userInfo',
    //         value: {pk_id: params.userId}
    //       })
    //     }
    //     this.publicState({
    //       key: 'systemInfo',
    //       value: params
    //     })
    //     this.loadTabList()
    //     this.initPage()
    //   },
    //   checkLogin() {
    //     let token = this.systemInfo && this.systemInfo.pk_id ? this.systemInfo.pk_id : false
    //     let userId = this.userInfo && this.userInfo.pk_id ? this.userInfo.pk_id : false
    //     return userId && token
    //   },
    //   initPage() {
    //     let that = this
    //     let {code} = that.$route.query
    //     let routerParams = localStorage.getItem('routerParams')
    //     if (routerParams) {
    //       routerParams = JSON.parse(routerParams)
    //     } else {
    //       routerParams = {
    //         path: this.systemInfo.homePath,
    //         query: {}
    //       }
    //     }
    //     let superior = 0
    //     if (routerParams.query.superior) {
    //       superior = routerParams.query.superior
    //       if (this.businessInfo.locl_lock_powder === '0') {//如果携带分销商ID，并且当前商户未锁粉
    //         resPost('UpdateUsersAgent', {superior})
    //       }
    //     }
    //     if (code) {
    //       that.loadUserOpenid({code, superior}).then(() => {
    //         localStorage.removeItem('routerParams')
    //         that.$router.push({
    //           path: routerParams.path,
    //           query: routerParams.query
    //         })
    //       })
    //     } else if (that.checkLogin()) {
    //       axios.all([
    //         resPost('GetBusinessInfo'),
    //         resPost('GetUsersInfo')
    //       ]).then(axios.spread((one, two) => {
    //         that.publicState({
    //           key: 'businessInfo',
    //           value: one.data[0]
    //         })
    //         that.publicState({
    //           key: 'userInfo',
    //           value: two.data[0]
    //         })
    //         that.$router.push(that.systemInfo.homePath)
    //       })).catch((res) => {
    //         that.loadBusinessInfo().then(() => {
    //           let appId = that.businessInfo.appid
    //           let redirectUrl = `${that.systemInfo.prodHost}/auth`
    //           let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=back#wechat_redirect`
    //           window.location.href = url
    //         })
    //       })
    //     } else {
    //       that.loadBusinessInfo().then(() => {
    //         let appId = that.businessInfo.appid
    //         let redirectUrl = `${that.systemInfo.prodHost}/auth`
    //         let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=back#wechat_redirect`
    //         window.location.href = url
    //       })
    //     }
    //   },
    //   //加载底部导航
    //   loadTabList() {
    //     resPost('GetWeChatNavNavigationList', {type: 2, pk_id: this.systemInfo.pk_id}).then(res => {
    //       if (res.data && res.data.length > 0) {
    //         this.publicState({
    //           key: 'tabListOne',
    //           value: res.data
    //         })
    //         this.tabList = res.data
    //       }
    //     })
    //   }
    // },
    destroyed() {
      this.$toast.clear()
    }
  };
</script>
