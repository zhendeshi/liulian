<template>
  <div class="comm-wrap">
    <div class="selspecs flex-c" @click="showSpesc = true">
      <label class="c-99">规格</label>
      <div class="mian one-row-hide" v-if="test">选择颜色、尺码等规格</div>
      <div class="mian one-row-hide" v-else>已选：{{goodsSpec.sel}}</div>
      <span class="iconfont c-99 right">&#xe62d;</span>
    </div>
    <van-overlay :show="showSpesc" @click="showSpesc = false" >
      <div class="showSpesc_wrapper" @click.stop>
        <div class="specswrap">
          <span class="iconfont colse" @click="showSpesc = false">&#xe690;</span>
          <div class="msgbox flex">
            <van-image
              width="74px"
              height="74px"
              radius="2px"
              :src="$formatImg(goodsDesc.images[0])"
            />
            <div class="right">
              <div class="name one-row-hide">{{goodsDesc.title}}</div>
              <div class="f-20 c-ff2" v-if="test">¥<b class="f-30">{{$price(goodsDesc.price)}}</b></div>
              <div class="f-20 c-ff2" v-else>¥<b class="f-30">{{$price(_price)}}</b></div>
              <div v-if="test">请选择</div>
              <div v-else>已选：{{goodsSpec.sel}}</div>
            </div>
          </div>
          <div class="sepcsbox" v-for="(item,index) in goodsSpec" :key="index">
            <b class="tit">{{item.title}}</b>
            <div class="selItem">
              <div v-for="(itemb,indexB) in item.spec"
                   :key="indexB"
                   :class="['flex-c',itemb.id == item.selSpecId ? 'active' : '']"
                   @click="_changeSpecs(index,itemb.id,itemb.title)">
                {{itemb.title}}
              </div>
            </div>
          </div>
          <div class="sepcsbox">
            <b class="tit">数量</b>
            <van-stepper v-model="goodsSpec.num" input-width="52px"/>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>

</template>

<script>

  export default {
    name: "selSpecs",
    props: ['goodsDesc', 'value'],
    data() {
      return {
        showSpesc: false,
        goodsSpec: this.value,
        attr: '',
        test: true,//是否有价格
        num: 1,
        _price: -1,
        _goodsId: ''
      }
    },
    methods: {
      _changeSpecs: function (index, id, title) {
        this.goodsSpec[index].selSpecId = id //赋值选中规格的属性id // 没选中的id为-1

        let arr = [];
        this.goodsSpec.forEach(function (item) {
          arr.push(`${item.id}:${item.selSpecId}`);//拼接 规格id:属性id
        });
        this.attr = arr.join(",");

        this.$emit('input', this.goodsSpec)
        if (this.attr.indexOf('-1') < 0) { // 不存在-1  则所有属性的规格都选中完毕
          this.$post('goods/spec_money', {goods_id: this._goodsId, attr: this.attr}).then(res => { //商品信息
            this.test = true
            this.test = false
            this.goodsSpec.attr = res.data.id
            this.goodsSpec.sel = res.data.spec_name
            this._price = res.data.price
            this.$emit('input', this.goodsSpec)
          })
        }
      },
      hideSprcs: function () {
        this.showSpesc = false
      },
      showSprcs: function () {
        this.showSpesc = true
      }
    },
    created() {
      this._goodsId = this.$route.query.id
    }
  }
</script>

<style scoped lang="less">
  .showSpesc_wrapper {
    position: fixed;
    bottom: 50px;
    width: 100%;
    left: 0px;
  }

  .selspecs {
    background: #ffffff;
    margin: 12px 0;
    height: 44px;
    background: rgba(255, 255, 255, 1);
    padding: 0 12px;

    font-size: 14px;

    .mian {
      flex: 1;
      padding: 0 16px;
    }

  }

  .specswrap {
    position: relative;
    background: #ffffff;
    padding: 14.5px 12px;

    .colse {
      position: absolute;
      font-size: 16px;
      color: #999999;
      top: 13px;
      right: 10.5px;
      font-weight: bold;
    }

    .right {
      margin-left: 8px;
      flex: 1;

      .name {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        width: 245px;
      }

      .f-20 {
        margin: 11px 0 26px;
      }
    }

    .sepcsbox {
      margin: 26px 0 0;

      .selItem {
        width: 366px;
        display: flex;

        .flex-c {
          padding: 0 10px;
          min-width: 80px;
          height: 24px;
          border-radius: 2px;
          margin-right: 10px;
          margin-top: 10px;
          border: 1px solid #CCCCCC;
          font-size: 12px;
          font-weight: 500;
          line-height: normal;
        }

        .active {
          background: #FFB400;
          border: 1px solid #FFB400;
          color: #ffffff;
        }
      }

      .tit {
        font-size: 14px;
      }

      /deep/ .van-stepper {
        margin-top: 8px;
      }

      /deep/ .van-stepper__input {
        margin: 0;
        background-color: #ffffff;
        border-top: 1px solid #B3B3B3;
        border-bottom: 1px solid #B3B3B3;
      }

      /deep/ .van-stepper__minus, /deep/ .van-stepper__plus {
        background-color: #ffffff;
        border: 1px solid #B3B3B3;
        width: 37px;
        color: #999999;
        font-weight: bold;
      }

      /deep/ .van-stepper__minus--disabled {
        color: #E0E0E0;
      }

      /deep/ .van-stepper__plus {
        border-radius: 0px 2px 2px 0px;
      }

      /deep/ .van-stepper__minus {
        border-radius: 2px 0px 0px 2px;
      }
    }

  }

</style>
