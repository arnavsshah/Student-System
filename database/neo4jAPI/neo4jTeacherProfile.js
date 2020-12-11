const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

//GET queries

async function map() {
    var query = `MATCH (t:Teacher)-[stud:STUDIED_IN]->(i:Institute)-[:LOCATED_IN]->(li), (t)-[work:WORKED_IN]->(c:Company)-[:LOCATED_IN]->(lc) WHERE ID(t) = ${req.user.id} RETURN i, li, c, lc ORDER BY stud.startDate, work.startDate `
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

async function getTeacher(req) {
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} RETURN t, ID(t)`;
    var teacher = await queryNeo4j(query);
    var res = {
        ...teacher.records[0]._fields[0].properties,
        user_id: student.records[0]._fields[1].properties,
    }

    return res;
}

async function getInstitutes(req) {
    var query = `MATCH (t:Teacher) -[st:STUDIED_IN]-> (i) WHERE ID(t) = ${req.user.id} RETURN st, i`;
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
    var query = `MATCH (t:Teacher) -[:HAS]-> (sk) WHERE ID(t) = ${req.user.id} RETURN sk;`;
    var skills = await queryNeo4j(query);
    var res = skills.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getCourses(req) {
    var query = `MATCH (t:Teacher) -[:COMPLETED]-> (c) WHERE ID(t) = ${req.user.id} RETURN c`;
    var courses = await queryNeo4j(query);
    var res = courses.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getProjects(req) {
    var query = `MATCH (t:Teacher)-[:HAS_DONE]-> (p) WHERE ID(t) = ${req.user.id} RETURN p`;
    var projects = await queryNeo4j(query);
    var res = projects.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getAchievements(req) {
    var query = `MATCH (t:Teacher) -[:HAS_ACHIEVED]-> (a) WHERE ID(t) = ${req.user.id} RETURN a`;
    var achievements = await queryNeo4j(query);
    var res = achievements.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getResearchPapers(req) {
    var query = `MATCH (t:Teacher)-[:PUBLISHED]-> (r) WHERE ID(t) = ${req.user.id} RETURN r`;
    var researchPapers = await queryNeo4j(query);
    var res = researchPapers.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getInterests(req) {
    var query = `MATCH (t:Teacher) -[:INTERESTED_IN]-> (i) WHERE ID(t) = ${req.user.id} RETURN i`;
    var interests = await queryNeo4j(query);
    var res = interests.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}


async function getLanguages(req) {
    var query = `MATCH (t:Teacher) -[:SPEAKS]-> (l) WHERE ID(t) = ${req.user.id} RETURN l`;
    var languages = await queryNeo4j(query);
    var res = languages.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getCompanies(req) {
    var query = `MATCH (t:Teacher) -[w:WORKED_IN]-> (c) WHERE ID(t) = ${req.user.id} RETURN c, w`;
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
    var i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;
    req.body.map(institute => {
        i++;
        query += `MERGE (i:Institute { name : "${institute.name}", degree : "${institute.degree}" } ) MERGE (t) - [:STUDIED_IN { startDate : "${institute.startDate}", endDate : "${institute.endDate}", score : ${institute.score} }] -> (i) `
        query += `MERGE (l:Location { latitude : ${institute.latitude}, longitude : ${institute.longitude}, city : "${institute.city}", state : "${institute.state}", country : "${institute.country}", address : "${institute.address}", postalCode : ${institute.postalCode}}) MERGE (i) - [:LOCATED_IN] -> (l) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
    })
    var res = await queryNeo4j(query);
}

async function addSkills(req) {
    let i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;
    req.body.map(skill => {
        i++;
        query += `MERGE (sk:Skill { name : "${skill.name}"}) MERGE (t) - [:HAS] -> (sk) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
    })
    var res = await queryNeo4j(query);
}

async function addCourses(req) {
    var i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;
    req.body.map(course => {
        i++;
        query += `MERGE (c:Course { name : "${course.name}"}) MERGE (t) - [:COMPLETED] -> (c) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
    })
    var res = await queryNeo4j(query);
}

async function addProjects(req) {
    var i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;

    req.body.map(project => {
        i++;
        query += `MERGE (p:Project { name : "${project.name}", description : "${project.description}"}) MERGE (t) - [:HAS_DONE] -> (p) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
    })
    var res = await queryNeo4j(query);
}

async function addAchievements(req) {
    var i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;
    req.body.map(achievement => {
        i++;
        query += `MERGE (a:Achievement { title : "${achievement.title}", description : "${achievement.description}"}) MERGE (t) - [:HAS_ACHIEVED] -> (a) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
    })
    var res = await queryNeo4j(query);
}

async function addResearchPapers(req) {
    var i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;
    req.body.map(researchPaper => {
        i++;
        query += `MERGE (r:ResearchPaper { title : ${researchPaper.title}, description : "${researchPaper.description}"}) MERGE (t) - [:PUBLISHED] -> (r) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
    })
    var res = await queryNeo4j(query);
}

async function addInterests(req) {
    var i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;
    req.body.map(interest => {
        i++;
        query += `MERGE (i:Interest { name : "${interest.name}"}) MERGE (t) - [:INTERESTED_IN] -> (i) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
    })
    var res = await queryNeo4j(query);
}


async function addLanguages(req) {
    var i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;
    req.body.map(language => {
        i++;
        query += `MERGE (l:Language { name : "${language.name}"}) MERGE (t) - [:SPEAKS] -> (l) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
    })
    var res = await queryNeo4j(query);
}

async function addCompanies(req) {
    var i = 0;
    var query = `MATCH (t:Teacher) WHERE ID(t) = ${req.user.id} `;
    req.body.map(company => {
        i++;
        query += `MERGE (c:Company { name : "${company.name}", field : "${company.field}", website : "${company.website}"}) MERGE (t) - [:WORKED_IN { startDate : "${company.startDate}" , endDate : "${company.endDate}", position : "${company.position}" }] -> (c) `;
        query += `MERGE (l:Location { latitude : ${company.latitude}, longitude : ${company.longitude}, city : "${company.city}", state : "${company.state}", country : "${company.country}", address : "${company.address}", postalCode : ${company.postalCode}}) CREATE (c) - [:LOCATED_IN] -> (l) `
        if (i !== req.body.length) {
            query += `WITH t `
        }
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
    getTeacher: getTeacher,
    getInstitutes: getInstitutes,
    getSkills: getSkills,
    getCourses: getCourses,
    getProjects: getProjects,
    getAchievements: getAchievements,
    getResearchPapers: getResearchPapers,
    getInterests: getInterests,
    getLanguages: getLanguages,
    getCompanies: getCompanies,
    getRegisteredEvents: getRegisteredEvents,
    getPendingEvents: getPendingEvents,
    addInstitutes: addInstitutes,
    addSkills: addSkills,
    addCourses: addCourses,
    addProjects: addProjects,
    addAchievements: addAchievements,
    addResearchPapers: addResearchPapers,
    addInterests: addInterests,
    addLanguages: addLanguages,
    addCompanies: addCompanies,
}