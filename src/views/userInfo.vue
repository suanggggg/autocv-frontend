<template>

  <ElContainer class="ElContainer_1886h3zcdmd">
    <template #default="scope_1886h3zcdmd">

      <ElContainer class="ElContainer_29cj778vm7i">
        <template #default="scope_29cj778vm7i">
          <ElMain>
            <ElRow>
              <ElText type="primary"> 用户中心</ElText>
            </ElRow>
            <ElRow>
              <ElText type="info"> 概览</ElText>
            </ElRow>
            <ElRow :gutter="10">
              <ElCol :span="6">
                <component is="div" class="component_2fy11owp2d6">
                  <div class="col-wrapper">
                    <div class="number">{{ haveTask }}</div>
                    <div class="text">已有任务数</div>
                  </div>
                </component>
              </ElCol>
              <ElCol :span="6">
                <component is="div" class="component_2fy11owp2d6">
                  <div class="col-wrapper">
                    <div class="number">{{ totalTask }}</div>
                    <div class="text">总任务数</div>
                  </div>
                </component>
              </ElCol>
              <ElCol :span="6">
                <component is="div" class="component_2fy11owp2d6">
                  <div class="col-wrapper">
                    <div class="number">{{ haveImg }}</div>
                    <div class="text">已上传图片数</div>
                  </div>
                </component>
              </ElCol>
              <ElCol :span="6">
                <component is="div" class="component_2fy11owp2d6">
                  <div class="col-wrapper">
                    <div class="number">{{ totalImg }}</div>
                    <div class="text">总图片数</div>
                  </div>
                </component>
              </ElCol>
            </ElRow>
            <ElRow>
              <ElText type="info"> 设置</ElText>
            </ElRow>
            <ElRow>
              <ElButton type="primary" @click="editPassword"> 修改密码</ElButton>
            </ElRow>

            <el-dialog v-model="editDialogVisible">
              <el-form :model="editForm">
                <el-form-item label="新密码">
                  <el-input v-model="editForm.newPassword" type="password" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码">
                  <el-input v-model="editForm.confirmedPassword" type="password" placeholder="重复新密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveEdit">确定</el-button>
                  <el-button @click="cancelEdit">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </ElMain>
        </template>
      </ElContainer>
    </template>
  </ElContainer>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from 'vue';
import store from '../store/index'; // 导入 Vuex store
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
  ElRow,
  ElCol,
  ElButton
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
    ElRow,
    ElCol,
    ElButton
  },
  setup() {
    const { proxy }: any = getCurrentInstance();

    const userId = store.getters.getUserId;

    const haveTask = ref(0);
    const totalTask = ref(0);
    const haveImg = ref(0);
    const totalImg = ref(0);
    const editDialogVisible = ref(false);
    const editForm = ref({
      newPassword: '',
      confirmedPassword: '',
    });

    /*const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== editForm.value.newPassword) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };*/
    /* const rules = {
       newPassword: [
         { required: true, message: '请输入新密码', trigger: 'blur' },
         { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
       ],
       confirmedPassword: [
         { required: true, message: '请再次输入新密码', trigger: 'blur' },
         { validator: validateConfirmPassword, trigger: 'blur' },
       ],
     };*/

    const editPassword = () => {
      editDialogVisible.value = true;
    }

    const saveEdit = () => {
      editDialogVisible.value = false;
      savePassword(userId, editForm.value.newPassword);
    };

    const savePassword = async (userId, newPassword) => {
      await proxy.$api.savePassword({ userId, newPassword });
      console.log("保存成功");
    };

    const cancelEdit = () => {
      // Close the edit form dialog without saving
      editDialogVisible.value = false;
    };

    const getUserInfo = async () => {
      let res = await proxy.$api.getUserInfo({ userId });
      console.log(userId);
      haveTask.value = res.haveTask;
      totalTask.value = res.totalTask;
      haveImg.value = res.haveImg;
      totalImg.value = res.totalImg;
    };

    onMounted(() => {
      getUserInfo();
    })

    const state = reactive<Record<string, any>>({});
    return { haveTask, haveImg, totalTask, totalImg, state, editPassword, editDialogVisible, editForm, saveEdit, cancelEdit, savePassword };
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

.ElContainer_1xc2uxssbrc {
  width: 100%;
  height: 100%;
}

.ElContainer_29cj778vm7i {
  width: 100%;
  height: 100%;
}

.component_2fy11owp2d6 {
  height: 200px;
  background: #ecf5ff;
}

.col-wrapper {
  text-align: center;
  height: 200px;
  /* Adjust the height as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.number {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text {
  font-size: 16px;
}
</style>