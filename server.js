const express = require('express')

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Ganya");
})

app.listen(port, () => {
    console.log(`server running on ${port}`);
})