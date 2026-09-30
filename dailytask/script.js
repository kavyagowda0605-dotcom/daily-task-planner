// Display Current Date
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// State & DOM Elements
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const filterAllBtn = document.getElementById('filterAll');
const filterPendingBtn = document.getElementById('filterPending');
const filterCompletedBtn = document.getElementById('filterCompleted');

// Functions
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<li class="list-group-item text-center text-muted">No tasks found.</li>`;
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center task-item';

    if (task.isEditing) {
      li.innerHTML = `
        <input type="text" class="form-control me-2" id="editInput-${task.id}" value="${task.title}" />
        <div>
          <button class="btn btn-sm btn-success me-1" onclick="saveEdit(${task.id})">Save</button>
          <button class="btn btn-sm btn-secondary" onclick="cancelEdit(${task.id})">Cancel</button>
        </div>
      `;
    } else {
      li.innerHTML = `
        <div class="form-check m-0">
          <input 
            class="form-check-input me-2" 
            type="checkbox" 
            ${task.completed ? 'checked' : ''} 
            onchange="toggleTask(${task.id})"
          />
          <span class="${task.completed ? 'completed-task' : ''}">${task.title}</span>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-warning me-1" onclick="enableEdit(${task.id})">Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
    }

    taskList.appendChild(li);
  });
}

// Actions
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  const newTask = {
    id: Date.now(),
    title: title,
    completed: false,
    isEditing: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = '';
});

function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function enableEdit(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, isEditing: true } : { ...task, isEditing: false }
  );
  renderTasks();
}

function cancelEdit(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, isEditing: false } : task
  );
  renderTasks();
}

function saveEdit(id) {
  const input = document.getElementById(`editInput-${id}`);
  const updatedTitle = input.value.trim();
  if (!updatedTitle) return;

  tasks = tasks.map(task => 
    task.id === id ? { ...task, title: updatedTitle, isEditing: false } : task
  );
  saveTasks();
  renderTasks();
}

// Filter Navigation
function setFilter(filter, activeBtn) {
  currentFilter = filter;
  [filterAllBtn, filterPendingBtn, filterCompletedBtn].forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
  renderTasks();
}

filterAllBtn.addEventListener('click', () => setFilter('all', filterAllBtn));
filterPendingBtn.addEventListener('click', () => setFilter('pending', filterPendingBtn));
filterCompletedBtn.addEventListener('click', () => setFilter('completed', filterCompletedBtn));

// Initial Render
renderTasks();