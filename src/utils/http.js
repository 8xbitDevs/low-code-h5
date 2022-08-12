import axios from 'axios'

export function getToken() {
    const localStorage = window.localStorage
    const token = JSON.parse(localStorage.getItem('token'))
    if (token == null) return null
    if (token.expiredTime < Date.now()) {
      localStorage.removeItem('token')
      return null
    } else {
      // console.log(token.value)
      return token.value
    }
}  
  
const http = axios.create({
  baseURL: 'http://lowcode.wyy.ink',
  timeout: 600000
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = {token: JSON.parse(localStorage.getItem("token")).value}
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
},
    (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log(error.response);
  if (error.response?.status >= 400) {
    message.error(error.response.statusText);
  }
  // 请求出错：服务端返回错误状态码
  return Promise.reject(error);
    }
)

export { http }