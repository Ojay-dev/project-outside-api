const mongoose = require('mongoose');
const Artist = mongoose.model('Artist');
const { validationResult } = require('express-validator');

exports.createArtist = async (req, res) => {
  try {
    // Find validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, city, state, image_link, facebook_link } =
      req.body;

    // Create a new Artist
    const artist = new Artist({
      name: name,
      email: email,
      phone: phone,
      city: city,
      state: state,
      image_link: image_link,
      facebook_link: facebook_link
    });

    // Save the Artist
    await artist.save();

    // Get the page and page size from the query string
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Use the paginate method to get the artists
    const artists = await Artist.paginate({}, { page, pageSize });

    res.json({
      success: true,
      created: artist.id,
      message: 'Successfully created a new Artist.',
      artist,
      total_artists: artists.total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route GET /artists/:id
 * @description Get a specific artist
 * @access Public
 */
exports.getArtist = async (req, res) => {
  try {
    // Get artist ID from request params
    const { id } = req.params;

    // Find artist with specified ID
    const artist = await Artist.findOne({ _id: id }).populate({
      path: 'shows',
      populate: 'venue_id'
    });

    // Return artist data
    return res.status(200).json({
      success: true,
      data: artist
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while getting artist',
      error: error.message
    });
  }
};

exports.getArtists = async (req, res) => {
  try {
    // Get the page and page size from the query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Use the paginate method to get the artists
    const artists = await Artist.paginate({}, { page, limit });
    // console.log(artists);

    res.json({
      artists: artists.docs,
      total_artists: artists.total,
      success: true,
      limit,
      page,
      pages: artists.pages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route PATCH /artists/:id
 * @description Edit a specific artist
 * @access Public
 */
exports.editArtist = async (req, res) => {
  try {
    // Get artist ID and update data from request
    const { id } = req.params;
    const updateData = req.body;

    // Validate update data
    const { error } = Artist.schema.validate(updateData);
    if (error) {
      // Return error response if validation fails
      return res.status(400).json({
        success: false,
        message: 'Invalid update data',
        error: error.message
      });
    }

    // Find artist with specified ID and update its properties
    const artist = await Artist.findOneAndUpdate({ _id: id }, updateData, {
      new: true
    });

    // Return updated artist data
    return res.status(200).json({
      success: true,
      data: artist
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while editing Artist',
      error: error.message
    });
  }
};

exports.searchArtists = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const search = req.body.search;

    // create the regular expression to match the search string
    const searchRegex = new RegExp(search, 'i');

    // use the $regex operator in the query object to perform the search
    Artist.paginate(
      { name: { $regex: searchRegex } },
      { page: page, limit: limit },
      function (err, result) {
        if (err) {
          return next(err);
        }
        res.json(result);
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route DELETE /artists/:id
 * @description Delete a specific artist
 * @access Public
 */
exports.deleteArtist = async (req, res) => {
  try {
    // Get artist ID from request params
    const { id } = req.params;

    // Delete artist with specified ID
    await Artist.deleteOne({ _id: id });

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Artist with id ${id} was successfully deleted`
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting artist',
      error: error.message
    });
  }
};
