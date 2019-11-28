import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ChatComponent } from '../chat/chat.component';
import { ListusersComponent } from '../listusers/listusers.component';
import { ListconversationsComponent } from '../listconversations/listconversations.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.prod';
import { ChatService } from 'src/app/Services/chat.service';
import { UserService } from 'src/app/Services/user.service';
import { ConversationService } from 'src/app/Services/conversation.service';
import { GroupService } from 'src/app/Services/group.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    HomeComponent,
    ChatComponent,
    ListusersComponent,
    ListconversationsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot({ options: {}, url: environment.apiUrl })
  ],
  providers: [ChatService, UserService, ConversationService, GroupService]
})
export class HomeModule { }
