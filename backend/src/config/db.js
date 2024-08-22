const mysql = require('mysql');

const pool = mysql.createPool({
    host:               process.env.MYSQL_HOST,
    user:               process.env.MYSQL_USER,
    password:           process.env.MYSQL_PASSWORD,
    database:           process.env.MYSQL_DATABASE,
    connectionLimit:    10,
    connectTimeout:     10 * 1000, 
    acquireTimeout:     10 * 1000,
    timeout:            60 * 1000,
    charset:            'utf8mb4',
    debug:              false
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    if (connection) connection.release();
    console.log('Connected to MySQL successfully...');
});

module.exports = pool;