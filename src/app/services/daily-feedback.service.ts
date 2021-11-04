import {Injectable} from '@angular/core';
import {DailyFeedback} from "../models/DailyFeedback";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Tank} from "../models/Tank";
import {TankProduct} from "../models/TankProduct";
import {environment} from "../models/environment";
import {Approbation} from "../models/Approbation";

@Injectable({
  providedIn: 'root'
})
export class DailyFeedbackService {

  public dailyFeedback: DailyFeedback;
  public dailyFeedbacks: DailyFeedback[];
  public approbations: Approbation[];
  public approbation: Approbation;
  public tank: Tank;
  public tankProduct: TankProduct;

  constructor(private http: HttpClient) {
    this.dailyFeedback = new DailyFeedback();
    this.tank = new Tank();
    this.tankProduct = new TankProduct();
    this.dailyFeedbacks = [];
    this.approbations = [];
    this.approbation = new Approbation();
  }

  public getAll(): Observable<DailyFeedback[]>{
    return this.http.get<DailyFeedback[]>(environment.api_url+'/daily_feedback');
  }

  public getByID(id: number): Observable<DailyFeedback[]>{
    return this.http.get<DailyFeedback[]>(`${environment.api_url}/daily_feedback/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post<any>(environment.api_url+'/daily_feedback', {dailyFeedback: this.dailyFeedback, user: user});
  }

  public update(id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/daily_feedback/${id}`, this.dailyFeedback);
  }

  public getTankByID(id: number): Observable<Tank>{
    return this.http.get<Tank>(`${environment.api_url}/daily_feedback/tank/${id}`);
  }

  public delete(ids: number[]): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/daily_feedback/all?ids=${JSON.stringify(ids)}`);
  }

  public getAllApprobations(id: number | undefined): Observable<Approbation[]>{
    return this.http.get<Approbation[]>(`${environment.api_url}/daily_feedback/approbations/${id}`);
  }

  public getByApprobationID(id: number): Observable<Approbation>{
    return this.http.get<Approbation>(`${environment.api_url}/daily_feedback/approbation/one/${id}`);
  }

}
