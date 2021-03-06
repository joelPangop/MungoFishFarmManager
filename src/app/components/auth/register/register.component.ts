import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInfo} from "../../../models/UserInfo";
import {Telephone} from "../../../models/Telephone";
import {Address} from "../../../models/Address";
import {CategoryTelephone} from "../../../models/CategoryTelephone";
// @ts-ignore
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/User";
import {DialogComponent} from "../../dialog/dialog.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  userInfos: UserInfo;
  user: User;
  address: Address;
  public telephones: Telephone[];
  checked: boolean | undefined;
  options: any;
  formSubmitted = false;
  genders = ["Male", "Female"];
  telForm: FormGroup = new FormGroup({});
  loadingObserver!: BehaviorSubject<boolean>;
  public supervisors: User[];

  constructor(public userService: UserService, private cd: ChangeDetectorRef, public dialog: MatDialog, private router: Router,
              private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {

    this.userInfos = new UserInfo();
    this.address = new Address();
    this.user = new User();
    this.telephones = [];
    this.supervisors = [];

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)]),
      username: new FormControl(userService.currentUserValue.userName, Validators.required),
      firstName: new FormControl(),
      lastName: new FormControl(),
      gender: new FormControl(),
      birthday: new FormControl(),
      addr_1: new FormControl(),
      addr_2: new FormControl(),
      appart_num: new FormControl(),
      town: new FormControl(),
      country: new FormControl(),
      region: new FormControl(),
      postal_code: new FormControl(),
      telForm: this.formBuilder.group({
        phone_number: new FormControl('', Validators.required),
        phone_category: new FormControl('', Validators.required)
      }),
    }, this.passwordConfirming);
  }

  // @ts-ignore
  passwordConfirming(c: AbstractControl): { passwordMismatch: boolean } {
    if (c.value.password !== c.value.confirmPassword) {
      return {passwordMismatch: true};
    }
  }

  ngOnInit(): void {
    this.options = Object.values(CategoryTelephone);
    const param = this.activatedRoute.snapshot.queryParams.user;
    if (param) {
      this.user = JSON.parse(param as string);
      if (this.user) {
        this.loadUserInfos(this.user.userInfoID);
      } else {
        this.user = new User();
      }
    }

    this.loadAllAddresses();
    this.loadAllTelephones();
    this.loadAllRoles();
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  openDialog(status: string, message: string, mode: string, type?: string, nb?: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {loading: this.loadingObserver, status: status, message: message, mode, nb, type}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  removeControl(i: number) {
    // @ts-ignore
    this.userService.deleteTelephone(this.telephones[i].id).subscribe((res) => {
      if (res.status == "Success") {
        this.telephones.splice(i, 1);
      }
    })
  }

  loadUserInfos(id: number | undefined) {
    this.userService.getUserInfosByID(id).subscribe((res) => {
      if (res) {
        this.userInfos = res;
      }
    })
  }

  loadAllRoles() {
    this.userService.getAllRoles().subscribe((res) => {
      this.userService.roles = res;
    })
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.userService.users = res;
      for (let usr of this.userService.users) {
        if (usr.roleID === 1 || usr.roleID === 2)
          this.supervisors.push(usr);
      }
    })
  }

  loadAllAddresses() {
    this.userService.getAllAddresses().subscribe((res) => {
      for (let address of res) {
        if (address.userInfosID === this.user.userInfoID) {
          this.address = address;
        }
      }
    })
  }

  loadAllTelephones() {
    this.userService.getAllTelephones().subscribe((res) => {
      for (let telephone of res) {
        if (telephone.userInfosID === this.user.userInfoID) {
          this.telephones.push(telephone);
        }
      }
    })
  }

  addTelephone(registerForm: any) {
    this.telephones.push(new Telephone());
    if (this.telephones.length > 0) {
      if (this.telephones[this.telephones.length - 1].telephone_number !== '') {
        this.telephones.push(new Telephone());
        console.log(this.telephones);
      }
      console.log(this.telephones);
    } else {
      this.telephones = [];
      this.telephones.push(new Telephone());
    }
    console.log(this.telephones);
    this.cd.detectChanges();
  }

  async save() {
    this.loadingObserver = new BehaviorSubject<boolean>(true);
    await this.openDialog("", "", "indeterminate");
    this.formSubmitted = true;

    const credentials = {
      user: this.user,
      userInfos: this.userInfos,
      address: this.address,
      telephones: this.telephones,
      username: this.userService.currentUserValue.userName
    }
    if (!this.user.id) {
      this.user.password = "Abc123...";
      this.userService.register(credentials).subscribe(async (res) => {
        if (res.status === 'Success') {
          this.dialog.closeAll();
          this.loadingObserver = new BehaviorSubject<boolean>(false);
          await this.openDialog(res.status, res.message, "indeterminate", "result");
          await this.router.navigate(['user_list'], {replaceUrl: true});
        }
      })
    } else {
      this.userService.update(credentials, this.user.id).subscribe(async (res) => {
        if (res.result === 'Success') {
          this.dialog.closeAll();
          this.loadingObserver = new BehaviorSubject<boolean>(false);
          console.log(res);
          await this.openDialog(res.status, res.message, "indeterminate", "result");
          // await this.router.navigate(['user_list'], {replaceUrl: true});
        }
      })
    }
    // }
  }

  set isDisabled(value: boolean) {
    if (this.userService.isSuperAdmin()) {
      this.registerForm.controls['email'].disable();
    } else {
      this.registerForm.controls['email'].enable();
    }
  }

  toggle_password(ev: any) {
    this.checked = !this.checked;
  }
}
