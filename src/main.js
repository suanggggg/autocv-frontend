import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './api/mock.js'
import api from './api/api'

const app = createApp(App)

app.config.globalProperties.$api = api
app.use(router)
app.use(ElementPlus)

app.mount('#app')
