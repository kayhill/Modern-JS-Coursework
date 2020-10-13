
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

function createBook(title, author, isbn) {
  let newBook = new Book(title, author, isbn);  
  return newBook;
}

export default {
  createBook,
}