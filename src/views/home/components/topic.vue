<template>
  <div class="wrap" :class="[dayStydy?'dayStydy':'nightStydy']">
    <div class="listbox flex">
      <div class="item" v-for="(item,index) in odata" :key="index"  @click.stop="$linkTo('/circleDesc',{id:item.id,type:2})">
        <div class="imgbox">
          <van-image
            width="100%"
            height="100%"
            radius="8"
            fit="cover"
            :src="$formatImg(item.pic)"
          />
        </div>
        <div class="one-row-hide">#{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "recommend",
    props:['odata'],
    data() {
      return {
        list: [
          {imgUrl: require("../../../assets/images/demo3.png"), title: '#单身狗的一天'},
          {imgUrl: require("../../../assets/images/demo3.png"), title: '#单身狗的一天'},
          {imgUrl: require("../../../assets/images/demo3.png"), title: '#单身狗的一天'},
        ],

      }
    },
    computed: {
      ...mapState(['dayStydy'])
    },
  }

</script>

<style scoped lang="less">
  .wrap {
    .listbox {
      margin-left: 6px;
      .item {
        width: 109px;
        margin: 0 6.25px;
        font-size: 0;
        .imgbox{
          width:109px;
          height:109px
        }
        .one-row-hide {
          font-size: 13px;;
          text-align: center;
          margin-top: 10px;
          width: 109px;
          color: #ffffff;
        }
      }
    }
  }

  .dayStydy {
    .listbox {
      .item {
        div{
          color: #333333!important;
        }
      }
    }
  }
</style>
