import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {StorageService} from "../../../services/storage.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  constructor(private router: Router, public userService: UserService, public storageService: StorageService) {}
  public login(email: string, password: string) {
    let credentials = {email: email, password: password}
    this.userService.login(credentials).pipe(first())
      .subscribe(
        async data => {
          await this.router.navigate(['home'], { replaceUrl: true });
        },
        error => {
          // this.error = error;
          // this.loading = false;
        });
  }

  ngOnInit(): void {
  }

}
