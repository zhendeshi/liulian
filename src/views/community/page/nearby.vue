<template>
  <div class="page-wrap">
    <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no"
            src="https://apis.map.qq.com/tools/geolocation?key=4XMBZ-PEMKX-YUR4H-TJTGE-FSRWK-Q2BVJ&referer=myapp">
    </iframe>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多动态~"
      :offset="100"
      :immediate-check="false"
      @load="getListMore"
      v-if="odata.length>0"
    >
      <dynamic-list type="addr" :odata="odata"></dynamic-list>
    </van-list>
    <div class="nodata flex-c f-28"style="padding-top: 200px" v-else>
      {{msg}}
    </div>
  </div>
</template>

<script>
  import dynamicList from '../../../components/dynamicList'

  export default {
    name: "index",
    components: {dynamicList},
    data(){
      return{
        msg:'',
        odata:'',
        //私有

        loading: false,
        loadMore: true,
        page:2
      }
    },
    mounted() {
      console.log('res')

      this.$toast.loading('正在获取位置')
      let _this=this
      window.onmessage= function (event) {
        if(event.data){
          _this.lng=event.data.lng
          _this.lat=event.data.lat
        }
      };
      setTimeout(function () {
        _this.initPage()
      }, 3000);
    },
    methods:{
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Circle/nearby',{lng:this.lng,lat:this.lat,page:1}).then(res => { //抢购时间段
            this.odata = res.data
            this.msg='附近暂无更多动态哦~'
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Circle/nearby',{lng:this.lng,lat:this.lat,page:this.page}).then(res => { //
            if (res.data && res.data.length > 0) {
              this.odata = this.odata.concat(res.data)
              this.page++
            } else {
              this.loadMore = false
            }
            this.loading = false
          }).catch((res) => {
            this.loadMore = false
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
.page-wrap{
  height: 100%;
}

</style>
