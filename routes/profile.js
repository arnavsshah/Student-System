const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jProfile');


router.get('/', async(req, res) => {
    var user = await neo4jApi.getUser(req);
    var skills = await neo4jApi.getSkills(req);
    var courses = await neo4jApi.getCourses(req);
    var languages = await neo4jApi.getLanguages(req);
    var interests = await neo4jApi.getInterests(req);
    var projects = await neo4jApi.getProjects(req);
    var researchPapers = await neo4jApi.getResearchPapers(req);
    var achievements = await neo4jApi.getAchievements(req);
    var clubs = await neo4jApi.getClubs(req);
    var institutes = await neo4jApi.getInstitutes(req);
    var companies = await neo4jApi.getCompanies(req);
    var notices = await neo4jApi.getNotices(req);
    var hostel = await neo4jApi.getHostel(req);

    var data = {
        user: user,
        hostel: hostel,
        skills: skills,
        courses: courses,
        languages: languages,
        interests: interests,
        projects: projects,
        researchPapers: researchPapers,
        achievements: achievements,
        clubs: clubs,
        institutes: institutes,
        companies: companies,
        notices: notices
    }
    data.isTeaching = data.user.currentlyTeaching === true;
    res.send(data);
})

router.post('/institutes', async(req, res) => {
    await neo4jApi.addInstitutes(req);
    res.send('hello')
});

router.post('/skills', async(req, res) => {
    await neo4jApi.addSkills(req);
    res.send('hello')
});

router.post('/courses', async(req, res) => {
    await neo4jApi.addCourses(req);
    res.send('hello')
});

router.post('/projects', async(req, res) => {
    console.log("project", req.user);
    await neo4jApi.addProjects(req);
    // res.send('hello')
    res.json(req.user)
});

router.post('/achievements', async(req, res) => {
    await neo4jApi.addAchievements(req);
    res.send('hello')
});

router.post('/researchPapers', async(req, res) => {
    await neo4jApi.addResearchPapers(req);
    res.send('hello')
});

router.post('/interests', async(req, res) => {
    await neo4jApi.addInterests(req);
    res.send('hello')
});

router.post('/clubs', async(req, res) => {
    await neo4jApi.addClubs(req);
    res.send('hello')
});

router.post('/languages', async(req, res) => {
    await neo4jApi.addLanguages(req);
    res.send('hello')
});

router.post('/comapanies', async(req, res) => {
    await neo4jApi.addCompanies(req);
    res.send('hello')
});

module.exports = router;