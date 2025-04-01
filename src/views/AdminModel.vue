<template>

  <ElContainer class="ElContainer_1886h3zcdmd">
    <template #default="scope_1886h3zcdmd">
      <ElContainer class="ElContainer_29cj778vm7i">
        <template #default="scope_29cj778vm7i">
          <ElMain>
            <ElRow>
              <ElText type="primary">模型管理</ElText>
            </ElRow>
            <el-form label-width="50px">
              <el-row>
                <elcol :span="6">
                  <ElInput v-model="modelName" placeholder="请输入模型名">
                  </ElInput>
                </elcol>
                <elcol :span="3">
                  <el-form-item>
                    <ElButton type="primary" @click="searchModels"> 查找</ElButton>
                  </el-form-item>
                </elcol>
                <elcol :span="3">
                  <el-form-item>
                    <ElButton type="danger" @click="reset"> 重置</ElButton>
                  </el-form-item>
                </elcol>
                <elcol :span="12" text-align: right>
                  <el-form-item>

                    <input type="file" @change="handleFileUpload">
                    <el-button type="primary" @click="submitModel">
                      导入模型
                    </el-button>

                  </el-form-item>
                </elcol>
              </el-row>
            </el-form>
            <!--
            <ElRow>
              <elcol>
                <ElButton type="danger" @click="deleteModels"> 批量删除</ElButton>
              </elcol>
            </ElRow>
          -->


            <ElTable :data="adminModelData" :stripe="false" :border="false">
              <template #default="scope">
                <ElTableColumn min-width="6%" label="列名" type="selection" :reserve-selection="false"></ElTableColumn>
                <ElTableColumn min-width="10%" prop="modelId" label="模型id"></ElTableColumn>
                <ElTableColumn min-width="15%" prop="modelName" label="模型名称"></ElTableColumn>
                <ElTableColumn min-width="6%" prop="lr" label="lr"></ElTableColumn>
                <ElTableColumn min-width="6%" label="epoch" prop="epoch"></ElTableColumn>
                <ElTableColumn min-width="6%" label="batch size" prop="batchSize"></ElTableColumn>
                <ElTableColumn min-width="6%" label="extend1"></ElTableColumn>
                <ElTableColumn min-width="6%" prop="" label="extend2"></ElTableColumn>
                <ElTableColumn min-width="15%" label="操作">
                  <template #default="{ row, column, $index }">
                    <div class="button-group">
                      <ElButton type="primary" @click="editModel(row)"> 编辑
                      </ElButton>
                      <ElButton type="danger" @click="deleteModel(row)"> 删除</ElButton>
                    </div>
                  </template>
                </ElTableColumn>
              </template>
            </ElTable>

            <el-dialog v-model="editDialogVisible">
              <el-form :model="editForm">
                <el-form-item label="lr">
                  <el-input v-model="editForm.lr"></el-input>
                </el-form-item>
                <el-form-item label="epoch">
                  <el-input v-model="editForm.epoch"></el-input>
                </el-form-item>
                <el-form-item label="batchSize">
                  <el-input v-model="editForm.batchSize"></el-input>
                </el-form-item>
                <!-- Save and Cancel buttons -->
                <el-form-item>
                  <el-button type="primary" @click="saveEdit">保存</el-button>
                  <el-button @click="cancelEdit">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

          </ElMain>
          <ElFooter>
            <!--
            <ElPagination :total="totalModels" :background="true" @current-change="handlePageChange"></ElPagination>
          -->
          </ElFooter>
        </template>
      </ElContainer>
    </template>
  </ElContainer>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from 'vue';
import store from '../store/index';
import axios from 'axios';
import {
  ElHeader,
  ElText,
  ElContainer,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMain,
  ElInput,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElFooter
} from 'element-plus';

export default defineComponent({
  components: {
    ElHeader,
    ElText,
    ElContainer,
    ElAside,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElMain,
    ElInput,
    ElButton,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElFooter
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    let adminModelData = ref([]);
    const modelName = ref('');
    const selectedModelIds = ref([]);
    const editDialogVisible = ref(false);
    const totalModels = ref(0);
    const currentPage = ref(1);
    const editForm = ref({
      modelId: '',
      lr: '',
      epoch: '',
      batchSize: ''
    });
    let editedRowIndex = null;


    const file = ref(null);
    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };
    const submitModel = async () => {
      let adminmodel4 = new FormData();
      adminmodel4.append('file', file.value);
      console.log('f:', adminmodel4.get('file'));
      await proxy.$api.upload_pth(adminmodel4);
      getModelData();
    };

    const editModel = (row) => {
      editDialogVisible.value = true;
      editForm.value = { ...row }; // Copy row data to editForm
      editedRowIndex = adminModelData.value.indexOf(row);
    }

    const saveEdit = async () => {
      await proxy.$api.saveModel(editForm.value);
      editDialogVisible.value = false;
      getModelData();
    };

    const cancelEdit = () => {
      // Close the edit form dialog without saving
      editDialogVisible.value = false;
    };

    let modelId = '';
    const deleteModel = async (row) => {
      let adminmodel3 = new FormData();
      modelId = row.modelId;
      adminmodel3.append('modelId', modelId);
      await proxy.$api.admin_model_delete_one(adminmodel3);
      getModelData();
    }

    const beforeUpload = (file) => {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["pth"];

      if (!whiteList.includes(fileSuffix)) {
        console.log("上传文件只能是pth格式");
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
      getModelData(); // Assuming you have a function to fetch model data from the backend
    };

    const handleError = (error, file, fileList) => {
      console.error('Upload error:', error);
    };


    const searchModels = async () => {
      let adminmodel1 = new FormData();
      adminmodel1.append('model_name', modelName.value);
      let res = await proxy.$api.searchAdminModel(adminmodel1);
      adminModelData.value = res.AdminModelData;
    };

    const reset = () => {
      modelName.value = '';
      getModelData();
    };

    const deleteModels = () => {
      /*await proxy.$api.deleteUserTasks({ userId, taskIds: selectedTaskIds.value });
     console.log("批量删除成功");
     console.log(selectedTaskIds);
     getUserTaskData();*/
    };
    const getModelData = async () => {
      let res = await proxy.$api.getAdminModel();
      adminModelData.value = res.AdminModelData;
    }

    const handlePageChange = (newPage) => {
      currentPage.value = newPage;
      // You may want to make an API call here to fetch data for the new page
      // Example:
      // fetchDataForPage(newPage);
    };

    const fetchDataForPage = (page) => {
      // Make API call to fetch data for the specified page
      // Example using axios:
      // axios.get(`/adminModel/getModel?page=${page}`).then((res) => {
      //   adminModelData.value = res.data.data.adminModelData;
      // });
    };

    onMounted(() => {
      getModelData();
    })
    const state = reactive<Record<string, any>>({});
    return {
      adminModelData, modelName, editDialogVisible, editForm, editModel, saveEdit, submitModel, handleFileUpload,
      cancelEdit, handleSuccess, handleError, deleteModel, beforeUpload, searchModels, reset, deleteModels, state, totalModels, currentPage, handlePageChange
    };
  }
});
</script>
<style lang="scss" scoped>
.ElContainer_1886h3zcdmd {
  width: 100%;
  height: 100%;
}

.ElContainer_1byvmp8ie0z {
  width: 100%;
  height: 100%;
}



.ElContainer_11moncyq0n1 {
  width: 100%;
  height: 100%;
}

.ElContainer_64doe6rhcd {
  width: 100%;
  height: 100%;
}

.ElContainer_1xc2uxssbrc {
  width: 100%;
  height: 100%;
}

.ElContainer_29cj778vm7i {
  width: 100%;
  height: 100%;
}

.ElContainer_k79sl345c0 {
  width: 100%;
  height: 10%;
}

.ElInput_58h6847qb4 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 150px;
}
</style>