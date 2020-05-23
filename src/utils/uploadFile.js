import axios from 'axios'
import request from "./request";

export function uploadFile(event) {
  return new Promise((resolve, reject) => {
    if (!event.target.files[0].size) reject();
    let files = event.target.files;
    let apiList = []
    for (const file of files) {
      apiList.push(uploadFileToServer(file))
    }
    axios.all(apiList).then(axios.spread((...res) => {
      let imgList = res.map(item => item.data)
      resolve(imgList)
    })).catch((res) => {
      reject()
    })
  })
}

export function uploadFileToServer(file) {
  let formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/common/fileUp',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
