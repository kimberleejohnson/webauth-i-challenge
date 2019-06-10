// Defining depdencies 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors'); 

// PLACEHOLDER for defining routers

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

// PLACEHOLDER for telling server to use routers 

module.exports = server; 