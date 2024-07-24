//insert on

db.meusmocks.insertOne({
    requestPath: "/test?input=ON",
    requestHeaders: {
        NUMERO_CONTA_CARTAO: "102030"
    },
    responseHeaders: {
        mocked: true
    },
    responseBody: {
        message: "Success"
    },
    statusCode: 200,
    method: "GET"
})

//updade on
db.meusmocks.updateOne({ _id: ObjectId("6620fe352cecedc559ac8622") }, {
    $set: {
        "requestPath": "/test?input=ON",
        "requestHeaders": {
            "NUMERO_CONTA_CARTAO": "102030",
            "valor": "10.30"
        },
        "responseHeaders": {
            "mocked": true
        },
        "responseBody": {
            "message": "Success"
        },
        "statusCode": 200,
        "method": "GET"
    }
})

//find
db.meusmocks.find({ requestPath: '/test?input=ON' })
    .projection({})
    .sort(({_id: -1}))
    .limit(100)