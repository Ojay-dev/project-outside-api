const { check } = require('express-validator');

/* This is a validator for the create artist form. It checks that the name, email, phone, city, state,
image_link, and facebook_link fields are not empty. It also checks that the email is a valid email
address, the phone is a valid phone number, and the facebook_link is a valid URL. */
exports.createArtistValidator = [
  check('name').not().isEmpty().trim().escape().withMessage('Name is required'),
  check('email')
    .normalizeEmail()
    .isEmail()
    .trim()
    .escape()
    .withMessage('Invalid email address'),
  check('phone')
    .isMobilePhone()
    .trim()
    .escape()
    .withMessage('Invalid phone number'),
  check('city').not().isEmpty().trim().escape().withMessage('City is required'),
  check('state')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('State is required'),
  check('image_link')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Image link is required'),
  check('instagram_handle')
    .optional()
    .trim()
    .escape()
    .withMessage('Invalid string')
];

exports.searchValidator = [
  check('search')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Search term is required')
];

exports.createShowValidator = [
  check('start_time')
    .isISO8601()
    .trim()
    .escape()
    .withMessage('Start time must be a valid ISO 8601 date'),
  check('venue_id')
    .isMongoId()
    .trim()
    .escape()
    .withMessage('Venue ID must be a valid MongoDB ObjectID'),
  check('artist_id')
    .isMongoId()
    .trim()
    .escape()
    .withMessage('Artist ID must be a valid MongoDB ObjectID')
];

exports.createVenueValidator = [
  check('name').not().isEmpty().trim().escape().withMessage('Name is required'),
  check('email')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage('Invalid email address'),
  check('phone')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Invalid phone number'),
  check('city').not().isEmpty().trim().escape().withMessage('City is required'),
  check('state')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('State is required'),
  check('genres').optional().isArray().withMessage('Genres is required'),
  check('genres.*')
    .isString()
    .withMessage('Genres is required to be an array of strings'),
  check('website')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Website is required'),
  check('seeking_talent').isBoolean(),
  check('seeking_description')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Description link is required'),
  check('image_link')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Image link is required'),
  check('facebook_link').optional().isURL().withMessage('Invalid Facebook link')
];
