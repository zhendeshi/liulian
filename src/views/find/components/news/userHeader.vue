<template>
  <div>
    <div class="box flex-c">
      <div class="imgbox g-tipsBox" @click.stop="$linkTo('/Homepage',{uid:item.user.id})">
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
      <div class="middle">
        <div class="f-28">{{item.user.nickname}}</div>
        <slot></slot>
      </div>
      <Gattent v-if="item.is_my==2" :attent="item.is_attent" type="3" :model_id="item.user.id"></Gattent>
      <div v-if="item.is_my==1" class="delBtn flex-c mt-15" @click="delDesc()">删除</div>
    </div>
    <div class="mainbox">
      <div class="desc">
        <span @click.stop="$linkTo('/circleDesc',{id:item.topic.id,type:2,types:2})">#{{item.topic.title}}</span>{{item.desc}}
      </div>
      <!--四张图的样式-->
      <div class="descimgbox four" v-if="item.pic.length==4">
        <div class="imgitem" v-for="(imgItem,index) in item.pic" :key="index">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            radius="8px"
            :src="$formatImg(imgItem)"
            @click="PreviewImg(index,item.pic)"
          />
        </div>
      </div>
      <!--一张图的样式-->
      <div class="descimgbox one" v-if="item.pic.length==1&&item.pic[0]">
        <div class="imgitem" v-for="(imgItem,index) in item.pic" :key="index">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            radius="8px"
            :src="$formatImg(imgItem)"
            @click="PreviewImg(index, item.pic)"
          />
        </div>
      </div>
      <!--六张图的样式  2 3 5 6 都用这个-->
      <div class="descimgbox six" v-if="item.pic.length!=4&&item.pic.length!=1&&item.pic.length!=0">
        <div class="imgitem" v-for="(imgItem,index) in item.pic" :key="index">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            radius="8px"
            :src="$formatImg(imgItem)"
            @click="PreviewImg(index, item.pic)"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {ImagePreview} from 'vant'
  import Gattent from "../../../../components/Gattent";

  export default {
    name: "userHeader",
    props: ['item'],
    components: {Gattent},
    methods: {
      //展示图片
      PreviewImg(current, list, prefix = true) {
        let imglist = list.map(item => this.$formatImg(item))
        if (prefix) {
          ImagePreview({
            images: imglist,
            startPosition: current,
            closeOnPopstate:true
          })
        }
      },
      //删除动态
      delDesc() {
        this.$emit('delAnction')
      }
    }
  }
</script>

<style scoped lang="less">
  .delBtn {
    position: relative;
    width: 50px;
    height: 22px;
    border: 1px solid #eeeeee;
    border-radius: 11px;
    font-size: 10px;
    color: #999999;
  }

  .imgbox {
    width: 40px;
    height: 40px;
    margin-right: 6.5px;
  }

  .middle {
    flex: 1;
  }

  .mainbox {

    font-size: 14px;
    padding-bottom: 11px;

    .desc {
      margin: 6px 0 8px;
      line-height: 1.4;

      span {
        color: #0083D3;
        padding-right: 12px;

      }
    }

    .descimgbox {
      display: flex;
    }

    .four {
      flex-wrap: wrap;
      width: 232px;
      justify-content: space-between;

      .imgitem {
        width: 114px;
        height: 114px;
        margin-bottom: 4px;
      }
    }

    .one {
      width: 351px;
      height: 197px;

      .imgitem {
        width: 100%;
        height: 100%;
      }
    }

    .six {
      flex-wrap: wrap;
      width: 360px;

      .imgitem {
        width: 114px;
        height: 114px;
        margin-bottom: 4px;
        margin-right: 4.5px;
      }
    }
  }

</style>
