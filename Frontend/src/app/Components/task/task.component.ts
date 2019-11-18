import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { User } from 'src/app/Models/user';
import { Project } from 'src/app/Models/project';
import iziToast from 'izitoast';
import { faEye, faTasks, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'Task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  @Input() questionToast: Function;
  @Output() End: EventEmitter<any> = new EventEmitter<any>();
  @Input() User: User;
  @Input() Task: Task;
  @Input() Project: Project;
  @Input() _idTable: String;
  Icons: Array<any> = [faTasks, faEye, faTimes];

  constructor(private ProjectService: ProjectService) { }

  ngOnInit() {
  }

  deleteTask() {
    this.questionToast('¿Seguro de eliminar esta tarea?', () => {
      this.ProjectService.deleteTask(this.User.Token, this.Project._id, this._idTable, this.Task._id).toPromise().then(project => {
        this.End.emit({_idTable: this._idTable, Project: project});
      }).catch(err => {
        console.log(err);
        iziToast.error({
          title: 'Error',
          message: 'Ha ocurrido un error'
        });
      });
    })
  }
  
  FilterAssigned() {
    let fil = this.Project.Members.filter(item => item._id === this.Task.Assigned);
    return fil.length >= 1 ? fil[0].UrlImage : 'https://image.flaticon.com/icons/svg/660/660611.svg';
  }

}
