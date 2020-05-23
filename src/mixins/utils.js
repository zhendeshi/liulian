import {ImagePreview} from 'vant'

export const mixinUtils = {
  methods: {
    //展示图片
    mixinPreviewImg(current, list, prefix = true) {
      if (prefix) list = list.map(item => this.$formatImg(item))
      ImagePreview({
        images: list,
        startPosition: current,
        closeOnPopstate:true
      })
    },
    //切割字符串为数组
    mixinSplitToArr(str, mark = ',') {
      if (str) {
        return str.split(mark)
      } else {
        return []
      }
    },
    //切割字符串为数组
    mixinSplitToFir(str, mark = ',') {
      if (str) {
        return str.split(mark)[0]
      } else {
        return ''
      }
    }
  }
}
