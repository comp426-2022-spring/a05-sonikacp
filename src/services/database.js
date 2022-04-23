// Put your database code here
// require better-sqlite3
const Database = require('better-sqlite3')

// create database in log.db
const db = new Database('log.db')

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`);
let row = stmt.get();

// check if table exists
if (row === undefined) {
    console.log('Log database appears to be empty. Log database is being created now...')

    // contains commands to initialize database
    const sqlInit = 
    ` CREATE TABLE accesslog (
        id INTEGER PRIMARY KEY,
        remoteaddr TEXT,
        remoteuser TEXT,
        time INTEGER, 
        method TEXT,
        url TEXT,
        protocol TEXT,
        httpversion TEXT,
        secure TEXT,
        status INTEGER,
        referer TEXT,
        useragent TEXT
    );`
    // execute commands
    db.exec(sqlInit);
    console.log('New table in database')

// if database exists, log that
} else {
    console.log('Log database already exists');
}

// export as a module
module.exports = db;