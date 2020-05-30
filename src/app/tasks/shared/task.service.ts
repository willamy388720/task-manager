import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { Task } from "./task.model";

@Injectable()

export class TaskService {
  public taskUrl = "api/tasks"
  public headers = new Headers({ 'Content-type': 'application/json' });

  constructor(private http: Http) { }

  public getAll(): Observable<Task[]> {
    return this.http.get(this.taskUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportant(): Observable<Task[]> {
    return this.getAll()
      .catch(this.handleErrors)
      .map(tasks => tasks.slice(0, 3));
  }

  public getById(id: number): Observable<Task> {
    let url = `${this.taskUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task);
  }

  public create(task: Task): Observable<Task> {
    let body = JSON.stringify(task)

    return this.http.post(this.taskUrl, body, { headers: this.headers })
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task);
  }

  public update(task: Task): Observable<Task> {
    let url = `${this.taskUrl}/${task.id}`;
    let body = JSON.stringify(task);

    return this.http.put(url, body, { headers: this.headers })
      .catch(this.handleErrors)
      .map(() => task)
  }

  public delete(id: number): Observable<null> {
    let url = `${this.taskUrl}/${id}`;

    return this.http.delete(url, { headers: this.headers })
      .catch(this.handleErrors)
      .map(() => null);
  }

  public searchByTitle(term: string): Observable<Task[]> {
    let url = `${this.taskUrl}?title=${term}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[])
  }

  private handleErrors(error: Response) {
    console.log("Erro", error)
    return Observable.throw(error);
  }

}