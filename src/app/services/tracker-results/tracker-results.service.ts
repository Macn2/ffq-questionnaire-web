import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrackerResultsResponse } from 'src/app/models/trackerresultsresponse';

@Injectable({
  providedIn: 'root'
})
export class TrackerResultsService {

  endpoint = 'http://localhost:9090/ffq';

  constructor(private http: HttpClient) { }

  getAllResults(): Observable<TrackerResultsResponse[]> {
    return this.http.get(this.endpoint + '/tracker/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new TrackerResultsResponse(
            item.userId,
            item.age,
            item.date,
            item.responses
          );
        });
      }));
  }

  getResultsByUser(userId: string): Observable<TrackerResultsResponse[]> {
    return this.http.get(this.endpoint + '/tracker/user/' + userId).pipe(
      map((res: any) => {
        return res.map(item => {
          return new TrackerResultsResponse(
            item.userId,
            item.age,
            item.date,
            item.responses
          );
        });
      }));
  }
}
