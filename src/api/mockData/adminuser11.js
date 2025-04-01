import Mock from 'mockjs'

function param20bj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIcomponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            email: Mock.Random.email(),
            phone: Mock.Random.integer(13000000000, 13900000000),
            createTime: Mock.Random.date(),
            taskNum: Mock.Random.integer(0, 10),
            imgNum: Mock.Random.integer(0, 10)
        })
    )
}
export default {
    getUserList: config => {
        const { name, page = 1, limit = 10 } = param20bj(config.url)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 200,
            data: {
                list: pageList,
                count: mockList.length,
            }
        }
    },


}