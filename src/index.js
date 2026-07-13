import "./styles.css";
import { format } from "date-fns";
import { projectList, Task } from "./todoApp.js"; // import logic layers

const taskCont = document.querySelector("#tasks-cont");
const taskForm = document.querySelector("#add-task-cont");

// Global tracking for which project view is active
let currentActiveProject = projectList.getProject('Default');

export function renderTasks() {
    taskCont.innerHTML = '';
    
    currentActiveProject.tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add('taskCard');
        if (task.completed) taskCard.classList.add('strike-through');

        // Safely format the JS date object cleanly for UI rendering
        const formattedDate = format(task.dueDate, 'LLL d, yyyy');

        taskCard.innerHTML = `
            <div class="col">
                <div class="featCont">
                    <div class="titlecont">
                        <button class="checkTask">${task.completed ? '✔' : '⭕'}</button>
                        <h2 class="newTaskTitle ${task.completed ? 'strike' : ''}">${task.title}</h2>
                    </div>
                    <div class="propCont">
                        <h3 class="newTaskDueDate">${formattedDate}</h3>
                        <h3 class="newTaskPriority priority-${task.priority}">${task.priority}</h3>
                    </div>
                </div> 
                <p class="newTaskDesc ${task.completed ? 'strike' : ''}">${task.desc}</p>
                <div class="col-foot">
                    <h3 class="newprojectName">${task.projectName}</h3>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        `;

        // Toggle Done logic
        taskCard.querySelector('.checkTask').addEventListener('click', () => {
            task.toggleComplete();
            saveToLocalStorage();
            renderTasks();
        });

        // Delete Logic matching target id
        taskCard.querySelector('.delete-btn').addEventListener('click', () => {
            currentActiveProject.deleteTask(task.id);
            saveToLocalStorage();
            renderTasks();
        });

        taskCont.appendChild(taskCard);
    });
}

// Form logic management
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.querySelector("#task-title").value;
    const desc = document.querySelector("#task-desc").value;
    const dateInput = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const projectChoice = document.querySelector("#projects-dropdown").value;

    // 1. Get correct target project object instances
    const targetProject = projectList.getProject(projectChoice);
    
    // 2. Instantiate data class mapping
    const newTask = new Task(title, desc, dateInput, priority, projectChoice);
    
    // 3. Save to backend arrays
    targetProject.addTask(newTask);
    
    // 4. Update view layouts and save
    // saveToLocalStorage();
    renderTasks();
    taskForm.reset(); 
});






























// const togglebtn = document.querySelector(".toggleBtn")
// const sidebar = document.querySelector(".sidebar")
// const addTaskBtn = document.querySelector("#submit-btn")
// const taskCont = document.querySelector("#tasks-cont")
// const taskTitle = document.querySelector("#task-title")
// const taskDesc = document.querySelector("#task-desc")
// const dueDate = document.querySelector("#due-date")
// const priority = document.querySelector("#priority")
// const projectName = document.querySelector("#projects-dropdown")
// const taskForm = document.querySelector("form")




// const project = new Project();
// project.name = 'Get Working'
// const task = new Task();
// const task1 = new Task('Read TOD', 'Continue classes', format(new Date(2026, 6, 30), 'LLL d'), 'low', 'Get Working');
// const task2 = new Task('Read Freecodecamp', 'Continue DOM', format('07/02/2026', 'LLL d'), 'high', 'Get Working');

// project.addTask(task)
// project.addTask(task1)
// project.addTask(task2)
// console.log(project);
// console.log(task);
// console.log(task1);


// function addTaskToProject(title, desc, duedate, priorityD, projectName) {
//     const task = new Task(title, desc, duedate, priorityD, projectName)
//     let add = project.addTask(task)
//     console.log(project);

// }


// function displayTask() {
//     taskCont.innerHTML = '';
//     const projectCont = project.project;
//     console.log(projectCont);   
//     projectCont.forEach(
//         (task) => {
//             //  task cont
//                 const taskCard = document.createElement("div")
//                  taskCard.classList.add('taskCard')
//             //task
//                 taskCard.innerHTML = `<div>
//                                 <div class="col">
//                                     <div class="featCont">
//                                      <div class="titlecont">
//                                     <button class="checkTask">✔</button>
//                                     <h2 class="newTaskTitle">${task.title}</h2>
//                                     </div>

//                                 <div class="propCont">
//                                     <h3 class="newTaskDueDate">${format((task.dueDate), 'LLL d')}</h3>
//                                     <h3 class="newTaskPriority">${task.priority}</h3>

//                                 </div>

//                                     </div> 
//                                     <p class="newTaskDesc">${task.desc}</p>
//                                     <div class="col-foot">
//                                     <h3 class="newprojectName">${task.projectName}</h3>
//                                     <button class="delete-btn">Delete</button>
//                                     </div>
//                                 </div>
                                
//                             </div>`


//             //check the task
//             const checkTask = taskCard.querySelector('.checkTask');
//             const newTaskTitle = taskCard.querySelector('.newTaskTitle');
//             const newTaskDesc = taskCard.querySelector('.newTaskDesc');
//             checkTask.addEventListener('click', function() {
//                 console.log('check');
//                 newTaskTitle.classList.toggle('strike');
//                 newTaskDesc.classList.toggle('strike');
//             })

//             taskCard.setAttribute('data-id', task.id);
//             //delete task
//             const deleteBtn = taskCard.querySelector('.delete-btn');
//             deleteBtn.addEventListener('click', function(e) {
//                 console.log('delete');
                
//                 // const target = e.target;
//                 // target.parentElement.parentElement.parentElement.parentElement.remove();

//                 // Retrieve the unique ID string from the parent card element
//                     const targetId = taskCard.getAttribute('data-id');
            
//                 // Find the array index where the book object matches this ID
//                     const targetIndex = projectCont.findIndex(item => item.id === targetId);
            
//                     if (targetIndex !== -1) {
//                     projectCont.splice(targetIndex, 1); // Mutate array data safely
//                     displayTask(); // Re-render modern UI view layout
//                     }
                
//             })


//             taskCont.appendChild(taskCard);
//         }
//     )
    
// }

// displayTask()

// taskForm.addEventListener('submit', function(e) {
//     e.preventDefault();

//     const title = taskTitle.value;
//     const desc = taskDesc.value;
//     const duedate = dueDate.value;
//     const priorityN = priority.value;
//     const projectName = projectName.value;

//     addTaskToProject(title, desc, duedate, priorityN, projectName);

//     displayTask()

//     taskForm.reset(); 
// });

// console.log(project);



// addTaskBtn.addEventListener('click', function (e) {
//     e.preventDefault()

//     // task cont
//     let tasks = document.createElement("div")
//         tasks.classList.add('tasks')
//     //task
//     tasks.innerHTML = `<div>
//                                 <div class="col">
//                                     <div class="featCont">
//                                      <div class="titlecont">
//                                     <button class="checkTask">✔</button>
//                                     <h2 class="newTaskTitle">${taskTitle.value}</h2>
//                                     </div>

//                                 <div class="propCont">
//                                     <h3 class="newTaskDueDate">${format((dueDate.value), 'LLL d')}</h3>
//                                     <h3 class="newTaskPriority">${priority.value}</h3>

//                                 </div>

//                                     </div> 
//                                     <p class="newTaskDesc">${taskDesc.value}</p>
//                                     <div class="col-foot">
//                                     <h3 class="newprojectName">${projectName.value}</h3>
//                                     <button class="delete-btn">Delete</button>
//                                     </div>
//                                 </div>
                                
//                             </div>`

//     
//     taskCont.appendChild(tasks);
    
//     // if(taskTitle.value === "" || taskDesc.value === "") {
//     //     alert('Please Enter a Task Name and Title.')
//     // }if(dueDate.value === "" || priority.value === "") {
//     //     alert('Please Enter a duedate or priority .')
//     // } if(taskTitle.value !== "" && taskDesc.value !== "" && dueDate.value !== "" && priority.value !== "") {
//     //     taskCont.appendChild(tasks);
//     // }
    
//     // else {
//     //     taskCont.appendChild(tasks);
//     // };

    

//     //check the task
//     let checkTask = document.querySelector('.checkTask');
//     let newTaskTitle = document.querySelector('.newTaskTitle');
//     let newTaskDesc = document.querySelector('.newTaskDesc');
//     checkTask.addEventListener('click', function() {
//         console.log('check');
//         newTaskTitle.classList.toggle('strike');
//         newTaskDesc.classList.toggle('strike');
//     })

//     //delete task
//     let deleteBtn = document.querySelector('.delete-btn');
//     deleteBtn.addEventListener('click', function(e) {
//         console.log('delete');
        
//         let target = e.target;
//         target.parentElement.parentElement.parentElement.parentElement.remove();
        
//     })

//     //Clear the fields
//     clearFields();

// });


// function clearFields () {
//     taskTitle.value = "";
//     taskDesc.value = "";
//     priority.value = "Low";
//     dueDate.value = "";
// }
 