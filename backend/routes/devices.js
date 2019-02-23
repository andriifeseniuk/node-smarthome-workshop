const router = require('express').Router();
const devices = require('..models/devices');

router.get('/', (req, res) => {
    res.sendJson(devices.getAllDevices());
};)

module.exports = router;