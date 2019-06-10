
const router = require('express').Router(); 

const Users = require('./users-model.js'); 
const restricted = require('../auth/restricted'); 

// Route to display all users if a user is logged in 
router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users); 
    })
    .catch(err => res.send(err));
});

module.exports = router; 