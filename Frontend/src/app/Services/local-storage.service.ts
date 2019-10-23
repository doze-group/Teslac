import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService<T> {

  constructor() { }

  getStorage() { return localStorage.getItem('User'); }

}
