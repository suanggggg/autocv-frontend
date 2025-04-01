<template>
    <ElHeader>
        <El-row>
            <el-col :span="23">
                <ElText type="primary" size="large"> 视觉认知系统</ElText>
            </el-col>
            <el-col :span="1">
                <router-link :to="role === 'user' ? '/user/userTasks' : '/admin/tasks'">
                    <ElButton type="primary">返回</ElButton>
                </router-link>
            </el-col>
        </El-row>
        <El-row>
            <ElText type="primary"> 查看任务</ElText>
        </El-row>
    </ElHeader>
    <ElContainer class="ElContainer_1886h3zcdmd">
        <template #default="scope_1886h3zcdmd">
            <ElContainer class="ElContainer_1iv0b0298rh">
                <template #default="scope_1iv0b0298rh">
                    <ElHeader></ElHeader>
                    <ElContainer class="ElContainer_2h10qztny5k">
                        <template #default="scope_2h10qztny5k">
                            <ElAside>
                                <template #default="scope_2oevg8l872k">
                                    <ElText type="primary"> 任务名称</ElText>
                                </template>
                            </ElAside>
                            <ElMain>
                                <ElInput v-model="taskName" :readonly="true"></ElInput>
                            </ElMain>
                        </template>
                    </ElContainer>
                    <ElContainer class="ElContainer_1ahpie4u33f">
                        <template #default="scope_1ahpie4u33f">
                            <ElAside>
                                <template #default="scope_2h84qotd0r">
                                    <ElText type="primary"> 任务数据</ElText>
                                </template>
                            </ElAside>
                            <ElMain>
                                <ElInput v-model="taskUrl" :readonly="true">任务路径</ElInput>
                                <input type="file" @change="handleFileUpload">
                                <el-button type="primary" @click="submitFile">
                                    上传文件
                                </el-button>
                                <el-button type="primary" @click="openWebCamera">
                                    拍照上传数据
                                </el-button>
                            </ElMain>
                        </template>
                    </ElContainer>
                    <el-dialog v-model="editDialogVisible">
                        <div class="upload-buttons">
                            <div class="main">
                                <!-- 画笔控件 用来拍照 -->
                                <canvas style="display: none" ref="canvasDom" />
                                <!-- 播放器，用来播放拍摄的视频 -->
                                <video v-if="!imgurl" class="camera_video" ref="videoDom" />
                                <!--  显示照片  -->
                                <img v-else :src="imgurl" />
                                <br />
                                <ElText type="primary"> 类别</ElText>
                                <ElInput v-model="category"></ElInput>
                                <br />
                                <button @click="takePhoto">{{ imgurl ? "重拍" : "拍照" }}</button>
                                <el-button @click="saveEdit">确定</el-button>
                                <el-button @click="cancelEdit">取消</el-button>
                            </div>
                        </div>
                    </el-dialog>
                    <ElContainer class="ElContainer_ptbjpl6s33">
                        <template #default="scope_ptbjpl6s33">
                            <ElAside>
                                <template #default="scope_2bm28hea2en">
                                    <ElText type="primary"> 备注</ElText>
                                </template>
                            </ElAside>
                            <ElMain>
                                <ElInput type="textarea" :rows="10" v-model="beizhu" :readonly="true"></ElInput>
                            </ElMain>
                        </template>
                    </ElContainer>
                    <ElContainer class="ElContainer_29qpnos12fs">
                        <template #default="scope_29qpnos12fs">
                            <ElAside>
                                <template #default="scope_7zq96u3k48">
                                    <ElText type="primary"> 是否增广</ElText>
                                </template>
                            </ElAside>
                            <ElMain>
                                <ElRadioGroup v-model="radio" :disabled="true">
                                    <ElRadio label="是" value=true>是</ElRadio>
                                    <ElRadio label="否" value=false>否</ElRadio>
                                </ElRadioGroup>
                            </ElMain>
                        </template>
                    </ElContainer>
                    <ElContainer class="ElContainer_v16ucl1w9s">
                        <template #default="scope_v16ucl1w9s">
                            <ElAside>
                                <template #default="scope_ix6w5epm74">
                                    <ElText type="primary"> 模型选择</ElText>
                                </template>
                            </ElAside>
                            <ElMain>
                                <el-select :disabled="true" v-model="taskStatus" multiple placeholder="请选择模型"
                                    style="min-width: 200px;">

                                </el-select>
                            </ElMain>
                        </template>
                    </ElContainer>
                </template>
            </ElContainer>
            <ElContainer class="ElContainer_29cj778vm7i">
                <template #default="scope_29cj778vm7i">
                    <ElMain>
                        <div class="button-group">
                            <el-button :type="isTaskRun ? 'primary' : 'danger'" @click="toggleTask">
                                {{ isTaskRun ? '运行' : '暂停' }}
                            </el-button>
                        </div>

                        <ElContainer class="ElContainer_2a1chhxvsvp">
                            <template #default="scope_2a1chhxvsvp">
                                <ElHeader class="header">
                                    <div class="centered-text">
                                        <ElText type="primary"> 模型结果</ElText>
                                    </div>
                                </ElHeader>
                                <ElMain class="ElMain_171n6m241ui">
                                    <ElTable :data="tableData">
                                        <template #default="scope_1fexz7zpuba">
                                            <ElTableColumn prop="modelName" label="模型名"></ElTableColumn>
                                            <ElTableColumn prop="total_accuracy" label="top-1_acc"></ElTableColumn>
                                            <ElTableColumn prop="total_precision" label="mean recall"></ElTableColumn>
                                            <ElTableColumn label="……"></ElTableColumn>
                                            <ElTableColumn label="操作">
                                                <template #default="{ row, column, $index }">
                                                    <router-link to="../view-result">
                                                        <ElButton type="primary" @click="saveModelName(row)">查看
                                                        </ElButton>
                                                    </router-link>
                                                </template>
                                            </ElTableColumn>
                                        </template>
                                    </ElTable>
                                </ElMain>
                            </template>
                        </ElContainer>
                    </ElMain>
                </template>
            </ElContainer>
        </template>
    </ElContainer>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent, getCurrentInstance, reactive } from 'vue';
import axios from 'axios';
import store from '../store/index';
import {
    ElHeader,
    ElText,
    ElContainer,
    ElAside,
    ElMain,
    ElInput,
    ElUpload,
    ElButton,
    ElRadioGroup,
    ElRadio,
    ElSelect,
    ElOption,
    ElTable,
    ElTableColumn
} from 'element-plus';

export default defineComponent({
    components: {
        ElHeader,
        ElText,

        ElContainer,
        ElAside,
        ElMain,
        ElInput,
        ElUpload,
        ElButton,
        ElRadioGroup,
        ElRadio,
        ElSelect,
        ElOption,
        ElTable,
        ElTableColumn
    },
    setup() {
        //查看任务也能添加数据并重新运行
        //
        const { proxy }: any = getCurrentInstance();
        let tableData = ref([]);
        const task_id = store.getters.getTaskId;
        const user_id = store.getters.getUserId;
        const role = store.getters.getUserRole;
        const radio = ref('true');
        const taskName = ref();
        const taskUrl = ref();
        const beizhu = ref();
        const taskStatus = ref([]);
        tableData = ref([])
        const isTaskRun = ref(true);
        const toggleTask = async () => {
            // 切换任务状态
            isTaskRun.value = !isTaskRun.value;
            // 调用接口开始或暂停任务
            let create4 = new FormData();
            create4.append('user_id', user_id);
            create4.append('task_id', task_id);
            if (radio.value == 'true') {
                await proxy.$api.positiveDataAugmentationUpload(create4);
            }
        };
        const file = ref(null);
        const handleFileUpload = (event) => {
            file.value = event.target.files[0];
        };
        let original_sample_id = null;
        const submitFile = async () => {
            let create2 = new FormData();
            create2.append('file', file.value);
            create2.append('user_id', user_id);
            create2.append('task_id', task_id);
            console.log('f:', create2.get('file'));
            let res = await proxy.$api.upload_task_zip(create2);
            original_sample_id = res.original_sample_id;
            console.log('osid', original_sample_id)
        };
        const saveModelName = (row) => {
            const modelName = row.modelName;
            store.commit('setModelName', modelName);
        };
        const getTaskModelData = async () => {
            let taskmodel1 = new FormData();
            taskmodel1.append('user_id', user_id);
            taskmodel1.append('task_id', task_id);
            let res = await proxy.$api.get_task_info(taskmodel1);
            //radio.value = res.taskData.isAug;
            taskName.value = res.taskData.taskName;
            taskUrl.value = res.taskData.taskDataUrl;
            beizhu.value = res.taskData.taskRemark;
            taskStatus.value = res.taskData.selectedModel;
            tableData.value = Object.values(res.modelData);
            console.log(res.modelData)
        };
        const category = ref();
        const editDialogVisible = ref(false);
        const canvasDom = ref(null);
        // video 控件对象
        const videoDom = ref(null);
        // 照片路径
        const imgurl = ref(null);
        const cameraFile = ref(null);

        const openWebCamera = () => {
            editDialogVisible.value = true;
            openCamera();
        }

        const openCamera = () => {
            // 检测浏览器是否支持mediaDevices
            if (!videoDom.value) {
                videoDom.value = document.createElement('video');
            }
            if (navigator.mediaDevices) {
                navigator.mediaDevices
                    // 开启视频，关闭音频
                    .getUserMedia({ audio: false, video: true })
                    .then((stream) => {
                        // 将视频流传入viedo控件
                        videoDom.value.srcObject = stream;
                        // 播放
                        videoDom.value.play();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                window.alert("该浏览器不支持开启摄像头，请更换最新版浏览器");
            }
        };

        const takePhoto = () => {
            // 如果已经拍照了就重新启动摄像头
            if (imgurl.value) {
                imgurl.value = null;
                openCamera()
                return;
            }
            // 设置画布大小与摄像大小一致
            canvasDom.value.width = videoDom.value.videoWidth;
            canvasDom.value.height = videoDom.value.videoHeight;
            // 执行画的操作
            canvasDom.value.getContext("2d").drawImage(videoDom.value, 0, 0);
            // 将结果转换为可展示的格式
            imgurl.value = canvasDom.value.toDataURL("image/jpeg");
            const canvas = canvasDom.value;
            canvas.toBlob(function (blob) {
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                cameraFile.value = file;
            }, 'image/jpeg');
            // 关闭摄像头
            stop();
        }
        // 关闭摄像头
        const stop = () => {
            let stream = videoDom.value.srcObject;
            if (!stream) return;
            let tracks = stream.getTracks();
            tracks.forEach((x) => {
                x.stop();
            });

        };

        const saveEdit = async () => {
            editDialogVisible.value = false;
            let create3 = new FormData();
            create3.append('file', cameraFile.value);
            create3.append('user_id', user_id);
            create3.append('task_id', task_id);
            create3.append('category', category.value);
            console.log('f:', create3.get('file'));
            //await proxy.$api.upload_task_camera(create3);
            imgurl.value = null;
        };
        const cancelEdit = () => {
            // Close the edit form dialog without saving
            editDialogVisible.value = false;
            imgurl.value = null;
            //videoDom.value.srcObject = null;
        };
        onMounted(() => {
            getTaskModelData();
        })
        const beforeUpload = (file) => {
            const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
            const whiteList = ["zip"];

            if (!whiteList.includes(fileSuffix)) {
                console.log("上传文件只能是zip格式");
                return false;
            }

            /*const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              console.log("上传文件大小不能超过 2MB");
              return false;
            }*/
        };

        const handleSuccess = (response, file, fileList) => {
            console.log('Upload successful');
            // After successful upload, you may want to trigger a refresh of the model data
            //getModelData(); // Assuming you have a function to fetch model data from the backend
        };

        const handleError = (error, file, fileList) => {
            console.error('Upload error:', error);
        };

        const state = reactive<Record<string, any>>({});
        return {
            isTaskRun, toggleTask, handleFileUpload,
            submitFile,
            category,
            canvasDom,
            videoDom,
            imgurl,
            cameraFile,
            takePhoto,
            openWebCamera,
            openCamera,
            saveEdit,
            cancelEdit,
            editDialogVisible, role, saveModelName, getTaskModelData, tableData, state, radio, taskStatus, taskUrl, taskName, beizhu, handleSuccess, handleError, beforeUpload
        };
    },
});
</script>
<style lang="scss" scoped>
.ElContainer_1886h3zcdmd {
    width: 100%;
    height: 100%;
}

.ElContainer_1iv0b0298rh {
    width: 100%;
    height: 100%;
}

.ElContainer_2h10qztny5k {
    width: 100%;
    height: 100%;
}

.ElContainer_1ahpie4u33f {
    width: 100%;
    height: 100%;
}

.ElContainer_ptbjpl6s33 {
    width: 100%;
    height: 100%;
}

.ElContainer_29qpnos12fs {
    width: 100%;
    height: 100%;
}

.ElContainer_v16ucl1w9s {
    width: 100%;
    height: 100%;
}

.ElContainer_29cj778vm7i {
    width: 100%;
    height: 100%;
}

.ElContainer_2a1chhxvsvp {
    width: 100%;
    height: 100%;
}

.ElMain_171n6m241ui {
    height: 100%;
}

.header {
    display: flex;
    align-items: center;
    justify-content: center;
}

.centered-text {
    text-align: center;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    /* 添加空间，这里是按钮之间的间距 */
}

.button-group>*:not(:last-child) {
    margin-right: 10px;
    /* 设置按钮之间的间距 */
}
</style>