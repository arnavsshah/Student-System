const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jProfile');


router.get('/', async(req, res) => {

    var skills = await neo4jApi.getSkills();
    var courses = await neo4jApi.getCourses();
    var languages = await neo4jApi.getLanguages();
    var interests = await neo4jApi.getInterests();
    var projects = await neo4jApi.getProjects();
    var projects = await neo4jApi.getProjects();
    var researchPapers = await neo4jApi.getResearchPapers();
    var achievements = await neo4jApi.getAchievements();
    var clubs = await neo4jApi.getClubs();
    var institutes = await neo4jApi.getInstitutes();
    var companies = await neo4jApi.getCompanies();
    console.log('checking', req.user);
    res.send('hello');
})



router.post('/institutes', async(req, res) => {
    neo4jApi.addInstitutes(req.body.institutes);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/skills', async(req, res) => {
    neo4jApi.addSkills(req.body.skills);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/courses', async(req, res) => {
    neo4jApi.addCourses(req.body.courses);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/projects', async(req, res) => {
    console.log("project", req.user);
    await neo4jApi.addProjects(req);
    // res.redirect(`/profile/${}`);
    // res.send('hello')
    res.json(req.user)
});

router.post('/achievements', async(req, res) => {
    neo4jApi.addAchievements(req.body.achievements);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/researchPapers', async(req, res) => {
    neo4jApi.addResearchPapers(req.body.researchPapers);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/interests', async(req, res) => {
    neo4jApi.addInterests(req.body.interests);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/clubs', async(req, res) => {
    neo4jApi.addClubs(req.body.clubs);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/languages', async(req, res) => {
    neo4jApi.addLanguages(req.body.languages);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/comapanies', async(req, res) => {
    neo4jApi.addCompanies(req.body.company);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

module.exports = router;