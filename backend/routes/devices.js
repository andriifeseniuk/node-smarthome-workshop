const http = require('http');
const router = require('express').Router();
const devices = require('../models/devices');
const Device = require('../models/device');

function sendRequest(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(res.statusCode)
            } else {
                resolve();
            }
        });
    });
}

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
        const device = await Device.findById(deviceId).exec();
        await device.update({
            ...deviceData,
            state: deviceData.state === 'on'
        });

        console.log(deviceData.state);
        
        // REAL DEVICE (if you have one):
        // const url = `http://${device.address}:${device.port}`;
        // const command = device.state ? 'Power%20On' : 'Power%20off';
        // const urlWithCommand = `${url}/cm?cmnd=${command}`;
        // console.log(urlWithCommand);
        // await sendRequest(urlWithCommand);

        // FAKE DEVICE (if you did "npm run startFakeDevice"):
        const url = `http://127.0.0.1:3006`;
        const command = device.state ? 'Power%20On' : 'Power%20off';
        const urlWithCommand = `${url}/cm?cmnd=${command}`;
        console.log(urlWithCommand);
        await sendRequest(urlWithCommand);   

        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }

    // const deviceId = req.params.id;
    // const deviceData = req.body;

    // try {
    //     await Device.findByIdAndUpdate(deviceId, {
    //         ...deviceData,
    //         state: deviceData.state === 'on'
    //     });
    //     res.sendStatus(200);
    // } catch (e) {
    //     res.sendStatus(404);
    // }

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