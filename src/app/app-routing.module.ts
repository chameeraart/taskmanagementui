import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Login/login/login.component';
import { TaskComponent } from './Pages/task/task.component';
import { MainComponent } from './Pages/main/main.component';
import { TasklistComponent } from './Pages/tasklist/tasklist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent // MainComponent will be loaded when accessing '/main'
  },
  {
    path: 'task',
    component: TaskComponent,
  },
  {
    path: 'tasklist',
    component: TasklistComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
