import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FFQItemResponse} from '../../models/ffqitem-response';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FFQItemCalcRequest} from '../../models/ffqitem-calc-request';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { FFQFoodItemResponse } from 'src/app/models/ffqfooditem-response';
import { FFQFoodItem } from 'src/app/models/ffqfooditem'
import { environment } from 'src/environments/environment';
//const mongoose = require('mongoose');
//declare var require: any
//Modified by Daykel Muro and Dariana Gonzalez on 10/5/2019

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})



export class FoodItemService {

  endpoint = environment.foodServiceUrl + '/ffq';


  constructor(private http: HttpClient) { }

  addFoodNutrients(fooditem : FFQFoodNutrientsResponse): Observable<any> {

    return this.http.post(this.endpoint + '/createfoodnutrients', fooditem, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      ));
  }

  updateFoodNutrients(fooditem : FFQFoodNutrientsResponse): Observable<any> {

    return this.http.put(this.endpoint + '/updatefoodnutrients', fooditem, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      ));
  }

  updateItemPosition(fooditem : FFQFoodItem): Observable<any> {
    return this.http.put(this.endpoint + '/update', fooditem, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
          tap(
            data => console.log(data),
            error => console.log(error)
          ));
  }

  /* Return a specific food item (by object id) and its list of nutrients*/
  getFoodbyName(objectId: string): Observable<FFQFoodNutrientsResponse> {
    return this.http.get(this.endpoint + '/foodnutrients/' + objectId).pipe(
      map(((item: any) => {
          return new FFQFoodNutrientsResponse(
            item.foodItem,
            item.nutrientList
          );
        })));
  }

  // created by Dariana Gonzalez
  getAllFoods(): Observable<FFQFoodItemResponse[]> {
   // getMongoUsers();
    return this.http.get(this.endpoint + '/allfoodsnutrients').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQFoodItemResponse(
            item.name,
            item.id,
            item.itemPosition
          );
        });
    }));
  }

  getFoodItems(): Observable<FFQItemResponse[]> {
    return this.http.get(this.endpoint + '/fooditems').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQItemResponse(
            item.name,
            item.primary,
            item.servingsList,
            item.foodTypes,
            item.sugar,
            item.itemPosition
          );
        });
      }));
  }

  calculateNutrientBreakdown(userId:string, id:string, infantage:number, items: FFQItemCalcRequest[]): Observable<any> {
    return this.http.post(`${this.endpoint}/calculate/` + id +`/`+ infantage +`/`+ userId, items).pipe(map(data => {
        return data;
      }
    ));
  }

  /*DELETE: delete food item from the database */
  deleteItem(objectId: string): Observable <any>{
    console.log("here" + objectId);
    return this.http.delete(this.endpoint + "/delete?id=" + objectId,  { responseType: 'text' })
  }



}



