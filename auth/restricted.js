// Removed bcryptjs and database search from Middleware now that we have cookies
// Removed headers because we don't need to read anything from them 

// Middleware to make sure pages restricted to login 
module.exports = function restricted(req, res, next) {
    if (req.session && req.session.user) {
        next(); 
    } else {
        res.status(401).json({ message: 'You shall not pass!'})
    }
};
