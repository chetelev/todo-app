// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// Call Load all event listeners function
loadEventListeners();
//Load all event listeners
function loadEventListeners() {
  //Add task event
  form.addEventListener('submit', addTask)
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
}
// Get tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const linkEle = document.createElement('a');
    // Add class to linkEle
    linkEle.className = 'delete-item secondary-content';
    // Add icon html
    linkEle.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the linkEle to li
    li.appendChild(linkEle)
    // APpend li to ul
    taskList.appendChild(li)
  })
}
//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    return alert('Add a task')
  }
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const linkEle = document.createElement('a');
  // Add class to linkEle
  linkEle.className = 'delete-item secondary-content';
  // Add icon html
  linkEle.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the linkEle to li
  li.appendChild(linkEle)
  //Store in LocalStorage\
  storeTaskInLocalStorage(taskInput.value);
  // APpend li to ul
  taskList.appendChild(li)
  // Clear the input
  taskInput.value = '';
  e.preventDefault();
}
// Store task function
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear tasks fn
function clearTasks() {
  if (confirm('Are you sure?')) {
    taskList.innerHTML = '';
    localStorage.clear();
  }
}
// Delete List Items
taskList.addEventListener('click', function (e) {
  if (e.target.className == 'fa fa-remove') {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
});
// RemoveTaskFromLocalStorage Function 
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Filter List Items
filter.addEventListener('keyup', function (e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent
    console.log(`Item :${item} `)
    console.log(`Text :${text} `)
    if (item.toLowerCase().startsWith(text)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
})