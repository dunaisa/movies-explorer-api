const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validatePostMovies, validateDeleteMovies } = require('../middlewares/validateJoi');

router.get('/movies', getMovies);

router.post('/movies', validatePostMovies, createMovie);

router.delete('/movies/:_id', validateDeleteMovies, deleteMovie);

module.exports = router;
