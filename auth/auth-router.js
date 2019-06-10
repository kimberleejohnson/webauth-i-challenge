// Requiring dependencies 
const router = require('express').Router(); 
const bcrypt = require('bcryptjs'); 

// Pulling in my Users model so the auth functions can access
const Users = require('../users/users-model'); 

// Route to create a new user account 
router.post('/register', (req, res) => {
    let user = req.body; 

    // Hashing the password
    const hash = bcrypt.hashSync(user.password, 10); // password re-hashed 2^10 times 

    user.password = hash; 

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved); 
    })
    .catch(error => {
        res.status(500).json(error); 
    });
});

// Route to login 
router.post('/login', (req, res) => {
    let {username, password } = req.body; 

    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!`});
        } else {
            res.status(401).json({ message: `Teehee, whoops! Invalid credentials.`});
        }
    })
})

module.exports = router; 