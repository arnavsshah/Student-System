const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


module.exports = {
    server_port: process.env.SERVER_PORT,
    database_url: process.env.DATABASE_URL,
    database_username: process.env.DATABASE_USERNAME,
    database_password: process.env.DATABASE_PASSWORD,
}