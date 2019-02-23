const router = require('express').Router();
const devices = require('../models/devices.js');

router.get('/', (req, res) => {
    res.json(devices.getAllDevices());
});

router.get('/:id', (req, res) => {
    const deviceId = req.params.id;
    const device = devices.getDeviceById(deviceId);

    if (device) {
        res.json(device);
    } else {
        res.sendStatus(404);
    }
});


module.exports = router;