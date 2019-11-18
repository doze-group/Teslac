import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { Subject, BehaviorSubject } from 'rxjs';
import iziToast from 'izitoast';
import { faPlus, faProjectDiagram, faTasks, faTv, faUser, faTimes, faEdit, faEye, faCogs } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/Models/user';
import { Project } from 'src/app/Models/project';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  User: User;
  Project: Project;
  TaskSelect: any = undefined;
  TableSelect: any = undefined;
  Tables: Subject<Array<Table>> = new BehaviorSubject([]);
  Loading: Subject<boolean> = new BehaviorSubject(true);
  Icons: Array<any> = [faProjectDiagram, faTasks, faTv, faPlus, faUser, faTimes, faCogs, faEye];

  constructor(private route: ActivatedRoute, private ProjectService: ProjectService, private routing: Router, private _localStorage: LocalStorageService) {
    this.User = this._localStorage.getStorage();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ProjectService.getProjectId(this.User.Token, params.get('id')).subscribe(project => {
        if (JSON.stringify(project) === '{}') {
          this.routing.navigate(['/home']);
        } else {
          this.Loading.next(false);
          this.Project = project;
          this.Tables.next(project.Tables);
        }
      }, err => {
        iziToast.error({
          message: 'Error al obtener el projecto'
        });
      });
    }).unsubscribe();
  }

  DropEnd(Table, index) {
    if (Table !== undefined && this.TaskSelect !== undefined && Table.Tasks.filter(item => item._id === this.TaskSelect._id).length <= 0) {
      this.Tables.subscribe(tables => {
        tables.map((item, index) => {
          tables[index].Tasks = item.Tasks.filter(task => task._id !== this.TaskSelect._id);
        });
        tables[index].Tasks.push(this.TaskSelect);
        this.TaskSelect = undefined;
        this.ProjectService.modifyProject(this.User.Token, { 'Tables': tables }, this.Project._id).toPromise().then(project => {
          this.Project = project;
        }).catch(err => {
          iziToast.error({
            title: 'Error',
            message: 'Ha ocurrido un error'
          });
        });
      }).unsubscribe();
    }
  }

  createTable() {
    if ((document.getElementById('TitleTable') as any).value !== undefined && (document.getElementById('TitleTable') as any).value !== '') {
      this.ProjectService.createTable(this.User.Token, { 'Title': (document.getElementById('TitleTable') as any).value }, this.Project._id).toPromise().then(project => {
        this.Project = project;
        this.Tables.subscribe(tables => {
          tables.push(project.Tables[tables.length]);
        }).unsubscribe();
        (document.getElementById('TitleTable') as any).value = '';
      }).catch(err => {
        iziToast.error({
          title: 'Error',
          message: 'Ha ocurrido un error'
        });
      });
    }
  }

  createTask() {
    if (this.TableSelect !== undefined && (document.getElementById('TitleTask') as any).value !== '' && (document.getElementById('Assigned') as any).value !== '') {
      this.ProjectService.createTask(this.User.Token, {
        'Task': (document.getElementById('TitleTask') as any).value,
        'Assigned': (document.getElementById('Assigned') as any).value
      }, this.Project._id, this.TableSelect._id).toPromise().then(project => {
        this.Tables.subscribe(tables => {
          tables.forEach((item, index) => {
            if (this.TableSelect._id === item._id) {
              item.Tasks = project.Tables[index].Tasks;
              return;
            }
          });
          this.TableSelect = undefined;
        }).unsubscribe();
        (document.getElementById('TitleTask') as any).value = '';
      }).catch(err => {
        iziToast.error({
          title: 'Error',
          message: 'Ha ocurrido un error'
        });
      });
    }
  }

  deleteTable(id) {
    this.questionToast('¿Seguro de eliminar este tablero?', () => {
      this.ProjectService.deleteTable(this.User.Token, this.Project._id, id).subscribe(project => {
        this.Tables.subscribe(tables => {
          tables.forEach((item, index) => {
            if (id === item._id) {
              tables.splice(index, 1);
              return;
            }
          });
          this.TableSelect = undefined;
        }).unsubscribe();
      }, err => {
        iziToast.error({
          message: 'Ha ocurrido un error vuelva a intentar'
        });
      });
    });
  }

  deleteProject() {
    this.questionToast('¿Seguro de eliminar este projecto?', () => {
      this.ProjectService.deleteProject(this.User.Token, this.Project._id).toPromise().then(project => {
        this.routing.navigate(['/home']);
      }).catch(err => {
        iziToast.error({
          title: 'Error',
          message: 'Ha ocurrido un error'
        });
      });
    });
  }

  questionToast(Msg: string, Ok: Function) {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      id: 'question',
      zindex: 999,
      title: 'Hey',
      message: Msg,
      position: 'center',
      buttons: [
        ['<button><b>Si</b></button>', (instance, toast) => {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          Ok();
        }, true],
        ['<button><b>No</b></button>', function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }, true],
      ],
    });
  }

  endDeleteTask(event) {
    this.Tables.subscribe(tables => {
      tables.forEach((item, index) => {
        if (event._idTable === item._id) {
          item.Tasks = event.Project.Tables[index].Tasks;
          return;
        }
      });
      this.TaskSelect = undefined;
    });
  }

}
