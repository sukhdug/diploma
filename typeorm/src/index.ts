import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Books} from "./entity/Books";

createConnection().then(async connection => {

    let booksRepository = connection.getRepository(Books);

    let allBooks = await booksRepository.find();
    //console.log("All books from the db: ", allBooks);

    let book = await booksRepository.findOneById(1);
    //console.log("First book from the db: ", book.name);

    let [books, booksCount] = await booksRepository.findAndCount();
    console.log("Photos count: ", booksCount);

}).catch(error => console.log(error));
