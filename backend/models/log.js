const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    deviceId: String,
    state: String,
    timestamp: String,
});

const logModel = mongoose.model('log', logSchema);

module.exports = logModel;