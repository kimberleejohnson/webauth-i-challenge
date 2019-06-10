// Defining depdencies 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors'); 

// Defining routers
const authRouter = require('../auth/auth-router.js'); 
const usersRouter = require('../users/users-router.js'); 


// Defining my server 
const server = express(); 

// Telling my server to use my dependencies
server.use(helmet()); 
server.use(express.json()); 
server.use(cors()); 

// Test get route to make sure server is running
server.get('/', (req, res) => {
    res.send('Server is working!')
});

// Telling server to use routers 
server.use('/api/auth', authRouter); 
server.use('/api/users', usersRouter); 




module.exports = server; 