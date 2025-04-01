import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    redirect: "/user/userTasks",
    children: [
      {
        path: "userTasks",
        name: "UserTasks",
        component: () => import("../views/userTask.vue"),
      },
      {
        path: "info",
        name: "UserInfo",
        component: () => import("../views/userInfo.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "AdminLayout",
    component: () => import("../views/Admin.vue"),
    redirect: "/admin/tasks",
    children: [
      {
        path: "tasks",
        name: "AdminTasks",
        component: () => import("../views/AdminTask.vue"),
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("../views/AdminUser.vue"),
      },
      {
        path: "models",
        name: "AdminModels",
        component: () => import("../views/AdminModel.vue"),
      },
    ],
  },
  {
    path: "/user/create-task",
    name: "CreateTask",
    component: () => import("../views/createTask.vue"),
  },
  {
    path: "/view-task",
    name: "ViewTask",
    component: () => import("../views/viewTask.vue"),
  },
  {
    path: "/view-task2",
    name: "ViewTask2",
    component: () => import("../views/viewTask2.vue"),
  },
  {
    path: "/view-result",
    name: "ViewResult",
    component: () => import("../views/viewResult.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
