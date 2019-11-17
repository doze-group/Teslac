import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import CryptoJS from 'crypto-js/';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  getStorage(): User {
    const User = localStorage.getItem('User');
    if (User === null) return undefined;
    try {
      return JSON.parse(CryptoJS.AES.decrypt(User, environment.Encrypt).toString(CryptoJS.enc.Utf8)) as User;
    } catch (error) {
      return undefined
    }
  }

  setItem(User: User) {
    try {
      const UserEncrypt = CryptoJS.AES.encrypt(JSON.stringify(User), environment.Encrypt);
      localStorage.setItem('User', UserEncrypt);
    } catch (error) {

    }
  }

}
