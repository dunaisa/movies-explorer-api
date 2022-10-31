const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator:
          function (v) {
            return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(v);
          },
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator:
          function (v) {
            return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(v);
          },
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator:
          function (v) {
            return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(v);
          },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
