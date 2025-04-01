import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            userId: null,
            taskId: null,
            username: null,
            modelName: null
        };
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setUsername(state, username) {
            state.username = username;
        },
        setUserRole(state, role) {
            state.role = role;
        },
        setTaskId(state, taskId) {
            state.taskId = taskId;
        },
        setModelName(state, modelName) {
            state.modelName = modelName;
        }
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
        getUsername(state) {
            return state.username;
        },
        getUserRole(state) {
            return state.role;
        },
        getTaskId(state) {
            return state.taskId;
        },
        getModelName(state) {
            return state.modelName;
        }
    },
});

export default store;
