const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const venueController = require('../controllers/venueController');
const showController = require('../controllers/showController');
const { catchErrors } = require('../handlers/errorHandlers');
const {
  createArtistValidator,
  searchValidator,
  createShowValidator,
  createVenueValidator
} = require('../middlewares/validators');

/* Artists route */

// router.get('/', catchErrors(artistController.getArtists));
router.get('/artists', catchErrors(artistController.getArtists));
router.get('/artists/:id', catchErrors(artistController.getArtist));
router.get('/artists/:page', catchErrors(artistController.getArtists));

router.post(
  '/artists/create',
  createArtistValidator,
  catchErrors(artistController.createArtist)
);

router.post(
  '/artists/search',
  searchValidator,
  catchErrors(artistController.searchArtists)
);
router.patch('/artists/:id/edit', catchErrors(artistController.editArtist));
router.delete(
  '/artists/:id/delete',
  catchErrors(artistController.deleteArtist)
);

/* Shows route */
router.get('/shows/:id', catchErrors(showController.getShow));
router.get('/shows', catchErrors(showController.getShows));
router.get('/shows/:page', catchErrors(showController.getShows));

router.post(
  '/shows/create',
  createShowValidator,
  catchErrors(showController.createShow)
);

router.post(
  '/artists/search',
  searchValidator,
  catchErrors(artistController.searchArtists)
);

router.patch('/shows/:id/edit', catchErrors(artistController.editArtist));

router.delete('/shows/:id/delete', catchErrors(showController.deleteShow));

/* Venues route */
router.get('/venues/:id', catchErrors(venueController.getVenue));
router.get('/venues', catchErrors(venueController.getVenues));
router.get('/venues/:page', catchErrors(venueController.getVenues));

router.post(
  '/venues/create',
  createVenueValidator,
  catchErrors(venueController.createVenue)
);

router.post(
  '/venues/search',
  searchValidator,
  catchErrors(venueController.searchVenues)
);

router.patch('/venues/:id/edit', catchErrors(artistController.editArtist));

router.delete('/venues/:id/delete', catchErrors(showController.deleteShow));

module.exports = router;
