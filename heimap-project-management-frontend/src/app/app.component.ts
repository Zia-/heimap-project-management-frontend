import { Component, Input } from '@angular/core';
import {Headers,  Http, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Router, Data } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { findSafariExecutable } from 'selenium-webdriver/safari';
import { map, filter, switchMap, count } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // @Input() input_username: String;
  backend_api: String = "http://129.206.7.141:8080";
  // backend_api: String = "http://localhost:8080";
  drupal_api: String = "http://localhost:8080";
  username: String = "";
  new_username: String = "";
  new_password: String = "";
  new_re_password: String = "";
  auth_key: String = "";
  proj_name: String = "";
  organization: String = "";
  funder: String = "";
  description: String = "";
  email: String = "";
  firstname: String = "";
  lastname: String = "";
  user_organisation: String = "";
  user_about: String = "";
  user_details_array: Array<any> = [];
  proj_items: Array<any> = [];
  full_name: String = "";
  invite_username: String = "";
  invite_role: String = "";
  proj_id_array: Array<any> = [];
  remove_button: Boolean = false;
  auth_key_validity: Boolean = false;
  create_user_validity: Boolean = false;
  email_email_validity: Boolean = false;
  email_username_validity: Boolean = false;
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

  cleanVariables = function (){
      this.username = "";
    this.new_username = "";
    this.new_password = "";
    this.new_re_password = "";
    this.auth_key = "";
    this.proj_name = "";
    this.organization = "";
    this.funder = "";
    this.description = "";
    this.email = "";
    this.firstname = "";
    this.lastname = "";
    this.user_organisation = "";
    this.user_about = "";
    this.user_details_array = [];
    this.proj_items = [];
    this.full_name = "";
    this.invite_username = "";
    this.invite_role = "";
    this.proj_id_array = [];
    this.remove_button = false;
    this.auth_key_validity = false;
    this.create_user_validity = false;
    this.email_email_validity = false;
    this.email_username_validity = false;
    this.create_email_validity = false;
    this.login_user_validity = false;
    this.if_new = false; 
    this.if_new_project = false; 
    this.if_new_user = false; 
    this.if_new_login = false;
    this.if_logout = false; 
    this.if_details = false;
  }

  promiseUserName = function (){
    return this.http.get(this.backend_api+'/get/username/availability?username='+this.username)
  }

  setUserName = function (data: any, event: any){
    if (data["_body"] == "true"){
      this.auth_key_validity = false;
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    } else {
      this.auth_key_validity = true;
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    }
  }

  rejectUserName = function (err: any, event: any){
    if (err["_body"] == "USER AVAILABILITY FAILED"){
      this.auth_key_validity = true;
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else {
      this.auth_key_validity = false;
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  usernameInput = function(event: any){
    // SQL Check if username exists    
    this.promiseUserName().subscribe(
      data => this.setUserName(data, event),
      err => this.rejectUserName(err, event)
    )    
  }

  promiseAuthKey = function (){
    return this.http.get(this.backend_api+'/get/authkey/availability?username='+this.username+'&authkey='+this.auth_key)
  }

  setAuthKey = function (data: any, event: any){
    if (data["_body"] == "true"){
      this.auth_key_validity = true;
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else {
      this.auth_key_validity = false;
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  rejectAuthKey = function (err: any, event: any){
    if (err["_body"] == "AUTHORISATION KEY AVAILABILITY FAILED"){
      this.auth_key_validity = false;
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    } else {
      this.auth_key_validity = true;
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    }
  }

  authKeyInput = function(event: any){
    // SQL Check if auth_key for corresponding username valid
    this.promiseAuthKey().subscribe(
      data => this.setAuthKey(data, event),
      err => this.rejectAuthKey(err, event)
    )
    // this.auth_key_validity = true; // Make it true if everything is ok and valid for auth_key and username
    ////////////////////
  }

  promiseNewUserName = function (){
    return this.http.get(this.backend_api+'/get/username/availability?username='+this.new_username)
  }

  setNewUserName = function (data: any, event: any){
    if (data["_body"] == "true"){
      this.email_username_validity = true;
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else {
      this.email_username_validity = false;
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  rejectNewUserName = function (err: any, event: any){
    if (err["_body"] == "USER AVAILABILITY FAILED"){
      this.email_username_validity = false;
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    } else {
      this.email_username_validity = true;
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    }
  }

  newUsernameInput = function(event: any){
    // SQL Check if username exists. Also set "create_user_validity" (includes both username and password) 
    this.promiseNewUserName().subscribe(
      data => this.setNewUserName(data, event),
      err => this.rejectNewUserName(err, event)
    ) 
    ////////////////////
    // if(event.target.classList.contains('input-error')){
    //   event.target.classList.remove('input-error');
    //   event.target.classList.add('input-success');
    // } else if (event.target.classList.contains('input-success')){
    //   event.target.classList.remove('input-success');
    //   event.target.classList.add('input-error');
    // }
  }

  promiseInviteUsername = function (){
    return this.http.get(this.backend_api+'/get/username/availability?username='+this.invite_username)
  }

  setInviteUsername = function (data: any, event: any){
    if (data["_body"] == "true"){
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    } else {
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    }
  }

  rejectInviteUsername = function (err: any, event: any){
    if (err["_body"] == "USER AVAILABILITY FAILED"){
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else {
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  inviteUsername = function(event: any){
    this.promiseInviteUsername().subscribe(
      data => this.setInviteUsername(data, event),
      err => this.rejectInviteUsername(err, event)
    ) 
  }

  inviteUser = function(proj_id: number){
    // Invite New Members     
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.post_payload = {"username":this.invite_username,"role_proj":this.invite_role,"proj_id":proj_id}
    this.http.post(this.backend_api+'/post/role', this.post_payload, options).subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    this.invite_username = "";
    this.invite_role = "";
    
    this.promiseGetUserDetails().subscribe(
      data => this.setGetUserDetails(data),
      err => console.log(err)
    )
  }

  boolSubmitInvite = function(){
    // return false;
    if (this.invite_username != ""
        // && this.invite_username_check
        && this.invite_role != ""){
      return false; // Show
    } else{
      return true; // No Show
    }
  }

  promiseEmailInput = function (){
    return this.http.get(this.backend_api+'/get/emailid/availability?emailid='+this.email)
  }

  setEmail = function (data: any, event: any){
    if (data["_body"] == "true"){
      this.email_email_validity = true;
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    } else {
      this.email_email_validity = false;
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    }
  }

  rejectEmail = function (err: any, event: any){
    if (err["_body"] == "EMAIL ID AVAILABILITY FAILED"){
      this.email_email_validity = false;
      event.target.classList.remove('input-success');
      event.target.classList.add('input-error');
    } else {
      this.email_email_validity = true;
      event.target.classList.remove('input-error');
      event.target.classList.add('input-success');
    }
  }

  emailInput = function(event: any){
    // SQL Check if username exists. Also set "create_user_validity" (includes both username and password) and "create_email_validity"
    this.promiseEmailInput().subscribe(
      data => this.setEmail(data, event),
      err => this.rejectEmail(err, event)
    )  
    ////////////////////
    // if(event.target.classList.contains('input-error')){
    //   event.target.classList.remove('input-error');
    //   event.target.classList.add('input-success');
    // } else if (event.target.classList.contains('input-success')){
    //   event.target.classList.remove('input-success');
    //   event.target.classList.add('input-error');
    // }
  }

  promiseLogin = function (){
    return this.http.get(this.backend_api+'/get/login/check?username='+this.login_username+'&pass='+this.login_password)
  }

  setLogin = function(data: any){
    if (data["_body"] == "true"){
      this.login_user_validity = true;
    } else {
      this.login_user_validity = false;
    }
  }

  rejectLogin = function (err: any){
    if (err["_body"] == "LOGIN CHECK FAILED"){
      this.login_user_validity = false;
    } else {
      this.login_user_validity = true;
    }
  }

  checkLogin = function(event: any){
    // SQL Check if username exists. Also set "create_user_validity" (includes both username and password) 
    this.promiseLogin().subscribe(
      data => this.setLogin(data),
      err => this.rejectLogin(err)
    ) 
    
  }

  boolSubmitProject = function(event: any){         
    if (this.auth_key_validity 
      && this.proj_name != ""
      && this.username != ""){
      return false; // Show
    } else{
      return true; // No Show
    }
  }

  boolSubmitUser = function(){
    // return false;
    if (this.email_email_validity 
      && this.email_username_validity 
      && this.new_password === this.new_re_password
      && this.email != ""
      && this.new_username != ""
      && this.new_password != ""
      && this.new_re_password != ""){
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

  publishDrupalProject = function(proj_id: Number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.post_payload = {"action": "createProject", "data": [{"proj_id": proj_id}]};
    this.http.post(this.drupal_api+'/heimap/vector/project', this.post_payload, options).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }

  createNewProject = function(){
    // Create New Project - drupal api and invalidate username and auth_key
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.post_payload = {"username":this.username,"authkey":parseInt(this.auth_key),"proj_name":this.proj_name,"organisation":this.organization,"funder":this.funder,"description":this.description};
    this.http.post(this.backend_api+'/post/proj', this.post_payload, options).subscribe(
      data => this.publishDrupalProject(JSON.parse(data["_body"])[0]['proj_id']),
      err => console.log(err)
    );


    // this.post_payload1 = {"username":"jj","authkey":"123454","proj_name":"proj 2","organisation":"org 2","funder":"daad","description":"desp 1"};
    // this.post_payload1 = "faaaa";
    // this.http.post(this.backend_api+'/post/proj', JSON.stringify(this.post_payload1)).subscribe(
    //   data => console.log(data),
    //   err => console.log(err)
    // );


    // this.post_payload = {"action": "createProject", "data": [{"proj_id": "3"}]};
    // this.http.post(this.drupal_api+'/heimap/vector/project', JSON.stringify(this.post_payload)).subscribe(
    //   data => console.log(data),
    //   err => console.log(err)
    // );

    ////////////////////
    this.boolNewToggle();
    this.boolNewProjectToggle();
  }

  successProjectCreate = function(){
    alert("Project Created Successfully!");
  }

  createNewUser = function(){
    // Create New User
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.post_payload = {"first_name":this.firstname,"last_name":this.lastname,"email":this.email,"username":this.new_username,"pass":this.new_password,"organisation":this.user_organisation,"about":this.user_about};
    this.http.post(this.backend_api+'/post/user', this.post_payload, options).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
    ////////////////////
    this.boolNewToggle();
    this.boolNewUserToggle();
  }

  boolLoginUser = function(){
    // return false;    
    if (this.login_user_validity){
      return false; // Show
    } else{
      return true; // No Show
    }
  }

  removeButton = function(){
    return this.remove_button
  }

  promiseGetUserDetails = function (){
    return this.http.get(this.backend_api+'/get/proj/role?username='+this.login_username)
  }

  setGetUserDetails = function(data: any){    
    this.user_details_array = JSON.parse(data["_body"]);

    for (var i=0; i<this.user_details_array.length; i++){      
      if (this.user_details_array[i]["username"] == this.login_username){        
        // Set Full Name of Logged In User
        this.full_name = this.user_details_array[i]["first_name"] + " " + this.user_details_array[i]["last_name"];
      }

      if (this.proj_id_array.indexOf(this.user_details_array[i]["proj_id"]) < 0){
        // Make Unique Proj Ids
        this.proj_id_array.push(this.user_details_array[i]["proj_id"])
      }
    }

    this.proj_items = [];
    for (var i=0; i<this.proj_id_array.length; i++){
      this.proj_content_single = [];
      this.proj_members = [];
      for (var j=0; j<this.user_details_array.length; j++){
        if (this.proj_id_array[i] == this.user_details_array[j]["proj_id"]){
          this.proj_id_single = this.proj_id_array[i];
          this.proj_name_single = this.user_details_array[j]["proj_name"];
          if (this.user_details_array[j]["username"] == this.login_username){
            this.proj_role_single = this.user_details_array[j]["role_proj"]
            // if (this.proj_role_single == "superuser"){
            //   this.proj_invite = "true";
            // } else {
            //   this.proj_invite = "false";
            // }
          } else {
            this.proj_members_single = [];
            this.proj_members_single["first_name"] = this.user_details_array[j]["first_name"];
            this.proj_members_single["last_name"] = this.user_details_array[j]["last_name"];
            this.proj_members_single["role_proj"] = this.user_details_array[j]["role_proj"];
            this.proj_members_single["user_name"] = this.user_details_array[j]["username"];
            this.proj_members.push(this.proj_members_single);
          } 
        }
      }
      this.proj_content_single["proj_id_single"] = this.proj_id_single;
      this.proj_content_single["proj_name_single"] = this.proj_name_single;
      this.proj_content_single["proj_role_single"] = this.proj_role_single;
      // this.proj_content_single["proj_invite"] = this.proj_invite;
      this.proj_content_single["proj_members"] = this.proj_members;
      this.proj_items.push(this.proj_content_single);
    }

  }

  newLogin = function(){
    // Login New User check - If success 
    ////////////////////
    if (true){
      this.remove_button = !this.remove_button;
      this.if_logout = !this.if_logout;
      this.boolDetailsToggle();

      this.promiseGetUserDetails().subscribe(
        data => this.setGetUserDetails(data),
        err => console.log(err)
      ) 
    }
    // } else {
    //   alert("Login Error! :-(");
    //   this.boolNewToggle();
    //   this.boolLoginToggle();
    // }
  }

  clearUsernamePass = function (){
    this.login_username = "";
    this.login_password = "";
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
