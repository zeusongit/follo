require('dotenv').config();

module.exports = {
    DB_HOST : process.env.DB_HOST || 'mongodb://localhost:27017',
    APP_PORT : process.env.APP_PORT || 3000,
    JWT_KEY : process.env.JWT_KEY || 'test'
}
