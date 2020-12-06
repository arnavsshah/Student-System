const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jLibrary');


router.get('/', async(req, res) => {
    var interestBasedBooks = await neo4jApi.interestBased();
    var studentBasedBook = await neo4jApi.bookBased();
    var categoryStudentBasedBook = await neo4jApi.categoryBased();
    var authorStudentBasedBook = await neo4jApi.authorBased();
    res.send('hello');
})

router.post('/issue/:id', async(req, res) => {
    var book_id = req.params.id;
    var issueBook = await neo4jApi.issueBook(book_id);
    res.send('hello');
})

router.post('/return/:id', async(req, res) => {
    var book_id = req.params.id;
    var returnBook = await neo4jApi.returnBook(book_id);
    res.send('hello');
})


module.exports = router;