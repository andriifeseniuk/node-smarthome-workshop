import axios from 'axios';
const serverUrl = 'http://localhost:3005';

let index = 3;
let devices = {
    device1: {
        id: 'device1',
        name: 'Device #1',
        address: '192.168.1.50',
        port: 90,
        state: 'on'
    },
    device2: {
        id: 'device2',
        name: 'Device #2',
        address: '192.168.1.60',
        port: 80,
        state: 'off'
    }
};

export async function getDevices() {
    const response = await axios.get(`${serverUrl}/devices`);
    return response.data;
    //return Object.values(devices);
}

export async function getDeviceById(deviceId) {
    const response = await axios.get(`${serverUrl}/devices/${deviceId}`);
    return response.data;
    //return devices[deviceId];
}

export async function addDevice(device) {
    index += 1;
    devices[index] = {
        id: index,
        state: 'off',
        ...device
    };
}

export async function removeDevice(deviceId) {
    devices = {
        ...devices,
        [deviceId]: undefined
    };

    delete devices[deviceId];
}

export async function updateDevice(deviceId, data) {
    devices = {
        ...devices,
        [deviceId]: {
            ...devices[deviceId],
            ...data
        }
    };
}

export async function switchOn(deviceId) {
    await updateDevice(deviceId, {
        state: 'on'
    });
}

export async function switchOff(deviceId) {
    await updateDevice(deviceId, {
        state: 'off'
    });
}

export async function getDeviceLog(deviceId) {
    return [
        {
            date: '2018-31-08 16:00:00',
            action: 'On'
        },
        {
            date: '2018-31-08 17:00:00',
            action: 'Off'
        }]
}