import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Router, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {DailyFeedbackComponent} from "../daily-feedback/daily-feedback.component";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit{

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router, private cd: ChangeDetectorRef, public storageService: StorageService, public userService: UserService) {
    this.sidenav = {} as MatSidenav;
  }

  ngOnInit() {
    this.storageService.getString("user").subscribe(async (res) => {
      if(res){
        this.userService.currentUser = res.user;
      }
    })
    this.loadUserInfos();
    this.loadAllAddresses();
    this.loadAllTelephones();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cd.detectChanges();
  }

  loadUserInfos(){
    this.userService.getAllUserInfos().subscribe((res) => {
      this.userService.userInfos = res;
    })
  }

  loadAllAddresses(){
    this.userService.getAllAddresses().subscribe((res) => {
      this.userService.addresses = res;
    })
  }

  loadAllTelephones(){
    this.userService.getAllTelephones().subscribe((res) => {
      this.userService.telephones = res;
    })
  }

  getUserToString(user: any){
    return JSON.stringify(user);
  }

}

