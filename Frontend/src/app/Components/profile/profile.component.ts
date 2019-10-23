import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faHeading, faCommentDots, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/Services/project.service';
import iziToast from 'izitoast';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
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
  Projects: Subject<Array<any>> = new BehaviorSubject([]);
  ArrayProject: Array<any>;
  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));

  constructor(private ProjectService: ProjectService) { }

  ngOnInit() {
    this.ProjectService.getProjects(this.User.Token).toPromise().then(observer => {
      this.ArrayProject = observer;
      this.Projects.next(observer);
    });
  }

  onSubmit() {
    this.Submited = true;
    if (this.FormControl.valid) {
      this.ProjectService.createProject(this.User.Token, this.FormControl.value).subscribe(observer => {
        this.ArrayProject.push(observer);
        this.Projects.next(this.ArrayProject);
      });
    }
  }

}
