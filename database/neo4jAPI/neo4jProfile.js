const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

//GET queries

async function map() {
    var query = `MATCH (s:Student)-[stud:STUDIED_IN]->(i:Institute)-[:LOCATED_IN]->(li), (s)-[work:WORKED_IN]->(c:Company)-[:LOCATED_IN]->(lc) WHERE ID(s) = ${req.user.id} RETURN i, li, c, lc ORDER BY stud.startDate, work.startDate `
    var mapDisplay = await queryNeo4j(query);
    var res = institutes.records.map(record => {
        return {
            institute: {...record._fields[0].properties },
            instituteLocation: {...record._fields[1].properties },
            company: {...record._fields[2].properties },
            companyLocation: {...record._fields[3].properties },
        }
    })
    return res;
}

async function getInstitutes(req) {
    var query = `MATCH (s:Student) -[st:STUDIED_IN]-> (i) WHERE ID(s) = ${req.user.id} RETURN st, i`;
    var institutes = await queryNeo4j(query);
    var res = institutes.records.map(record => {
        return {
            ...record._fields[0].properties,
            ...record._fields[1].properties,
        }
    })
    return res;
}

async function getSkills(req) {
    console.log("inside", req.user)
    var query = `MATCH (s:Student) -[:HAS]-> (sk) WHERE ID(s) = ${req.user.id} RETURN sk;`;
    var skills = await queryNeo4j(query);
    var res = skills.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getCourses(req) {
    var query = `MATCH (s:Student) -[:COMPLETED]-> (c) WHERE ID(s) = ${req.user.id} RETURN c`;
    var courses = await queryNeo4j(query);
    var res = courses.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getProjects(req) {
    var query = `MATCH (s:Student)-[:HAS_DONE]-> (p) WHERE ID(s) = ${req.user.id} RETURN p`;
    var projects = await queryNeo4j(query);
    var res = projects.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getAchievements(req) {
    var query = `MATCH (s:Student) -[:HAS_ACHIEVED]-> (a) WHERE ID(s) = ${req.user.id} RETURN a`;
    var achievements = await queryNeo4j(query);
    var res = achievements.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getResearchPapers(req) {
    var query = `MATCH (s:Student)-[:PUBLISHED]-> (r) WHERE ID(s) = ${req.user.id} RETURN r`;
    var researchPapers = await queryNeo4j(query);
    var res = researchPapers.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getInterests(req) {
    var query = `MATCH (s:Student) -[:INTERESTED_IN]-> (i) WHERE ID(s) = ${req.user.id} RETURN i`;
    var interests = await queryNeo4j(query);
    var res = interests.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getClubs(req) {
    var query = `MATCH (s:Student) -[p:PART_OF]-> (c) WHERE ID(s) = ${req.user.id} RETURN c, p`;
    var clubs = await queryNeo4j(query);
    var res = clubs.records.map(record => {
        return {
            ...record._fields[0].properties,
            ...record._fields[1].properties
        }
    })
    return res;
}

async function getLanguages(req) {
    var query = `MATCH (s:Student) -[:SPEAKS]-> (l) WHERE ID(s) = ${req.user.id} RETURN l`;
    var languages = await queryNeo4j(query);
    var res = languages.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getCompanies(req) {
    var query = `MATCH (s:Student) -[w:WORKED_IN]-> (c) WHERE ID(s) = ${req.user.id} RETURN c, w`;
    var companies = await queryNeo4j(query);
    var res = companies.records.map(record => {
        return {
            ...record._fields[0].properties,
            ...record._fields[1].properties,
        }
    })
    return res;
}

//POST queries

async function addInstitutes(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(institute => {
        query += `MERGE (i:Institute { name : "${institute.name}", degree : "${institute.degree}" } ) MERGE (s) - [:STUDIED_IN { startDate : "${institute.startDate}", endDate : "${institute.endDate}", score : ${institute.score} }] -> (i) `
        query += `MERGE (l:Location { latitude : ${institute.latitude}, longitude : ${institute.longitude}, city : "${institute.city}", state : "${institute.state}", country : "${institute.country}", address : "${institute.address}", postalCode : ${institute.postalCode}}) MERGE (i) - [:LOCATED_IN] -> (l); `
    })
    var res = await queryNeo4j(query);
}

async function addSkills(req) {
    console.log('inside skill', req.body)
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(skill => {
        query += `MERGE (sk:Skill { name : "${skill.name}"}) MERGE (s) - [:HAS] -> (sk); `
    })
    var res = await queryNeo4j(query);
}

async function addCourses(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(course => {
        query += `MERGE (c:Course { name : "${course.name}"}) MERGE (s) - [:COMPLETED] -> (c); `
    })
    var res = await queryNeo4j(query);
}

async function addProjects(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;

    req.body.map(project => {
        query += `MERGE (p:Project { name : "${project.name}", description : "${project.description}"}) MERGE (s) - [:HAS_DONE] -> (p); `
    })
    var res = await queryNeo4j(query);
}

async function addAchievements(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(achievement => {
        query += `MERGE (a:Achievement { title : "${achievement.title}", description : "${achievement.description}"}) MERGE (s) - [:HAS_ACHIEVED] -> (a); `
    })
    var res = await queryNeo4j(query);
}

async function addResearchPapers(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(researchPaper => {
        query += `MERGE (r:ResearchPaper { title : ${researchPaper.title}, description : "${researchPaper.description}"}) MERGE (s) - [:PUBLISHED] -> (r); `
    })
    var res = await queryNeo4j(query);
}

async function addInterests(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(interest => {
        query += `MERGE (i:Interest { name : "${interest.name}"}) MERGE (s) - [:INTERESTED_IN] -> (i); `
    })
    var res = await queryNeo4j(query);
}

async function addClubs(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(club => {
        query += `MERGE (c:Club { name : "${club.name}"}) MERGE (s) - [:PART_OF {startDate : "${club.startDate}", endDate : "${club.endDate}", position : "${club.position}"}] -> (c); `
    })
    var res = await queryNeo4j(query);
}

async function addLanguages(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(language => {
        query += `MERGE (l:Language { name : "${language.name}"}) MERGE (s) - [:SPEAKS] -> (l); `
    })
    var res = await queryNeo4j(query);
}

async function addCompanies(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${req.user.id} `;
    req.body.map(company => {
        query += `MERGE (c:Company { name : "${company.name}", field : "${company.field}", website : "${company.website}"}) MERGE (s) - [:WORKED_IN { startDate : "${company.startDate}" , endDate : "${company.endDate}", position : "${company.position}" }] -> (c) `;
        query += `MERGE (l:Location { latitude : ${company.latitude}, longitude : ${company.longitude}, city : "${company.city}", state : "${company.state}", country : "${company.country}", address : "${company.address}", postalCode : ${company.postalCode}}) CREATE (c) - [:LOCATED_IN] -> (l); `
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