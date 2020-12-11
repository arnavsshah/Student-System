const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

async function getAllEvents(user_id) {
    var query = `MATCH (e:Event) WITH e OPTIONAL MATCH (s:Student) -[h:HAS_REGISTERED]-> (e) WHERE ID(s) = ${user_id} RETURN e, ID(e), h;`
    var events = await queryNeo4j(query);
    var res = events.records.map(record => {
        return {
            ...record._fields[0].properties,
            event_id: record._fields[1],
            user_id: user_id,
            has_registered: record._fields[2] !== null,
        }
    })
    return res;
}

async function searchEvents(event_name, user_id) {
    var query = `MATCH (e:Event) WHERE e.club_name CONTAINS "${event_name}" OR e.title CONTAINS "${event_name}" OR e.description CONTAINS "${event_name}" WITH e OPTIONAL MATCH (s:Student) -[h:HAS_REGISTERED]-> (e) WHERE ID(s) = ${user_id} RETURN e, ID(e), h;`
    var events = await queryNeo4j(query);
    var res = events.records.map(record => {
        return {
            ...record._fields[0].properties,
            event_id: record._fields[1],
            user_id: user_id,
            has_registered: record._fields[2] !== null,
        }
    })
    return res;
}


async function getRegisteredEvents(user_id) {
    var query = `MATCH (s:Student) -[:REGISTERED_FOR]-> (e:Event) WHERE ID(s) = ${user_id} RETURN e, ID(e);`;
    var events = await queryNeo4j(query);
    var res = events.records.map(record => {
        return {
            ...record._fields[0].properties,
            event_id: record._fields[1],
            user_id: user_id,
        }
    })
    return res;
}

async function searchRegisteredEvents(event_name, user_id) {
    var query = `MATCH (s:Student) -[:REGISTERED_FOR]-> (e:Event) WHERE ID(s) = ${user_id} AND (e.club_name CONTAINS "${event_name}" OR e.title CONTAINS "${event_name}" OR e.description CONTAINS "${event_name}") RETURN e, ID(e);`;
    var events = await queryNeo4j(query);
    var res = events.records.map(record => {
        return {
            ...record._fields[0].properties,
            event_id: record._fields[1],
            user_id: user_id,
        }
    })
    return res;
}

// async function getEvent(event_id, user_id) {
//     var query = `MATCH (e:Event) WHERE ID(e) = ${event_id} WITH e OPTIONAL MATCH (s:Student) -[h:HAS_REGISTERED]-> (e) WHERE ID(s) = ${user_id} RETURN e, ID(e), h;`
//     var event = await queryNeo4j(query);
//     var res = event.records.map(record => {
//         return {
//             ...record._fields[0].properties,
//             event_id: record._fields[1],
//             user_id: user_id,
//             has_registered: h !== null,
//         }
//     })
//     return res;
// }

async function registerForEvent(user_id, event_id) {
    var query = `MERGE (s:Student) -[:REGISTERED_FOR]-> (e:Event) WHERE ID(s) = ${user_id} WHERE ID(e) = ${event_id};`
    var res = await queryNeo4j(query);
}

async function addEvent(event, user_id) {
    var query = `MATCH (s:Student) WHERE ID(s) = ${user_id} WITH s MERGE (e:Event) { club_name : "${event.club_name}", title : "${event.title}", description : "${event.description}", date : "${event.date}", prize : "${event.prize}", prerequistes : "${event.prerequistes}", coordinator : "${event.coordinator}", contact : "${event.contact}", comments : "${event.comments}", image_url : "${event.image_url}"} MERGE (s) -[:CREATES]-> (e);`
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
    getAllEvents: getAllEvents,
    searchEvents: searchEvents,
    getEvent: getEvent,
    getRegisteredEvents: getRegisteredEvents,
    searchRegisteredEvents: searchRegisteredEvents,
    registerForEvent: registerForEvent,
    addEvent: addEvent,
}