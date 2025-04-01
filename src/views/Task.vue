<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import { createRouter, createWebHashHistory } from 'vue-router';
//import CreateTask from './components/CreateTask.vue';
//import ViewTask from './components/ViewTask.vue';

const routes = [
    { path: '/create-task', component: CreateTask },
    { path: '/view-task/:id', component: ViewTask, props: true }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
</script>