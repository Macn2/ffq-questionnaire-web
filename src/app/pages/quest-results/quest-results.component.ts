import { Component, OnInit } from "@angular/core";
import { ResultsService } from "src/app/services/results/results";
import { FFQResultsResponse } from "src/app/models/ffqresultsresponse";
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { NutrientConstants } from 'src/app/models/NutrientConstants';
// import { RecommendComponent } from '../recommend/recommend.component'

///////////added imports from recommend.component.ts/////////////////////
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecommendModalComponent } from 'src/app/components/recommend-modal/recommend-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NutrientsRecommendationsService } from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import { FFQNutrientsRecommendations } from 'src/app/models/ffqnutrients-recommendations';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { Router } from '@angular/router';
import { FoodRecommendModalComponent } from 'src/app/components/food-recommend-modal/food-recommend-modal.component';
import { FoodRecommendationsService } from 'src/app/services/food-recommendation-service/food-recommendations.service';
import { FoodDescriptionService } from 'src/app/services/food-description/food-description.service';

// Questionnaire reesults page added by Daykel Muro 09/30/2019
@Component({
  selector: "app-quest-results",
  templateUrl: "./quest-results.component.html",
  styleUrls: ["./quest-results.component.css"]
})
export class QuestResultsComponent implements OnInit {
  public show: boolean = false;
  public showFeedback: boolean = false;

  results: FFQResultsResponse[] = [];

  constructor(public resultsService: ResultsService,////////////////////////////////////////
              public nutrientsRecommendationsService: NutrientsRecommendationsService,
              public foodRecommendationsService: FoodRecommendationsService,
              public foodDescriptionService: FoodDescriptionService,
              private modalService: NgbModal,
              private errorDialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.getAllResults();
  }

  //(Khalid)Changed below code to sort the list in the nutient view page
  private getAllResults() {
    const oldList: Observable<FFQResultsResponse[]> = this.resultsService.getAllResults();
    const reqList: string[] = NutrientConstants.NUTRIENT_NAMES;

    oldList.subscribe(m => {

      m.forEach(element => {
       const newWeeklyMap = new Map<string, number>();
       const newDailyMap = new Map<string, number>();

       const weeklyMap = element.weeklyTotals;
       const dailyMap = element.dailyAverages;

       reqList.forEach(a =>  {
           newWeeklyMap.set(a, weeklyMap[a]);
           newDailyMap.set(a, dailyMap[a]);
       })

       element.weeklyTotals = newWeeklyMap;
       element.dailyAverages = newDailyMap;
       })

       console.log(m);
       this.results = m.reverse();
    }

   )

 }

  private returnZero(){
    return 0;
  }

  toggle(index) {
    this.results[index].show = !this.results[index].show;
  }
  /////////////////////////////////////////////////////////////////////////////////
  // (Francis) attempting to add Nutrients and Food Items buttons from recommend tab
  //            copy/pasted from recommend.component.ts
  /////////////////////////////////////////////////////////////////////////////////

  private getNutrientsRecommendations(questionnaireId: string) {
    this.nutrientsRecommendationsService.getNutrientsRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.onModalRequest(questionnaireId);
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
        dialogRef.componentInstance.router = this.router;
      }
    );
  }

  private getFoodRecommendations(questionnaireId: string) {
    this.foodRecommendationsService.getFoodRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.onModalRequestFood(questionnaireId);
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
        dialogRef.componentInstance.router = this.router;
      }
    );
  }

  onModalRequest(id: string): void {
    const modalRef = this.errorDialog.open(RecommendModalComponent);
    modalRef.componentInstance.id = id;
  }

  onModalRequestFood(id: string): void {
    const modalRef = this.errorDialog.open(FoodRecommendModalComponent);
    modalRef.componentInstance.id = id;
  }


}
