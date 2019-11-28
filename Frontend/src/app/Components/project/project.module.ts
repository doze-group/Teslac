import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { TaskComponent } from '../task/task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectService } from 'src/app/Services/project.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { DragAndDropModule } from 'angular-draggable-droppable';


@NgModule({
  declarations: [
    ProjectComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DragAndDropModule
  ],
  providers: [ProjectService, LocalStorageService]
})
export class ProjectModule { }
