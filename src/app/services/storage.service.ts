import {Injectable} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  user: User;

  constructor(protected localStorage: LocalStorage) {
    this.user = new User();
  }

  async setString(key: string, value: string) {
    return this.localStorage.setItem(key, value).subscribe(() => {
      // Done
    }, () => {
      // Error
    });
  }

  async remove(key: string) {
    this.localStorage.removeItem(key).subscribe(() => {
    }, () => {
    });
  }

  async removeAll() {
    this.localStorage.clear().subscribe(() => {
    }, () => {
    });
  }

   getString(key: string): Observable<any> {
    return this.localStorage.getItem<any>(key);
  }

}
