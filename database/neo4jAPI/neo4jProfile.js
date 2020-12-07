const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

//GET queries

//problem to solve
// change data to req
//change data.map to req.body.map
//add ${} into ""
//send req from router function 
async function getInstitutes() {
    var query = `MATCH (s:Student) -[st:STUDIED_IN]-> (i) WHERE ID(s) = ${req.user.id} `;
    query += `WITH s, st, i MATCH (i) -[:LOCATED_IN]-> (l) RETURN s, st, i, l`
    var institutes = await queryNeo4j(query);
    var res = [];
    res = institutes.records.map(record => {
        return {
            ...record._fields[1].properties,
            ...record._fields[2].properties,
            ...record._fields[3].properties,
        }
    })
    return res;
}

async function getSkills() {
    var query = `MATCH (s:Student) -[:HAS]-> (sk) WHERE ID(s) = ${req.user.id} RETURN sk;`;
    var skills = await queryNeo4j(query);
    var res = [];
    skills.records.map(record => {
        res.push(record._fields[0].properties.name);
    })
    return res;
}

async function getCourses() {
    var query = `MATCH (s:Student) -[:COMPLETED]-> (c) WHERE ID(s) = ${req.user.id} RETURN c`;
    var courses = await queryNeo4j(query);
    var res = [];
    courses.records.map(record => {
        res.push(record._fields[0].properties.name);
    })
    return res;
}

async function getProjects() {
    var query = `MATCH (s:Student)-[:HAS_DONE]-> (p) WHERE ID(s) = ${req.user.id} RETURN p`;
    var projects = await queryNeo4j(query);
    var res = [];
    projects.records.map(record => {
        res.push(record._fields[0].properties);
    })
    return res;
}

async function getAchievements() {
    var query = `MATCH (s:Student) -[:HAS_ACHIEVED]-> (a) WHERE ID(s) = ${req.user.id} RETURN a`;
    var achievements = await queryNeo4j(query);
    var res = achievements.records.map(record => {
        return {
            ...record._fields[0].properties,
        }
    })
    return res;
}

async function getResearchPapers() {
    var query = `MATCH (s:Student)-[:PUBLISHED]-> (r) WHERE ID(s) = ${req.user.id} RETURN r`;
    var researchPapers = await queryNeo4j(query);
    var res = researchPapers.records.map(record => {
        return {
            ...record._fields[0].properties,
        }
    })
    return res;
}

async function getInterests() {
    var query = `MATCH (s:Student) -[:INTERESTED_IN]-> (i) WHERE ID(s) = ${req.user.id} RETURN i`;
    var interests = await queryNeo4j(query);
    var res = [];
    interests.records.map(record => {
        res.push(record._fields[0].properties.name);
    })
    return res;
}

async function getClubs() {
    var query = `MATCH (s:Student) -[p:PART_OF]-> (c) WHERE ID(s) = ${req.user.id} RETURN c, p`;
    var clubs = await queryNeo4j(query);
    var res = [];
    res = clubs.records.map(record => {
        return {
            name: record._fields[0].properties.name,
            ...record._fields[1].properties
        }
    })
    return res;
}

async function getLanguages() {
    var query = `MATCH (s:Student) -[:SPEAKS]-> (l) WHERE ID(s) = ${req.user.id} RETURN l`;
    var languages = await queryNeo4j(query);
    var res = [];
    languages.records.map(record => {
        res.push(record._fields[0].properties.name);
    })
    return res;
}

async function getCompanies() {
    var query = `MATCH (s:Student) -[w:WORKED_IN]-> (c) WHERE ID(s) = ${req.user.id} `;
    query += `WITH s, w, c MATCH (c) -[:LOCATED_IN]-> (l) RETURN s, c, w, l`
    var companies = await queryNeo4j(query);
    var res = [];
    res = companies.records.map(record => {
        return {
            ...record._fields[1].properties,
            ...record._fields[2].properties,
            ...record._fields[3].properties,
        }
    })
    return res;
}

//POST queries

async function addInstitutes(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(institute => {
        query += `MERGE (i:Institute { name : ${institute.name}, degree : ${institute.degree} } ) MERGE (s) - [:STUDIED_IN { startDate : ${institute.startDate}, endDate : ${institute.endDate}, score : ${institute.score} }] -> (i) `
        query += `MERGE (l:Location { latitude : ${institute.latitude}, longitude : ${institute.longitude}, city : ${institute.city}, state : ${institute.state}, country : ${institute.country}, address : ${institute.address}, postalCode : ${institute.postalCode}}) MERGE (i) - [:LOCATED_IN] -> (l); `
    })
    var res = await queryNeo4j(query);
}

async function addSkills(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(skill => {
        query += `MERGE (sk:Skill { name : ${skill}}) MERGE (s) - [:HAS] -> (sk); `
    })
    var res = await queryNeo4j(query);
}

async function addCourses(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(course => {
        query += `MERGE (c:Course { name : ${course}}) MERGE (s) - [:COMPLETED] -> (c); `
    })
    var res = await queryNeo4j(query);
}

async function addProjects(req) {
    console.log('inside addproject', req.user);
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;

    req.body.map(project => {
        query += `MERGE (p:Project { name : "${project.projectName}", description : "${project.description}"}) MERGE (s) - [:HAS_DONE] -> (p); `
    })
    var res = await queryNeo4j(query);
}

async function addAchievements(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(achievement => {
        query += `MERGE (a:Achievement { title : ${achievement.title}, description : ${achievement.description}}) MERGE (s) - [:HAS_ACHIEVED] -> (a); `
    })
    var res = await queryNeo4j(query);
}

async function addResearchPapers(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(researchPaper => {
        query += `MERGE (r:ResearchPaper { title : ${researchPaper.title}, description : ${researchPaper.description}}) MERGE (s) - [:PUBLISHED] -> (r); `
    })
    var res = await queryNeo4j(query);
}

async function addInterests(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(interest => {
        query += `MERGE (i:Interest { name : ${interest}}) MERGE (s) - [:INTERESTED_IN] -> (i); `
    })
    var res = await queryNeo4j(query);
}

async function addClubs(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(club => {
        query += `MERGE (c:Club { name : ${club.name}}) MERGE (s) - [:PART_OF {startDate : ${club.startDate}, endDate : ${club.endDate}, position : ${club.position}}] -> (c); `
    })
    var res = await queryNeo4j(query);
}

async function addLanguages(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(language => {
        query += `MERGE (l:Language { name : ${language}}) MERGE (s) - [:SPEAKS] -> (l); `
    })
    var res = await queryNeo4j(query);
}

async function addCompanies(data) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    data.map(company => {
        query += `MERGE (c:Company { name : ${company.name}, field : ${company.field}, website : ${company.website}}) MERGE (s) - [:WORKED_IN { startDate : ${company.startDate} , endDate : ${company.endDate}, position : ${company.position} }] -> (c) `;
        query += `MERGE (l:Location { latitude : ${company.latitude}, longitude : ${company.longitude}, city : ${company.city}, state : ${company.state}, country : ${company.country}, address : ${company.address}, postalCode : ${company.postalCode}}) CREATE (c) - [:LOCATED_IN] -> (l); `
    })
    var res = await queryNeo4j(query);
}


async function queryNeo4j(query) {
    try {
        const session = driver.session();
        var res;
        var writeTxResultPromise = await session.writeTransaction(async txc => {
            res = await txc.run(query);
        });
        session.close();
        return res;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getInstitutes: getInstitutes,
    getSkills: getSkills,
    getCourses: getCourses,
    getProjects: getProjects,
    getAchievements: getAchievements,
    getResearchPapers: getResearchPapers,
    getInterests: getInterests,
    getClubs: getClubs,
    getLanguages: getLanguages,
    getCompanies: getCompanies,
    addInstitutes: addInstitutes,
    addSkills: addSkills,
    addCourses: addCourses,
    addProjects: addProjects,
    addAchievements: addAchievements,
    addResearchPapers: addResearchPapers,
    addInterests: addInterests,
    addClubs: addClubs,
    addLanguages: addLanguages,
    addCompanies: addCompanies,
}