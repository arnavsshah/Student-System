const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jEvent');


router.get('/', async(req, res) => {
    var events = await neo4jApi.getAllEvents(req.user.id);
    res.send(events);
})

router.get('/:club_name', async(req, res) => {
    var club_name = req.params.club_name;
    var events = await neo4jApi.getClubEvents(club_name, req.user.id);
    res.send(events);
})

router.get('/:id', async(req, res) => {
    var event_id = req.params.id;
    var event = await neo4jApi.getEvent(event_id, req.user.id);
    res.send(event);
})

router.post('/register/:id', async(req, res) => {
    var event_id = req.params.id;
    await neo4jApi.registerForEvent(req.user.id, event_id);
    res.send("registered for event");
})

router.post('/', async(req, res) => {
    await neo4jApi.addEvent(req.body, req.user.id);
    res.send("added event");
})


module.exports = router;