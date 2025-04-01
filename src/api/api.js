import CreateTask from "@/views/createTask.vue"
import request from "./request"
export default {
    login(params) {
        return request({
            url: '/login',
            method: 'post',
            data: params,
            mock: true
        })
    },
    register(params) {
        return request({
            url: '/register',
            method: 'post',
            data: params,
            mock: true
        })
    },
    home(params) {
        return request({
            url: '/home',
            method: 'post',
            data: params,
            mock: true
        })
    },
    search(params) {
        return request({
            url: '/home/search',
            method: 'post',
            data: params,
            mock: true
        })
    },
    delete_task_one(params) {
        return request({
            url: '/home/delete/one',
            method: 'delete',
            data: params,
            mock: true
        })
    },
    add_task(params) {
        return request({
            url: '/home/add',
            method: 'post',
            data: params,
            mock: true
        })
    },
    /* deleteUserTasks(params) {
         return request({
             url: '/user/deleteUserTasks',
             method: 'delete',
             data: params,
             mock: true
         })
     },*/
    getAdminTask(params) {
        return request({
            url: '/admin/getAdminTask',
            method: 'get',
            data: params,
            mock: true
        })
    },
    searchAdminTask(params) {
        return request({
            url: '/admin/searchAdminTask',
            method: 'post',
            data: params,
            mock: true
        })
    },
    getAdminUser(params) {
        return request({
            url: '/admin/getAdminUser',
            method: 'get',
            data: params,
            mock: true
        })
    },
    searchAdminUser(params) {
        return request({
            url: '/admin/searchAdminUser',
            method: 'post',
            data: params,
            mock: true
        })
    },
    admin_user_delete_one(params) {
        return request({
            url: '/admin/deleteOneUser',
            method: 'delete',
            data: params,
            mock: true
        })
    },
    saveUser(params) {
        return request({
            url: '/admin/saveUser',
            method: 'put',
            data: params,
            mock: true
        })
    },
    /*deleteAdminUsers(params) {
        return request({
            url: '/user/deleteAdminUsers',
            method: 'delete',
            data: params,
            mock: true
        })
    },*/
    getAdminModel(params) {
        return request({
            url: '/admin/getAdminModel',
            method: 'get',
            data: params,
            mock: true
        })
    },
    searchAdminModel(params) {
        return request({
            url: '/admin/searchAdminModel',
            method: 'post',
            data: params,
            mock: true
        })
    },
    admin_model_delete_one(params) {
        return request({
            url: '/admin/deleteOneModel',
            method: 'delete',
            data: params,
            mock: true
        })
    },
    upload_pth(params) {
        return request({
            url: '/admin/uploadmodel',
            method: 'post',
            data: params,
            mock: true
        })
    },
    saveModel(params) {
        return request({
            url: '/admin/saveModel',
            method: 'put',
            data: params,
            mock: true
        })
    },
    /*deleteAdminModels(params) {
        return request({
            url: '/user/deleteAdminModels',
            method: 'delete',
            data: params,
            mock: true
        })
    },*/
    /*getUserInfo(params) {
        return request({
            url: '/user/getUserInfo',
            method: 'get',
            data: params,
            mock: true
        })
    },*/
    /*savePassword(params) {
        return request({
            url: '/user/savePassword',
            method: 'put',
            data: params,
            mock: true
        })
    },*/
    get_task_info(params) {
        return request({
            url: '/getTaskInfo',
            method: 'post',
            data: params,
            mock: true
        })
    },
    get_model_info(params) {
        return request({
            url: '/getModelInfo',
            method: 'post',
            data: params,
            mock: true
        })
    },
    upload_task_zip(params) {
        return request({
            url: '/task/upload',
            method: 'post',
            data: params,
            mock: true
        })
    },
    upload_task_camera(params) {
        return request({
            url: '/task/uploadCamera',
            method: 'post',
            data: params,
            mock: true
        })
    },
    create_task(params) {
        return request({
            url: '/task/create',
            method: 'post',
            data: params,
            mock: true
        })
    },
    getModelInfo(params) {
        return request({
            url: '/getModelInfo',
            method: 'post',
            data: params,
            mock: true
        })
    },
    download_sample(params) {
        return request({
            url: '/download_sample',
            method: 'post',
            data: params,
            mock: true
        })
    },
    download_model(params) {
        return request({
            url: '/download_model',
            method: 'post',
            data: params,
            mock: true
        })
    },
    download_pdf(params) {
        return request({
            url: '/download_pdf',
            method: 'post',
            data: params,
            mock: true
        })
    },
    uploadFileTestData(params) {
        return request({
            url: '/uploadFileTestData',
            method: 'post',
            data: params,
            mock: true
        })
    },
    uploadCameraTestData(params) {
        return request({
            url: '/uploadCameraTestData',
            method: 'post',
            data: params,
            mock: true
        })
    },
    positiveDataAugmentationUpload(params) {
        return request({
            url: '/positiveDataAugmentationUpload',
            method: 'post',
            data: params,
            mock: true
        })
    },
    train(params) {
        return request({
            url: '/testTrain',
            method: 'post',
            data: params,
            mock: true
        })
    },
    test_model(params) {
        return request({
            url: '/test_model',
            method: 'post',
            data: params,
            mock: true
        })
    },
    test1(params) {
        return request({
            url: '/test1',
            method: 'post',
            data: params,
            mock: true
        })
    },
    test2(params) {
        return request({
            url: '/test2',
            method: 'post',
            data: params,
            mock: true
        })
    },
    /*cancelTask(params) {
        return request({
            url: '/cancelTask',
            method: 'post',
            data: params,
            mock: true
        })
    },*/
}