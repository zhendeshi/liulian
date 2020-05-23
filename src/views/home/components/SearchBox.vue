<template>
  <div class="search flex-sb" :class="[dayStydy?'dayStydy':'nightStydy']">
    <div class="left flex-tb">
      <div class="img icon"></div>
      <div class="addr one-row-hide">{{odata.district}}</div>
    </div>
    <router-link class="middle flex-c" :to="{path:'/search'}">
      <div class="icon"></div>
      <input class="inp" placeholder="搜索关键字" />
    </router-link>
    <slot></slot>
    <iframe
      id="geoPage"
      width="0"
      height="0"
      frameborder="0"
      style="display:none;"
      scrolling="no"
      :src="iF != 1 ? src : ' '"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { InitShare } from '../../../utils/service.js'

export default {
  name: "SearchBox",
  data() {
    return {
      odata: "",
      addr: "联合社区",
      iF: 1,
      src:
        "https://apis.map.qq.com/tools/geolocation?key=4XMBZ-PEMKX-YUR4H-TJTGE-FSRWK-Q2BVJ&referer=myapp"
    };
  },
  computed: {
    ...mapState(["dayStydy"])
  },
  mounted() {
    console.log('InitShare')
    // InitShare()
    if (navigator.geolocation) {
      var n = navigator.geolocation.getCurrentPosition(function(res) {
        console.log(res); // 需要的坐标地址就在res中
      });
    } else {
      alert("该浏览器不支持定位");
    }
    console.log("res");
    this.iF = this.$appType;

    this.map();
  },
  methods: {
    map() {
      console.log("res");

      let _this = this;
      window.addEventListener(
        "message",
        function(event) {
          _this
            .$post("config/parsing", {
              lat: event.data.lat ? event.data.lat : 0,
              lng: event.data.lng ? event.data.lng : 0
            })
            .then(res => {
              _this.odata = res.data;
            })
            .catch(res => {
              console.log(res);
            });
        },
        false
      );
    }
  }
};
</script>

<style scoped lang="less">
.search {
  padding: 12px;
  font-size: 12px;

  .icon {
    background-size: 80px 52px;
    background-image: url("../../../assets/images/index-search_css_sprites.png");
  }

  .left {
    .img {
      width: 13px;
      height: 16px;
      margin-right: 5px;
    }

    .addr {
      width: 50px;
      margin-right: 12px;
    }
  }

  .middle {
    width: 240px;
    height: 30px;
    box-sizing: border-box;
    padding: 0 10px 0 20px;

    .icon {
      width: 12px;
      height: 12px;
      margin-right: 6px;
    }

    .inp {
      background-color: transparent;
      flex: 1;
      height: 12px;
    }
  }

  .right {
    .icon {
      width: 19px;
      height: 16px;
      margin-left: 13px;
    }
  }
}

.dayStydy {
  .left .icon {
    background-position: -28px -31px;
  }

  .middle {
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 15px;
    color: #999999;

    .icon {
      background-position: -63px -5px;
    }

    input::-webkit-input-placeholder {
      color: #999999;
    }
  }

  .right .icon {
    background-position: -34px -5px;
  }
}

.nightStydy {
  .left {
    color: #fff;

    .icon {
      background-position: -5px -31px;
    }
  }

  .middle {
    border: 1px solid #000;
    background: rgba(45, 44, 49, 1);
    border-radius: 15px;
    color: #ffffff;

    .icon {
      background-position: -63px -27px;
    }

    input::-webkit-input-placeholder {
      color: #ffffff;
    }
  }

  .right .icon {
    background-position: -5px -5px;
  }
}
</style>
