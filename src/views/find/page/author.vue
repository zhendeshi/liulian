<template>
  <div class="wrap">
    <div class="header flex-sb">
      <div class="left flex-tb">
        <van-search
          v-model="searchKey"
          shape="round"
          placeholder="请输入作者名称"
          background="#f5f5f5"
          @search="search"
        />
      </div>
      <div class="right">
        <div class="wIcon-author"></div>
        <div class="mt-5 f-20" @click="$linkTo('/applyAuthor')">申请作者</div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <man-list :listbox="authorList" type="1"></man-list>
    </van-list>
    <div class="authorPop">
      <van-popup v-model="showPop" round>
        <div class="box">
          <div class="imgbox"  @click="$linkTo('/applyAuthor')">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              radius="8"
              :src="authorPop"
            />
          </div>
          <div class="wIcon wIcon-close" @click="showPop=false"></div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import manList from '../../../components/manList'
  import axios from "axios";

  export default {
    name: "author",
    data() {
      return {
        authorPop: require("../../../assets/images/comm/authorPop.png"),
        authorList: '',
        searchKey: '',

        loading: false,
        loadMore: true,
        page: 2,
        showPop:true
      }

    },
    components: {manList},
    created() {
      this.initPage()
    },
    methods: {
      //搜索作者
      search() {
        this.$post('Find/getAuthor', {type: 0, page: 1, key: this.searchKey}).then(res => {
          this.authorList = res.data
        }).catch((res) => {
          console.log(res);
        })
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('Find/getAuthor', {page: 1, type: 0, key: this.searchKey}),//作者
          ]).then(axios.spread((a) => {
            this.authorList = this.$gDataList(a)
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Find/getAuthor', {type: 0, page: this.page, key: this.searchKey}).then(res => {
            if (res.data && res.data.length > 0) {
              this.authorList = this.authorList.concat(res.data)
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
  .wrap {
    padding: 12px;

    .van-search__content {
      background: #FFFFFF;
    }

    .van-search {
      padding: 0;
      width: 100%;
    }

    .header {
      margin-bottom: 15px;

      .left {
        width: 297px;
        font-size: 14px;
      }

      .right {
        text-align: center;
      }
    }


    .authorPop {
      .box {
        overflow: hidden;
        font-size: 0;
        text-align: center;
      }

      .imgbox {
        width: 265px;
        height: 320px;
        border-radius: 8px;
        overflow: hidden;
      }

      .wIcon {
        margin: 40px auto 0;
      }
    }

    .van-popup--center.van-popup--round {
      border-radius: 8px;
    }

    .van-popup {
      background: transparent;
    }
  }
</style>
