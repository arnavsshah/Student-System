const express = require('express');
const { server_port } = require('./config/env_vars');


const app = express();


app.listen((server_port), () => {
    console.log(`server running on ${server_port}`);
})

app.use(require('./routes'));