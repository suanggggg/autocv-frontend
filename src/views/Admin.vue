<template>
  <div>
    <ElHeader>
      <El-row>
        <el-col :span="20">
          <ElText type="primary" size="large"> 视觉认知系统</ElText>
        </el-col>

        <el-col :span="3">
          <ElText type="primary" text-align: right>{{ username }}</ElText>
        </el-col>
        <el-col :span="1">
          <ElButton @click="logout" text-align: right>退出登录</ElButton>
        </el-col>
      </El-row>
    </ElHeader>
    <ElContainer class="ElContainer_1886h3zcdmd">
      <template #default="scope_1886h3zcdmd">
        <ElAside width="200px">
          <template #default="scope_1d5exxtqh2c">
            <ElMenu mode="vertical" :default-active="activeIndex" @select="handleSelect" router>
              <template #default="scope_2ii6vax0dgm">
                <ElContainer class="ElContainer_1byvmp8ie0z">
                  <template #default="scope_1byvmp8ie0z">

                    <ElMenuItem index="tasks"> 任务管理</ElMenuItem>
                  </template>
                </ElContainer>
                <ElContainer class="ElContainer_11moncyq0n1">
                  <template #default="scope_11moncyq0n1">

                    <ElMenuItem index="users"> 用户管理</ElMenuItem>
                  </template>
                </ElContainer>
                <ElContainer class="ElContainer_64doe6rhcd">
                  <template #default="scope_64doe6rhcd">

                    <ElMenuItem index="models"> 模型管理</ElMenuItem>
                  </template>
                </ElContainer>

              </template>
            </ElMenu>
          </template>
        </ElAside>
        <el-main>
          <router-view />
        </el-main>
      </template>
    </ElContainer>
  </div>
</template>
<script>
import { ElForm } from 'element-plus';
import store from '../store/index';

export default {
  name: "Admin",
  data() {
    return {
      activeIndex: this.$route.path,
      username: store.getters.getUsername,
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      localStorage.clear();
      window.sessionStorage.clear();
      this.$router.push("/");
    }
  },
}
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
</style>