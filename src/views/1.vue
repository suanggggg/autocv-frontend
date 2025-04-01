<template>
  <ElHeader>
    <El-row>
      <el-col :span="23">
        <ElText type="primary" size="large"> 视觉认知系统</ElText>
      </el-col>
      <el-col :span="1">
        <router-link to="../user/userTasks">
          <ElButton type="primary">返回</ElButton>
        </router-link>
      </el-col>
    </El-row>
    <El-row>
      <ElText type="primary"> 创建任务</ElText>
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
                <ElInput v-model="taskName"></ElInput>
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
                <el-upload ref="uploadFileRef" accept=".zip" :clear-files="true" :limit="1"
                  :before-upload="beforeUpload" action="" :auto-upload="false">
                  <el-button type="primary">
                    选择文件
                  </el-button>
                </el-upload>
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
                <ElInput type="textarea" :rows="10" v-model="beizhu"></ElInput>
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
                <ElRadioGroup v-model="radio">
                  <ElRadio label="是" value="true">是</ElRadio>
                  <ElRadio label="否" value="false">否</ElRadio>
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
                <el-select v-model="selectmodel" multiple placeholder="请选择模型" style="min-width: 200px;">
                  <el-option v-for="status in selectmodelOptions" :key="status" :label="status" :value="status" />
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
              <router-link to="../user/userTasks">
                <ElButton type="primary" @click="createTask">创建并运行</ElButton>
              </router-link>
              <ElButton type="danger"> 暂停</ElButton>
            </div>

            <ElContainer class="ElContainer_2a1chhxvsvp">
              <template #default="scope_2a1chhxvsvp">
                <ElHeader class="header">
                  <div class="centered-text">
                    <ElText type="primary"> 模型结果</ElText>
                  </div>
                </ElHeader>
                <ElMain class="ElMain_171n6m241ui">
                  <ElTable :data="[]">
                    <template #default="scope_1fexz7zpuba">
                      <ElTableColumn prop="" label="模型名"></ElTableColumn>
                      <ElTableColumn prop="" label="top-1_acc"></ElTableColumn>
                      <ElTableColumn prop="" label="top-5_acc"></ElTableColumn>
                      <ElTableColumn label="extend"></ElTableColumn>
                      <ElTableColumn label="操作">
                        <template #default="{ row, column, $index }">
                          <ElButton type="primary"> 查看</ElButton>
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

/*    uploadFileData(params) {
        return request({
            url: '/uploadFileData',
            method: 'post',
            data: params,
            mock: true
        })
    },
    uploadCameraData(params) {
        return request({
            url: '/uploadCameraData',
            method: 'post',
            data: params,
            mock: true
        })
    },
    createTask(params) {
        return request({
            url: '/createTask',
            method: 'post',
            data: params,
            mock: true
        })
    },
*/

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
    const { proxy }: any = getCurrentInstance();
    const userId = store.getters.getUserId;
    const taskId = store.getters.getTaskId;
    let files = null;
    const uploadFileRef = ref();
    const category = ref();

    const submitFile = async () => {
      uploadFileRef.value.submit();
      let create2 = new FormData();
      create2.append('file', files[0]);
      create2.append('user_id', userId);
      create2.append('task_id', taskId);
      console.log('f:', create2.get('file'));
      await proxy.$api.upload_task_zip(create2);
    };

    const createTask = async () => {
      let create1 = new FormData();
      create1.append('user_id', userId);
      create1.append('task_id', taskId);
      create1.append('taskName', taskName.value);
      create1.append('taskRemark', beizhu.value);
      create1.append('isAug', radio.value);
      for (const model of selectmodel.value) {
        create1.append('selectedModel', model);
      }
      await proxy.$api.create_task(create1);
    }

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
      imgurl.value = canvasDom.value;
      imgurl.value.toBlob(function (blob) {
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
      //saveModel(editForm.value);
      let create3 = new FormData();
      create3.append('file', cameraFile.value);
      create3.append('user_id', userId);
      create3.append('task_id', taskId);
      create3.append('category', category.value);
      console.log('f:', create3.get('file'));
      await proxy.$api.upload_task_camera(create3);
      imgurl.value = null;
    };
    const cancelEdit = () => {
      // Close the edit form dialog without saving
      editDialogVisible.value = false;
      imgurl.value = null;
    };

    const radio = ref('');
    const taskName = ref('');
    const beizhu = ref('');
    const selectmodel = ref([]);
    const selectmodelOptions = ref(['resnet', 'vgg16']);
    const beforeUpload = (file) => {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["zip"];

      if (!whiteList.includes(fileSuffix)) {
        console.log("上传文件只能是zip格式");
        return false;
      }
      files = [];
      files.push(file);
      return false;
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
      files,
      uploadFileRef,
      category,
      createTask,
      submitFile,
      canvasDom,
      videoDom,
      imgurl,
      cameraFile,
      takePhoto,
      openWebCamera,
      openCamera,
      saveEdit,
      cancelEdit,
      editDialogVisible, state, radio, selectmodel, selectmodelOptions, taskName, beizhu, handleSuccess, handleError, beforeUpload
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