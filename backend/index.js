const express = require('express')
const deviceRouter = require('./routes/devices');
const app = express();
const port = 3005;

app.use('/devices', deviceRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));