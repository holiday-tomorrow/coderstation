import axios from "axios"

const service = axios.create({
    timeout: 5000
})
// 请求拦截
service.interceptors.request.use(config => {
    let token = localStorage.getItem('userToken')
    if (token) {
        config.headers['Authorization'] = "Bearer " + token
    }
    return config
}, err => {
    console.log('请求拦截', err)
})
// 响应拦截
service.interceptors.response.use(res => {
    return res.data
}, err => {
    console.log('响应拦截', err)
})

export default service