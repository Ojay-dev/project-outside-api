const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const showSchema = new Schema({
  venue_id: { type: Schema.Types.ObjectId, ref: 'Venue' },
  artist_id: { type: Schema.Types.ObjectId, ref: 'Artist' },
  start_time: {
    type: Date,
    default: Date.now,
    required: 'Please enter the starting time of the show!'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

showSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Show', showSchema);
