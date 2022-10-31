const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    trailerLink: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    thumbnail: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
