import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { TaskComponent } from './Pages/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasklistComponent } from './Pages/tasklist/tasklist.component';
import { MainComponent } from './Pages/main/main.component';
import { TaskmanageComponent } from './Pages/taskmanage/taskmanage.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasklistComponent,
    MainComponent,
    TaskmanageComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() 
  ],
  providers: [
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
