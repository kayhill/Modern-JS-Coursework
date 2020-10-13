
const title = document.getElementById('input-title'),
      author = document.getElementById('input-author'),
      isbn = document.getElementById('input-isbn'),
      form = document.getElementById('new-book'),
      tableRef = document.getElementById('book-list').getElementsByTagName('tbody')[0],
      bookList = document.getElementById('book-list'),
      msg = document.getElementById('message');

function displayBooks(books) {
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

function clear() {
  tableRef.innerHTML = '';  
}

function clearInput() {
  title.value = '';
  author.value = '';
  isbn.value = ''; 
}

function deleteBook(e) {
  let rowID;

  if (e.target.classList.contains('delete-item')) {
    rowID = e.target.parentElement.parentElement.id;
    e.target.parentElement.parentElement.remove();
    displayMessage(2, 'green');
  } else if (e.target.classList.contains('fas')) {
    rowID = e.target.parentElement.parentElement.parentElement.id;
    e.target.parentElement.parentElement.parentElement.remove();
    displayMessage(2, 'green');
  }
  return rowID;
}

function validateInput() {
  if(title.value === '' || author.value === '' || isbn.value === '' || isNaN(isbn.value)){
    displayMessage(1, 'red');
    return false;
  } else {
      displayMessage(0, 'green');
      return true;
  }
}

function displayMessage(type, color) {
  let message;

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

export default {
  displayBooks,
  clear, 
  clearInput,
  validateInput,
  deleteBook,
  bookList,
  form,
  title,
  author,
  isbn
}