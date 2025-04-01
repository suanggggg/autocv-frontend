const env = import.meta.env.MODE

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'http://127.0.0.1:5000'
    },
}
export default {
    env,
    // mock的总开关，
    mock: true,
    ...EnvConfig[env]
}