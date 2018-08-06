const config = require('./config/config');
const express = require('express');
const router = express.Router();
const app = express();

/*globals process*/
let environemnt = process.env.NODE_environment || 'development';
let port = config[environemnt].port;

require('./config/database.config')(config[environemnt]);
require('./config/express.config')(app, config[environemnt]);
require('./config/routes')(router);
app.use('/api/', router);
require('./config/passport');

app.listen(port, () => {console.log(`Listening on port: ${port}`);});