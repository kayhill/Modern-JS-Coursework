import BookCtrl from './modules/bookctrl.js'
import StorageCtrl from './modules/storagectrl.js'
import UICtrl from './modules/uictrl.js'


loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getBooks);
  UICtrl.form.addEventListener('submit', addBook);
  UICtrl.bookList.addEventListener('click', deleteBook);
}

function getBooks() {  
  // reset UI
  UICtrl.clear();
  // get books from storage 
  let books = StorageCtrl.getBooks();
  //display books 
  UICtrl.displayBooks(books);
  console.log(books);
}

function addBook(e) {
  e.preventDefault(); 
  // Validate input
  let valid = UICtrl.validateInput();
  if(valid) {
    // Create new book
    let newBook = BookCtrl.createBook(UICtrl.title.value, UICtrl.author.value, UICtrl.isbn.value);
    // Store book
    StorageCtrl.saveBook(newBook);
    // Clear input
    UICtrl.clearInput();
    //Update UI
    getBooks();
  }
}

function deleteBook(e) {
  // delete from UI
  let bookID = UICtrl.deleteBook(e);
  // delete from storage
  let books = StorageCtrl.getBooks();
  books.forEach(function(book, i){
    if(bookID === book.isbn){
      books.splice(i, 1);
    }
  });
  StorageCtrl.saveBooks(books);
  // refresh UI
  getBooks();
}


