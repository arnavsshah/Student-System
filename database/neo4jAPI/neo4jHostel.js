const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query

async function getRoom(req) {
    var query = `MATCH (s:Student) WHERE ID(s) = 15673 RETURN s;`;
    var student = await queryNeo4j(query);

    var student_properties = student.records[0]._fields[0].properties;
    var hostelData = {}

    if (student_properties.class.substring(0, 2) === 'FY') hostelData.block = 1;
    else if (student_properties.class.substring(0, 2) === 'SY') hostelData.block = 2;
    else if (student_properties.class.substring(0, 2) === 'TY') hostelData.block = 3;
    else hostelData.block = 4;

    hostelData.floor = req.body.floor_pref;
    hostelData.room = req.body.room_pref;

    var res = await assignRoom(hostelData);
    if (res.room !== -1) {

        query = `MATCH (r:Room {number : ${res.room}}) <-[:HAS_ROOM]- (f:Floor {number : ${res.floor}}) <-[:HAS_FLOOR]- (b:Block {number : ${res.block}}) `
        query += `SET r.capacity = r.capacity - 1 RETURN r;`
        var updateCapacity = await queryNeo4j(query);

        query = `MATCH (r:Room {number : ${res.room}}) <-[:HAS_ROOM]- (f:Floor {number : ${res.floor}}) <-[:HAS_FLOOR]- (b:Block {number : ${res.block}}) WITH r `
        query += `MATCH (s:Student) WHERE ID(s) = ${req.user.id} MERGE (s) -[:HOSTEL_ROOM]-> (r);`
        var giveRoom = await queryNeo4j(query);

    }
    return res;
}

async function assignRoom(hostelData) {
    var query = `MATCH (h:Hostel) -[:HAS_BLOCK]-> (b:Block{number : ${hostelData.block}}) -[:HAS_FLOOR]-> (f:Floor{number : ${hostelData.floor}}) -[:HAS_ROOM]-> (r:Room{number : ${hostelData.room}}) RETURN r, f;`;
    var isRoom = await queryNeo4j(query);
    if (isRoom.records[0]._fields[0].properties.capacity > 0) return hostelData;

    query = `MATCH (h:Hostel) -[:HAS_BLOCK]-> (b:Block{number : ${hostelData.block}}) -[:HAS_FLOOR]-> (f:Floor{number : ${hostelData.floor}}) -[:HAS_ROOM]-> (r:Room) RETURN r, f;`;
    var rooms = await queryNeo4j(query);
    for (var i = 0; i < rooms.records.length; i++) {
        var record = rooms.records[i];
        if (record._fields[0].properties.capacity > 0) {
            return {
                block: hostelData.block,
                floor: hostelData.floor,
                room: record._fields[0].properties.number,
            }
        }
    }
    return {
        block: hostelData.block,
        floor: hostelData.floor,
        room: -1,
    }
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
    getRoom: getRoom,
}