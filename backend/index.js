const express = require('express')
const deviceRouter = require('./routes/devices');
const corsMiddleware = require('./middlewares/cors');
const app = express();
const port = 3005;

app.use(corsMiddleware);
app.use(express.json());
app.use('/devices', deviceRouter);

app.get('/', (req, res) => {
    console.log("Hello");
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));