const mongoose = require('mongoose');
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Please enter an artist name!'
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid Email Address'],
      required: 'Please Supply an email address'
    },
    phone: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: 'Please Supply a phone number'
    },
    city: {
      type: String,
      trim: true,
      required: 'You must supply a city!'
    },
    state: {
      type: String,
      trim: true,
      required: 'You must supply a state!'
    },
    image_link: String,
    facebook_link: String,
    created: {
      type: Date,
      default: Date.now
    }
  },
  { toJSON: { virtuals: true } }
);

artistSchema.virtual('shows', {
  ref: 'Show',
  localField: '_id',
  foreignField: 'artist_id'
});

artistSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Artist', artistSchema);
