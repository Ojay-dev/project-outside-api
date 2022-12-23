const mongoose = require('mongoose');

require('dotenv').config();

// Connect to our Database and handle any bad connections
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

mongoose.connect(process.env.DATABASE);

const db = mongoose.connection;
db.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

db.once('open', function() {
  console.log('Connected to MongoDB');
});

// import all of our models
require('./models/Artist');
require('./models/Show');
require('./models/Venue');


// Start our app!
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
