const mockRepository = require('../repositories/mockRepository');
const axios = require('axios');
var http = require('http');

const DELETE_HEADERS = [
    'Accept',
    'Host',
    'User-Agent',
    'Postman-Token',
    'Accept-Encoding',
    'Connection'
];

const doProxy = async (requestPath, requestHeaders) => {

    let cloneRequestHeaders = deleteHeaders(requestHeaders);

    const mock = await findMock(requestPath, cloneRequestHeaders);

    return mock.statusCode != 404 ? mock : await findSource(requestPath, cloneRequestHeaders);
}

const deleteHeaders = (requestHeaders) => {
    let cloneRequestHeaders = { ...requestHeaders };

    DELETE_HEADERS.forEach((item) => {
        delete cloneRequestHeaders[item];
    });

    return cloneRequestHeaders;
}

const findMock = async (requestPath, requestHeaders) => {

    let response;
    let uri = 'http://localhost:8080/rest' + requestPath;

    try {
        response = await axios.get(uri);
    } catch (error) {
        response = error.response;
    } finally {
        console.log(response);
        return {
            requestPath: requestPath,
            requestHeaders: requestHeaders,
            responseHeaders: response.headers,
            responseBody: response.data,
            statusCode: response.status,
            method: 'GET'
        };
    };
}


const findSource = async (requestPath, requestHeaders) => {

    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
        console.log(response);

        return {
            requestPath: requestPath,
            requestHeaders: requestHeaders,
            responseHeaders: response.headers,
            responseBody: response.data,
            statusCode: response.status,
            method: 'GET'
        };
    } catch (error) {
        console.log(error.response.body);
    };
}


module.exports = {
    doProxy
};