const Movie = require('../models/movie');

const {
  ForbiddenError,
} = require('../errors/ForbiddenError');

const {
  BadRequest,
} = require('../errors/BadRequest');

const {
  ObjectNotFound,
} = require('../errors/ObjectNotFound');

// Возвращает все сохранённые текущим  пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// Создает фильм
const createMovie = (req, res, next) => {
  // const movieId = res.body;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;

  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((errors) => {
      if (errors.name === 'ValidationError') {
        return next(new BadRequest('Некорректные данные при создании карточки.'));
      }
      return next(errors);
    });
};

// Удаление фильма по _id
const deleteMovie = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.findById(req.params._id)
    .orFail(new ObjectNotFound(`Карточка с указанным id ${req.params._id} не найдена.`))
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === ownerId) {
          movie.delete()
            .then(() => res.send(movie))
            .catch(next);
        } else {
          next(new ForbiddenError(`Карточка с указанным id ${req.params._id} принадлежит другому пользователю.`));
        }
      }
    })
    .catch((errors) => {
      if (errors.name === 'CastError') {
        return next(new BadRequest(`${req.params._id} не является валидным идентификатором карточки.`));
      }
      return next(errors);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
