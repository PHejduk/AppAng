import { Component } from '@angular/core';
import { Project } from "./model/Project";
import { Feature } from "./model/Feature";
import { Task } from "./model/Task";
import { User } from "./model/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User = {
    login: 'tkopacz',
    firstName: 'Tomasz',
    lastName: 'Kopacz',
    permissions: 'admin',
    password: '123'
  };

  projects: Project[] = [
    {
      name: 'Project 1',
      description: 'Project 1 description'
    },
    {
      name: 'Project 2',
      description: 'Project 2 description'
    }
  ];

  features: Feature[] = [
    {
      name: 'Feature 1',
      description: 'Feature 1 description',
      priority: 'High',
      project: this.projects[0],
      owner: 'John Doe',
      status: 'todo'
    },
    {
      name: 'Feature 2',
      description: 'Feature 2 description',
      priority: 'Medium',
      project: this.projects[0],
      owner: 'Jane Smith',
      status: 'todo'
    },
    {
      name: 'Feature 3',
      description: 'Feature 3 description',
      priority: 'Low',
      project: this.projects[1],
      owner: 'Mike Johnson',
      status: 'todo'
    }
  ];

  tasks: Task[] = [
    {
      name: 'Task 1',
      description: 'Task 1 description',
      priority: 'High',
      feature: this.features[0],
      estimatedCompletionTime: 5,
      status: 'todo',
      dateAdded: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      responsibleUser: 'developer'
    },
    {
      name: 'Task 2',
      description: 'Task 2 description',
      priority: 'Medium',
      feature: this.features[0],
      estimatedCompletionTime: 3,
      status: 'todo',
      dateAdded: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      responsibleUser: 'developer'
    },
    {
      name: 'Task 3',
      description: 'Task 3 description',
      priority: 'Medium',
      feature: this.features[1],
      estimatedCompletionTime: 2,
      status: 'todo',
      dateAdded: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      responsibleUser: 'developer'
    },
    {
      name: 'Task 4',
      description: 'Task 4 description',
      priority: 'Low',
      feature: this.features[1],
      estimatedCompletionTime: 1,
      status: 'todo',
      dateAdded: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      responsibleUser: 'developer'
    },
    {
      name: 'Task 5',
      description: 'Task 5 description',
      priority: 'Low',
      feature: this.features[2],
      estimatedCompletionTime: 4,
      status: 'todo',
      dateAdded: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      responsibleUser: 'developer'
    },
    {
      name: 'Task 6',
      description: 'Task 6 description',
      priority: 'Medium',
      feature: this.features[2],
      estimatedCompletionTime: 2,
      status: 'todo',
      dateAdded: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      responsibleUser: 'developer'
    }
  ];

  selectedProject: Project | null = this.projects[0];
  selectedProjectToEdit: Project | null = null;
  selectedFeature: Feature | null = null;
  selectedFeatureToEdit: Feature | null = null;
  selectedTask: Task | null = null;
  selectedTaskToEdit: Task | null = null;

  addNewProjectFormVisible: boolean = false;
  newProjectName: string = '';
  newProjectDescription: string = '';

  addNewFeatureFormVisible: boolean = false;
  newFeatureName: string = '';
  newFeatureDescription: string = '';
  newFeaturePriority: string = 'Medium';

  addNewTaskFormVisible: boolean = false;
  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskPriority: string = 'Low';
  newTaskEstimatedCompletionTime: number = 0;

  editProjectName: string = '';
  editProjectDescription: string = '';

  editFeatureName: string = '';
  editFeatureDescription: string = '';
  editFeaturePriority: string = 'Medium';

  editTaskName: string = '';
  editTaskDescription: string = '';
  editTaskPriority: string = 'Low';
  editTaskEstimatedCompletionTime: number = 0;

  selectProject(project: Project) {
    this.selectedProject = project;
    this.selectedFeature = null;
    this.selectedTask = null;
  }

  showFeatureDetails(feature: Feature) {
    this.selectedFeature = feature;
    this.selectedTask = null;
  }

  showTaskDetails(task: Task) {
    this.selectedTask = task;
  }

  getFeaturesForSelected(): Feature[] {
    if (this.selectedProject) {
      return this.features.filter(feature => feature.project === this.selectedProject);
    }
    return [];
  }

  getTasksForSelected(): Task[] {
    if (this.selectedFeature) {
      return this.tasks.filter(task => task.feature === this.selectedFeature);
    }
    return [];
  }

  getFeatureStatus(feature: Feature): string {
    const tasks = this.getTasksForSelected();
    const taskCount = tasks.length;
    const todoCount = tasks.filter(task => task.status === 'todo').length;
    const doneCount = tasks.filter(task => task.status === 'done').length;

    if (taskCount === 0 || todoCount == taskCount) {
      return 'todo';
    } else if (doneCount === taskCount) {
      return 'done';
    } else {
      return 'doing';
    }
  }

  updateTaskStatus(task: Task) {
    if (task.status === 'done') {
      task.endDate = new Date();
    } else if (task.status === 'doing') {
      task.startDate = new Date();
    } else {
      task.startDate = new Date();
      task.endDate = new Date();
    }
  }

  addNewProject() {
    const newProject: Project = {
      name: this.newProjectName,
      description: this.newProjectDescription
    };

    this.projects.push(newProject);

    this.newProjectName = '';
    this.newProjectDescription = '';
    this.addNewProjectFormVisible = false;
  }

  cancelNewProject() {
    this.newProjectName = '';
    this.newProjectDescription = '';
    this.addNewProjectFormVisible = false;
  }

  editProject(project: Project) {
    this.selectedProjectToEdit = project;
    this.editProjectName = project.name;
    this.editProjectDescription = project.description;
  }

  saveEditedProject(project: Project) {
    project.name = this.editProjectName;
    project.description = this.editProjectDescription;
    this.cancelEditProject();
  }

  cancelEditProject() {
    this.selectedProjectToEdit = null;
    this.editProjectName = '';
    this.editProjectDescription = '';
  }

  deleteProject(project: Project) {
    const index = this.projects.indexOf(project);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }

  addNewFeature() {
    const newFeature: Feature = {
      name: this.newFeatureName,
      description: this.newFeatureDescription,
      priority: this.newFeaturePriority,
      project: this.selectedProject!,
      owner: this.currentUser.login,
      status: 'todo'
    };

    this.features.push(newFeature);

    this.newFeatureName = '';
    this.newFeatureDescription = '';
    this.newFeaturePriority = 'Medium';
    this.addNewFeatureFormVisible = false;
  }

  cancelNewFeature() {
    this.newFeatureName = '';
    this.newFeatureDescription = '';
    this.newFeaturePriority = 'Medium';
    this.addNewFeatureFormVisible = false;
  }

  editFeature(feature: Feature) {
    this.selectedFeatureToEdit = feature;
    this.editFeatureName = feature.name;
    this.editFeatureDescription = feature.description;
    this.editFeaturePriority = feature.priority;
  }

  saveEditedFeature(feature: Feature) {
    feature.name = this.editFeatureName;
    feature.description = this.editFeatureDescription;
    feature.priority = this.editFeaturePriority;
    this.cancelEditFeature();
  }

  cancelEditFeature() {
    this.selectedFeatureToEdit = null;
    this.editFeatureName = '';
    this.editFeatureDescription = '';
    this.editFeaturePriority = 'Medium';
  }

  deleteFeature(feature: Feature) {
    const index = this.features.indexOf(feature);
    if (index !== -1) {
      this.features.splice(index, 1);
    }
  }

  addNewTask() {
    const newTask: Task = {
      name: this.newTaskName,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      feature: this.selectedFeature!,
      estimatedCompletionTime: this.newTaskEstimatedCompletionTime,
      status: 'todo',
      dateAdded: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      responsibleUser: 'developer'
    };

    this.tasks.push(newTask);

    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'Low';
    this.newTaskEstimatedCompletionTime = 0;
    this.addNewTaskFormVisible = false;
  }

  cancelNewTask() {
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'Low';
    this.newTaskEstimatedCompletionTime = 0;
    this.addNewTaskFormVisible = false;
  }

  editTask(task: Task) {
    this.selectedTaskToEdit = task;
    this.editTaskName = task.name;
    this.editTaskDescription = task.description;
    this.editTaskPriority = task.priority;
    this.editTaskEstimatedCompletionTime = task.estimatedCompletionTime;
  }

  saveEditedTask(task: Task) {
    task.name = this.editTaskName;
    task.description = this.editTaskDescription;
    task.priority = this.editTaskPriority;
    task.estimatedCompletionTime = this.editTaskEstimatedCompletionTime;
    this.cancelEditTask();
  }

  cancelEditTask() {
    this.selectedTaskToEdit = null;
    this.editTaskName = '';
    this.editTaskDescription = '';
    this.editTaskPriority = 'Low';
    this.editTaskEstimatedCompletionTime = 0;
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
