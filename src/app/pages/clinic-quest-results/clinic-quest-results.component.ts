/*

  Added by Javier Romero
  This is the questionnaire results page in the clinician portal (clinic/results).
  From here, a clinician can see all the questionnaire results for their assigned clinic.
  Khalid Alamoudi: added search functionality to better filter the results.

*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResultsService } from "src/app/services/results/results";
import { FFQResultsResponse } from "src/app/models/ffqresultsresponse";
import { Observable } from "rxjs";
import { NutrientConstants } from "src/app/models/NutrientConstants";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { FFQClinicResponse } from "src/app/models/ffqclinic-response";
import { ClinicService } from "src/app/services/clinic/clinic-service";
import { FFQParentResponse } from "src/app/models/ffqparent-response";
import { ParentService } from "src/app/services/parent/parent-service";
import { FFQParent } from "src/app/models/ffqparent";
import { of } from "rxjs";
import { ResultsPipe } from "src/app/pipes/resultsFilter.pipe";
import { FFQParentResult } from "src/app/models/ffqparentresult";
// ////
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RecommendModalComponent } from "src/app/components/recommend-modal/recommend-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { NutrientsRecommendationsService } from "src/app/services/nutrients-recommendations/nutrients-recommendations.service";
import { ErrorDialogPopupComponent } from "src/app/components/error-dialog-popup/error-dialog-popup.component";
import { Router } from "@angular/router";
import { FoodRecommendModalComponent } from "src/app/components/food-recommend-modal/food-recommend-modal.component";
import { FoodRecommendationsService } from "src/app/services/food-recommendation-service/food-recommendations.service";
import { QuestionnaireValidatorService } from "../../services/questionnaire-validator/questionnaire-validator.service";

@Component({
  selector: "app-quest-results",
  templateUrl: "./clinic-quest-results.component.html",
  styleUrls: ["./clinic-quest-results.component.css"],
})
export class ClinicQuestResultsComponent implements OnInit {
  public show: boolean = false;
  public showFeedback: boolean = false;
  feedbackForm: FormGroup;
  loading = false;
  submitted = false;
  search: string;

  results: FFQResultsResponse[] = [];
  clinicId: string;
  currentClinicName: string;
  parentList: FFQParent[] = [];
  resultList: FFQResultsResponse[] = [];
  resultListObservable: Observable<FFQResultsResponse[]>;
  parentNames: string[] = [];
  resultMap: Map<string, FFQParentResult> = new Map<string, FFQParentResult>();
  resultInfo: FFQParentResult[] = [];
  //

  constructor(
    public resultsService: ResultsService,
    public clinicService: ClinicService,
    public parentService: ParentService,
    public authenticationService: AuthenticationService,
    public questService: QuestionnaireValidatorService,
    //
    public nutrientsRecommendationsService: NutrientsRecommendationsService,
    public foodRecommendationsService: FoodRecommendationsService,
    private errorDialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      feedback: ["", Validators.required],
    });

    this.getClinicId();
  }

  //loadData function serves to store the result and parent names into the FFQParentResult object
  //                  serves to display the questionnaire-result data using the specification based on PO's list
  private loadData() {
    const oldListObservable: Observable<FFQResultsResponse[]> = of(
      this.resultList
    );

    const newList: string[] = NutrientConstants.NUTRIENT_NAMES;
    const newWeeklyMap = new Map<string, number>();
    const newDailyMap = new Map<string, number>();
    const resultList: FFQResultsResponse[] = this.resultList;

    oldListObservable.subscribe((m) => {
      m.forEach((element) => {
        const newWeeklyMap = new Map<string, number>();
        const newDailyMap = new Map<string, number>();

        const weeklyMap = element.weeklyTotals;
        const dailyMap = element.dailyAverages;

        newList.forEach((a) => {
          newWeeklyMap.set(a, weeklyMap[a]);
          newDailyMap.set(a, dailyMap[a]);
        });

        element.weeklyTotals = newWeeklyMap;
        element.dailyAverages = newDailyMap;
      });

      console.log(m);
      this.results = m.reverse();
      this.parentNames = this.parentNames.reverse();
      for (var i = 0; i < this.parentNames.length; i++) {
        var object: FFQParentResult = new FFQParentResult(
          this.results[i],
          this.parentNames[i]
        );
        this.resultInfo.push(object);
        this.resultMap.set(this.results[i].userId, object);
      }
      console.log("resultInfo in function");
      console.log(this.resultInfo);
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.feedbackForm.controls;
  }

  submitFeedback(qId) {
    console.log(qId);

    if (this.feedbackForm.invalid) {
      console.log(this.feedbackForm);
      return;
    }

    this.loading = true;
    this.resultsService
      .submitFeedback(qId, this.f.feedback.value)
      .subscribe((data: null) => {
        console.log("testeroo");
      });
  }

  //Function used to obtain the clinicId for the currently logged in clinician, in order to later display results based only for this specific clinic
  private getClinicId() {
    var clinicListObervable: Observable<
      FFQClinicResponse[]
    > = this.clinicService.getAllClinics();
    const loggedInUser = this.authenticationService.currentUserValue;
    var clinicId: string;

    console.log("Logged in user clinic: " + loggedInUser[0].assignedclinic);
    clinicListObervable.subscribe((clinicList) => {
      var clinic = clinicList.find(
        (a) => a.clinicId == loggedInUser[0].assignedclinic
      );
      if (clinic) {
        this.clinicId = clinic.clinicId;
        this.currentClinicName = clinic.clinicname;
        console.log("clinic ID in function");
        console.log(this.clinicId);
      }
      this.getParentList();
    });
  }

  //Function used to filter the parent list to hold only the parents that are assigned to that specific clinic
  private getParentList() {
    var parentListObervable: Observable<
      FFQParentResponse[]
    > = this.parentService.getAllParents();

    parentListObervable.subscribe((parentList) => {
      parentList.forEach((parent) => {
        if (parent.assignedclinic == this.clinicId) {
          this.parentList.push(parent);
        }
      });
      this.getResultsList();

      console.log(this.parentList);
    });
  }

  //Function to get all the results for each parent
  private getResultsList() {
    //console.log("Parents in Get result");
    //console.log(this.parentList);

    var allResultsObservable: Observable<
      FFQResultsResponse[]
    > = this.resultsService.getAllResults();
    allResultsObservable.subscribe((allResults: FFQResultsResponse[]) => {
      //console.log("All REsults in function");
      //console.log(allResults);
      this.parentList.forEach((parent) => {
        allResults.forEach((result) => {
          if (result.userId == parent.userId) {
            this.resultList.push(result);
            var parentName = parent.firstname + " " + parent.lastname;
            this.parentNames.push(parentName);
          }
        });
        //console.log("parentNames for this parent")
        //console.log(this.parentNames);
      });
      //console.log("results in function");
      //console.log(this.resultList);
      this.loadData();
    });
  }

  private returnZero() {
    return 0;
  }

  //function used in HTML in order to display and hide questionnaire results
  toggle(index) {
    this.resultInfo[index].ffqresult.show = !this.resultInfo[index].ffqresult
      .show;
  }

  toggleFeedback(index) {
    //ffqfeedback
    this.resultInfo[index].ffqresult.showFeedback = !this.resultInfo[index]
      .ffqresult.showFeedback;
  }

  /////////////////////////////////////////////////////////////////////////////////
  // (Francis) Same as quest-results.component.ts
  //            copy/pasted from clinic-recommend.component.ts
  /////////////////////////////////////////////////////////////////////////////////

  private getNutrientsRecommendations(questionnaireId: string) {
    this.nutrientsRecommendationsService
      .getNutrientsRecommendationsByQuestionnaireId(questionnaireId)
      .subscribe(
        (data) => {
          this.onModalRequest(questionnaireId);
        },
        (error) => {
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = error.error.message;
          dialogRef.componentInstance.router = this.router;
        }
      );
  }

  private getFoodRecommendations(questionnaireId: string) {
    this.foodRecommendationsService
      .getFoodRecommendationsByQuestionnaireId(questionnaireId)
      .subscribe(
        (data) => {
          this.onModalRequestFood(questionnaireId);
        },
        (error) => {
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = error.error.message;
          dialogRef.componentInstance.router = this.router;
        }
      );
  }

  //functions used in HTML to display the nutrient recommendation after clicking on the button
  onModalRequest(id: string): void {
    const modalRef = this.errorDialog.open(RecommendModalComponent);
    modalRef.componentInstance.id = id;
  }

  //functions used in HTML to display the food recommendation after clicking on the button
  onModalRequestFood(id: string): void {
    const modalRef = this.errorDialog.open(FoodRecommendModalComponent);
    modalRef.componentInstance.id = id;
  }
}
