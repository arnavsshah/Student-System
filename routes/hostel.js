const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jHostel');


router.post('/', async(req, res) => {
    var hostelData = await neo4jApi.getRoom(req);

    res.send(hostelData);
})


module.exports = router;