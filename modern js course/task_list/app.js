const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection'
);
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');


// load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks =[];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){ 
     //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // add taskInput to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    link.className= 'delete-item secondary-content';
    link.innerHTML = '<i class="material-icons">remove</i>';
    //append to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  });
  
}
function addTask(e) {
  // check for input
  if(taskInput.value === ''){
    alert('Add a task');
  }  else {
  //create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  // add taskInput to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  link.className= 'delete-item secondary-content';
  link.innerHTML = '<i class="material-icons">remove</i>';
  //append to li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);

  storeTask(taskInput.value);
}
  //clear form input
  taskInput.value ='';
  e.preventDefault();
  
};

function storeTask(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks =[];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove();
    
    removeTaskStorage(e.target.parentElement.parentElement);
    }
  }  
}

function removeTaskStorage(taskItem){
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, i){
    if(taskItem.textContent === task){
      tasks.splice(i, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  } )
}