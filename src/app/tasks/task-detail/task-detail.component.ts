import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { Task } from "../shared/task.model";
import { TaskService } from "../shared/task.service";

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit {
  public reactiveTaskForm: FormGroup;
  public task: Task;
  public taskDoneOptions: Array<any> = [
    { value: false, text: "Pendente" },
    { value: true, text: "Feita" }
  ];

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.reactiveTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null, Validators.required],
      description: [null]
    })
  }

  public ngOnInit() {
    this.task = new Task(null, null);

    this.route.params
      .switchMap((params: Params) => this.taskService.getById(+params['id']))
      .subscribe(
        task => this.setTask(task),
        error => alert("Ocorreu um erro no servidor, tente mais tarde.")
      );
  }

  public setTask(task: Task): void {
    this.task = task;

    // //setValue
    // let formModel = {
    //   title: task.title || null,
    //   deadline: task.deadline || null,
    //   done: task.done || null,
    //   description: task.description || null
    // }

    this.reactiveTaskForm.patchValue(task);


  }

  public ngAfterViewInit() {
    $("#deadline").datetimepicker({
      'sideBySide': true,
      'locale': 'pt-br'
    }).on('dp.change', () => this.reactiveTaskForm.get('deadline').setValue($("#deadline").val()));
  }

  public goBack() {
    this.location.back();
  }

  public updateTask() {
    this.taskService.update(this.task)
      .subscribe(
        () => alert("Tarefa atualizada com sucesso!"),
        error => alert("Ocorreu um erro no servidor, tente mais tarde.")
      )
  }

  public showFieldError(field): boolean {
    return field.invalid && (field.touched || field.dirty);
  }
}