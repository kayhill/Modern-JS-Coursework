const title = document.getElementById('input-title'),
      author = document.getElementById('input-author'),
      isbn = document.getElementById('input-isbn'),
      form = document.getElementById('new-book'),
      tableRef = document.getElementById('book-list').getElementsByTagName('tbody')[0],
      bookList = document.getElementById('book-list'),
      msg = document.getElementById('message');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getBooks);
  form.addEventListener('submit', addBook);
  bookList.addEventListener('click', deleteBook);
}

function getBooks() {

  tableRef.innerHTML = '';
  let books; 

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(function(book){ 
    // Insert a row in the table at the last row
    let newRow = tableRef.insertRow();
    newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class="delete-item button button-icon"><i class="fas fa-times"></i></a> </td>
    `;
    newRow.id = `${book.isbn}`;  
  });
}

function addBook(e) {
  e.preventDefault(); 
  // check for input
  if(title.value === '' || author.value === '' || isbn.value === '' || isNaN(isbn.value)){
    displayMessage(1, 'red');
  }  else {

    // Store book
    storeBook(title.value, author.value, isbn.value);
    
    // clear input 
    title.value = '';
    author.value = '';
    isbn.value = '';  
    displayMessage(0, 'green');
    getBooks();
  }
}

function displayMessage(type, color) {
  if (type === 1) {
    message = 'Please check your submission and try again.';
  } else if (type === 0 ) {
    message = 'Book successfully added!';
  } else if (type === 2 ) {
    message = 'Book successfully removed.';
  }

  msg.innerText = message;
  msg.style.color = color;
  // Clear error after 3 seconds
  setTimeout(clearMsg, 3000);
}

// Clear error
function clearMsg(){
  msg.innerText = '';
}

function deleteBook(e) {
  let rowID;

  if (e.target.classList.contains('delete-item')) {
    rowID = e.target.parentElement.parentElement.id;
    e.target.parentElement.parentElement.remove();
    displayMessage(2, 'green');
  } else if (e.target.classList.contains('fas')) {
    rowID = e.target.parentElement.parentElement.parentElement.id;
    console.log(rowID);
    e.target.parentElement.parentElement.parentElement.remove();
    displayMessage(2, 'green');
  }

  removeBook(rowID)
}

function storeBook(title, author, isbn) {
  let newBook = new Book(title, author, isbn);

  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(id){
  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  
  
  books.forEach(function(book, i){
    console.log(book);
    if(id === book.isbn){
      books.splice(i, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}