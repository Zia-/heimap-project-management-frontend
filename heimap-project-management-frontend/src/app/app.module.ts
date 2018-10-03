import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewProjectComponent } from './src/new-project/new-project.component';
import { Routes, RouterModule } from '@angular/router';

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
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
