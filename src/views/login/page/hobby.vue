<template>
  <div class="wrap">
    <div class="header">
      <div class="jump flex-fe">
<!--        <span class="flex-c" @click="$linkTo('/liulian')">跳过</span>-->
      </div>
      <div class="tit">
        完善个人信息，轻松赢好礼
      </div>
    </div>
    <div class="pubsel selSex">
      <div class="selTit">
        <span class="Icon sexIcon"></span>
        <div class="word">选择您的性别</div>
      </div>
      <van-radio-group v-model="radioSex">
        <div class="box flex-c">
          <div class="item" @click="radioSex = '1'">
            <div class="radiobox">
              <van-radio slot="right-icon" checked-color="#FFB400" icon-size="16px" name="1"/>
            </div>
            <div class="word flex-c">
              我是男生
            </div>
          </div>
          <div class="item" @click="radioSex = '2'">
            <div class="radiobox">
              <van-radio slot="right-icon" checked-color="#FFB400" icon-size="16px" name="2"/>
            </div>
            <div class="word flex-c">
              我是女生
            </div>
          </div>
        </div>
      </van-radio-group>
    </div>
    <div class="selConent">
      <div class="selTit">
        <span class="Icon conentIcon"></span>
        <div class="word flex-e">选择您感兴趣的内容<span class="f-24 fw-bold ml-5">(至少<span
          class="c-ff4 fw-bold">2</span>项)</span></div>
      </div>
      <van-checkbox-group v-model="checkboxConent" @change="demo">
        <div class="box">
          <div class="item" v-for="(item,index) in hobby" :key="index" @click="toggle(index)">
            <div class="radiobox">
              <van-checkbox :name="index" ref="checkboxes" checked-color="#FFB400" icon-size="16px"></van-checkbox>
            </div>
            <div class="imgbox">
              <van-image
                width="100%"
                height="100%"
                :src="$formatImg(item.pic)"
                fit="cover"
              />
            </div>
            <div class="word flex-c">
              {{item.title}}
            </div>
          </div>

        </div>
      </van-checkbox-group>
    </div>
    <div class="selAge">
      <div class="selTit">
        <span class="Icon ageIcon"></span>
        <div class="word flex-e">选择您的出身年代</div>
      </div>
      <div class="box flex-c">
        <div class="item" :class="['item',radioAge== item.id?'active':'']" v-for="(item,index) in age"
             :key="index" @click="radioAge = item.id">
          {{item.title}}
        </div>
      </div>
    </div>
    <div class="g-btn-ff4" @click="editUser()">
      确认
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "hobby",
    data() {
      return {
        radioSex: '1',
        hobby: '',
        age: '',
        checkboxConent: [],
        radioAge: -1,
        SelSexList: [
          {imgUrl: require("../../../assets/images/register/icon5.png"), title: '榴莲', num: '1'},
          {imgUrl: require("../../../assets/images/register/icon6.png"), title: '榴莲', num: '2'},
        ],

      }
    },
    created() {
      this.initPage()
    },
    methods: {
      demo() {
        console.log(this.checkboxConent);
      },
      editUser() {
        if (this.checkboxConent.length < 2) {
          this.$toast('至少选择两项爱好噢~')
        } else if (this.radioAge < 0) {
          this.$toast('请选择年代')
        } else {
          let hobby_id = this.checkboxConent.join(',')
          this.$post('user/editUser', {sex: this.radioSex, decade_id: this.radioAge, hobby_id: hobby_id}).then(res => {
            this.$router.push('/liulian');
          }).catch((res) => {
            this.$toast.clear()
          })
        }

      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('login/regInfo', {type: 1}),//爱好
            this.$post('login/regInfo', {type: 2}),//年代
          ]).then(axios.spread((a, b) => {
            this.hobby = this.$gDataList(a)
            this.age = this.$gDataList(b)

          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },

    }
  }
</script>

<style scoped lang="less">
  .wrap {
    min-height: 100%;
    background: #ffffff;

    .g-btn-ff4 {
      width: 295px;
      margin: 23px auto;
    }

    .selTit {
      padding: 0 12px;
      display: flex;
      align-items: center;

      .word {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }

      .Icon {
        width: 30px;
        height: 20px;
        background-repeat: no-repeat;
        background-position: 0 0;
      }

      .sexIcon {
        background-image: url("../../../assets/images/register/icon9.png");
        background-size: 20px 20px;
      }

      .conentIcon {
        background-image: url("../../../assets/images/register/icon8.png");
        background-size: 20px 17px;
      }

      .ageIcon {
        background-image: url("../../../assets/images/register/icon7.png");
        background-size: 22px 18px;
      }

    }

    /deep/ .van-radio__icon--round .van-icon {
      border: none;
    }

    /deep/ .van-radio__icon--checked .van-icon {
      border: 1px solid #ffffff;
    }
  }

  .header {
    .jump {
      padding: 5.5px 12px;

      span {
        width: 50px;
        height: 22px;
        background: rgba(238, 238, 238, 1);
        border-radius: 11px;
        color: rgba(153, 153, 153, 1);
      }
    }

    .tit {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin-bottom: 20px;
    }
  }

  .pubsel {
    .box {
      .item {
        width: 60px;
        height: 81px;
        background-repeat: no-repeat;
        background-size: 60px 60px;

        .radiobox {
          display: flex;
          justify-content: flex-end;
        }

        .word {
          margin-top: 52px;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }

  .selSex {
    .box {
      .item {
        margin: 17px 45px 23.5px;
        background-image: url("../../../assets/images/register/icon5.png");
      }

      .item:nth-child(2) {
        background-image: url("../../../assets/images/register/icon6.png");

      }
    }
  }

  .selConent {
    margin-bottom: 27px;

    .box {
      flex-wrap: wrap;
      padding: 0 0 0 11px;
      display: flex;
      .item {
       margin: 17px 14px 0;
        position: relative;
        .imgbox{
          width: 60px;
          height: 60px;
        }
        .radiobox {
          position: absolute;
          right: 0;
          top: 0;
          z-index: 99;
        }

        .word {
          margin: 8px 0 0 0;
          font-size: 14px;
        }
      }
    }

  }

  .selAge {
    .item {
      margin: 16px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 28px;
      border: 1px solid rgba(255, 180, 0, 1);
      border-radius: 14px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 180, 0, 1);
    }

    .active {
      background: rgba(255, 180, 0, 1);
      color: #ffffff;
    }
  }
</style>
