import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tank} from "../models/Tank";
import {Observable} from "rxjs";
import {Net} from "../models/Net";
import {environment} from "../models/environment";

@Injectable({
  providedIn: 'root'
})
export class TankService {

  public tank: Tank;
  public tanks: Tank[];
  public nets: Net[];
  public net: Net;

  constructor(private http: HttpClient) {
    this.tank = new Tank();
    this.tanks = [];
    this.net = new Net();
    this.nets = [];
  }

  public getAll(): Observable<Tank[]>{
    return this.http.get<Tank[]>(environment.api_url+'/tanks');
  }

  public getByID(id: number): Observable<Tank>{
    return this.http.get<Tank>(`${environment.api_url}/tanks/${id}`);
  }

  public getBySite(id: number): Observable<Tank[]>{
    return this.http.get<Tank[]>(`${environment.api_url}/tanks/sites/${id}`);
  }

  public create(): Observable<any> {
    return this.http.post<any>(environment.api_url+'/tanks', this.tank);
  }

  public update(id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/tanks/${id}`, this.tank);
  }

  public getByNetByTankID(id: number): Observable<Net[]>{
    return this.http.get<Net[]>(`${environment.api_url}/tanks/net/${id}`);
  }

  public getAllNets(): Observable<Net[]>{
    return this.http.get<Net[]>(`${environment.api_url}/tanks/nets/all`);
  }

  public delete(id: number[]): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/tanks/all?ids=${JSON.stringify(id)}`);
  }

  public createNet(): Observable<any> {
    return this.http.post<any>(environment.api_url+'/tanks/net', this.net);
  }

  public updateNet(id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/tanks/net/${id}`, this.net);
  }

  public deleteNet(id: number[]): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/tanks/net/all?ids=${JSON.stringify(id)}`);
  }

}
