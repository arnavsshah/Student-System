const driver = require('../../config/db');

const session = driver.session();

var writeTxResultPromise = session.writeTransaction(async txc => {
    var res = await txc.run('CREATE (s:Student { id : "$id",name : "$name",age : "$age",email : "$email",phone : "$phone",currentlyStudying : "$currentlyStudying",department : "$department")', )
});

writeTxResultPromise
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
    .then(() => {
        session.close();
        // driver.close();
    })