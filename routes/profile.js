const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jProfile');


router.get('/', async(req, res) => {

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

    var data = {
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
    }
    console.log('checking', req.user);
    console.log(data);
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
    neo4jApi.addClubs(req);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/languages', async(req, res) => {
    neo4jApi.addLanguages(req);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

router.post('/comapanies', async(req, res) => {
    neo4jApi.addCompanies(req);
    // res.redirect(`/profile/${}`);
    res.send('hello')
});

module.exports = router;