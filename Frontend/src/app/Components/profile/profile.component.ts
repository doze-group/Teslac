import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faHeading, faCommentDots, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/Services/project.service';
import iziToast from 'izitoast';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import $ from "jquery";
import { Project } from 'src/app/Models/project';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  Icons: Array<any> = [faProjectDiagram, faHeading, faCommentDots, faPlus];
  FormControl: FormGroup = new Project().FormProject();
  Loading: boolean = false;
  Submited: boolean = false;
  Projects: Observable<Array<any>>;
  Sub: Subject<Array<any>> = new Subject();
  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));

  constructor(private ProjectService: ProjectService) { }

  ngOnInit() {
    this.Projects = this.Sub.asObservable();
    this.ProjectService.getProjects(this.User.Token).subscribe(observer => {
      this.Sub.next(observer);
    });
  }

  onSubmit() {
    this.Submited = true;
    if (this.FormControl.valid) {
      this.ProjectService.createProject(this.User.Token, this.FormControl.value).subscribe(observer => {
        let promise = this.Projects;
        promise.toPromise().then(pro => {
          pro.push(observer);
          this.Sub.next(observer);
          this.Projects = this.Sub.asObservable();
        });
      });
    }
  }

}
