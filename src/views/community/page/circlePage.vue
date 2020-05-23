<template>
  <div class="circle-wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <manList :listbox="odata" type="2"></manList>
    </van-list>

  </div>
</template>

<script>
  import manList from '../commponents/manList'

  export default {
    name: "circlePage",
    data() {
      return {
        odata: '',
        //私有
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    components: {manList},
    created() {
      this.initPage()
    },
    methods: {

      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Circle/setCircle', {page: 1,key:''}).then(res => {
            console.log(res.data)
            this.odata = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Circle/setCircle', {page: this.page,key:''}).then(res => {
            console.log(res.data)

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
  .circle-wrap {
    padding: 12px 12px 0;
  }
</style>
