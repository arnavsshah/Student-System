const express = require('express');
const { server_port } = require('./config/env_vars');


const app = express();




app.listen((server_port || 5000), () => {
    console.log(`server running on ${server_port}`);
})

app.use(require('./routes'));