// Place your server entry point code here
// Require Express.js
const express = require('express')
const app = express()
const fs = require('fs')

// Require database script file
const db = require('./database.js')

// allow express to read urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require minimist module and create port
const args = require('minimist')(process.argv.slice(2))
args['port', 'debug', 'log', 'help']
const port = args.port || process.env.PORT || 5555;


// print help message if command line is help
if (args.help == true) {
  console.log (`server.js [options]
    
    --port	Set the port number for the server to listen on. Must be an integer
                between 1 and 65535.
    
    --debug	If set to true, creates endlpoints /app/log/access/ which returns
                a JSON access log from the database and /app/error which throws 
                an error with the message "Error test successful." Defaults to 
                false.
    
    --log	If set to false, no log files are written. Defaults to true.
                Logs are always written to database.
    
    --help	Return this message and exit.`
  )
  process.exit(0)
}


// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});


// if log is true, additional middleware, write to file
if (args.log == true) {
    const morgan = require('morgan')
    const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: accessLog }))
}