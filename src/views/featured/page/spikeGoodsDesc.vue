<template>
  <div class="wrap">
    <div class="imgbox">
      <van-swipe @change="onChange" class="item" >
        <van-swipe-item  v-for="(image, index) in images" :key="index">
          <div class="img">
            <img :src="image" width="375" height="328" fit="center"/>
          </div>
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          <span class="flex-c">{{ current + 1 }}/{{images.length}}</span>
        </div>
      </van-swipe>
    </div>
    <div class="goodsMsg">
      <div class="name">{{goods.title}}</div>
      <div class="desc">{{goods.desc}}</div>
      <div class="other flex-e">
        <label class="f-24 c-ff2">¥</label><b class="f-36 c-ff2 mr-5">{{goods.num}}</b>
        <div class="middle ml-5"><span> ¥{{goods.num}}</span></div>
        <div class="f-24 c-99">已抢{{goods.num}}件</div>
      </div>
      <div class="bottem">购买可得{{goods.num}}金币</div>
    </div>
    <div class="selspecs flex-c"  @click="showSpesc = true">
      <label class="c-99">规格</label>
      <div class="mian one-row-hide">{{specsWord}}</div>
      <span class="iconfont c-99 right">&#xe62d;</span>
    </div>
    <div class="goodsDetails">
      <div class="row">商品详情</div>
      <div class="row"><label>品牌：</label>春雨</div>
      <div class="row"><label>重量：</label>0.358kg</div>
      <div class="row"><label>产地：</label>韩国</div>
      <div class="row"><label>保质期：</label>2年</div>
    </div>
    <div class="goodsDetailsImg">
      <img v-for="item in images" :src="item" width="100%" height="100%" fit="center"/>
    </div>
    <div class="g-footerBtnBox">
      <div class="main flex-c">
        <div class="iconBox">
          <span class="iconfont">&#xe635;</span>
          <div>首页</div>
        </div>
        <div class="iconBox">
          <span class="iconfont">&#xe616;</span>
          <div>收藏</div>
        </div>
        <div class="iconBox">
          <span class="iconfont">&#xe6e6;</span>
          <div>购物车</div>
        </div>
      </div>
      <div class="btn y-btn">加入购物车</div>
      <div class="btn o-btn">立即购买</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "goodsDesc",
    data() {
      return {
        current: 0,
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ],
        goods:{
          title:"春雨面膜 黄色经典版蜂蜜面膜10片/盒",desc:'韩国进口 补水保湿 舒缓滋润 无添加面膜 敏感肌可用',num:'148'
        },
        specsWord:'选择颜色、尺码等规格',
        goodsDetails:{
          name:'春雨'
        },
        showSpesc:true
      }
    },
    methods: {
      onChange(index) {
        this.current = index;
      }
    }
  }
</script>

<style scoped lang="less">
  .wrap{
    padding-bottom: 50px;
    b{
      font-weight: 500;
    }
    .iconfont.right{
      font-size: 20px;
      color: #969799;
    }
    .imgbox{
      background: #ffffff;
      .item{
        font-size: 0;
        .img{
          height: 344px;
        }
        .custom-indicator{
          font-size: 10px;
          padding: 0 12px 15px 0;
          overflow: hidden;
          span{
            width:35px;
            height:16px;
            background:rgba(0,0,0,1);
            opacity:0.4;
            border-radius:8px;
            float: right;
            color: #ffffff;
          }
        }
      }

    }
    .goodsMsg{
      background: #ffffff;
      padding: 12px 12px 21px;

      .name{
        font-weight:bold;
        color:rgba(51,51,51,1);
        font-size: 16px;
      }
      .desc{
        font-size:12px;
        font-weight:500;
        color:rgba(153,153,153,1);
        margin: 12px 0 14.5px;
      }
      .other{
        .middle{
          flex: 1;
          span{
            position: relative;
            color:#999999;
            font-size: 10px;
          }
          span:before{
            position: absolute;
            content: '';
            height: 1px;
            width: 100%;
            background: #999999;
            bottom: 8px;
          }
        }
      }
      .bottem{
        color: #FFB400;
        font-size: 12px;
        margin-top: 12px;
      }
    }
    .selspecs{
      background: #ffffff;
      margin: 12px 0;
      height:44px;
      background:rgba(255,255,255,1);
      padding: 0 12px;

      font-size: 14px;
      .mian{
        flex: 1;
        padding: 0 16px;
      }

    }
    .comment{
      padding: 0 12px;
      background: #ffffff;
      .titbox{
        border-bottom: 1px solid #EEEEEE;
        height: 43px;
        font-size: 14px;
      }
    }
    .goodsDetails{
      margin-top: 12px;
      background: #ffffff;
      padding: 0 12px;
      font-size: 14px;
      .row{
        height: 43px;
        line-height: 43px;
        border-bottom: 1px solid #EEEEEE;
        font-size: 14px;
        label{
          display: inline-block;
          width: 65px;
          color: #999999;
        }
      }
    }
    .g-footerBtnBox{
      .main{
        padding-right: 2px;
      }
      .iconBox{
        flex: 1;
        text-align: center;
        font-size: 11px;
        color: #666666;

        .iconfont{
          font-size: 16px;
          margin-bottom: 5.5px;
          display: inline-block;
        }
      }
    }
    .showSpesc_wrapper{
      position: fixed;
      bottom: 50px;
      width: 100%;
      left: 0px;
    }
  }
</style>
