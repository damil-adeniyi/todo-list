import { format, parseISO } from "date-fns";

export class Project {
    static numProjects = 0;

    constructor(name = 'default') {
        this.name = name;
        this.status = 'pending';
        this.tasks = []; 
        Project.numProjects++;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    // Convert plain JSON objects back into actual Project/Task class instances
    static fromJSON(json) {
        const project = new Project(json.name);
        project.status = json.status;
        project.tasks = json.tasks.map(taskData => Task.fromJSON(taskData));
        return project;
    }
}

export class Task {                                             
    constructor(title = 'Have Fun!', 
                desc = 'Watch Netflix', 
                dueDate = format(new Date(), 'yyyy-MM-dd'), // HTML date inputs use yyyy-MM-dd
                priority = 'low',
                projectName = 'default') {
            this.id = crypto.randomUUID();        
            this.title = title;
            this.desc = desc;
            this.dueDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
            this.priority = priority;
            this.projectName = projectName;
            this.complete = false;
    }

    toggleComplete() {
        this.complete = !this.complete;
    }

    // Convert plain JSON task objects back into actual Task class instances
    static fromJSON(json) {
        const task = new Task(json.title, json.desc, json.dueDate, json.priority, json.projectName);
        task.id = json.id;
        task.complete = json.complete;
        return task;
    }
}

export const projectList = {
    projects: [],
    
    addProject(name) {
        if (!this.projects.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            const newProj = new Project(name);
            this.projects.push(newProj);
            return newProj;
        }
        return this.getProject(name);
    },
    
    getProject(name) {
        return this.projects.find(p => p.name.toLowerCase() === name.toLowerCase()) || this.projects[0];
    },

    // ADD THIS METHOD:
    deleteProject(name) {
        // Prevent deleting the very last project
        if (this.projects.length <= 1) {
            alert("You must keep at least one project!");
            return false;
        }
        
        this.projects = this.projects.filter(p => p.name.toLowerCase() !== name.toLowerCase());
        return true;
    }
};