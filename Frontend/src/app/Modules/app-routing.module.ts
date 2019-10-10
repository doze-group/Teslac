import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { SignUpComponent } from '../Components/sign-up/sign-up.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { HomeComponent } from '../Components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Profile',
    pathMatch: 'full'
  },
  { path: 'Login', component: LoginComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
