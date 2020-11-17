const express = require("express");
const router = express.Router();
const driver = require('../config/db');

router.get('/', async(req, res) => {
        res.send("Hello Ganya");

        //example query
        const session = driver.session();
        const personName = 'Alice';
        try {
            const result = await session.run(
                'CREATE (a:Person {name: $name}) RETURN a', { name: personName }
            )

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);
            console.log(node.properties.name)
        } finally {
            await session.close()
        }

        // on application exit:
        await driver.close();
    })
    //for future routes
    // router.use('/register', require("./register"));
router.use("/users", require("./users"));
router.use("/search", require("./search"));


module.exports = router;