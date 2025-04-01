import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
const ERROR = '错误，请重试'
const service = axios.create({
    baseURL: config.baseApi
})
//在请求之前做一些事情
service.interceptors.request.use((req) => {
    return req
})
service.interceptors.response.use((res) => {

    if (res.config.responseType === 'blob') {
        return res
    }

    const { code, data, msg } = res.data

    if (code == 200) {
        return data
    }
    else {
        ElMessage.error(msg || ERROR)
        return Promise.reject(msg || ERROR)
    }
})

function request(options) {

    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }
    //对mock的处理
    let isMock = config.mock
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    return service(options)
}

export default request