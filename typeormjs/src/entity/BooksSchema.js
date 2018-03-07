const Books = require("../model/Books").Books; // import {Category} from "../model/Category";

module.exports = {
    target: Books,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        authors: {
            type: "varchar"
        },
        cover: {
            type: "varchar"
        },
        genres: {
            type: "varchar"
        },
        isbn: {
            type: "varchar"
        },
        rating: {
            type: "varchar"
        },
        description: {
            type: "text"
        },
        link: {
            type: "varchar"
        },
        fromsite: {
            type: "varchar"
        },
        reviews_count: {
            type: "int"
        }
    }
};