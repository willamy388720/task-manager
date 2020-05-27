import { Component, OnInit } from "@angular/core";

import { Task } from "./shared/task.model";
import { TaskService } from "./shared/task.service";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.components.html',
  providers: [
    { provide: TaskService, useClass: TaskService }
  ]
})

export class TasksComponent implements OnInit {
  public tasks: Array<Task>;
  public selectedTask: Task;

  public constructor(private taskService: TaskService) { }

  public ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  public onSelect(task: Task): void {
    this.selectedTask = task;
  }
}