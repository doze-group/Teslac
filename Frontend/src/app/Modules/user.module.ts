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
import { ProjectComponent } from '../Components/project/project.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../Services/local-storage.service';
import { TaskComponent } from '../Components/task/task.component';
import { ConfigProjectComponent } from '../Components/config-project/config-project.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    ListconversationsComponent,
    ListusersComponent,
    ChatComponent,
    ProjectComponent,
    TaskComponent,
    ConfigProjectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AuthModule,
    DragAndDropModule,
    SocketIoModule.forRoot({ options: {}, url: environment.apiUrl })
  ],
  providers: [ProjectService, GroupService, UserService, ChatService, LocalStorageService]
})
export class UserModule { }
