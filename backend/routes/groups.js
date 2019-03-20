const http = require('http');
const router = require('express').Router();
const Device = require('../models/device');

router.get('/', async (req, res) => {
    const devices = await Device.find().exec();
    const devicesAdopted = devices.filter(d => d.group).map(d => deviceAdapter(d));
    const groups = groupBy(devicesAdopted, 'group');

    res.json(groups);
});

router.get('/:group', async (req, res) => {
    const group = req.params.group;
    console.log(group);
    const devices = await Device.find({group: group}).exec();
    console.log(devices);

    if (devices) {
        res.json(devices.map(d => deviceAdapter(d)));
    } else {
        res.sendStatus(404);
    }
});

router.post('/:group', async (req,res) => {
    const group = req.params.group;
    const deviceId = req.body.deviceId;
    console.log(req.body);
    const device = await Device.findById(deviceId).exec();
    if(device) {
        device.group = group;
        await device.save();
    
        res.sendStatus(201);       
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:deviceId', async (req,res) => {
    const deviceId = req.params.deviceId;
    console.log(deviceId);
    const device = await Device.findById(deviceId);
    console.log(device);
    if (device) {
        device.group = null;
        device.save();
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

router.put('/:group', async (req, res) => {
    const group = req.params.group;
    console.log(group);
    const state = req.body.state;
    console.log(state);

    const devices = await Device.find({group: group}).exec();
    console.log(devices);

    if (devices && devices.length) {
        devices.forEach(d => {
            d.state = state === 'on';
            d.save();
        });
        res.sendStatus(200);
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
        state: device.state ? 'on' : 'off',
        group: device.group
    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Grouping_objects_by_a_property
function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

module.exports = router;