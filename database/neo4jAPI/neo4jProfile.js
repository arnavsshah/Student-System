const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

//GET queries

async function map(req) {
    var query = `MATCH (s)-[stud:STUDIED_IN]->(i:Institute)-[:LOCATED_IN]->(li), (s)-[work:WORKED_IN]->(c:Company)-[:LOCATED_IN]->(lc) WHERE ID(s) = ${req.user.id} RETURN i, li, c, lc ORDER BY stud.startDate, work.startDate `
    var mapDisplay = await queryNeo4j(query);
    var res = mapDisplay.records.map(record => {
        return {
            institute: {...record._fields[0].properties },
            instituteLocation: {...record._fields[1].properties },
            company: {...record._fields[2].properties },
            companyLocation: {...record._fields[3].properties },
        }
    })
    return res;
}

async function getUser(req) {
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} RETURN s, ID(s)`;
    var user = await queryNeo4j(query);
    var res = user.records.map(record => {
        return {
            ...record._fields[0].properties,
            user_id: record._fields[1].properties,
        }
    })

    return res[0];
}

async function getHostel(req) {
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} WITH s MATCH (s) -[:HOSTEL_ROOM]-> (r) <-[:HAS_ROOM]- (f:Floor) <-[:HAS_FLOOR]- (b:Block) RETURN r, f, b;`;
    var user = await queryNeo4j(query);
    var res = user.records.map(record => {
        return {
            room: {...record._fields[0].properties},
            floor: {...record._fields[1].properties},
            block: {...record._fields[2].properties},
        }
    })
    console.log('resssss', res)
    return res;
}


async function getNotices(req) {
    var query = `MATCH (s:Student) -[:RECEIVED]-> (n:Notice) WHERE ID(s) = ${req.user.id} RETURN n ORDER BY ID(n) DESC;`
    var notices = await queryNeo4j(query);
    var res = notices.records.map(record => {
        return {
            ...record._fields[0].properties,
        }
    })
    return res;
}
async function getInstitutes(req) {
    var query = `MATCH (s) -[st:STUDIED_IN]-> (i) WHERE ID(s) = ${req.user.id} RETURN st, i`;
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
    // console.log("inside", req.user)
    var query = `MATCH (s) -[:HAS]-> (sk) WHERE ID(s) = ${req.user.id} RETURN sk;`;
    var skills = await queryNeo4j(query);
    var res = skills.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getCourses(req) {
    var query = `MATCH (s) -[:COMPLETED]-> (c) WHERE ID(s) = ${req.user.id} RETURN c`;
    var courses = await queryNeo4j(query);
    var res = courses.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getProjects(req) {
    var query = `MATCH (s)-[:HAS_DONE]-> (p) WHERE ID(s) = ${req.user.id} RETURN p`;
    var projects = await queryNeo4j(query);
    var res = projects.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getAchievements(req) {
    var query = `MATCH (s) -[:HAS_ACHIEVED]-> (a) WHERE ID(s) = ${req.user.id} RETURN a`;
    var achievements = await queryNeo4j(query);
    var res = achievements.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getResearchPapers(req) {
    var query = `MATCH (s)-[:PUBLISHED]-> (r) WHERE ID(s) = ${req.user.id} RETURN r`;
    var researchPapers = await queryNeo4j(query);
    var res = researchPapers.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getInterests(req) {
    var query = `MATCH (s) -[:INTERESTED_IN]-> (i) WHERE ID(s) = ${req.user.id} RETURN i`;
    var interests = await queryNeo4j(query);
    var res = interests.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getClubs(req) {
    var query = `MATCH (s) -[p:PART_OF]-> (c) WHERE ID(s) = ${req.user.id} RETURN c, p`;
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
    var query = `MATCH (s) -[:SPEAKS]-> (l) WHERE ID(s) = ${req.user.id} RETURN l`;
    var languages = await queryNeo4j(query);
    var res = languages.records.map(record => {
        return record._fields[0].properties
    })
    return res;
}

async function getCompanies(req) {
    var query = `MATCH (s) -[w:WORKED_IN]-> (c) WHERE ID(s) = ${req.user.id} RETURN c, w`;
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
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(institute => {
        i++;
        query += `MERGE (i:Institute { name : "${institute.name}", degree : "${institute.degree}" } ) MERGE (s) - [:STUDIED_IN { startDate : "${institute.startDate}", endDate : "${institute.endDate}", score : ${institute.score} }] -> (i) `
        query += `MERGE (l:Location { latitude : ${institute.latitude}, longitude : ${institute.longitude}, city : "${institute.city}", state : "${institute.state}", country : "${institute.country}", address : "${institute.address}", postalCode : ${institute.postalCode}}) MERGE (i) - [:LOCATED_IN] -> (l) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addSkills(req) {
    let i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(skill => {
        i++;
        query += `MERGE (sk:Skill { name : "${skill.name}"}) MERGE (s) - [:HAS] -> (sk) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addCourses(req) {
    var i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(course => {
        i++;
        query += `MERGE (c:Course { name : "${course.name}"}) MERGE (s) - [:COMPLETED] -> (c) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addProjects(req) {
    var i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;

    req.body.map(project => {
        i++;
        query += `MERGE (p:Project { name : "${project.name}", description : "${project.description}"}) MERGE (s) - [:HAS_DONE] -> (p) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addAchievements(req) {
    var i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(achievement => {
        i++;
        query += `MERGE (a:Achievement { title : "${achievement.title}", description : "${achievement.description}"}) MERGE (s) - [:HAS_ACHIEVED] -> (a) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addResearchPapers(req) {
    var i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(researchPaper => {
        i++;
        query += `MERGE (r:ResearchPaper { title : ${researchPaper.title}, description : "${researchPaper.description}"}) MERGE (s) - [:PUBLISHED] -> (r) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addInterests(req) {
    var i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(interest => {
        i++;
        query += `MERGE (i:Interest { name : "${interest.name}"}) MERGE (s) - [:INTERESTED_IN] -> (i) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addClubs(req) {
    var i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(club => {
        i++;
        query += `MERGE (c:Club { name : "${club.name}"}) MERGE (s) - [:PART_OF {startDate : "${club.startDate}", endDate : "${club.endDate}", position : "${club.position}"}] -> (c) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addLanguages(req) {
    var i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(language => {
        i++;
        query += `MERGE (l:Language { name : "${language.name}"}) MERGE (s) - [:SPEAKS] -> (l) `
        if (i !== req.body.length) {
            query += `WITH s `
        }
    })
    var res = await queryNeo4j(query);
}

async function addCompanies(req) {
    var i = 0;
    var query = `MATCH (s) WHERE ID(s) = ${req.user.id} `;
    req.body.map(company => {
        i++;
        query += `MERGE (c:Company { name : "${company.name}", field : "${company.field}", website : "${company.website}"}) MERGE (s) - [:WORKED_IN { startDate : "${company.startDate}" , endDate : "${company.endDate}", position : "${company.position}" }] -> (c) `;
        query += `MERGE (l:Location { latitude : ${company.latitude}, longitude : ${company.longitude}, city : "${company.city}", state : "${company.state}", country : "${company.country}", address : "${company.address}", postalCode : ${company.postalCode}}) CREATE (c) - [:LOCATED_IN] -> (l) `
        if (i !== req.body.length) {
            query += `WITH s `
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
    map: map,
    getUser: getUser,
    getHostel: getHostel,
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
    getNotices: getNotices,
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