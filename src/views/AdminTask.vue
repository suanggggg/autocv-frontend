<template>
  <ElContainer class="ElContainer_1886h3zcdmd">
    <template #default="scope_1886h3zcdmd">

      <ElContainer class="ElContainer_29cj778vm7i">
        <ElMain>
          <ElRow>
            <ElText type="primary"> 任务管理</ElText>
          </ElRow>
          <el-form label-width="50px">
            <el-row>
              <elcol :span="6">
                <ElInput v-model="taskName" placeholder="请输入任务名称">
                </ElInput>
              </elcol>
              <elcol :span="6">
                <el-form-item>
                  <ElInput v-model="username" placeholder="请输入用户名">
                  </ElInput>
                </el-form-item>
              </elcol>
              <elcol :span="12">
                <el-form-item>
                  <el-select v-model="taskStatus" :multiple="false" placeholder="请选择任务状态" style="min-width: 200px;">
                    <el-option v-for="status in taskStatusOptions" :key="status" :label="status" :value="status" />
                  </el-select>
                </el-form-item>
              </elcol>
              <elcol :span="3">
                <el-form-item>
                  <ElButton type="primary" @click="searchAdminTasks"> 查找</ElButton>
                </el-form-item>
              </elcol>
              <elcol :span="3">
                <el-form-item>
                  <ElButton type="danger" @click="reset"> 重置</ElButton>
                </el-form-item>
              </elcol>
            </el-row>
          </el-form>
          <!--
          <ElRow>
            <ElButton type="danger" @click="deleteUserTasks"> 批量删除</ElButton>
          </ElRow>
        -->
          <ElTable :data="adminTaskData" :stripe="false" :border="false">
            <template #default="scope_2o7s7mie40o">
              <ElTableColumn label="列名" type="selection" :reserve-selection="false"></ElTableColumn>
              <ElTableColumn prop="taskId" label="任务id"></ElTableColumn>
              <ElTableColumn prop="taskName" label="任务名称"></ElTableColumn>
              <ElTableColumn prop="username" label="用户名"></ElTableColumn>
              <ElTableColumn prop="taskStatus" label="任务状态"></ElTableColumn>
              <ElTableColumn prop="createdTime" label="创建时间"></ElTableColumn>
              <ElTableColumn prop="saveTime" label="模型保存时间"></ElTableColumn>
              <ElTableColumn label="操作">
                <template #default="{ row, column, $index }">
                  <router-link to="../view-task">
                    <ElButton type="primary" @click="saveTaskId(row)">查看</ElButton>
                  </router-link>
                  <ElButton type="danger" @click="deleteUserTask(row)"> 删除</ElButton>
                </template>
              </ElTableColumn>
            </template>
          </ElTable>

        </ElMain>
        <ElFooter>
          <!--
          <ElPagination :total="1000" :background="true" @current-change="handlePageChange"></ElPagination>
        -->

        </ElFooter>
      </ElContainer>
    </template>
  </ElContainer>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from 'vue';
import store from '../store/index';
import axios from "axios";
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
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElFooter,
  ElRow
} from 'element-plus';

export default defineComponent({
  name: 'UserHomeCopy',
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
    ElSelect,
    ElOption,
    ElButton,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElFooter
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const taskName = ref('');
    const username = ref('');
    const taskStatus = ref('');
    const taskStatusOptions = ['waiting', 'augmenting', 'training', 'completed'];
    const tasks = reactive([]);
    //const userId = store.getters.getUserId;
    const userId = '1';
    // Filtered tasks based on user input
    const filteredTasks = ref([]);
    // Total number of tasks (for pagination)
    const totalTasks = ref(tasks.length);

    const saveTaskId = (row) => {
      const taskId = row.taskId;
      store.commit('setTaskId', taskId);
    };

    const searchAdminTasks = async () => {
      let admintask1 = new FormData();
      admintask1.append('username', username.value);
      admintask1.append('taskName', taskName.value);
      admintask1.append('taskStatus', taskStatus.value);
      let res = await proxy.$api.searchAdminTask(admintask1);
      adminTaskData.value = res.adminTaskData;
    };

    const reset = () => {
      taskName.value = '';
      username.value = '';
      taskStatus.value = '';
      getAdminTaskData();
    };

    const viewTask = (task) => {

    };

    let task_id = '';
    const deleteUserTask = async (row) => {
      let admintask3 = new FormData();
      task_id = row.taskId;
      admintask3.append('task_id', task_id);
      await proxy.$api.delete_task_one(admintask3);
      getAdminTaskData();
    }

    const deleteUserTasks = async () => {
      /*await proxy.$api.deleteUserTasks({ userId, taskIds: selectedTaskIds.value });
      console.log("批量删除成功");
      console.log(selectedTaskIds);
      getUserTaskData();*/
    };

    const handlePageChange = (page) => {

    };

    let adminTaskData = ref([]);
    const getAdminTaskData = async () => {
      console.log("getadmintask123")
      let res = await proxy.$api.getAdminTask();
      adminTaskData.value = res.AdminTaskData;
      //totalUserTasks.value = res.totalUserTasks;
    };

    onMounted(() => {
      getAdminTaskData(); // Fetch data when the component is mounted
    });

    const state = reactive<Record<string, any>>({});
    return { saveTaskId, getAdminTaskData, deleteUserTask, deleteUserTasks, adminTaskData, state, taskName, username, taskStatus, taskStatusOptions, tasks, searchAdminTasks, reset, viewTask, handlePageChange };
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

.ElInput_m9pl94xnpk {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 150px;
  left: 10px;
}
</style>