<template>
  <div class="box">
    <!-- 生成预览图片-->
    <div class="tit">头像预览:</div>
    <div class="show-preview"
         :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden'}">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
    <div class="tit" style="margin-top: 10%">头像截取:</div>
    <div class="wrapper">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="false"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        @realTime="realTime"
      ></vueCropper>
    </div>
    <div class="btn">
      <a @click="cancel()">取消</a>
      <a @click="finish('base64')">确定</a>
    </div>

  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {VueCropper} from 'vue-cropper'

  export default {
    name: "setUp",
    computed: {
      ...mapState(['UserInfo'])
    },
    props: ['img'],
    components: {
      VueCropper,
    },
    data: function () {
      return {
        previews: {},
        option: {
          img: '',//裁切图片的地址
          outputSize: 0.6,//裁剪生成图片的质量 0.1-1
          full: false,//是否输出原图比例的截图
          outputType: 'png',//裁剪生成图片的格式
          canMove: true,//图片是否允许滚轮缩放
          fixedBox: true,//固定截图框大小 不允许改变
          original: false,//上传图片按照原始比例渲染
          canMoveBox: false,//截图框能否拖动
          canMove: true,// 上传图片是否可以移动
//              autoCropWidth: 200,
//              autoCropHeight: 200,
          autoCrop: true,//是否默认生成截图框
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1]
        },
      }
    },
    watch: {
      img: {
        handler(newName, oldName) {
          this.option.img = newName
        },
        immediate: true
      }
    },
    created() {

    },
    methods: {
      //关闭
      cancel() {
        this.$emit('cancelCro')
      },
      finish(type) {
        this.$toast.loading('正在生成头像');
        var that = this;
        // 输出
//          var test = window.open('about:blank')
//          test.document.body.innerHTML = '图片生成中..'
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            //var test = window.open('')
            //test.location.href = window.URL.createObjectURL(data)
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            //裁切生成的base64图片
            this.$emit('saveImg', data)
            // console.log(data);
            this.crap = false;
          })
        }
      },
      realTime(data) {
        this.previews = data
      },
    },


  }
</script>

<style scoped lang="less">

  .box {
    position: relative;
    height: 100%;
    background: black;

  }

  .show-preview {
    border: 1px solid #ffffff;
  }

  .tit {
    color: #FFFFFF;
    line-height: 3;
    font-size: 14px;
    padding-left: 12px;
  }

  .show-preview {
    margin: 0 auto;
  }

  .wrapper {
    position: fixed;
    left: 20%;
    width: 60%;
    top: 40%;
    height: calc(50% - 50px);
  }

  .vue-cropper {
    background: black;
    background-image: none !important;
  }

  .btn {
    height: 50px;
    background: #565656;
    width: 100%;
    padding: 0 15px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .btn a {
    color: white;
    font-size: 16px;
    display: inline-block;
    line-height: 50px;
  }

  .btn a:nth-of-type(1) {
    float: left;
  }

  .btn a:nth-of-type(2) {
    float: right;

  }
</style>
