<template>
  <div class="wrap flex-c">
    <img :src="imgUrl" alt="" class="fm" v-if="shoufm">

    <div class="tpoicBox">
      <div class="resultBox" v-if="showresult">
        <div class="retit flex-c">{{carry.title}}</div>
        <div class="redesc">{{carry.desc}}</div>
        <Gshare class="Gshare"></Gshare>
      </div>
      <template v-else>
        <div class="title">
          {{topic.title}}
        </div>
        <div class="answer">
          <div class="item" v-for="(item,index) in topic.answer" :key="index" :class="activeAns==index?'active':''"
               @click="selAnswer(index,item.id)">
            <span class="mr-5">{{abc[index]}}</span> {{item.title}}
          </div>
        </div>
        <div class="btn flex-c" @click="nextTit()">
          下一题
        </div>
      </template>

  </div>
    <img :src="imgfooter" alt="" class="imgend" v-if="!shoufm">
  </div>
</template>

<script>
  import Gshare from '../../../components/Gshare'

  export default {
    name: "testQuestion",
    components: {Gshare},
    data() {
      return {
        imgUrl: require("../../../assets/images/find/test-fm.png"),
        imgfooter: require("../../../assets/images/find/test-footer.png"),
        shoufm: false,
        studyIssue: [],//总题
        num: 0,//当前题数下标
        topic: '',//当前题目
        abc: ['A', 'B', 'C', 'D', 'E'],
        activeAns: -1,//当前选中答案下标
        activeAnsId: -1,//当前选中答案id
        showresult: false,
        carry: '',

        param: {
          topic: [],
          answer: [],
          study_id: ''
        }
      }
    },
    mounted() {
      let _this = this
      _this.param.study_id = _this.$route.query.id || 0
      setTimeout(function () {
        _this.shoufm = false
      }, 1500);
      _this.getStudyIssue()
    },
    methods: {
      //选中答案
      selAnswer(index, id) {
        this.activeAns = index
        this.activeAnsId = id
      },
      //下一题
      nextTit() {
        if (this.activeAnsId < 0) this.$toast('请选择答案')
        this.param.topic.push(this.studyIssue[this.num].id)
        this.param.answer.push(this.activeAnsId)
        this.num++
        if (this.num == this.studyIssue.length) {
          this.$toast.loading('已答完,正在计算分数')
          this.param.topic = this.param.topic.join(',')
          this.param.answer = this.param.answer.join(',')
          this.$post('Find/carry', {...this.param}).then(res => {
            this.showresult = true
            this.carry = res.data
          }).catch((res) => {
            this.$toast.clear()
          })

        } else {
          this.activeAns = -1
          this.activeAnsId = -1
          this.topic = this.studyIssue[this.num]
        }


      },
      //获取全部题目
      getStudyIssue() {
        this.$toast.loading('正在加载')
        this.$nextTick(() => {
          this.$post('Find/studyIssue', {id: this.param.study_id}).then(res => {
            this.studyIssue = res.data
            this.topic = res.data[0]
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
    }

  }
</script>

<style scoped lang="less">


  .wrap {
    height: 100vh;
    background-image: linear-gradient(#FDB402, #FFB400);
    position: relative;

    .fm {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 999;
    }

    .imgend {
      width: 96%;
      position: absolute;
      bottom: 0;
      left: 4%;
    }

    .tpoicBox {
      width: 279px;
      height: 85%;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      padding: 0 20px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        display: flex;
        align-items: center;
        height: 119px;
      }

      .answer {
        margin-bottom: 20px;

        .active.item {
          background: rgba(255, 180, 0, 1);
        }

        .item {
          width: 239px;
          border: 1px solid rgba(255, 180, 0, 1);
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          padding: 10px 13px;
          margin-bottom: 20px;

          span {
            font-size: 14px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }
        }
      }

      .btn {
        width: 70px;
        height: 28px;
        background: linear-gradient(90deg, rgba(255, 201, 52, 1), rgba(255, 180, 0, 1));
        border-radius: 14px;
        margin: 0 auto;
        font-size: 12px;
        color: rgba(255, 255, 255, 1);
      }
    }

    .resultBox {
      .retit {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 19px;
      }

      .redesc {
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }

    }
    .Gshare{
      width: 65px;
      position: fixed;
      top: 65%;
    }
  }
</style>
