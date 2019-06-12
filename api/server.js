// Defining depdencies 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors'); 

// After npm install, I am defining dependency/global middleware
const session = require('express-session');

// Requiring storage library 
const KnexSessionStore = require('connect-session-knex')(session); 

// Defining routers
const authRouter = require('../auth/auth-router.js'); 
const usersRouter = require('../users/users-router.js'); 


// Defining my server 
const server = express(); 

// Creatng my sessionConfig 
const sessionConfig = {
    name: 'pineapple', // Setting an id for security that's not default for security
    secret: 'keep it secret, keep it safe!', // use to encrypt and decrypt; verify cookie valid
    resave: false, 
    saveUninitialized: false, // GDPR laws against saving cookies automatically
    cookie: {
        maxAge: 1000 * 30,
        secure: false, // true in production 
        httpOnly: true,
    },
    // Creating a new object for storing the user session 
    store: new KnexSessionStore({
        knex: require('../data/dbConfig.js'), 
        tablename: 'sessions', 
        sidfieldname: 'sid', 
        createtable: true, 
        clearInterval: 1000 * 60 * 30 
    })
};

// Telling my server to use my dependencies/middleware
server.use(helmet()); 
server.use(express.json()); 
server.use(cors()); 

// Using express-session, passing in a configuration object
server.use(session(sessionConfig)); 

// Test get route to make sure server is running
server.get('/', (req, res) => {
    res.send('Server is working!')
});

// Telling server to use routers 
server.use('/api/auth', authRouter); 
server.use('/api/users', usersRouter); 




module.exports = server; 