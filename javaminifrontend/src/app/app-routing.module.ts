import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { LoginGuard } from './services/login.guard';
import { ViewnotesComponent } from './notes/viewnotes/viewnotes.component';
import { AddnotesComponent } from './notes/addnotes/addnotes.component';
import { EditnotesComponent } from './notes/editnotes/editnotes.component';

const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'notes',component:ViewnotesComponent,canActivate:[LoginGuard]
  },
  {
    path:'notes/add',component:AddnotesComponent,canActivate:[LoginGuard]
  },
  {
    path:'notes/edit/:id',component:EditnotesComponent,canActivate:[LoginGuard] 
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
