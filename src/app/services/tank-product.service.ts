import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TankProduct} from "../models/TankProduct";
import {Observable} from "rxjs";
import {environment} from "../models/environment";

@Injectable({
  providedIn: 'root'
})
export class TankProductService {

  public tankProduct: TankProduct;
  public tankProducts: TankProduct[];

  constructor(public http: HttpClient) {
    this.tankProduct = new TankProduct();
    this.tankProducts = [];
  }

  public getAll(): Observable<TankProduct[]>{
    return this.http.get<TankProduct[]>(environment.api_url+'/tank_products');
  }

  public getByID(id: number): Observable<TankProduct>{
    return this.http.get<TankProduct>(`${environment.api_url}/tank_products/${id}"`);
  }

  public create(): Observable<any> {
    return this.http.post<any>(environment.api_url+'/tank_products', this.tankProduct);
  }

  public update(id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/tank_products/${id}`, this.tankProduct);
  }

  public delete(ids: number[]): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/tank_products/all?ids=${JSON.stringify(ids)}`);
  }
}
