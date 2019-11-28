import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { ProjectService } from 'src/app/Services/project.service';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ],
  providers: [UserService, ProjectService]
})
export class ProfileModule { }
