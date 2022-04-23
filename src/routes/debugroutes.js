// Require express
const express = require('express');

// Import database script file
const db = require('../services/database');

// Instance of express router
const debugRouter = express.Router();

// /app/log/access endpoint to return records from database
debugRouter.get('/app/log/access', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accesslog').all();
        res.status(200).json(stmt);
    } catch (e) {
        console.error(e)
    }
});

// error endpoint
debugRouter.get('app/error', (req, res) => {
    throw new Error('Error test complete.');
})

module.exports = debugRouter;