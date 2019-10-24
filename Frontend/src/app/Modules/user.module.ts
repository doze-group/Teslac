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
import { GroupService } from '../Services/group.service';
import { UserService } from '../Services/user.service';
import { ChatComponent } from '../Components/chat/chat.component';
import { SocketIoModule } from 'ngx-socket-io';
import { ChatService } from '../Services/chat.service';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    ListconversationsComponent,
    ListusersComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AuthModule,
    SocketIoModule.forRoot({ options: {}, url: '//localhost:3000' })
  ],
  providers: [ProjectService, GroupService, UserService, ChatService]
})
export class UserModule { }
