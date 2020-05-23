<template>
  <div class="wrap" :class="[dayStydy?'dayStydy':'nightStydy']">
    <div class="scollbox">
      <div class="itembox" v-for="(item,index) in odata" :key="index" @click="$linkTo('/activeDesc',{id:item.id})">
        <div class="imgbox">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            radius="8"
            :src="$formatImg(item.pic)"
          />
          <div class="mask flex-tb">
            <span class="lin_n">活动截止时间</span>
            <van-count-down :time="item.endtime" v-if="item.endtime<86400">
              <template v-slot="timeData">
                <div class="time flex-sb">
                  <span class="item">{{ timeData.minutes }}</span>:
                  <span class="item">{{ timeData.seconds }}</span>
                </div>
              </template>
            </van-count-down>
            <div v-else class="ml-5 lin_n">
              {{$nTime(item.sign_end_time)}}
            </div>
          </div>
        </div>
        <div class="name one-row-hide">{{item.title}}</div>
        <div class="other flex-sb">
          <div class="num f-22">
            <span class="f-30">{{item.set_num}}</span>人参与
          </div>
          <div class="btn flex-c" v-if="item.start_name.code==2">去参与</div>
          <div class="btnb flex-c" v-else>{{item.start_name.msg}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "recommend",
    props: ['odata'],
    data() {
      return {}
    },
    computed: {
      ...mapState(['dayStydy'])
    },
    methods: {}
  }

</script>

<style scoped lang="less">
  .wrap {
    .scollbox {
      display: flex;
      overflow-x: auto;

      .itembox {
        width: 265px;
        display: inline-block;
        padding-right: 15px;
      }
    }

    .imgbox {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      font-size: 0px;
      width: 250px;
      height: 136px;
      overflow: hidden;

      .mask {
        position: absolute;
        width: 250px;
        height: 25px;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        padding: 0 12px;
        color: #ffffff;
        font-size: 12px;
        display: flex;
        align-items: center;

        .time {
          color: #ffffff;
          margin-left: 2px;

          .item {
            width: 22px;
            height: 15px;
            background: rgba(255, 180, 0, 1);
            border-radius: 2px;
            line-height: normal;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            margin: 0 6px;
          }
        }
      }
    }

    .name {
      width: 250px;
      font-size: 13px;

      margin: 10px 0;
    }

    .other {
      .f-30 {
        color: #FFB400;
        margin-right: 5.5px;
      }

      .btn {
        width: 55px;
        height: 20px;
        background: linear-gradient(90deg, rgba(255, 201, 52, 1), rgba(255, 180, 0, 1));
        border-radius: 10px;
        font-size: 12px;
        color: #ffffff;
        line-height: normal;
      }

      .btnb {
        min-width: 55px;
        padding: 0 10px;
        height: 20px;
        background: #EEEEEE;
        border-radius: 10px;
        font-size: 12px;
        color: #ffffff;
        line-height: normal;
      }
    }
  }

  .dayStydy {
    .name {
      color: #333333;
    }
  }
</style>
