const router = require('express').Router();
const devices = require('../models/devices');
const Device = require('../models/device');

router.get('/', async (req, res) => {
    //res.json(devices.getAllDevices());

    const devices = await Device.find().exec();
    res.json(devices.map(d => deviceAdapter(d)));
});

router.get('/:id', async (req, res) => {
    const deviceId = req.params.id;
    //const device = devices.getDeviceById(deviceId);
    console.log(deviceId);
    const device = await Device.findById(deviceId).exec();
    console.log(device);

    if (device) {
        res.json(deviceAdapter(device));
    } else {
        res.sendStatus(404);
    }
});

function deviceAdapter(device) {
    return {
        id: device._id,
        name: device.name,
        address: device.address,
        port: device.port,
        state: device.state ? 'on' : 'off'
    }
}

router.post('/', async (req,res) => {
    // const deviceData = req.body;
    // devices.addDevice(deviceData);
    const deviceData = req.body;
    const device = new Device(deviceData);
    await device.save();

    res.sendStatus(201);
});

router.delete('/:id', async (req,res) => {
    const deviceId = req.params.id;
    //devices.deleteDivice(deviceId);

    await Device.findByIdAndDelete(deviceId);

    res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
    const deviceId = req.params.id;
    const deviceData = req.body;

    try {
        await Device.findByIdAndUpdate(deviceId, {
            ...deviceData,
            state: deviceData.state === 'on'
        });
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }

    //const deviceId = req.params.id;
    // const device = devices.getDeviceById(deviceId);
    // if (device) {
    //     const deviceData = req.body;
    //     devices.updateDevice(deviceId, deviceData);
    //     res.json(device);
    // } else {
    //     res.sendStatus(404);
    // }
});

module.exports = router;