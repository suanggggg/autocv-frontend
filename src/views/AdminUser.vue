<template>

  <ElContainer class="ElContainer_1886h3zcdmd">
    <template #default="scope_1886h3zcdmd">

      <ElContainer class="ElContainer_29cj778vm7i">
        <template #default="scope_29cj778vm7i">
          <ElMain>
            <ElRow>
              <ElText type="primary"> 用户管理</ElText>
            </ElRow>
            <el-form label-width="50px">
              <el-row>
                <elcol :span="6">
                  <ElInput v-model="username" placeholder="请输入用户名">
                  </ElInput>
                </elcol>
                <elcol :span="3">
                  <el-form-item>
                    <ElButton type="primary" @click="searchUsers"> 查找</ElButton>
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
              <ElButton type="danger" @click="deleteUsers"> 批量删除</ElButton>
            </ElRow>
          -->
            <ElTable :data="adminUserData" :stripe="false" :border="false">
              <template #default="scope_2o7s7mie40o">
                <ElTableColumn label="列名" type="selection" :reserve-selection="false"></ElTableColumn>
                <ElTableColumn prop="user_id" label="用户id"></ElTableColumn>
                <ElTableColumn prop="username" label="用户名称"></ElTableColumn>
                <ElTableColumn prop="email" label="邮箱"></ElTableColumn>
                <ElTableColumn label="手机号" prop="phone"></ElTableColumn>
                <!-- <ElTableColumn label="创建时间" prop="createTime"></ElTableColumn>-->
                <ElTableColumn prop="totalTask" label="可创建任务数量"></ElTableColumn>
                <ElTableColumn prop="totalImg" label="可上传图片数量"></ElTableColumn>
                <ElTableColumn label="操作">
                  <template #default="{ row, column, $index }">
                    <ElButton type="primary" @click="editUser(row)"> 编辑</ElButton>
                    <ElButton type="danger" @click="deleteUser(row)"> 删除</ElButton>
                  </template>
                </ElTableColumn>
              </template>
            </ElTable>

            <el-dialog v-model="editDialogVisible">
              <el-form :model="editForm">
                <el-form-item label="totalTask">
                  <el-input v-model="editForm.totalTask"></el-input>
                </el-form-item>
                <el-form-item label="totalImg">
                  <el-input v-model="editForm.totalImg"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveEdit">保存</el-button>
                  <el-button @click="cancelEdit">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </ElMain>
          <ElFooter>
            <!--
            <ElPagination :total="totalUsers" :background="true" @current-change="handlePageChange"></ElPagination>
            -->
          </ElFooter>
        </template>
      </ElContainer>
    </template>
  </ElContainer>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
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
    let adminUserData = ref([]);
    const username = ref('');
    const selectedUserIds = ref([]);
    const editDialogVisible = ref(false);
    const totalUsers = ref(0);
    const currentPage = ref(1);
    const editForm = ref({
      user_id: '',
      totalTask: '',
      totalImg: '',
    });
    let editedRowIndex = null;


    const editUser = (row) => {
      editDialogVisible.value = true;
      editForm.value = { ...row }; // Copy row data to editForm
      editedRowIndex = adminUserData.value.indexOf(row);
    }

    const saveEdit = async () => {
      await proxy.$api.saveUser(editForm.value);
      //adminUserData.value[editedRowIndex] = { ...editForm.value };
      editDialogVisible.value = false;
      getUserData();
    };

    const cancelEdit = () => {
      // Close the edit form dialog without saving
      editDialogVisible.value = false;
    };

    let user_id = '';
    const deleteUser = async (row) => {
      let adminuser3 = new FormData();
      user_id = row.user_id;
      adminuser3.append('user_id', user_id);
      await proxy.$api.admin_user_delete_one(adminuser3);
      getUserData();
    }


    const deleteUsers = () => {
      /*await proxy.$api.deleteUserTasks({ userId, taskIds: selectedTaskIds.value });
      console.log("批量删除成功");
      console.log(selectedTaskIds);
      getUserTaskData();*/
    };

    const searchUsers = async () => {
      let adminuser1 = new FormData();
      adminuser1.append('username', username.value);
      let res = await proxy.$api.searchAdminUser(adminuser1);
      adminUserData.value = res.AdminUserData;
    };

    const reset = () => {
      username.value = '';
      getUserData();
    };

    const getUserData = async () => {
      let res = await proxy.$api.getAdminUser();
      adminUserData.value = res.user;
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
      getUserData();
    })
    const state = reactive<Record<string, any>>({});
    return {
      adminUserData, username, editDialogVisible, editForm, editUser, saveEdit,
      cancelEdit, deleteUser, reset, deleteUsers, state, totalUsers, currentPage, handlePageChange, searchUsers
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