require('dotenv').config();

module.exports = {
    DB_HOST : process.env.DB_HOST,
    APP_PORT : process.env.APP_PORT,
    JWT_KEY : process.env.JWT_KEY
}
