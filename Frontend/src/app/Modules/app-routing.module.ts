import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { SignUpComponent } from '../Components/sign-up/sign-up.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { HomeComponent } from '../Components/home/home.component';
import { AuthGuard } from '../Guards/authguard.service';
import { AuthService } from '../Services/auth.service';
import { ProjectComponent } from '../Components/project/project.component';
import { ConfigProjectComponent } from '../Components/config-project/config-project.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teslac',
    pathMatch: 'full'
  },
  { path: 'teslac/login', loadChildren: '../Components/login/login.module#LoginModule' },
  { path: 'teslac/signup', loadChildren: '../Components/sign-up/sign-up.module#SignUpModule' },
  { path: 'teslac/profile', loadChildren: '../Components/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'teslac/project/:id', loadChildren: '../Components/project/project.module#ProjectModule', canActivate: [AuthGuard] },
  { path: 'teslac', loadChildren: '../Components/home/home.module#HomeModule', canActivate: [AuthGuard] },
  //{ path: 'teslac/project/:id/settings', component: ConfigProjectComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
