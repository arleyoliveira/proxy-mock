const express = require('express');
const ProxyController = require('./controllers/proxyController');

const router = express.Router();

router.get('/*', (req, res) => ProxyController.execute(req, res));

module.exports = router;