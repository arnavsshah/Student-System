const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "../client/src",
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
}).single('myImage')

var neo4jApi = require('../database/neo4jAPI/neo4jEvent');




router.get('/', async(req, res) => {
    var events = await neo4jApi.getAllEvents(req.user.id);
    res.send(events);
})

router.get('/registered', async(req, res) => {
    // console.log('in registered route')
    var events = await neo4jApi.getRegisteredEvents(req.user.id);
    // console.log("event s s s", events);
    res.send(events)
});
router.get('/:event_name', async(req, res) => {
    var event_name = req.params.event_name;
    var events = await neo4jApi.searchEvents(event_name, req.user.id);
    res.send(events);
})

router.get('/registered/:event_name', async(req, res) => {
    var event_name = req.params.event_name;
    var events = await neo4jApi.searchRegisteredEvents(event_name, req.user.id);
    res.send(events)
});

router.post('/', async(req, res) => {
    // upload(req, res, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         await neo4jApi.addEvent(req.body, req.user.id, req.file.filename);
    //     }
    // })
    await neo4jApi.addEvent(req.body, req.user.id, req.body.image_url);
    res.send("added event");
})

router.post('/register', async(req, res) => {
    // console.log('get post request')
    var event_id = req.body.event_id;
    await neo4jApi.registerForEvent(req.user.id, event_id);
    res.send("registered for event");
})



// router.get('/:id', async(req, res) => {
//     var event_id = req.params.id;
//     var event = await neo4jApi.getEvent(event_id, req.user.id);
//     res.send(event);
// })





module.exports = router;