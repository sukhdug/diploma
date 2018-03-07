const typeorm = require("typeorm"); // import * as typeorm from "typeorm";
const Books = require("../src/model/Books").Books; // import {Books} from "./model/Books";

exports.find = function () {
    typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "diploma",
        password: "diploma",
        database: "diploma",
        synchronize: true,
        logging: false,
        entitySchemas: [
            require("../src/entity/BooksSchema")
        ]
    })
    .then(function (connection) {

        const book = new Books()

        let bookRepository = connection.getRepository(Books);

        bookRepository.findOneById(34)
        .then(function(book) {
            //console.log("All books: ", book.description);
            return book;
        });

    }).catch(function(error) {
        console.log("Error: ", error);
    });
}

