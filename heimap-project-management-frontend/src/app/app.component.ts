import { Component, Input } from '@angular/core';

import { Router, Data } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // @Input() input_username: String;
  username: String = "";
  auth_key: String = "";
  proj_name: String = "";
  organization: String = "";
  funder: String = "";
  description: String = "";
  auth_key_validity: Boolean = false;
  if_new_project: Boolean = false; // Default false

  boolNewProjectToggle = function(){    
    this.if_new_project ==  false ? this.if_new_project =  true : this.if_new_project =  false;
  }

  boolNewProject = function (){
    return this.if_new_project;
  }

  btnNewProjClick= function () {
    this.router.navigateByUrl('/user');
  };

  usernameInput = function(event: any){
    // SQL Check if username exists
    ////////////////////
    if(event.target.classList.contains('input-error')){
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else if (event.target.classList.contains('input-success')){
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  authKeyInput = function(event: any){
    // SQL Check if auth_key for corresponding username valid
    this.auth_key_validity = true; // Make it true if everything is ok and valid for auth_key and username
    ////////////////////
    if(event.target.classList.contains('input-error')){
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else if (event.target.classList.contains('input-success')){
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  boolSubmitProject = function(){
    if (this.proj_name != null && this.auth_key_validity){
      return false;
    } else{
      return true;
    }
  }

  createNewProject = function(){
    // Create New Project - drupal api and invalidate username and auth_key
    ////////////////////
    this.boolNewProjectToggle();
  }

  successProjectCreate = function(){
    alert("Project Created Successfully!");
  }

}
