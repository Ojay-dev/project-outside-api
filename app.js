const express = require('express');
const cors = require('cors');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');


const app = express();

app.use(cors());

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(expressValidator());

app.use('/api/v1/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// done! we export it so we can start the site in start.js
module.exports = app;

