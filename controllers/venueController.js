const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const { validationResult } = require('express-validator');

exports.createVenue = async (req, res) => {
  try {
    // Find validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const venue = new Venue({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      genres: req.body.genres,
      website: req.body.website,
      seeking_talent: req.body.seeking_talent,
      seeking_description: req.body.seeking_description,
      image_link: req.body.image_link,
      facebook_link: req.body.facebook_link
    });

    // Save the venue
    venue
      .save()
      .then((newVenue) =>
        res.json({
          success: true,
          message: 'Successfully created a new venue.',
          newVenue
        })
      )
      .catch((err) => res.status(400).json({ error: err.message }));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getVenue = async (req, res) => {
  try {
    // Get venue ID from request params
    const { id } = req.params;

    // Find venue with specified ID
    const venue = await Venue.findOne({ _id: id }).populate({
      path: 'shows',
      populate: 'artist_id'
    });

    // Return venue data
    return res.status(200).json({
      success: true,
      data: venue
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while getting venue',
      error: error.message
    });
  }
};

exports.getVenues = async (req, res) => {
  try {
    // Get the page and page size from the query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Use the paginate method to get the artists
    const venues = await Venue.paginate({}, { page, limit });

    res.json({
      success: true,
      artists: venues.docs,
      total_artists: venues.total,
      limit,
      page,
      pages: venues.pages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route GET /venues/search
 * @description Search for venues
 * @access Public
 */
exports.searchVenues = async (req, res) => {
  try {
    // Get search parameters from query string
    const { search, page, limit } = req.query;

    // Create search filter
    const filter = { $text: { $search: search } };

    // Paginate search results
    const venues = await Venue.paginate(filter, {
      page: page || 1,
      limit: limit || 10
    });

    // Return paginated search results
    return res.status(200).json({
      success: true,
      data: venues
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while searching for venues',
      error: error.message
    });
  }
};
