import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';
import { SecureInterface } from '../Models/secure-interface';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService<T> {

  constructor() { }

  InterfaceType: SecureInterface<T> = {
    Hash: (Key) => CryptoJS.SHA256(Key, '').toString(),
    Decrypt: (Data) => CryptoJS.AES.decrypt(Data, '').toString(CryptoJS.enc.Utf8),
    Encrypt: (Data) => CryptoJS.AES.encrypt(Data, '').toString(CryptoJS.enc.Utf8)
  };

  private LocalStorge = new SecureStorage(localStorage, this.InterfaceType);

  getStorage() { return this.LocalStorge; }

}
