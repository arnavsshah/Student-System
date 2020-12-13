const express = require("express");
const router = express.Router();

var neo4jApiTeacher = require('../database/neo4jAPI/neo4jTeacherProfile');


router.get('/', async(req, res) => {
    var teacher = await neo4jApiTeacher.getSkills(req);
    var teacherSkills = await neo4jApiTeacher.getSkills(req);
    var teacherCourses = await neo4jApiTeacher.getCourses(req);
    var teacherLanguages = await neo4jApiTeacher.getLanguages(req);
    var teacherInterests = await neo4jApiTeacher.getInterests(req);
    var teacherProjects = await neo4jApiTeacher.getProjects(req);
    var teacherResearchPapers = await neo4jApiTeacher.getResearchPapers(req);
    var teacherAchievements = await neo4jApiTeacher.getAchievements(req);
    var teacherInstitutes = await neo4jApiTeacher.getInstitutes(req);
    var teacherCompanies = await neo4jApiTeacher.getCompanies(req);

    var data = {
        teacher: {

        }
    }
    res.send(data);
})

router.post('/institutes', async(req, res) => {
    await neo4jApiTeacher.addInstitutes(req);
    res.send('hello')
});

router.post('/skills', async(req, res) => {
    await neo4jApiTeacher.addSkills(req);
    res.send('hello')
});

router.post('/courses', async(req, res) => {
    await neo4jApiTeacher.addCourses(req);
    res.send('hello')
});

router.post('/projects', async(req, res) => {
    console.log("project", req.user);
    await neo4jApiTeacher.addProjects(req);
    // res.send('hello')
    res.json(req.user)
});

router.post('/achievements', async(req, res) => {
    await neo4jApiTeacher.addAchievements(req);
    res.send('hello')
});

router.post('/researchPapers', async(req, res) => {
    await neo4jApiTeacher.addResearchPapers(req);
    res.send('hello')
});

router.post('/interests', async(req, res) => {
    await neo4jApiTeacher.addInterests(req);
    res.send('hello')
});

router.post('/languages', async(req, res) => {
    await neo4jApiTeacher.addLanguages(req);
    res.send('hello')
});

router.post('/comapanies', async(req, res) => {
    await neo4jApiTeacher.addCompanies(req);
    res.send('hello')
});

module.exports = router;