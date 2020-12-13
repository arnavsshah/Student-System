const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

async function getNotice(user_id) {
    var query = `MATCH (s:Student) -[:RECEIVED]-> (n:Notice) WHERE ID(s) = ${user_id} RETURN n ORDER BY ID(n) DESC;`
    var notices = await queryNeo4j(query);
    var res = notices.records.map(record => {
        return {
            ...record._fields[0].properties,
        }
    })
    return res;
}

async function addNotice(notice, teacher_id) {
    var query = `CREATE (n:Notice { title : "${notice.title}", content : "${notice.content}", class : "${notice.class}" }) WITH n MATCH (t: Teacher) WHERE ID(t) = ${teacher_id} WITH t CREATE (t) -[:SENT]-> (n) WITH n MATCH (s: Student) WHERE s.class = "${notice.class}" CREATE (s) -[:RECEIVED]-> (n);`
    // var query = `CREATE (n:Notice { title : "${notice.title}", content : "${notice.content}", class : "${notice.class}" }) CREATE (t:Teacher) -[:SENT]-> (n) WHERE ID(t) = ${teacher_id} CREATE (s:Student) -[:RECEIVED]-> (n) WHERE s.class = "${notice.class}";`
    var notice = await queryNeo4j(query);
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
    getNotice: getNotice,
    addNotice: addNotice,
}