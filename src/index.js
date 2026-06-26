import "./styles.css";

const togglebtn = document.querySelector(".toggleBtn")
const sidebar = document.querySelector(".sidebar")
const addTaskBtn = document.querySelector("#submit-btn")
const taskCont = document.querySelector("#tasks-cont")
const taskTitle = document.querySelector("#task-title")
const taskDesc = document.querySelector("#task-desc")
const dueDate = document.querySelector("#due-date")
const priority = document.querySelector("#priority")




addTaskBtn.addEventListener('click', function(e) {

    e.preventDefault()

    // task cont
    let tasks = document.createElement("div")
    tasks.innerHTML = `<div><div class="col"><h2 class="newTaskTitle"></h2><p class="newTaskDesc"></p>
    </div><div class="row"><h3 class="newTaskDueDate"></h3><h3 class="newTaskPriority"></h3></div></div>`


    tasks.classList.add('tasks')


    // task
    let col = document.createElement("div")
    col.classList.add('col')
    let newTaskTitle = document.createElement("li")
    newTaskTitle.classList.add('title')
    let newTaskDesc = document.createElement("p")
    newTaskDesc.classList.add('para')

    let row = document.createElement("div")
    row.classList.add('row')
    let newTaskDueDate = document.createElement("h3")
    newTaskDueDate.classList.add('due-date')
    let newTaskPriority = document.createElement("h3")
    newTaskPriority.classList.add('Priority')


    newTaskTitle.textContent = taskTitle.value
    newTaskDesc.textContent = taskDesc.value
    newTaskDueDate.textContent = dueDate.value
    newTaskPriority.textContent = priority.value

   
    col.appendChild(newTaskTitle)
    col.appendChild(newTaskDesc)


    tasks.appendChild(col)

    row.appendChild(newTaskDueDate)
    row.appendChild(newTaskPriority)


    tasks.appendChild(row)

    taskCont.appendChild(tasks)
})