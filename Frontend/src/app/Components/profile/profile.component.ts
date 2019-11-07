import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faHeading, faCommentDots, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/Services/project.service';
import iziToast from 'izitoast';
import { Subject, BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/Models/project';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  Icons: Array<any> = [faProjectDiagram, faHeading, faCommentDots, faPlus, faUpload];
  FormControl: FormGroup = new Project().FormProject();
  Loading: boolean = false;
  Submited: boolean = false;
  Projects: Subject<Array<any>> = new BehaviorSubject([]);
  User: Subject<{ User: any, Token: String }> = new BehaviorSubject(JSON.parse(localStorage.getItem('User')));

  constructor(private ProjectService: ProjectService, private UserService: UserService) { }

  ngOnInit() {
    this.User.subscribe(user => {
      this.ProjectService.getProjects(user.Token).toPromise().then(observer => {
        this.Projects.next(observer);
      });
    }).unsubscribe();
  }

  UploadImage(event) {
    if(event.target.files[0] !== undefined){
      this.User.subscribe(user => {
        this.UserService.uploadImage(user.Token, event.target.files[0]).subscribe(newUser => {
          localStorage.setItem('User', JSON.stringify({User: newUser, Token: user.Token})); 
          this.User.next({User: newUser, Token: user.Token});
        });
      }, err => {
        iziToast.error({
          message: 'Error imagen no aceptada'
        });
      }).unsubscribe();
    }
  }

  onSubmit() {
    this.Submited = true;
    if (this.FormControl.valid) {
      this.User.subscribe(user => {
        this.ProjectService.createProject(user.Token, this.FormControl.value).subscribe(observer => {
          this.Projects.subscribe(projects => {
            projects.push(observer);
          }).unsubscribe();
        });
      }).unsubscribe();
    }
  }

}
