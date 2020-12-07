const driver = require('../../config/db');
const fs = require('fs');
const csv = require('csv-reader');
const lineByLine = require('n-readlines');

try {

    readData().then(val => {
        console.log("end");

    })

} catch (err) {
    console.log(err);

}

async function readData() {
    const liner = new lineByLine('../../DATA/Books.txt');

    let line = liner.next();
    var session = driver.session();
    var i = 0;
    var categorySet = new Set();
    while (line = liner.next()) {
        var row = line.toString('ascii');
        var rowSplit = row.substring(1, row.length - 2).split("\",\"");
        var data = {
            image_url: rowSplit[2],
            title: rowSplit[3],
            author: rowSplit[4],
            category: rowSplit[6],
        }
        if (!categorySet.has(data.category)) {
            if (i < 300) {
                i++;
                var res = await create_db(data, session);
                console.log(i);
            }
            if (i === 300) {
                categorySet.add(data.category);
                console.log(categorySet);
                i = 0;
            }
        }
    }
    session.close();
    driver.close();

    console.log('end of line reached');
}


async function create_db(data, session) {

    // let session = driver.session();
    var bookData = {
        bookData_name: data.title,
        bookData_issued: 'false',
        bookData_image_url: data.image_url,
    };

    var authorData = {
        authordata_name: data.author,
    };
    if (data.category === undefined) return;
    var categories = data.category.split(' & ').join(', ').split(', ');
    var categoriesData = categories.map(category => {
        return {
            categoryData_name: category,
        };
    })

    var writeTxResultPromise = await session.writeTransaction(async txc => {

        var bookWrittenByAuthorData = {
            ...bookData,
            ...authorData,
        }
        var bookWrittenByAuthor = await txc.run('MERGE (b:Book { name : $bookData_name, issued : $bookData_issued, image_url : $bookData_image_url }) MERGE (a:Author { name : $authordata_name }) MERGE (b) -[:WRITTEN_BY]-> (a);', bookWrittenByAuthorData);

        categoriesData.map(async categoryData => {
            var bookHasCategoryData = {
                ...bookData,
                ...categoryData,
            }
            var bookHasCategory = await txc.run('MATCH (b:Book { name : $bookData_name, issued : $bookData_issued, image_url : $bookData_image_url }) MERGE (c:Category { name : $categoryData_name }) MERGE (b) -[:ABOUT]-> (c);', bookHasCategoryData);
        });
    });
    // session.close();
};