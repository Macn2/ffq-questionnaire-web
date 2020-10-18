import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { environment } from 'src/environments/environment';


const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})



export class ClinicService {

  endpoint = environment.userServiceUrl + '/ffq/clinics';
  

  constructor(private http: HttpClient) { } 

  addClinic(user : FFQClinicResponse): Observable<any> {
    
    return this.http.post(this.endpoint + '/createclinic', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  updateClinic(user : FFQClinicResponse): Observable<any> {
    
    return this.http.put(this.endpoint + '/updateclinic', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }


  getClinic(clinicId: string): Observable<FFQClinicResponse> {
    return this.http.get(this.endpoint + '/' + clinicId).pipe(
      map((item: any) => {
          return new FFQClinicResponse(
            item.clinicId,
            item.address,
            item.dateBuilt,
            item.clinicname,
            item.headclinician,
            item.isactive
          );
      })
    );
  }


  getAllClinics(): Observable<FFQClinicResponse[]> {
    return this.http.get(this.endpoint + '/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQClinicResponse(
            item.clinicId,
            item.address,
            item.datebuilt,
            item.clinicname,
            item.headclinician,
            item.isactive
          );
        });
      })
    );
  }

  /*DELETE: delete food item from the database */
  deleteItem(clinicId: string): Observable <any>{
    console.log("here" + clinicId);
    return this.http.delete(this.endpoint + "/delete?clinicId=" + clinicId,  { responseType: 'text' })  
  }


}




