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

router.post('/', (req,res) => {
    const deviceData = req.body;
    devices.addDevice(deviceData);

    res.sendStatus(201);
});

router.delete('/:id', (req,res) => {
    const deviceId = req.params.id;
    devices.deleteDivice(deviceId);

    res.sendStatus(200);
});

router.put('/:id', (req, res) => {
    const deviceId = req.params.id;
    const device = devices.getDeviceById(deviceId);

    if (device) {
        const deviceData = req.body;
        devices.updateDevice(deviceId, deviceData);
        res.json(device);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;