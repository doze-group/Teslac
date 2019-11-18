import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faHeading, faCommentDots, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/Services/project.service';
import iziToast from 'izitoast';
import { Subject, BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/Models/project';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { Forms } from 'src/app/Models/forms';
import { User } from 'src/app/Models/user';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  Icons: Array<any> = [faProjectDiagram, faHeading, faCommentDots, faPlus, faUpload];
  FormControl: FormGroup = new Forms().FormProject();
  Loading: boolean = false;
  Submited: boolean = false;
  Projects: Subject<Array<Project>> = new BehaviorSubject([]);
  LoadingProject: Subject<boolean> = new BehaviorSubject(false);
  User: Subject<User> = new BehaviorSubject(new User('', '', '', '', '', ''));

  constructor(private ProjectService: ProjectService, private UserService: UserService, private _localStorage: LocalStorageService) { 
    this.User.next(this._localStorage.getStorage());
  }

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
          this._localStorage.setItem({...newUser, Token: user.Token});
          this.User.next({...newUser, Token: user.Token});
        });
      }, err => {
        iziToast.error({
          message: 'Error imagen no aceptada'
        });
      }).unsubscribe();
    }
  }

  async onSubmit() {
    this.Submited = true;
    this.LoadingProject.next(true);
    if (this.FormControl.valid) {
      await this.User.subscribe(user => {
        this.ProjectService.createProject(user.Token, this.FormControl.value).subscribe(observer => {
          this.Projects.subscribe(projects => {
            projects.push(observer);
          }).unsubscribe();
        }, (err: HttpErrorResponse) => {
          if(err.status === 406){
            iziToast.error({message: 'Error en la entrada de datos'});
          }else{
            iziToast.error({message: 'Ha ocurrido un error vuelva a intentar'});
          }
        });
      }).unsubscribe();
    }
    this.LoadingProject.next(false);
  }

}
