const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

async function studentsInLocation(req) {
    // console.log("req inside route",req.body);
    var query = `MATCH (s:Student)-[:LIVES_IN]->(l:Location) WHERE l.address CONTAINS '${req.body.place}' RETURN s, l LIMIT 10;`
    var res = await queryNeo4j(query);
    // console.log("res inside route", res);
    var result = res.records.map(record => {
        return {
            student: {...record._fields[0].properties },
            studentLocation: {...record._fields[1].properties },
            company: {},
            companyLocation: {},
            institute: {},
            instituteLocation: { },
        }
    })
    console.log('spatial ssss',result);
    return result;
}

async function studentsLivedWithinDistance(req) {
    var query = `MATCH (s1: Student)-[:LIVES_IN]->(l) WHERE ID(s1) = ${req.user.id} WITH point(l) AS stud MATCH (s2:Student)-[:LIVES_IN]->(x) WITH distance(point(x), stud) AS dist, s2, x WHERE dist < ${req.body.distance*1000} RETURN s2, x ORDER BY dist `
    var res = await queryNeo4j(query);
    var result = res.records.map(record => {
        return {
            student: {...record._fields[0].properties },
            studentLocation: {...record._fields[1].properties },
            company: {},
            companyLocation: {},
            institute: {},
            instituteLocation: {},
        }
    })
    return result;
}

async function studentsWorkedWithinDistance(req) {
    var query = `MATCH (s1: Student)-[:LIVES_IN]->(l) WHERE ID(s1) = ${req.user.id} WITH point(l) AS stud MATCH (s2:Student)-[:WORKED_IN]->(c:Company)-[:LOCATED_IN]->(x) WITH distance(point(x), stud) AS dist,s2,x,c WHERE dist < ${req.body.nearbyWorking*1000} RETURN s2, c, x ORDER BY dist `
    var res = await queryNeo4j(query);
    var result = res.records.map(record => {
        return {
            student: {...record._fields[0].properties },
            studentLocation: {},
            company: {...record._fields[1].properties },
            companyLocation: {...record._fields[0].properties },
            institute: {},
            instituteLocation: {},
        }
    })
    return result;
}

async function studentsStudiedWithinDistance(req) {
    var query = `MATCH (s1: Student)-[:LIVES_IN]->(l) WHERE ID(s1) = ${req.user.id} WITH point(l) AS stud MATCH (s2:Student)-[:STUDIED_IN]->(i:Institute)-[:LOCATED_IN]->(x) WITH distance(point(x), stud) AS dist,s2,x,i WHERE dist < ${req.body.nearbyStudying*1000} RETURN s2, i, x ORDER BY dist`
    var res = await queryNeo4j(query);
    var result = res.records.map(record => {
        return {
            student: {...record._fields[0].properties },
            studentLocation: {},
            company: {},
            companyLocation: {},
            institute: {...record._fields[1].properties },
            instituteLocation: {...record._fields[0].properties },
        }
    })
    return result;
}

async function studentsInYear(req) {
    var query = `MATCH (i:Institute)<-[si:STUDIED_IN]-(s:Student)-[:LIVES_IN]->(l:Location) WHERE i.name CONTAINS "Veermata" OR i.name CONTAINS "VJTI" AND si.startDate CONTAINS "${req.body.startYear}" RETURN s, l`
    var res = await queryNeo4j(query);
    var result = res.records.map(record => {
        return {
            student: {...record._fields[0].properties },
            studentLocation: {...record._fields[1].properties },
            company: {},
            companyLocation: {},
            institute: {},
            instituteLocation: {},
        }
    })
    return result;
}

async function teacherLocation(req) {
    var query = `MATCH (t:Teacher)-[:LIVES_IN]->(x) RETURN t, x `
    var res = await queryNeo4j(query);
    var result = res.records.map(record => {
        return {
            teacher: {...record._fields[0].properties },
            teacherLocation: {...record._fields[1].properties },
        }
    })
    return result;
}

async function teacherDepartmentWiseLocation(req) {
    var query = `MATCH (t:Teacher)-[:LIVES_IN]->(x) WITH t, x WHERE t.department = "${req.body.department}" RETURN t, x `
    var res = await queryNeo4j(query);
    var result = res.records.map(record => {
        return {
            teacher: {...record._fields[0].properties },
            teacherLocation: {...record._fields[1].properties },
        }
    })
    return result;
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
    studentsInLocation: studentsInLocation,
    studentsLivedWithinDistance: studentsLivedWithinDistance,
    studentsWorkedWithinDistance: studentsWorkedWithinDistance,
    studentsStudiedWithinDistance: studentsStudiedWithinDistance,
    studentsInYear: studentsInYear,
    teacherLocation: teacherLocation,
    teacherDepartmentWiseLocation: teacherDepartmentWiseLocation,
}