import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewProjectComponent } from './src/new-project/new-project.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
  // { path: '', component: DomComponent},
  { path: 'project/', component: NewProjectComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NewProjectComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BootstrapModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
