<template>
  <div class="wrap">
    <div class="scollbox">
      <div class="itembox" v-for="(item,index) in listbox" :key="index" >
        <div class="box">
          <div class="imgbox g-tipsBox">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              round
              :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
            />
            <div v-if="item.user.grade_pic" class="g-tips"
                 :style="{backgroundImage: 'url(' + $formatImg(item.user.grade_pic) + ')'}"></div>
          </div>
          <div class="name one-row-hide">{{item.name}}</div>
          <div class="c-99 f-20 pl-10 pr-10 one-row-hide">{{item.desc}}</div>
          <Gattent :attent="item.is_attention" type="1" :model_id="item.id" v-show="followBtn"></Gattent >
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Gattent from "../../../../components/Gattent";
  import {mapState} from 'vuex'

  export default {
    name: "recommend",
    props: ['followBtn','listbox'],
    data() {
      return {

      }
    },
    components:{Gattent},
    computed: {
      ...mapState(['dayStydy'])
    },
    methods: {
      gotoPage() {
        this.$router.push('/active');
      }
    }
  }

</script>

<style scoped lang="less">
  .wrap {
    .scollbox {
      display: flex;
      overflow-x: auto;
      padding: 15px 12px;

      .itembox {
        width: 108px;
        display: inline-block;
        padding-right: 15px;

        .box {
          box-shadow: 0px 0px 12px #eeeeee;
          border-radius: 8px;
          min-height: 117px;
          padding: 10px 0 14.5px;
          flex-wrap: wrap;
          display: flex;
          justify-content: center;

          .imgbox {
            width: 50px;
            height: 50px;
          }

          .name {
            width: 96px;
            font-size: 12px;
            margin: 9.5px 0 8px;
            text-align: center;
            padding: 0 5px;
          }

          .btn {
            width: 50px;
            height: 22px;
            border: 1px solid rgba(255, 180, 0, 1);
            border-radius: 11px;
            margin-top: 10px;
            font-size: 10px;
            color: #FFB400;
          }
        }
      }
    }

  }


</style>
