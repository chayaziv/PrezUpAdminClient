import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { ViewUsersComponent } from '../components/view-users/view-users.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: ViewUsersComponent },
  { path: 'dashboard', component: DashboardComponent },
];
