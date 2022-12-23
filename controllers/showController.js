const mongoose = require('mongoose');
const Show = mongoose.model('Show');
const { validationResult } = require('express-validator');

exports.createShow = async (req, res) => {
  try {
    // Find validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Create a new Show document using the request data
    const show = new Show({
      start_time: req.body.start_time,
      venue_id: req.body.venue_id,
      artist_id: req.body.artist_id
    });

    // Save the Show
    show
      .save()
      .then((newShow) =>
        res.json({
          success: true,
          message: 'Successfully created a new show.',
          show: newShow
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

/**
 * @route GET /shows/:id
 * @description Get a specific show
 * @access Public
 */
exports.getShow = async (req, res) => {
  try {
    // Get show ID from request params
    const { id } = req.params;

    // Find show with specified ID
    const show = await Show.findOne({ _id: id });

    // Return show data
    return res.status(200).json({
      success: true,
      data: show
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while getting show',
      error: error.message
    });
  }
};

exports.getShows = async (req, res) => {
  try {
    // Get the page and page size from the query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Use the paginate method to get the artists
    const shows = await Show.paginate({}, { page, limit });

    res.json({
      success: true,
      shows: shows.docs,
      total_artists: shows.total,
      limit,
      page,
      pages: shows.pages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route GET /shows/search
 * @description Search for shows
 * @access Public
 */
exports.searchShows = async (req, res) => {
  try {
    // Get search parameters from query string
    const { search, page, limit } = req.query;

    // Create search filter
    const filter = { $text: { $search: search } };

    // Paginate search results
    const shows = await Show.paginate(filter, {
      page: page || 1,
      limit: limit || 10
    });

    // Return paginated search results
    return res.status(200).json({
      success: true,
      data: shows
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while searching for shows',
      error: error.message
    });
  }
};

/**
 * @route PATCH /shows/:id
 * @description Edit a specific show
 * @access Public
 */
exports.editShow = async (req, res) => {
  try {
    // Get show ID and update data from request
    const { id } = req.params;
    const updateData = req.body;

    // Validate update data
    const { error } = Show.schema.validate(updateData);
    if (error) {
      // Return error response if validation fails
      return res.status(400).json({
        success: false,
        message: 'Invalid update data',
        error: error.message
      });
    }

    // Find show with specified ID and update its properties
    const show = await Show.findOneAndUpdate({ _id: id }, updateData, {
      new: true
    });

    // Return updated show data
    return res.status(200).json({
      success: true,
      data: show
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while editing show',
      error: error.message
    });
  }
};

/**
 * @route DELETE /shows/:id
 * @description Delete a specific show
 * @access Public
 */
exports.deleteShow = async (req, res) => {
  try {
    // Get show ID from request params
    const { id } = req.params;

    // Delete show with specified ID
    await Show.deleteOne({ _id: id });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Show was successfully deleted'
    });
  } catch (error) {
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting show',
      error: error.message
    });
  }
};
