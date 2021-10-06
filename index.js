
require ("dotenv").config()
const server = require('./server');
//our api port=8800
server.start(process.env.PORT);
