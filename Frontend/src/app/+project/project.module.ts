import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProjectComponent, pathMatch: 'full', data: { title: 'Teslac :: Project' } }
    ])
  ],
  declarations: [
    ProjectComponent,
    MessageComponent
  ]
})
export class ProjectModule { }
