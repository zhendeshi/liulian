<template>
  <div>
    <div class="item" v-for="(item,index) in odata" :key="index">
      <div class="header flex-c">
        <div class="imgbox">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            round
            :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
          />
        </div>

        <div class="middle">
          <div class="name">{{item.user.nickname}}</div>
          <div class="time">{{item.add_time}}</div>
        </div>
        <div class="score flex-c">
          <div v-for="item in item.score"></div>
        </div>
      </div>
      <div class="desc one-row-hide">
        {{item.desc}}
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "comment",
    props: ['odata'],
    data() {
      return {}
    },

  }
</script>

<style scoped lang="less">
  .item:last-child{
    border-bottom: none;
  }
  .item:first-child{
    border-top: 1px solid #EEEEEE;
  }
  .item {
    padding: 15px 0;
    border-bottom: 1px solid #EEEEEE;

    .imgbox {
      width: 38px;
      height: 38px;
    }

    .middle {
      flex: 1;
      margin-left: 12px;

      .name {
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 7.5px;
      }

      .time {
        font-size: 10px;
        color: #999999;
      }
    }

    .score {
      div {
        width: 12.5px;
        height: 12px;
        background-image: url("../../../../assets/images/comm/star.png");
        background-size: 100%;
        margin-left: 5px;
      }
    }

    .desc {
      margin-top: 12px;
      font-size: 12px;
    }
  }
</style>
