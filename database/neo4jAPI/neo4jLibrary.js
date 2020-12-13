const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

async function interestBased(req) {
    console.log("inside interest ", req.user);
    var query = `MATCH (s:Student) -[:INTERESTED_IN_CATEGORY]-> (c:Category), (s) -[:READ]-> (b:Book) -[:ABOUT]-> (c) WHERE ID(s) = ${req.user.id} WITH s, c, COUNT(*) AS score MATCH (b:Book) -[:ABOUT]-> (c) WHERE NOT EXISTS((s) -[:READ]-> (b)) RETURN b, ID(b), SUM(score) AS score ORDER BY score DESC LIMIT 50;`
    var books = await queryNeo4j(query);
    var res = books.records.map(record => {
        return {
            ...record._fields[0].properties,
            id: record._fields[1],
        }
    })
    return res;
}

async function bookBased(req) {
    var query = `MATCH (s1:Student) -[:READ]-> (b:Book) <-[:READ]- (s2:Student) WHERE ID(s1) = ${req.user.id} AND ID(s1) <> ID(s2) WITH s1, s2, COUNT(b) AS score ORDER BY score MATCH (s2) -[:READ]-> (b:Book) WHERE NOT EXISTS((s1) -[:READ]-> (b)) RETURN b, ID(b) LIMIT 50;`;
    var books = await queryNeo4j(query);
    var res = books.records.map(record => {
        return {
            ...record._fields[0].properties,
            id: record._fields[1],
        }
    })
    return res;
}

async function categoryBased(req) {
    var query = `MATCH (s1:Student) -[:INTERESTED_IN_CATEGORY]-> (c:Category) <-[:INTERESTED_IN_CATEGORY]- (s2:Student) WHERE ID(s1) = ${req.user.id} AND ID(s1) <> ID(s2) WITH s1, s2, COUNT(c) AS score ORDER BY score MATCH (s2) -[:READ]-> (b:Book) WHERE NOT EXISTS((s1) -[:READ]-> (b)) RETURN b, ID(b) LIMIT 50;`;
    var books = await queryNeo4j(query);
    var res = books.records.map(record => {
        return {
            ...record._fields[0].properties,
            id: record._fields[1],
        }
    })
    return res;
}

async function authorBased(req) {
    var query = `MATCH (s1:Student) -[:AUTHOR_READ]-> (a:Author) <-[:AUTHOR_READ]- (s2:Student) WHERE ID(s1) = ${req.user.id} AND ID(s1) <> ID(s2) WITH s1, s2, COUNT(a) AS score ORDER BY score MATCH (s2) -[:READ]-> (b:Book) WHERE NOT EXISTS((s1) -[:READ]-> (b)) RETURN b, ID(b) LIMIT 50;`;
    var books = await queryNeo4j(query);
    var res = books.records.map(record => {
        return {
            ...record._fields[0].properties,
            id: record._fields[1],
        }
    })
    return res;
}

async function issueBook(book_id, req) {
    var query = `MATCH (b:Book) WHERE ID(b) = ${book_id} RETURN b.issued;`
    var issue_book = await queryNeo4j(query);
    if (issue_book.records._fields[0] === 'true') return false;
    else {
        query = `MATCH (b:Book) WHERE ID(b) = ${book_id} SET b.issued = 'true' WITH b MATCH(s:Student) WHERE ID(s) = ${req.user.id} MERGE (b) -[:ISSUED_BY]-> (s) MERGE (s) -[:READ]-> (b);`
        issue_book = await queryNeo4j(query);
        return true;
    }
}

// async function returnBook(book_id, req) {
//     var query = `MATCH (b:Book) WHERE ID(b) = ${book_id} SET b.isIssued = 'false' WITH b MATCH(s:Student) <-[i:ISSUED_BY]- (b) WHERE ID(s) = ${req.user.id} DELETE i;`
//     var return_book = await queryNeo4j(query);
//     return false;
// }

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
    interestBased: interestBased,
    bookBased: bookBased,
    categoryBased: categoryBased,
    authorBased: authorBased,
    issueBook: issueBook,
    returnBook: returnBook,
}