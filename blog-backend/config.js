const {Pool} =require('pg')

const pool = new Pool({
    user:'postgres',
    password:'828628',
    host:'localhost',
    port:5432,
    database:'Blog'
})

module.exports = pool;