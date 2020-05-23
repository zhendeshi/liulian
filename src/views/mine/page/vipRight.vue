<template>
  <div class="page-wrap" v-if="UserGrade">
    <div class="nav flex-sb">
      <div class="item flex-c" v-for="(item,index) in navWord" :class="[navIndex == index ? 'active' : '']"
           @click="navIndex=index">
        {{item}}
      </div>
    </div>
    <img :src="$formatImg(UserGrade[navIndex].desc)" class="mianImg"/>
    <div class="bottom">
      <div class="tit flex-c">
        <span v-if="navIndex==0">购买以下产品，立即升级VIP</span>
        <span v-else>会员规则</span>
      </div>

      <div class="mian" v-if="navIndex==0">
        <van-list
          v-model="loading"
          :finished="!loadMore"
          finished-text="没有更多了"
          :offset="0"
          :immediate-check="false"
          @load="getListMore"
        >
          <div class="item" v-for="(item,index) in UserGoods" :key="index"
               @click="$linkTo('/goodsDesc',{type:1,id:item.id})">
            <div class="imgbox">
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                radius="8"
                :src="$formatImg(item.pic)"
              />
            </div>
            <div class="msg">
              <div class="name two-row-hide">{{item.title}}</div>
              <div class="c-99 one-row-hide">{{item.old_title}}</div>
              <div class="bottom flex-e">
                <span class="f-36"><label class="f-24">¥</label><span
                  class="fw-500">{{$price(item.price)}}</span></span>
                <div class="old fle1 c-99"><span>¥ {{$price(item.old_price)}}</span></div>
                <div class="btn g-btna flex-c">立即购买</div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="mian" v-else>
        <div class="desc" v-html="UserGrade[navIndex].rule">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "vipRight",
    components: {},
    data() {
      return {
        navIndex: 0,
        navWord: ['铂金会员', '钻石会员', '黑金会员',],
        UserGrade: '',
        UserGoods: [],
        loading: false,
        loadMore: true,
        page: 2,
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('user/getUserGrade').then(res => { //商品信息
            this.UserGrade = res.data
            return this.$post('user/getUserGoods')
          }).then(res => {
            this.$toast.clear()
            this.UserGoods = res.data

          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          return this.$post('user/getUserGoods', {page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.UserGoods = this.UserGoods.concat(res.data)
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
  .page-wrap {
    min-height: 100%;
    background: #000;
    padding-bottom: 10px;
  }

  .nav {
    padding: 15px 36px 0px;

    .item {
      width: 70px;
      height: 28px;
      background: rgba(43, 41, 41, 1);
      border-radius: 5px;
      font-size: 14px;
      font-weight: 500;
      color: #999999;
    }

    .active {
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }

  .mianImg {
    width: 100%;
  }

  .bottom {
    .tit {
      width: 303px;
      height: 40px;
      background: rgba(226, 197, 131, 1);
      border-radius: 10px 10px 0 0;
      margin: 15px auto 0;
      font-size: 16px;
      font-weight: bold;
      color: #6A4515;
    }

    .mian {
      width: 351px;
      background: linear-gradient(-45deg, rgba(45, 43, 44, 1), rgba(21, 20, 16, 1));
      border-radius: 10px;
      margin: 0 auto;
      padding: 0 12px;

      .desc {
        font-size: 14px;
        font-weight: 500;
        color: rgba(230, 211, 169, 1);
        line-height: 21px;
        padding: 10px 0;
      }

      .item:last-child {
        border-bottom: none;
      }

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #333333;

        .imgbox {
          width: 101px;
          height: 101px;
          background: transparent;
          border-radius: 8px;
        }

        .msg {
          width: 210px;
          color: #ffffff;
          position: relative;
          height: 100px;

          .bottom {
            position: absolute;
            width: 100%;
            bottom: 0;

            .g-btna {
              background: linear-gradient(-34deg, rgba(231, 213, 175, 1), rgba(227, 199, 124, 1));
              color: #6A4515;
            }

            .f-36 {
              color: #E6D3A9;
            }

            .old {
              margin-bottom: 2px;
              margin-left: 5px;

              span {
                position: relative;
              }

              span:before {
                position: absolute;
                content: '';
                height: 1px;
                width: 100%;
                bottom: 5px;
                background: #999999;
              }
            }
          }

          .name {
            font-size: 14px;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 20px;
            margin-bottom: 8.5px;
          }
        }
      }
    }
  }
</style>
