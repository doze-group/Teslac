import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { Subject, BehaviorSubject } from 'rxjs';
import iziToast from 'izitoast';
import { faPlus, faProjectDiagram, faTasks, faTv } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));
  Project: any = {};
  TaskSelect: any = {};
  Tables: Subject<Array<any>> = new BehaviorSubject([]);
  Loading: Subject<boolean> = new BehaviorSubject(true);
  Icons: Array<any> = [faProjectDiagram, faTasks, faTv, faPlus];

  constructor(private route: ActivatedRoute, private ProjectService: ProjectService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ProjectService.getProjectId(this.User.Token, params.get('id')).toPromise().then(project => {
        this.Loading.next(false);
        this.Project = project;
        this.Tables.next(project.Tables);
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
    return fil.length >= 1 ? fil[0].UrlImage : 'https://image.flaticon.com/icons/svg/1692/1692461.svg';
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

}
