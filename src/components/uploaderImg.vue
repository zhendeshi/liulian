<template>
  <div class="uploaderImg">
    <van-uploader
      v-model="fileList"
      multiple
      :max-count="6"
    />
  </div>
</template>

<script>
  export default {
    name: "uploaderImg",
    data() {
      return {
        fileList: []
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
</style>
