import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Guards/authguard.service';
import { AuthService } from '../Services/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: '../Components/login/login.module#LoginModule' },
  { path: 'signup', loadChildren: '../Components/sign-up/sign-up.module#SignUpModule' },
  { path: 'profile', loadChildren: '../Components/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'project/:id', loadChildren: '../Components/project/project.module#ProjectModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: '../Components/home/home.module#HomeModule', canActivate: [AuthGuard] },
  //{ path: 'project/:id/settings', component: ConfigProjectComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
