require('dotenv').config();

const server = require('.server.js');
const port = 5000;

server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));