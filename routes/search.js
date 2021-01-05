const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jSearch');
var neo4jApiMap = require('../database/neo4jAPI/neo4jMap');


router.post('/student', async(req, res) => {
    console.log("inside search ", req.body)
    var students = await neo4jApi.studentSearch(req.body, req.user.id);
    res.send(students);
});


router.post('/teacher', async(req, res) => {
    var teachers = await neo4jApi.teacherSearch(req.body, req.user.id);
    res.send(teachers)
})

router.post('/alumni', async(req, res) => {
    var alumni = await neo4jApi.alumniSearch(req.body, req.user.id);
    res.send(alumni)
})

router.post('/studentSuggestion', async(req, res) => {
    var studentSuggestion = await neo4jApi.similarStudentSuggestion(req.body, req.user.id);
    res.send(studentSuggestion)
})

router.post('/attributeSuggestion', async(req, res) => {
    var attributeSuggestion = await neo4jApi.studentAttributeSuggestion(req.body, req.user.id);
    res.send(attributeSuggestion)
})

router.post('/spatial', async(req, res) => {
    // console.log("inside spatial route")
    // console.log("reqbody",req.body);
    if (req.body.place !== undefined) {
        // console.log("inside place")
        var studentsInLocation = await neo4jApiMap.studentsInLocation(req);
        // console.log(studentsInLocation)
        res.send(studentsInLocation)
    }
    if (req.body.distance !== undefined) {
        var studentsLivedWithinDistance = await neo4jApiMap.studentsLivedWithinDistance(req);
        res.send(studentsLivedWithinDistance)
    }
    if (req.body.nearbyWorking !== undefined) {
        var studentsWorkedWithinDistance = await neo4jApiMap.studentsWorkedWithinDistance(req);
        res.send(studentsWorkedWithinDistance)
    }
    if (req.body.nearbyStudying !== undefined) {
        var studentsStudiedWithinDistance = await neo4jApiMap.studentsStudiedWithinDistance(req);
        res.send(studentsStudiedWithinDistance)
    }
    if (req.body.startYear !== undefined) {
        var studentsInYear = await neo4jApiMap.studentsInYear(req);
        res.send(studentsInYear)
    }
})

module.exports = router;