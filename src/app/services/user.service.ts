import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "../models/auth-response";
import {environment} from "../models/environment";
import {catchError, map, tap} from "rxjs/operators";
import {User} from "../models/User";
import {UserInfo} from "../models/UserInfo";
import {Address} from "../models/Address";
import {Telephone} from "../models/Telephone";
import {Role} from "../models/Role";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;
  public users: User[];
  private currentUserSubject: BehaviorSubject<User>;
  public userInfos: UserInfo[];
  public addresses: Address[];
  public address: Address;
  public telephones: Telephone[];
  public userInfo: UserInfo;
  public roles: Role[];

  constructor(private http: HttpClient) {
    const storageUser = JSON.parse(<string>localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<User>(storageUser === null ? new User() : storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
    this.address = new Address();
    this.users = [];
    this.roles = [];
    this.userInfos = [];
    this.addresses = [];
    this.telephones = [];
    this.userInfo = new UserInfo();
    this.telephones = [];
    this.telephones = [];
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users/login`, credentials) .pipe(map(res => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(res.user));
      this.currentUserSubject.next(res.user);
      return res.user;
    }),
      catchError(e => {
        // this.showAlert(e.error.msg);
        throw new Error(e);
      }));
  }

  register(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users/register`, credentials).pipe(
      tap(async (res) => {
        console.log(res);
      }),
      catchError(e => {
        // this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  isSuperAdmin(): boolean{
    return this.currentUserValue.roleID === 1;
  }

  isAdmin(): boolean{
    return this.currentUserValue.roleID === 2;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  update(credentials: any, id: number | undefined): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/users/update/${id}`, credentials);
  }

  getUserByID(id: number): Observable<User>{
    return this.http.get<User>(`${environment.api_url}/users/${id}`);
  }

  getUserInfosByID(id: number | undefined): Observable<UserInfo>{
    return this.http.get<UserInfo>(`${environment.api_url}/users/userinfos/${id}`);
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.api_url}/users`);
  }

  getAllUserInfos(): Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${environment.api_url}/users/userinfos`);
  }

  getAllAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(`${environment.api_url}/users/address`);
  }

  getAllTelephones(): Observable<Telephone[]>{
    return this.http.get<Telephone[]>(`${environment.api_url}/users/telephone`);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.api_url}/users/roles`);
  }

  deleteTelephone(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/users/telephone/${id}`)
  }

}
