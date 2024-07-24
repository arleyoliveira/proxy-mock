const mongoose = require('mongoose');

mongoose.set('debug', true);

const mockSchema = new mongoose.Schema({
    requestPath: String,
    requestHeaders: Object,
    requestBody: Object,
    responseHeaders: Object,
    responseBody: Object,
    statusCode: Number,
    method: String
})

module.exports = mongoose.model('meusmocks', mockSchema);