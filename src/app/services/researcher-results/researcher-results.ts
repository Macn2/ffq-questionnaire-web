import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { FFQResearchResultsResponse } from 'src/app/models/ffqresearchresultsresponse';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable({
    providedIn: 'root'
  })
  
  export class ResearchResultsService {
  
    endpoint = environment.foodServiceUrl + '/ffq/research_results'; 
  
    constructor(private http: HttpClient) { }
  
    getAllResults(): Observable<FFQResearchResultsResponse[]> {
      return this.http.get(this.endpoint + '/all').pipe(
        map((res: any) => {
          return res.map(item => {
            return new FFQResearchResultsResponse(
              item.questionnaireId,
              item.participantUserId,
              item.participantName,
              item.feedback,
              item.ageInMonths,
              item.gender,
              item.creationDate,
              item.userChoices,
              item.weeklyTotals,
              item.dailyAverages         
            );
          });
        }));
      }
  
      getResultsByUser(userId: string): Observable<FFQResearchResultsResponse[]> {
        return this.http.get(this.endpoint + '/participant/' + userId).pipe(
          map((res: any) => {
            return res.map(item => {
              return new FFQResearchResultsResponse(
                item.questionnaireId,
                item.participantUserId,
                item.participantName,
                item.feedback,
                item.ageInMonths,
                item.gender,
                item.creationDate,
                item.userChoices,
                item.weeklyTotals,
                item.dailyAverages
              );
            });
          }));
        }
  
        submitFeedback(id: string, feedback: string): Observable<any> {
          return this.http.put(this.endpoint + '/update', {
            questionnaireId: id,
            feedback: feedback
          });
        }
    }
  