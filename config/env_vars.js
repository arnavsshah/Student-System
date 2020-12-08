const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


module.exports = {
    server_port: 5000,
    mapbox_api: process.env.REACT_APP_MAPBOX_TOKEN,
    database_url: process.env.DATABASE_URL,
    database_username: process.env.DATABASE_USERNAME,
    database_password: process.env.DATABASE_PASSWORD,
}