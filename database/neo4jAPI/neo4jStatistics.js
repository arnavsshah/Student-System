const driver = require('../../config/db');


async function getByDepartment() {
    var query = `MATCH (s:Student) WHERE s.department CONTAINS 'Engineering' RETURN s.department, COUNT(s);`
    var events = await queryNeo4j(query);
    var res = events.records.map(record => {
        return {
            department: record._fields[0],
            count: record._fields[1],
        }
    })
    return res;
}

async function getByScore() {
    var query = `MATCH (s:Student)-[si:STUDIED_IN]->(i:Institute) WHERE s.department CONTAINS 'Engineering' AND (i.name CONTAINS "Veermata" OR i.name CONTAINS "VJTI") RETURN s.department, AVG(toInteger(si.score));`
    var events = await queryNeo4j(query);
    var res = events.records.map(record => {
        return {
            department: record._fields[0],
            score: record._fields[1].toFixed(2),
        }
    })
    return res;
}

async function getBySem(user_id) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${user_id} WITH s MATCH(s1:Student) WHERE s1.semester = s.semester RETURN s1.class, COUNT(s);`
    var events = await queryNeo4j(query);
    var res = events.records.map(record => {
        return {
            class: record._fields[0].split('-')[1],
            count: record._fields[1],
        }
    })
    return res;
}

async function getBySkill(user_id) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${user_id} WITH s MATCH(s)-[:HAS]->(sk:Skill) <-[:HAS]- (s1:Student) RETURN sk.name, COUNT(s1);`
    var events = await queryNeo4j(query);
    var res = events.records.map(record => {
        return {
            department: record._fields[0],
            count: record._fields[1],
        }
    })
    return res;
}

async function getByAttribute(user_id) {
    var query = ``,
        events, res = [];
    query = `MATCH (s:Student) WHERE ID(s) = ${user_id} WITH s MATCH(s)-[r]->(:Skill) RETURN 'Skills', COUNT(r)`
    events = await queryNeo4j(query);
    if (events.records.length > 0) res.push({ attribute: events.records[0]._fields[0], count: events.records[0]._fields[1] })

    query = `MATCH (s:Student) WHERE ID(s) = ${user_id} WITH s MATCH(s)-[r]->(:Course) RETURN 'Courses', COUNT(r)`
    events = await queryNeo4j(query);
    if (events.records.length > 0) res.push({ attribute: events.records[0]._fields[0], count: events.records[0]._fields[1] })

    query = `MATCH (s:Student) WHERE ID(s) = ${user_id} WITH s MATCH(s)-[r]->(:Project) RETURN 'Projects', COUNT(r)`
    events = await queryNeo4j(query);
    if (events.records.length > 0) res.push({ attribute: events.records[0]._fields[0], count: events.records[0]._fields[1] })

    query = `MATCH (s:Student) WHERE ID(s) = ${user_id} WITH s MATCH(s)-[r]->(:Company) RETURN 'Jobs', COUNT(r)`
    events = await queryNeo4j(query);
    if (events.records.length > 0) res.push({ attribute: events.records[0]._fields[0], count: events.records[0]._fields[1] })

    return res;
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
    getByDepartment: getByDepartment,
    getByScore: getByScore,
    getBySem: getBySem,
    getBySkill: getBySkill,
    getByAttribute: getByAttribute,
}