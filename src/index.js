import "./styles.css";
import { format, parseISO } from "date-fns";
import { projectList, Task, Project } from "./todoApp.js";

// DOM Elements
const taskCont = document.querySelector("#tasks-cont");
const taskForm = document.querySelector("#add-task-cont");
const projectsDropdown = document.querySelector("#projects-dropdown");
const projectListUI = document.querySelector(".sidebar-projects-list"); // Make sure to add this container in your HTML sidebar!
const newProjectForm = document.querySelector("#new-project-form"); // Form/Input to add a new project
const projects = document.querySelector(".sidebar-projects-list"); 
const myProjects = document.querySelector(".my-Projects"); 

let currentActiveProject = null;

// ==========================================
// 1. LOCAL STORAGE STORAGE & RETRIEVAL
// ==========================================

function saveToLocalStorage() {
    localStorage.setItem("odinTodoList", JSON.stringify(projectList.projects));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem("odinTodoList");
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            // Re-instantiate our objects so class methods exist again!
            projectList.projects = parsed.map(projData => Project.fromJSON(projData));
        } catch (e) {
            console.error("Failed to parse local storage, loading defaults.", e);
            loadDefaults();
        }
    } else {
        loadDefaults();
    }
    
    // Set default active view
    currentActiveProject = projectList.projects[0];
}

function loadDefaults() {
    projectList.projects = [];
    projectList.addProject('Default');
    projectList.addProject('Get Working');
    
    // Add an initial dummy task
    const defaultProj = projectList.getProject('Default');
    defaultProj.addTask(new Task('Welcome!', 'Explore your tasks', new Date(), 'low', 'Default'));
}

// ==========================================
// 2. UI RENDERING LOGIC
// ==========================================

export function renderTasks() {
    taskCont.innerHTML = '';
    
    if (!currentActiveProject || !currentActiveProject.tasks) return;

    // Optional: Update a title header showing which project we are looking at
    const activeTitle = document.querySelector("#active-project-title");
    if (activeTitle) activeTitle.textContent = currentActiveProject.name;

    currentActiveProject.tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add('taskCard');
        if (task.complete) taskCard.classList.add('strike-through');

        // Safely format standard Date objects
        const formattedDate = format(new Date(task.dueDate), 'LLL d, yyyy');

        taskCard.innerHTML = `
            <div class="col">
                <div class="featCont">
                    <div class="titlecont">
                        <button class="checkTask">${task.complete ? '✔' : '⭕'}</button>
                        <h2 class="newTaskTitle ${task.complete ? 'strike' : ''}">${task.title}</h2>
                    </div>
                    <div class="propCont">
                        <h3 class="newTaskDueDate">${formattedDate}</h3>
                        <h3 class="newTaskPriority priority-${task.priority}">${task.priority}</h3>
                    </div>
                </div> 
                <p class="newTaskDesc ${task.complete ? 'strike' : ''}">${task.desc}</p>
                <div class="col-foot">
                    <h3 class="newprojectName">${task.projectName}</h3>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        `;

        // Check task event
        taskCard.querySelector('.checkTask').addEventListener('click', () => {
            task.toggleComplete();
            saveToLocalStorage();
            renderTasks();
        });

        // Delete task event
        taskCard.querySelector('.delete-btn').addEventListener('click', () => {
            currentActiveProject.deleteTask(task.id);
            saveToLocalStorage();
            renderTasks();
        });

        taskCont.appendChild(taskCard);
    });
}

// Render Sidebar Projects Navigation & Populate Select Dropdown
function renderProjectsUI() {
    // 1. Update the sidebar lists
    if (projectListUI) {
        projectListUI.innerHTML = '';
        projectList.projects.forEach(project => {
            const li = document.createElement("li");
            li.classList.add("project-item");
            if (currentActiveProject && currentActiveProject.name === project.name) {
                li.classList.add("active-project");
            }

            // Create a span for the Project Name
            const nameSpan = document.createElement("span");
            nameSpan.textContent = project.name;
            nameSpan.style.cursor = "pointer";
            nameSpan.addEventListener("click", () => {
                currentActiveProject = project;
                renderProjectsUI();
                renderTasks();
            });
            li.appendChild(nameSpan);

            // Create a Delete Button for the project
            const deleteProjBtn = document.createElement("button");
            deleteProjBtn.textContent = "Delete";
            deleteProjBtn.classList.add("delete-project-btn");
            deleteProjBtn.style.marginLeft = "10px";
            
            deleteProjBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevents triggering the active switch click above
                
                const success = projectList.deleteProject(project.name);
                if (success) {
                    // If we deleted the active project, switch to the first remaining project
                    if (currentActiveProject.name === project.name) {
                        currentActiveProject = projectList.projects[0];
                    }
                    saveToLocalStorage();
                    renderProjectsUI();
                    renderTasks();
                }
            });
            li.appendChild(deleteProjBtn);

            projectListUI.appendChild(li);
        });
    }

    // 2. Update the dropdown list in your Add Task form
    if (projectsDropdown) {
        projectsDropdown.innerHTML = '';
        projectList.projects.forEach(project => {
            const option = document.createElement("option");
            option.value = project.name;
            option.textContent = project.name;
            projectsDropdown.appendChild(option);
        });
    }
}

// ==========================================
// 3. EVENT LISTENERS
// ==========================================

// Task Form Submission
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.querySelector("#task-title").value;
    const desc = document.querySelector("#task-desc").value;
    const dateInput = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const projectChoice = document.querySelector("#projects-dropdown").value;

    const targetProject = projectList.getProject(projectChoice);
    const newTask = new Task(title, desc, dateInput, priority, projectChoice);
    
    targetProject.addTask(newTask);
    
    saveToLocalStorage();
    renderTasks();
    taskForm.reset(); 
});

// Dynamic Project Creator Form (Odin Requirement)
if (newProjectForm) {
    newProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const projectInput = document.querySelector("#new-project-input");
        const projectName = projectInput.value.trim();

        if (projectName) {
            const newProj = projectList.addProject(projectName);
            currentActiveProject = newProj; // Switch automatically to new project
            saveToLocalStorage();
            renderProjectsUI();
            renderTasks();
            newProjectForm.reset();
        }
    });
}

// sidebar projects dropdown toggle
myProjects.addEventListener('click', function () {
    projects.classList.toggle('projects');
})

// ==========================================
// INITIAL APP INITIALIZATION
// ==========================================
loadFromLocalStorage();
renderProjectsUI();
renderTasks();






























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
 