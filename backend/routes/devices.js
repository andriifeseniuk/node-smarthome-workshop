const router = require('express').Router();
const devices = require('../models/devices.js');

router.get('/', (req, res) => {
    res.json(devices.getAllDevices());
});

module.exports = router;