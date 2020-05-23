<template>
  <div class="wrap">
    <div class="commentTit">
      全部评论
    </div>
    <div class="commentList">
      <div class="coitem" v-for="(item,index) in odata" :key="index">
        <div class="imgbox g-tipsBox">
          <van-image
            round
            width="100%"
            height="100%"
            :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
          />
          <div v-if="item.user.grade_pic" class="g-tips"
               :style="{backgroundImage: 'url(' + $formatImg(item.user.grade_pic) + ')'}"></div>
        </div>
        <div class="left">
          <div class="f-28">{{item.user.nickname}}</div>
          <div class="time">
            {{item.add_time}}
          </div>
          <Glike :is_like="item.is_like" type="2" :id="item.id"/>
          <div class="desc" @click="focusInp(item.user.nickname,item.id)">
            {{item.desc}}
          </div>
          <div class="c-99 mt-10 flex-tb" v-if="item.num>0" @click="viewReply(item,index)">查看{{item.num}}条回复 <i
            class="iconfont">&#xe62d;</i></div>
          <div class="c-99 mt-10" v-else>回复</div>
        </div>
      </div>
    </div>
    <van-popup
      v-model="showReply"
      round
      position="bottom"
      :style="{ height: '90%' }"
      lock-scroll
      :close-on-click-overlay="false"
    >
      <div class="replyBox">
        <div class="close" @click="showReply=false,showReplyInp=false,pid=0">
          <i class="iconfont">&#xe690;</i>
        </div>
        <div class="tit bb">{{selreplyDataIndex+1}}楼的回复</div>
        <div class="coitem" v-if="selreplyData">
          <div class="imgbox g-tipsBox">
            <van-image
              round
              width="100%"
              height="100%"
              :src="selreplyData.user.head_img?$formatImg(selreplyData.user.head_img):$formatImg('defaultHeader')"
            />
            <div v-if="selreplyData.user.grade_pic" class="g-tips"
                 :style="{backgroundImage: 'url(' + $formatImg(selreplyData.user.grade_pic) + ')'}"></div>
          </div>
          <div class="left">
            <div class="f-28">{{selreplyData.user.nickname}}</div>
            <div class="time">
              {{selreplyData.add_time}}
            </div>
            <div class="desc" @click="focusInp(false,selreplyData.id)">
              {{selreplyData.desc}}
            </div>
          </div>
        </div>
        <div class="replyB" v-if="replyListB">
          <van-list
            v-model="loading"
            :finished="!loadMore"
            finished-text="没有更多了"
            :offset="0"
            :immediate-check="false"
            @load="getListMore"
          >
            <div class="coitem" v-for="(item,index) in replyListB" :key="index">
              <div class="imgbox g-tipsBox">
                <van-image
                  round
                  width="100%"
                  height="100%"
                  :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
                />
                <div v-if="item.user.grade_pic" class="g-tips"
                     :style="{backgroundImage: 'url(' + $formatImg(item.user.grade_pic) + ')'}"></div>
              </div>
              <div class="left">
                <div class="f-28">{{item.user.nickname}}</div>
                <div class="time">
                  {{item.add_time}}
                </div>
                <div class="desc" @click="focusInp(item.user.nickname,item.id)">
                  <span v-if="item.old_user.id!=selreplyData.user.id">回复 <span class="c-00a ml-10 mr-10">{{item.old_user.nickname}}</span> :</span>{{item.desc}}
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </van-popup>
    <div class="inpbox flex-c" :style="{bottom:(showReplyInp?'0px':'-100px')}">
      <van-field ref="replyInp" class="inp" clearable v-model="replyword"
                 :placeholder="pla"/>
      <input type="button" class="btn" @click="replyAction()" value="评论"/>
      <input type="button" class="btn btnb" @click="showReplyInp=false"  value="取消"/>
    </div>
  </div>
</template>

<script>
  import Glike from "./Glike";

  export default {
    name: "comment",
    props: ['num', 'odata', 'type', 'model_id'],//odata全部的评论 一级的
    data() {
      return {
        showReply: false,//评论回复显示
        replyListB: '',//某条评论的回复列表数据   二级的
        selreplyData: "",//选中的评论数据  一级的
        selreplyDataIndex: "",//选中的评论数据楼数  一级的
        replyword: '',//输入框回复评论的
        showReplyInp: false,//显示输入框
        pla: '回复评论',//输入框提示文字
        pid: 0,//上级评论ID


        loading: false,
        loadMore: true,
        page: 2
      }
    },
    components: {
      Glike
    },
    methods: {
      viewReply(el, index) {
        this.showReply = true
        this.showReplyInp = true
        this.selreplyData = el
        this.pid = el.id
        this.selreplyDataIndex = index
        this.$post('common/getCommentInfo', {id: el.id, page: 1}).then(res => {
          this.replyListB = res.data
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('common/getCommentInfo', {id: this.selreplyData.id, page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.replyListB = this.replyListB.concat(res.data)
              this.page++
            } else {
              this.loadMore = false
            }
            this.loading = false
          }).catch((res) => {
            this.loadMore = false
            this.loading = false
          })
        }
      },


      //输入框获取
      focusInp(user = false, pid = 0) {
        if (user) {
          this.pla = `回复 ${user}:`
        } else {
          this.pla = '回复评论'
        }
        this.pid = pid
        this.showReplyInp = true
        this.$refs.replyInp.focus()
      },
      //确定回复按钮
      replyAction() {
        if (this.replyword) {
          this.$post('common/setComment', {
            type: this.type,
            model_id: this.model_id,
            desc: this.replyword,
            pid: this.pid
          }).then(res => {
            if (this.pid == 0) { //没有上一级 直接回复文章
              this.$emit('succReply', res.data.list, -1)//-1告诉父组件 没有回复上级
            } else {
              if (this.showReply) {
                this.replyListB.unshift(res.data.list)
              } else {
                this.$emit('succReply', res.data.list, this.pid)// this.pid告诉父组件 有回复上级
              }
              console.log(res);

            }
            this.$toast('回复成功')
            this.replyword = ''
            this.showReplyInp = false
          }).catch((res) => {
            console.log(res);
          })
        } else {
          this.$toast('评论不能为空')
        }
      },

    }
  }
</script>

<style scoped lang="less">

  .van-cell:not(:last-child)::after {
    border-bottom: none;
  }

  .wrap {
    background: #fff;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .commentTit {
    font-size: 16px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 0 12px 0;
  }

  .coitem {

    margin: 15px 12px 0;
    padding-bottom: 15px;
    display: flex;
    border-bottom: 1px solid #EEEEEE;

    .imgbox {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 7px;
    }

    .left {
      position: relative;
      width: 312px;

      .wIcon-dianzan {
        position: absolute;
        top: 10px;
        right: 0px;
      }

      .time {
        color: #999999;
        font-size: 12px;
        margin: 7px 0;
      }

      .desc {
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }


    }
  }

  .inpbox {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    width: 100%;
    height: 45px;
    background-color: #FFFFFF;
    border-top: 1px solid #eeeeee;

    .inp {
      flex: 1;
      font-size: 12px;
    }

    .btn {
      background-color: #80d1ff;
      font-size: 12px;
      color: #FFFFFF;
      padding: 5px 10px;
      border-radius: 3px;
      line-height: 12px;
      margin-right: 15px;
    }

    .btnb {
      background-color: #999999;

    }
  }

  .replyBox {
    position: relative;
    padding-top: 42px;
    padding-bottom: 45px;

    .coitem {
      border-bottom: none;
    }

    .replyB {
      border-top: 3px solid #eeeeee;
    }

    .close {
      position: fixed;
      top: 10%;
      line-height: 42px;
      z-index: 3;
      padding: 0 3%;
    }

    .tit {
      position: fixed;
      top: 10%;
      background-color: #FFFFFF;
      z-index: 2;
      width: 100%;
      line-height: 3;
      text-align: center;
      font-size: 14px;
    }
  }

</style>
