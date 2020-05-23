<template>
  <div class="coteriebox">
    <div class="success" v-if="odata.group_status==2">
      <b class="f-28">拼团成功</b>
      <div class="headerBox flex-tb">
        <div class="imgbox" v-for="(item,index) in groupUser.user">
          <van-image width="100%" height="100%" fit="cover" round :src="$formatImg(item.head_img)"/>
        </div>
      </div>
    </div>
    <div class="failure" v-if="odata.group_status==1">
      <div class="headerBox flex-c">
        <div class="imgbox" v-for="(item,index) in groupUser.user">
          <van-image width="100%" height="100%" fit="cover" round :src="$formatImg(item.head_img)"/>
        </div>
        <div class="imgbox" v-for="item in groupUser.num-groupUser.user.length">
          <van-image width="100%" height="100%" fit="cover" round :src="NOImg"/>
        </div>
      </div>
      <b class="f-28">还差{{groupUser.set_num}}人，赶快邀请好友来拼单吧</b>
      <div class="btn flex-c">邀请好友拼团</div>
      <div class="c-99 flex-c mb-10" @click.stop="protocolShow=true">拼团规则 <span
        class="iconfont icon-dibudaohanglan-"></span></div>
    </div>

    <div class="failure" v-if="odata.group_status==3">
      <div class="headerBox flex-c">
        <div class="imgbox" v-for="(item,index) in groupUser.user">
          <van-image width="100%" height="100%" fit="cover" round :src="$formatImg(item.head_img)"/>
        </div>
        <div class="imgbox" v-for="item in groupUser.num-groupUser.user.length">
          <van-image width="100%" height="100%" fit="cover" round :src="NOImg"/>
        </div>
      </div>
      <b class="f-28">拼团超时，暂无好友参团，请重新开团</b>
      <div class="btn flex-c" @click="group()">重新开团</div>
      <div class="c-99 flex-c mb-10" @click.stop="protocolShow=true">拼团规则 <span
        class="iconfont icon-dibudaohanglan-"></span></div>
    </div>
    <protocol v-model="protocolShow" title="拼团协议" type="5"></protocol>

  </div>
</template>

<script>
  import protocol from '../../../login/components/protocol'

  export default {
    name: "coterie",
    props: ['groupUser', 'odata'],
    components: {
      protocol
    },
    data() {
      return {
        protocolShow: false,
        NOImg: require("../../../../assets/images/mine/headerimg.png")
      }
    },
    methods: {
      group() {
        this.$router.push({path: '/goodsDesc', query: {type: 4,id:this.odata.goods[0].goods_id}})
      }
    }
  }
</script>

<style scoped lang="less">
  .coteriebox {
    width: 351px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin: 0 auto 12px;
    padding: 12px 15px;

    .success {
      .headerBox {
        margin-bottom: 10px;

        .imgbox {
          margin-right: 33px;
          margin-top: 15px;

        }
      }
    }

    .failure {
      text-align: center;

      .headerBox {
        margin-bottom: 18px;

        .imgbox {
          margin: 0 17px;
        }
      }
    }

    .btn {
      width: 180px;
      height: 40px;
      background: rgba(255, 74, 3, 1);
      box-shadow: 0px 3px 4px 0px rgba(255, 74, 3, 0.4);
      border-radius: 20px;
      margin: 19px auto 16px;
      font-size: 17px;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
    }

    .headerBox {
      .imgbox {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .imgbox:first-child {
        position: relative;
      }

      .imgbox:first-child:before {
        position: absolute;
        content: '拼主';
        color: #ffffff;
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 13px;
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 1);
        background-color: #FFB400;
        z-index: 99;
        left: 7px;
        top: 33px;
      }
    }

  }
</style>
