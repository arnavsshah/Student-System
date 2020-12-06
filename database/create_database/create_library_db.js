const driver = require('../../config/db');
const fs = require('fs');
const csv = require('csv-reader');

try {
    let inputStream = fs.createReadStream('../../DATA/Books.txt', 'utf8');
    var i = 0;
    inputStream
        .pipe(new csv({ delimiter: ',', asObject: true, allowQuotes: true, parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', async function(row) {

            var res = await create_db(row);
            console.log(i);
            i++;

        })
        .on('end', function(data) {
            console.log('No more rows!');
            driver.close();
        });
} catch (err) {
    console.log(err);

}

async function create_db(data) {

    let session = driver.session();
    var bookData = {
        bookData_name: data.title,
        bookData_issued: 'false',
        bookData_image_url: data.image_url,
    };

    var authorData = {
        authordata_name: data.author,
    };

    var topics = data.category.split(' & ').join(', ').split(', ');
    var topicsData = topics.map(topic => {
        return {
            topicData_name: topic,
        };
    })

    var writeTxResultPromise = await session.writeTransaction(async txc => {

        var bookWrittenByAuthorData = {
            ...bookData,
            ...authorData,
        }
        var bookWrittenByAuthor = await txc.run('MERGE (b:Book { name : $bookData_name, issued : $bookData_issued, image_url : $bookData_image_url }) MERGE (a:Author { name : $authordata_name }) MERGE (b) -[:WRITTEN_BY]-> (a);', bookWrittenByAuthorData);

        topicsData.map(async topicData => {
            var bookHasTopicData = {
                ...bookData,
                ...topicData,
            }
            var bookHasTopic = await txc.run('MATCH (b:Book { name : $bookData_name, issued : $bookData_issued, image_url : $bookData_image_url }) MERGE (t:Topic { name : $topicData_name }) MERGE (b) -[:ABOUT]-> (t);', bookHasTopicData);
        });
    });
    session.close();
};