const Knex = require('knex');

const dotenv = require('dotenv');

dotenv.config();

const knex = Knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    pool: { min: 0 }
});

module.exports = {
    knex
};