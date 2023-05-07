import axios from 'axios';
import baseURL from '../../static/config'
import router from "./router";

const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30 * 1000,
})

instance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token') || ''
  if (token) config.headers.token = token
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(response => {
  if (response.data.code === -1) {
    setTimeout(() => {
      return router.replace({path: '/login'})
    }, 2000)
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default instance
