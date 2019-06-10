const bcrypt = require('bcryptjs'); 

const Users = require('../users/users-model'); 

// Middleware to make sure pages restricted to login 
module.exports = function restricted(req, res, next) {
    const { username, password } = req.headers; 

    if (username && password) {
        Users.findBy({ username })
        .first() 
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next(); 
            } else {
                res.status(401).json({ message: 'You shall not pass! Invalid credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error); 
        });
    } else {
        res.status(400).json({ message: 'You shall not pass! Please provide credentials'})
    }
};
