import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../Components/home/home.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth.module';
import { ProjectService } from '../Services/project.service';
import { ListconversationsComponent } from '../Components/listconversations/listconversations.component';
import { ListusersComponent } from '../Components/listusers/listusers.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    ListconversationsComponent,
    ListusersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [ProjectService]
})
export class UserModule { }
