const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jSearch');


router.post('/', async(req, res) => {

    if (req.body.student === true) {
        var students = await neo4jApi.studentSearch(req.body);
        // students.map(student => {
        //     console.log(student.records[0]._fields);
        // })
    } else if (req.body.teacher === true) {
        var teachers = await neo4jApi.teacherSearch(req.body);
    } else if (req.body.alumni === true) {
        var alumni = await neo4jApi.alumniSearch(req.body);
    } else if (req.body.studentSuggestion === true) {
        var studentSuggestion = await neo4jApi.similarStudentSuggestion(req.body);
    } else if (req.body.attributeSuggestion === true) {
        var attributeSuggestion = await neo4jApi.studentAttributeSuggestion(req.body);
    }
    res.send('hello');
});

module.exports = router;