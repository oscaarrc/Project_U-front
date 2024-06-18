import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

const routes: Routes = [
  {path:"users", component:DashboardComponent},
  {path:"login", component:LoginComponent},
  {path:"createUser", component:CreateUserComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '404', component:NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
