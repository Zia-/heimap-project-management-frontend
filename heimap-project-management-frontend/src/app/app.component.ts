import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  if_new_project = false;

  boolNewProjectToggle = function(){    
    this.if_new_project ==  false ? this.if_new_project =  true : this.if_new_project =  false;
  }

  boolNewProject = function (){
    return this.if_new_project;
  }

  btnNewProjClick= function () {
    this.router.navigateByUrl('/user');
  };

}
