import { Component } from '@angular/core';
declare var jquery: any;
declare var $: any;

import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  public constructor(private tokenService: Angular2TokenService) {
    this.tokenService.init({
      apiBase: 'http://api.taskmanager.test:3000'
    });
  }
}

