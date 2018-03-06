class Book {
  constructor() {
	this.id = 1;
  }
  set name(name) {
	this._name = name;
  }
  set authors(authors) {
	this._authors = authors;
  }
  set genres(genres) {
	this._genres = genres;
  }
  set description(description) {
	this._description = description;
  }
  set isbn(isbn) {
	this._isbn = isbn;
  }
  get name() {
	return this._name;
  }
  get authors() {
	return this._authors;
  }
  get genres() {
	return this._genres;
  }
  get description() {
	return this._description;
  }
  get isbn() {
	return this._isbn;
  }

  sayHello() {
	console.log('Название книги: ' + this.name);
	console.log('ISBN книги: ' + this.isbn);
	console.log('Автор книги: ' + this.authors);
	console.log('Жанры книги: ' + this.genres);
	console.log('Описание книги: ' + this.description);
	console.log('ID книги: ' + this.id);
  }
}

var book = new Book();
book.name = 'Три товарища';
book.isbn = '978-5-17-090411-2';
book.authors = 'Эрих Мария Ремарк';
book.genres = 'Немецкая классика';
book.description = 'Книга Эриха Марии Ремарка';
book.sayHello();