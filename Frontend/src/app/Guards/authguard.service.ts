import { AuthService } from '../Services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../Services/local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router, private _localstorage: LocalStorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const User = this._localstorage.getStorage();
    if (User !== null) {
      if(localStorage.getItem('Moment')){
        return of(true);
      }else{
        return this._authService.isAuthenticated(User.Token).pipe(
          map(user => {
            if(user){
              this._localstorage.setItem({...user, Token: User.Token});
              localStorage.setItem('Moment', new Date().toJSON());
              return true;
            }
            else {
              localStorage.clear();
              return false;
            }
          }),
          catchError(err => {
            localStorage.clear();
            return of(false);
          })
        );
      }
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return of(false);
  }

}
