const http = require('http');
const router = require('express').Router();
const Log = require('../models/log');

router.get('/', async (req, res) => {
    const logs = await Log.find().exec();
    res.json(logs);
});

router.get('/:id', async (req, res) => {
    const deviceId = req.params.id;
    console.log(deviceId);
    const log = await Log.find({ deviceId: deviceId }).exec();
    console.log(log);

    if (log) {
        res.json(log);
    } else {
        res.sendStatus(404);
    }
});


router.post('/', async (req,res) => {
    const logData = req.body;
    const log = new Log(logData);
    await log.save();

    res.sendStatus(201);
});

module.exports = router;