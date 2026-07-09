import "./styles.css";
import { format, compareAsc } from "date-fns";

const togglebtn = document.querySelector(".toggleBtn")
const sidebar = document.querySelector(".sidebar")
const addTaskBtn = document.querySelector("#submit-btn")
const taskCont = document.querySelector("#tasks-cont")
const taskTitle = document.querySelector("#task-title")
const taskDesc = document.querySelector("#task-desc")
const dueDate = document.querySelector("#due-date")
const priority = document.querySelector("#priority")
const projectName = document.querySelector("#projects-dropdown")
const taskForm = document.querySelector("form")

class Project {
    static numProjects = 0;

    constructor(name='default') {
        this.name = name;
        this.status = 'pending';
        // this.project = {};
        this.project = [];
        Project.numProjects++
    }

    addTask(task) {
    //   this.project[task.title] = task;
        this.project.push(task);
    }
}

class Task {
    constructor(title = 'Have Fun!', 
                desc = 'Watch Netflix', 
                dueDate = format(new Date(), 'LLL d'),
                priority = 'low',
                projectNa) {
            this.title = title;
            this.desc = desc;
            this.dueDate = dueDate;
            this.priority = priority;
            this.projectNa = projectNa;

    }
}

const project = new Project();
project.name = 'Get Working'
const task = new Task();
const task1 = new Task('Read TOD', 'Continue classes', format(new Date(2026, 6, 30), 'LLL d'), 'low', 'Get Working');
const task2 = new Task('Read Freecodecamp', 'Continue DOM', format('07/02/2026', 'LLL d'), 'high', 'Get Working');

// project.addTask(task)
project.addTask(task1)
// project.addTask(task2)
// console.log(project);
// console.log(task);
// console.log(task1);


function addTaskToProject(title, desc, duedate, priorityD, projectNa) {
    // const project = new Project();
    const task = new Task(title, desc, duedate, priorityD, projectNa)
    let add = project.addTask(task)
    console.log(project);

}


function displayTask() {
    taskCont.innerHTML = '';
    const projectCont = project.project;
    console.log(projectCont);   
    projectCont.forEach(
        (task) => {
            //  task cont
                const taskCard = document.createElement("div")
                 taskCard.classList.add('taskCard')
            //task
                taskCard.innerHTML = `<div>
                                <div class="col">
                                    <div class="featCont">
                                     <div class="titlecont">
                                    <button class="checkTask">✔</button>
                                    <h2 class="newTaskTitle">${task.title}</h2>
                                    </div>

                                <div class="propCont">
                                    <h3 class="newTaskDueDate">${format((task.dueDate), 'LLL d')}</h3>
                                    <h3 class="newTaskPriority">${task.priority}</h3>

                                </div>

                                    </div> 
                                    <p class="newTaskDesc">${task.desc}</p>
                                    <div class="col-foot">
                                    <h3 class="newprojectName">${task.projectNa}</h3>
                                    <button class="delete-btn">Delete</button>
                                    </div>
                                </div>
                                
                            </div>`


            //check the task
            const checkTask = taskCard.querySelector('.checkTask');
            const newTaskTitle = taskCard.querySelector('.newTaskTitle');
            const newTaskDesc = taskCard.querySelector('.newTaskDesc');
            checkTask.addEventListener('click', function() {
                console.log('check');
                newTaskTitle.classList.toggle('strike');
                newTaskDesc.classList.toggle('strike');
            })

            //delete task
            const deleteBtn = taskCard.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function(e) {
                console.log('delete');
                
                const target = e.target;
                target.parentElement.parentElement.parentElement.parentElement.remove();
                
            })


            taskCont.appendChild(taskCard);
        }
    )
    
}

displayTask()

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = taskTitle.value;
    const desc = taskDesc.value;
    const duedate = dueDate.value;
    const priorityN = priority.value;
    const projectNa = projectName.value;

    addTaskToProject(title, desc, duedate, priorityN, projectNa);

    displayTask()

    taskForm.reset(); 
});

console.log(project);



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
 