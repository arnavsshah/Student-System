const express = require("express");
const router = express.Router();


var neo4jApi = require('../database/neo4jAPI/neo4jStatistics');




router.get('/', async(req, res) => {
    var getByDepartment = await neo4jApi.getByDepartment();
    var getByScore = await neo4jApi.getByScore();
    var getBySem = await neo4jApi.getBySem(req.user.id);
    var getBySkill = await neo4jApi.getBySkill(req.user.id);
    var getByAttribute = await neo4jApi.getByAttribute(req.user.id);
    var data = {
        department: getByDepartment,
        score: getByScore,
        sem: getBySem,
        skill: getBySkill,
        attribute: getByAttribute,
    }
    res.send(data);
})



module.exports = router;