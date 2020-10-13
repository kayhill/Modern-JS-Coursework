function getBooks() {
  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

function saveBook(newBook) {
  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
}

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

export default {
  getBooks,
  saveBook,
  saveBooks

}