import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  // 1. 同意配置
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 2. 添加实例方法
  Vue.prototype.$http = axios
}
//3暴露出去
export default MyHttpServer

