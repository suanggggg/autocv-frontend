<template>

  <ElContainer class="ElContainer_1886h3zcdmd">
    <template #default="scope_1886h3zcdmd">

      <ElContainer class="ElContainer_29cj778vm7i">
        <template #default="scope_29cj778vm7i">
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
                    <ElDatePicker v-model="dateRange" type="daterange" start-placeholder="开始时间" end-placeholder="结束时间">
                    </ElDatePicker>
                  </el-form-item>
                </elcol>
                <elcol :span="12">
                  <el-form-item>
                    <el-select v-model="taskStatus" placeholder="请选择状态" style="min-width: 200px;">
                      <el-option label="waiting" value="waiting" />
                      <el-option label="augmenting" value="augmenting" />
                      <el-option label="training" value="training" />
                      <el-option label="completed" value="completed" />
                    </el-select>
                  </el-form-item>
                </elcol>
                <elcol :span="3">
                  <el-form-item>
                    <ElButton type="primary" @click="searchUserTasks"> 查找</ElButton>
                  </el-form-item>
                </elcol>
                <elcol :span="3">
                  <el-form-item>
                    <ElButton type="danger" @click="reset"> 重置</ElButton>
                  </el-form-item>
                </elcol>
                <elcol :span="3">
                  <el-form-item>
                    <ElButton type="primary" @click="createUserTask">创建任务</ElButton>
                  </el-form-item>
                </elcol>
              </el-row>
            </el-form>
            <!--
            <ElRow>
              <ElButton type="danger" @click="deleteUserTasks"> 批量删除</ElButton>
            </ElRow>
          -->
            <ElTable :data="userTaskData" :stripe="false" :border="false">
              <template #default="scope_2o7s7mie40o">
                <ElTableColumn min-width="6%" prop="selectedTaskIds" type="selection" :reserve-selection="false">
                </ElTableColumn>
                <ElTableColumn min-width="10%" prop="taskId" label="任务id"></ElTableColumn>
                <ElTableColumn min-width="15%" prop="taskName" label="任务名称"></ElTableColumn>
                <!--<ElTableColumn min-width="6%" prop="sampleNum" label="样本数量"></ElTableColumn>-->
                <ElTableColumn min-width="6%" prop="augStatus" label="是否增广"></ElTableColumn>
                <ElTableColumn min-width="10%" prop="taskStatus" label="任务状态"></ElTableColumn>
                <ElTableColumn min-width="15%" prop="createdTime" label="创建时间"></ElTableColumn>
                <ElTableColumn min-width="15%" prop="saveTime" label="模型保存时间"></ElTableColumn>
                <ElTableColumn min-width="12%" label="操作">
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
            <ElPagination :total="totalUserTasks" :background="true" @current-change="handlePageChange"></ElPagination>
          -->
          </ElFooter>
        </template>
      </ElContainer>
    </template>
  </ElContainer>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent, getCurrentInstance, reactive } from 'vue';
import store from '../store/index';
import router from '@/router';
import {
  ElHeader,
  ElText,
  ElContainer,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElForm,
  ElMain,
  ElInput,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElFooter
} from 'element-plus';
import { dataType } from 'element-plus/es/components/table-v2/src/common';

export default defineComponent({
  name: 'UserHome1',
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
    ElDatePicker,
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

    let userTaskData = ref([]);
    const selectedTaskIds = ref([]);
    const totalUserTasks = ref(0);
    const currentPage = ref(1);
    const taskName = ref('');
    const dateRange = ref([null, null]);
    const taskStatus = ref('');
    const userId = store.getters.getUserId;
    let task_id = '';

    const reset = () => {
      taskName.value = '';
      dateRange.value = [null, null];
      taskStatus.value = '';
      getUserTaskData();
    };

    const deleteUserTask = async (row) => {
      let user3 = new FormData();
      task_id = row.taskId;
      user3.append('task_id', task_id);
      await proxy.$api.delete_task_one(user3);
      getUserTaskData();
    }

    const deleteUserTasks = async () => {
      /*await proxy.$api.deleteUserTasks({ userId, taskIds: selectedTaskIds.value });
      console.log("批量删除成功");
      console.log(selectedTaskIds);
      getUserTaskData();*/
    };

    const createUserTask = async () => {
      let user4 = new FormData();
      user4.append('user_id', userId);
      console.log(userId);
      let res = await proxy.$api.add_task(user4);
      store.commit('setTaskId', res.task_id);
      console.log('restaksid:', res.task_id)
      router.push({ path: 'create-task' });
    };

    const saveTaskId = (row) => {
      const taskId = row.taskId;
      store.commit('setTaskId', taskId);
    };
    //查找任务
    const searchUserTasks = async () => {
      let user2 = new FormData();
      user2.append('taskName', taskName.value);
      user2.append('startDate', dateRange.value[0]);
      user2.append('endDate', dateRange.value[1]);
      user2.append('taskStatus', taskStatus.value);
      let res = await proxy.$api.search(user2);
      userTaskData.value = Object.values(res.task);
    };

    //获取任务
    const getUserTaskData = async () => {
      console.log(userId);
      let user1 = new FormData();
      user1.append('user_id', userId);
      let res = await proxy.$api.home(user1);
      console.log(res);
      userTaskData.value = Object.values(res.task);
      //totalUserTasks.value = res.totalUserTasks;
    };

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
      getUserTaskData();
    })
    const state = reactive<Record<string, any>>({});
    return { createUserTask, saveTaskId, selectedTaskIds, taskName, dateRange, taskStatus, totalUserTasks, handlePageChange, searchUserTasks, reset, deleteUserTask, deleteUserTasks, userTaskData, state };
  },

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