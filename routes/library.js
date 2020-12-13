const express = require("express");
const router = express.Router();

var neo4jApi = require('../database/neo4jAPI/neo4jLibrary');


router.get('/', async(req, res) => {
    var interestBased = await neo4jApi.interestBased(req);
    var bookBased = await neo4jApi.bookBased(req);
    var categoryBased = await neo4jApi.categoryBased(req);
    var authorBased = await neo4jApi.authorBased(req);
    var books = {
        interestBased: interestBased,
        bookBased: bookBased,
        categoryBased: categoryBased,
        authorBased: authorBased
    }
    res.send(books);
})

router.post('/issue', async(req, res) => {
    var book_id = req.body.id;
    var issueBook = await neo4jApi.issueBook(book_id, req);
    res.send(issueBook);
})



// router.post('/return', async(req, res) => {
//     var book_id = req.params.id;
//     var returnBook = await neo4jApi.returnBook(book_id, req);
//     res.send(returnBook);
// })


module.exports = router;