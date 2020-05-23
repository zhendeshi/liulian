<template>
  <div class="postNews-page">
    <textarea v-model="content" placeholder="这一刻的想法..."></textarea>
    <div class="uploaderImg">
      <van-uploader
        v-model="fileList"
        :max-count="6"
        :after-read="onImgRead"
        @delete="delImg"
      />
    </div>
    <div class="bottom">
      <div class="item" @click="$linkTo('/postNewsTopic')">
        <span>{{topicWord||"添加话题"}}</span>
        <div>
          <span class="iconfont">&#xe62d;</span>
        </div>
      </div>
      <div class="item" @click="showMap=true">
        <span>{{address||"添加定位"}}</span>
        <div>
          <span class="iconfont">&#xe62d;</span>
        </div>
      </div>
      <div class="item" @click="$linkTo('/postNewsCircle')">
        <span>{{CirCleWord||"添加圈子"}}</span>
        <div>
          <span class="iconfont">&#xe62d;</span>
        </div>
      </div>
    </div>
    <div class="btnbox">
      <div class="g-btn-ff4" @click="publish()">发布</div>
    </div>
    <van-popup
      v-model="showMap"
      position="right"
      :style="{height: '100%',width:'100%'}"
    >
      <iframe id="mapPage" width="100%" height="100%" frameborder=0
              src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=4XMBZ-PEMKX-YUR4H-TJTGE-FSRWK-Q2BVJ&referer=myapp">
      </iframe>

    </van-popup>
  </div>

</template>

<script>
  export default {
    name: "postNews",
    data() {
      return {
        //话题
        topicWord: '',
        CirCleWord: '',
        fileList: [],
        showMap: false,//展示地图选择
        //params
        content: '',
        many_pic: [],
        topic: '',
        cbo_circle_industry_id: '',
        address: '',
        city: '',
        latlng: {}
      }
    },
    mounted() {
      console.log('res')
      this.map()
    },
    created() {

    },
    activated() {
      //获取话题
      this.$on('global:selTopic', res => {
        this.topicWord = res.name
        this.topic = res.id
      });
      this.$on('global:selCirCle', res => {
        this.CirCleWord = res.name
        this.cbo_circle_industry_id = res.id
      });
    },
    methods: {
      //获取地图
      map() {
        let _this = this
        window.addEventListener('message', function (event) {
          var loc = event.data;
          if (loc && loc.module == 'locationPicker') {
            _this.address = loc.poiname
            _this.city = loc.cityname
            _this.latlng = loc.latlng
            _this.showMap = false

          }
        }, false);
      },
      //图片上传
      onImgRead(file) {
        this.$uploadFile(file).then(res => {
          this.many_pic.push(res.data)
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      //删除图片
      delImg(flie, detail) {
        this.many_pic.splice(detail.index, 1)
      },
      //发布
      publish() {
        this.many_pic.join(',')
        let _this = this
        if (!this.content) this.$toast('请输入内容')
        else if (!this.topic) this.$toast('请选择话题')
        else if (!this.cbo_circle_industry_id) this.$toast('请选择圈子')
        else {
          this.$toast.loading('正在发布')
          if (this.many_pic) {
            this.many_pic = this.many_pic.join(',')
          }
          this.$post('Circle/setNews', {
            desc: this.content,
            pic: this.many_pic || '',
            topic_id: this.topic,
            circle_id: this.cbo_circle_industry_id,
            address: this.address,
            city: this.city,
            ...this.latlng
          }).then(res => {
            this.$toast.clear()
            this.$toast('发布成功')
            setTimeout(function () {
              // _this.$router.push('/communityDongtai');
              _this.$router.go(-1);
            }, 500);
          }).catch((res) => {
            this.$toast.clear()
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .van-uploader__preview {
    margin: 12px 12px 0 0;
  }

  /deep/ .van-uploader__upload {
    margin: 12px 12px 0 0;
  }

  .postNews-page {
    min-height: 100%;
    background-color: #ffffff;
    padding: 17px 12px 12px;
    font-size: 14px;

    textarea {
      font-size: 14px;
      line-height: 20px;
      padding: 0 0 5px;
      border: none;
      outline: none;
      width: 100%;
      height: 180px;
      resize: none;
      box-sizing: border-box;
    }

    .bottom {
      .item {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        color: #999999;
        padding-left: 29px;
        background-image: url("../../../assets/images/comm/icon3.png");
        background-repeat: no-repeat;
        background-size: 17px 16px;
        background-position: 0 center;

      }

      .item:nth-child(2) {
        background-image: url("../../../assets/images/comm/icon1.png");
      }

      .item:nth-child(3) {
        background-image: url("../../../assets/images/comm/icon2.png");
      }

    }

    .btnbox {
      margin: 40px 12px 10px;
    }
  }
</style>
