export default {
    getModelList: () => {
        return {
            code: 200,
            data: {
                adminModelData: [
                    {
                        modelId: '1',
                        modelName: 'aaa',
                        lr: '155',
                        epoch: '1555',
                        batchSize: '145',
                    },
                    {
                        modelId: '2',
                        modelName: 'aaa',
                        lr: '155',
                        epoch: '1555',
                        batchSize: '145',
                    },
                ],
                totalModels: 2
            }
        }
    }
}