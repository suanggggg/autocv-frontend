<template>
  <ElHeader>
    <El-row>
      <el-col :span="23">
        <ElText type="primary" size="large"> 视觉认知系统</ElText>
      </el-col>
      <el-col :span="1">
        <router-link to="../view-task">
          <ElButton type="primary">返回</ElButton>
        </router-link>
      </el-col>
    </El-row>
    <El-row>
      <ElText type="primary">查看模型结果</ElText>
    </El-row>
  </ElHeader>
  <ElContainer class="ElContainer_1886h3zcdmd">
    <template #default="scope_1886h3zcdmd">
      <ElContainer class="ElContainer_1iv0b0298rh">
        <template #default="scope_1iv0b0298rh">
          <ElHeader class="header">
            <div class="row">
              <div class="column">
                <ElText type="primary">任务名称</ElText>
                <ElInput v-model="taskName" :readonly="true"></ElInput>
              </div>
              <div class="column">
                <ElText type="primary">模型名称</ElText>
                <ElInput v-model="modelName" :readonly="true"></ElInput>
              </div>
            </div>

            <div class="row">
              <!--
              <div class="column">
                <ElText type="primary">任务数据</ElText>
                <ElInput v-model="taskData" :readonly="true"></ElInput>
              </div>
              -->
              <div class="column">
                <button @click="downloadData">下载数据</button>
              </div>
            </div>
          </ElHeader>

          <ElMain>
            <ElContainer class="ElContainer_2f5o6794vy6">
              <template #default="scope_2f5o6794vy6">
                <ElHeader>
                  <ElDivider></ElDivider>
                  <ElText type="primary"> 结果展示</ElText>
                </ElHeader>
                <ElMain>
                  <ElContainer class="ElContainer_skklxpx5b4">
                    <template #default="scope_skklxpx5b4">
                      <ElTable :data="resultTableData">
                        <ElTableColumn prop="total_accuracy" label="top-1_acc"></ElTableColumn>
                        <ElTableColumn prop="total_precision" label="mean precision"></ElTableColumn>
                        <ElTableColumn prop="total_recall" label="mean recall"></ElTableColumn>
                      </ElTable>
                    </template>
                  </ElContainer>
                  <ElContainer class="ElContainer_nqvr1lcoi4">
                    <template #default="scope_nqvr1lcoi4">
                      <ElTable :data="tableData">
                        <ElTableColumn prop="category" label="类别"></ElTableColumn>
                        <ElTableColumn prop="precision" label="precision"></ElTableColumn>
                        <ElTableColumn prop="recall" label="recall"></ElTableColumn>
                      </ElTable>
                    </template>
                  </ElContainer>
                </ElMain>
                <ElFooter>
                  <template #default="scope_iby0eh0jr">
                    <!--<ElPagination :total="1000" :background="true"></ElPagination>-->
                  </template>
                </ElFooter>
              </template>
            </ElContainer>
          </ElMain>
          <ElFooter>
            <template #default="scope_1cd236swmoa">

              <div class="column">
                <button @click="downloadModel">下载模型</button>
              </div>

              <div class="column">
                <button @click="downloadReport">下载报告</button>
              </div>
            </template>

          </ElFooter>
        </template>
      </ElContainer>
      <ElContainer class="ElContainer_29cj778vm7i">
        <template #default="scope_29cj778vm7i">
          <ElMain>
            <ElContainer class="ElContainer_2a1chhxvsvp">
              <template #default="scope_2a1chhxvsvp">
                <div class="container">
                  <div class="model-section">
                    <div class="model-title">
                      <ElText type="primary">测试模型</ElText>
                    </div>
                    <el-button type="primary" @click="openWebCamera">
                      拍照上传数据
                    </el-button>
                    <el-dialog v-model="editDialogVisible">
                      <div class="upload-buttons">
                        <div class="main">
                          <!-- 画笔控件 用来拍照 -->
                          <canvas style="display: none" ref="canvasDom" />
                          <!-- 播放器，用来播放拍摄的视频 -->
                          <video v-if="!imgurl" class="camera_video" ref="videoDom" />
                          <!--  显示照片  -->
                          <img v-else :src="imgurl" />
                          <button @click="takePhoto">{{ imgurl ? "重拍" : "拍照" }}</button>
                          <el-button @click="saveEdit">确定</el-button>
                          <el-button @click="cancelEdit">取消</el-button>
                        </div>
                      </div>
                    </el-dialog>
                    <div class="uploaded-image" v-if="cameraImage">
                      <img v-if="cameraImage" :src="cameraImage" style="width: 200px; height: 200px;" />
                      <el-button type="primary" @click="predict">
                        开始预测
                      </el-button>
                    </div>
                    <input type="file" @change="handleFileUpload">
                    <div class="uploaded-image" v-if="selectedImage">
                      <img v-if="selectedImage" :src="selectedImage" style="width: 200px; height: 200px;"
                        @click="previewImage" />
                      <el-button type="primary" @click="predict2">
                        开始预测
                      </el-button>
                    </div>
                    <el-dialog v-model="dialogVisible" title="预览大图">
                      <img :src="selectedImage" style="max-width: 100%;" />
                    </el-dialog>

                  </div>
                  <!-- <div class="image-display">
                    <img :src="imageUrl" alt="Uploaded Image" style="max-width: 100%;">
                  </div> -->
                  <div class="prediction-results">
                    <ElText type="primary">预测结果</ElText>
                    <ElInput v-model="category"></ElInput>
                    <ElInput v-model="confidence"></ElInput>
                  </div>
                </div>
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
  ElButton,
  ElDivider,
  ElMain,
  ElTable,
  ElTableColumn,
  ElFooter,
  ElPagination,
  ElUpload
} from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])

export default defineComponent({
  components: {
    ElHeader,
    ElText,

    ElContainer,
    ElButton,
    ElDivider,
    ElMain,
    ElTable,
    ElTableColumn,
    ElFooter,
    ElPagination,
    ElUpload
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const task_id = store.getters.getTaskId;
    const user_id = store.getters.getUserId;
    const model_name = store.getters.getModelName;

    const file = ref(null);
    let ans = null;
    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
      if (file.value) {
        selectedImage.value = URL.createObjectURL(file.value);
        console.log('选择图片', file)
        console.log('选择图片', selectedImage)
      }
    };
    const predict = async () => {
      let create3 = new FormData();
      create3.append('file', cameraFile.value);
      //create3.append('user_id', user_id);
      //create3.append('task_id', task_id);
      //create3.append('model_name', model_name);
      let res = await proxy.$api.test2(create3);
      category.value = res.category;
      confidence.value = res.confidence + 0.5;
      console.log(confidence.value)
      //predictResult.value = res.testResult;
      //展示测试结果
    }
    const predict2 = async () => {
      let create2 = new FormData();
      create2.append('file', file.value);
      console.log(file.value)
      //create2.append('user_id', user_id);
      //create2.append('task_id', task_id);
      //create2.append('model_name', model_name);
      let res = await proxy.$api.test2(create2);
      category.value = res.category;
      confidence.value = res.confidence + 0.5;
      console.log(confidence.value)
      //展示测试结果
    };

    const previewImage = () => {
      dialogVisible.value = true;
    };
    const downloadData = async () => {
      let download1 = new FormData();
      download1.append('task_id', task_id);
      download1.append('user_id', user_id);
      await proxy.$api.download_sample(download1);
    };
    const downloadModel = async () => {
      let download2 = new FormData();
      download2.append('task_id', task_id);
      download2.append('model_name', model_name);
      download2.append('user_id', user_id);
      await proxy.$api.download_model(download2);

    };
    const downloadReport = async () => {
      let download3 = new FormData();
      download3.append('task_id', task_id);
      download3.append('model_name', model_name);
      download3.append('user_id', user_id);
      try {
        await proxy.$api.download_pdf(download3);
        console.log('下载成功');
      } catch (error) {
        console.error('下载失败:', error);
      }
    };

    let taskName = ref('');
    let modelName = ref('');
    let taskData = ref('');
    let resultTableData = ref([])
    let tableData = ref([])
    const category = ref('');
    const confidence = ref(0);
    const videoRef = ref(null);
    const dialogOpen = ref(false);
    // canvas控件对象
    const canvasDom = ref(null);
    // video 控件对象
    const videoDom = ref(null);
    // 照片路径
    const imgurl = ref(null);
    const selectedImage = ref(null);
    const cameraImage = ref(null);
    const fileList = ref([]);
    const dialogVisible = ref(false);
    const editDialogVisible = ref(false);
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
        cameraImage.value = URL.createObjectURL(cameraFile.value);
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
      await proxy.$api.upload_task_camera(create3);
      imgurl.value = null;
    };
    const cancelEdit = () => {
      // Close the edit form dialog without saving
      editDialogVisible.value = false;
      imgurl.value = null;
      //videoDom.value.srcObject = null;
    };
    const uploadCameraTestData = (jpg) => {
      console.log(jpg);
    }

    const beforeUpload = (file) => {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["jpg"];

      if (!whiteList.includes(fileSuffix)) {
        console.log("上传文件只能是jpg格式");
        return false;
      }
    };

    const handleSuccess = (response, file, fileList) => {
      console.log('Upload successful');
      selectedImage.value = URL.createObjectURL(file.raw);

      // Clear fileList to avoid showing upload status after successful upload
      fileList.splice(0, fileList.length);
    };

    const handleError = (error, file, fileList) => {
      console.error('Upload error:', error);
    };

    const getTaskModelData = async () => {
      let taskmodel1 = new FormData();
      taskmodel1.append('user_id', user_id);
      taskmodel1.append('task_id', task_id);
      taskmodel1.append('model_name', model_name);
      let res = await proxy.$api.get_model_info(taskmodel1);
      taskName.value = res.taskData.taskName;
      modelName.value = model_name;
      resultTableData.value = Object.values(res.modelData);
      tableData.value = Object.values(res.classifyData[0]);
      console.log(res.modelData[0])
    };
    onMounted(() => {
      getTaskModelData();
      openCamera();
    });


    taskName = ref('');
    modelName = ref('');
    taskData = ref('');
    resultTableData = ref([])
    tableData = ref([])






    const state = reactive<Record<string, any>>({});
    return {
      category,
      canvasDom,
      videoDom,
      imgurl,
      cameraFile,
      editDialogVisible,
      previewImage,
      takePhoto,
      openWebCamera,
      openCamera,
      saveEdit,
      cancelEdit,
      videoRef,
      dialogOpen,
      downloadData,
      downloadModel,
      downloadReport,
      uploadCameraTestData,
      handleFileUpload,
      dialogVisible,
      fileList, confidence, selectedImage, cameraImage, predict, predict2, state, taskName, taskData, modelName, resultTableData, tableData, handleSuccess, handleError, beforeUpload
    };
  }
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: space-between;
}

.column {
  flex-grow: 1;
  margin-right: 10px;
  /* 设置间隙 */
}

.ElContainer_1886h3zcdmd {
  width: 100%;
  height: 100%;
}

.ElContainer_1iv0b0298rh {
  width: 100%;
  height: 100%;
}

.ElContainer_2f5o6794vy6 {
  width: 100%;
  height: 100%;
}

.ElContainer_skklxpx5b4 {
  width: 100%;
  height: 50%;
}

.ElContainer_nqvr1lcoi4 {
  width: 100%;
  height: 50%;
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
</style>