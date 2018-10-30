import { Component, Input } from '@angular/core';
import {Headers, Http} from '@angular/http';

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
  new_username: String = "";
  auth_key: String = "";
  proj_name: String = "";
  organization: String = "";
  funder: String = "";
  description: String = "";
  email: String = "";
  remove_button: Boolean = false;
  auth_key_validity: Boolean = false;
  create_user_validity: Boolean = false;
  create_email_validity: Boolean = false;
  login_user_validity: Boolean = false;
  if_new: Boolean = false; // Default false
  if_new_project: Boolean = false; // Default false
  if_new_user: Boolean = false; // Default false
  if_new_login: Boolean = false; // Default false
  if_logout: Boolean = false; // Default false
  if_details: Boolean = false; // Default false

  constructor(private http: Http) {

  }

  boolNew = function(){
    return this.if_new;
  }

  boolNewToggle = function(){
    this.if_new ==  false ? this.if_new =  true : this.if_new =  false;
  }

  boolNewProjectToggle = function(){    
    this.if_new_project ==  false ? this.if_new_project =  true : this.if_new_project =  false;
  }

  boolDetailsToggle = function(){
    this.if_details ==  false ? this.if_details =  true : this.if_details =  false;
  }

  boolNewUserToggle = function(){
    this.if_new_user ==  false ? this.if_new_user =  true : this.if_new_user =  false;
  }

  boolLoginToggle = function(){
    this.if_new_login ==  false ? this.if_new_login =  true : this.if_new_login =  false;
  }

  boolNewUser = function(){
    return this.if_new_user;
  }

  boolNewLogin = function(){
    return this.if_new_login;
  }

  boolNewProject = function (){
    return this.if_new_project;
  }

  boolDetails = function (){
    return this.if_details;
  }

  btnNewProjClick= function () {
    this.router.navigateByUrl('/user');
  };

  // sqlCheck = function(type: string, query: string, params: Array<string>){
  //   return this.http.get('http://129.206.7.141:8080/get/username/availability?username=zz').toPromise()
  //   .then(function (response){
  //     console.log(response);
  //     // response => response.json()
  //   }
  //     // response => response.json()
  //     // console.log(response);
  //   );
  //   // .map(response => response.json());
    
  // }

  usernameInput = function(event: any){
    // SQL Check if username exists        
    this.http.get('http://129.206.7.141:8080/get/username/availability?username='+this.username)
      .toPromise()
      .then(function (response){
        if(response["_body"] == "true"){
          event.target.classList.remove('input-error');
          event.target.classList.add('input-success');
        } else if (response["_body"] == "false"){
          event.target.classList.remove('input-success');
          event.target.classList.add('input-error');
        }
      }
    );
        
  }

  authKeyInput = function(event: any){
    // SQL Check if auth_key for corresponding username valid
    // this.auth_key_validity = true; // Make it true if everything is ok and valid for auth_key and username
    ////////////////////
    if(event.target.classList.contains('input-error')){
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else if (event.target.classList.contains('input-success')){
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  newUsernameInput = function(event: any){
    // SQL Check if username exists. Also set "create_user_validity" (includes both username and password) 
    ////////////////////
    if(event.target.classList.contains('input-error')){
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else if (event.target.classList.contains('input-success')){
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  emailInput = function(event: any){
    // SQL Check if username exists. Also set "create_user_validity" (includes both username and password) and "create_email_validity"
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
    if (this.auth_key_validity && this.proj_name != null){
      return false; // Show
    } else{
      return true; // No Show
    }
  }

  boolSubmitUser = function(){
    // return false;
    if (this.create_user_validity){
      return false; // Show
    } else{
      return true; // No Show
    }
  }

  boolSubmitPasswordRecovery = function(){
    // return false;
    if (this.create_email_validity){
      return false; // Show
    } else{
      return true; // No Show
    }
  }

  createNewProject = function(){
    // Create New Project - drupal api and invalidate username and auth_key
    ////////////////////
    this.boolNewToggle();
    this.boolNewProjectToggle();
  }

  successProjectCreate = function(){
    alert("Project Created Successfully!");
  }

  createNewUser = function(){
    // Create New User
    ////////////////////
    this.boolNewToggle();
    this.boolNewUserToggle();
  }

  boolLoginUser = function(){
    return false;
    // if (this.login_user_validity){
    //   return false; // Show
    // } else{
    //   return true; // No Show
    // }
  }

  removeButton = function(){
    return this.remove_button
  }

  newLogin = function(){
    // Login New User check - If success 
    ////////////////////
    if (true){
      console.log("w");
      this.remove_button = !this.remove_button;
      this.if_logout = !this.if_logout;
      this.boolDetailsToggle();
    }
    // } else {
    //   alert("Login Error! :-(");
    //   this.boolNewToggle();
    //   this.boolLoginToggle();
    // }
  }

  removeLogout = function(){
    if (!this.if_logout){
      return true;
    } else {
      return false;
    }
  }

  logOut = function(){
    this.remove_button = !this.remove_button;
    this.if_logout = !this.if_logout;
    this.boolDetailsToggle();
  }

  successUserCreate = function(){
    alert("User Created Successfully!");
  }

  recoverPass = function(){
//
  }

  passwordRecoverySuccess = function(){
    alert("Kindly check your email!");
  }

}
