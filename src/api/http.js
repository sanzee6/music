import axios from 'axios'
import router from '../router'
axios.defaults.timeout = 5000 // 超时时间设置为5秒
axios.defaults.withCredentials = true // 允许跨域
// Content-Type 响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 基础url
axios.defaults.baseURL = 'http://localhost:8888'
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果response里面的status是200，说明访问到接口了
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401: // 未登录
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 404: // 未找到网址
          break
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * 封装一个GET方法
 * export function get (parameters) {
  let {url, params} = parameters
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装一个POST方法
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
