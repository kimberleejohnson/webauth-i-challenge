// Defining depdencies 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors'); 

// After npm install, I am defining dependency/global middleware
const session = require('express-session');

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
    tomatically
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