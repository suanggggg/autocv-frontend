export default {
    getUserList: () => {
        return {
            code: 200,
            data: {
                adminUserData: [
                    {
                        id: '1',
                        name: 'aaa',
                        email: '155',
                        phone: '1555',
                        createTime: '145',
                        taskNum: '1456',
                        imgNum: '1111'
                    },
                    {
                        id: '2',
                        name: 'aa',
                        email: '15',
                        phone: '155',
                        createTime: '145',
                        taskNum: '1456',
                        imgNum: '1111'
                    }
                ],
                totalUsers: 2
            }
        }
    }
}