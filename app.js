const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const db = require('./models');
const RouteManager = require('./routes/RouteManager');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

const routeManager = new RouteManager(app);
routeManager.config();

try {
  db.sequelize.authenticate().then(() => {
    server.listen(port);
    console.log('Server listening on ' + port);
  });
} catch (error) {
  console.log('It was not possible to connecto to the database:');
  console.log(error.message);
  process.exit(1);
}

module.exports = app;
