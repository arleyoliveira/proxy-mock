const Mock = require('../models/mock');

const mongoose = require('mongoose');



const find = async (requestPath, requestHeaders) => {
    return await Mock.findOne({
        requestPath: requestPath,
        requestHeaders: requestHeaders
    });
};


module.exports = {
    find
};