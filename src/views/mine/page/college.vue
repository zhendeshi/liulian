<template>
  <div class="college">
    <banner :banner="banner"></banner>
    <div class="listbox">
      <template v-for="(item,index) in Help">
        <van-cell :title="item.title" is-link :key="index"
                  @click="$linkTo('/collegeDesc',{id:item.id})"/>
      </template>

    </div>
  </div>
</template>

<script>
  import banner from '../../home/components/banner'
  import axios from "axios";

  export default {
    name: "college",
    components: {banner},
    data() {
      return {
        Help: [],
        banner:'',
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('user/getHelp', {page: 1,type:1}),//学院列表（帮助）
            this.$post('config/banner', {type: 6}),//轮播图
          ]).then(axios.spread((a,b) => {
            this.$toast.clear()
            this.Help = this.$gDataList(a)
            this.banner = this.$gDataList(b)
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          return this.$post('user/getHelp', {page: this.page,type:1}).then(res => {
            if (res.data && res.data.length > 0) {
              this.Help = this.Help.concat(res.data)
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
      },
    }
  }
</script>

<style scoped lang="less">
  .college {
    min-height: 100%;
    background: #ffffff;
    padding: 12px 0;

    .listbox {
      margin-top: 12px;

      /deep/ .van-cell__title {
        display: flex;
        align-items: center;
      }
    }

  }
</style>
