// Defining my server
const server = require('./api/server');

// Telling my server where to listen 
const port = process.env.PORT || 5500;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));