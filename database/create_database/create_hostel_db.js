const driver = require('../../config/db');


create_db().then(res => {
    console.log("hostel data end");
    driver.close();
});


async function create_db() {
    let session = driver.session();
    var writeTxResultPromise = await session.writeTransaction(async txc => {

        var query = `MERGE (h:Hostel { name : "VJTI"}) `
        query += `MERGE (b1:Block { number : 1}) MERGE (h) -[:HAS_BLOCK]-> (b1) `
        query += `MERGE (b2:Block { number : 2}) MERGE (h) -[:HAS_BLOCK]-> (b2) `
        query += `MERGE (b3:Block { number : 3}) MERGE (h) -[:HAS_BLOCK]-> (b3) `
        query += `MERGE (b4:Block { number : 4}) MERGE (h) -[:HAS_BLOCK]-> (b4) `

        query += `CREATE (f11:Floor {number : 1}) MERGE (b1) -[:HAS_FLOOR]-> (f11) `
        query += `CREATE (f12:Floor {number : 2}) MERGE (b1) -[:HAS_FLOOR]-> (f12) `
        query += `CREATE (f13:Floor {number : 3}) MERGE (b1) -[:HAS_FLOOR]-> (f13) `
        query += `CREATE (f14:Floor {number : 4}) MERGE (b1) -[:HAS_FLOOR]-> (f14) `

        query += `CREATE (f21:Floor {number : 1}) MERGE (b2) -[:HAS_FLOOR]-> (f21) `
        query += `CREATE (f22:Floor {number : 2}) MERGE (b2) -[:HAS_FLOOR]-> (f22) `
        query += `CREATE (f23:Floor {number : 3}) MERGE (b2) -[:HAS_FLOOR]-> (f23) `
        query += `CREATE (f24:Floor {number : 4}) MERGE (b2) -[:HAS_FLOOR]-> (f24) `

        query += `CREATE (f31:Floor {number : 1}) MERGE (b3) -[:HAS_FLOOR]-> (f31) `
        query += `CREATE (f32:Floor {number : 2}) MERGE (b3) -[:HAS_FLOOR]-> (f32) `
        query += `CREATE (f33:Floor {number : 3}) MERGE (b3) -[:HAS_FLOOR]-> (f33) `
        query += `CREATE (f34:Floor {number : 4}) MERGE (b3) -[:HAS_FLOOR]-> (f34) `

        query += `CREATE (f41:Floor {number : 1}) MERGE (b4) -[:HAS_FLOOR]-> (f41) `
        query += `CREATE (f42:Floor {number : 2}) MERGE (b4) -[:HAS_FLOOR]-> (f42) `
        query += `CREATE (f43:Floor {number : 3}) MERGE (b4) -[:HAS_FLOOR]-> (f43) `
        query += `CREATE (f44:Floor {number : 4}) MERGE (b4) -[:HAS_FLOOR]-> (f44) `


        for (var i = 1; i <= 4; i++) {
            for (var j = 1; j <= 4; j++) {
                for (var k = 1; k <= 10; k++) {
                    query += `CREATE (r${i}${j}${k}:Room {number : ${k}, capacity : 3}) MERGE (f${i}${j}) -[:HAS_ROOM]-> (r${i}${j}${k}) `
                }
            }
        }
        var res = await txc.run(query);
        return res;
    });
    session.close();
}