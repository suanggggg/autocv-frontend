<template>
    <ElHeader>
        <El-row>
            <el-col :span="23">
                <ElText type="primary" size="large"> 视觉认知系统</ElText>
            </el-col>
            <el-col :span="1">
                <router-link to="../admin/tasks">
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
                                <el-upload accept=".zip" action="[uploadDataurl]" :on-success="handleSuccess"
                                    :on-error="handleError" :limit="1" :before-upload="beforeUpload">
                                    <el-button type="primary" :disabled="true">
                                        上传数据
                                    </el-button>
                                </el-upload>
                            </ElMain>
                        </template>
                    </ElContainer>
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
                                    <ElRadio label="是" value="1">是</ElRadio>
                                    <ElRadio label="否" value="2">否</ElRadio>
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
                                    <el-option v-for="status in taskStatusOptions" :key="status" :label="status"
                                        :value="status" />
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
                                <ElButton type="primary">运行</ElButton>
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
                                    <ElTable :data="tableData">
                                        <template #default="scope_1fexz7zpuba">
                                            <ElTableColumn prop="labelName" label="模型名"></ElTableColumn>
                                            <ElTableColumn prop="top1Acc" label="top-1_acc"></ElTableColumn>
                                            <ElTableColumn prop="top5Acc" label="top-5_acc"></ElTableColumn>
                                            <ElTableColumn label="……"></ElTableColumn>
                                            <ElTableColumn label="操作">
                                                <template #default="{ row, column, $index }">
                                                    <router-link to="../view-result">
                                                        <ElButton type="primary">查看</ElButton>
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
import { defineComponent, reactive, ref, onMounted } from 'vue';
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
    name: 'CreateTask',
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
        const radio = ref('1');
        const taskName = ref('猫狗分类');
        const beizhu = ref('无');
        const taskStatus = ref(['resnet']);
        const taskStatusOptions = ['resnet', 'vgg16'];
        const tableData = ref([
            {
                labelName: "resnet",
                top1Acc: "90%",
                top5Acc: "95%"
            },
            {
                labelName: "vgg16",
                top1Acc: "80%",
                top5Acc: "85%"
            }
        ])
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
        return { tableData, state, radio, taskStatus, taskStatusOptions, taskName, beizhu, handleSuccess, handleError, beforeUpload };
    },
    data() {
        return {
            selectedOption: null, // 用于存储选中的值
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