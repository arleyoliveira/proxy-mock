const mock = require('../models/mock');
const mockService = require('../services/mockService');

function* createRawHeadersIterator(arr) {
    var curr = 0;
    while (curr < arr.length) {
        if (yield { name: arr[curr++], value: arr[curr++] }) {
            curr = 0;
        }
    }
}


function rawHeadersByKey(rawHeaders) {
    var headersObject = {}
    var iterator = createRawHeadersIterator(rawHeaders);
    var headerIteration = iterator.next();
    while (!headerIteration.done) {
        let header = headerIteration.value;
        headersObject[header.name] = header.value;
        headerIteration = iterator.next();
    }

    return headersObject;
}

const execute = async (req, res) => {
    const requestPath = req.url;
    const requestHeaders = rawHeadersByKey(req.rawHeaders);

    const mock = await mockService.doProxy(requestPath, requestHeaders);

    console.log(mock);

    return res.status(mock.statusCode).set(mock.responseHeaders).json(mock.responseBody);
};


module.exports = {
    execute
};