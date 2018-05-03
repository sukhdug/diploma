'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

var Book = sequelize.define('books', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  authors: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  cover: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  genres: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  isbn: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  },
  description: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  link: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255,
      isUrl: true
    }
  },
  fromsite: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  reviews_count: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  quote_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: false,
      isInt: true
    }
  }
}, {
  timestamps: false
}, {
  underscored: true
});

module.exports = Book;