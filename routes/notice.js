const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jNotice');


// router.get('/', async(req, res) => {
//     var notices = neo4jApi.getNotice(req.user.id);
//     res.send(notices);
// })

router.post('/', async(req, res) => {
    var notices = neo4jApi.addNotice(req.body, req.user.id);
    res.send(notices);
})


module.exports = router;