import "./styles.css";
import { format, compareAsc } from "date-fns";

class Project {
    static numProjects = 0;

    constructor(name='default') {
        this.name = name;
        this.status = 'pending';
        this.tasks = {};
        Project.numProjects++
    }

    addTask(task) {
      this.tasks[task.title] = Task;
    }
}

class Task {
    constructor(title = 'Get a task done', 
                desc = 'Watch Netflix', 
                dueDate = new Date().toLocaleDateString(),
                priority = 'low') {
            this.title = title;
            this.desc = desc;
            this.dueDate = dueDate;
            this.priority = priority;

    }
}

const project = new Project();
project.name = 'Get Working'
const task = new Task();
const task1 = new Task('Read TOD', 'Continue classes', format(new Date(2026, 6, 30), 'LLL d'), 'low');
const task2 = new Task('Read Freecodecamp', 'Continue OOP', format('07/02/2026', 'LLL d'), 'high');

project.addTask(task1)
project.addTask(task2)
// console.log(project);

const togglebtn = document.querySelector(".toggleBtn")
const sidebar = document.querySelector(".sidebar")
const addTaskBtn = document.querySelector("#submit-btn")
const taskCont = document.querySelector("#tasks-cont")
const taskTitle = document.querySelector("#task-title")
const taskDesc = document.querySelector("#task-desc")
const dueDate = document.querySelector("#due-date")
const priority = document.querySelector("#priority")


addTaskBtn.addEventListener('click', function (e) {
    e.preventDefault()

    // task cont
    let tasks = document.createElement("div")
    tasks.innerHTML = `<div>
                            <div class="col">
                                <div class="featCont">
                                     <div class="titlecont">
                                    <button class="checkTask">✔</button>
                                    <h2 class="newTaskTitle">${taskTitle.value}</h2>
                                </div>

                                <div class="propCont">
                                    <h3 class="newTaskDueDate">${format((dueDate.value), 'LLL d')}</h3>
                                    <h3 class="newTaskPriority">${priority.value}</h3>

                                </div>

                                </div> 
                                
                                <p class="newTaskDesc">${taskDesc.value}</p>
                            </div>
                            </div>`

    tasks.classList.add('tasks')
    taskCont.appendChild(tasks)

});
