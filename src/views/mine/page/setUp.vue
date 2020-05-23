<template>
  <div class="setUp">
    <div class="row flex-sb">
      <label>头像</label>
      <div class="flex-c">
        <div class="imgbox">
          <van-uploader :after-read="onImgRead" class="imgbtn"/>
          <van-image width="100%" height="100%" fit="cover" round
                     :src="info.headimgurl?$formatImg(info.headimgurl):$formatImg('defaultHeader')"/>
        </div>
        <span class="iconfont icon-dibudaohanglan-"></span>
      </div>
    </div>
    <div class="row flex-sb">
      <label>用户昵称</label>
      <van-field
        v-model="info.nickname"
        placeholder="用户昵称"
        input-align="right"
        @blur="changeName"
      />
    </div>
    <div class="row flex-sb">
      <label>性别</label>
      <div class="flex-tb" @click="showSex=true">
        {{info.sex_name}}
        <span class="iconfont icon-dibudaohanglan-"></span>
      </div>
    </div>
    <div class="row flex-sb">
      <label>生日</label>
      <div class="flex-tb" @click="showData=true">
        {{info.birthday}}
        <span class="iconfont icon-dibudaohanglan-"></span>
      </div>
    </div>
    <div class="row flex-sb">
      <label>个性签名</label>
      <van-field
        v-model="info.describe"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="个性签名"
        input-align="right"
        show-word-limit
        @blur="changeDescribe"
      />
    </div>
    <!--    选择性别-->
    <van-popup v-model="showSex" position="bottom">
      <van-picker
        show-toolbar
        :columns="Sex"
        @cancel="showSex = false"
        @confirm="actionSex"
      />
    </van-popup>
    <!--    选择出生日期-->
    <van-popup v-model="showData" position="bottom">
      <van-datetime-picker
        v-model="info.birthday||'请选择出生日期'"
        type="date"
        @confirm="actionData"
        @cancel="showData=false"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>
    <div class="btn flex-c" @click="quit()">
      退出
    </div>

    <van-popup v-model="showCro" position="right"
               :style="{ height: '100%',width:'100%' }">
      <div class="cropper">
        <cropper @cancelCro="cancelCro" :img="CroImg" @saveImg="saveImg"></cropper>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import cropper from "../../../components/cropper";
  import {mapState, mapActions, mapMutations} from 'vuex'
  import moment from 'moment'

  export default {
    name: "setUp",
    computed: {
      ...mapState(['UserInfo'])
    },
    components: {cropper},
    data() {
      return {
        showSex: false,
        Sex: ['男', '女'],
        showData: false,
        minDate: new Date(1920, 0, 1),
        maxDate: new Date(),
        info: '',
        showCro: false,
        CroImg: ""
      }
    },
    created() {
      this.initPage()
    },

    methods: {
      ...mapMutations(['setUserInfo']),
      //截图取消
      cancelCro() {
        this.showCro = false
      },
      //选择头像
      onImgRead(file) {
        this.$toast.loading('正在读取头像');
        this.$uploadFile(file).then(res => {
          this.showCro = true
          this.CroImg = res.data
          this.$toast.clear()
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      saveImg(data) {
        this.$post('common/baseUp', {img: data}).then(res => {
          this.info.headimgurl = res.data
          this.showCro = false
          this.$toast.clear()
        }).catch((res) => {
          this.$toast.clear()
          this.showCro = false

        })
      },
      //退出
      quit() {
        this.$toast.loading('正在退出');
        let _this = this
        setTimeout(function () {
          _this.$toast.clear()
          _this.$router.push({
            path: '/login',
          })
        }, 1500);
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('user/getUserInfo').then(res => {//获取用户资料
            this.info = res.data
            this.setUserInfo(res.data)
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },

      //修改资料
      changeMsg(parm) {
        this.$post('user/editUser', {...parm}).then(res => {
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      //选择性别
      actionSex(value) {
        this.info.sex_name = value;
        if (value == '男') {
          this.changeMsg({sex: 1})
        } else {
          this.changeMsg({sex: 2})

        }

        this.showSex = false;
      },
      //修改昵称
      changeName(value) {
        this.changeMsg({nickname: this.info.nickname})
      },
      //修改个性签名
      changeDescribe(value) {
        this.changeMsg({describe: this.info.describe})

      },
      //选择日期
      actionData(value) {
        this.info.birthday = moment(value).format("YYYY-MM-DD")
        this.changeMsg({birthday: this.info.birthday})
        this.showData = false;
      },
      //日期格式化
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`
        }
        return val;
      }
    }
  }
</script>

<style scoped lang="less">
  .btn {
    position: fixed;
    bottom: 40px;
    width: 80%;
    left: 10%;
    border: 1px solid #cccccc;
    line-height: 40px;
    border-radius: 8px;
  }

  .cropper {
    height: 100%;
  }

  .setUp {
    min-height: 100%;
    background: #ffffff;
    font-size: 14px;
    padding: 0 12px;

    /deep/ textarea {
      line-height: 1.2;
      font-size: 14px;
    }

    .imgbtn {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      opacity: 0;
      z-index: 99;
    }

    /deep/ .van-field__control {
      color: #999999 !important;
    }

    /deep/ .van-picker-column__item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .row:last-child {
      > div {
        margin: 10px 0;
        color: #999999;
      }

    }

    .row {
      border-bottom: 1px solid #EEEEEE;

      > div {
        margin: 20px 0;
        color: #999999;
      }

      .imgbox {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid rgba(232, 203, 161, 1);
        margin-right: 6px;
        position: relative;
      }

      .flex-c {
        margin: 10px 0;
      }
    }

    .van-cell {
      padding: 0;
      width: 70%;
    }
  }
</style>
