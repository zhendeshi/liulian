<template>
  <div class="circle-wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多达人~"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <manList :listbox="odata" type="3"></manList>
    </van-list>

  </div>
</template>

<script>
  import manList from '../../../components/manList'

  export default {
    name: "talentPage",
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
          this.$post('Circle/talent', {page: 1,type:2}).then(res => {
            this.odata = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Circle/talent', {page: this.page,type:2}).then(res => {
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
