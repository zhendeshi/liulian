<template>
  <div class="goodsMsg"  @click="$linkTo('/goodsDesc',{integral:true,id:odata.goods_id})">
    <div class="goods">
      <div class="item flex" >
        <div class="imgbox">
          <van-image width="100%" height="100%" fit="cover" radius="8" :src="$formatImg(odata.goods_pic)"/>
        </div>
        <div class="msg fle1">
          <div class="f-28 one-row-hide fw-500 ">{{odata.goods_title}}</div>
          <div class="c-66 mt-24" v-if="odata.spec_name">{{odata.spec_name}}</div>
          <div class="bottom flex-sb flex-e">
            <div class="flex-e c-ff2">
              <span class="f-36 fw-500">{{$price(odata.goods_point)}}</span>金币
            </div>
            <span class="c-66">x{{odata.goods_num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="msgbox">
      <div class="row">
        <label>共{{odata.goods_num}}件商品</label>
        <div>实付：<span class="f-36 c-ff2">{{$price(odata.point)}}</span><span class="f-24 c-ff2">金币</span></div>
      </div>
      <div class="row">
        <label>订单备注</label>
        <div class="one-row-hide remark">{{odata.remark}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "goodsMsgJb",
    props: ['odata','showBtn']
  }
</script>

<style scoped lang="less">
  .goodsMsg {
    width: 351px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin: 0 auto 12px;
    .remark{
      width: 240px;
      text-align: right;
    }
    .goods {
      padding: 0 12px;

      .item {
        padding: 15px 0;
        border-bottom: 1px solid #EEEEEE;

        .imgbox {
          width: 101px;
          height: 101px;
          background: #F3F3F3;
          border-radius: 8px;
          margin-right: 12px;
        }

        .msg {
          position: relative;

          .bottom {
            position: absolute;
            width: 100%;
            bottom: 0;
          }
        }
      }

    }

    .fw-500.f-28 {
      width: 214px;
    }

    .msgbox {
      font-size: 14px;
      padding: 0 12px;

      .row {
        height: 45px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;

        label {
          color: #666666;
        }
      }

      .row:last-child {
        border-bottom: 0;
      }
    }
  }
</style>
