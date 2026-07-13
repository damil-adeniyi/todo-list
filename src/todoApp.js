import { format, parseISO } from "date-fns";

export class Project {
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

    deleteTask(taskId) {
        this.task = this.tasks.filter(task => task.id !== taskId)
    }
}

export class Task {                                             
    constructor(title = 'Have Fun!', 
                desc = 'Watch Netflix', 
                dueDate = format(new Date(), 'LLL d'),
                priority = 'low',
                projectName = 'default') {
            this.id = crypto.randomUUID();        
            this.title = title;
            this.desc = desc;
            // Parse raw HTML input string if passed, otherwise keep Date object
            this.dueDate = typeof dueDate === 'string' ? parseISO(dueDate): dueDate;
            this.priority = priority;
            this.projectName = projectName;
            this.complete = false;

    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}

// System state tracking all projects
export const projectList = {
    projects: [new Project('Default'), new Project('Get Working')],
    
    addProject(name) {
        if (!this.projects.some(p => p.name === name)) {
            this.projects.push(new Project(name));
        }
    },
    
    getProject(name) {
        return this.projects.find(p => p.name === name) || this.projects[0];
    }
};