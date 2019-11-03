import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { Subject, BehaviorSubject } from 'rxjs';
import iziToast from 'izitoast';
import { faPlus, faProjectDiagram, faTasks, faTv, faUser, faTimes, faEdit, faEye, faCogs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));
  Project: any = {};
  TaskSelect: any = undefined;
  TableSelect: any = undefined;
  Tables: Subject<Array<any>> = new BehaviorSubject([]);
  Loading: Subject<boolean> = new BehaviorSubject(true);
  Icons: Array<any> = [faProjectDiagram, faTasks, faTv, faPlus, faUser, faTimes, faCogs, faEye];

  constructor(private route: ActivatedRoute, private ProjectService: ProjectService, private routing: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ProjectService.getProjectId(this.User.Token, params.get('id')).toPromise().then(project => {
        if(JSON.stringify(project) === '{}'){
          this.routing.navigate(['/home']);
        }else{
          this.Loading.next(false);
          this.Project = project;
          this.Tables.next(project.Tables);
        }
      }).catch(err => {
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener el projecto'
        })
      })
    }).unsubscribe();
  }

  FilterAssigned(As: String) {
    let fil = this.Project.Members.filter(item => item._id === As);
    return fil.length >= 1 ? fil[0].UrlImage : 'https://image.flaticon.com/icons/svg/660/660611.svg';
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

  deleteTask(task, id) {
    this.questionToast('¿Seguro de eliminar esta tarea?', () => {
      this.ProjectService.deleteTask(this.User.Token, this.Project._id, id, task._id).toPromise().then(project => {
        this.Tables.subscribe(tables => {
          tables.forEach((item, index) => {
            if (id === item._id) {
              item.Tasks = project.Tables[index].Tasks;
              return;
            }
          });
          this.TableSelect = undefined;
        }).unsubscribe();
      }).catch(err => {
        iziToast.error({
          title: 'Error',
          message: 'Ha ocurrido un error'
        });
      });
    })
  }

  deleteTable(id) {
    this.questionToast('¿Seguro de eliminar este tablero?', () => {
      this.ProjectService.deleteTable(this.User.Token, this.Project._id, id).toPromise().then(project => {
        this.Tables.subscribe(tables => {
          tables.forEach((item, index) => {
            if (id === item._id) {
              tables.splice(index, 1);
              return;
            }
          });
          this.TableSelect = undefined;
        }).unsubscribe();
      }).catch(err => {
        iziToast.error({
          title: 'Error',
          message: 'Ha ocurrido un error'
        });
      });
    });
  }

  deleteProject(){
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

}
