document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');

  let editingItem = null;

  function addTask(text) {
      const li = document.createElement('li');
      li.innerHTML = `
          <span>${text}</span>
          <div>
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
              <button class="mark-as-done-button">Mark as Done</button>
          </div>
      `;

      const editButton = li.querySelector('.edit-button');
      const deleteButton = li.querySelector('.delete-button');
      const markAsDoneButton = li.querySelector('.mark-as-done-button');
      const span = li.querySelector('span');

      editButton.addEventListener('click', () => {
          if (editingItem) {
              // If there's an existing editing item, return without editing
              return;
          }
          taskInput.value = span.textContent;
          editingItem = li;
          addTaskButton.innerHTML="Update"
      });

      deleteButton.addEventListener('click', () => {
          li.remove();
          if (editingItem === li) {
              editingItem = null;
              taskInput.value = '';
          }
      });

      markAsDoneButton.addEventListener('click', () => {
          span.classList.toggle('completed');
      });

      taskList.appendChild(li);
  }

  addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;

      if (editingItem) {
          const span = editingItem.querySelector('span');
          span.textContent = taskText;
          taskInput.value = '';
          editingItem = null;
          addTaskButton.innerHTML="ADD Task"
      } else {
          addTask(taskText);
          taskInput.value = '';
          // addTaskButton.innerHTML="ADDTASk"
      }
  });

  // Optional: Allow pressing Enter to add a task
  taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          addTaskButton.click();
      }
  });
});
