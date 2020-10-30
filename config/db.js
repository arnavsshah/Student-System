const neo4j = require('neo4j-driver');

const {
    database_url,
    database_username,
    database_password
} = require('./env_vars');


const driver = neo4j.driver(database_url, neo4j.auth.basic(
    database_username, database_password
))

module.exports = driver;