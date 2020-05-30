// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components imports
import { AppComponent } from './app.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { TasksComponent } from "./tasks/tasks.component"
import { TaskDetailComponent } from "./tasks/task-detail/task-detail.component";
import { TaskSearchComponent } from "./navbar/task-search/task-search.component"

// services imports
import { TaskService } from "./tasks/shared/task.service";

// modules imports
import { AppRoutingModule } from "./app-routing.module";

// in memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryTaskDataService } from "./in-memory-task-data.service";

// rxjs operators
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

// rxjs extensions
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TasksComponent,
    TaskDetailComponent,
    TaskSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService),
    AppRoutingModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
