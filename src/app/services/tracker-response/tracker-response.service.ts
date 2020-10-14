import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackerResultsResponse } from 'src/app/models/trackerresultsresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackerResponseService {

  endpoint = environment.foodServiceUrl + '/ffq';

  constructor(private http: HttpClient) { }

  submitTracker(results: TrackerResultsResponse): Observable<any> {
    return this.http.post(this.endpoint + '/tracker', results);
  }

}
