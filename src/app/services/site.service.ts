import { Injectable } from '@angular/core';
import {Site} from "../models/Site";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../models/environment";

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  site: Site;
  sites: Site[];

  constructor(private http: HttpClient) {
    this.site = new Site();
    this.sites = [];
  }

  public getAll(): Observable<Site[]>{
    return this.http.get<Site[]>(environment.api_url+'/sites');
  }

  public getByID(id: number): Observable<Site>{
    return this.http.get<Site>(`${environment.api_url}/sites/${id}`);
  }

  public getSiteByID(id: number): Observable<Site>{
    return this.http.get<Site>(`${environment.api_url}/sites/tank/${id}`);
  }

  public create(): Observable<any> {
    return this.http.post<any>(environment.api_url+'/sites', this.site);
  }

  public update(id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/sites/${id}`, this.site);
  }

  public delete(id: number[]): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/sites/many?ids=${JSON.stringify(id)}`);
  }

}
