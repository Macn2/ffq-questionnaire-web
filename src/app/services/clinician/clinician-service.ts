import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { environment } from 'src/environments/environment';

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})



export class ClinicianService {

  endpoint = environment.userServiceUrl + '/ffq/clinicians';


  constructor(private http: HttpClient) { }

  addClinician(user : FFQClinicianResponse): Observable<any> {

    return this.http.post(this.endpoint + '/createclinician', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      ));
  }

  updateClinician(user : FFQClinicianResponse): Observable<any> {

    return this.http.put(this.endpoint + '/updateclinician', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      ));
  }

  getClinician(userId: string): Observable<FFQClinicianResponse> {
    return this.http.get(this.endpoint + '/' + userId).pipe(
      map((item: any) => {
          return new FFQClinicianResponse(
            item.userId,
            item.username,
            item.userpassword,
            item.usertype,
            item.abbreviation,
            item.firstname,
            item.lastname,
            item.assignedclinic,
            item.previousclinics,
            item.isactive
          );
      })
    );
  }


  getAllClinicians(): Observable<FFQClinicianResponse[]> {
    return this.http.get(this.endpoint + '/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQClinicianResponse(
            item.userId,
            item.username,
            item.userpassword,
            item.usertype,
            item.abbreviation,
            item.firstname,
            item.lastname,
            item.assignedclinic,
            item.previousclinics,
            item.isactive
          );
        });
      })
    );
  }

  /*DELETE: delete food item from the database */
  deleteItem(userId: string): Observable <any>{
    console.log("here" + userId);
    return this.http.delete(this.endpoint + "/delete?userId=" + userId,  { responseType: 'text' })
  }
}





