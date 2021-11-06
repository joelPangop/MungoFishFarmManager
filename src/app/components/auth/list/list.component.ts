import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {UserInfo} from "../../../models/UserInfo";
import {User} from "../../../models/User";
import {Address} from "../../../models/Address";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadUsers();
    // this.loadUserInfos();
    // this.loadAllAddresses();
    this.loadAllTelephones();
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe((res) => {
      this.userService.users = res;
    })
  }

  // loadUserInfos(){
  //   this.userService.getAllUserInfos().subscribe((res) => {
  //     this.userService.userInfos = res;
  //   })
  // }

  // loadAllAddresses(){
  //   this.userService.getAllAddresses().subscribe((res) => {
  //     this.userService.addresses = res;
  //   })
  // }

  loadAllTelephones(){
    this.userService.getAllTelephones().subscribe((res) => {
      this.userService.telephones = res;
    })
  }

  // @ts-ignore
  getUserInfo(user: User): UserInfo {
      let res = new UserInfo();
      for (let usr of this.userService.userInfos) {
        if (usr.id === user.userInfoID) {
          res = usr;
        }
      }
      return res;
  }

  goToAdd() {
    this.userService.address = new Address();
    this.router.navigate(['register'], {replaceUrl: true});
  }

  goToEdit(user: User){
    this.router.navigate(['/register'], {queryParams: {user: JSON.stringify(user), skipLocationChange: true, replaceUrl: false}});
  }

  getUserToString(user: User) {
    return JSON.stringify(user);
  }
}
