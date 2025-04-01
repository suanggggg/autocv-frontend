import Mock from 'mockjs'
import adminTaskApi from './mockData/adminTask'
import adminUserApi from './mockData/adminUser'
import adminModelApi from './mockData/adminModel'
import userInfoApi from './mockData/userInfo'
import homeApi from './mockData/home'
Mock.mock('/adminTask/getAdminTask', adminTaskApi.getAdminTaskList)
Mock.mock('/adminUser/getUser', adminUserApi.getUserList)
Mock.mock('/adminModel/getModel', adminModelApi.getModelList)
Mock.mock('/userInfo/getuserInfo', userInfoApi.getUserInfoList)
Mock.mock('/home/getData', homeApi.getHomeData)
