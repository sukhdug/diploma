'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

var Book = sequelize.define('books', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255
    }
  },
  authors: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255
    }
  },
  cover: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255
    }
  },
  genres: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255
    }
  },
  isbn: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255
    }
  },
  rating: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
      max: 10
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
      max: 255
    }
  },
  fromsite: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 45
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